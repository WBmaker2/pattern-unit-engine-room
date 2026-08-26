import { describe, expect, it } from 'vitest';

import { getTokenVisual, TOKEN_THEMES } from '../../src/content/tokenThemes';

describe('시각 토큰 테마', () => {
  it('각 토큰은 이름·SVG 아이콘·무늬를 모두 가진다', () => {
    for (const theme of TOKEN_THEMES) {
      for (const visual of Object.values(theme.tokens)) {
        expect(visual.labelKo.length).toBeGreaterThan(0);
        expect(visual.iconId.length).toBeGreaterThan(0);
        expect(visual.patternMarkId.length).toBeGreaterThan(0);
      }
      expect(new Set(Object.values(theme.tokens).map((token) => token.iconId)).size).toBe(3);
      expect(new Set(Object.values(theme.tokens).map((token) => token.patternMarkId)).size).toBe(3);
    }
  });

  it('A/B/C는 모든 테마에서 점·줄·교차 무늬로 분리된다', () => {
    for (const theme of TOKEN_THEMES) {
      expect(Object.values(theme.tokens).map((token) => token.patternMarkId)).toEqual([
        'dots',
        'stripes',
        'crosshatch',
      ]);
    }
  });

  it('테마와 패턴 토큰으로 시각 정보를 조회한다', () => {
    expect(getTokenVisual('shapes', 'A')).toMatchObject({ id: 'circle', labelKo: '동그라미' });
    expect(() => getTokenVisual('unknown' as never, 'A')).toThrowError(RangeError);
    expect(() => getTokenVisual('shapes', 'Z' as never)).toThrowError(RangeError);
  });
});
