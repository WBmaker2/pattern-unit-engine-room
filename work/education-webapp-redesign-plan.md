# Pattern Unit Engine Room Implementation Plan

## Goal

초등학교 1~2학년이 15~25분 안에 `찾기 → 이어 붙이기 → 수리하기 → 번역하기 → 만들기 → 돌아보기`의 흐름을 놓치지 않도록 기존 규칙 단위 기관실 앱의 정보 계층과 조작 피드백을 리디자인한다. 기존의 반복 단위 판정, 로컬 전용 진행 저장, 문자 중심 안내, 48px 조작 영역, 모양·무늬 중복 표기, 모션 감소 대응은 보존하고 화면 구조만 안전하게 개선한다.

구체적인 성공 상태는 다음과 같다.

- 첫 화면에서 앱의 질문, 다섯 활동의 순서, 현재 할 일을 한 번에 읽을 수 있다.
- 각 활동 화면에서 `현재 단계`, `이번에 할 행동`, `주요 조작`, `다음 행동`이 시각·구조적으로 같은 위치에 나타난다.
- 오답 피드백은 이유와 다시 할 행동을 한 묶음으로 제공하고, 성공 피드백은 다음 활동 버튼으로 바로 이어진다.
- 320px 폭, 200% 확대, 키보드만 사용한 전 과정, `prefers-reduced-motion`에서 학습 내용과 조작이 유지된다. VoiceOver 구현·검증은 범위에서 제외한다.
- 학생 이름·사진·음성·외부 서버를 수집하지 않고, 선택한 로컬 진행 저장의 실패가 학습 화면을 막지 않는다.
- 단일 소스 파일은 500줄 미만이며, `업데이트 내역` 버튼에 2026-08-30 최신 리디자인 변경 기록과 이전 날짜가 보인다.

## Architecture

현재 Vite + React + TypeScript 정적 SPA의 도메인 계층을 유지하고 표현 계층을 다음 세 층으로 정리한다.

1. `src/domain`과 `src/content`는 반복 판정, 미션 데이터, 문구, 음성 경로를 계속 순수 데이터·함수로 유지한다.
2. `src/features/session`은 `SessionState`와 `SessionAction`을 단일 진실 공급원으로 유지한다. 리디자인은 상태 전이를 바꾸지 않고 화면에 필요한 읽기 모델만 셀렉터로 노출한다.
3. `src/components`와 각 `src/features/*/*Screen.tsx`는 공통 `LearningJourney`, `StageHeader`, `ActionRail`, `FeedbackPanel` 계약을 사용한다. 화면별 컴포넌트는 미션 데이터와 콜백을 받아 표시·입력만 담당한다.

### Learner flow contract

`App.tsx`는 `selectJourneyProgress(state)`를 계산해 `AppShell`에 전달한다. 각 단계 화면은 `COPY`의 단계 문구를 `StageHeader`로 단계 번호와 한 문장 행동으로 표시하고, 기존 판정 콜백을 `ActionRail`에 연결한다. `AppShell`은 앱 제목 다음에 여정 지도, 본문 랜드마크, 업데이트 내역을 렌더링한다. `FeedbackPanel`은 기존 `status`/`message` 호환 계약과 `nextActionLabel`/`onNext`를 받아 `role="status"` 안에 `상태 → 이유 → 다음 행동` 순서로 표시한다.

### Safe redesign boundaries

- `sessionReducer`, `domain/pattern/*`, `content/missions/*`의 판정 규칙과 미션 ID는 변경하지 않는다.
- 설정 저장은 `ProgressStore`의 현재 fail-closed 동작과 동의 모델을 유지한다.
- 기존 오디오 파일과 인라인 SVG 출발 그림을 유지한다. 새 장식용 이미지가 학습 목표를 더 잘 설명하지 않는 한 이미지 자산을 추가하지 않는다.
- CSS는 light mode만 지원하며 시스템 dark mode로 전환하지 않는다.

## Tech Stack

