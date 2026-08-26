import { describe, expect, it } from 'vitest';

import { getTokenVisual, TOKEN_THEMES } from '../../src/content/tokenThemes';

describe('시각 토큰 테마', () => {
  it('각 토큰은 고정된 표시 ID·아이콘 ID·이름·무늬·색 토큰을 가진다', () => {
    for (const theme of TOKEN_THEMES) {
      for (const visual of Object.values(theme.tokens)) {
        expect(visual.displayTokenId.length).toBeGreaterThan(0);
        expect(visual.labelKo.length).toBeGreaterThan(0);
        expect(visual.iconId).toBe(visual.displayTokenId);
        expect(visual.patternMarkId.length).toBeGreaterThan(0);
        expect(['점무늬', '줄무늬', '격자무늬']).toContain(visual.patternLabelKo);
        expect(visual.colorToken.length).toBeGreaterThan(0);
      }
      expect(new Set(Object.values(theme.tokens).map((token) => token.displayTokenId)).size).toBe(3);
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
    expect(getTokenVisual('shapes', 'A')).toMatchObject({
      displayTokenId: 'circle',
      iconId: 'circle',
      labelKo: '동그라미',
      patternLabelKo: '점무늬',
    });
    expect(() => getTokenVisual('unknown' as never, 'A')).toThrowError(RangeError);
    expect(() => getTokenVisual('shapes', 'Z' as never)).toThrowError(RangeError);
  });

  it('테마·토큰 맵·각 시각 객체는 런타임에서 변경되지 않는다', () => {
    const theme = TOKEN_THEMES[0]!;
    const visual = theme.tokens.A;
    expect(() => {
      (theme as { id: string }).id = 'changed';
    }).toThrowError(TypeError);
    expect(() => {
      (theme.tokens as { A: typeof visual }).A = visual;
    }).toThrowError(TypeError);
    expect(() => {
      (visual as { labelKo: string }).labelKo = 'changed';
    }).toThrowError(TypeError);
    expect(theme.id).toBe('engine');
    expect(theme.tokens.A).toBe(visual);
    expect(visual.labelKo).toBe('톱니바퀴');
  });
});
