import { describe, expect, it } from 'vitest';

import {
  findShortestRepeatingUnit,
  repeatUnit,
  validateUnitChoice,
} from '../../src/domain/pattern/repetition';

describe('반복 단위', () => {
  it.each([
    [['A', 'B', 'A', 'B', 'A', 'B'], ['A', 'B']],
    [['A', 'A', 'B', 'A', 'A', 'B'], ['A', 'A', 'B']],
    [['A', 'B', 'B', 'A', 'B', 'B'], ['A', 'B', 'B']],
    [['A', 'B', 'C', 'A', 'B', 'C'], ['A', 'B', 'C']],
  ])('가장 짧은 반복 단위를 반환한다', (sequence, expected) => {
    expect(findShortestRepeatingUnit(sequence)).toEqual(expected);
  });

  it.each([
    [[]],
    [['A']],
    [['A', 'B']],
    [['A', 'B', 'A']],
  ])('끝까지 반복되지 않는 수열은 null을 반환한다', (sequence) => {
    expect(findShortestRepeatingUnit(sequence)).toBeNull();
  });

  it('단위를 지정한 횟수만큼 이어 붙인다', () => {
    expect(repeatUnit(['A', 'B'], 3)).toEqual(['A', 'B', 'A', 'B', 'A', 'B']);
    expect(repeatUnit(['A', 'B'], 0)).toEqual([]);
  });

  it.each([Number.POSITIVE_INFINITY, Number.NaN, 0, -1, 1.5])(
    '양의 유한 정수가 아닌 반복 횟수(%s)는 빈 배열을 반환한다',
    (repeatCount) => {
      expect(repeatUnit(['A', 'B'], repeatCount)).toEqual([]);
    },
  );

  it('더 긴 반복 후보를 정답으로 인정하지 않는다', () => {
    expect(
      validateUnitChoice(['A', 'B', 'A', 'B'], ['A', 'B', 'A', 'B']),
    ).toMatchObject({
      ok: false,
      reason: 'not-shortest',
      expectedUnit: ['A', 'B'],
    });
  });

  it('후보를 반복해 전체 수열을 재구성하지 못하면 반복되지 않음으로 판정한다', () => {
    expect(
      validateUnitChoice(
        ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'],
        ['A'],
      ),
    ).toMatchObject({
      ok: false,
      reason: 'does-not-repeat',
      expectedUnit: ['A', 'B'],
    });
  });

  it('최소 반복 단위 선택은 정답이다', () => {
    expect(validateUnitChoice(['A', 'B', 'A', 'B'], ['A', 'B'])).toEqual({
      ok: true,
      reason: 'matches',
      expectedUnit: ['A', 'B'],
    });
  });
});
