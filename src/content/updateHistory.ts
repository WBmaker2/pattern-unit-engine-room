export interface UpdateHistoryEntry {
  readonly date: string;
  readonly kind: '설계' | '개발' | '개선';
  readonly summary: string;
}

export const UPDATE_HISTORY_COPY = Object.freeze({
  button: '업데이트 내역',
  title: '업데이트 내역',
  close: '업데이트 내역 닫기',
} as const);

export const UPDATE_HISTORY = [
  {
    date: '2026-08-31',
    kind: '개선',
    summary: '단계 전환 포커스·번역 진행·선로 안내를 보강했어요',
  },
  {
    date: '2026-08-30',
    kind: '개선',
    summary: '설정 닫기 포커스 복귀와 의미 토큰을 보강하고 모바일 가로 넘침을 확인했어요',
  },
  {
    date: '2026-08-29',
    kind: '개선',
    summary: '학습 여정·행동 레일·출발 화면 계층을 정리하고 피드백을 강화했어요',
  },
  {
    date: '2026-08-28',
    kind: '개선',
    summary: '초등학생 관점 모바일·선택·운행 피드백 개선',
  },
  {
    date: '2026-08-27',
    kind: '개선',
    summary: 'GitHub Pages 배포 구성 추가',
  },
  {
    date: '2026-08-26',
    kind: '개발',
    summary: 'MVP 학습 흐름과 접근성 검증 추가',
  },
  {
    date: '2026-08-26',
    kind: '설계',
    summary: '최초 설계 문서 작성',
  },
] as const satisfies readonly UpdateHistoryEntry[];
