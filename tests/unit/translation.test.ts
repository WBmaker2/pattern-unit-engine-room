import { describe, expect, it } from 'vitest';

import { validateTranslation } from '../../src/domain/pattern/translation';

describe('외형 번역 판정', () => {
  const pairs = [
    { source: 'A', target: 'train' },
    { source: 'B', target: 'star' },
  ] as const;

  it('일대일 대응과 원래 순서를 함께 지키면 승인한다', () => {
    expect(
      validateTranslation(
        ['A', 'B', 'A', 'B'],
        pairs,
        ['train', 'star', 'train', 'star'],
      ),
    ).toMatchObject({ ok: true, reason: 'matches' });
  });

  it('서로 다른 원래 항을 같은 새 항에 대응시키면 거절한다', () => {
    const duplicatePairs = [
      { source: 'A', target: 'train' },
      { source: 'B', target: 'train' },
    ] as const;

    expect(validateTranslation(['A', 'B'], duplicatePairs, ['train', 'train']))
      .toMatchObject({ ok: false, reason: 'mapping-not-bijective' });
  });

  it('대응은 맞아도 순서가 바뀌면 거절한다', () => {
    expect(validateTranslation(['A', 'B'], pairs, ['star', 'train'])).toMatchObject({
      ok: false,
      reason: 'order-changed',
    });
  });

  it('실제로 등장한 원래 항의 대응이 누락되면 거절한다', () => {
    expect(
      validateTranslation(['A', 'B'], [{ source: 'A', target: 'train' }], [
        'train',
        'star',
      ]),
    ).toMatchObject({ ok: false, reason: 'mapping-not-bijective' });
  });

  it('등장하지 않은 원래 항의 추가 대응이 있으면 거절한다', () => {
    expect(
      validateTranslation(
        ['A'],
        [
          { source: 'A', target: 'train' },
          { source: 'B', target: 'star' },
        ],
        ['train'],
      ),
    ).toMatchObject({ ok: false, reason: 'mapping-not-bijective' });
  });

  it('같은 원래 항에 대응을 두 번 주면 거절한다', () => {
    expect(
      validateTranslation(
        ['A'],
        [
          { source: 'A', target: 'train' },
          { source: 'A', target: 'star' },
        ],
        ['train'],
      ),
    ).toMatchObject({ ok: false, reason: 'mapping-not-bijective' });
  });

  it('빈 원래 수열은 빈 대응과 빈 번역일 때만 승인한다', () => {
    expect(validateTranslation([], [], [])).toEqual({ ok: true, reason: 'matches' });
    expect(validateTranslation([], [], ['train'])).toMatchObject({
      ok: false,
      reason: 'mapping-not-bijective',
    });
    expect(validateTranslation([], [{ source: 'A', target: 'train' }], [])).toMatchObject({
      ok: false,
      reason: 'mapping-not-bijective',
    });
  });

  it('판정 중 입력 배열과 대응 객체를 바꾸지 않는다', () => {
    const sourceSequence = ['A', 'B', 'A'] as const;
    const inputPairs = [
      { source: 'A', target: 'train' },
      { source: 'B', target: 'star' },
    ] as const;
    const translated = ['train', 'star', 'train'] as const;
    const sourceSnapshot = [...sourceSequence];
    const pairsSnapshot = inputPairs.map((pair) => ({ ...pair }));
    const translatedSnapshot = [...translated];

    validateTranslation(sourceSequence, inputPairs, translated);

    expect(sourceSequence).toEqual(sourceSnapshot);
    expect(inputPairs).toEqual(pairsSnapshot);
    expect(translated).toEqual(translatedSnapshot);
  });
});
