# Pattern Unit Engine Room UX Orchestrator Implementation Plan

## Goal

초등학교 1~2학년이 `찾기 → 이어 붙이기 → 수리하기 → 번역하기 → 만들기 → 돌아보기` 흐름을 끊김 없이 따라가도록 현재 교육용 React 앱의 전환 포커스와 학습자용 진행 안내를 개선한다. 반복 판정, 미션 카탈로그, 로컬 저장, 선택형 오디오, light mode, 48px 조작 영역, `gi-pulse`, reduced-motion, 업데이트 날짜 기록은 보존한다.

### 이번 주기 완료 기준

- P1 단계 전환에서 새 학습 영역이 키보드 포커스를 받고 스크롤이 상단으로 이동한다.
- 번역 화면에서 `고른 대응 n / 전체`가 보이고 필요한 모든 대응 전에는 확인 버튼이 비활성이다.
- 자유 규칙 화면에서 두 번 이상 반복 조건과 선로 칸 수가 초등학생 문장으로 보인다.
- 빈 단위 보드에서 첫 조작 힌트가 보이고 첫 토큰을 추가하면 사라진다.
- 모든 새/수정 소스 파일이 500줄 미만이며 `gi-pulse`는 현재 핵심 교육 버튼 하나에만 남는다.
- `npm run check`, `npm run check:size`, `npm run test:e2e`, 수동 320×844·375×812·1280×900·200%·reduced-motion·모바일·키보드·스크린 리더 의미 트리 검증과 Impeccable detector가 통과한다. VoiceOver는 실행하지 않는다.

## Architecture

### 현재 구조 보존

1. `src/domain/pattern/*`는 AB·AAB·ABB·ABC 반복/번역/수리 판정의 순수 함수로 유지한다.
2. `src/content/*`는 미션 데이터와 학생용 문장을 공급한다.
3. `src/features/session`의 `SessionState`와 `sessionReducer`는 유일한 상태 전이 소스로 유지한다.
4. 화면 컴포넌트는 입력·표현만 담당하고 새 진행 안내는 기존 상태에서 계산한다.

### 전환 포커스 계약

`StageFocusRegion`은 `focusKey`가 바뀔 때 `tabIndex={-1}`인 `role="region"`을 포커스하고, 브라우저 스크롤을 `top: 0`으로 되돌린다. `App`은 `state.stage`와 현재 미션 ID를 합친 키를 전달한다. 설정·업데이트 모달의 트리거 포커스 계약은 이 영역과 독립적으로 유지한다.

### 정적 표현 결정

`work/elementary-webapp-ux-simulation-decision.md`에 따라 2D/3D 시뮬레이션은 추가하지 않는다. 현재 DOM/SVG 보드와 버튼이 학습 정보를 직접 전달한다.

## Tech Stack

- Vite 8, React 19, TypeScript 5.9
- Vitest 4, Testing Library, `@testing-library/user-event`
- Playwright 1.62 + axe E2E 계약
- ESLint 10, 기존 `npm run check`, `npm run check:size`
- 로컬 SVG/MP3만 사용. 서버, 계정, 분석 SDK, 녹음, 외부 TTS, 캔버스/WebGL은 추가하지 않는다.

## Spec

### 학습 목표와 차별성 연결

- `[2수02-01]`: 반복 배열에서 가장 짧은 단위를 찾고 다른 모습으로 대응한다. `find`, `translate`의 기존 판정을 유지하고 번역 진행 수를 보강한다.
- `[2수02-02]`: 정한 단위로 배열을 이어 만들고 자기 규칙을 만든다. `continue`, `create-unit`, `create-track`의 기존 판정과 선로 반복 조건을 유지한다.
- 분류나 십 묶음 앱과 달리 AB·AAB·ABB·ABC의 순서와 모양 번역을 보여 준다. 점수·순위·속도는 추가하지 않는다.

### 활동별 변경 범위

1. `find`: 화면 변경 없음. 성공 후 전환 포커스만 보강한다.
2. `continue`: 화면 변경 없음. 성공 후 전환 포커스만 보강한다.
3. `repair`: 오답 복구 문장과 위치/모양 선택 semantics 유지.
4. `translate`: 행동 문장, 대응 진행 문장, `aria-live` 진행 상태 추가.
5. `create-unit`: 구체적인 선택 문장과 빈 보드 힌트 추가.
6. `create-track`: 반복 조건 문장과 명명된 선로 칸 수 추가.
7. `summary`: 다음 운행/처음으로 버튼과 전환 포커스 유지.

### 접근성·개인정보·안전

