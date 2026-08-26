import type { JSX } from 'react';
import type { PatternTokenId } from '../domain/pattern/types';
import type { TokenVisual } from '../content/tokenThemes';

import { TokenIcon } from './TokenIcon';

export interface PatternCellProps {
  readonly index: number;
  readonly tokenId: PatternTokenId | null;
  readonly visual: TokenVisual | null;
  readonly ariaLabel: string;
  readonly active?: boolean;
  readonly selected?: boolean;
  readonly onSelect?: (index: number) => void;
}

const cellClasses = (active: boolean, selected: boolean): string =>
  [
    'pattern-cell',
    active ? 'pattern-cell--active' : '',
    selected ? 'pattern-cell--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

export function PatternCell({
  index,
  tokenId,
  visual,
  ariaLabel,
  active = false,
  selected = false,
  onSelect,
}: PatternCellProps): JSX.Element {
  const selectable = onSelect !== undefined;
  const className = cellClasses(active, selected);
  const patternClass = visual === null ? '' : `pattern-mark--${visual.patternMarkId}`;
  const controlClassName = [
    className,
    selectable ? 'pattern-cell--selectable' : '',
    patternClass,
  ]
    .filter(Boolean)
    .join(' ');
  const dataAttributes = {
    'data-icon': visual?.iconId ?? 'empty',
    'data-icon-id': visual?.iconId ?? 'empty',
    'data-pattern': visual?.patternMarkId ?? 'empty',
    'data-pattern-mark': visual?.patternMarkId ?? 'empty',
    'data-token-id': tokenId ?? 'empty',
  };

  const content = (
    <>
      {visual !== null ? (
        <TokenIcon id={visual.iconId} className="pattern-cell__icon" />
      ) : (
        <span aria-hidden="true" className="pattern-cell__empty" />
      )}
    </>
  );

  return (
    <li className="pattern-cell__item">
      {selectable ? (
        <button
          aria-label={ariaLabel}
          aria-pressed={selected}
          className={controlClassName}
          onClick={() => onSelect(index)}
          type="button"
          {...dataAttributes}
        >
          {content}
        </button>
      ) : (
        <span aria-label={ariaLabel} className={controlClassName} role="img" {...dataAttributes}>
          {content}
        </span>
      )}
    </li>
  );
}
