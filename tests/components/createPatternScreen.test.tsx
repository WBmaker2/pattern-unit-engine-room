import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { COPY } from '../../src/content/copy';
import { CreatePatternScreen } from '../../src/features/create/CreatePatternScreen';
import type { FeedbackState } from '../../src/features/session/types';
import type { PatternTokenId } from '../../src/domain/pattern/types';
import { MAX_FREE_TRACK_TOKENS } from '../../src/domain/pattern/freePattern';

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
  maxTrackTokens: MAX_FREE_TRACK_TOKENS,
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
    expect(screen.getByText('모양 2~3개를 골라 한 묶음을 만들어요.')).toBeInTheDocument();
    expect(screen.getByText('아래에서 모양을 눌러 한 묶음을 채워요.')).toBeInTheDocument();
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
    expect(screen.queryByText('아래에서 모양을 눌러 한 묶음을 채워요.')).not.toBeInTheDocument();
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
          reducedMotion: true,
          feedback: { status: 'retry', reason: 'needs-second-repeat', hintVisible: false },
        })}
      />,
    );

    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.getByText('현재 단계 5 / 5')).toBeInTheDocument();
    expect(screen.getByText('한 묶음을 두 번 이상 붙이면 운행할 수 있어요.')).toBeInTheDocument();
    expect(screen.getByText(`선로에 놓은 칸: ${unit.length} / ${MAX_FREE_TRACK_TOKENS}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.appendFreeUnit })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.resetFreePattern })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.runFreePattern })).toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: COPY.runFreePattern })).toBeEnabled();
    expect(document.querySelectorAll('.pattern-cell--active')).toHaveLength(0);

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
        {...props({ mode: 'track', unit: ['A', 'B'], track: [], reducedMotion: true })}
      />,
    );
    const run = screen.getByRole('button', { name: COPY.runFreePattern });
    expect(run).toBeDisabled();
    expect(run).not.toHaveClass('gi-pulse');
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(0);
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(0);
    expect(document.querySelectorAll('.pattern-cell--active')).toHaveLength(0);
  });

  it('최대 길이에 도달하면 한 묶음 붙이기를 막고 안내한다', () => {
    render(
      <CreatePatternScreen
        {...props({
          mode: 'track',
          unit: ['A', 'B'],
          track: Array(MAX_FREE_TRACK_TOKENS).fill('A'),
          maxTrackTokens: MAX_FREE_TRACK_TOKENS,
        })}
      />,
    );

    expect(screen.getByRole('button', { name: COPY.appendFreeUnit })).toBeDisabled();
    expect(screen.getByText(COPY.freeTrackLimit)).toBeInTheDocument();
  });

  it('reduced motion retry에서도 반복 중인 미운행 트랙은 활성 칸을 표시하지 않는다', () => {
    render(
      <CreatePatternScreen
        {...props({
          mode: 'track',
          unit: ['A', 'B'],
          track: ['A', 'B', 'A', 'B'],
          reducedMotion: true,
          feedback: { status: 'retry', reason: 'does-not-repeat', hintVisible: false },
        })}
      />,
    );

    expect(document.querySelector('.train-track--moving')).toBeNull();
    expect(document.querySelectorAll('.pattern-cell--active')).toHaveLength(0);
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
    expect(document.querySelectorAll('.pattern-cell--active')).toHaveLength(0);
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
    const activeCells = Array.from(document.querySelectorAll('.pattern-cell--active'));
    expect(activeCells).toHaveLength(2);
    expect(activeCells.map((cell) => cell.getAttribute('aria-label'))).toEqual([
      '첫째 칸, 톱니바퀴 모양, 점무늬',
      '셋째 칸, 톱니바퀴 모양, 점무늬',
    ]);
  });
});
