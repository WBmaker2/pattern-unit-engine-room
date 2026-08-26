import { describe, expect, it } from 'vitest';

import {
  expectedTokensForSlots,
  validateContinuation,
} from '../../src/domain/pattern/continuation';

describe('반복 단위 이어 붙이기', () => {
  it('한 칸과 두 칸의 기대 항을 원래 인덱스로 계산한다', () => {
    expect(
      expectedTokensForSlots(['A', 'B', 'C'], ['A', 'B', 'C', 'A', 'B', null]),
    ).toEqual(['C']);
    expect(
      expectedTokensForSlots(['A', 'B', 'B'], ['A', 'B', 'B', 'A', null, null]),
    ).toEqual(['B', 'B']);
  });

  it('보이는 항이 단위와 맞지 않으면 이어 붙이기를 승인하지 않는다', () => {
    expect(validateContinuation(['A', 'B'], ['A', 'A', null], ['B'])).toMatchObject({
      ok: false,
      reason: 'does-not-repeat',
    });
  });

  it('빈칸의 기대 항을 올바른 순서로 제출하면 정답이다', () => {
    expect(
      validateContinuation(['A', 'B', 'C'], ['A', 'B', null, 'A', null], ['C', 'B']),
    ).toEqual({
      ok: true,
      reason: 'matches',
      expectedTokens: ['C', 'B'],
    });
  });

  it('빈칸의 기대 항과 다른 답은 오답이다', () => {
    expect(
      validateContinuation(['A', 'B', 'C'], ['A', 'B', null], ['B']),
    ).toMatchObject({
      ok: false,
      reason: 'wrong-continuation',
      expectedTokens: ['C'],
    });
  });
});