- Vite 8 + React 19 + TypeScript 5.9
- Vitest 4 + Testing Library + `@testing-library/user-event`
- Playwright 1.62 + `@axe-core/playwright` (자동 접근성·학습자 흐름 확인)
- ESLint 10, 기존 `npm run check`와 `npm run check:size` 계약 유지
- 로컬 오디오 MP3와 인라인 SVG만 사용하며 런타임 외부 CDN·TTS·분석 SDK는 추가하지 않는다.

## Spec

### Learning goals and differentiation

- `[2수02-01]`: 배열에서 되풀이되는 가장 짧은 한 묶음을 찾고 여러 모습으로 나타낸다.
- `[2수02-02]`: 정한 단위에 따라 배열을 이어 만들고 자신의 반복 규칙을 만든다.
- 기존 분류·십 묶음 활동과 달리 AB·AAB·ABB·ABC의 순서 구조를 찾고, 겉모양이 달라져도 같은 순서를 번역한다.
- 속도·점수·순위·연속 성공을 표시하지 않고, 힌트 사용은 전략 증거로만 기록한다.

### Five learning activities

1. `find`: 후보 중 가장 짧게 반복되는 한 묶음을 선택한다.
2. `continue`: 반복 단위를 보고 다음 한두 칸을 선택한다.
3. `repair`: 규칙을 깨뜨린 위치와 바꿀 모양을 선택한다.
4. `translate`: 원래 항과 새 모양의 일대일 대응을 정하고 같은 순서를 만든다.
5. `create-unit`/`create-track`: 2~3개 토큰으로 단위를 만든 뒤 두 번 이상 반복해 운행한다.

### Redesign surface

- `LearningJourney`: 시작 화면과 활동 화면 상단에 다섯 단계를 순서대로 표시한다. 완료 단계는 텍스트 `완료`, 현재 단계는 `현재`, 미완료 단계는 `예정`으로도 구분한다.
- `StageHeader`: 단계 번호, 단계명, 동사형 행동 문장, 현재 진행(예: `2 / 5`)을 제공한다.
- `ActionRail`: 주요 버튼 하나를 먼저 배치하고, 성공 이후의 다음 버튼과 보조 조작을 구분한다. 중요한 `한 묶음 찾기`와 `운행하기`에만 `gi-pulse`를 적용한다.
- `FeedbackPanel`: `retry`에는 짧은 이유와 “다시 고를 곳” 안내, `success`에는 학습 증거와 다음 버튼 연결을 표시한다. 색상만으로 상태를 구분하지 않는다.
- `StartScreen`: 출발 그림, 핵심 질문, 다섯 단계 지도, `운행 시작`을 한 카드 계층으로 정리하고 데스크톱의 빈 공간을 줄인다.
- `SummaryScreen`: 다섯 학습 증거, 한 문장 takeaway, 다음 운행 또는 처음으로를 동일한 행동 영역에 배치한다.
- `UpdateHistoryButton`/`UpdateHistoryDialog`: 기존 위치와 포커스 복귀를 유지하고 리디자인 기록을 추가한다.

### Accessibility and safety

- 모든 버튼·선택 항목의 실제 터치 영역은 48px 이상이고, `:focus-visible` 테두리는 배경과 대비되는 3px 이상으로 유지한다.
- 패턴 항은 색·모양·무늬·텍스트 대체 라벨을 함께 제공한다. 선택·활성·오답은 텍스트와 테두리로도 구분한다.
- 키보드 탭 순서는 `StageHeader → 배열/선택지 → 피드백 → ActionRail → 업데이트 내역`이며, 모달이 열리면 본문은 inert이고 닫힌 뒤 트리거로 포커스를 돌린다.
- `prefers-reduced-motion: reduce`에서는 열차 이동을 끄고 현재 칸 테두리 전환과 정적 강조만 남긴다. 애니메이션을 학습 정보의 유일한 전달 수단으로 사용하지 않는다.
- 안내 음성은 선택 기능이며 같은 문장을 항상 화면에 표시한다. 녹음, 음성 인식, 학생 발화 업로드를 추가하지 않는다.
- 로컬 저장은 `PersistedProgressV1`만 사용하고 저장 실패 시 예외를 삼켜 학습 흐름을 계속한다. 서버·계정·광고·학생 식별자를 추가하지 않는다.

