import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { COPY } from '../../src/content/copy';
import { CreatePatternScreen } from '../../src/features/create/CreatePatternScreen';
import type { FeedbackState } from '../../src/features/session/types';
import type { PatternTokenId } from '../../src/domain/pattern/types';

const props = (overrides: Partial<React.ComponentProps<typeof CreatePatternScreen>> = {}) => ({
  mode: 'unit' as const,
  unit: [] as PatternTokenId[],
  track: [] as PatternTokenId[],
  feedback: null as FeedbackState | null,
  onAddToken: vi.fn(),
  onRemoveToken: vi.fn(),
  onLockUnit: vi.fn(),
  onAppendUnit: vi.fn(),
  onReset: vi.fn(),
  onRun: vi.fn(),
  onContinue: vi.fn(),
  ...overrides,
});

describe('CreatePatternScreen', () => {
  afterEach(cleanup);

  it('unit mode exposes three keyboard buttons, capped controls, and a lock action', async () => {
    const user = userEvent.setup();
    const onAddToken = vi.fn();
    const { rerender } = render(<CreatePatternScreen {...props({ onAddToken })} />);
    const choices = screen.getAllByRole('button', { name: /모양$/ });
    expect(choices).toHaveLength(3);
    expect(screen.getByRole('button', { name: COPY.removeFreeToken })).toBeDisabled();
    expect(screen.getByRole('button', { name: COPY.lockFreeUnit })).toBeDisabled();

    choices[0]!.focus();
    await user.keyboard('{Enter}');
    expect(onAddToken).toHaveBeenCalledWith('A');

    rerender(<CreatePatternScreen {...props({ unit: ['A', 'B', 'C'], onAddToken })} />);
    expect(screen.getAllByRole('button', { name: /모양$/ })).toHaveLength(3);
    expect(onAddToken).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: COPY.lockFreeUnit })).toBeEnabled();
  });

  it.each([
    ['AB', ['A', 'B']],
    ['AAB', ['A', 'A', 'B']],
    ['ABB', ['A', 'B', 'B']],
    ['ABC', ['A', 'B', 'C']],
  ] as const)('track mode delegates %s, preserves retry controls, and replaces run on success', (label, unit) => {
    const onAppendUnit = vi.fn();
    const onReset = vi.fn();
    const onRun = vi.fn();
    const onContinue = vi.fn();
    const { rerender } = render(
      <CreatePatternScreen
        {...props({
          mode: 'track',
          unit,
          track: [...unit],
          onAppendUnit,
          onReset,
          onRun,
          onContinue,
          feedback: { status: 'retry', reason: 'needs-second-repeat', hintVisible: false },
        })}
      />,
    );

    expect(screen.getByRole('button', { name: COPY.appendFreeUnit })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.resetFreePattern })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.runFreePattern })).toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: COPY.runFreePattern })).toBeEnabled();

    rerender(
      <CreatePatternScreen
        {...props({
          mode: 'track',
          unit,
          track: [...unit, ...unit],
          onAppendUnit,
          onReset,
          onRun,
          onContinue,
          feedback: { status: 'success', reason: 'matches', hintVisible: false },
        })}
      />,
    );
    expect(screen.queryByRole('button', { name: COPY.runFreePattern })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.nextStage })).not.toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: COPY.nextStage })).toBeEnabled();
  });

  it('allows only run to carry the pulse and leaves an empty track run disabled', () => {
    render(
      <CreatePatternScreen
        {...props({ mode: 'track', unit: ['A', 'B'], track: [] })}
      />,
    );
    const run = screen.getByRole('button', { name: COPY.runFreePattern });
    expect(run).toBeDisabled();
    expect(run).not.toHaveClass('gi-pulse');
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(0);
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(0);
  });
});
