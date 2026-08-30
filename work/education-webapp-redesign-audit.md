# Education Webapp Redesign Audit

## 감사 범위와 기준

- 대상: `/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room`의 Vite + React + TypeScript 정적 SPA
- 기준 문서: `2026-08-26-pattern-unit-engine-room-design.md`, `work/education-webapp-redesign-plan.md`
- 확인 방법: 소스·테스트·스타일 정적 검토, 이전 로컬/Pages 첫 화면 캡처 검토, 기존 Vitest/Playwright 계약 확인, Impeccable audit reference 및 기계 탐지 실행
- 스킬 상태(2026-08-30): `$impeccable`(`/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md`), `$ui-ux-pro-max`(`/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md`), `$redesign-existing-projects`(`/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md`), `$imagegen`(`/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`)을 실제 사용 가능한 목록에서 확인하고 지침을 읽었다. `$impeccable`의 `context.mjs`와 `detect.mjs`를 각 1회 실행했고, `$ui-ux-pro-max`의 `search.py` 디자인 시스템·접근성·React·타이포그래피 검색을 실행했으며, `$redesign-existing-projects` 지침으로 기존 Vite + React 구조를 구현했다. `$imagegen`은 자산 감사 결과 새 이미지가 필요하지 않아 생성 호출을 하지 않았다.
- 탐지: `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src/App.tsx src/components src/features src/styles` 결과 `[]`.
- 제외: VoiceOver 실행 및 사람 학습자 인터뷰를 수행했다고 주장하지 않음.

## Audit Health Score

| 차원 | 점수 | 핵심 판단 |
|---|---:|---|
| 접근성 | 4/4 | 48px 조작 영역, 상태 텍스트, `li[aria-current="step"]`, focus-visible, reduced-motion, 설정·업데이트 닫기 포커스 복귀를 자동·대화형 검증함 |
| 성능 | 3/4 | 정적 SVG·로컬 MP3·작은 React 화면으로 가볍지만, 렌더별 포커스 탐색과 무한 pulse는 사용 환경에 따라 비용을 만들 수 있음 |
| 테마 | 3/4 | 역할별 semantic alias를 컴포넌트 사용부에 연결했으며, 원시 팔레트는 토큰 정의·장식 SVG에 한정해 추가 정리가 가능함 |
| 반응형 | 4/4 | 390×844·1280×900 대화형 브라우저와 320px/200% 자동 harness에서 여정·CTA·가로 넘침을 확인함 |
| 구현 무결성 | 3/4 | 탐지 결과가 비어 있고 도메인·미션 ID·저장 경계를 분리했지만 사람 학습자 승인과 물리 기기 검증은 남아 있음 |
| **합계** | **17/20** | **Good — 코드·자동 QA는 완료, 사람·물리 기기 검토를 별도 진행** |

## Implementation Integrity Verdict

**Pass.** `sessionReducer`, `src/domain/pattern/*`, 미션 카탈로그를 표현 리디자인과 분리했고, Impeccable detector가 `[]`를 반환했다. 현재 구현은 규칙 단위 기관실의 학습 흐름을 표현하는 제품별 시스템으로 일관된다. 사람 학습자·교사 승인과 물리 기기 확인은 자동 PASS와 분리한다.

## Executive Summary

- 감사 점수: **17/20 (Good)**
- 이슈 수: P0 0개, P1 0개(2026-08-30 해결), P2 1개(사람·물리 기기 검토), P3 0개
- 해결한 핵심 조치: `LearningJourney`의 현재 상태 의미론, 시작 화면 목적 문장·DOM 순서, semantic color alias, 설정 닫기 포커스 복귀, 390px 가로 넘침을 보강했다.
- 남은 조치: 실제 초등학생·교사 사용성 검토와 iOS Safari/Android 물리 기기 확인은 별도 승인·환경이 필요하다.

## 보존해야 할 강점

