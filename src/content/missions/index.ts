import { CONTINUE_MISSIONS } from './continueMissions';
import { FIND_MISSIONS } from './findMissions';
import { JOURNEYS } from './journeys';
import { REPAIR_MISSIONS } from './repairMissions';
import { TRANSLATE_MISSIONS } from './translateMissions';
import { deepFreeze } from './types';
import type { Journey, JourneyIndex, Mission } from './types';

export * from './types';
export { JOURNEYS } from './journeys';

export const MISSIONS: readonly Mission[] = deepFreeze([
  ...FIND_MISSIONS,
  ...CONTINUE_MISSIONS,
  ...REPAIR_MISSIONS,
  ...TRANSLATE_MISSIONS,
]);

const missionById = new Map(MISSIONS.map((mission) => [mission.id, mission]));

export function getMission(id: string): Mission {
  const mission = missionById.get(id);
  if (mission === undefined) {
    throw new RangeError(`Unknown mission id: ${id}`);
  }
  return mission;
}

export function getJourney(index: JourneyIndex): Journey {
  const journey = JOURNEYS.find((candidate) => candidate.index === index);
  if (journey === undefined) {
    throw new RangeError(`Unknown journey index: ${index}`);
  }
  return journey;
}