### MVP and completion criteria mapping

- 20개 AB·AAB·ABB·ABC 미션과 다섯 활동은 기존 카탈로그를 그대로 사용한다.
- 증가 규칙, 복잡한 수열, 공유, 업로드, 포인트 경쟁, 캐릭터 상점은 구현하지 않는다.
- 터치·키보드만으로 처음부터 활동 도장까지 완료되고, 자유 규칙이 두 번 미만 반복되면 원인과 수정 조작을 보여 준다.
- 자동 검증은 lint·Vitest·build·source-size·Playwright·axe로 수행한다. 수동 검증은 320px/375px/1280px 화면과 200% 확대, reduced motion, 키보드 순서를 기록한다. VoiceOver는 검증하지 않는다.

## Global Constraints

- 이 계획 이후 소스 수정은 반드시 실패 테스트 → 최소 구현 → 통과 테스트 순서로 진행한다.
- 코드·테스트·설정 파일은 이 계획 승인 후에만 수정한다. 계획·감사·디자인 시스템·자산 문서는 코드와 별도로 먼저 작성한다.
- 기존 작업 트리의 unrelated 변경을 되돌리거나 덮어쓰지 않는다. 구현 중 충돌이 생기면 해당 파일의 현재 변경을 보존하고 작업을 멈춘다.
- 모든 새 소스 파일과 수정 후 소스 파일은 500줄 미만이다. `src/styles/components.css`가 500줄에 접근하면 `src/styles/layout.css`, `src/styles/feedback.css`, `src/styles/settings.css`로 기능을 나눈다.
- 주요 교육 버튼에 `pulseKind`와 `data-primary-action`을 유지하고, 버튼 수를 늘려 모든 버튼이 깜박이지 않게 한다.
- 사용자에게 보이는 문장은 초등 1~2학년이 한 번에 읽을 수 있는 두 줄 이내를 기본으로 하며, 내부 mission ID·디버그 용어를 노출하지 않는다.
- 이미지 변경이 필요해질 때만 `references/asset-safety.md`를 읽은 뒤 imagegen으로 맥락에 맞는 장식·개념 자산을 만들고, 원본 보존·alt 결정·자산 목록을 문서화한다. 이번 계획은 기존 인라인 SVG가 목적에 맞으므로 새 이미지 삽입을 요구하지 않는다.
- 지원 스킬은 실제 런타임 목록과 지정 경로를 확인한 뒤 역할별로 사용한다. `$impeccable`은 감사·최종 점검, `$ui-ux-pro-max`는 디자인 시스템 검색, `$redesign-existing-projects`는 기존 React 구조 구현에 사용한다. `$imagegen`은 자산 필요성을 먼저 판단하고 새 이미지가 필요할 때만 호출한다.
- 커밋, 푸시, GitHub 저장소 생성, Pages 배포, HVC 등록·동기화는 이 요청 범위에 포함하지 않는다.

## 예상 파일 구조와 책임