| 영역 | 근거 | 리디자인 원칙 |
|---|---|---|
| 학습 판정 | `src/domain/pattern/repetition.ts`, `continuation.ts`, `repair.ts`, `translation.ts` | 순수 판정 함수와 20개 미션 카탈로그를 수정하지 않는다. |
| 학습 흐름 | `src/App.tsx`, `src/features/session/reducer.ts` | `find → continue → repair → translate → create → summary` 전이를 유지한다. |
| 비색상 정보 | `src/components/PatternCell.tsx`, `src/styles/patterns.css` | 색·모양·무늬·라벨을 함께 남긴다. |
| 큰 조작 | `src/styles/base.css`의 버튼 최소 크기, `ChoiceGrid` | 48px 터치 영역과 키보드 버튼 semantics를 유지한다. |
| 모션 안전 | `src/styles/motion.css`, `useEffectiveReducedMotion.ts` | `gi-pulse`와 열차 이동을 reduced-motion 정적 강조로 대체한다. |
| 개인정보 안전 | `src/services/progressStore.ts`, `tests/e2e/privacy.spec.ts` | 서버·계정·외부 요청을 추가하지 않고 로컬 저장 fail-closed 계약을 유지한다. |
| 기록성 | `src/components/UpdateHistoryButton.tsx`, `UpdateHistoryDialog.tsx` | 포커스 복귀와 날짜별 변경 기록을 유지한다. |

## 우선순위 발견 사항

### P1 — 시작 화면에서 전체 여정이 보이지 않음 (해결됨, 2026-08-30)

- 근거: `src/features/start/StartScreen.tsx`는 제목·한 문장 안내·인라인 SVG·버튼만 렌더링한다. `src/App.tsx`는 `<h1>` 뒤에 시작 화면을 바로 배치하며 다섯 활동 순서를 전달하는 읽기 모델이 없다.
- 관찰: 기존 첫 화면 캡처는 넓은 데스크톱 여백에 출발 카드가 고립되어 보인다. 초등학생은 지금 무엇을 하고 다음에 무엇을 하는지 카드 밖에서 알기 어렵다.
- 위험: `찾기 → 이어 붙이기 → 수리하기 → 번역하기 → 만들기`라는 학습 목표와 앱의 차별성이 첫 행동 전에 기억되지 않는다.
- 개선: `selectJourneyProgress`와 `LearningJourney`를 추가해 다섯 단계를 `<ol>`로 표시하고, 시작 카드에 핵심 질문과 시작 버튼을 한 계층으로 묶는다.
- 결과: `StartScreen`이 제목·목적 문장·5개 단계·SVG·`운행 시작`·설정 순서를 렌더링하며 390px 대화형 브라우저와 320px 자동 검증에서 가로 스크롤이 없었다.

### P1 — 단계별 행동 계층이 일관되지 않음 (해결됨, 2026-08-30)

- 근거: `src/features/find/FindUnitScreen.tsx`, `ContinuePatternScreen.tsx`, `RepairPatternScreen.tsx`, `TranslatePatternScreen.tsx`, `CreatePatternScreen.tsx`가 각자 제목·진행·버튼을 조합한다. 성공 후 계속 버튼과 제출 버튼의 시각 계층이 화면마다 다르다.
- 관찰: 사용자가 선택 → 제출 → 다음 활동의 순서를 매 화면에서 다시 해석해야 한다.
- 위험: 실패 후 무엇을 다시 선택해야 하는지, 성공 후 어디로 이동하는지 행동이 늦어진다.
- 개선: `StageHeader`와 `ActionRail`을 공통화하고 primary → success next → secondary 순서를 계약으로 고정한다. `data-primary-action`은 현재 핵심 제출 하나만 허용한다.
- 결과: 다섯 활동 화면이 `StageHeader`·`ActionRail`을 공유하고, 활성 주요 버튼 하나만 `data-primary-action`/`gi-pulse`를 사용하며, 성공 상태에서 다음 활동 이름을 표시했다.

### P1 — 피드백은 상태는 알리지만 복구 행동이 약함 (해결됨, 2026-08-30)

- 근거: `src/components/FeedbackPanel.tsx`와 `src/content/copy.ts`는 `role="status"`로 문장을 전달하지만 상태별 제목·이유·다음 조작의 시각적 묶음이 없다.
- 관찰: `retryWrongPosition`, `retryWrongReplacement`, `retryWrongContinuation`처럼 좋은 문구는 있으나 사용자가 배열·선택지·제출 중 어느 곳으로 돌아갈지 즉시 찾기 어렵다.
- 위험: 오답을 실패 낙인처럼 받아들이거나 같은 조작을 반복할 수 있다.
- 개선: `FeedbackPanelProps`에 `nextActionLabel`/`onNext`를 추가하고 retry에는 “다시 고를 곳”, success에는 학습 증거와 다음 단계 버튼을 함께 배치한다. 상태는 색상 이외의 제목·테두리·문장으로 전달한다.
- 결과: retry의 `다시 해 봐요` 이유와 success의 `잘했어요` 학습 증거·다음 버튼을 `role=status`/`aria-live="polite"` 안에서 확인했다.

