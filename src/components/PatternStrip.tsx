import type { JSX } from 'react';

import { getTokenVisual, type TokenThemeId } from '../content/tokenThemes';
import type { PatternTokenId } from '../domain/pattern/types';

import { TokenIcon } from './TokenIcon';

export interface PatternStripProps {
  readonly slots: readonly PatternTokenId[];
  readonly themeId: TokenThemeId;
}

export function PatternStrip({ slots, themeId }: PatternStripProps): JSX.Element {
  return (
    <span aria-hidden="true" className="pattern-strip">
      {slots.map((tokenId, index) => {
        const visual = getTokenVisual(themeId, tokenId);
        return (
          <span
            className={`pattern-strip__cell pattern-mark--${visual.patternMarkId}`}
            data-icon={visual.iconId}
            data-icon-id={visual.iconId}
            data-pattern={visual.patternMarkId}
            data-pattern-mark={visual.patternMarkId}
            data-token-id={tokenId}
            key={`${index}-${tokenId}`}
          >
            <TokenIcon id={visual.iconId} className="pattern-strip__icon" />
          </span>
        );
      })}
    </span>
  );
}
