import type { Journey } from './types';
import { deepFreeze } from './types';

export const JOURNEYS = deepFreeze([
  {
    index: 0,
    findId: 'find-ab-engine',
    continueId: 'continue-aab-tools',
    repairId: 'repair-abb-lamps',
    translateId: 'translate-abc-cars',
  },
  {
    index: 1,
    findId: 'find-aab-lamps',
    continueId: 'continue-abb-lights',
    repairId: 'repair-abc-signals',
    translateId: 'translate-ab-shapes',
  },
  {
    index: 2,
    findId: 'find-abb-gears',
    continueId: 'continue-abc-panels-one',
    repairId: 'repair-ab-flags',
    translateId: 'translate-aab-symbols',
  },
  {
    index: 3,
    findId: 'find-abc-signals',
    continueId: 'continue-ab-cars',
    repairId: 'repair-aab-bolts',
    translateId: 'translate-abb-actions',
  },
  {
    index: 4,
    findId: 'find-ab-windows',
    continueId: 'continue-abc-panels-two',
    repairId: 'repair-abb-wheels',
    translateId: 'translate-aab-objects',
  },
] satisfies readonly Journey[]);
