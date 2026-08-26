import type { FindMission } from './types';
import { deepFreeze } from './types';

const unit = (tokens: Array<'A' | 'B' | 'C'>): readonly ('A' | 'B' | 'C')[] => Object.freeze(tokens);

export const FIND_MISSIONS = deepFreeze([
  {
    id: 'find-ab-engine',
    kind: 'find',
    structure: 'AB',
    unit: unit(['A', 'B']),
    themeId: 'engine',
    instructionKey: 'findInstruction',
    sequence: unit(['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B']),
    candidates: Object.freeze([unit(['A']), unit(['A', 'B']), unit(['A', 'B', 'A', 'B'])]),
  },
  {
    id: 'find-ab-windows',
    kind: 'find',
    structure: 'AB',
    unit: unit(['A', 'B']),
    themeId: 'cars',
    instructionKey: 'findInstruction',
    sequence: unit(['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B']),
    candidates: Object.freeze([unit(['A', 'B', 'A']), unit(['A', 'B']), unit(['A', 'B', 'A', 'B'])]),
  },
  {
    id: 'find-aab-lamps',
    kind: 'find',
    structure: 'AAB',
    unit: unit(['A', 'A', 'B']),
    themeId: 'signals',
    instructionKey: 'findInstruction',
    sequence: unit(['A', 'A', 'B', 'A', 'A', 'B', 'A', 'A', 'B']),
    candidates: Object.freeze([unit(['A', 'A']), unit(['A', 'A', 'B']), unit(['A', 'A', 'B', 'A', 'A', 'B'])]),
  },
  {
    id: 'find-abb-gears',
    kind: 'find',
    structure: 'ABB',
    unit: unit(['A', 'B', 'B']),
    themeId: 'engine',
    instructionKey: 'findInstruction',
    sequence: unit(['A', 'B', 'B', 'A', 'B', 'B', 'A', 'B', 'B']),
    candidates: Object.freeze([unit(['A', 'B']), unit(['A', 'B', 'B']), unit(['A', 'B', 'B', 'A', 'B', 'B'])]),
  },
  {
    id: 'find-abc-signals',
    kind: 'find',
    structure: 'ABC',
    unit: unit(['A', 'B', 'C']),
    themeId: 'signals',
    instructionKey: 'findInstruction',
    sequence: unit(['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']),
    candidates: Object.freeze([unit(['A', 'B']), unit(['A', 'B', 'C']), unit(['A', 'B', 'C', 'A', 'B', 'C'])]),
  },
] satisfies readonly FindMission[]);
