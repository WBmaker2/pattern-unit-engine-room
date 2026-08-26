import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useReducer } from 'react';

import { getMission, JOURNEYS } from '../../src/content/missions';
import { FindUnitScreen } from '../../src/features/find/FindUnitScreen';
import { createInitialSession, sessionReducer } from '../../src/features/session/reducer';

function FindHarness({ missionId = 'find-ab-engine' }: { readonly missionId?: string }) {
  const journeyIndex = JOURNEYS.findIndex((journey) => journey.findId === missionId);
  const [state, dispatch] = useReducer(sessionReducer, undefined, () => ({
    ...createInitialSession(),
    stage: 'find',
    journeyIndex: journeyIndex < 0 ? 0 : journeyIndex as 0 | 1 | 2 | 3 | 4,
  }));
  const mission = getMission(missionId);
  if (mission.kind !== 'find') throw new Error('find fixture required');
  return (
    <FindUnitScreen
      mission={mission}
      feedback={state.feedback}
      hintUsed={state.currentHintUsed}
      onSubmit={(candidate) => dispatch({ type: 'SUBMIT_FIND', candidate })}
      onHint={() => dispatch({ type: 'USE_HINT' })}
      onContinue={() => dispatch({ type: 'CONTINUE_STAGE' })}
    />
  );
}

describe('FindUnitScreen', () => {
  afterEach(cleanup);

  it('선택 전 제출을 막고 후보를 한국어 이름과 칸 수로 읽는다', async () => {
    const user = userEvent.setup();
    render(<FindHarness />);
    const submit = screen.getByRole('button', { name: '한 묶음 찾기' });
    expect(submit).toBeDisabled();
    expect(screen.getByRole('button', { name: /후보 1: 톱니바퀴 한 칸/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /후보 2: 톱니바퀴, 나사못 두 칸/ })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /후보 2:/ }));
    expect(submit).toBeEnabled();
    expect(submit).toHaveClass('gi-pulse');
    expect(screen.getAllByRole('button', { name: /후보/ })).toHaveLength(3);
  });

  it('긴 후보의 nonminimal 피드백과 힌트를 보여 주고 정답 뒤 다음 칸만 연다', async () => {
    const user = userEvent.setup();
    render(<FindHarness />);
    await user.click(screen.getByRole('button', { name: /후보 3:/ }));
    await user.click(screen.getByRole('button', { name: '한 묶음 찾기' }));
    expect(screen.getByText('되풀이되지만 더 짧은 한 묶음이 있어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '테두리 도움 보기' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '다음 칸' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '테두리 도움 보기' }));
    expect(screen.getByText('테두리로 나눈 묶음을 차례로 살펴보세요.')).toBeInTheDocument();
    expect(document.querySelectorAll('.pattern-cell--active').length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: /후보 2:/ }));
    await user.click(screen.getByRole('button', { name: '한 묶음 찾기' }));
    expect(screen.getByText('가장 짧은 한 묶음을 찾았어요.')).toBeInTheDocument();
    expect(screen.getByText('테두리 도움을 사용해 규칙을 찾았어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음 칸' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '한 묶음 찾기' })).not.toBeInTheDocument();
  });

  it('잘못 이어지지 않는 후보도 별도 피드백을 표시한다', async () => {
    const user = userEvent.setup();
    render(<FindHarness missionId="find-ab-windows" />);
    await user.click(screen.getByRole('button', { name: /후보 1:/ }));
    await user.click(screen.getByRole('button', { name: '한 묶음 찾기' }));
    expect(screen.getByText('이 묶음으로는 끝까지 되풀이되지 않아요.')).toBeInTheDocument();
  });
});
