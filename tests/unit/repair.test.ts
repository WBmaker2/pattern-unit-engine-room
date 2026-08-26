import { describe, expect, it } from 'vitest';

import {
  findMismatchIndices,
  validateRepair,
} from '../../src/domain/pattern/repair';

describe('한 셀 수리 판정', () => {
  it('규칙을 깨뜨린 0-based 인덱스를 한 개 찾는다', () => {
    expect(findMismatchIndices(['A', 'B', 'A', 'A', 'A', 'B'], ['A', 'B'])).toEqual([
      3,
    ]);
  });

  it('다섯 수리 배열에서 오류 위치와 기대 교체 항을 찾는다', () => {
    const cases = [
      { sequence: ['A', 'B', 'A', 'A', 'A', 'B'], unit: ['A', 'B'], index: 3, replacement: 'B' },
      { sequence: ['A', 'A', 'B', 'A', 'B', 'B'], unit: ['A', 'A', 'B'], index: 4, replacement: 'A' },
      { sequence: ['A', 'B', 'B', 'A', 'A', 'B'], unit: ['A', 'B', 'B'], index: 4, replacement: 'B' },
      { sequence: ['A', 'B', 'C', 'A', 'C', 'C'], unit: ['A', 'B', 'C'], index: 4, replacement: 'B' },
      { sequence: ['A', 'B', 'C', 'A', 'B', 'B'], unit: ['A', 'B', 'C'], index: 5, replacement: 'C' },
    ] as const;

    for (const { sequence, unit, index, replacement } of cases) {
      expect(findMismatchIndices(sequence, unit)).toEqual([index]);
      expect(validateRepair(sequence, unit, index, replacement)).toMatchObject({
        ok: true,
        reason: 'matches',
        mismatchIndices: [index],
      });
    }
  });

  it('맞는 위치에 맞는 항을 넣을 때만 승인한다', () => {
    const sequence = ['A', 'B', 'A', 'A', 'A', 'B'];
    const unit = ['A', 'B'];

    expect(validateRepair(sequence, unit, 3, 'B')).toMatchObject({
      ok: true,
      reason: 'matches',
    });
    expect(validateRepair(sequence, unit, 2, 'B')).toMatchObject({
      ok: false,
      reason: 'wrong-position',
    });
    expect(validateRepair(sequence, unit, 3, 'C')).toMatchObject({
      ok: false,
      reason: 'wrong-replacement',
      expectedTokens: ['B'],
    });
  });

  it('오류가 없거나 두 개 이상이면 수리를 승인하지 않는다', () => {
    expect(validateRepair(['A', 'B', 'A', 'B'], ['A', 'B'], 1, 'B')).toMatchObject({
      ok: false,
      reason: 'does-not-repeat',
      mismatchIndices: [],
    });
    expect(
      validateRepair(['A', 'C', 'A', 'C', 'A', 'C'], ['A', 'B'], 1, 'B'),
    ).toMatchObject({
      ok: false,
      reason: 'does-not-repeat',
      mismatchIndices: [1, 3, 5],
    });
  });
});
