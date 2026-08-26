/* eslint-disable react-refresh/only-export-components */
import type { JSX } from 'react';
import type { PatternSlot } from '../domain/pattern/types';
import { getTokenVisual, type TokenThemeId, type TokenVisual } from '../content/tokenThemes';

import { PatternCell } from './PatternCell';

export interface PatternBoardProps {
  readonly slots: readonly PatternSlot[];
  readonly themeId: TokenThemeId;
  readonly activeIndices?: readonly number[];
  readonly selectedIndex?: number | null;
  readonly onSelect?: (index: number) => void;
}

const ORDINALS = [
  '첫째',
  '둘째',
  '셋째',
  '넷째',
  '다섯째',
  '여섯째',
  '일곱째',
  '여덟째',
  '아홉째',
] as const;

export function formatCellAriaLabel(index: number, visual: TokenVisual): string {
  const ordinal = ORDINALS[index] ?? `${index + 1}번째`;
  return `${ordinal} 칸, ${visual.labelKo} 모양, ${visual.patternLabelKo}`;
}

export function formatEmptyCellAriaLabel(index: number): string {
  const ordinal = ORDINALS[index] ?? `${index + 1}번째`;
  return `${ordinal} 칸, 빈칸`;
}

export function PatternBoard({
  slots,
  themeId,
  activeIndices = [],
  selectedIndex = null,
  onSelect,
}: PatternBoardProps): JSX.Element {
  return (
    <ol aria-label="규칙 배열" className="pattern-board">
      {slots.map((tokenId, index) => {
        const visual = tokenId === null ? null : getTokenVisual(themeId, tokenId);
        const ariaLabel = visual === null
          ? formatEmptyCellAriaLabel(index)
          : formatCellAriaLabel(index, visual);

        return (
          <PatternCell
            active={activeIndices.includes(index)}
            ariaLabel={ariaLabel}
            index={index}
            key={`${index}-${tokenId ?? 'empty'}`}
            {...(onSelect === undefined ? {} : { onSelect })}
            selected={selectedIndex === index}
            tokenId={tokenId}
            visual={visual}
          />
        );
      })}
    </ol>
  );
}