- 단계 전환 후 포커스 영역은 라벨을 읽을 수 있고 `scrollY=0`으로 새 활동 제목을 향한다.
- 기존 `:focus-visible` 3px 대비 테두리, 버튼 최소 48px, 색 외 모양·무늬·텍스트 단서를 유지한다.
- `prefers-reduced-motion: reduce`와 설정의 reduce는 애니메이션을 정적 테두리로 대체한다. 새 애니메이션을 만들지 않는다.
- `gi-pulse`는 `운행 시작`, `한 묶음 찾기`, 실행 가능한 `운행하기` 중 현재 화면의 주요 행동 하나에만 존재한다.
- 학생 이름·사진·음성·서버·쿠키·분석을 추가하지 않는다. `ProgressStore` 실패 시 화면은 계속 동작한다.
- `업데이트 내역` 버튼과 날짜별 기록을 유지하고, 이번 개선 날짜 `2026-08-31` 기록을 추가한다.
- VoiceOver는 계획·구현·검증에서 제외한다.

## Global Constraints

- 아래 작업 순서는 각 항목마다 `실패 테스트 → 최소 구현 → 통과 테스트`이다.
- 계획 저장 전에는 소스·테스트·설정 파일을 수정하지 않는다. 이 문서와 감사 문서는 먼저 저장한다.
- unrelated 변경을 되돌리거나 덮어쓰지 않는다. 도메인 판정·미션 ID·배포 설정은 수정하지 않는다.
- 새 파일과 수정 파일을 `npm run check:size`로 확인하고 500줄에 접근하면 책임별 파일로 나눈다.
- 사용자에게 보이는 문장은 두 줄 이내, 구체적인 동사, 명사 포함 숫자 원칙을 따른다.
- 향후 명령은 실행 계획으로만 기록하며 이 계획을 저장하는 단계에서는 실행하지 않는다.
- 이 계획에는 커밋·푸시·GitHub 저장소 생성·Pages 배포를 포함하지 않는다.

## 예상 파일 구조와 책임

```text
src/
  App.tsx                                  # StageFocusRegion 연결과 stage key 계산
  components/
    StageFocusRegion.tsx                   # 전환 포커스·상단 스크롤 경계
  content/
    copy.ts                                # 번역 진행·선로·빈 상태 문장
    updateHistory.ts                        # 2026-08-31 개선 기록
  features/translate/
    TranslatePatternScreen.tsx             # 대응 진행 상태 표시
  features/create/
    CreatePatternScreen.tsx                # 반복 조건·빈 상태·선로 칸 명명
  styles/
    components.css                         # StageFocusRegion 포커스 표시
tests/
  setup.ts                                  # jsdom scrollTo 테스트 대역
  components/appStageFocus.test.tsx        # 전환 포커스·scrollTo 계약
  components/translatePatternScreen.test.tsx # 번역 진행 수와 disabled 계약
  components/createPatternScreen.test.tsx  # 반복 조건·빈 상태·선로 칸 문장
  components/updateHistory.test.tsx        # 날짜 기록 회귀
work/
  elementary-webapp-ux-audit.md            # 실제 브라우저·정적 감사
  elementary-webapp-ux-language-audit.md  # 초등 문장 before/after/probe
  elementary-webapp-ux-simulation-decision.md # 시뮬레이션 불필요 결정
  elementary-webapp-ux-plan.md             # 본 실행 계획
  elementary-webapp-ux-report.md           # 구현 후 수용 게이트 보고
```

## 작업별 Files · Interfaces · TDD 단계

### 1. 단계 전환 포커스와 스크롤

- Files: `tests/components/appStageFocus.test.tsx`, `src/components/StageFocusRegion.tsx`, `src/App.tsx`, `src/styles/components.css`
- Interfaces:
  - `export interface StageFocusRegionProps { readonly focusKey: string; readonly label: string; readonly children: ReactNode; }`
  - `export function StageFocusRegion(props: StageFocusRegionProps): JSX.Element`
- 실패 테스트:
  1. `<App />`에서 `운행 시작` 후 find를 완료하고 `다음 활동: 이어 붙이기`를 누른다.
  2. `document.activeElement`가 `role="region"`이며 `aria-label="현재 학습 단계"`인지, `window.scrollTo`가 `{ top: 0, left: 0, behavior: 'auto' }`로 호출되는지 검사한다.
  3. summary에서 `다음 운행`을 누르는 전환에도 같은 계약을 검사한다.
