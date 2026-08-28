import type { JSX } from 'react';

import type { TokenThemeId } from '../content/tokenThemes';
import type { PatternTokenId } from '../domain/pattern/types';

import { PatternBoard } from './PatternBoard';

export interface AnimatedPatternTrackProps {
  readonly slots: readonly PatternTokenId[];
  readonly themeId: TokenThemeId;
  readonly reducedMotion: boolean;
  readonly isRunning: boolean;
  readonly label: string;
}

function getRepetitionLength(slots: readonly PatternTokenId[]): number | null {
  for (let length = 1; length <= Math.floor(slots.length / 2); length += 1) {
    if (slots.length % length !== 0) continue;
    if (slots.every((slot, index) => slot === slots[index % length])) return length;
  }
  return null;
}

function getActiveIndices(slots: readonly PatternTokenId[]): readonly number[] {
  const repetitionLength = getRepetitionLength(slots);
  if (repetitionLength === null) return [];
  return Array.from(
    { length: slots.length / repetitionLength },
    (_, repeatIndex) => repeatIndex * repetitionLength,
  );
}

export function AnimatedPatternTrack({
  slots,
  themeId,
  reducedMotion,
  isRunning,
  label,
}: AnimatedPatternTrackProps): JSX.Element {
  const className = isRunning ? 'train-track train-track--moving' : 'train-track';
  const activeIndices = isRunning && reducedMotion ? getActiveIndices(slots) : [];

  return (
    <section aria-label={label} className={className}>
      <PatternBoard
        activeIndices={activeIndices}
        slots={slots}
        themeId={themeId}
      />
    </section>
  );
}
