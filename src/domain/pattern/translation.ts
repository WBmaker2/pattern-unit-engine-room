import type {
  PatternTokenId,
  PatternValidation,
  TranslationPair,
} from './types';

export function validateTranslation<TTarget extends string>(
  sourceSequence: readonly PatternTokenId[],
  pairs: readonly TranslationPair<TTarget>[],
  translated: readonly TTarget[],
): PatternValidation {
  const sourceIds = new Set(sourceSequence);
  const mapping = new Map<PatternTokenId, TTarget>();
  const targetIds = new Set<TTarget>();

  for (const pair of pairs) {
    if (
      !sourceIds.has(pair.source) ||
      mapping.has(pair.source) ||
      targetIds.has(pair.target)
    ) {
      return { ok: false, reason: 'mapping-not-bijective' };
    }

    mapping.set(pair.source, pair.target);
    targetIds.add(pair.target);
  }

  if (mapping.size !== sourceIds.size) {
    return { ok: false, reason: 'mapping-not-bijective' };
  }

  if (sourceIds.size === 0 && translated.length !== 0) {
    return { ok: false, reason: 'mapping-not-bijective' };
  }

  const expectedTranslated: TTarget[] = [];

  for (const source of sourceSequence) {
    const target = mapping.get(source);
    if (target === undefined) {
      return { ok: false, reason: 'mapping-not-bijective' };
    }
    expectedTranslated.push(target);
  }

  const sameOrder =
    expectedTranslated.length === translated.length &&
    expectedTranslated.every((target, index) => target === translated[index]);

  if (!sameOrder) {
    return { ok: false, reason: 'order-changed' };
  }

  return { ok: true, reason: 'matches' };
}