- 최소 구현:
  1. `StageFocusRegion`에 `ref`, `useEffect([focusKey])`, `tabIndex=-1`, `role="region"`, 명시적 라벨을 구현한다.
  2. `App`의 조건부 화면 전체를 해당 영역으로 감싸고 `${state.stage}:${mission?.id ?? 'summary'}`를 키로 전달한다.
  3. `.stage-focus-region:focus`에 기존 `--focus-ring`을 적용한다.
- 통과 테스트:
  - 전환마다 포커스 영역·스크롤 계약이 통과하고, 설정 닫기·업데이트 닫기 트리거 포커스 테스트가 회귀하지 않는다.

### 2. 번역 진행 문장

- Files: `tests/components/translatePatternScreen.test.tsx`, `src/content/copy.ts`, `src/features/translate/TranslatePatternScreen.tsx`
- Interfaces:
  - `export function formatTranslationProgress(current: number, total: number): string`
  - `COPY.translateInstruction`, `COPY.translationProgressLabel`
- 실패 테스트:
  1. 세 항 미션 렌더 시 `고른 대응 0 / 3`을 찾는다.
  2. 한 쌍 선택 뒤 `고른 대응 1 / 3`과 확인 버튼 disabled를 검사한다.
  3. 세 쌍 선택 뒤 `고른 대응 3 / 3`과 확인 버튼 enabled를 검사한다.
- 최소 구현:
  1. `translateInstruction`을 `원래 항과 새 모양을 하나씩 짝지어 보세요.`로 교체한다.
  2. `formatTranslationProgress`로 고유 원래 항 수와 현재 `draftPairs.length`를 표시한다.
  3. 진행 문장에 `role="status"`, `aria-live="polite"`를 적용하고 기존 `mappingComplete` 판정을 그대로 사용한다.
- 통과 테스트:
  - AB·ABC 미션의 진행 수, 한 쌍 교체 시 중복 source가 증가하지 않는 것, 기존 bijection/order 오답·성공 문구가 모두 통과한다.

### 3. 자유 규칙 선로 안내

- Files: `tests/components/createPatternScreen.test.tsx`, `src/content/copy.ts`, `src/features/create/CreatePatternScreen.tsx`
- Interfaces:
  - `COPY.createInstruction`, `COPY.createTrackInstruction`, `COPY.createTrackProgressLabel`
  - `export function formatTrackProgress(current: number, total: number): string`
- 실패 테스트:
  1. unit mode에서 `모양 2~3개를 골라 한 묶음을 만들어요.`가 보이는지 검사한다.
  2. 빈 unit mode에서 `아래에서 모양을 눌러 한 묶음을 채워요.`가 보이고 토큰 추가 후 사라지는지 검사한다.
  3. track mode에서 `한 묶음을 두 번 이상 붙이면 운행할 수 있어요.`와 `선로에 놓은 칸: 2 / 12`가 보이는지 검사한다.
- 최소 구현:
  1. `COPY`에 학습자용 문장과 `formatTrackProgress`를 추가한다.
  2. `Board`에 `emptyHint`를 선택적으로 렌더링하고 unit mode에서 빈 배열일 때만 전달한다.
  3. TrackMode에 반복 조건 문장과 명명된 진행 문장을 렌더링한다.
  4. 기존 `track.length === 0` disabled, `canAppendUnit`, `needs-second-repeat`, `gi-pulse` 로직은 건드리지 않는다.
- 통과 테스트:
  - 2·3 토큰 단위, 최대 12칸, 성공·오답·reduced-motion 케이스와 기존 pulse 계약이 통과한다.

### 4. 업데이트 내역과 회귀 검사

- Files: `src/content/updateHistory.ts`, `tests/components/updateHistory.test.tsx`, `work/elementary-webapp-ux-report.md`
- Interfaces: 기존 `UpdateHistoryEntry`와 `UpdateHistoryDialog` 계약을 유지한다.
- 실패 테스트: 최신 항목 날짜 `2026-08-31`, kind `개선`, 포커스 가능한 `업데이트 내역` 버튼을 검사한다.
- 최소 구현: 날짜별 한 항목과 `단계 전환 포커스·번역 진행·선로 안내를 보강했어요` 문장을 추가한다.
- 통과 테스트: 최신 항목 순서·날짜, dialog 열기/닫기, 배경 inert, 트리거 포커스 복귀가 통과한다.

### 5. 최종 수용 검증