```text
work/
  education-webapp-redesign-plan.md       # 이 실행 계획
  education-webapp-redesign-audit.md     # 초기 UX·접근성·안전 감사
  education-webapp-redesign-assets.md    # 이미지·오디오·아이콘 자산 검토
  education-webapp-redesign-report.md    # 구현·검증 결과와 남은 수동 확인
design-system/
  MASTER.md                               # 공통 토큰·컴포넌트 규칙
  pages/start.md                          # 출발역 화면 규칙
src/components/
  LearningJourney.tsx                     # 다섯 단계 지도와 상태 라벨
  StageHeader.tsx                         # 단계 제목·행동·진행 표시
  ActionRail.tsx                          # 주요·보조·다음 행동 영역
  FeedbackPanel.tsx                        # 판정 상태·이유·다음 행동
  AppShell.tsx                             # 전역 레이아웃·모달·여정 지도 연결
src/features/start/
  StartScreen.tsx                          # 첫 화면 계층·시작 행동
src/features/summary/
  SummaryScreen.tsx                        # 학습 증거·takeaway·다음 행동
src/features/session/
  selectors.ts                              # 여정 읽기 모델 셀렉터
src/content/
  copy.ts                                   # 단계 헤더·피드백 문구
  updateHistory.ts                          # 날짜별 변경 기록
src/styles/
  tokens.css                                # 의미 기반 색·간격·타이포 토큰
  base.css                                  # 전역 접근성·기본 요소
  components.css                            # 공통 컴포넌트 배치·반응형 규칙
  motion.css                                # gi-pulse·reduced-motion 규칙
tests/components/
  learningJourney.test.tsx                  # 단계 상태와 라벨
  stageHeader.test.tsx                      # 헤더 구조·진행 텍스트
  actionRail.test.tsx                       # 버튼 순서·pulse 계약
  feedbackPanel.test.tsx                    # retry/success 문장·라이브 영역
  instructionCard.test.tsx                  # 음성 비활성 빈 카드 방지
  startScreen.test.tsx                      # 출발역 계층·키보드
  summaryScreen.test.tsx                    # 증거·다음 행동
tests/unit/
  sessionSelectors.test.ts                  # 여정 읽기 모델
tests/e2e/
  learner-flow.spec.ts                      # 5단계 학습자 경로 회귀
  accessibility.spec.ts                     # axe·키보드·반응형 계약
```

기존 `PatternBoard`, `ChoiceGrid`, `PrimaryAction`, `InstructionCard`, `UpdateHistory*`, 각 미션 화면은 새 공통 계약을 사용하도록 수정하며 도메인 파일은 수정하지 않는다.

## 작업별 Files · Interfaces · TDD 단계

### 1. 사전 감사와 실행 문서

- Files: `work/education-webapp-redesign-plan.md`, `work/education-webapp-redesign-audit.md`, `work/education-webapp-redesign-assets.md`, `design-system/MASTER.md`, `design-system/pages/start.md`
- Interfaces: `RedesignAuditFinding`, `AssetReviewEntry`, `DesignTokenContract`를 문서 표와 코드 계약에 맞춰 명시한다.
- Tests: 문서 내 요구사항 대조표에서 설계 문서의 학습 목표·차별성·흐름·판정·접근성·안전·MVP·완료 기준 각각에 근거 파일과 합격 기준이 있어야 한다.
- Acceptance: 지원 스킬의 실제 경로·사용 결과, 이미지 생성 미실행 이유, 기존 SVG·로컬 MP3 검토 결과가 기록된다.

### 2. 읽기 모델과 공통 여정 지도

- Files: `src/features/session/selectors.ts`, `src/components/LearningJourney.tsx`, `tests/unit/sessionSelectors.test.ts`, `tests/components/learningJourney.test.tsx`
- Interfaces:
  - `export interface JourneyProgressItem { readonly key: JourneyStageKey; readonly label: string; readonly status: 'complete' | 'current' | 'upcoming'; }`
  - `export type JourneyStageKey = 'find' | 'continue' | 'repair' | 'translate' | 'create';`
  - `export function selectJourneyProgress(state: SessionState): readonly JourneyProgressItem[]`
  - `export interface LearningJourneyProps { readonly items: readonly JourneyProgressItem[]; readonly labelledBy?: string; }`
- Failing tests: 시작 상태가 다섯 항목을 `upcoming`으로 내고, `repair` 상태가 앞 두 항목 `complete`, 자신 `current`, 뒤 두 항목 `upcoming`으로 내며 `summary`가 다섯 항목 `complete`인지 검사한다.
- Minimal implementation: 셀렉터에서 stage 순서를 매핑하고 `<ol>`과 텍스트 상태를 렌더링한다.
- Passing tests: 위 상태, `aria-current="step"`, 색상 없이도 읽히는 상태 문장이 모두 통과한다.

### 3. 단계 헤더와 행동 레일

