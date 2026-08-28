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
  reducedMotion: false,
  ...overrides,
});

describe('CreatePatternScreen', () => {
  afterEach(cleanup);

  it('unit mode exposes three keyboard buttons, capped controls, and a lock action', async () => {
    const user = userEvent.setup();
    const onAddToken = vi.fn();
    const { rerender } = render(<CreatePatternScreen {...props({ onAddToken })} />);
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('현재 단계 5 / 5');
    const choices = screen.getAllByRole('button', { name: /모양$/ });
    expect(choices).toHaveLength(3);
    expect(screen.getByRole('button', { name: COPY.removeFreeToken })).toBeDisabled();
    expect(screen.getByRole('button', { name: COPY.lockFreeUnit })).toBeDisabled();

    choices[0]!.focus();
    await user.keyboard('{Enter}');
    expect(onAddToken).toHaveBeenCalledWith('A');

    rerender(<CreatePatternScreen {...props({ unit: ['A', 'B', 'C'], onAddToken })} />);
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('현재 단계 5 / 5');
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

    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('현재 단계 5 / 5');
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
    expect(screen.getByRole('button', { name: `${COPY.summaryTitle} 보기` })).not.toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: `${COPY.summaryTitle} 보기` })).toBeEnabled();
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

  it('자유 규칙 성공 시 실제 선로에 moving class를 붙인다', () => {
    render(
      <CreatePatternScreen
        {...props({
          mode: 'track',
          unit: ['A', 'B'],
          track: ['A', 'B', 'A', 'B'],
          feedback: { status: 'success', reason: 'matches', hintVisible: false },
          reducedMotion: false,
        })}
      />,
    );

    expect(document.querySelector('.train-track--moving')).not.toBeNull();
  });

  it('reduced motion에서는 moving animation 없이 반복 칸 테두리를 표시한다', () => {
    render(
      <CreatePatternScreen
        {...props({
          mode: 'track',
          unit: ['A', 'B'],
          track: ['A', 'B', 'A', 'B'],
          feedback: { status: 'success', reason: 'matches', hintVisible: false },
          reducedMotion: true,
        })}
      />,
    );

    expect(document.querySelector('.train-track--moving')).not.toBeNull();
    expect(document.querySelectorAll('.pattern-cell--active').length).toBeGreaterThan(0);
  });
});