### P2 — 진행 표시가 문장 하나라 공간 방향을 제공하지 못함 (해결됨, 2026-08-30)

- 근거: `src/components/ProgressIndicator.tsx`는 `현재 단계 n / 5`만 제공한다.
- 관찰: 숫자만으로는 `n`이 어떤 활동인지, 완료한 단계와 남은 단계가 무엇인지 알 수 없다.
- 개선: 숫자 진행은 `StageHeader`에 유지하되 `LearningJourney`의 완료/현재/예정 상태 라벨을 함께 제공한다.
- 결과: 다섯 단계명과 `완료`·`현재`·`예정` 상태가 텍스트로 제공되며 `aria-current="step"`는 현재 `li`에만 부여된다.

### P2 — 데스크톱 카드의 빈 공간과 모바일 세로 길이 균형 (해결됨, 2026-08-30)

- 근거: `src/styles/components.css`의 `.app-shell`/start 레이아웃과 기존 첫 화면 캡처, `src/styles/patterns.css`의 고정 셀 크기.
- 관찰: 데스크톱에서는 출발 그림 오른쪽에 빈 공간이 크고, 모바일에서는 여정 지도와 긴 안내가 추가될 경우 주요 버튼이 아래로 밀릴 수 있다.
- 개선: 320/640/960px 세 구간의 grid를 사용하고 시작 화면은 `minmax(0, 1fr)` 열로 묶는다. 지도 항목은 두 줄 이내, 카드 간 간격은 16px 이하로 제한한다.
- 결과: 390×844와 1280×900 캡처·DOM 확인에서 주요 CTA와 여정 지도가 잘리지 않았고, 모바일에서 `scrollWidth === clientWidth`를 기록했다. 320px·200%는 자동 E2E harness에서 통과했다.

### P2 — 설정·업데이트 접근점의 위치를 유지하면서 역할을 분리할 필요 (해결됨, 2026-08-30)

- 근거: `src/components/AppShell.tsx`, `src/features/settings/AccessibilitySettings.tsx`, `src/components/UpdateHistoryButton.tsx`.
- 관찰: 설정은 시작 화면에서만 열리고 업데이트 내역은 본문 하단에 있어 학습 중에는 찾기 어렵지만, 학습 도중 방해하지 않는 현재 위치도 장점이다.
- 개선: 설정 버튼은 시작 카드의 보조 행동으로 유지하고, 업데이트 내역은 작은 footer 버튼으로 유지하되 포커스 가능한 명시적 라벨과 날짜 기록을 보존한다. 설정 모달의 inert/포커스 복귀 계약은 변경하지 않는다.
- 결과: 업데이트 대화상자와 설정 패널을 대화형 브라우저에서 열고 닫았으며, 각각 업데이트·설정 트리거로 포커스가 복귀했다. 오답 후보를 선택하면 retry 문장이 나타나는 것도 확인했다.

## 설계 문서 요구사항 대조