- Files: `src/components/StageHeader.tsx`, `src/components/ActionRail.tsx`, `src/content/copy.ts`, `tests/components/stageHeader.test.tsx`, `tests/components/actionRail.test.tsx`
- Interfaces:
  - `export type StageNumber = 1 | 2 | 3 | 4 | 5`
  - `export interface StageHeaderProps { readonly eyebrow: string; readonly title: string; readonly instruction: string; readonly current: StageNumber; readonly total: 5; readonly labelledBy?: string; }`
  - `export interface ActionRailProps { readonly primary: ReactNode; readonly secondary?: ReactNode; readonly next?: ReactNode; readonly labelledBy?: string; }`
  - `export const STAGE_META: Readonly<Record<JourneyStageKey, { readonly title: string; readonly instruction: string }>>`
- Failing tests: 헤더가 `현재 단계 2 / 5`와 동사형 instruction을 한 번씩만 렌더링하고, 레일의 DOM 순서가 primary → next → secondary이며 primary에 `data-primary-action`이 있는지 검사한다.
- Minimal implementation: 기존 화면의 중복 제목·진행 텍스트를 공통 컴포넌트로 이동하고 `ActionRail`에 명시적 landmark를 둔다.
- Passing tests: find/create 화면의 pulseKind가 유지되고, success 상태에서 다음 버튼이 primary보다 먼저 호출되지 않는다.

### 4. 피드백과 오류 복구 계층

- Files: `src/components/FeedbackPanel.tsx`, `src/components/InstructionCard.tsx`, `src/features/find/FindUnitScreen.tsx`, `src/features/continue/ContinuePatternScreen.tsx`, `src/features/repair/RepairPatternScreen.tsx`, `src/features/translate/TranslatePatternScreen.tsx`, `src/features/create/CreatePatternScreen.tsx`, `tests/components/feedbackPanel.test.tsx`, `tests/components/instructionCard.test.tsx`
- Interfaces:
  - `export interface FeedbackPanelProps { readonly status?: FeedbackStatus; readonly message?: string; readonly hint?: ReactNode; readonly children?: ReactNode; readonly nextActionLabel?: string; readonly onNext?: () => void; }`
- Failing tests: retry에는 `다시` 지시 문장이 있고 success에는 학습 증거 문장과 다음 행동 버튼이 있으며 `role=status`, `aria-live=polite`, `aria-atomic=true`가 유지되는지 검사한다.
- Minimal implementation: 상태별 제목·본문·행동 묶음을 렌더링하고 기존 문구를 `COPY`에서 주입한다.
- Passing tests: 오답 원인별 문장이 정확히 노출되고, 색상·아이콘이 없어도 상태와 행동이 텍스트로 구분된다.

### 5. 출발역·요약 화면 리디자인

- Files: `src/features/start/StartScreen.tsx`, `src/features/summary/SummaryScreen.tsx`, `src/components/AppShell.tsx`, `src/styles/components.css`, `src/styles/base.css`, `tests/components/startScreen.test.tsx`, `tests/components/summaryScreen.test.tsx`, `tests/components/appShell.test.tsx`
- Interfaces: `StartScreenProps`와 `SummaryScreenProps`의 외부 콜백·설정 타입을 유지하고, `StartScreenProps.settingsTriggerRef?: RefObject<HTMLButtonElement | null>`로 설정 닫기 포커스 복귀를 연결하며, `AppShellProps`에 `journeyItems?: readonly JourneyProgressItem[]`을 추가한다.
- Failing tests: 시작 화면에서 제목·핵심 질문·여정 지도·운행 시작 순서, 요약에서 다섯 증거·takeaway·다음 운행 순서를 검사한다. `settings` prop이 실제 접근성 설정 버튼에 연결되는지도 검사한다.
- Minimal implementation: `<section>`을 `start-layout`/`summary-layout` 카드로 구성하고 AppShell이 제목 다음 여정 지도를 한 번만 제공한다.
- Passing tests: 기존 start/summary 테스트와 새 순서·랜드마크 테스트가 모두 통과하며, 시작 버튼은 계속 `gi-pulse` 대상이다.

### 6. 반응형·모션·자산 안전 정리

