import { describe, expect, it } from 'vitest';

import {
  COPY,
  formatFindCandidate,
  formatOriginalToken,
  formatTokenShape,
  formatUnitChoice,
} from '../../src/content/copy';

describe('학습 문구', () => {
  it('핵심 안내 문구를 정확히 제공한다', () => {
    expect(COPY).toMatchObject({
      appTitle: '규칙 단위 기관실',
      cellSuffix: '칸',
      shapeSuffix: '모양',
      originalTokenSuffix: '원래 항',
      emptyCellLabel: '빈칸',
      patternBoardLabel: '규칙 배열',
      startAction: '운행 시작',
      settingsAction: '접근성 설정',
      startTitle: '기관실 문을 열어 볼까요?',
      findTitle: '한 묶음 찾기',
      continueTitle: '다음 칸 이어 붙이기',
      findSubmit: '한 묶음 찾기',
      continueSubmit: '이어 붙이기',
      repairTitle: '규칙 수리하기',
      repairChoicesLabel: '새 모양 선택',
      repairSubmit: '고치기',
      repairSuccess: '규칙을 깨뜨린 칸을 고쳤어요.',
      retryWrongPosition: '규칙을 깨뜨린 칸을 다시 찾아봐요.',
      retryWrongReplacement: '선택한 칸에 들어갈 모양을 다시 골라요.',
      translateTitle: '새 모양으로 바꾸기',
      translationSourceLabel: '바꿀 원래 항',
      translationTargetLabel: '새 모양 선택',
      translateSubmit: '같은 규칙 확인',
      translateSuccess: '모양은 달라도 같은 순서예요.',
      retryMappingNotBijective: '서로 다른 항에는 서로 다른 새 모양을 골라요.',
      retryOrderChanged: '새 모양의 순서를 다시 살펴봐요.',
      nextStage: '다음 칸',
      findHintAction: '테두리 도움 보기',
      findChoicesLabel: '후보 묶음 선택',
      continueChoicesLabel: '다음 칸 선택',
      candidatePrefix: '후보',
      unitCountOne: '한',
      unitCountTwo: '두',
      unitCountThree: '세',
      unitCountSuffix: '칸',
      findInstruction: '가장 짧게 되풀이되는 한 묶음을 골라요.',
      continueInstruction: '한 묶음을 보고 다음 칸을 이어 보세요.',
      repairInstruction: '규칙을 깨뜨린 칸을 찾아 고쳐요.',
      translateInstruction: '같은 순서를 새 모양으로 바꾸어 보세요.',
      createInstruction: '2~3개로 내 한 묶음을 만들어요.',
      retryNotShortest: '되풀이되지만 더 짧은 한 묶음이 있어요.',
      retryDoesNotRepeat: '이 묶음으로는 끝까지 되풀이되지 않아요.',
      findSuccess: '가장 짧은 한 묶음을 찾았어요.',
      continueSuccess: '한 묶음으로 다음 칸을 이었어요.',
      retryWrongContinuation: '한 묶음의 순서를 다시 살펴봐요.',
      hintUnitOutline: '테두리로 나눈 묶음을 차례로 살펴보세요.',
      needsSecondRepeat: '같은 묶음을 한 번 더 붙여 보세요.',
      strategyUsed: '테두리 도움을 사용해 규칙을 찾았어요.',
      complete: '찾고, 잇고, 고치고, 바꾸고, 만들었어요.',
      createTitle: '내 규칙 운행',
      createUnitTitle: '한 묶음 만들기',
      createTrackTitle: '반복 선로 만들기',
      createTokenChoices: '묶음에 넣을 모양',
      removeFreeToken: '마지막 모양 지우기',
      lockFreeUnit: '묶음 정하기',
      appendFreeUnit: '한 묶음 붙이기',
      resetFreePattern: '다시 만들기',
      runFreePattern: '운행하기',
      createSuccess: '내 규칙이 두 번 되풀이돼요.',
      retryUnitNeedsTwo: '두 가지 모양을 섞어 한 묶음을 만들어 보세요.',
      retryUnitLength: '한 묶음은 2~3칸으로 만들어요.',
      freeUnitBoardLabel: '내 한 묶음',
      freeTrackBoardLabel: '내 반복 선로',
      summaryTitle: '활동 도장',
      summaryListLabel: '완료한 학습 행동',
      nextJourney: '다음 운행',
      returnHome: '처음으로',
      strategySummary: '테두리 도움을 사용했어요.',
      evidenceUnit: '가장 짧은 한 묶음 찾기',
      evidenceContinue: '다음 항 이어 붙이기',
      evidenceRepair: '규칙을 깨뜨린 칸 고치기',
      evidenceTranslate: '다른 모습으로 같은 순서 만들기',
      evidenceCreate: '내 반복 규칙 만들기',
      audioListen: '안내 듣기',
      audioStop: '안내 멈추기',
      audioUnavailable: '음성이 없어도 글을 보며 계속할 수 있어요.',
      audioDisclosure: 'AI 합성 음성으로 만든 안내예요.',
      settingsTitle: '접근성 설정',
      settingsClose: '설정 닫기',
      audioSetting: '안내 음성',
      motionSetting: '모션 줄이기',
      patternContrastSetting: '무늬 대비 높이기',
      persistenceSetting: '이 기기에서 이어 하기',
      storageExplanation: '운행 위치와 접근성 설정만 이 기기에 저장해요.',
      storageOffExplanation: '끄면 이 앱의 저장 내용을 바로 지워요.',
      systemMotionNotice: '기기에서 모션 줄이기를 켜면 함께 줄어들어요.',
    });
  });

  it('Task 9 learner-facing suffix formatter를 제공한다', () => {
    expect(formatTokenShape('동그라미')).toBe('동그라미 모양');
    expect(formatOriginalToken('톱니바퀴')).toBe('톱니바퀴 원래 항');
  });

  it('선택지 이름 formatter가 토큰 이름과 칸 수를 조합한다', () => {
    expect(formatUnitChoice(['나사못'])).toBe('나사못 한 칸');
    expect(formatUnitChoice(['깃발', '깃발'])).toBe('깃발, 깃발 두 칸');
    expect(formatFindCandidate(2, ['톱니바퀴', '나사못'])).toBe(
      '후보 3: 톱니바퀴, 나사못 두 칸',
    );
  });

  it('안내 문구는 짧고 경쟁을 부추기지 않는다', () => {
    const banned = /(점수|순위|속도|빠르|경쟁|증가|곱셈|분류|열 묶음)/;
    for (const text of Object.values(COPY)) {
      expect([...text].length).toBeLessThanOrEqual(32);
      expect(text).not.toMatch(banned);
    }
  });
});