| 요구사항 | 현재 근거 | 리디자인 연결 | 검증 |
|---|---|---|---|
| 가장 짧은 단위 찾기 | `findMissions.ts`, `repetition.ts` | 여정 1단계와 헤더 동사 `찾아요` | `findUnitScreen.test.tsx`, learner-flow |
| 다음 항 예측 | `continueMissions.ts`, `continuation.ts` | 여정 2단계와 선택→제출 레일 | `continuePatternScreen.test.tsx`, learner-flow |
| 오류 수리 | `repairMissions.ts`, `repair.ts` | retry 피드백의 위치→교체 행동 | `repairPatternScreen.test.tsx`, feedbackPanel |
| 외형 번역 | `translateMissions.ts`, `translation.ts` | 대응→같은 순서 행동 문장 | `translatePatternScreen.test.tsx`, learner-flow |
| 자유 규칙 창안 | `CreatePatternScreen.tsx`, `freePattern.ts` | unit/track 두 모드의 동일 레일 | `createPatternScreen.test.tsx`, learner-flow |
| 색 이외의 단서 | `PatternCell.tsx`, `tokenThemes.ts` | 지도·상태도 텍스트/테두리 병행 | axe + 흑백 수동 확인 |
| 48px·키보드 | `base.css`, 기존 accessibility tests | 공통 ActionRail 버튼 계약 | `accessibility.spec.ts`, component tests |
| reduced motion | `motion.css`, reduced motion hook | static active cell 유지 | `reducedMotion.test.tsx`, 수동 설정 |
| 로컬 전용·무수집 | `progressStore.ts`, privacy E2E | 표현 계층에 네트워크 추가 금지 | privacy E2E, 소스 검색 |
| 업데이트 내역 | `updateHistory.ts`, dialog tests | 2026-08-30 최신 개선 항목과 이전 날짜 기록 | `updateHistory.test.ts`, 대화형 모달 확인 |
| MVP 범위 | 미션 catalog 및 reducer | 데이터·판정 파일 불변 | unit 회귀 + diff review |

## 자산 안전 검토

| 자산 | 주장/역할 | 판정 | 접근성·상태 |
|---|---|---|---|
| `src/components/StartMissionIllustration.tsx` 인라인 SVG | 가상의 기관차가 학습 출발을 상징하는 개념 그림 | 유지 | 정보가 아닌 장식이므로 기본 `aria-hidden`; 제목이 필요한 맥락에서만 `<title>` 사용. |
| `public/favicon.svg` | 앱 식별용 단순 아이콘 | 유지 | 문서 아이콘으로만 사용, 학습 정보로 해석하지 않음. |
| `public/audio/ko/*.mp3` | 검수된 선택형 문자 동일 안내 | 유지 | 파일이 없어도 텍스트로 진행, 외부 TTS 호출 없음. |
| HVC 첫 화면 캡처 | 기존 화면을 설명하는 스크린샷 | 자동 교체 금지 | 앱 런타임 자산으로 삽입하지 않음. |

기존 자산은 해상도·사실성 문제 없이 학습 맥락과 일치하므로 새 raster 이미지를 추가하지 않는다. 따라서 이번 리디자인에서 `imagegen`은 실행하지 않았고, 생성 파일·참조 갱신·롤백은 없다. 장식 그림을 새로 넣어야 하는 별도 요청이 생기면 `references/asset-safety.md`의 생성 절차와 사람 검토를 다시 적용한다.

## 감사 결론

핵심 문제는 판정 로직이나 개인정보가 아니라 “지금 해야 할 행동”을 찾는 시각적·문장적 계층이다. 계획된 공통 여정 지도, 단계 헤더, 행동 레일, 피드백 묶음은 기존 학습 모델을 건드리지 않고 이 문제를 해결한다. 구현 후 자동 테스트가 통과해도 실제 초등학생의 이해와 촉감은 자동으로 승인할 수 없으므로, 최종 보고서에 수동 검토 항목을 별도 상태로 기록한다.

## Detailed Findings by Severity

### [P1] 의미 토큰과 기존 팔레트 토큰이 혼용됨 (부분 해결, 2026-08-30)

- 위치: `src/styles/components.css:84-98, 189-194`, `src/styles/tokens.css:14-25`, `src/components/StartMissionIllustration.tsx:24-30`
- 범주: Theming / Accessibility
- 영향: semantic token 값을 조정해도 일부 카드·버튼·SVG가 함께 바뀌지 않아 고대비 색 조정과 대비 검증이 분산된다.
- 기준: WCAG 1.4.3 대비, 디자인 토큰 일관성
- 결과: 공통 CSS의 상호작용·표면·테두리 사용부를 semantic alias로 치환하고, SVG의 고정 색상은 장식 팔레트로 남겼다. 자동 axe·대화형 대비 확인은 통과했으며 원시 팔레트 선언은 다음 토큰 정리 후보로 남긴다.
- 권장 명령: `$impeccable colorize` 후 `$impeccable polish`

### [P2] 현재 여정 상태가 `li`가 아닌 상태 텍스트에 부여됨 (해결됨, 2026-08-30)