- Files: `src/styles/tokens.css`, `src/styles/components.css`, `src/styles/motion.css`, `src/styles/patterns.css`, `src/components/StartMissionIllustration.tsx`, `tests/components/reducedMotion.test.tsx`, `tests/architecture/source-size.test.ts`, `work/education-webapp-redesign-assets.md`
- Interfaces: CSS custom property 계약 `--space-*`, `--surface-*`, `--focus-ring`, `--content-max`를 문서화하고 기존 클래스와 매핑한다.
- Failing tests: 320px에서 `scrollWidth === innerWidth`, 주요 버튼 최소 48px, reduced-motion에서 `animation-name: none` 또는 정적 활성 클래스가 적용되는지 검사한다.
- Minimal implementation: 공통 grid/flex 레이아웃과 320/640/960px breakpoints를 추가하고, inline SVG의 `aria-hidden`/title 계약을 유지한다.
- Passing tests: 기존 reduced motion·pattern contrast·source-size 테스트와 새 viewport 계약이 통과한다. 새 raster 이미지나 외부 요청은 추가되지 않는다.

### 7. 업데이트 기록과 통합 검증

- Files: `src/content/updateHistory.ts`, `README.md`, `work/education-webapp-redesign-report.md`, `tests/components/updateHistory.test.ts`, `tests/unit/readmeContract.test.ts`, `tests/e2e/learner-flow.spec.ts`, `tests/e2e/accessibility.spec.ts`, `tests/e2e/privacy.spec.ts`
- Interfaces: `UpdateHistoryEntry`를 유지하며 `date: '2026-08-30'`, `kind: '개선'`, 포커스·토큰·모바일 검토 요약을 배열 첫 항목에 추가한다.
- Failing tests: 업데이트 대화상자에 새 날짜가 표시되고, 개인정보 스캔에 `fetch`, `localStorage` 외 네트워크/식별자 추가가 없는지 검사한다.
- Minimal implementation: 기록을 추가하고 E2E에 다섯 단계 시작→요약과 업데이트 대화상자 확인을 보강한다.
- Passing tests: `npm run check`, `npm run check:size`, `npm run test:e2e`가 예상한 성공 결과를 낸다. 브라우저 런처 권한 오류가 발생하면 동일 명령을 한 번만 승인 환경에서 재실행하고, 두 번 실패하면 코드 문제와 환경 문제를 분리해 보고한다.

## 2026-08-30 실행 스킬 및 계획 대조

| 역할 | 실제 경로 | 실행 상태 | 적용 결과 |
|---|---|---|---|
| 교육용 리디자인 오케스트레이션 | `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/SKILL.md` | 읽기 완료 | 계획→감사→디자인 시스템→기존 구조 구현→자산 검토→QA 순서를 지켰다. |
| 초기·최종 품질 감사 | `/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md` | 읽기 완료, `context.mjs`와 `detect.mjs` 각 1회 실행 | `detect.mjs` 결과 `[]`; 반복 탐지는 실행하지 않았다. |
| 디자인 시스템 검색 | `/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md` | 읽기 완료, `search.py --design-system` 및 접근성·React·타이포 검색 실행 | 기존 light 토큰·48px·semantic HTML·focus·reduced motion 원칙과 충돌하는 외부 폰트·dark mode 제안은 적용하지 않았다. |
| 기존 앱 리디자인 구현 | `/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md` | 읽기 완료, 기존 Vite + React 구조에 적용 | 새 프레임워크 없이 공통 여정·헤더·행동 레일·피드백 계층을 통합했다. |
| 이미지 자산 판단 | `/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md` 및 `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/references/asset-safety.md` | 읽기 완료, 생성 호출은 생략 | 기존 인라인 SVG와 로컬 MP3가 학습 맥락을 충족하므로 새 이미지·외부 요청을 추가하지 않았다. |

## 향후 실행할 명령과 예상 결과

아래 명령은 계획 승인 및 구현 단계에서만 실행하며, 이 계획 작성 단계에서는 실행하지 않는다.

```bash
npm run lint
# ESLint 오류 0개, 경고 0개

npm test
# Vitest 전체 테스트가 PASS

npm run build
# tsc -b 성공 후 dist/ 정적 번들 생성

npm run check:size
# 500줄 이상 소스 0개

npx playwright test tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/privacy.spec.ts
# 학습자 경로·axe·개인정보 E2E가 PASS

npm run check
# lint → unit/component tests → build 전체 PASS
```

