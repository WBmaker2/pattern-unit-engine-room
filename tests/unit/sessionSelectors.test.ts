import { describe, expect, it } from 'vitest';
import { createInitialSession } from '../../src/features/session/reducer';
import { selectJourneyProgress } from '../../src/features/session/selectors';

describe('selectJourneyProgress', () => {
  it('시작 상태에서는 모든 단계를 예정으로 표시한다', () => {
    expect(selectJourneyProgress(createInitialSession()).map((item) => item.status)).toEqual(['upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming']);
  });
});
