import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useReducer } from 'react';

import { getMission, JOURNEYS } from '../../src/content/missions';
import { ContinuePatternScreen } from '../../src/features/continue/ContinuePatternScreen';
import { createInitialSession, sessionReducer } from '../../src/features/session/reducer';

function ContinueHarness({ missionId }: { readonly missionId: string }) {
  const journeyIndex = JOURNEYS.findIndex((journey) => journey.continueId === missionId);
  const [state, dispatch] = useReducer(sessionReducer, undefined, () => ({
    ...createInitialSession(),
    stage: 'continue',
    journeyIndex: journeyIndex < 0 ? 0 : journeyIndex as 0 | 1 | 2 | 3 | 4,
  }));
  const mission = getMission(missionId);
  if (mission.kind !== 'continue') throw new Error('continue fixture required');
  return (
    <ContinuePatternScreen
      mission={mission}
      feedback={state.feedback}
      onSubmit={(answer) => dispatch({ type: 'SUBMIT_CONTINUATION', answer })}
      onContinue={() => dispatch({ type: 'CONTINUE_STAGE' })}
    />
  );
}

describe('ContinuePatternScreen', () => {
  afterEach(cleanup);

  it.each([
    ['continue-aab-tools', /나사못 한 칸/],
    ['continue-abb-lights', /깃발, 깃발 두 칸/],
  ] as const)('빈칸 수에 맞는 선택지(%s)를 제출한다', async (missionId, answerName) => {
    const user = userEvent.setup();
    render(<ContinueHarness missionId={missionId} />);
    expect(screen.getByRole('button', { name: '이어 붙이기' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: answerName }));
    expect(screen.getByRole('button', { name: '이어 붙이기' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '이어 붙이기' }));
    expect(screen.getByText('한 묶음으로 다음 칸을 이었어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음 칸' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음 칸' })).not.toHaveClass('gi-pulse');
  });

  it('오답은 다음 칸을 미리 보여 주지 않고 이유별 문구를 표시한다', async () => {
    const user = userEvent.setup();
    render(<ContinueHarness missionId="continue-aab-tools" />);
    await user.click(screen.getByRole('button', { name: /톱니바퀴 한 칸/ }));
    await user.click(screen.getByRole('button', { name: '이어 붙이기' }));
    expect(screen.getByText('한 묶음의 순서를 다시 살펴봐요.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '다음 칸' })).not.toBeInTheDocument();
  });

  it('선택과 제출을 Enter·Space로 조작한다', async () => {
    const user = userEvent.setup();
    render(<ContinueHarness missionId="continue-aab-tools" />);
    const choice = screen.getByRole('button', { name: /나사못 한 칸/ });
    choice.focus();
    await user.keyboard('{Enter}');
    const submit = screen.getByRole('button', { name: '이어 붙이기' });
    submit.focus();
    await user.keyboard(' ');
    expect(screen.getByText('한 묶음으로 다음 칸을 이었어요.')).toBeInTheDocument();
  });

  it('각 화면에서 활성 주 행동은 하나를 넘지 않는다', async () => {
    const user = userEvent.setup();
    render(<ContinueHarness missionId="continue-aab-tools" />);
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: /나사못 한 칸/ }));
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(1);
  });
});
