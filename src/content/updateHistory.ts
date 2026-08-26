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
