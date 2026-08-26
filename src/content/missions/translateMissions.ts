import type { TranslateMission } from './types';
import { deepFreeze } from './types';

const unit = (values: Array<'A' | 'B' | 'C'>): readonly ('A' | 'B' | 'C')[] => Object.freeze(values);

export const TRANSLATE_MISSIONS = deepFreeze([
  {
    id: 'translate-ab-shapes',
    kind: 'translate',
    structure: 'AB',
    unit: unit(['A', 'B']),
    themeId: 'engine',
    instructionKey: 'translateInstruction',
    sourceSequence: unit(['A', 'B', 'A', 'B']),
    targetThemeId: 'shapes',
    targetPool: Object.freeze(['circle', 'triangle']),
    correctPairs: Object.freeze([
      Object.freeze({ source: 'A', target: 'circle' }),
      Object.freeze({ source: 'B', target: 'triangle' }),
    ]),
  },
  {
    id: 'translate-aab-symbols',
    kind: 'translate',
    structure: 'AAB',
    unit: unit(['A', 'A', 'B']),
    themeId: 'engine',
    instructionKey: 'translateInstruction',
    sourceSequence: unit(['A', 'A', 'B', 'A', 'A', 'B']),
    targetThemeId: 'symbols',
    targetPool: Object.freeze(['star', 'flag']),
    correctPairs: Object.freeze([
      Object.freeze({ source: 'A', target: 'star' }),
      Object.freeze({ source: 'B', target: 'flag' }),
    ]),
  },
  {
    id: 'translate-aab-objects',
    kind: 'translate',
    structure: 'AAB',
    unit: unit(['A', 'A', 'B']),
    themeId: 'shapes',
    instructionKey: 'translateInstruction',
    sourceSequence: unit(['A', 'A', 'B', 'A', 'A', 'B']),
    targetThemeId: 'engine',
    targetPool: Object.freeze(['lamp', 'bolt']),
    correctPairs: Object.freeze([
      Object.freeze({ source: 'A', target: 'lamp' }),
      Object.freeze({ source: 'B', target: 'bolt' }),
    ]),
  },
  {
    id: 'translate-abb-actions',
    kind: 'translate',
    structure: 'ABB',
    unit: unit(['A', 'B', 'B']),
    themeId: 'shapes',
    instructionKey: 'translateInstruction',
    sourceSequence: unit(['A', 'B', 'B', 'A', 'B', 'B']),
    targetThemeId: 'actions',
    targetPool: Object.freeze(['hand-up', 'clap']),
    correctPairs: Object.freeze([
      Object.freeze({ source: 'A', target: 'hand-up' }),
      Object.freeze({ source: 'B', target: 'clap' }),
    ]),
  },
  {
    id: 'translate-abc-cars',
    kind: 'translate',
    structure: 'ABC',
    unit: unit(['A', 'B', 'C']),
    themeId: 'signals',
    instructionKey: 'translateInstruction',
    sourceSequence: unit(['A', 'B', 'C', 'A', 'B', 'C']),
    targetThemeId: 'cars',
    targetPool: Object.freeze(['wheel', 'window', 'train']),
    correctPairs: Object.freeze([
      Object.freeze({ source: 'A', target: 'wheel' }),
      Object.freeze({ source: 'B', target: 'window' }),
      Object.freeze({ source: 'C', target: 'train' }),
    ]),
  },
] satisfies readonly TranslateMission[]);
