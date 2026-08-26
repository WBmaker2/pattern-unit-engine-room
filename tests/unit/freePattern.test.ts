import { describe, expect, it } from 'vitest';

import { validateFreeTrack } from '../../src/domain/pattern/freePattern';

describe('자유 규칙 판정', () => {
  it.each([
    [['A', 'B'], false, 'needs-second-repeat', 1],
    [['A', 'B', 'A', 'B'], true, 'matches', 2],
    [['A', 'A', 'B', 'A', 'A', 'B'], true, 'matches', 2],
    [['A', 'A', 'A', 'A'], false, 'unit-needs-two-symbols', 4],
    [['A', 'B', 'C', 'A', 'B'], false, 'does-not-repeat', 0],
  ] as const)('자유 선로의 반복 조건을 판정한다', (track, ok, reason, repeatCount) => {
    expect(validateFreeTrack(track)).toMatchObject({ ok, reason, repeatCount });
  });

  it('길이 3의 서로 다른 기호 선로는 두 번째 반복을 기다린다', () => {
    expect(validateFreeTrack(['A', 'B', 'A'])).toMatchObject({
      ok: false,
      reason: 'needs-second-repeat',
      repeatCount: 1,
    });
  });

  it('반복 단위 길이 1은 두 기호 단위가 필요하다고 알린다', () => {
    expect(validateFreeTrack(['B', 'B'])).toMatchObject({
      ok: false,
      reason: 'unit-needs-two-symbols',
      repeatCount: 2,
      expectedUnit: ['B'],
    });
  });

  it('반복 단위 길이 4는 허용 범위를 벗어났다고 알린다', () => {
    expect(validateFreeTrack(['A', 'B', 'C', 'A', 'A', 'B', 'C', 'A'])).toMatchObject({
      ok: false,
      reason: 'unit-length-out-of-range',
      repeatCount: 2,
      expectedUnit: ['A', 'B', 'C', 'A'],
    });
  });

  it('판정 중 입력 선로를 바꾸지 않는다', () => {
    const track = ['A', 'B', 'A', 'B'] as const;
    const snapshot = [...track];

    validateFreeTrack(track);

    expect(track).toEqual(snapshot);
  });
});