수동 검증은 `npm run dev -- --host 127.0.0.1`로 로컬 서버를 띄운 뒤 Playwright 승인 브라우저에서 320×844, 375×812, 1280×900을 순서대로 확인한다. `Tab`으로 시작·선택·제출·다음·업데이트 내역을 이동하고, DevTools에서 `prefers-reduced-motion: reduce`를 켜서 이동 애니메이션 대신 정적 강조가 보이는지 기록한다. VoiceOver는 실행하지 않는다.

## 향후 커밋 단계

커밋이 별도로 승인된 경우에만 다음 세 개의 원자적 커밋을 만든다.

1. `docs: add education redesign audit and design system` — `work/education-webapp-redesign-plan.md`, `work/education-webapp-redesign-audit.md`, `work/education-webapp-redesign-assets.md`, `design-system/MASTER.md`, `design-system/pages/start.md`만 포함한다.
2. `feat: redesign learner journey hierarchy and feedback` — 공통 컴포넌트, 셀렉터, 화면, CSS, 문구, 업데이트 기록과 관련 테스트를 포함한다.
3. `test: verify safe learner redesign` — E2E 보강과 `work/education-webapp-redesign-report.md`를 포함한다.

각 커밋 전에 `git diff --check`, `npm run check`, `npm run check:size`를 통과시키고, 커밋·푸시·배포·HVC 등록은 별도 사용자 요청 이후에만 진행한다.

## Acceptance, risks, and rollback

### Acceptance checklist

- [x] 설계 문서의 학습 목표·기존 앱과의 차별성·핵심 흐름·콘텐츠/판정·접근성·개인정보/안전·MVP·완료 기준이 감사 문서와 테스트에 연결됨
- [x] 시작 화면과 모든 단계 화면에 같은 여정 지도·단계 헤더·행동 레일 계약이 적용됨
- [x] retry/success 피드백이 이유와 다음 행동을 함께 보여 줌
- [x] gi-pulse가 `한 묶음 찾기`, `운행하기`, 시작 버튼 등 학습의 현재 주요 행동에만 남고 reduced-motion에서 애니메이션이 꺼짐
- [x] 업데이트 내역에 실제 리디자인 날짜와 요약이 보임
- [x] 320px/200% 확대/키보드/axe/개인정보/소스 크기 검증이 통과함
- [x] 소스 변경 후에도 도메인 판정과 저장 계약 회귀가 없음

### Risks and mitigations

- 여정 지도 추가로 모바일 높이가 늘어날 위험: 320px 스냅샷에서 단계 항목을 가로 스크롤 없이 두 줄 이내로 유지하고, 본문 카드와 지도 사이 간격을 16px 이하로 제한한다.
- 공통 헤더 추출 중 제목·aria 연결이 중복될 위험: 각 화면 테스트에서 heading level, `aria-labelledby`, status 수를 검사한다.
- 성공 버튼과 주요 제출 버튼이 동시에 강조될 위험: `ActionRail` 테스트에서 한 화면당 `data-primary-action` 개수를 1개로 제한한다.
- 저장 설정 회귀 위험: `progressStore.test.ts`와 접근성 설정 회귀 테스트를 수정 없이 다시 통과시킨다.
- 이미지 교체로 교육적 의미가 흐려질 위험: 기존 SVG를 유지하고, 새 이미지가 필요할 때 자산 감사와 직접적인 alt 검토를 먼저 수행한다.

### Rollback

리디자인 변경을 되돌릴 때는 구현 커밋을 되돌리고, 현재 `main`의 기존 `AppShell`, 각 Screen, CSS, 테스트 계약을 복원한다. `work/`와 `design-system/` 문서는 감사 이력으로 남기며, `src/content/updateHistory.ts`의 2026-08-30 기록은 롤백 사실을 설명하는 별도 날짜 항목으로만 수정한다. 이 실행에서는 롤백 명령을 실행하지 않는다.
