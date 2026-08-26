import { describe, expect, it } from 'vitest';

import { COPY } from '../../src/content/copy';

describe('학습 문구', () => {
  it('핵심 안내 문구를 정확히 제공한다', () => {
    expect(COPY).toMatchObject({
      startTitle: '기관실 문을 열어 볼까요?',
      findInstruction: '가장 짧게 되풀이되는 한 묶음을 골라요.',
      continueInstruction: '한 묶음을 보고 다음 칸을 이어 보세요.',
      repairInstruction: '규칙을 깨뜨린 칸을 찾아 고쳐요.',
      translateInstruction: '같은 순서를 새 모양으로 바꾸어 보세요.',
      createInstruction: '2~3개로 내 한 묶음을 만들어요.',
      retryNotShortest: '되풀이되지만 더 짧은 한 묶음이 있어요.',
      retryDoesNotRepeat: '이 묶음으로는 끝까지 되풀이되지 않아요.',
      hintUnitOutline: '테두리로 나눈 묶음을 차례로 살펴보세요.',
      needsSecondRepeat: '같은 묶음을 한 번 더 붙여 보세요.',
      strategyUsed: '테두리 도움을 사용해 규칙을 찾았어요.',
      complete: '찾고, 잇고, 고치고, 바꾸고, 만들었어요.',
    });
  });

  it('안내 문구는 짧고 경쟁을 부추기지 않는다', () => {
    const banned = /(점수|순위|속도|빠르|경쟁|증가|곱셈|분류|열 묶음)/;
    for (const text of Object.values(COPY)) {
      expect([...text].length).toBeLessThanOrEqual(32);
      expect(text).not.toMatch(banned);
    }
  });
});
