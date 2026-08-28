import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useReducer, useState } from 'react';

import { getMission, JOURNEYS } from '../../src/content/missions';
import { COPY } from '../../src/content/copy';
import { TranslatePatternScreen } from '../../src/features/translate/TranslatePatternScreen';
import { createInitialSession, sessionReducer } from '../../src/features/session/reducer';
import type { DisplayTokenId } from '../../src/content/tokenThemes';
import type { TranslationPair } from '../../src/domain/pattern/types';

function chooseMapping(user: ReturnType<typeof userEvent.setup>, sourceLabel: string, targetLabel: string) {
  return user.click(screen.getByRole('button', { name: sourceLabel })).then(() =>
    user.click(screen.getByRole('button', { name: targetLabel })),
  );
}

function TranslateHarness({ missionId = 'translate-ab-shapes' }: { readonly missionId?: string }) {
  const journeyIndex = JOURNEYS.findIndex((journey) => journey.translateId === missionId);
  const [state, dispatch] = useReducer(sessionReducer, undefined, () => ({
    ...createInitialSession(),
    stage: 'translate',
    journeyIndex: (journeyIndex < 0 ? 0 : journeyIndex) as 0 | 1 | 2 | 3 | 4,
  }));
  const [draftPairs, setDraftPairs] = useState<readonly TranslationPair<DisplayTokenId>[]>([]);
  const mission = getMission(missionId);
  if (mission.kind !== 'translate') throw new Error('translate fixture required');
  return (
    <TranslatePatternScreen
      mission={mission}
      draftPairs={draftPairs}
      feedback={state.feedback}
      onChangePair={(source, target) => setDraftPairs((pairs) => [
        ...pairs.filter((item) => item.source !== source),
        { source, target },
      ])}
      onSubmit={(pairs, translated) => dispatch({ type: 'SUBMIT_TRANSLATION', pairs, translated })}
      onContinue={() => dispatch({ type: 'CONTINUE_STAGE' })}
    />
  );
}

describe('TranslatePatternScreen', () => {
  afterEach(cleanup);

  it('모든 원래 항을 대응하기 전에는 확인을 막는다', () => {
    render(<TranslateHarness />);
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('현재 단계 4 / 5');
    expect(screen.getByRole('button', { name: '같은 규칙 확인' })).toBeDisabled();
  });

  it('같은 새 모양을 두 원래 항에 쓰면 수정 기회를 준다', async () => {
    const user = userEvent.setup();
    render(<TranslateHarness />);
    await chooseMapping(user, '톱니바퀴', '동그라미');
    await chooseMapping(user, '나사못', '동그라미');
    await user.click(screen.getByRole('button', { name: '같은 규칙 확인' }));
    expect(screen.getByText('서로 다른 항에는 서로 다른 새 모양을 골라요.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: COPY.nextCreateStage })).not.toBeInTheDocument();
  });

  it('원래 항과 새 모양 대응을 Enter와 Space로 조작하고 pulse를 쓰지 않는다', async () => {
    const user = userEvent.setup();
    render(<TranslateHarness />);
    const source = screen.getByRole('button', { name: '톱니바퀴' });
    source.focus();
    await user.keyboard('{Enter}');
    const target = screen.getByRole('button', { name: '동그라미' });
    target.focus();
    await user.keyboard(' ');
    expect(screen.getByText('톱니바퀴 원래 항')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(0);
    expect(screen.getByRole('button', { name: '같은 규칙 확인' })).not.toHaveClass('gi-pulse');
  });

  it('외형이 달라도 순서가 같으면 승인한다', async () => {
    const user = userEvent.setup();
    render(<TranslateHarness />);
    await chooseMapping(user, '톱니바퀴', '동그라미');
    await chooseMapping(user, '나사못', '세모');
    await user.click(screen.getByRole('button', { name: '같은 규칙 확인' }));
    expect(screen.getByText('모양은 달라도 같은 순서예요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.nextCreateStage })).toBeInTheDocument();
  });

  it('세 항 번역도 원래 순서를 유지한다', async () => {
    const user = userEvent.setup();
    render(<TranslateHarness missionId="translate-abc-cars" />);
    await chooseMapping(user, '전등', '바퀴');
    await chooseMapping(user, '깃발', '창문');
    await chooseMapping(user, '별', '기차');
    await user.click(screen.getByRole('button', { name: '같은 규칙 확인' }));
    expect(screen.getByText('모양은 달라도 같은 순서예요.')).toBeInTheDocument();
  });
});
