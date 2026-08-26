import type {
  PatternTokenId,
  PatternUnit,
  PatternValidation,
} from './types';

export function findShortestRepeatingUnit(
  sequence: readonly PatternTokenId[],
): PatternTokenId[] | null {
  for (let length = 1; length <= Math.floor(sequence.length / 2); length += 1) {
    if (sequence.length % length !== 0) {
      continue;
    }

    const unit = sequence.slice(0, length);
    const repeats = sequence.every(
      (token, index) => token === unit[index % length],
    );

    if (repeats) {
      return unit;
    }
  }

  return null;
}

export function repeatUnit(
  unit: PatternUnit,
  repeatCount: number,
): PatternTokenId[] {
  if (
    !Number.isFinite(repeatCount) ||
    !Number.isInteger(repeatCount) ||
    repeatCount <= 0
  ) {
    return [];
  }

  const repeated: PatternTokenId[] = [];

  for (let count = 0; count < repeatCount; count += 1) {
    repeated.push(...unit);
  }

  return repeated;
}

export function validateUnitChoice(
  sequence: readonly PatternTokenId[],
  candidate: PatternUnit,
): PatternValidation {
  const expectedUnit = findShortestRepeatingUnit(sequence);

  if (expectedUnit === null) {
    return { ok: false, reason: 'does-not-repeat' };
  }

  const canReconstructSequence =
    candidate.length > 0 &&
    sequence.length % candidate.length === 0 &&
    repeatUnit(candidate, sequence.length / candidate.length).every(
      (token, index) => token === sequence[index],
    );

  if (!canReconstructSequence) {
    return { ok: false, reason: 'does-not-repeat', expectedUnit };
  }

  const isExpected =
    candidate.length === expectedUnit.length &&
    candidate.every((token, index) => token === expectedUnit[index]);

  if (!isExpected) {
    return { ok: false, reason: 'not-shortest', expectedUnit };
  }

  return { ok: true, reason: 'matches', expectedUnit };
}
