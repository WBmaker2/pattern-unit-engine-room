import { getJourney, getMission } from '../../content/missions';
import type { Mission } from '../../content/missions/types';
import type { SessionState } from './types';

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
