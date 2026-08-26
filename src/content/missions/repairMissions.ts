import type { RepairMission } from './types';
import { deepFreeze } from './types';

const unit = (values: Array<'A' | 'B' | 'C'>): readonly ('A' | 'B' | 'C')[] => Object.freeze(values);
const choices = (): readonly ('A' | 'B' | 'C')[] => Object.freeze(['A', 'B', 'C']);

export const REPAIR_MISSIONS = deepFreeze([
  {
    id: 'repair-ab-flags',
    kind: 'repair',
    structure: 'AB',
    unit: unit(['A', 'B']),
    themeId: 'symbols',
    instructionKey: 'repairInstruction',
    brokenSequence: unit(['A', 'B', 'A', 'A', 'A', 'B']),
    replacementChoices: choices(),
  },
  {
    id: 'repair-aab-bolts',
    kind: 'repair',
    structure: 'AAB',
    unit: unit(['A', 'A', 'B']),
    themeId: 'engine',
    instructionKey: 'repairInstruction',
    brokenSequence: unit(['A', 'A', 'B', 'A', 'B', 'B', 'A', 'A', 'B']),
    replacementChoices: choices(),
  },
  {
    id: 'repair-abb-lamps',
    kind: 'repair',
    structure: 'ABB',
    unit: unit(['A', 'B', 'B']),
    themeId: 'signals',
    instructionKey: 'repairInstruction',
    brokenSequence: unit(['A', 'B', 'B', 'A', 'A', 'B', 'A', 'B', 'B']),
    replacementChoices: choices(),
  },
  {
    id: 'repair-abb-wheels',
    kind: 'repair',
    structure: 'ABB',
    unit: unit(['A', 'B', 'B']),
    themeId: 'cars',
    instructionKey: 'repairInstruction',
    brokenSequence: unit(['A', 'B', 'B', 'B', 'B', 'B', 'A', 'B', 'B']),
    replacementChoices: choices(),
  },
  {
    id: 'repair-abc-signals',
    kind: 'repair',
    structure: 'ABC',
    unit: unit(['A', 'B', 'C']),
    themeId: 'signals',
    instructionKey: 'repairInstruction',
    brokenSequence: unit(['A', 'B', 'C', 'A', 'C', 'C', 'A', 'B', 'C']),
    replacementChoices: choices(),
  },
] satisfies readonly RepairMission[]);
