import { describe, expect, it } from 'vitest';

import { validateContinuation } from '../../src/domain/pattern/continuation';
import { validateRepair } from '../../src/domain/pattern/repair';
import { validateUnitChoice } from '../../src/domain/pattern/repetition';
import { validateTranslation } from '../../src/domain/pattern/translation';
import { MISSIONS, getJourney, getMission, JOURNEYS } from '../../src/content/missions';
import type { Mission } from '../../src/content/missions/types';

const countBy = <T, K extends PropertyKey>(items: readonly T[], key: (item: T) => K) =>
  Object.fromEntries(
    [...new Set(items.map(key))].map((value) => [value, items.filter((item) => key(item) === value).length]),
  );

const getChoiceCount = (mission: Mission): number => {
  switch (mission.kind) {
    case 'find':
      return mission.candidates.length;
    case 'continue':
      return mission.choices.length;
    case 'repair':
      return mission.replacementChoices.length;
    case 'translate':
      return mission.targetPool.length;
  }
};

const countCorrectChoices = (mission: Mission): number => {
  switch (mission.kind) {
    case 'find':
      return mission.candidates.filter((candidate) => validateUnitChoice(mission.sequence, candidate).ok).length;
    case 'continue':
      return mission.choices.filter((choice) => validateContinuation(mission.unit, mission.slots, choice).ok).length;
    case 'repair': {
      const mismatch = mission.brokenSequence.findIndex(
        (token, index) => token !== mission.unit[index % mission.unit.length],
      );
      return mission.replacementChoices.filter(
        (choice) => validateRepair(mission.brokenSequence, mission.unit, mismatch, choice).ok,
      ).length;
    }
    case 'translate': {
      const translated = mission.sourceSequence.map(
        (source) => mission.correctPairs.find((pair) => pair.source === source)?.target,
      );
      return validateTranslation(mission.sourceSequence, mission.correctPairs, translated).ok ? 1 : 0;
    }
  }
};

describe('미션 카탈로그', () => {
  it('미션 종류별 5개와 구조별 5개를 제공한다', () => {
    expect(MISSIONS).toHaveLength(20);
    expect(countBy(MISSIONS, (mission) => mission.kind)).toEqual({
      find: 5,
      continue: 5,
      repair: 5,
      translate: 5,
    });
    expect(countBy(MISSIONS, (mission) => mission.structure)).toEqual({
      AB: 5,
      AAB: 5,
      ABB: 5,
      ABC: 5,
    });
  });

  it('모든 후보는 4개 이하이고 도메인 판정으로 정답이 하나다', () => {
    for (const mission of MISSIONS) {
      expect(getChoiceCount(mission)).toBeLessThanOrEqual(4);
      expect(countCorrectChoices(mission)).toBe(1);
    }
  });

  it('미션 ID와 Journey 연결은 중복·누락 없이 정확하다', () => {
    expect(new Set(MISSIONS.map((mission) => mission.id)).size).toBe(MISSIONS.length);
    const journeyMissionIds = JOURNEYS.flatMap((journey) => [
      journey.findId,
      journey.continueId,
      journey.repairId,
      journey.translateId,
    ]);
    expect(new Set(journeyMissionIds).size).toBe(MISSIONS.length);
    expect(journeyMissionIds.sort()).toEqual(MISSIONS.map((mission) => mission.id).sort());
    expect(JOURNEYS).toHaveLength(5);
  });

  it('Journey와 미션 조회는 알 수 없는 런타임 값에서 빠르게 실패한다', () => {
    expect(getJourney(0)).toEqual(JOURNEYS[0]);
    expect(getMission('find-ab-engine')).toBe(MISSIONS[0]);
    expect(() => getJourney(99 as never)).toThrowError(RangeError);
    expect(() => getMission('unknown-mission')).toThrowError(RangeError);
  });

  it('카탈로그 데이터는 런타임에서도 변경되지 않는다', () => {
    const first = MISSIONS[0];
    expect(() => {
      (first as { id: string }).id = 'changed';
    }).toThrowError(TypeError);
    expect(MISSIONS[0]?.id).toBe('find-ab-engine');
  });
});
