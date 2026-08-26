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
  readonly id: DisplayTokenId;
  readonly labelKo: string;
  readonly iconId: string;
  readonly patternMarkId: PatternMarkId;
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
  return {
    id,
    tokens: Object.freeze({
      A: Object.freeze({ id: a, labelKo: labelFor(a), iconId: `${id}-${a}-svg`, patternMarkId: 'dots' }),
      B: Object.freeze({ id: b, labelKo: labelFor(b), iconId: `${id}-${b}-svg`, patternMarkId: 'stripes' }),
      C: Object.freeze({ id: c, labelKo: labelFor(c), iconId: `${id}-${c}-svg`, patternMarkId: 'crosshatch' }),
    }),
  };
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
