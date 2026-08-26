import { findShortestRepeatingUnit } from './repetition';
import type {
  FreePatternValidation,
  PatternTokenId,
  PatternUnit,
} from './types';

function oneSymbolResult(
  track: readonly PatternTokenId[],
): FreePatternValidation {
  const expectedUnit: PatternUnit = track.length > 0 ? [track[0]!] : [];

  return {
    ok: false,
    reason: 'unit-needs-two-symbols',
    repeatCount: track.length,
    expectedUnit,
  };
}

export function validateFreeTrack(
  track: readonly PatternTokenId[],
): FreePatternValidation {
  if (track.length === 0) {
    return { ok: false, reason: 'does-not-repeat', repeatCount: 0 };
  }

  const distinctIds = new Set(track);
  if (distinctIds.size === 1) {
    return oneSymbolResult(track);
  }

  const expectedUnit = findShortestRepeatingUnit(track);
  if (expectedUnit === null) {
    if (track.length >= 2 && track.length <= 3) {
      return { ok: false, reason: 'needs-second-repeat', repeatCount: 1 };
    }

    return { ok: false, reason: 'does-not-repeat', repeatCount: 0 };
  }

  const repeatCount = track.length / expectedUnit.length;

  if (expectedUnit.length < 2) {
    return {
      ...oneSymbolResult(track),
      expectedUnit,
      repeatCount,
    };
  }

  if (expectedUnit.length > 3) {
    return {
      ok: false,
      reason: 'unit-length-out-of-range',
      repeatCount,
      expectedUnit,
    };
  }

  return { ok: true, reason: 'matches', repeatCount, expectedUnit };
}