- Files: `tests/e2e/learner-flow.spec.ts`, `tests/e2e/accessibility.spec.ts`, `work/elementary-webapp-ux-report.md`
- 실패 테스트: 변경 전 baseline에서 발견한 BODY 포커스·scrollY 212와 진행 문장 부재를 재현하는 브라우저 assertion을 먼저 기록한다.
- 최소 구현: 1~4 작업을 완료한 결과로 같은 시나리오를 실행한다.
- 통과 테스트: 320×844, 375×812, 1280×900, 200% 확대, 키보드 Tab, reduced motion, wrong/correct branch, summary, settings/update, console·request·axe가 합격한다. VoiceOver는 제외한다.

### 6. 모바일·키보드·스크린 리더 검증

- Files: `tests/e2e/accessibility.spec.ts`, `tests/e2e/privacy.spec.ts`, `work/elementary-webapp-ux-report.md`
- 실패 테스트: 320px·375px에서 가로 넘침/가림, Tab·Enter·Space 전환, `role=region`·heading·button 이름·`aria-live` 의미가 사라지는 경우를 먼저 재현한다.
- 최소 구현: 1~4 작업에서 새 포커스 영역과 문장을 HTML 의미로 제공하고, 기존 Playwright axe/키보드 시나리오에 stage transition assertion을 추가한다.
- 통과 테스트: 모바일 viewport의 `scrollWidth === clientWidth`, 모든 핵심 버튼 48px 이상, 단계 전환 포커스·heading 접근, 오답/완료 상태의 live text, privacy 요청이 통과한다. 스크린 리더 검증은 브라우저 접근성 트리와 DOM 이름으로 수행하며 VoiceOver는 제외한다.

## 향후 실행할 명령과 예상 결과

다음 명령은 계획 승인 후 실행할 항목이며 현재 단계에서 실행하지 않는다.

```sh
# 실패 테스트 확인
npm test -- tests/components/appStageFocus.test.tsx tests/components/translatePatternScreen.test.tsx tests/components/createPatternScreen.test.tsx
# 예상: 새 assertion이 포커스 영역·진행 문장·선로 안내 부재로 실패한다.

# 최소 구현 후 대상 테스트
npm test -- tests/components/appStageFocus.test.tsx tests/components/translatePatternScreen.test.tsx tests/components/createPatternScreen.test.tsx
# 예상: 대상 테스트가 모두 통과한다.

# 전체 정적·단위 검사
npm run check
npm run check:size
git diff --check
# 예상: lint, Vitest, TypeScript build, 500줄 제한, 공백 검사가 통과한다.

# 브라우저 회귀
npm run test:e2e
# 예상: learner-flow, accessibility, privacy Playwright가 통과하고 외부 요청이 없다.

# Impeccable 최종 detector
node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src
# 예상: []

# 대화형 브라우저 증거
/Users/kimhongnyeon/.codex/skills/playwright/scripts/playwright_cli.sh --session pattern-ux-final open http://127.0.0.1:5182/
/Users/kimhongnyeon/.codex/skills/playwright/scripts/playwright_cli.sh --session pattern-ux-final resize 375 812
/Users/kimhongnyeon/.codex/skills/playwright/scripts/playwright_cli.sh --session pattern-ux-final snapshot
# 예상: 단계 전환 뒤 focus region active, scrollY 0, 진행 문장과 선로 안내가 보인다.
```

## 실패 시 복구

- 대상 테스트가 실패하면 해당 작업의 최소 변경만 되돌리고 도메인·미션 파일은 건드리지 않은 상태로 원인을 기록한다.
- 포커스 영역이 기존 모달 트리거 복귀를 방해하면 `StageFocusRegion`의 stage effect 범위를 확인하고 `settingsOpen` effect를 우선한다.
- 문장 길이로 320px 가로 넘침이 생기면 문장을 줄이되 의미를 잃지 않도록 언어 감사 표의 대체안을 검토하고, CSS로 글자를 숨기지 않는다.
- Playwright가 macOS 브라우저 환경 오류로 중단되면 CI Playwright/axe 결과와 로컬 제한을 분리해 보고하고, 같은 명령을 세 번 이상 반복하지 않는다.

## 향후 커밋 단계

이번 요청에서는 커밋·푸시·배포를 실행하지 않는다. 구현 승인 후 다음 순서로 별도 승인받아 진행한다.

1. `git diff --check`와 전체 검증 결과를 확인한다.
2. 계획·감사·소스·테스트 변경을 한 번 검토한 뒤 기능 커밋을 만든다.
3. 원격 CI와 GitHub Pages 상태를 확인한 뒤 푸시한다.
4. 실제 공개 learner path, 제목, 자산, 좁은 화면, 콘솔을 확인한 다음 공개 주소를 보고한다.