- 위치: `src/components/LearningJourney.tsx:15-20`
- 범주: Accessibility
- 영향: 스크린 리더가 현재 단계라는 의미를 항목 전체가 아니라 `현재` span에만 연결할 수 있다.
- 기준: WAI-ARIA current item semantics
- 결과: `aria-current="step"`를 현재 `li`에 두고 상태 텍스트는 별도 span으로 유지했다. `learningJourney.test.tsx`, axe, 대화형 snapshot에서 5개 항목 순서를 확인했다.

### [P2] 시작 화면의 학습 목적 문구가 명시적 계약으로 분리되지 않음 (해결됨, 2026-08-30)

- 위치: `src/features/start/StartScreen.tsx:20-27`, `src/content/copy.ts`
- 범주: UX copy / 학습 흐름
- 영향: `InstructionCard`에 제목과 cue만 전달하므로 음성 transcript가 비활성화된 상황에서 다섯 활동의 목적 설명이 약해질 수 있다.
- 기준: 설계 문서 2·5·7절, 저학년 한 화면 한 행동 원칙
- 결과: `COPY.startInstruction`을 독립 문단으로 렌더링하고 제목→설명→여정→그림→CTA 순서를 `startScreen.test.tsx`와 390px 캡처로 확인했다.

### [P2] 320px 및 200% 확대에서 5열 여정 지도는 브라우저 증거가 필요함 (자동 검증 해결, 사람 검토 보류)

- 위치: `src/styles/components.css:11-34, 62-69`
- 범주: Responsive / Accessibility
- 영향: 폭은 줄어들지만 단계명·상태의 줄바꿈과 시각적 이해는 실제 글꼴 렌더링에서 악화될 수 있다.
- 기준: WCAG 1.4.4, 디자인 시스템의 320px/200% 계약
- 결과: 390×844 대화형 브라우저에서 `scrollWidth === clientWidth`, CTA 노출, 라벨 비절단을 기록했고 320px·200% 자동 E2E harness도 통과했다. 실제 iOS Safari/Android와 사람의 시각 검토는 별도 상태다.

## Patterns & Systemic Issues

- `src/styles/components.css`는 semantic alias와 기존 `--color-*`를 함께 사용한다. 현재 기능은 통과하지만 테마 조정 시 동일 역할을 두 곳에서 수정해야 한다.
- `gi-pulse`는 주요 행동에 한정되고 reduced-motion에서 꺼지므로 모션 남용은 발견되지 않았다.
- 외부 요청·학생 식별자·음성 입력은 발견되지 않았으며 `ProgressStore` 로컬 fail-closed 계약은 유지된다.

## Positive Findings

- 다섯 단계 지도는 링크가 아닌 읽기 전용 순서 표시라 세션을 임의로 건너뛰지 않는다.
- `ActionRail`은 primary → next → secondary 순서와 `data-primary-action`을 명시한다.
- `FeedbackPanel`은 status 역할·polite live region·상태 제목을 사용해 색만으로 결과를 전달하지 않는다.
- `AppShell`은 업데이트 모달이 열릴 때 본문을 inert 처리하고 닫힌 뒤 트리거로 포커스를 복귀시킨다.
- 인라인 SVG는 기본 장식이며 새 외부 raster 자산·CDN·자동 재생을 추가하지 않았다.

## Recommended Actions

1. **[완료] `$impeccable colorize`에 준하는 토큰 정리**: CSS 상호작용·표면·테두리 사용부를 semantic alias로 연결하고 axe를 재실행했다.
2. **[완료] `$impeccable harden`에 준하는 의미론 보강**: `aria-current`를 현재 `li`에 두고 테스트했다.
3. **[완료] `$impeccable clarify`에 준하는 문구 정리**: 시작 목적 문장과 DOM 순서를 독립 계약으로 만들었다.
4. **[완료] `$impeccable adapt`에 준하는 반응형 확인**: 390×844·1280×900 대화형 캡처와 320px·200% 자동 검증을 남겼다.
5. **[완료] `$impeccable polish` 최종 점검**: 콘솔 오류·경고 0개, 로컬 요청만, 설정·업데이트 포커스 복귀를 확인했다.

자동 탐지와 정적 검토만으로는 실제 초등학생의 이해를 승인할 수 없다. 현재 남은 것은 실제 초등학생·교사 검토와 iOS Safari/Android 물리 기기 확인이며, VoiceOver는 프로젝트 범위에서 제외한다.
