# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room`
- Files scanned: `97`
- Candidates: `1689`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| eslint.config.js:29:8 | text | react-hooks/rules-of-hooks | feedback-or-error | — |
| eslint.config.js:29:38 | text | error | feedback-or-error | — |
| index.html:8:12 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| src/App.tsx:58:56 | text | createProgressStore(getAvailableStorage())); const [state, dispatch] = useReducer(sessionReducer, progressStore, initializeSession); const [settingsOpen, setSettingsOpen] = useState(false); const [settingsConfirmationOpen, setSettingsConfirmationOpen] = useState(false); const settingsTriggerRef = useRef | learner-text-candidate | long-or-dense, technical-or-internal |
| src/App.tsx:62:55 | text | (null); const wasSettingsOpen = useRef(false); const mission = selectCurrentMission(state); const canContinue = selectCanContinue(state); const reducedMotion = useEffectiveReducedMotion(state.settings.motionPreference); const [translationPairs, setTranslationPairs] = useState | learner-text-candidate | long-or-dense, technical-or-internal |
| src/App.tsx:106:31 | text | {state.stage === 'start' ? ( | heading | technical-or-internal |
| src/components/ActionRail.tsx:13:28 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/ActionRail.tsx:13:64 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/ActionRail.tsx:13:78 | text | 이번 행동 | learner-text-candidate | — |
| src/components/AnimatedPatternTrack.tsx:29:24 | text | repeatIndex * repetitionLength, ); } export function AnimatedPatternTrack({ slots, themeId, reducedMotion, isRunning, label, }: AnimatedPatternTrackProps): JSX.Element { const className = isRunning ? 'train-track train-track--moving' : 'train-track'; const activeIndices = isRunning && reducedMotion ? getActiveIndices(slots) : []; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/AppShell.tsx:25:44 | text | (null); const triggerRef = useRef | learner-text-candidate | technical-or-internal |
| src/components/AppShell.tsx:40:8 | text | button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]) | button-or-action, input | long-or-dense |
| src/components/AppShell.tsx:64:19 | aria-label | 규칙 단위 기관실 | aria-label | repeated-text |
| src/components/AudioGuideButton.tsx:57:8 | text | {isPlaying ? COPY.audioStop : COPY.audioListen} | button-or-action | technical-or-internal |
| src/components/AudioGuideButton.tsx:59:16 | text | {unavailable ? | button-or-action | — |
| src/components/AudioGuideButton.tsx:60:85 | text | : null} | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/ChoiceGrid.tsx:13:68 | text | ({ label, choices, selectedId, getId, renderChoice, getAccessibleName, onSelect, }: ChoiceGridProps | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ChoiceGrid.tsx:22:23 | text | 4 && import.meta.env.DEV) { throw new RangeError('ChoiceGrid는 4개 이하의 선택지만 지원합니다.'); } return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/components/ChoiceGrid.tsx:23:27 | text | ChoiceGrid는 4개 이하의 선택지만 지원합니다. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/components/ChoiceGrid.tsx:29:24 | text | ${label} 목록 | learner-text-candidate | — |
| src/components/ChoiceGrid.tsx:41:16 | text | {renderChoice(choice)} {selected ? | learner-text-candidate | — |
| src/components/ChoiceGrid.tsx:43:77 | text | 선택됨 | learner-text-candidate | repeated-text |
| src/components/ChoiceGrid.tsx:43:87 | text | : null} | button-or-action | repeated-text, technical-or-internal |
| src/components/FeedbackPanel.tsx:3:31 | text | retry | feedback-or-error | repeated-text |
| src/components/FeedbackPanel.tsx:3:41 | text | success | feedback-or-error | repeated-text |
| src/components/FeedbackPanel.tsx:11:26 | text | void; } const defaultMessage: Record | feedback-or-error | technical-or-internal |
| src/components/FeedbackPanel.tsx:14:53 | text | = { retry: '다시 살펴봐요.', success: '잘했어요.', }; export function FeedbackPanel({ status, message, hint, children, nextActionLabel, onNext, }: FeedbackPanelProps): JSX.Element \| null { if (status === undefined && message === undefined && children === undefined && hint === undefined) { return null; } const text = message ?? (status === undefined ? undefined : defaultMessage[status]); return ( | feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/components/FeedbackPanel.tsx:15:11 | text | 다시 살펴봐요. | learner-text-candidate | — |
| src/components/FeedbackPanel.tsx:16:13 | text | 잘했어요. | learner-text-candidate | repeated-text |
| src/components/FeedbackPanel.tsx:40:35 | text | {status === 'success' ? '잘했어요' : '다시 해 봐요'} | heading | — |
| src/components/FeedbackPanel.tsx:40:60 | text | 잘했어요 | heading | repeated-text |
| src/components/FeedbackPanel.tsx:40:69 | text | 다시 해 봐요 | heading | repeated-text |
| src/components/FeedbackPanel.tsx:42:54 | text | : null} {hint !== undefined ? | hint | technical-or-internal |
| src/components/FeedbackPanel.tsx:43:42 | text | : null} {nextActionLabel !== undefined && onNext !== undefined ? | button-or-action, hint | long-or-dense, technical-or-internal |
| src/components/FeedbackPanel.tsx:44:129 | text | : null} | button-or-action | repeated-text, technical-or-internal |
| src/components/InstructionCard.tsx:16:30 | text | 안내를 읽고 차례로 해 보세요. | instruction | repeated-text |
| src/components/InstructionCard.tsx:29:32 | text | hasVisibleContent(item)); } return true; } export function InstructionCard({ children, text, title, cue, audioEnabled = false, showTranscript = true, }: InstructionCardProps): JSX.Element \| null { const transcript = cue === undefined ? undefined : getAudioTranscript(cue); const visibleText = transcript !== undefined ? transcript : hasVisibleContent(children) ? children : hasVisibleContent(text) ? text : transcript ?? DEFAULT_INSTRUCTION; const hasAudioControl = audioEnabled && cue !== undefined; // StageHeader owns the visible instruction. Do not leave an empty card // behind when audio is disabled and the transcript is intentionally hidden. if (!showTranscript && !hasAudioControl && title === undefined) return null; return ( | instruction | long-or-dense, technical-or-internal |
| src/components/InstructionCard.tsx:57:39 | text | {title !== undefined ? | heading, instruction | technical-or-internal |
| src/components/InstructionCard.tsx:58:46 | text | : null} {showTranscript ? | heading | technical-or-internal |
| src/components/LearningJourney.tsx:9:34 | text | 완료 | learner-text-candidate | repeated-text |
| src/components/LearningJourney.tsx:9:49 | text | 현재 | learner-text-candidate | repeated-text |
| src/components/LearningJourney.tsx:9:65 | text | 예정 | learner-text-candidate | repeated-text |
| src/components/LearningJourney.tsx:13:31 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/LearningJourney.tsx:13:67 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/LearningJourney.tsx:13:81 | text | 학습 여정 | learner-text-candidate | repeated-text |
| src/components/LearningJourney.tsx:22:56 | text | {statusLabel[item.status]} | learner-text-candidate | — |
| src/components/PatternBoard.tsx:15:69 | text | string; } export const ORDINALS = [ '첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째', '일곱째', '여덟째', '아홉째', ] as const; export function formatOrdinal(index: number): string { return ORDINALS[index] ?? `${index + 1}번째`; } export function formatCellAriaLabel(index: number, visual: TokenVisual): string { return `${formatOrdinal(index)} ${COPY.cellSuffix}, ${formatTokenShape(visual.labelKo)}, ${visual.patternLabelKo}`; } export function formatEmptyCellAriaLabel(index: number): string { return `${formatOrdinal(index)} ${COPY.cellSuffix}, ${COPY.emptyCellLabel}`; } export function PatternBoard({ slots, themeId, activeIndices = [], selectedIndex = null, onSelect, formatAriaLabel, }: PatternBoardProps): JSX.Element { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/PatternBoard.tsx:19:4 | text | 첫째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:20:4 | text | 둘째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:21:4 | text | 셋째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:22:4 | text | 넷째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:23:4 | text | 다섯째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:24:4 | text | 여섯째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:25:4 | text | 일곱째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:26:4 | text | 여덟째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:27:4 | text | 아홉째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:31:30 | text | ${index + 1}번째 | learner-text-candidate | — |
| src/components/PatternBoard.tsx:35:11 | text | ${formatOrdinal(index)} ${COPY.cellSuffix}, ${formatTokenShape(visual.labelKo)}, ${visual.patternLabelKo} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/PatternBoard.tsx:39:11 | text | ${formatOrdinal(index)} ${COPY.cellSuffix}, ${COPY.emptyCellLabel} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/PatternBoard.tsx:52:37 | text | { const visual = tokenId === null ? null : getTokenVisual(themeId, tokenId); const ariaLabel = visual === null ? formatEmptyCellAriaLabel(index) : formatAriaLabel?.(index, visual) ?? formatCellAriaLabel(index, visual); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/PatternCell.tsx:17:68 | text | [ 'pattern-cell', active ? 'pattern-cell--active' : '', selected ? 'pattern-cell--selected' : '', ] .filter(Boolean) .join(' '); export function PatternCell({ index, tokenId, visual, ariaLabel, active = false, selected = false, onSelect, }: PatternCellProps): JSX.Element { const selectable = onSelect !== undefined; const className = cellClasses(active, selected); const patternClass = visual === null ? '' : `pattern-mark--${visual.patternMarkId}`; const controlClassName = [ className, selectable ? 'pattern-cell--selectable' : '', patternClass, ] .filter(Boolean) .join(' '); const dataAttributes = { 'data-icon': visual?.iconId ?? 'empty', 'data-icon-id': visual?.iconId ?? 'empty', 'data-pattern': visual?.patternMarkId ?? 'empty', 'data-pattern-mark': visual?.patternMarkId ?? 'empty', 'data-token-id': tokenId ?? 'empty', }; const content = ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/PatternCell.tsx:64:40 | text | {selectable ? ( | button-or-action | — |
| src/components/PrimaryAction.tsx:1:60 | text | react | learner-text-candidate | — |
| src/components/PrimaryAction.tsx:7:60 | text | ['onClick']; readonly disabled?: boolean; readonly pulseKind?: PulseActionKind; } export function PrimaryAction({ children, onClick, disabled = false, pulseKind, }: PrimaryActionProps): JSX.Element { const enabled = !disabled; const className = ['primary-action', enabled && pulseKind !== undefined ? 'gi-pulse' : ''] .filter(Boolean) .join(' '); return ( | button-or-action | long-or-dense, technical-or-internal |
| src/components/PrimaryAction.tsx:7:62 | text | onClick | learner-text-candidate | — |
| src/components/ProgressIndicator.tsx:17:6 | text | {COPY.progressLabel} {current} / {total} | learner-text-candidate | technical-or-internal |
| src/components/StageHeader.tsx:16:34 | text | stage-title-${current} | learner-text-candidate | — |
| src/components/StartMissionIllustration.tsx:12:44 | text | true | learner-text-candidate | repeated-text |
| src/components/StartMissionIllustration.tsx:17:25 | text | img | learner-text-candidate | — |
| src/components/StartMissionIllustration.tsx:22:6 | text | {hasTitle ? | learner-text-candidate | — |
| src/components/StartMissionIllustration.tsx:23:41 | text | : null} | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/UpdateHistoryButton.tsx:8:26 | text | void; readonly tabIndex?: number; } export const UpdateHistoryButton = forwardRef | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/UpdateHistoryButton.tsx:12:91 | text | ( function UpdateHistoryButton({ ariaControls, open = false, onClick, tabIndex }, ref): JSX.Element { return ( | button-or-action | long-or-dense, technical-or-internal |
| src/components/UpdateHistoryDialog.tsx:9:26 | text | void; } const FOCUSABLE_SELECTOR = [ 'button:not([disabled])', 'a[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])', ].join(','); export function UpdateHistoryDialog({ dialogId, open, entries, onClose, }: UpdateHistoryDialogProps): JSX.Element \| null { const dialogRef = useRef | button-or-action, input | long-or-dense, technical-or-internal |
| src/components/UpdateHistoryDialog.tsx:13:4 | text | button:not([disabled]) | button-or-action | — |
| src/components/UpdateHistoryDialog.tsx:70:26 | text | update-history-title | learner-text-candidate | — |
| src/content/audioGuides.ts:37:22 | text | Unknown audio cue: ${String(cue)} | feedback-or-error | — |
| src/content/copy.ts:2:14 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| src/content/copy.ts:3:16 | text | 칸 | learner-text-candidate | repeated-text |
| src/content/copy.ts:4:17 | text | 모양 | learner-text-candidate | repeated-text |
| src/content/copy.ts:5:25 | text | 원래 항 | learner-text-candidate | repeated-text |
| src/content/copy.ts:6:20 | text | 빈칸 | learner-text-candidate | repeated-text |
| src/content/copy.ts:7:23 | text | 규칙 배열 | learner-text-candidate | repeated-text |
| src/content/copy.ts:8:17 | text | 운행 시작 | learner-text-candidate | repeated-text |
| src/content/copy.ts:9:20 | text | 접근성 설정 | learner-text-candidate | repeated-text |
| src/content/copy.ts:10:16 | text | 기관실 문을 열어 볼까요? | learner-text-candidate | repeated-text |
| src/content/copy.ts:11:22 | text | 모양의 반복 규칙을 찾아 다섯 가지 미션을 해 봐요. | instruction | repeated-text |
| src/content/copy.ts:12:15 | text | 한 묶음 찾기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:13:19 | text | 다음 칸 이어 붙이기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:14:16 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| src/content/copy.ts:15:20 | text | 이어 붙이기 | button-or-action | repeated-text |
| src/content/copy.ts:16:17 | text | 규칙 수리하기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:17:24 | text | 새 모양 선택 | learner-text-candidate | repeated-text |
| src/content/copy.ts:18:18 | text | 고치기 | button-or-action | repeated-text |
| src/content/copy.ts:19:19 | text | 규칙을 깨뜨린 칸을 고쳤어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:20:24 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | feedback-or-error | repeated-text |
| src/content/copy.ts:21:27 | text | 선택한 칸에 들어갈 모양을 다시 골라요. | feedback-or-error | repeated-text |
| src/content/copy.ts:22:20 | text | 새 모양으로 바꾸기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:23:28 | text | 바꿀 원래 항 | learner-text-candidate | repeated-text |
| src/content/copy.ts:24:28 | text | 새 모양 선택 | learner-text-candidate | repeated-text |
| src/content/copy.ts:25:21 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| src/content/copy.ts:26:22 | text | 모양은 달라도 같은 순서예요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:27:30 | text | 서로 다른 항에는 서로 다른 새 모양을 골라요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:28:23 | text | 새 모양의 순서를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:29:25 | text | 각 원래 항에 새 모양을 하나씩 골라요. | learner-text-candidate | — |
| src/content/copy.ts:30:26 | text | 바꾼 규칙 배열 | learner-text-candidate | — |
| src/content/copy.ts:31:27 | text | 고른 대응 | learner-text-candidate | — |
| src/content/copy.ts:32:19 | text | 현재 단계 | learner-text-candidate | repeated-text |
| src/content/copy.ts:33:27 | text | 다음 학습 단계 | learner-text-candidate | — |
| src/content/copy.ts:34:15 | text | 다음 칸 | learner-text-candidate | repeated-text |
| src/content/copy.ts:35:23 | text | 다음 활동: 이어 붙이기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:36:21 | text | 다음 활동: 규칙 수리하기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:37:24 | text | 다음 활동: 새 모양으로 바꾸기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:38:21 | text | 다음 활동: 내 규칙 만들기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:39:20 | text | 테두리 도움 보기 | hint | repeated-text |
| src/content/copy.ts:40:22 | text | 후보 묶음 선택 | learner-text-candidate | repeated-text |
| src/content/copy.ts:41:26 | text | 다음 칸 선택 | learner-text-candidate | repeated-text |
| src/content/copy.ts:42:21 | text | 후보 | learner-text-candidate | repeated-text |
| src/content/copy.ts:43:18 | text | 한 | learner-text-candidate | repeated-text |
| src/content/copy.ts:44:18 | text | 두 | learner-text-candidate | repeated-text |
| src/content/copy.ts:45:20 | text | 세 | learner-text-candidate | repeated-text |
| src/content/copy.ts:46:21 | text | 칸 | learner-text-candidate | repeated-text |
| src/content/copy.ts:47:21 | text | 가장 짧게 되풀이되는 한 묶음을 골라요. | instruction | repeated-text |
| src/content/copy.ts:48:25 | text | 한 묶음을 보고 다음 칸을 이어 보세요. | instruction | repeated-text |
| src/content/copy.ts:49:23 | text | 규칙을 깨뜨린 칸을 찾아 고쳐요. | instruction | repeated-text |
| src/content/copy.ts:50:26 | text | 같은 순서를 새 모양으로 바꾸어 보세요. | instruction | repeated-text |
| src/content/copy.ts:51:23 | text | 2~3개로 내 한 묶음을 만들어요. | instruction | repeated-text |
| src/content/copy.ts:52:22 | text | 되풀이되지만 더 짧은 한 묶음이 있어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:53:24 | text | 이 묶음으로는 끝까지 되풀이되지 않아요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:54:17 | text | 가장 짧은 한 묶음을 찾았어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:55:21 | text | 한 묶음으로 다음 칸을 이었어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:56:28 | text | 한 묶음의 순서를 다시 살펴봐요. | feedback-or-error | repeated-text |
| src/content/copy.ts:57:21 | text | 테두리로 나눈 묶음을 차례로 살펴보세요. | hint | repeated-text |
| src/content/copy.ts:58:23 | text | 같은 묶음을 한 번 더 붙여 보세요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:59:18 | text | 테두리 도움을 사용해 규칙을 찾았어요. | hint | repeated-text |
| src/content/copy.ts:60:14 | text | 찾고, 잇고, 고치고, 바꾸고, 만들었어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:61:17 | text | 내 규칙 운행 | learner-text-candidate | repeated-text |
| src/content/copy.ts:62:21 | text | 한 묶음 만들기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:63:22 | text | 반복 선로 만들기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:64:24 | text | 묶음에 넣을 모양 | learner-text-candidate | repeated-text |
| src/content/copy.ts:65:21 | text | 마지막 모양 지우기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:66:18 | text | 묶음 정하기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:67:20 | text | 한 묶음 붙이기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:68:20 | text | 선로는 12칸까지 만들 수 있어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:69:22 | text | 다시 만들기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:70:20 | text | 운행하기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:71:19 | text | 내 규칙이 두 번 되풀이돼요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:72:23 | text | 두 가지 모양을 섞어 한 묶음을 만들어 보세요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:73:21 | text | 한 묶음은 2~3칸으로 만들어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:74:24 | text | 내 한 묶음 | learner-text-candidate | repeated-text |
| src/content/copy.ts:75:25 | text | 내 반복 선로 | learner-text-candidate | repeated-text |
| src/content/copy.ts:76:18 | text | 활동 도장 | learner-text-candidate | repeated-text |
| src/content/copy.ts:77:21 | text | 반복되는 한 묶음을 찾으면 다음 칸을 예측할 수 있어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:78:23 | text | 다음에는 다른 모양의 규칙도 찾아봐요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:80:22 | text | 완료한 학습 행동 | learner-text-candidate | repeated-text |
| src/content/copy.ts:81:17 | text | 다음 운행 | learner-text-candidate | repeated-text |
| src/content/copy.ts:82:16 | text | 처음으로 | learner-text-candidate | repeated-text |
| src/content/copy.ts:83:21 | text | 테두리 도움을 사용했어요. | hint | repeated-text |
| src/content/copy.ts:84:18 | text | 가장 짧은 한 묶음 찾기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:85:22 | text | 다음 항 이어 붙이기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:86:20 | text | 규칙을 깨뜨린 칸 고치기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:87:23 | text | 다른 모습으로 같은 순서 만들기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:88:20 | text | 내 반복 규칙 만들기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:89:17 | text | 안내 듣기 | instruction | repeated-text |
| src/content/copy.ts:90:15 | text | 안내 멈추기 | instruction | repeated-text |
| src/content/copy.ts:91:22 | text | 음성이 없어도 글을 보며 계속할 수 있어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:92:21 | text | AI 합성 음성으로 만든 안내예요. | instruction | repeated-text, technical-or-internal |
| src/content/copy.ts:93:16 | text | 켜짐 | learner-text-candidate | repeated-text |
| src/content/copy.ts:94:17 | text | 꺼짐 | learner-text-candidate | repeated-text |
| src/content/copy.ts:95:19 | text | 접근성 설정 | learner-text-candidate | repeated-text |
| src/content/copy.ts:96:19 | text | 설정 닫기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:97:18 | text | 안내 음성 | instruction | repeated-text |
| src/content/copy.ts:98:19 | text | 모션 줄이기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:99:28 | text | 무늬 대비 높이기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:100:24 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:101:24 | text | 운행 위치와 접근성 설정만 이 기기에 저장해요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:102:27 | text | 끄면 확인 후 이 앱의 저장 내용을 지워요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:103:25 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| src/content/copy.ts:104:27 | text | 저장된 이어 하기 기록을 지울까요? | learner-text-candidate | — |
| src/content/copy.ts:105:27 | text | 이어 하기 끄기 | learner-text-candidate | repeated-text |
| src/content/copy.ts:106:26 | text | 계속 사용 | learner-text-candidate | repeated-text |
| src/content/copy.ts:107:24 | text | 기기에서 모션 줄이기를 켜면 함께 줄어들어요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:108:25 | text | 모션을 줄여서 보여 줘요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:109:25 | text | 기본 모션으로 보여 줘요. | learner-text-candidate | repeated-text |
| src/content/copy.ts:123:11 | text | ${label} ${COPY.shapeSuffix} | learner-text-candidate | technical-or-internal |
| src/content/copy.ts:127:11 | text | ${label} ${COPY.originalTokenSuffix} | learner-text-candidate | technical-or-internal |
| src/content/copy.ts:136:11 | text | ${labels.join(', ')} ${countWord} ${COPY.unitCountSuffix} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/copy.ts:140:11 | text | ${COPY.candidatePrefix} ${index + 1}: ${formatUnitChoice(labels)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/missions/index.ts:24:27 | text | Unknown mission id: ${id} | feedback-or-error | technical-or-internal |
| src/content/missions/index.ts:32:27 | text | Unknown journey index: ${index} | feedback-or-error | — |
| src/content/tokenThemes.ts:29:29 | text | 점무늬 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:29:37 | text | 줄무늬 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:29:45 | text | 격자무늬 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:51:26 | text | 점무늬 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:59:26 | text | 줄무늬 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:67:26 | text | 격자무늬 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:74:49 | text | { const labels: Record | learner-text-candidate | — |
| src/content/tokenThemes.ts:76:12 | text | 톱니바퀴 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:77:12 | text | 나사못 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:78:12 | text | 전등 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:79:14 | text | 동그라미 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:80:16 | text | 세모 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:81:14 | text | 네모 | learner-text-candidate | — |
| src/content/tokenThemes.ts:82:12 | text | 별 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:83:12 | text | 깃발 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:84:15 | text | 마름모 | learner-text-candidate | — |
| src/content/tokenThemes.ts:85:17 | text | 손들기 | learner-text-candidate | — |
| src/content/tokenThemes.ts:86:12 | text | 손뼉 | learner-text-candidate | — |
| src/content/tokenThemes.ts:87:12 | text | 발걸음 | learner-text-candidate | — |
| src/content/tokenThemes.ts:88:13 | text | 바퀴 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:89:14 | text | 창문 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:90:13 | text | 기차 | learner-text-candidate | repeated-text |
| src/content/tokenThemes.ts:108:27 | text | Unknown token visual: ${themeId}/${tokenId} | feedback-or-error | technical-or-internal |
| src/content/tokenThemes.ts:119:27 | text | Unknown display token visual: ${themeId}/${displayTokenId} | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/updateHistory.ts:3:19 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:3:26 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:3:33 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:8:12 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/content/updateHistory.ts:9:11 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:10:11 | text | 업데이트 내역 닫기 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:16:12 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:17:15 | text | 설정 닫기 포커스 복귀와 의미 토큰을 보강하고 모바일 가로 넘침을 확인했어요 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:21:12 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:22:15 | text | 학습 여정·행동 레일·출발 화면 계층을 정리하고 피드백을 강화했어요 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:26:12 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:27:15 | text | 초등학생 관점 모바일·선택·운행 피드백 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:31:12 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:32:15 | text | GitHub Pages 배포 구성 추가 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/content/updateHistory.ts:36:12 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:37:15 | text | MVP 학습 흐름과 접근성 검증 추가 | learner-text-candidate | abstract-or-formal, repeated-text, technical-or-internal |
| src/content/updateHistory.ts:41:12 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:42:15 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/features/continue/ContinuePatternScreen.tsx:26:37 | text | getTokenVisual(themeId, token).labelKo); return formatUnitChoice(labels); } function feedbackMessage(feedback: FeedbackState): string { if (feedback.status === 'success') return COPY.continueSuccess; if (feedback.reason === 'wrong-continuation') return COPY.retryWrongContinuation; return COPY.retryDoesNotRepeat; } export function ContinuePatternScreen({ mission, feedback, onSubmit, onContinue, audioEnabled = false, }: ContinuePatternScreenProps): JSX.Element { const [selectedId, setSelectedId] = useState | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/continue/ContinuePatternScreen.tsx:31:28 | text | success | feedback-or-error | repeated-text |
| src/features/continue/ContinuePatternScreen.tsx:32:28 | text | wrong-continuation | feedback-or-error | repeated-text |
| src/features/continue/ContinuePatternScreen.tsx:45:43 | text | success | feedback-or-error | repeated-text |
| src/features/continue/ContinuePatternScreen.tsx:47:18 | text | { setSelectedId(null); }, [mission.id]); return ( | learner-text-candidate | repeated-text, technical-or-internal |
| src/features/continue/ContinuePatternScreen.tsx:53:29 | text | 2단계 | instruction | repeated-text |
| src/features/continue/ContinuePatternScreen.tsx:64:9 | text | {feedback !== null ? ( | feedback-or-error | repeated-text, technical-or-internal |
| src/features/continue/ContinuePatternScreen.tsx:66:87 | text | ) : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:26:29 | text | void; readonly audioEnabled?: boolean; readonly reducedMotion: boolean; readonly maxTrackTokens: number; } const TOKEN_IDS: readonly PatternTokenId[] = ['A', 'B', 'C']; function feedbackMessage(feedback: FeedbackState): string { if (feedback.status === 'success') return COPY.createSuccess; if (feedback.reason === 'needs-second-repeat') return COPY.needsSecondRepeat; if (feedback.reason === 'unit-needs-two-symbols') return COPY.retryUnitNeedsTwo; if (feedback.reason === 'unit-length-out-of-range') return COPY.retryUnitLength; return COPY.retryDoesNotRepeat; } function Board({ label, tokens }: { readonly label: string; readonly tokens: PatternUnit }): JSX.Element { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:35:28 | text | success | feedback-or-error | repeated-text |
| src/features/create/CreatePatternScreen.tsx:36:28 | text | needs-second-repeat | feedback-or-error | repeated-text |
| src/features/create/CreatePatternScreen.tsx:37:28 | text | unit-needs-two-symbols | feedback-or-error | — |
| src/features/create/CreatePatternScreen.tsx:38:28 | text | unit-length-out-of-range | feedback-or-error | repeated-text |
| src/features/create/CreatePatternScreen.tsx:46:15 | text | ); } function UnitMode({ props }: { readonly props: CreatePatternScreenProps }): JSX.Element { const { unit, feedback } = props; return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:54:58 | text | create | instruction | repeated-text |
| src/features/create/CreatePatternScreen.tsx:59:58 | text | engine | learner-text-candidate | repeated-text |
| src/features/create/CreatePatternScreen.tsx:63:12 | text | {formatTokenShape(getTokenVisual('engine', token).labelKo)} | button-or-action | long-or-dense |
| src/features/create/CreatePatternScreen.tsx:64:47 | text | engine | learner-text-candidate | repeated-text |
| src/features/create/CreatePatternScreen.tsx:72:138 | text | {feedback !== null ? | feedback-or-error | repeated-text, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:73:106 | text | : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:74:8 | text | ); } function TrackMode({ props }: { readonly props: CreatePatternScreenProps }): JSX.Element { const { feedback, track } = props; const isSuccess = feedback?.status === 'success'; const canAppendUnit = track.length + props.unit.length | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:80:43 | text | success | feedback-or-error | repeated-text |
| src/features/create/CreatePatternScreen.tsx:84:59 | text | create | instruction | repeated-text |
| src/features/create/CreatePatternScreen.tsx:93:23 | text | 현재 선로 ${track.length} / ${props.maxTrackTokens} | learner-text-candidate | — |
| src/features/create/CreatePatternScreen.tsx:93:73 | text | {track.length} / {props.maxTrackTokens} | learner-text-candidate | — |
| src/features/create/CreatePatternScreen.tsx:98:72 | text | {COPY.summaryTitle} 보기 | learner-text-candidate | technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:98:191 | text | run | learner-text-candidate | — |
| src/features/create/CreatePatternScreen.tsx:98:233 | text | } secondary={ | button-or-action | repeated-text |
| src/features/create/CreatePatternScreen.tsx:100:9 | text | {feedback !== null ? | feedback-or-error | repeated-text, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:101:106 | text | : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:102:8 | text | ); } export function CreatePatternScreen(props: CreatePatternScreenProps): JSX.Element { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/create/CreatePatternScreen.tsx:109:29 | text | 5단계 | instruction | — |
| src/features/create/CreatePatternScreen.tsx:109:120 | text | {props.mode === 'unit' ? | instruction | — |
| src/features/find/FindUnitScreen.tsx:23:29 | text | void; readonly audioEnabled?: boolean; } function feedbackMessage(feedback: FeedbackState): string { if (feedback.status === 'success') return COPY.findSuccess; return feedback.reason === 'not-shortest' ? COPY.retryNotShortest : COPY.retryDoesNotRepeat; } export function FindUnitScreen({ mission, feedback, hintUsed = false, onSubmit, onHint, onContinue, audioEnabled = false, }: FindUnitScreenProps): JSX.Element { const [selectedId, setSelectedId] = useState | button-or-action, feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/find/FindUnitScreen.tsx:28:28 | text | success | feedback-or-error | repeated-text |
| src/features/find/FindUnitScreen.tsx:29:31 | text | not-shortest | feedback-or-error | — |
| src/features/find/FindUnitScreen.tsx:43:43 | text | success | feedback-or-error | repeated-text |
| src/features/find/FindUnitScreen.tsx:48:18 | text | { setSelectedId(null); }, [mission.id]); return ( | learner-text-candidate | repeated-text, technical-or-internal |
| src/features/find/FindUnitScreen.tsx:54:29 | text | 1단계 | instruction | — |
| src/features/find/FindUnitScreen.tsx:68:9 | text | {feedback !== null ? ( | feedback-or-error | repeated-text, technical-or-internal |
| src/features/find/FindUnitScreen.tsx:73:38 | text | retry | feedback-or-error, hint | repeated-text |
| src/features/find/FindUnitScreen.tsx:74:10 | text | {feedback.status === 'success' && hintUsed ? | feedback-or-error, hint | — |
| src/features/find/FindUnitScreen.tsx:75:33 | text | success | feedback-or-error, hint | repeated-text |
| src/features/find/FindUnitScreen.tsx:75:82 | text | : null} {feedback.status === 'retry' && feedback.hintVisible ? ( | feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/find/FindUnitScreen.tsx:76:33 | text | retry | feedback-or-error, hint | repeated-text |
| src/features/find/FindUnitScreen.tsx:81:15 | text | ) : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/find/FindUnitScreen.tsx:83:25 | text | ) : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/find/FindUnitScreen.tsx:95:25 | text | } secondary={feedback?.status === 'retry' && !feedback.hintVisible ? | button-or-action, feedback-or-error, hint | long-or-dense |
| src/features/find/FindUnitScreen.tsx:95:60 | text | retry | button-or-action, feedback-or-error, hint | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:23:29 | text | void; readonly audioEnabled?: boolean; } function feedbackMessage(feedback: FeedbackState): string { if (feedback.status === 'success') return COPY.repairSuccess; if (feedback.reason === 'wrong-position') return COPY.retryWrongPosition; if (feedback.reason === 'wrong-replacement') return COPY.retryWrongReplacement; return COPY.retryDoesNotRepeat; } export function RepairPatternScreen({ mission, selectedIndex, feedback, onSelectIndex, onSubmit, onContinue, audioEnabled = false, }: RepairPatternScreenProps): JSX.Element { const [replacement, setReplacement] = useState | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/repair/RepairPatternScreen.tsx:28:28 | text | success | feedback-or-error | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:29:28 | text | wrong-position | feedback-or-error | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:30:28 | text | wrong-replacement | feedback-or-error | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:44:43 | text | success | feedback-or-error | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:49:18 | text | { setReplacement(null); }, [mission.id, selectedIndex]); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/repair/RepairPatternScreen.tsx:55:29 | text | 3단계 | instruction | — |
| src/features/repair/RepairPatternScreen.tsx:62:46 | text | retry | feedback-or-error | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:62:77 | text | wrong-position | feedback-or-error | repeated-text |
| src/features/repair/RepairPatternScreen.tsx:73:11 | text | ) : null} {feedback !== null ? ( | feedback-or-error | repeated-text, technical-or-internal |
| src/features/repair/RepairPatternScreen.tsx:76:87 | text | ) : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/session/reducer.ts:124:14 | text | item.kind === evidence.kind && item.missionId === evidence.missionId, ); return { ...state, feedback: feedback(result), evidence: alreadyRecorded ? state.evidence : [...state.evidence, evidence], }; } function resetTransient(state: SessionState, stage: SessionStage, journeyIndex = state.journeyIndex): SessionState { return { ...state, stage, journeyIndex, feedback: null, selectedRepairIndex: null, freeUnit: [], freeTrack: [], evidence: [], currentHintUsed: false, }; } function submitFind(state: SessionState, candidate: SessionAction & { type: 'SUBMIT_FIND' }): SessionState { const mission = missionForStage(state, 'find'); if (mission?.kind !== 'find') return state; const result = validateUnitChoice(mission.sequence, candidate.candidate); return withEvidence(state, result, { kind: 'unit-recognized', missionId: mission.id, hintUsed: state.currentHintUsed, }); } function submitContinuation( state: SessionState, action: SessionAction & { type: 'SUBMIT_CONTINUATION' }, ): SessionState { const mission = missionForStage(state, 'continue'); if (mission?.kind !== 'continue') return state; const result = validateContinuation(mission.unit, mission.slots, action.answer); return withEvidence(state, result, { kind: 'continued', missionId: mission.id, hintUsed: state.currentHintUsed, }); } function submitRepair(state: SessionState, action: SessionAction & { type: 'SUBMIT_REPAIR' }): SessionState { const mission = missionForStage(state, 'repair'); if (mission?.kind !== 'repair') return state; if (state.selectedRepairIndex === null) { return { ...state, feedback: { status: 'retry', reason: 'wrong-position', hintVisible: false }, }; } const result = validateRepair( mission.brokenSequence, mission.unit, state.selectedRepairIndex, action.replacement, ); return withEvidence(state, result, { kind: 'repaired', missionId: mission.id, hintUsed: state.currentHintUsed, }); } function submitTranslation( state: SessionState, action: SessionAction & { type: 'SUBMIT_TRANSLATION' }, ): SessionState { const mission = missionForStage(state, 'translate'); if (mission?.kind !== 'translate') return state; const result = validateTranslation(mission.sourceSequence, action.pairs, action.translated); return withEvidence(state, result, { kind: 'translated', missionId: mission.id, hintUsed: state.currentHintUsed, }); } function submitFreeTrack(state: SessionState): SessionState { if (state.stage !== 'create-track') return state; const result = validateFreeTrack(state.freeTrack); return withEvidence(state, result, { kind: 'created', missionId: `create-journey-${state.journeyIndex}`, hintUsed: state.currentHintUsed, }); } const NEXT_STAGE: Partial | button-or-action, feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/session/reducer.ts:178:28 | text | retry | feedback-or-error, hint | repeated-text |
| src/features/session/reducer.ts:178:45 | text | wrong-position | feedback-or-error, hint | repeated-text |
| src/features/session/reducer.ts:218:62 | text | = { find: 'continue', continue: 'repair', repair: 'translate', translate: 'create-unit', 'create-track': 'summary', }; function continueStage(state: SessionState): SessionState { if (!state.feedback \|\| state.feedback.status !== 'success') return state; const next = NEXT_STAGE[state.stage]; if (next === undefined) return state; return { ...state, stage: next, feedback: null, selectedRepairIndex: null, currentHintUsed: false, }; } export function sessionReducer(state: SessionState, action: SessionAction): SessionState { switch (action.type) { case 'START_JOURNEY': return state.stage === 'start' ? resetTransient(state, 'find') : state; case 'SUBMIT_FIND': return state.stage === 'find' ? submitFind(state, action) : state; case 'SUBMIT_CONTINUATION': return state.stage === 'continue' ? submitContinuation(state, action) : state; case 'SELECT_REPAIR_INDEX': return state.stage === 'repair' ? { ...state, selectedRepairIndex: action.index } : state; case 'SUBMIT_REPAIR': return state.stage === 'repair' ? submitRepair(state, action) : state; case 'SUBMIT_TRANSLATION': return state.stage === 'translate' ? submitTranslation(state, action) : state; case 'USE_HINT': if (state.stage === 'start' \|\| state.stage === 'create-unit' \|\| state.stage === 'summary') return state; return { ...state, currentHintUsed: true, feedback: state.feedback?.status === 'retry' ? { ...state.feedback, hintVisible: true } : state.feedback, }; case 'CONTINUE_STAGE': return continueStage(state); case 'ADD_FREE_TOKEN': return state.stage === 'create-unit' && state.freeUnit.length | button-or-action, feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/session/reducer.ts:227:53 | text | success | feedback-or-error | repeated-text |
| src/features/session/reducer.ts:258:47 | text | retry | feedback-or-error, hint | repeated-text |
| src/features/session/reducer.ts:272:63 | text | 3) { return { ...state, feedback: { status: 'retry', reason: 'unit-length-out-of-range', hintVisible: false }, }; } return { ...state, stage: 'create-track', feedback: null, freeTrack: [] }; case 'APPEND_FREE_UNIT': return state.stage === 'create-track' && state.freeTrack.length + state.freeUnit.length | feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/session/reducer.ts:275:32 | text | retry | feedback-or-error, hint | repeated-text |
| src/features/session/reducer.ts:275:49 | text | unit-length-out-of-range | feedback-or-error, hint | repeated-text |
| src/features/session/reducer.ts:278:34 | text | create-track | feedback-or-error | — |
| src/features/session/selectors.ts:14:11 | text | find | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:14:26 | text | 찾기 | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:15:11 | text | continue | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:15:30 | text | 이어 붙이기 | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:16:11 | text | repair | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:16:28 | text | 수리하기 | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:17:11 | text | translate | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:17:31 | text | 번역하기 | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:18:11 | text | create | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:18:28 | text | 만들기 | learner-text-candidate | repeated-text |
| src/features/session/selectors.ts:57:33 | text | success | feedback-or-error | repeated-text |
| src/features/session/types.ts:52:71 | text | ; } export interface ProgressStore { load(): PersistedProgressV1 \| null; save(value: PersistedProgressV1): void; clear(): boolean; } export interface FeedbackState { readonly status: 'retry' \| 'success'; readonly reason: ValidationReason; readonly hintVisible: boolean; } export interface SessionState { readonly stage: SessionStage; readonly journeyIndex: JourneyIndex; readonly feedback: FeedbackState \| null; readonly selectedRepairIndex: number \| null; readonly freeUnit: PatternTokenId[]; readonly freeTrack: PatternTokenId[]; readonly evidence: LearningEvidence[]; readonly currentHintUsed: boolean; readonly settings: AccessibilitySettings; } export type SessionAction = \| { readonly type: 'START_JOURNEY' } \| { readonly type: 'SUBMIT_FIND'; readonly candidate: PatternUnit } \| { readonly type: 'SUBMIT_CONTINUATION'; readonly answer: PatternUnit } \| { readonly type: 'SELECT_REPAIR_INDEX'; readonly index: number } \| { readonly type: 'SUBMIT_REPAIR'; readonly replacement: PatternTokenId } \| { readonly type: 'SUBMIT_TRANSLATION'; readonly pairs: readonly TranslationPair | button-or-action, feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:19:46 | text | void; readonly effectiveReducedMotion?: boolean; readonly systemPrefersReduce?: boolean; } // eslint-disable-next-line react-refresh/only-export-components export function resolveReducedMotion( preference: Settings['motionPreference'], systemPrefersReduce: boolean, ): boolean { return preference === 'reduce' \|\| (preference === 'system' && systemPrefersReduce); } interface SwitchProps { readonly name: string; readonly checked: boolean; readonly stateLabel: string; readonly disabled: boolean; readonly inputRef?: RefObject | input | long-or-dense, technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:38:63 | text | void; } function SettingSwitch({ name, checked, stateLabel, disabled, inputRef, onChange }: SwitchProps): JSX.Element { return ( | input | long-or-dense, technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:56:13 | text | ); } export function AccessibilitySettings({ settings, onChange, onClose, onModalChange, effectiveReducedMotion: effectiveReducedMotionProp, systemPrefersReduce, }: AccessibilitySettingsProps): JSX.Element { const [confirmPersistenceOff, setConfirmPersistenceOff] = useState(false); const persistenceSwitchRef = useRef | input | long-or-dense, technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:69:56 | text | (null); const confirmButtonRef = useRef | input | technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:70:53 | text | (null); const cancelButtonRef = useRef | learner-text-candidate | technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:110:84 | text | { if (event.key === 'Escape') { event.preventDefault(); setConfirmPersistenceOff(false); return; } if (event.key !== 'Tab') return; const first = confirmButtonRef.current; const last = cancelButtonRef.current; if (!first \|\| !last) return; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; const confirmation = confirmPersistenceOff ? ( | learner-text-candidate | long-or-dense |
| src/features/settings/AccessibilitySettings.tsx:176:52 | text | reduce | learner-text-candidate | — |
| src/features/settings/AccessibilitySettings.tsx:180:29 | text | {effectiveReducedMotion ? COPY.motionReducedNotice : COPY.motionDefaultNotice} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/settings/AccessibilitySettings.tsx:185:51 | text | strong | learner-text-candidate | — |
| src/features/start/StartScreen.tsx:15:33 | text | void; readonly audioEnabled?: boolean; readonly journeyItems?: readonly JourneyProgressItem[]; readonly settingsTriggerRef?: RefObject | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/start/StartScreen.tsx:18:68 | text | ; } export function StartScreen({ onStart, onOpenSettings, audioEnabled = false, journeyItems = [], settingsTriggerRef, }: StartScreenProps): JSX.Element { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/start/StartScreen.tsx:31:78 | text | start | instruction | — |
| src/features/start/StartScreen.tsx:37:107 | text | } secondary={ | button-or-action | repeated-text |
| src/features/summary/SummaryScreen.tsx:44:19 | text | EVIDENCE_COPY[kind]); return ( | learner-text-candidate | technical-or-internal |
| src/features/summary/SummaryScreen.tsx:48:55 | text | complete | instruction | repeated-text |
| src/features/summary/SummaryScreen.tsx:51:78 | text | {hasHint ? | hint | — |
| src/features/summary/SummaryScreen.tsx:52:47 | text | : null} | hint | repeated-text, technical-or-internal |
| src/features/summary/SummaryScreen.tsx:54:91 | text | } secondary={ | button-or-action | repeated-text |
| src/features/translate/TranslatePatternScreen.tsx:31:29 | text | void; readonly audioEnabled?: boolean; } function feedbackMessage(feedback: FeedbackState): string { if (feedback.status === 'success') return COPY.translateSuccess; if (feedback.reason === 'mapping-not-bijective') { return COPY.retryMappingNotBijective; } if (feedback.reason === 'order-changed') return COPY.retryOrderChanged; return COPY.retryMissingMapping; } function uniqueTokens(sequence: readonly PatternTokenId[]): PatternTokenId[] { return [...new Set(sequence)]; } export function TranslatePatternScreen({ mission, draftPairs, feedback, onChangePair, onSubmit, onContinue, audioEnabled = false, }: TranslatePatternScreenProps): JSX.Element { const [selectedSource, setSelectedSource] = useState | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:36:28 | text | success | feedback-or-error | repeated-text |
| src/features/translate/TranslatePatternScreen.tsx:37:28 | text | mapping-not-bijective | feedback-or-error | repeated-text |
| src/features/translate/TranslatePatternScreen.tsx:40:28 | text | order-changed | feedback-or-error | — |
| src/features/translate/TranslatePatternScreen.tsx:66:43 | text | success | feedback-or-error | repeated-text |
| src/features/translate/TranslatePatternScreen.tsx:68:18 | text | { setSelectedSource(null); }, [mission.id]); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:74:29 | text | 4단계 | instruction | — |
| src/features/translate/TranslatePatternScreen.tsx:84:41 | text | {formatOriginalToken(getTokenVisual(mission.themeId, choice).labelKo)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:98:41 | text | {formatTokenShape(getDisplayTokenVisual(mission.targetThemeId, choice).labelKo)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:103:35 | text | {getTokenVisual(mission.themeId, pair.source).labelKo} → {getDisplayTokenVisual(mission.targetThemeId, pair.target).labelKo} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:107:14 | text | ) : null} {translatedComplete ? ( | learner-text-candidate | technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:115:36 | text | ${formatOrdinal(index)} ${COPY.cellSuffix}, ${formatTokenShape(visual.labelKo)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:121:14 | text | ) : null} {feedback !== null ? ( | feedback-or-error | repeated-text, technical-or-internal |
| src/features/translate/TranslatePatternScreen.tsx:124:87 | text | ) : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/main.tsx:14:20 | text | 앱을 마운트할 root 요소를 찾을 수 없습니다. | feedback-or-error | — |
| tests/architecture/source-size.test.ts:30:11 | text | 코드 크기 게이트 | learner-text-candidate | — |
| tests/architecture/source-size.test.ts:31:7 | text | 모든 코드 파일이 499줄 이하이다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:17:11 | text | 접근성 설정 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:24:7 | text | 네 가지 native switch 이름과 기본 상태를 보여 준다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:33:30 | text | heading | heading | repeated-text |
| tests/components/accessibilitySettings.test.tsx:40:30 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:43:7 | text | 각 설정은 켜짐 또는 꺼짐을 글자로 보여 준다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:51:33 | text | 켜짐 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:52:33 | text | 꺼짐 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:55:7 | text | 이어 하기를 끌 때 즉시 삭제하지 않고 확인 후 저장을 지운다 | learner-text-candidate | multiple-conditions |
| tests/components/accessibilitySettings.test.tsx:65:58 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:66:53 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:68:40 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:68:58 | text | 이어 하기 끄기 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:72:7 | text | 확인 패널은 첫 동작에 초점을 주고 Tab을 안에서 순환하며 Escape로 닫는다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:81:67 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:83:61 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:84:39 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:84:57 | text | 이어 하기 끄기 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:85:38 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:85:56 | text | 계속 사용 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:95:55 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:99:7 | text | 이어 하기를 끄면 승인 후 상태를 끄고 스위치에 초점을 돌려준다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:102:67 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:104:40 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:104:58 | text | 이어 하기 끄기 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:109:7 | text | 이어 하기 끄기에서 계속 사용을 누르면 현재 상태를 유지한다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:119:58 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:120:40 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:120:58 | text | 계속 사용 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:121:55 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:122:48 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:126:7 | text | 설정 토글은 새 설정을 전달하고 닫기 버튼은 닫는다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:133:40 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:137:7 | text | 명시적 줄이기와 OS 줄이기를 모두 적용한다 | learner-text-candidate | abstract-or-formal, technical-or-internal |
| tests/components/accessibilitySettings.test.tsx:143:7 | text | App은 stable store를 사용해 localStorage load를 재렌더링마다 반복하지 않는다 | learner-text-candidate | long-or-dense |
| tests/components/accessibilitySettings.test.tsx:150:7 | text | App은 이어 하기 삭제 실패 시 저장 동의를 끄지 않는다 | feedback-or-error | — |
| tests/components/accessibilitySettings.test.tsx:152:90 | text | { throw new Error('blocked'); }); window.localStorage.setItem('pattern-unit-engine-room:v1', JSON.stringify({ version: 1, consent: true, snapshot: { journeyIndex: 0, stage: 'start', completedKinds: [], freeUnit: [], freeTrack: [], }, settings: { audioEnabled: false, motionPreference: 'system', patternContrast: 'standard' }, })); try { render( | feedback-or-error | long-or-dense, technical-or-internal |
| tests/components/accessibilitySettings.test.tsx:153:24 | text | blocked | feedback-or-error | repeated-text |
| tests/components/accessibilitySettings.test.tsx:169:42 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:169:60 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:170:69 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:172:42 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:172:60 | text | 이어 하기 끄기 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:174:55 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:181:7 | text | App 경로에서 확인 패널이 열리면 시작 화면과 업데이트 버튼을 Tab 대상에서 제외한다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:183:19 | text | ); await user.click(screen.getByRole('button', { name: '접근성 설정' })); const persistenceSwitch = screen.getByRole('switch', { name: '이 기기에서 이어 하기' }); await user.click(persistenceSwitch); await user.click(persistenceSwitch); const content = screen.getByRole('main').querySelector('.app-shell__content'); const startButton = Array.from(content?.querySelectorAll | button-or-action | long-or-dense |
| tests/components/accessibilitySettings.test.tsx:184:40 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:184:58 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:185:67 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:190:82 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:191:24 | text | button.textContent === '운행 시작'); const settingsButton = Array.from(content?.querySelectorAll | button-or-action | long-or-dense |
| tests/components/accessibilitySettings.test.tsx:191:49 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:192:85 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:193:24 | text | button.textContent === '접근성 설정'); const historyButton = Array.from(content?.querySelectorAll | button-or-action | long-or-dense |
| tests/components/accessibilitySettings.test.tsx:193:49 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:194:84 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:195:49 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:197:42 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:198:45 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:199:44 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:203:46 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:204:49 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:205:48 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/accessibilitySettings.test.tsx:209:7 | text | create-track 완료 상태를 새로고침해도 summary의 다음 행동에 도달한다 | learner-text-candidate | — |
| tests/components/accessibilitySettings.test.tsx:224:30 | text | heading | heading | repeated-text |
| tests/components/accessibilitySettings.test.tsx:224:49 | text | 활동 도장 | heading | repeated-text |
| tests/components/accessibilitySettings.test.tsx:225:36 | text | button | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:225:54 | text | 다음 운행 | button-or-action | repeated-text |
| tests/components/accessibilitySettings.test.tsx:228:30 | text | heading | heading | repeated-text |
| tests/components/accessibilitySettings.test.tsx:228:49 | text | 한 묶음 찾기 | heading | repeated-text |
| tests/components/actionRail.test.tsx:6:7 | text | primary, next, secondary 순서를 지킨다 | learner-text-candidate | — |
| tests/components/actionRail.test.tsx:6:47 | text | { render( | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:7:41 | text | 확인 | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:7:52 | text | } next={ | button-or-action | — |
| tests/components/actionRail.test.tsx:7:68 | text | 다음 | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:7:79 | text | } secondary={ | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:7:100 | text | 처음 | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:8:37 | text | button | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:8:94 | text | 확인 | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:8:100 | text | 다음 | button-or-action | repeated-text |
| tests/components/actionRail.test.tsx:8:106 | text | 처음 | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:8:11 | text | 앱 셸 | learner-text-candidate | — |
| tests/components/appShell.test.tsx:11:7 | text | 한국어 이름이 있는 main landmark를 제공한다 | learner-text-candidate | — |
| tests/components/appShell.test.tsx:15:41 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| tests/components/appShell.test.tsx:18:25 | text | heading | heading | repeated-text |
| tests/components/appShell.test.tsx:18:44 | text | 규칙 단위 기관실 | heading | repeated-text |
| tests/components/appShell.test.tsx:22:7 | text | 업데이트 버튼은 콘텐츠 footer에 있고 dialog가 열리면 배경 조작 대상이 숨겨진다 | learner-text-candidate | — |
| tests/components/appShell.test.tsx:25:13 | text | 테스트 | heading | — |
| tests/components/appShell.test.tsx:26:31 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:29:39 | text | button | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:29:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:30:45 | text | button | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:30:63 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:37:48 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/components/appShell.test.tsx:40:32 | text | button | button-or-action | repeated-text |
| tests/components/appShell.test.tsx:40:50 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:17:11 | text | 선택형 음성 안내 버튼 | instruction | — |
| tests/components/audioGuideButton.test.tsx:20:7 | text | 음성을 꺼도 같은 문자 안내를 유지한다 | instruction | — |
| tests/components/audioGuideButton.test.tsx:23:30 | text | 가장 짧게 되풀이되는 한 묶음을 골라요. | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:24:32 | text | button | button-or-action, instruction | repeated-text |
| tests/components/audioGuideButton.test.tsx:24:50 | text | 안내 듣기 | button-or-action, instruction | repeated-text |
| tests/components/audioGuideButton.test.tsx:27:7 | text | 음성을 켜면 요청할 때만 재생하고 aria-pressed를 표시한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:27:58 | text | { const guide = createGuideMock(); render( | learner-text-candidate | repeated-text, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:29:35 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:30:38 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:32:37 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:32:53 | text | false | button-or-action | — |
| tests/components/audioGuideButton.test.tsx:33:33 | text | icon-button | button-or-action | — |
| tests/components/audioGuideButton.test.tsx:37:37 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:37:53 | text | true | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:40:7 | text | 재생 중에는 안내 멈추기로 바뀐다 | instruction | — |
| tests/components/audioGuideButton.test.tsx:40:39 | text | { const guide = createGuideMock(); render( | instruction | repeated-text, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:42:35 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:43:45 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:44:42 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:48:30 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:54:7 | text | 재생할 수 없으면 polite fallback을 보여 준다 | learner-text-candidate | — |
| tests/components/audioGuideButton.test.tsx:54:53 | text | { const guide: AudioGuide = { play: vi.fn().mockResolvedValue('unavailable'), stop: vi.fn().mockReturnValue('stopped'), }; render( | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:59:35 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:60:45 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:62:30 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:68:7 | text | 자연 종료 이벤트가 오면 다시 듣기 상태로 돌아온다 | learner-text-candidate | — |
| tests/components/audioGuideButton.test.tsx:73:19 | text | undefined; }; render( | learner-text-candidate | technical-or-internal |
| tests/components/audioGuideButton.test.tsx:75:35 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:76:45 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:77:30 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:80:32 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:84:7 | text | cue가 바뀌거나 컴포넌트가 사라지면 음성을 멈춘다 | learner-text-candidate | — |
| tests/components/audioGuideButton.test.tsx:84:43 | text | { const guide = createGuideMock(); const { rerender, unmount } = render( | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:86:65 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:86:87 | text | ); rerender( | learner-text-candidate | — |
| tests/components/audioGuideButton.test.tsx:87:37 | text | repair | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:92:7 | text | cue가 바뀐 뒤 늦게 도착한 재생 결과를 무시한다 | learner-text-candidate | — |
| tests/components/audioGuideButton.test.tsx:95:49 | text | { resolvePlay = resolve; })), stop: vi.fn().mockReturnValue('stopped'), }; const { rerender } = render( | learner-text-candidate | long-or-dense |
| tests/components/audioGuideButton.test.tsx:98:56 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:98:78 | text | ); await userEvent.click(screen.getByRole('button', { name: COPY.audioListen })); rerender( | button-or-action | long-or-dense, technical-or-internal |
| tests/components/audioGuideButton.test.tsx:99:45 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:100:37 | text | repair | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:103:32 | text | button | button-or-action | repeated-text |
| tests/components/audioGuideButton.test.tsx:110:7 | text | unmount 뒤 늦게 도착한 재생 결과를 반영하지 않는다 | learner-text-candidate | — |
| tests/components/audioGuideButton.test.tsx:113:49 | text | { resolvePlay = resolve; })), stop: vi.fn().mockReturnValue('stopped'), }; const { unmount } = render( | learner-text-candidate | long-or-dense |
| tests/components/audioGuideButton.test.tsx:116:55 | text | find | learner-text-candidate | repeated-text |
| tests/components/audioGuideButton.test.tsx:117:45 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:8:10 | text | ab | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:8:23 | text | AB | learner-text-candidate | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:9:10 | text | ba | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:9:23 | text | BA | learner-text-candidate | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:10:10 | text | aa | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:10:23 | text | AA | learner-text-candidate | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:16:7 | text | 최대 네 개의 native button 선택지를 labelled group으로 보여 준다 | button-or-action | — |
| tests/components/choiceGrid.test.tsx:16:64 | text | { render( | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:19:16 | text | 한 묶음 선택 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:24:41 | text | ${choice.label} 묶음 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:29:47 | text | 한 묶음 선택 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:30:33 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:31:33 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:31:87 | text | choice-button | button-or-action | — |
| tests/components/choiceGrid.test.tsx:32:30 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:32:48 | text | BA 묶음 | button-or-action | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:36:30 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:36:48 | text | AB 묶음 | button-or-action | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:38:8 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:42:7 | text | 선택된 후보는 포커스가 없어도 시각 클래스와 선택됨 표시를 유지한다 | learner-text-candidate | multiple-actions |
| tests/components/choiceGrid.test.tsx:45:16 | text | 후보 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:50:41 | text | ${choice.label} 묶음 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:55:40 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:55:58 | text | BA 묶음 | button-or-action | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:56:35 | text | choice-button--selected | button-or-action | — |
| tests/components/choiceGrid.test.tsx:57:41 | text | 선택됨 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:60:7 | text | 클릭·Enter·Space를 native 동작으로 선택한다 | learner-text-candidate | multiple-actions |
| tests/components/choiceGrid.test.tsx:65:16 | text | 한 묶음 선택 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:70:41 | text | ${choice.label} 묶음 | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:75:34 | text | button | button-or-action | repeated-text |
| tests/components/choiceGrid.test.tsx:75:52 | text | AB 묶음 | button-or-action | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:86:7 | text | 다섯 개 이상 선택지는 개발·테스트에서 결정적으로 거부한다 | learner-text-candidate | — |
| tests/components/choiceGrid.test.tsx:87:45 | text | abc | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:87:59 | text | ABC | learner-text-candidate | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:87:74 | text | bc | learner-text-candidate | repeated-text |
| tests/components/choiceGrid.test.tsx:87:87 | text | BC | learner-text-candidate | repeated-text, technical-or-internal |
| tests/components/choiceGrid.test.tsx:92:18 | text | 너무 많은 선택 | learner-text-candidate | — |
| tests/components/continuePatternScreen.test.tsx:19:25 | text | continue | feedback-or-error | repeated-text |
| tests/components/continuePatternScreen.test.tsx:19:53 | text | continue fixture required | feedback-or-error | — |
| tests/components/continuePatternScreen.test.tsx:36:16 | text | 빈칸 수에 맞는 선택지(%s)를 제출한다 | learner-text-candidate | abstract-or-formal, multiple-actions |
| tests/components/continuePatternScreen.test.tsx:40:59 | text | 현재 단계 2 / 5 | learner-text-candidate | repeated-text |
| tests/components/continuePatternScreen.test.tsx:41:30 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:41:48 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:42:40 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:43:30 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:43:48 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:44:40 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:44:58 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:45:30 | text | 한 묶음으로 다음 칸을 이었어요. | learner-text-candidate | repeated-text |
| tests/components/continuePatternScreen.test.tsx:46:30 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:47:30 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:47:89 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:50:7 | text | 오답은 다음 칸을 미리 보여 주지 않고 이유별 문구를 표시한다 | feedback-or-error | — |
| tests/components/continuePatternScreen.test.tsx:53:40 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:54:40 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:54:58 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:55:30 | text | 한 묶음의 순서를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| tests/components/continuePatternScreen.test.tsx:56:32 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:59:7 | text | 선택과 제출을 Enter·Space로 조작한다 | learner-text-candidate | abstract-or-formal, multiple-actions |
| tests/components/continuePatternScreen.test.tsx:62:38 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:65:38 | text | button | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:65:56 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/components/continuePatternScreen.test.tsx:68:30 | text | 한 묶음으로 다음 칸을 이었어요. | learner-text-candidate | repeated-text |
| tests/components/continuePatternScreen.test.tsx:71:7 | text | 각 화면에서 활성 주 행동은 하나를 넘지 않는다 | learner-text-candidate | — |
| tests/components/continuePatternScreen.test.tsx:75:40 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:31:7 | text | unit mode exposes three keyboard buttons, capped controls, and a lock action | learner-text-candidate | long-or-dense |
| tests/components/createPatternScreen.test.tsx:31:97 | text | { const user = userEvent.setup(); const onAddToken = vi.fn(); const { rerender } = render( | learner-text-candidate | long-or-dense |
| tests/components/createPatternScreen.test.tsx:34:83 | text | ); expect(screen.getAllByRole('status')).toHaveLength(1); expect(screen.getByRole('status')).toHaveTextContent('현재 단계 5 / 5'); const choices = screen.getAllByRole('button', { name: /모양$/ }); expect(choices).toHaveLength(3); expect(screen.getByRole('button', { name: COPY.removeFreeToken })).toBeDisabled(); expect(screen.getByRole('button', { name: COPY.lockFreeUnit })).toBeDisabled(); choices[0]!.focus(); await user.keyboard('{Enter}'); expect(onAddToken).toHaveBeenCalledWith('A'); rerender( | button-or-action | long-or-dense, technical-or-internal |
| tests/components/createPatternScreen.test.tsx:36:59 | text | 현재 단계 5 / 5 | learner-text-candidate | repeated-text |
| tests/components/createPatternScreen.test.tsx:37:42 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:39:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:40:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:48:59 | text | 현재 단계 5 / 5 | learner-text-candidate | repeated-text |
| tests/components/createPatternScreen.test.tsx:49:33 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:51:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:59:16 | text | track mode delegates %s, preserves retry controls, and replaces run on success | learner-text-candidate | long-or-dense |
| tests/components/createPatternScreen.test.tsx:59:113 | text | { const onAppendUnit = vi.fn(); const onReset = vi.fn(); const onRun = vi.fn(); const onContinue = vi.fn(); const { rerender } = render( | learner-text-candidate | long-or-dense |
| tests/components/createPatternScreen.test.tsx:75:32 | text | retry | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:75:49 | text | needs-second-repeat | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:77:9 | text | , ); expect(screen.getAllByRole('status')).toHaveLength(2); expect(screen.getByText('현재 단계 5 / 5')).toBeInTheDocument(); expect(screen.getByRole('button', { name: COPY.appendFreeUnit })).toBeInTheDocument(); expect(screen.getByRole('button', { name: COPY.resetFreePattern })).toBeInTheDocument(); expect(screen.getByRole('button', { name: COPY.runFreePattern })).toHaveClass('gi-pulse'); expect(screen.getByRole('button', { name: COPY.runFreePattern })).toBeEnabled(); expect(document.querySelectorAll('.pattern-cell--active')).toHaveLength(0); rerender( | button-or-action | long-or-dense, technical-or-internal |
| tests/components/createPatternScreen.test.tsx:81:30 | text | 현재 단계 5 / 5 | learner-text-candidate | repeated-text |
| tests/components/createPatternScreen.test.tsx:82:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:83:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:84:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:84:84 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:85:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:98:32 | text | success | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:98:51 | text | matches | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:102:32 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:103:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:103:48 | text | ${COPY.summaryTitle} 보기 | button-or-action | repeated-text, technical-or-internal |
| tests/components/createPatternScreen.test.tsx:103:94 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:104:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:104:48 | text | ${COPY.summaryTitle} 보기 | button-or-action | repeated-text, technical-or-internal |
| tests/components/createPatternScreen.test.tsx:113:35 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:121:7 | text | 최대 길이에 도달하면 한 묶음 붙이기를 막고 안내한다 | instruction | — |
| tests/components/createPatternScreen.test.tsx:133:30 | text | button | button-or-action | repeated-text |
| tests/components/createPatternScreen.test.tsx:137:7 | text | reduced motion retry에서도 반복 중인 미운행 트랙은 활성 칸을 표시하지 않는다 | learner-text-candidate | — |
| tests/components/createPatternScreen.test.tsx:145:32 | text | retry | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:145:49 | text | does-not-repeat | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:154:7 | text | 자유 규칙 성공 시 실제 선로에 moving class를 붙인다 | learner-text-candidate | — |
| tests/components/createPatternScreen.test.tsx:161:32 | text | success | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:161:51 | text | matches | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:171:7 | text | reduced motion에서는 moving animation 없이 반복 칸 테두리를 표시한다 | learner-text-candidate | — |
| tests/components/createPatternScreen.test.tsx:178:32 | text | success | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:178:51 | text | matches | feedback-or-error, hint | repeated-text |
| tests/components/createPatternScreen.test.tsx:187:57 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| tests/components/createPatternScreen.test.tsx:188:8 | text | 첫째 칸, 톱니바퀴 모양, 점무늬 | learner-text-candidate | repeated-text |
| tests/components/createPatternScreen.test.tsx:189:8 | text | 셋째 칸, 톱니바퀴 모양, 점무늬 | learner-text-candidate | — |
| tests/components/feedbackPanel.test.tsx:7:11 | text | FeedbackPanel | feedback-or-error | — |
| tests/components/feedbackPanel.test.tsx:8:7 | text | 재시도 상태는 제목·이유·다음 행동을 한 라이브 영역에 보여 준다 | learner-text-candidate | — |
| tests/components/feedbackPanel.test.tsx:8:51 | text | { render( | feedback-or-error | repeated-text |
| tests/components/feedbackPanel.test.tsx:11:18 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | learner-text-candidate | repeated-text |
| tests/components/feedbackPanel.test.tsx:12:26 | text | 다시 고를 곳 보기 | learner-text-candidate | repeated-text |
| tests/components/feedbackPanel.test.tsx:22:30 | text | heading | heading | repeated-text |
| tests/components/feedbackPanel.test.tsx:22:49 | text | 다시 해 봐요 | heading | repeated-text |
| tests/components/feedbackPanel.test.tsx:23:30 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | learner-text-candidate | repeated-text |
| tests/components/feedbackPanel.test.tsx:24:30 | text | button | button-or-action | repeated-text |
| tests/components/feedbackPanel.test.tsx:24:48 | text | 다시 고를 곳 보기 | button-or-action | repeated-text |
| tests/components/feedbackPanel.test.tsx:27:7 | text | 성공 상태의 다음 행동은 한 번만 호출된다 | learner-text-candidate | — |
| tests/components/feedbackPanel.test.tsx:27:44 | text | { const user = userEvent.setup(); const onNext = vi.fn(); render( | feedback-or-error | long-or-dense |
| tests/components/feedbackPanel.test.tsx:32:18 | text | 가장 짧은 한 묶음을 찾았어요. | learner-text-candidate | repeated-text |
| tests/components/feedbackPanel.test.tsx:33:26 | text | 다음 활동 | learner-text-candidate | repeated-text |
| tests/components/feedbackPanel.test.tsx:39:30 | text | heading | heading | repeated-text |
| tests/components/feedbackPanel.test.tsx:39:49 | text | 잘했어요 | heading | repeated-text |
| tests/components/feedbackPanel.test.tsx:40:40 | text | button | button-or-action | repeated-text |
| tests/components/feedbackPanel.test.tsx:40:58 | text | 다음 활동 | button-or-action | repeated-text |
| tests/components/feedbackPanel.test.tsx:44:7 | text | 기본 성공 안내는 느낌표 없이 차분하게 읽힌다 | instruction | — |
| tests/components/feedbackPanel.test.tsx:44:40 | text | { render( | feedback-or-error, instruction | repeated-text |
| tests/components/feedbackPanel.test.tsx:45:35 | text | success | feedback-or-error | repeated-text |
| tests/components/feedbackPanel.test.tsx:47:30 | text | 잘했어요. | learner-text-candidate | repeated-text |
| tests/components/findUnitScreen.test.tsx:19:25 | text | find | feedback-or-error | repeated-text |
| tests/components/findUnitScreen.test.tsx:19:49 | text | find fixture required | feedback-or-error | — |
| tests/components/findUnitScreen.test.tsx:35:7 | text | 선택 전 제출을 막고 후보를 한국어 이름과 칸 수로 읽는다 | learner-text-candidate | abstract-or-formal, multiple-actions |
| tests/components/findUnitScreen.test.tsx:39:59 | text | 현재 단계 1 / 5 | learner-text-candidate | — |
| tests/components/findUnitScreen.test.tsx:40:38 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:40:56 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:43:30 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:44:30 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:45:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:49:33 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:52:7 | text | 긴 후보의 nonminimal 피드백과 힌트를 보여 주고 정답 뒤 다음 칸만 연다 | feedback-or-error, hint | — |
| tests/components/findUnitScreen.test.tsx:55:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:56:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:56:58 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:57:30 | text | 되풀이되지만 더 짧은 한 묶음이 있어요. | learner-text-candidate | repeated-text |
| tests/components/findUnitScreen.test.tsx:58:30 | text | button | button-or-action, hint | repeated-text |
| tests/components/findUnitScreen.test.tsx:58:48 | text | 테두리 도움 보기 | button-or-action, hint | repeated-text |
| tests/components/findUnitScreen.test.tsx:59:32 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:60:40 | text | button | button-or-action, hint | repeated-text |
| tests/components/findUnitScreen.test.tsx:60:58 | text | 테두리 도움 보기 | button-or-action, hint | repeated-text |
| tests/components/findUnitScreen.test.tsx:61:30 | text | 테두리로 나눈 묶음을 차례로 살펴보세요. | learner-text-candidate | repeated-text |
| tests/components/findUnitScreen.test.tsx:63:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:64:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:64:58 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:65:30 | text | 가장 짧은 한 묶음을 찾았어요. | learner-text-candidate | repeated-text |
| tests/components/findUnitScreen.test.tsx:66:30 | text | 테두리 도움을 사용해 규칙을 찾았어요. | hint | repeated-text |
| tests/components/findUnitScreen.test.tsx:67:30 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:68:32 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:68:50 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:72:7 | text | 후보와 제출을 Enter·Space로 조작한다 | learner-text-candidate | abstract-or-formal |
| tests/components/findUnitScreen.test.tsx:75:41 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:78:38 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:78:56 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:81:30 | text | 가장 짧은 한 묶음을 찾았어요. | learner-text-candidate | repeated-text |
| tests/components/findUnitScreen.test.tsx:84:7 | text | 잘못 이어지지 않는 후보도 별도 피드백을 표시한다 | learner-text-candidate | — |
| tests/components/findUnitScreen.test.tsx:87:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:88:40 | text | button | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:88:58 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/findUnitScreen.test.tsx:89:30 | text | 이 묶음으로는 끝까지 되풀이되지 않아요. | learner-text-candidate | repeated-text |
| tests/components/instructionCard.test.tsx:7:7 | text | StageHeader가 안내를 소유하면 음성 꺼짐 상태의 빈 카드를 만들지 않는다 | instruction | — |
| tests/components/instructionCard.test.tsx:15:7 | text | 음성을 켜면 transcript 없이도 로컬 안내 조작을 남긴다 | instruction | — |
| tests/components/instructionCard.test.tsx:18:30 | text | button | button-or-action, instruction | repeated-text |
| tests/components/instructionCard.test.tsx:18:48 | text | 안내 듣기 | button-or-action, instruction | repeated-text |
| tests/components/instructionCard.test.tsx:19:30 | text | AI 합성 음성으로 만든 안내예요. | instruction | repeated-text, technical-or-internal |
| tests/components/learningJourney.test.tsx:8:7 | text | 상태를 색상 없이 텍스트로 표시한다 | learner-text-candidate | — |
| tests/components/learningJourney.test.tsx:10:15 | text | find | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:10:30 | text | 찾기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:10:44 | text | complete | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:11:15 | text | continue | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:11:34 | text | 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:11:52 | text | current | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:12:15 | text | repair | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:12:32 | text | 수리하기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:12:48 | text | upcoming | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:14:52 | text | 학습 여정 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:15:30 | text | 완료 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:16:30 | text | 현재 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:17:30 | text | 예정 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:20:7 | text | 현재 단계 의미를 목록 항목 전체에 연결한다 | learner-text-candidate | — |
| tests/components/learningJourney.test.tsx:22:15 | text | find | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:22:30 | text | 찾기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:22:44 | text | complete | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:23:15 | text | continue | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:23:34 | text | 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:23:52 | text | current | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:24:15 | text | repair | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:24:32 | text | 수리하기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:24:48 | text | upcoming | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:27:43 | text | 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/components/learningJourney.test.tsx:30:30 | text | 현재 | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:11:7 | text | 각 칸을 순서와 비색상 정보로 읽는다 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:14:46 | text | 규칙 배열 | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:16:30 | text | 첫째 칸, 톱니바퀴 모양, 점무늬 | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:19:30 | text | 둘째 칸, 나사못 모양, 줄무늬 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:24:7 | text | 빈 칸과 열 번째 칸도 순서 이름을 유지한다 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:32:35 | text | 첫째 칸, 빈칸 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:34:30 | text | 10번째 칸, 나사못 모양, 줄무늬 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:38:7 | text | 선택 가능한 칸은 native button으로 semantic index를 전달한다 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:38:67 | text | { const user = userEvent.setup(); const onSelect = vi.fn(); render( | learner-text-candidate | long-or-dense |
| tests/components/patternBoard.test.tsx:51:42 | text | button | button-or-action | repeated-text |
| tests/components/patternBoard.test.tsx:53:37 | text | pattern-cell--selectable | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:54:37 | text | pattern-cell--selectable | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:55:55 | text | pattern-cell | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:56:59 | text | data-pattern-mark | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:57:41 | text | aria-pressed | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| tests/components/patternBoard.test.tsx:57:57 | text | true | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:58:37 | text | pattern-cell--active | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:70:7 | text | 읽기 전용 셀의 스타일·데이터 계약은 labelled span 하나에만 둔다 | learner-text-candidate | — |
| tests/components/patternBoard.test.tsx:70:57 | text | { const { container } = render( | learner-text-candidate | repeated-text |
| tests/components/patternBoard.test.tsx:73:43 | text | li > span[aria-label] | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/components/patternBoard.test.tsx:81:7 | text | 읽기 전용 칸은 button 없이 labelled span을 사용한다 | button-or-action | — |
| tests/components/patternBoard.test.tsx:81:53 | text | { const { container } = render( | button-or-action | repeated-text |
| tests/components/patternBoard.test.tsx:86:32 | text | button | button-or-action | repeated-text |
| tests/components/patternBoard.test.tsx:88:32 | text | li > span[aria-label="첫째 칸, 톱니바퀴 모양, 점무늬"] | learner-text-candidate | technical-or-internal |
| tests/components/patternBoard.test.tsx:88:54 | aria-label | 첫째 칸, 톱니바퀴 모양, 점무늬 | aria-label | repeated-text |
| tests/components/patternBoard.test.tsx:92:7 | text | TokenIcon은 SVG 접근성 이름을 중복하지 않는다 | learner-text-candidate | technical-or-internal |
| tests/components/patternBoard.test.tsx:97:39 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| tests/components/patternStrip.test.tsx:9:7 | text | PatternStrip은 ol/li 없이 비대화형 시각 요소만 렌더링한다 | learner-text-candidate | — |
| tests/components/patternStrip.test.tsx:9:55 | text | { render( | button-or-action | repeated-text |
| tests/components/patternStrip.test.tsx:16:38 | text | button | button-or-action | repeated-text |
| tests/components/patternStrip.test.tsx:17:34 | text | ol | button-or-action | — |
| tests/components/patternStrip.test.tsx:18:34 | text | li | button-or-action | — |
| tests/components/patternStrip.test.tsx:19:34 | text | [aria-hidden="true"] | button-or-action | technical-or-internal |
| tests/components/patternStrip.test.tsx:20:37 | text | .pattern-strip__cell | button-or-action | — |
| tests/components/progressIndicator.test.tsx:9:7 | text | 진행 표시가 현재 단계와 전체 단계를 읽는다 | learner-text-candidate | — |
| tests/components/progressIndicator.test.tsx:12:59 | text | 현재 단계 2 / 5 | learner-text-candidate | repeated-text |
| tests/components/pulseAction.test.tsx:10:7 | text | 허용된 두 행동만 pulse API로 표현한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/components/pulseAction.test.tsx:12:62 | text | 한 묶음 찾기 | learner-text-candidate | repeated-text |
| tests/components/pulseAction.test.tsx:14:23 | text | , ); expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveClass('primary-action'); expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveClass('gi-pulse'); expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveAttribute( 'data-primary-action', 'true', ); rerender( | button-or-action | long-or-dense |
| tests/components/pulseAction.test.tsx:16:30 | text | button | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:16:48 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:16:74 | text | primary-action | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:17:30 | text | button | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:17:48 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:17:74 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:18:30 | text | button | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:18:48 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:24:56 | text | 운행하기 | learner-text-candidate | repeated-text |
| tests/components/pulseAction.test.tsx:28:30 | text | button | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:28:48 | text | 운행하기 | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:28:71 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:31:7 | text | 비활성화된 주 행동도 base class를 유지하고 pulse와 primary marker만 제거한다 | learner-text-candidate | long-or-dense |
| tests/components/pulseAction.test.tsx:33:65 | text | 운행하기 | learner-text-candidate | repeated-text |
| tests/components/pulseAction.test.tsx:38:38 | text | button | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:38:56 | text | 운행하기 | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:40:33 | text | primary-action | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:41:37 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/pulseAction.test.tsx:42:41 | text | data-primary-action | button-or-action | — |
| tests/components/pulseAction.test.tsx:45:7 | text | 빈 문자열이나 공백 안내도 기본 visible instruction으로 대체한다 | instruction | — |
| tests/components/pulseAction.test.tsx:46:60 | text | ); expect(screen.getByText('안내를 읽고 차례로 해 보세요.')).toBeInTheDocument(); rerender( | instruction | long-or-dense, repeated-text |
| tests/components/pulseAction.test.tsx:47:30 | text | 안내를 읽고 차례로 해 보세요. | instruction | repeated-text |
| tests/components/pulseAction.test.tsx:49:44 | text | ); expect(screen.getByText('안내를 읽고 차례로 해 보세요.')).toBeInTheDocument(); rerender( | instruction | long-or-dense, repeated-text |
| tests/components/pulseAction.test.tsx:50:30 | text | 안내를 읽고 차례로 해 보세요. | instruction | repeated-text |
| tests/components/pulseAction.test.tsx:53:30 | text | 안내를 읽고 차례로 해 보세요. | instruction | repeated-text |
| tests/components/pulseAction.test.tsx:56:7 | text | cue transcript가 충돌하는 children과 text보다 우선한다 | learner-text-candidate | — |
| tests/components/pulseAction.test.tsx:58:54 | text | 다른 안내 | instruction | — |
| tests/components/pulseAction.test.tsx:58:61 | text | 다른 children | instruction | repeated-text |
| tests/components/pulseAction.test.tsx:62:30 | text | 가장 짧게 되풀이되는 한 묶음을 골라요. | learner-text-candidate | repeated-text |
| tests/components/pulseAction.test.tsx:63:32 | text | 다른 children | learner-text-candidate | repeated-text |
| tests/components/pulseAction.test.tsx:64:30 | text | AI 합성 음성으로 만든 안내예요. | instruction | repeated-text, technical-or-internal |
| tests/components/pulseAction.test.tsx:67:7 | text | cue 없이 기존 fallback을 유지하고 audio disabled에서는 control을 숨긴다 | learner-text-candidate | long-or-dense |
| tests/components/pulseAction.test.tsx:69:32 | text | button | button-or-action, instruction | repeated-text |
| tests/components/pulseAction.test.tsx:69:50 | text | 안내 듣기 | button-or-action, instruction | repeated-text |
| tests/components/pulseAction.test.tsx:70:32 | text | AI 합성 음성으로 만든 안내예요. | instruction | repeated-text, technical-or-internal |
| tests/components/reducedMotion.test.tsx:59:11 | text | useEffectiveReducedMotion 및 앱 모션 표지 | learner-text-candidate | — |
| tests/components/reducedMotion.test.tsx:71:7 | text | 운영체제가 reduce이면 앱 system 설정에서도 reduce를 반환한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/components/reducedMotion.test.tsx:77:7 | text | 앱의 reduce 선택은 운영체제 설정과 무관하게 유지된다 | learner-text-candidate | — |
| tests/components/reducedMotion.test.tsx:83:7 | text | 앱 system 설정은 OS change를 따라가고 listener를 해제한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/components/reducedMotion.test.tsx:96:7 | text | 앱 root에 유효 모션과 무늬 대비 data attribute를 연결한다 | learner-text-candidate | abstract-or-formal |
| tests/components/reducedMotion.test.tsx:100:55 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:104:40 | text | button | button-or-action | repeated-text |
| tests/components/reducedMotion.test.tsx:104:58 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/reducedMotion.test.tsx:105:58 | text | 모션 줄이기 | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:106:58 | text | 무늬 대비 높이기 | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:111:7 | text | OS motion change가 root와 열린 설정 패널에 함께 반영된다 | learner-text-candidate | technical-or-internal |
| tests/components/reducedMotion.test.tsx:115:40 | text | button | button-or-action | repeated-text |
| tests/components/reducedMotion.test.tsx:115:58 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/reducedMotion.test.tsx:116:30 | text | 기본 모션으로 보여 줘요. | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:119:46 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:120:30 | text | 모션을 줄여서 보여 줘요. | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:123:46 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:124:30 | text | 기본 모션으로 보여 줘요. | learner-text-candidate | repeated-text |
| tests/components/reducedMotion.test.tsx:127:7 | text | 설정 switch 자체가 48px 이상 hit area CSS 계약을 갖는다 | learner-text-candidate | technical-or-internal |
| tests/components/repairPatternScreen.test.tsx:19:25 | text | repair | feedback-or-error | repeated-text |
| tests/components/repairPatternScreen.test.tsx:19:51 | text | repair fixture required | feedback-or-error | — |
| tests/components/repairPatternScreen.test.tsx:35:7 | text | 칸 선택 뒤 교체 항을 눌러 한 오류만 수리한다 | feedback-or-error | multiple-actions |
| tests/components/repairPatternScreen.test.tsx:39:59 | text | 현재 단계 3 / 5 | learner-text-candidate | — |
| tests/components/repairPatternScreen.test.tsx:40:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:41:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:41:58 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:42:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:42:58 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:43:30 | text | 규칙을 깨뜨린 칸을 고쳤어요. | learner-text-candidate | repeated-text |
| tests/components/repairPatternScreen.test.tsx:44:30 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:47:7 | text | 교체 항은 칸을 고른 뒤에만 보이고 키보드로도 수리한다 | learner-text-candidate | — |
| tests/components/repairPatternScreen.test.tsx:50:32 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:50:50 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:51:36 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:54:43 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:54:61 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:57:38 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:57:56 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:60:30 | text | 규칙을 깨뜨린 칸을 고쳤어요. | learner-text-candidate | repeated-text |
| tests/components/repairPatternScreen.test.tsx:65:7 | text | 맞는 위치에서 틀린 교체 항을 고르면 답을 노출하지 않는다 | learner-text-candidate | — |
| tests/components/repairPatternScreen.test.tsx:68:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:69:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:69:58 | text | 전등 모양 | button-or-action | — |
| tests/components/repairPatternScreen.test.tsx:70:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:70:58 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:71:30 | text | 선택한 칸에 들어갈 모양을 다시 골라요. | learner-text-candidate | repeated-text |
| tests/components/repairPatternScreen.test.tsx:73:32 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:76:7 | text | 위치와 교체 항이 맞지 않으면 이유를 알려 주고 다시 고르게 한다 | learner-text-candidate | multiple-conditions |
| tests/components/repairPatternScreen.test.tsx:79:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:80:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:80:58 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:81:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:81:58 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:82:30 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | learner-text-candidate | repeated-text |
| tests/components/repairPatternScreen.test.tsx:83:32 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:86:7 | text | 위치를 바꾸면 이전 교체 항을 비우고 다시 고르게 한다 | learner-text-candidate | — |
| tests/components/repairPatternScreen.test.tsx:89:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:90:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:90:58 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:91:30 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:91:48 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:92:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:93:30 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:93:48 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:96:7 | text | 틀린 위치 재시도에서 단위 시작 테두리만 보여 준다 | learner-text-candidate | — |
| tests/components/repairPatternScreen.test.tsx:99:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:100:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:100:58 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:101:40 | text | button | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:101:58 | text | 고치기 | button-or-action | repeated-text |
| tests/components/repairPatternScreen.test.tsx:102:30 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | learner-text-candidate | repeated-text |
| tests/components/repairPatternScreen.test.tsx:105:39 | text | .pattern-cell--error | feedback-or-error | — |
| tests/components/stageHeader.test.tsx:6:7 | text | 단계·행동·진행을 한 헤더에 제공한다 | learner-text-candidate | — |
| tests/components/stageHeader.test.tsx:6:35 | text | { render( | instruction | repeated-text |
| tests/components/stageHeader.test.tsx:7:34 | text | 2단계 | instruction | repeated-text |
| tests/components/stageHeader.test.tsx:7:46 | title | 이어 붙이기 | title, instruction | repeated-text |
| tests/components/stageHeader.test.tsx:7:67 | text | 다음 칸을 골라요. | instruction | repeated-text |
| tests/components/stageHeader.test.tsx:8:30 | text | heading | heading | repeated-text |
| tests/components/stageHeader.test.tsx:8:49 | text | 이어 붙이기 | heading | repeated-text |
| tests/components/stageHeader.test.tsx:9:30 | text | 다음 칸을 골라요. | learner-text-candidate | repeated-text |
| tests/components/stageHeader.test.tsx:10:30 | text | 현재 단계 2 / 5 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:14:7 | text | 시작 화면은 질문과 다른 안내를 보여 주고 미션 그림을 포함한다 | instruction | — |
| tests/components/startScreen.test.tsx:23:30 | text | heading | heading | repeated-text |
| tests/components/startScreen.test.tsx:30:7 | text | 제목을 주면 미션 그림을 이미지로 읽는다 | learner-text-candidate | — |
| tests/components/startScreen.test.tsx:30:37 | text | { render( | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:31:45 | title | 다섯 미션 기관실 그림 | title | repeated-text |
| tests/components/startScreen.test.tsx:33:59 | text | 다섯 미션 기관실 그림 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:38:7 | text | 제목과 시작·접근성 설정 행동을 보여 주고 각각의 콜백을 호출한다 | learner-text-candidate | — |
| tests/components/startScreen.test.tsx:50:30 | text | heading | heading | repeated-text |
| tests/components/startScreen.test.tsx:50:49 | text | 기관실 문을 열어 볼까요? | heading | repeated-text |
| tests/components/startScreen.test.tsx:51:30 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:51:48 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:52:30 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:52:48 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:53:30 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:53:48 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:53:72 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:54:30 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:54:48 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:54:77 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:56:40 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:56:58 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:57:40 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:57:58 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:63:7 | text | 핵심 안내 뒤에 학습 여정과 행동 순서를 배치한다 | instruction | — |
| tests/components/startScreen.test.tsx:67:19 | text | find | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:67:34 | text | 찾기 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:67:48 | text | current | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:68:19 | text | continue | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:68:38 | text | 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:68:56 | text | upcoming | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:69:19 | text | repair | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:69:36 | text | 수리하기 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:69:52 | text | upcoming | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:70:19 | text | translate | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:70:39 | text | 번역하기 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:70:55 | text | upcoming | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:71:19 | text | create | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:71:36 | text | 만들기 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:71:51 | text | upcoming | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:79:42 | text | region | learner-text-candidate | — |
| tests/components/startScreen.test.tsx:81:73 | text | 학습 여정 | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:83:49 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:84:52 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:92:7 | text | 실제 앱 리듀서가 시작 화면에서 첫 단위 찾기 화면으로 이동한다 | learner-text-candidate | — |
| tests/components/startScreen.test.tsx:95:40 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:95:58 | text | 운행 시작 | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:97:30 | text | heading | heading | repeated-text |
| tests/components/startScreen.test.tsx:97:49 | text | 한 묶음 찾기 | heading | repeated-text |
| tests/components/startScreen.test.tsx:98:30 | text | 가장 짧게 되풀이되는 한 묶음을 골라요. | learner-text-candidate | repeated-text |
| tests/components/startScreen.test.tsx:102:7 | text | 설정 패널을 닫으면 설정 버튼으로 포커스를 돌려준다 | learner-text-candidate | — |
| tests/components/startScreen.test.tsx:106:46 | text | button | button-or-action | repeated-text |
| tests/components/startScreen.test.tsx:108:40 | text | button | button-or-action | repeated-text |
| tests/components/summaryScreen.test.tsx:21:36 | text | list | learner-text-candidate | repeated-text |
| tests/components/summaryScreen.test.tsx:32:35 | text | .learning-stamp__mark[aria-hidden="true"] | learner-text-candidate | technical-or-internal |
| tests/components/summaryScreen.test.tsx:48:30 | text | list | learner-text-candidate | repeated-text |
| tests/components/summaryScreen.test.tsx:48:88 | text | .learning-stamp | learner-text-candidate | — |
| tests/components/summaryScreen.test.tsx:51:36 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:14:39 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:15:34 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:26:91 | text | ([]); const mission = getMission(missionId); if (mission.kind !== 'translate') throw new Error('translate fixture required'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| tests/components/translatePatternScreen.test.tsx:28:25 | text | translate | feedback-or-error | repeated-text |
| tests/components/translatePatternScreen.test.tsx:28:54 | text | translate fixture required | feedback-or-error | — |
| tests/components/translatePatternScreen.test.tsx:47:7 | text | 모든 원래 항을 대응하기 전에는 확인을 막는다 | learner-text-candidate | — |
| tests/components/translatePatternScreen.test.tsx:50:59 | text | 현재 단계 4 / 5 | learner-text-candidate | — |
| tests/components/translatePatternScreen.test.tsx:51:30 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:51:48 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:54:7 | text | 같은 새 모양을 두 원래 항에 쓰면 수정 기회를 준다 | learner-text-candidate | — |
| tests/components/translatePatternScreen.test.tsx:57:32 | text | 톱니바퀴 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:57:40 | text | 동그라미 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:58:32 | text | 나사못 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:58:39 | text | 동그라미 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:59:40 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:59:58 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:60:30 | text | 서로 다른 항에는 서로 다른 새 모양을 골라요. | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:61:32 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:64:7 | text | 원래 항과 새 모양 대응을 Enter와 Space로 조작하고 pulse를 쓰지 않는다 | learner-text-candidate | — |
| tests/components/translatePatternScreen.test.tsx:67:38 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:67:56 | text | 톱니바퀴 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:70:38 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:70:56 | text | 동그라미 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:73:30 | text | 톱니바퀴 원래 항 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:75:30 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:75:48 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:75:79 | text | gi-pulse | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:78:7 | text | 외형이 달라도 순서가 같으면 승인한다 | learner-text-candidate | — |
| tests/components/translatePatternScreen.test.tsx:81:32 | text | 톱니바퀴 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:81:40 | text | 동그라미 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:82:32 | text | 나사못 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:82:39 | text | 세모 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:83:40 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:83:58 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:84:30 | text | 모양은 달라도 같은 순서예요. | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:85:30 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:88:7 | text | 세 항 번역도 원래 순서를 유지한다 | learner-text-candidate | — |
| tests/components/translatePatternScreen.test.tsx:91:32 | text | 전등 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:91:38 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:92:32 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:92:38 | text | 창문 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:93:32 | text | 별 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:93:37 | text | 기차 | learner-text-candidate | repeated-text |
| tests/components/translatePatternScreen.test.tsx:94:40 | text | button | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:94:58 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/components/translatePatternScreen.test.tsx:95:30 | text | 모양은 달라도 같은 순서예요. | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:11:11 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:14:7 | text | 최신 업데이트 날짜와 개선 요약이 기록된다 | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:17:14 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:18:17 | text | 설정 닫기 포커스 복귀와 의미 토큰을 보강하고 모바일 가로 넘침을 확인했어요 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:22:7 | text | 문자 라벨 버튼으로 날짜가 있는 이력을 열고 닫는다 | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:24:27 | text | 학습 화면 | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:26:39 | text | button | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:26:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:30:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:38:33 | text | 초등학생 관점 모바일·선택·운행 피드백 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:41:33 | text | GitHub Pages 배포 구성 추가 | learner-text-candidate | abstract-or-formal, repeated-text |
| tests/components/updateHistory.test.tsx:43:38 | text | MVP 학습 흐름과 접근성 검증 추가 | learner-text-candidate | abstract-or-formal, repeated-text, technical-or-internal |
| tests/components/updateHistory.test.tsx:44:38 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:49:7 | text | 최신 개선 기록과 기존 기록의 순서를 지키며 중복이 없다 | learner-text-candidate | multiple-actions |
| tests/components/updateHistory.test.tsx:53:16 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:54:19 | text | 설정 닫기 포커스 복귀와 의미 토큰을 보강하고 모바일 가로 넘침을 확인했어요 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:58:16 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:59:19 | text | 학습 여정·행동 레일·출발 화면 계층을 정리하고 피드백을 강화했어요 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:63:16 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:64:19 | text | 초등학생 관점 모바일·선택·운행 피드백 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:68:16 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:69:19 | text | GitHub Pages 배포 구성 추가 | learner-text-candidate | abstract-or-formal, repeated-text |
| tests/components/updateHistory.test.tsx:73:16 | text | 개발 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:74:19 | text | MVP 학습 흐름과 접근성 검증 추가 | learner-text-candidate | abstract-or-formal, repeated-text, technical-or-internal |
| tests/components/updateHistory.test.tsx:78:16 | text | 설계 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:79:19 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:93:65 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:93:71 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:93:77 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:93:83 | text | 개선 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:93:89 | text | 개발 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:93:95 | text | 설계 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:96:7 | text | 콘텐츠 footer의 업데이트 버튼이 inline 배치 계약을 지킨다 | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:118:40 | text | position: fixed; | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:119:40 | text | z-index: | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:120:40 | text | inset-inline-end: | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:121:40 | text | inset-block-end: | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:122:36 | text | min-inline-size: 48px; | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:123:36 | text | min-block-size: 48px; | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:126:7 | text | 열린 모달에서 Tab이 내부에 순환하고 닫기 버튼으로 trigger에 돌아온다 | learner-text-candidate | — |
| tests/components/updateHistory.test.tsx:126:64 | text | { const user = userEvent.setup(); render( | button-or-action | — |
| tests/components/updateHistory.test.tsx:128:44 | text | 뒤 콘텐츠 버튼 | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:130:39 | text | button | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:130:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:131:48 | text | button | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:131:66 | text | 뒤 콘텐츠 버튼 | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:134:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:135:51 | text | button | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:135:69 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| tests/components/updateHistory.test.tsx:138:47 | text | tabindex | learner-text-candidate | repeated-text |
| tests/components/updateHistory.test.tsx:148:50 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:19:55 | text | { await page.goto('/'); await activate(page.getByRole('button', { name: '운행 시작' })); } async function completeFind(page: Page): Promise | button-or-action | long-or-dense |
| tests/e2e/accessibility.spec.ts:21:34 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:21:52 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:24:55 | text | { await page.getByRole('button', { name: /후보 2:/ }).click(); await page.getByRole('button', { name: '한 묶음 찾기' }).click(); await page.getByRole('button', { name: '다음 활동: 이어 붙이기' }).click(); } async function completeContinue(page: Page): Promise | button-or-action | long-or-dense |
| tests/e2e/accessibility.spec.ts:25:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:26:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:26:43 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:27:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:27:43 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:30:59 | text | { await page.getByRole('button', { name: '나사못 한 칸' }).click(); await page.getByRole('button', { name: '이어 붙이기' }).click(); await page.getByRole('button', { name: '다음 활동: 규칙 수리하기' }).click(); } async function completeRepair(page: Page): Promise | button-or-action | long-or-dense |
| tests/e2e/accessibility.spec.ts:31:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:31:43 | text | 나사못 한 칸 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:32:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:32:43 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:33:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:33:43 | text | 다음 활동: 규칙 수리하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:36:57 | text | { await page.getByRole('button', { name: /다섯째 칸/ }).click(); await page.getByRole('button', { name: '깃발 모양', exact: true }).click(); await page.getByRole('button', { name: '고치기' }).click(); await page.getByRole('button', { name: '다음 활동: 새 모양으로 바꾸기' }).click(); } async function completeTranslate(page: Page): Promise | button-or-action | long-or-dense |
| tests/e2e/accessibility.spec.ts:37:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:38:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:38:43 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:39:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:39:43 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:40:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:40:43 | text | 다음 활동: 새 모양으로 바꾸기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:43:60 | text | { const pairs = [ ['전등', '바퀴'], ['깃발', '창문'], ['별', '기차'], ] as const; for (const [source, target] of pairs) { await page.getByRole('button', { name: source, exact: true }).click(); await page.getByRole('button', { name: target, exact: true }).click(); } await page.getByRole('button', { name: '같은 규칙 확인' }).click(); await page.getByRole('button', { name: '다음 활동: 내 규칙 만들기' }).click(); } async function completeCreate(page: Page): Promise | button-or-action | long-or-dense, multiple-actions |
| tests/e2e/accessibility.spec.ts:45:7 | text | 전등 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:45:13 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:46:7 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:46:13 | text | 창문 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:47:7 | text | 별 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:47:12 | text | 기차 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:50:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:51:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:53:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:53:43 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:54:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:54:43 | text | 다음 활동: 내 규칙 만들기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:57:57 | text | { await page.getByRole('button', { name: '톱니바퀴 모양', exact: true }).click(); await page.getByRole('button', { name: '나사못 모양', exact: true }).click(); await page.getByRole('button', { name: '묶음 정하기' }).click(); await page.getByRole('button', { name: '한 묶음 붙이기' }).click(); await page.getByRole('button', { name: '한 묶음 붙이기' }).click(); await page.getByRole('button', { name: '운행하기' }).click(); await page.getByRole('button', { name: '활동 도장 보기' }).click(); } async function assertOneOrFewerPrimaryActions(page: Page): Promise | button-or-action | long-or-dense |
| tests/e2e/accessibility.spec.ts:58:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:58:43 | text | 톱니바퀴 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:59:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:59:43 | text | 나사못 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:60:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:60:43 | text | 묶음 정하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:61:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:61:43 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:62:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:62:43 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:63:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:63:43 | text | 운행하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:64:25 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:64:43 | text | 활동 도장 보기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:72:24 | text | button:visible, a:visible, input:visible, select:visible, textarea:visible, [role="switch"]:visible | button-or-action, input | long-or-dense |
| tests/e2e/accessibility.spec.ts:92:50 | text | { const nodes = [...document.querySelectorAll | button-or-action, input | — |
| tests/e2e/accessibility.spec.ts:93:63 | text | button, input, select, textarea | button-or-action, input | — |
| tests/e2e/accessibility.spec.ts:113:16 | text | 모바일·확대·모션 접근성 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:114:9 | text | 320px·390px에서 보이는 조작 대상 겹침이 없고 가로 스크롤이 없다 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:118:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:118:47 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:128:9 | text | 320px에서 가로 스크롤과 작은 조작 대상이 없다 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:132:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:132:45 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:134:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:134:45 | text | 설정 닫기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:135:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:135:45 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:137:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:137:45 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:138:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:138:45 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:140:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:141:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:141:45 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:142:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:142:45 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:144:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:144:45 | text | 나사못 한 칸 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:145:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:145:45 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:146:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:146:45 | text | 다음 활동: 규칙 수리하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:148:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:149:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:149:45 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:150:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:150:45 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:151:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:151:45 | text | 다음 활동: 새 모양으로 바꾸기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:155:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:155:45 | text | 톱니바퀴 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:156:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:156:45 | text | 나사못 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:158:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:158:45 | text | 묶음 정하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:160:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:160:45 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:161:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:161:45 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:162:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:162:45 | text | 운행하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:163:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:163:45 | text | 활동 도장 보기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:167:9 | text | 640px viewport의 2배 페이지 배율에서도 핵심 요소가 겹치거나 잘리지 않는다 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:170:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:173:32 | text | .find-screen > ol[aria-label="규칙 배열"] | learner-text-candidate | technical-or-internal |
| tests/e2e/accessibility.spec.ts:173:62 | aria-label | 규칙 배열 | aria-label | repeated-text |
| tests/e2e/accessibility.spec.ts:174:32 | text | button[data-primary-action="true"] | button-or-action | — |
| tests/e2e/accessibility.spec.ts:196:32 | text | ol[aria-label="규칙 배열"] | learner-text-candidate | technical-or-internal |
| tests/e2e/accessibility.spec.ts:196:47 | aria-label | 규칙 배열 | aria-label | repeated-text |
| tests/e2e/accessibility.spec.ts:209:10 | text | h2, .find-screen > ol[aria-label="규칙 배열"], button[data-primary-action="true"] | button-or-action | long-or-dense, technical-or-internal |
| tests/e2e/accessibility.spec.ts:209:44 | aria-label | 규칙 배열 | aria-label, button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:279:9 | text | 모션 감소에서는 pulse·열차 애니메이션을 끄고 활성 칸은 정적 4px 테두리다 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:282:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:283:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:283:45 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:284:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:284:45 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:285:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:285:45 | text | 나사못 한 칸 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:286:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:286:45 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:287:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:287:45 | text | 다음 활동: 규칙 수리하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:288:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:289:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:289:45 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:290:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:290:45 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:291:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:291:45 | text | 다음 활동: 새 모양으로 바꾸기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:292:39 | text | 전등 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:292:45 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:292:53 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:292:59 | text | 창문 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:292:67 | text | 별 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:292:72 | text | 기차 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:293:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:294:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:296:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:296:45 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:297:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:297:45 | text | 다음 활동: 내 규칙 만들기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:298:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:298:45 | text | 톱니바퀴 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:299:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:299:45 | text | 나사못 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:300:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:300:45 | text | 묶음 정하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:301:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:301:45 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:302:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:302:45 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:303:39 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:303:57 | text | 운행하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:305:98 | text | none | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:326:16 | text | 단계별 주 행동·키보드·Axe | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:327:9 | text | 선택 후보는 포커스가 이동해도 선택 표시를 유지한다 | learner-text-candidate | multiple-actions |
| tests/e2e/accessibility.spec.ts:329:38 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:332:43 | text | 선택됨 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:333:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:333:45 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:338:9 | text | 각 stage의 활성 주 행동은 최대 하나다 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:341:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:343:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:343:45 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:344:27 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:344:45 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:356:9 | text | Tab으로 이동하고 Enter·Space로 Journey 0 전체를 완료한다 | learner-text-candidate | — |
| tests/e2e/accessibility.spec.ts:358:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:358:63 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:358:75 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:360:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:360:75 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:361:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:361:63 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:361:77 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:362:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:362:63 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:362:83 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:364:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:364:63 | text | 나사못 한 칸 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:364:77 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:365:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:365:63 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:365:76 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:366:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:366:63 | text | 다음 활동: 규칙 수리하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:366:84 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:368:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:368:75 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:369:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:369:63 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:369:88 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:370:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:370:63 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:370:73 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:371:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:371:63 | text | 다음 활동: 새 모양으로 바꾸기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:371:87 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:373:39 | text | 전등 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:373:45 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:373:53 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:373:59 | text | 창문 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:373:67 | text | 별 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:373:72 | text | 기차 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:374:47 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:374:89 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:375:47 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:375:89 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:377:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:377:63 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:377:78 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:378:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:378:63 | text | 다음 활동: 내 규칙 만들기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:378:85 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:380:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:380:63 | text | 톱니바퀴 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:380:90 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:381:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:381:63 | text | 나사못 모양 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:381:89 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:382:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:382:63 | text | 묶음 정하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:382:76 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:383:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:383:63 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:383:78 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:384:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:384:63 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:384:78 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:385:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:385:63 | text | 운행하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:385:74 | text | Space | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:386:45 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:386:63 | text | 활동 도장 보기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:386:78 | text | Enter | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:387:34 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:387:53 | text | 활동 도장 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:390:9 | text | Find·Continue·Repair·Translate·Create·Summary의 Axe 위반이 0개다 | learner-text-candidate | long-or-dense |
| tests/e2e/learner-flow.spec.ts:3:81 | text | { await page.getByRole('button', { name: candidate }).click(); await page.getByRole('button', { name: '한 묶음 찾기' }).click(); } async function completeJourneyZeroByVisibleLabels(page: Page): Promise | button-or-action | long-or-dense, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:4:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:5:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:5:43 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:11:32 | text | 이 묶음으로는 끝까지 되풀이되지 않아요. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:12:25 | text | button | button-or-action, hint | repeated-text |
| tests/e2e/learner-flow.spec.ts:12:43 | text | 테두리 도움 보기 | button-or-action, hint | repeated-text |
| tests/e2e/learner-flow.spec.ts:14:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:14:43 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:17:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:17:43 | text | 톱니바퀴 한 칸 | button-or-action | — |
| tests/e2e/learner-flow.spec.ts:18:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:18:43 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:19:32 | text | 한 묶음의 순서를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:20:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:20:43 | text | 나사못 한 칸 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:21:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:21:43 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:22:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:22:43 | text | 다음 활동: 규칙 수리하기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:25:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:26:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:26:43 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:27:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:27:43 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:28:32 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:29:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:30:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:30:43 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:31:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:31:43 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:32:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:32:43 | text | 다음 활동: 새 모양으로 바꾸기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:36:7 | text | 전등 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:36:13 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:37:7 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:37:13 | text | 창문 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:38:7 | text | 별 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:38:12 | text | 기차 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:41:27 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:42:27 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:44:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:44:43 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:45:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:45:43 | text | 다음 활동: 내 규칙 만들기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:48:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:48:43 | text | 톱니바퀴 모양 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:49:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:49:43 | text | 나사못 모양 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:50:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:50:43 | text | 묶음 정하기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:51:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:51:43 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:52:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:52:43 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:53:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:53:43 | text | 운행하기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:54:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:54:43 | text | 활동 도장 보기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:61:7 | text | Journey 0을 드래그 없이 끝내고 다섯 활동 도장을 받는다 | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:63:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:63:43 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:65:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:65:51 | text | 활동 도장 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:66:50 | text | 완료한 학습 행동 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:69:32 | text | 반복되는 한 묶음을 찾으면 다음 칸을 예측할 수 있어요. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:70:32 | text | 다음에는 다른 모양의 규칙도 찾아봐요. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:73:7 | text | 활동 도장에서 다음 Journey를 순환한다 | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:75:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:75:43 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:77:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:77:43 | text | 다음 운행 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:78:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:78:51 | text | 한 묶음 찾기 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:79:32 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:82:7 | text | Journey 4 다음 운행은 Journey 0으로 돌아온다 | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:102:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:102:51 | text | 활동 도장 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:103:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:103:43 | text | 다음 운행 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:104:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:104:51 | text | 한 묶음 찾기 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:105:32 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:75:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:75:43 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:77:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:78:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:78:43 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:79:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:79:43 | text | 다음 활동: 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:80:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:80:43 | text | 나사못 한 칸 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:81:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:81:43 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:82:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:82:43 | text | 다음 활동: 규칙 수리하기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:84:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:85:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:85:43 | text | 깃발 모양 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:86:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:86:43 | text | 고치기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:87:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:87:43 | text | 다음 활동: 새 모양으로 바꾸기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:89:37 | text | 전등 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:89:43 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:89:51 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:89:57 | text | 창문 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:89:65 | text | 별 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:89:70 | text | 기차 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:90:27 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:91:27 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:93:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:93:43 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:94:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:94:43 | text | 다음 활동: 내 규칙 만들기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:96:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:96:43 | text | 톱니바퀴 모양 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:97:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:97:43 | text | 나사못 모양 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:98:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:98:43 | text | 묶음 정하기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:99:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:99:43 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:100:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:100:43 | text | 한 묶음 붙이기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:101:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:101:43 | text | 운행하기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:102:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:102:43 | text | 활동 도장 보기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:109:7 | text | 앱 요청은 앱 origin과 로컬 한국어 음원 경로만 사용한다 | learner-text-candidate | — |
| tests/e2e/privacy.spec.ts:116:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:116:43 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:117:43 | text | 안내 음성 | instruction | repeated-text |
| tests/e2e/privacy.spec.ts:118:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:118:43 | text | 설정 닫기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:127:25 | text | button | button-or-action, instruction | repeated-text |
| tests/e2e/privacy.spec.ts:127:43 | text | 안내 듣기 | button-or-action, instruction | repeated-text |
| tests/e2e/privacy.spec.ts:152:7 | text | 기본 저장은 꺼져 있고 동의하면 최소 PersistedProgressV1만 저장한다 | learner-text-candidate | — |
| tests/e2e/privacy.spec.ts:154:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:154:43 | text | 운행 시작 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:158:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:158:43 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:159:43 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:175:7 | text | 이어 하기를 끌 때 확인 후 저장된 진행을 지운다 | learner-text-candidate | multiple-conditions |
| tests/e2e/privacy.spec.ts:177:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:177:43 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:178:63 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:183:63 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:187:33 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:187:51 | text | 계속 사용 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:189:85 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/privacy.spec.ts:190:12 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:194:33 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:194:51 | text | 이어 하기 끄기 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:196:85 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/privacy.spec.ts:197:12 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:200:7 | text | Escape로 이어 하기 끄기 확인을 닫으면 배경과 스위치 초점을 복구한다 | learner-text-candidate | — |
| tests/e2e/privacy.spec.ts:202:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:202:43 | text | 접근성 설정 | button-or-action | repeated-text |
| tests/e2e/privacy.spec.ts:203:63 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:210:63 | text | 이어 하기 끄기 확인 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:216:85 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/privacy.spec.ts:217:12 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/e2e/privacy.spec.ts:222:7 | text | 색을 회색조로 바꾸어도 visible label만으로 Journey 0을 완료한다 | learner-text-candidate | — |
| tests/e2e/privacy.spec.ts:224:32 | text | heading | heading | repeated-text |
| tests/e2e/privacy.spec.ts:224:51 | text | 활동 도장 | heading | repeated-text |
| tests/e2e/privacy.spec.ts:225:48 | text | 완료한 학습 행동 | learner-text-candidate | repeated-text |
| tests/unit/audioGuide.test.ts:26:43 | text | blocked | feedback-or-error | repeated-text |
| tests/unit/audioGuide.test.ts:30:11 | text | 로컬 음성 안내 서비스 | instruction | — |
| tests/unit/audioGuide.test.ts:31:7 | text | 사용자 요청이 있을 때만 같은 출처 음원을 재생한다 | learner-text-candidate | — |
| tests/unit/audioGuide.test.ts:42:7 | text | 재생 실패가 학습 흐름을 막지 않는다 | feedback-or-error | — |
| tests/unit/audioGuide.test.ts:49:7 | text | 재생 중인 안내를 처음으로 되감고 멈출 수 있다 | instruction | — |
| tests/unit/audioGuide.test.ts:59:7 | text | 하나의 HTMLAudioElement를 늦게 만들고 cue를 바꿔 재사용한다 | learner-text-candidate | — |
| tests/unit/audioGuide.test.ts:72:7 | text | manifest 경계에서 잘못된 cue를 즉시 거부한다 | learner-text-candidate | — |
| tests/unit/audioGuide.test.ts:76:7 | text | 7개 안내는 모두 로컬 MP3와 COPY transcript 키를 가진다 | instruction | technical-or-internal |
| tests/unit/audioGuide.test.ts:86:7 | text | manifest와 파일 항목은 깊게 얼어 있고 cue와 경로가 중복되지 않는다 | learner-text-candidate | — |
| tests/unit/audioGuide.test.ts:94:7 | text | 정상 base만 보존하고 protocol-relative·외부 scheme은 로컬 기본 경로로 격리한다 | learner-text-candidate | long-or-dense |
| tests/unit/continuation.test.ts:8:11 | text | 반복 단위 이어 붙이기 | learner-text-candidate | — |
| tests/unit/continuation.test.ts:9:7 | text | 한 칸과 두 칸의 기대 항을 원래 인덱스로 계산한다 | learner-text-candidate | — |
| tests/unit/continuation.test.ts:18:7 | text | 보이는 항이 단위와 맞지 않으면 이어 붙이기를 승인하지 않는다 | learner-text-candidate | — |
| tests/unit/continuation.test.ts:25:7 | text | 빈칸의 기대 항을 올바른 순서로 제출하면 정답이다 | feedback-or-error | abstract-or-formal |
| tests/unit/continuation.test.ts:35:7 | text | 빈칸의 기대 항과 다른 답은 오답이다 | feedback-or-error | — |
| tests/unit/copy.test.ts:11:11 | text | 학습 문구 | learner-text-candidate | — |
| tests/unit/copy.test.ts:12:7 | text | 핵심 안내 문구를 정확히 제공한다 | instruction | — |
| tests/unit/copy.test.ts:14:18 | text | 규칙 단위 기관실 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:15:20 | text | 칸 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:16:21 | text | 모양 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:17:29 | text | 원래 항 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:18:24 | text | 빈칸 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:19:27 | text | 규칙 배열 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:20:21 | text | 운행 시작 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:21:24 | text | 접근성 설정 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:22:20 | text | 기관실 문을 열어 볼까요? | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:23:26 | text | 모양의 반복 규칙을 찾아 다섯 가지 미션을 해 봐요. | instruction | repeated-text |
| tests/unit/copy.test.ts:24:19 | text | 한 묶음 찾기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:25:23 | text | 다음 칸 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:26:20 | text | 한 묶음 찾기 | button-or-action | repeated-text |
| tests/unit/copy.test.ts:27:24 | text | 이어 붙이기 | button-or-action | repeated-text |
| tests/unit/copy.test.ts:28:21 | text | 규칙 수리하기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:29:28 | text | 새 모양 선택 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:30:22 | text | 고치기 | button-or-action | repeated-text |
| tests/unit/copy.test.ts:31:23 | text | 규칙을 깨뜨린 칸을 고쳤어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:32:28 | text | 규칙을 깨뜨린 칸을 다시 찾아봐요. | feedback-or-error | repeated-text |
| tests/unit/copy.test.ts:33:31 | text | 선택한 칸에 들어갈 모양을 다시 골라요. | feedback-or-error | repeated-text |
| tests/unit/copy.test.ts:34:24 | text | 새 모양으로 바꾸기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:35:32 | text | 바꿀 원래 항 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:36:32 | text | 새 모양 선택 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:37:25 | text | 같은 규칙 확인 | button-or-action | repeated-text |
| tests/unit/copy.test.ts:38:26 | text | 모양은 달라도 같은 순서예요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:39:34 | text | 서로 다른 항에는 서로 다른 새 모양을 골라요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:40:27 | text | 새 모양의 순서를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:41:23 | text | 현재 단계 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:42:19 | text | 다음 칸 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:43:27 | text | 다음 활동: 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:44:25 | text | 다음 활동: 규칙 수리하기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:45:28 | text | 다음 활동: 새 모양으로 바꾸기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:46:25 | text | 다음 활동: 내 규칙 만들기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:47:24 | text | 테두리 도움 보기 | hint | repeated-text |
| tests/unit/copy.test.ts:48:26 | text | 후보 묶음 선택 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:49:30 | text | 다음 칸 선택 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:50:25 | text | 후보 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:51:22 | text | 한 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:52:22 | text | 두 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:53:24 | text | 세 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:54:25 | text | 칸 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:55:25 | text | 가장 짧게 되풀이되는 한 묶음을 골라요. | instruction | repeated-text |
| tests/unit/copy.test.ts:56:29 | text | 한 묶음을 보고 다음 칸을 이어 보세요. | instruction | repeated-text |
| tests/unit/copy.test.ts:57:27 | text | 규칙을 깨뜨린 칸을 찾아 고쳐요. | instruction | repeated-text |
| tests/unit/copy.test.ts:58:30 | text | 같은 순서를 새 모양으로 바꾸어 보세요. | instruction | repeated-text |
| tests/unit/copy.test.ts:59:27 | text | 2~3개로 내 한 묶음을 만들어요. | instruction | repeated-text |
| tests/unit/copy.test.ts:60:26 | text | 되풀이되지만 더 짧은 한 묶음이 있어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:61:28 | text | 이 묶음으로는 끝까지 되풀이되지 않아요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:62:21 | text | 가장 짧은 한 묶음을 찾았어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:63:25 | text | 한 묶음으로 다음 칸을 이었어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:64:32 | text | 한 묶음의 순서를 다시 살펴봐요. | feedback-or-error | repeated-text |
| tests/unit/copy.test.ts:65:25 | text | 테두리로 나눈 묶음을 차례로 살펴보세요. | hint | repeated-text |
| tests/unit/copy.test.ts:66:27 | text | 같은 묶음을 한 번 더 붙여 보세요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:67:22 | text | 테두리 도움을 사용해 규칙을 찾았어요. | hint | repeated-text |
| tests/unit/copy.test.ts:68:18 | text | 찾고, 잇고, 고치고, 바꾸고, 만들었어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:69:21 | text | 내 규칙 운행 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:70:25 | text | 한 묶음 만들기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:71:26 | text | 반복 선로 만들기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:72:28 | text | 묶음에 넣을 모양 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:73:25 | text | 마지막 모양 지우기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:74:22 | text | 묶음 정하기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:75:24 | text | 한 묶음 붙이기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:76:24 | text | 선로는 12칸까지 만들 수 있어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:77:26 | text | 다시 만들기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:78:24 | text | 운행하기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:79:23 | text | 내 규칙이 두 번 되풀이돼요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:80:27 | text | 두 가지 모양을 섞어 한 묶음을 만들어 보세요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:81:25 | text | 한 묶음은 2~3칸으로 만들어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:82:28 | text | 내 한 묶음 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:83:29 | text | 내 반복 선로 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:84:22 | text | 활동 도장 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:85:25 | text | 반복되는 한 묶음을 찾으면 다음 칸을 예측할 수 있어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:86:27 | text | 다음에는 다른 모양의 규칙도 찾아봐요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:88:26 | text | 완료한 학습 행동 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:89:21 | text | 다음 운행 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:90:20 | text | 처음으로 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:91:25 | text | 테두리 도움을 사용했어요. | hint | repeated-text |
| tests/unit/copy.test.ts:92:22 | text | 가장 짧은 한 묶음 찾기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:93:26 | text | 다음 항 이어 붙이기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:94:24 | text | 규칙을 깨뜨린 칸 고치기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:95:27 | text | 다른 모습으로 같은 순서 만들기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:96:24 | text | 내 반복 규칙 만들기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:97:21 | text | 안내 듣기 | instruction | repeated-text |
| tests/unit/copy.test.ts:98:19 | text | 안내 멈추기 | instruction | repeated-text |
| tests/unit/copy.test.ts:99:26 | text | 음성이 없어도 글을 보며 계속할 수 있어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:100:25 | text | AI 합성 음성으로 만든 안내예요. | instruction | repeated-text, technical-or-internal |
| tests/unit/copy.test.ts:101:23 | text | 접근성 설정 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:102:23 | text | 설정 닫기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:103:22 | text | 안내 음성 | instruction | repeated-text |
| tests/unit/copy.test.ts:104:23 | text | 모션 줄이기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:105:32 | text | 무늬 대비 높이기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:106:28 | text | 이 기기에서 이어 하기 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:107:28 | text | 운행 위치와 접근성 설정만 이 기기에 저장해요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:108:31 | text | 끄면 확인 후 이 앱의 저장 내용을 지워요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:109:28 | text | 기기에서 모션 줄이기를 켜면 함께 줄어들어요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:110:29 | text | 모션을 줄여서 보여 줘요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:111:29 | text | 기본 모션으로 보여 줘요. | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:115:7 | text | Task 9 learner-facing suffix formatter를 제공한다 | learner-text-candidate | — |
| tests/unit/copy.test.ts:116:30 | text | 동그라미 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:116:44 | text | 동그라미 모양 | learner-text-candidate | — |
| tests/unit/copy.test.ts:117:33 | text | 톱니바퀴 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:117:47 | text | 톱니바퀴 원래 항 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:120:7 | text | 선택지 이름 formatter가 토큰 이름과 칸 수를 조합한다 | learner-text-candidate | — |
| tests/unit/copy.test.ts:121:31 | text | 나사못 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:121:45 | text | 나사못 한 칸 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:122:31 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:122:37 | text | 깃발 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:122:50 | text | 깃발, 깃발 두 칸 | learner-text-candidate | — |
| tests/unit/copy.test.ts:123:37 | text | 톱니바퀴 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:123:45 | text | 나사못 | learner-text-candidate | repeated-text |
| tests/unit/copy.test.ts:124:8 | text | 후보 3: 톱니바퀴, 나사못 두 칸 | learner-text-candidate | — |
| tests/unit/copy.test.ts:128:7 | text | 안내 문구는 짧고 경쟁을 부추기지 않는다 | instruction | — |
| tests/unit/freePattern.test.ts:5:11 | text | 자유 규칙 판정 | learner-text-candidate | — |
| tests/unit/freePattern.test.ts:6:7 | text | 자유 선로의 공유 최대 길이를 내보낸다 | learner-text-candidate | — |
| tests/unit/freePattern.test.ts:16:16 | text | 자유 선로의 반복 조건을 판정한다 | learner-text-candidate | — |
| tests/unit/freePattern.test.ts:20:7 | text | 길이 3의 서로 다른 기호 선로는 두 번째 반복을 기다린다 | learner-text-candidate | — |
| tests/unit/freePattern.test.ts:28:7 | text | 반복 단위 길이 1은 두 기호 단위가 필요하다고 알린다 | learner-text-candidate | — |
| tests/unit/freePattern.test.ts:37:7 | text | 반복 단위 길이 4는 허용 범위를 벗어났다고 알린다 | learner-text-candidate | — |
| tests/unit/freePattern.test.ts:46:7 | text | 판정 중 입력 선로를 바꾸지 않는다 | input | abstract-or-formal |
| tests/unit/missionCatalog.test.ts:51:11 | text | 미션 카탈로그 | learner-text-candidate | — |
| tests/unit/missionCatalog.test.ts:52:7 | text | 미션 종류별 5개와 구조별 5개를 제공한다 | learner-text-candidate | — |
| tests/unit/missionCatalog.test.ts:68:7 | text | 모든 후보는 4개 이하이고 도메인 판정으로 정답이 하나다 | feedback-or-error | — |
| tests/unit/missionCatalog.test.ts:75:7 | text | 미션 ID와 Journey 연결은 중복·누락 없이 정확하다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/unit/missionCatalog.test.ts:88:7 | text | Journey와 미션 조회는 알 수 없는 런타임 값에서 빠르게 실패한다 | feedback-or-error | — |
| tests/unit/missionCatalog.test.ts:92:30 | text | unknown-mission | feedback-or-error | — |
| tests/unit/missionCatalog.test.ts:95:7 | text | 카탈로그 데이터는 런타임에서도 변경되지 않는다 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:80:11 | text | 동의 기반 로컬 진행 저장소 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:81:7 | text | 동의를 켜기 전에는 아무것도 저장하지 않는다 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:87:7 | text | 동의를 켜면 허용된 정확한 키만 새로 저장한다 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:102:7 | text | summary는 다음 운행의 start로 저장한다 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:123:7 | text | 유효한 저장 상태를 읽고 배열을 복제한다 | learner-text-candidate | abstract-or-formal |
| tests/unit/progressStore.test.ts:131:7 | text | 공유 상한까지의 자유 선로를 새로고침 후 복원한다 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:147:7 | text | hydration은 현재 journey의 evidence ID를 복원하고 transient 값을 비운다 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| tests/unit/progressStore.test.ts:169:7 | text | 유효한 summary hydration은 다음 journey의 start로 정규화한다 | learner-text-candidate | abstract-or-formal |
| tests/unit/progressStore.test.ts:179:7 | text | create-track에서 다섯 행동을 마친 저장값은 현재 journey summary로 복원한다 | learner-text-candidate | long-or-dense |
| tests/unit/progressStore.test.ts:198:7 | text | 실제 create-track 성공 state를 저장하고 reload하면 다섯 증거 summary가 된다 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| tests/unit/progressStore.test.ts:209:43 | text | expected valid progress | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/unit/progressStore.test.ts:217:7 | text | 실제 성공 전 create-track state를 저장하면 네 증거만 유지한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/unit/progressStore.test.ts:226:43 | text | expected valid progress | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/unit/progressStore.test.ts:253:7 | text | 손상된 %s는 해당 키만 지우고 null을 반환한다 | learner-text-candidate | ambiguous-reference, missing-term-explanation, technical-or-internal |
| tests/unit/progressStore.test.ts:262:7 | text | 4096자를 넘는 값과 JSON·Storage 예외를 삼킨다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/unit/progressStore.test.ts:268:47 | text | blocked | feedback-or-error | repeated-text |
| tests/unit/progressStore.test.ts:269:50 | text | blocked | feedback-or-error | repeated-text |
| tests/unit/progressStore.test.ts:270:47 | text | blocked | feedback-or-error | repeated-text |
| tests/unit/progressStore.test.ts:277:7 | text | 이어 하기를 끄면 기존 항목을 즉시 지운다 | learner-text-candidate | — |
| tests/unit/progressStore.test.ts:284:7 | text | 저장소 삭제가 실패하면 clear와 disablePersistence가 실패를 보고한다 | feedback-or-error | — |
| tests/unit/progressStore.test.ts:289:50 | text | blocked | feedback-or-error | repeated-text |
| tests/unit/progressStore.test.ts:298:7 | text | journey 범위는 현재 고정된 다섯 칸과 일치한다 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:14:11 | text | README 문서 계약 | learner-text-candidate | technical-or-internal |
| tests/unit/readmeContract.test.ts:15:7 | text | README는 현재 자동 검증 범위와 공개 경로를 기록한다 | learner-text-candidate | abstract-or-formal |
| tests/unit/readmeContract.test.ts:16:31 | text | VoiceOver 검증은 이 개선 범위에 포함하지 않습니다 | learner-text-candidate | abstract-or-formal, repeated-text |
| tests/unit/readmeContract.test.ts:21:7 | text | index.html은 base 경로 favicon을 동일 출처 SVG로 참조한다 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:30:7 | text | 필수 섹션과 경계를 모두 설명한다 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:32:31 | text | 가장 짧은 반복 단위 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:34:31 | text | 찾기→이어 붙이기→수리→번역→자유 제작→활동 도장 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:39:31 | text | 기존 단순 다음 항 맞히기 앱 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:40:31 | text | 미션 20개 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:42:31 | text | 4개 구조 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:45:31 | text | 부분 빈칸 인덱스 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:46:31 | text | 일대일 번역+순서 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:47:31 | text | 2~3칸 단위 최소 2회 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:48:31 | text | 최소 단위 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:51:31 | text | 서버/계정 없음 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:52:31 | text | 기본으로 저장하지 않습니다 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:54:31 | text | 학생 음성을 녹음하지 않습니다 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:55:31 | text | 로컬 MP3 선택 재생 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:82:8 | text | 색상 독립 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:83:8 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/unit/readmeContract.test.ts:84:8 | text | 자동 PASS | learner-text-candidate | technical-or-internal |
| tests/unit/readmeContract.test.ts:85:8 | text | VoiceOver 검증은 이 개선 범위에 포함하지 않습니다 | learner-text-candidate | abstract-or-formal, repeated-text |
| tests/unit/readmeContract.test.ts:89:31 | text | 사람의 청취 검수 대기 | learner-text-candidate | repeated-text |
| tests/unit/readmeContract.test.ts:94:47 | text | ## 로컬 안내 음성 사람 청취 검수 | instruction | — |
| tests/unit/readmeContract.test.ts:95:47 | text | 사람의 청취 검수 대기 | learner-text-candidate | repeated-text |
| tests/unit/readmeContract.test.ts:96:31 | text | 발음 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:96:37 | text | 속도 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:96:43 | text | 명료도 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:96:50 | text | 아동 적합성 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:96:60 | text | 볼륨 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:100:51 | text | ## Safari + VoiceOver 수동 검증 | learner-text-candidate | abstract-or-formal |
| tests/unit/readmeContract.test.ts:101:51 | text | VoiceOver 포커스 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:102:47 | text | 실제 Create 선로 | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:103:47 | text | 운행하기 | learner-text-candidate | repeated-text |
| tests/unit/readmeContract.test.ts:105:47 | text | computed animation과 transform이 `none` | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:106:47 | text | .pattern-cell--active` outline이 4px | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:108:51 | text | 주입한 `.train-track--moving` | learner-text-candidate | — |
| tests/unit/readmeContract.test.ts:112:31 | text | GitHub Pages 공개 주소 | learner-text-candidate | — |
| tests/unit/repair.test.ts:8:11 | text | 한 셀 수리 판정 | learner-text-candidate | — |
| tests/unit/repair.test.ts:9:7 | text | 규칙을 깨뜨린 0-based 인덱스를 한 개 찾는다 | learner-text-candidate | — |
| tests/unit/repair.test.ts:15:7 | text | 다섯 수리 배열에서 오류 위치와 기대 교체 항을 찾는다 | feedback-or-error | — |
| tests/unit/repair.test.ts:34:7 | text | 맞는 위치에 맞는 항을 넣을 때만 승인한다 | learner-text-candidate | — |
| tests/unit/repair.test.ts:53:7 | text | 오류가 없거나 두 개 이상이면 수리를 승인하지 않는다 | feedback-or-error | — |
| tests/unit/repetition.test.ts:9:11 | text | 반복 단위 | learner-text-candidate | — |
| tests/unit/repetition.test.ts:15:7 | text | 가장 짧은 반복 단위를 반환한다 | learner-text-candidate | — |
| tests/unit/repetition.test.ts:24:7 | text | 끝까지 반복되지 않는 수열은 null을 반환한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/unit/repetition.test.ts:28:7 | text | 단위를 지정한 횟수만큼 이어 붙인다 | learner-text-candidate | — |
| tests/unit/repetition.test.ts:34:6 | text | 양의 유한 정수가 아닌 반복 횟수(%s)는 빈 배열을 반환한다 | learner-text-candidate | — |
| tests/unit/repetition.test.ts:40:7 | text | 더 긴 반복 후보를 정답으로 인정하지 않는다 | feedback-or-error | — |
| tests/unit/repetition.test.ts:50:7 | text | 후보를 반복해 전체 수열을 재구성하지 못하면 반복되지 않음으로 판정한다 | learner-text-candidate | abstract-or-formal |
| tests/unit/repetition.test.ts:63:7 | text | 최소 반복 단위 선택은 정답이다 | feedback-or-error | — |
| tests/unit/sessionReducer.test.ts:47:53 | text | retry | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:47:70 | text | does-not-repeat | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:49:53 | text | success | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:49:72 | text | matches | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:101:53 | text | success | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:101:72 | text | matches | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:115:24 | text | find | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:115:48 | text | test fixture | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:118:42 | text | does-not-repeat | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:122:32 | text | continue | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:122:60 | text | test fixture | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:125:42 | text | wrong-continuation | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:133:42 | text | wrong-position | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:137:42 | text | wrong-position | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:140:42 | text | wrong-replacement | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:142:26 | text | repair | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:142:52 | text | test fixture | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:148:31 | text | translate | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:148:60 | text | test fixture | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:156:42 | text | mapping-not-bijective | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:159:7 | text | shows a hint without recording an attempt and carries it into success | hint | long-or-dense |
| tests/unit/sessionReducer.test.ts:163:53 | text | retry | feedback-or-error, hint | repeated-text |
| tests/unit/sessionReducer.test.ts:178:42 | text | unit-length-out-of-range | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:188:42 | text | needs-second-repeat | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:191:42 | text | success | feedback-or-error | repeated-text |
| tests/unit/sessionReducer.test.ts:194:7 | text | 자유 선로는 화면과 저장소가 같은 최대 길이를 사용한다 | learner-text-candidate | — |
| tests/unit/sessionReducer.test.ts:241:28 | text | retry | feedback-or-error, hint | repeated-text |
| tests/unit/sessionReducer.test.ts:241:45 | text | needs-second-repeat | feedback-or-error, hint | repeated-text |
| tests/unit/sessionSelectors.test.ts:6:7 | text | 시작 상태에서는 모든 단계를 예정으로 표시한다 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:9:11 | text | 시각 토큰 테마 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:10:7 | text | 각 토큰은 고정된 표시 ID·아이콘 ID·이름·무늬·색 토큰을 가진다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/unit/tokenThemes.test.ts:17:18 | text | 점무늬 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:17:25 | text | 줄무늬 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:17:32 | text | 격자무늬 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:26:7 | text | A/B/C는 모든 테마에서 점·줄·교차 무늬로 분리된다 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:36:7 | text | 테마와 패턴 토큰으로 시각 정보를 조회한다 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:40:17 | text | 동그라미 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:41:24 | text | 점무늬 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:43:34 | text | unknown | feedback-or-error | — |
| tests/unit/tokenThemes.test.ts:43:54 | text | A | feedback-or-error | — |
| tests/unit/tokenThemes.test.ts:44:34 | text | shapes | feedback-or-error | repeated-text |
| tests/unit/tokenThemes.test.ts:44:44 | text | Z | feedback-or-error | — |
| tests/unit/tokenThemes.test.ts:47:7 | text | 이름이 지정된 테마 안에서만 display token을 역조회한다 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:50:53 | text | circle | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:50:72 | text | 동그라미 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:51:41 | text | engine | feedback-or-error | repeated-text |
| tests/unit/tokenThemes.test.ts:51:51 | text | circle | feedback-or-error | repeated-text |
| tests/unit/tokenThemes.test.ts:52:41 | text | shapes | feedback-or-error | repeated-text |
| tests/unit/tokenThemes.test.ts:52:51 | text | train | feedback-or-error | — |
| tests/unit/tokenThemes.test.ts:55:7 | text | 역조회 결과도 frozen 시각 객체를 그대로 유지한다 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:59:50 | text | 변경 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:61:35 | text | cars | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:61:43 | text | wheel | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:61:66 | text | 바퀴 | learner-text-candidate | repeated-text |
| tests/unit/tokenThemes.test.ts:64:7 | text | 테마·토큰 맵·각 시각 객체는 런타임에서 변경되지 않는다 | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:74:50 | text | changed | learner-text-candidate | — |
| tests/unit/tokenThemes.test.ts:78:34 | text | 톱니바퀴 | learner-text-candidate | repeated-text |
| tests/unit/translation.test.ts:5:11 | text | 외형 번역 판정 | learner-text-candidate | — |
| tests/unit/translation.test.ts:11:7 | text | 일대일 대응과 원래 순서를 함께 지키면 승인한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:21:7 | text | 서로 다른 원래 항을 같은 새 항에 대응시키면 거절한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:31:7 | text | 대응은 맞아도 순서가 바뀌면 거절한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:38:7 | text | 실제로 등장한 원래 항의 대응이 누락되면 거절한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:47:7 | text | 등장하지 않은 원래 항의 추가 대응이 있으면 거절한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:60:7 | text | 같은 원래 항에 대응을 두 번 주면 거절한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:73:7 | text | 빈 원래 수열은 빈 대응과 빈 번역일 때만 승인한다 | learner-text-candidate | — |
| tests/unit/translation.test.ts:85:7 | text | 판정 중 입력 배열과 대응 객체를 바꾸지 않는다 | input | abstract-or-formal |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
