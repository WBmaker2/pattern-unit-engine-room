import type { PatternTokenId } from '../domain/pattern/types';

export type TokenThemeId = 'engine' | 'shapes' | 'symbols' | 'actions' | 'cars' | 'signals';

export type DisplayTokenId =
  | 'gear'
  | 'bolt'
  | 'lamp'
  | 'circle'
  | 'triangle'
  | 'square'
  | 'star'
  | 'flag'
  | 'diamond'
  | 'hand-up'
  | 'clap'
  | 'step'
  | 'wheel'
  | 'window'
  | 'train';

export type PatternMarkId = 'dots' | 'stripes' | 'crosshatch';

export interface TokenVisual {
  readonly displayTokenId: DisplayTokenId;
  readonly labelKo: string;
  readonly iconId: DisplayTokenId;
  readonly patternMarkId: PatternMarkId;
  readonly patternLabelKo: '점무늬' | '줄무늬' | '격자무늬';
  readonly colorToken: string;
}

export interface TokenTheme {
  readonly id: TokenThemeId;
  readonly tokens: Readonly<Record<PatternTokenId, TokenVisual>>;
}

const theme = (
  id: TokenThemeId,
  visuals: readonly [DisplayTokenId, DisplayTokenId, DisplayTokenId],
): TokenTheme => {
  const [a, b, c] = visuals;
  return Object.freeze({
    id,
    tokens: Object.freeze({
      A: Object.freeze({
        displayTokenId: a,
        labelKo: labelFor(a),
        iconId: a,
        patternMarkId: 'dots',
        patternLabelKo: '점무늬',
        colorToken: 'color-a',
      }),
      B: Object.freeze({
        displayTokenId: b,
        labelKo: labelFor(b),
        iconId: b,
        patternMarkId: 'stripes',
        patternLabelKo: '줄무늬',
        colorToken: 'color-b',
      }),
      C: Object.freeze({
        displayTokenId: c,
        labelKo: labelFor(c),
        iconId: c,
        patternMarkId: 'crosshatch',
        patternLabelKo: '격자무늬',
        colorToken: 'color-c',
      }),
    }),
  });
};

const labelFor = (id: DisplayTokenId): string => {
  const labels: Record<DisplayTokenId, string> = {
    gear: '톱니바퀴',
    bolt: '나사못',
    lamp: '전등',
    circle: '동그라미',
    triangle: '세모',
    square: '네모',
    star: '별',
    flag: '깃발',
    diamond: '마름모',
    'hand-up': '손들기',
    clap: '손뼉',
    step: '발걸음',
    wheel: '바퀴',
    window: '창문',
    train: '기차',
  };
  return labels[id];
};

export const TOKEN_THEMES: readonly TokenTheme[] = Object.freeze([
  theme('engine', ['gear', 'bolt', 'lamp']),
  theme('shapes', ['circle', 'triangle', 'square']),
  theme('symbols', ['star', 'flag', 'diamond']),
  theme('actions', ['hand-up', 'clap', 'step']),
  theme('cars', ['wheel', 'window', 'train']),
  theme('signals', ['lamp', 'flag', 'star']),
]);

export function getTokenVisual(themeId: TokenThemeId, tokenId: PatternTokenId): TokenVisual {
  const selectedTheme = TOKEN_THEMES.find((candidate) => candidate.id === themeId);
  const visual = selectedTheme?.tokens[tokenId];
  if (visual === undefined) {
    throw new RangeError(`Unknown token visual: ${themeId}/${tokenId}`);
  }
  return visual;
}

export function getDisplayTokenVisual(themeId: TokenThemeId, displayTokenId: DisplayTokenId): TokenVisual {
  const selectedTheme = TOKEN_THEMES.find((candidate) => candidate.id === themeId);
  const visual = selectedTheme === undefined
    ? undefined
    : Object.values(selectedTheme.tokens).find((candidate) => candidate.displayTokenId === displayTokenId);
  if (visual === undefined) {
    throw new RangeError(`Unknown display token visual: ${themeId}/${displayTokenId}`);
  }
  return visual;
}

export const getTokenVisualByDisplayId = getDisplayTokenVisual;
