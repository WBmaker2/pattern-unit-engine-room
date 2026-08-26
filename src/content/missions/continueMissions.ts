import type { ContinueMission } from './types';
import { deepFreeze } from './types';

const slots = (values: Array<'A' | 'B' | 'C' | null>): readonly ('A' | 'B' | 'C' | null)[] =>
  Object.freeze(values);
const unit = (values: Array<'A' | 'B' | 'C'>): readonly ('A' | 'B' | 'C')[] => Object.freeze(values);

export const CONTINUE_MISSIONS = deepFreeze([
  {
    id: 'continue-ab-cars',
    kind: 'continue',
    structure: 'AB',
    unit: unit(['A', 'B']),
    themeId: 'cars',
    instructionKey: 'continueInstruction',
    slots: slots(['A', 'B', 'A', 'B', null, null]),
    choices: Object.freeze([unit(['A', 'B']), unit(['B', 'A']), unit(['A', 'A'])]),
  },
  {
    id: 'continue-aab-tools',
    kind: 'continue',
    structure: 'AAB',
    unit: unit(['A', 'A', 'B']),
    themeId: 'engine',
    instructionKey: 'continueInstruction',
    slots: slots(['A', 'A', 'B', 'A', 'A', null]),
    choices: Object.freeze([unit(['A']), unit(['B']), unit(['C'])]),
  },
  {
    id: 'continue-abb-lights',
    kind: 'continue',
    structure: 'ABB',
    unit: unit(['A', 'B', 'B']),
    themeId: 'signals',
    instructionKey: 'continueInstruction',
    slots: slots(['A', 'B', 'B', 'A', null, null]),
    choices: Object.freeze([unit(['B', 'B']), unit(['A', 'B']), unit(['B', 'A'])]),
  },
  {
    id: 'continue-abc-panels-one',
    kind: 'continue',
    structure: 'ABC',
    unit: unit(['A', 'B', 'C']),
    themeId: 'shapes',
    instructionKey: 'continueInstruction',
    slots: slots(['A', 'B', 'C', 'A', 'B', null]),
    choices: Object.freeze([unit(['A']), unit(['B']), unit(['C'])]),
  },
  {
    id: 'continue-abc-panels-two',
    kind: 'continue',
    structure: 'ABC',
    unit: unit(['A', 'B', 'C']),
    themeId: 'shapes',
    instructionKey: 'continueInstruction',
    slots: slots(['A', 'B', 'C', 'A', null, null]),
    choices: Object.freeze([unit(['B', 'C']), unit(['C', 'B']), unit(['B', 'B'])]),
  },
] satisfies readonly ContinueMission[]);
