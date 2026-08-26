import type {
  PatternSlot,
  PatternTokenId,
  PatternUnit,
  PatternValidation,
} from './types';

export function expectedTokensForSlots(
  unit: PatternUnit,
  slots: readonly PatternSlot[],
): PatternTokenId[] {
  if (unit.length === 0) {
    return [];
  }

  const expectedTokens: PatternTokenId[] = [];

  slots.forEach((slot, index) => {
    if (slot !== null) {
      return;
    }

    const expected = unit[index % unit.length];
    if (expected !== undefined) {
      expectedTokens.push(expected);
    }
  });

  return expectedTokens;
}

export function validateContinuation(
  unit: PatternUnit,
  slots: readonly PatternSlot[],
  answer: PatternUnit,
): PatternValidation {
  if (unit.length === 0) {
    return { ok: false, reason: 'does-not-repeat', expectedTokens: [] };
  }

  const expectedForVisibleSlots: PatternTokenId[] = [];
  const expectedTokens = expectedTokensForSlots(unit, slots);

  for (const [index, slot] of slots.entries()) {
    const expected = unit[index % unit.length];
    if (expected === undefined) {
      continue;
    }

    if (slot !== null && slot !== expected) {
      expectedForVisibleSlots.push(expected);
    }
  }

  if (expectedForVisibleSlots.length > 0) {
    return {
      ok: false,
      reason: 'does-not-repeat',
      expectedTokens,
    };
  }

  const answerMatches =
    answer.length === expectedTokens.length &&
    answer.every((token, index) => token === expectedTokens[index]);

  if (!answerMatches) {
    return {
      ok: false,
      reason: 'wrong-continuation',
      expectedTokens,
    };
  }

  return { ok: true, reason: 'matches', expectedTokens };
}
