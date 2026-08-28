import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useReducer } from 'react';

import { getMission, JOURNEYS } from '../../src/content/missions';
import { COPY } from '../../src/content/copy';
import { RepairPatternScreen } from '../../src/features/repair/RepairPatternScreen';
import { createInitialSession, sessionReducer } from '../../src/features/session/reducer';

function RepairHarness({ missionId = 'repair-abb-lamps' }: { readonly missionId?: string }) {
  const journeyIndex = JOURNEYS.findIndex((journey) => journey.repairId === missionId);
  const [state, dispatch] = useReducer(sessionReducer, undefined, () => ({
    ...createInitialSession(),
    stage: 'repair',
    journeyIndex: (journeyIndex < 0 ? 0 : journeyIndex) as 0 | 1 | 2 | 3 | 4,
  }));
  const mission = getMission(missionId);
  if (mission.kind !== 'repair') throw new Error('repair fixture required');
  return (
    <RepairPatternScreen
      mission={mission}
      selectedIndex={state.selectedRepairIndex}
      feedback={state.feedback}
      onSelectIndex={(index) => dispatch({ type: 'SELECT_REPAIR_INDEX', index })}
      onSubmit={(replacement) => dispatch({ type: 'SUBMIT_REPAIR', replacement })}
      onContinue={() => dispatch({ type: 'CONTINUE_STAGE' })}
    />
  );
}

describe('RepairPatternScreen', () => {
  afterEach(cleanup);

  it('칸 선택 뒤 교체 항을 눌러 한 오류만 수리한다', async () => {
    const user = userEvent.setup();
    render(<RepairHarness />);
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('현재 단계 3 / 5');
    await user.click(screen.getByRole('button', { name: /다섯째 칸/ }));
    await user.click(screen.getByRole('button', { name: '깃발 모양' }));
    await user.click(screen.getByRole('button', { name: '고치기' }));
    expect(screen.getByText('규칙을 깨뜨린 칸을 고쳤어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.nextTranslateStage })).toBeInTheDocument();
  });

  it('교체 항은 칸을 고른 뒤에만 보이고 키보드로도 수리한다', async () => {
    const user = userEvent.setup();
    render(<RepairHarness />);
    expect(screen.queryByRole('button', { name: '깃발 모양' })).not.toBeInTheDocument();
    const cell = screen.getByRole('button', { name: /다섯째 칸/ });
    cell.focus();
    await user.keyboard('{Enter}');
    const replacement = screen.getByRole('button', { name: '깃발 모양' });
    replacement.focus();
    await user.keyboard(' ');
    const submit = screen.getByRole('button', { name: '고치기' });
    submit.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('규칙을 깨뜨린 칸을 고쳤어요.')).toBeInTheDocument();
    expect(submit).not.toHaveClass('gi-pulse');
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(0);
  });

  it('맞는 위치에서 틀린 교체 항을 고르면 답을 노출하지 않는다', async () => {
    const user = userEvent.setup();
    render(<RepairHarness />);
    await user.click(screen.getByRole('button', { name: /다섯째 칸/ }));
    await user.click(screen.getByRole('button', { name: '전등 모양' }));
    await user.click(screen.getByRole('button', { name: '고치기' }));
    expect(screen.getByText('선택한 칸에 들어갈 모양을 다시 골라요.')).toBeInTheDocument();
    expect(screen.queryByText(/정답|B|다섯째 칸은 깃발/)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: COPY.nextTranslateStage })).not.toBeInTheDocument();
  });

  it('위치와 교체 항이 맞지 않으면 이유를 알려 주고 다시 고르게 한다', async () => {
    const user = userEvent.setup();
    render(<RepairHarness />);
    await user.click(screen.getByRole('button', { name: /넷째 칸/ }));
    await user.click(screen.getByRole('button', { name: '깃발 모양' }));
    await user.click(screen.getByRole('button', { name: '고치기' }));
    expect(screen.getByText('규칙을 깨뜨린 칸을 다시 찾아봐요.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: COPY.nextTranslateStage })).not.toBeInTheDocument();
  });

  it('위치를 바꾸면 이전 교체 항을 비우고 다시 고르게 한다', async () => {
    const user = userEvent.setup();
    render(<RepairHarness />);
    await user.click(screen.getByRole('button', { name: /다섯째 칸/ }));
    await user.click(screen.getByRole('button', { name: '깃발 모양' }));
    expect(screen.getByRole('button', { name: '고치기' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: /넷째 칸/ }));
    expect(screen.getByRole('button', { name: '고치기' })).toBeDisabled();
  });

  it('틀린 위치 재시도에서 단위 시작 테두리만 보여 준다', async () => {
    const user = userEvent.setup();
    render(<RepairHarness />);
    await user.click(screen.getByRole('button', { name: /넷째 칸/ }));
    await user.click(screen.getByRole('button', { name: '깃발 모양' }));
    await user.click(screen.getByRole('button', { name: '고치기' }));
    expect(screen.getByText('규칙을 깨뜨린 칸을 다시 찾아봐요.')).toBeInTheDocument();
    expect(document.querySelectorAll('.pattern-cell--active')).toHaveLength(3);
    expect(document.querySelectorAll('[data-token-id="B"]').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.pattern-cell--error')).toHaveLength(0);
  });
});
