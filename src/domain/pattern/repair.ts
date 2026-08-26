import type {
  PatternTokenId,
  PatternUnit,
  PatternValidation,
} from './types';

export function findMismatchIndices(
  sequence: readonly PatternTokenId[],
  unit: PatternUnit,
): number[] {
  const mismatchIndices: number[] = [];

  sequence.forEach((token, index) => {
    if (token !== unit[index % unit.length]) {
      mismatchIndices.push(index);
    }
  });

  return mismatchIndices;
}

export function validateRepair(
  sequence: readonly PatternTokenId[],
  unit: PatternUnit,
  selectedIndex: number,
  replacement: PatternTokenId,
): PatternValidation {
  const mismatchIndices = findMismatchIndices(sequence, unit);

  if (mismatchIndices.length !== 1) {
    return { ok: false, reason: 'does-not-repeat', mismatchIndices };
  }

  if (selectedIndex !== mismatchIndices[0]) {
    return { ok: false, reason: 'wrong-position', mismatchIndices };
  }

  const expectedToken = unit[selectedIndex % unit.length];
  if (expectedToken === undefined) {
    return { ok: false, reason: 'does-not-repeat', mismatchIndices };
  }

  if (replacement !== expectedToken) {
    return {
      ok: false,
      reason: 'wrong-replacement',
      mismatchIndices,
      expectedTokens: [expectedToken],
    };
  }

  return { ok: true, reason: 'matches', mismatchIndices };
}
