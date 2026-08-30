import { getJourney, getMission } from '../../content/missions';
import type { Mission } from '../../content/missions/types';
import type { SessionState } from './types';

export type JourneyStageKey = 'find' | 'continue' | 'repair' | 'translate' | 'create';

export interface JourneyProgressItem {
  readonly key: JourneyStageKey;
  readonly label: string;
  readonly status: 'complete' | 'current' | 'upcoming';
}

const JOURNEY_STAGES: readonly { key: JourneyStageKey; label: string }[] = [
  { key: 'find', label: '찾기' },
  { key: 'continue', label: '이어 붙이기' },
  { key: 'repair', label: '수리하기' },
  { key: 'translate', label: '번역하기' },
  { key: 'create', label: '만들기' },
];

const STAGE_INDEX: Record<SessionState['stage'], number> = {
  start: -1,
  find: 0,
  continue: 1,
  repair: 2,
  translate: 3,
  'create-unit': 4,
  'create-track': 4,
  summary: 5,
};

export function selectJourneyProgress(state: SessionState): readonly JourneyProgressItem[] {
  const current = STAGE_INDEX[state.stage];
  return JOURNEY_STAGES.map((stage, index) => ({
    ...stage,
    status: index < current || state.stage === 'summary' ? 'complete' : index === current ? 'current' : 'upcoming',
  }));
}

export function selectCurrentJourney(state: SessionState) {
  return getJourney(state.journeyIndex);
}

export function selectCurrentMission(state: SessionState): Mission | null {
  const journey = selectCurrentJourney(state);
  const missionId = {
    find: journey.findId,
    continue: journey.continueId,
    repair: journey.repairId,
    translate: journey.translateId,
  }[state.stage as 'find' | 'continue' | 'repair' | 'translate'];
  return missionId === undefined ? null : getMission(missionId);
}

export function selectCanContinue(state: SessionState): boolean {
  return (
    state.feedback?.status === 'success' &&
    (state.stage === 'find' ||
      state.stage === 'continue' ||
      state.stage === 'repair' ||
      state.stage === 'translate' ||
      state.stage === 'create-track')
  );
}
