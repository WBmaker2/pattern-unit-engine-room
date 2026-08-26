# Pattern Unit Engine Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** 초등 1~2학년 학생이 AB·AAB·ABB·ABC 배열의 가장 짧은 반복 단위를 찾고, 다음 항 예측·오류 수리·외형 번역·자유 규칙 만들기를 드래그 없이 수행하는 서버 없는 정적 웹앱을 구축합니다.

**Architecture:** React 화면은 하나의 순수 세션 리듀서가 관리하고, 미션 데이터·시각 토큰·한국어 문구·로컬 음원을 화면 코드에서 분리합니다. 반복 판정, 빈칸 예측, 오류 수리, 일대일 번역, 자유 규칙 검증은 TypeScript 순수 함수로 구현하여 UI와 독립적으로 테스트합니다. 한 번의 안내 운행은 단위 찾기 → 이어 붙이기 → 오류 수리 → 외형 번역 → 내 규칙 운행 → 활동 도장 순서이며, 5개 운행 묶음을 순환하면 미션 20개를 모두 경험합니다.

**Tech Stack:** Node.js 22 LTS, npm, Vite, React, TypeScript strict mode, CSS, Vitest, React Testing Library, Playwright, Axe

**Spec:** /Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room/2026-08-26-pattern-unit-engine-room-design.md

## Global Constraints

- 대상은 초등 1~2학년이며 한 차시 권장 시간은 15~25분입니다.
- 구현 범위는 AB·AAB·ABB·ABC 구조 미션 20개, 단위 찾기, 이어 붙이기, 오류 수리, 외형 번역, 버튼 기반 자유 규칙 만들기, 문자·선택 음성 안내, 접근성 설정입니다.
- 증가 규칙, 곱셈 규칙, 복잡한 수열, 학생 간 공유, 음성 인식, 자유 그림 업로드, 상점·포인트 경쟁은 포함하지 않습니다.
- 서버, 계정, 광고, 외부 AI, 학생 이름·사진 입력, 학생 음성 녹음을 사용하지 않습니다.
- 오답 횟수, 속도, 연속 성공, 순위, 점수를 저장하거나 화면에 표시하지 않습니다.
- 진행 저장은 기본으로 꺼 두며 사용자가 “이 기기에서 이어 하기”를 켠 경우에만 최소 상태를 localStorage에 저장합니다.
- 모든 정답 판정은 화면 색상과 분리된 PatternTokenId 값으로 수행합니다.
- 각 학습 화면은 한 번에 하나의 주 행동만 활성화하고, 완료 뒤 별도 “다음” 버튼으로 다음 단계에 이동합니다.
- 화면당 동시에 제시하는 선택지는 4개 이하, 핵심 안내 문구는 32자 이하와 기본 2줄 이하를 목표로 합니다.
- 모든 주요 터치 대상은 최소 48×48 CSS px이며 드래그, 시간 제한, 빠른 더블 클릭을 요구하지 않습니다.
- gi-pulse 아우라는 “한 묶음 찾기”와 “운행하기” 버튼에만 적용합니다.
- 운영체제의 prefers-reduced-motion이 reduce이거나 앱 설정에서 모션 줄이기를 켜면 열차 이동을 없애고 칸별 테두리 전환으로 반복을 나타냅니다.
- 음성 안내는 자동 재생하지 않고, 동일한 문구를 항상 화면에 표시하며, 검수된 동일 출처 로컬 MP3만 재생합니다.
- 스크린 리더 이름은 “첫째 칸, 별 모양, 점무늬”처럼 순서·모양·무늬를 함께 제공합니다.
- 320px CSS viewport, 200% 브라우저 확대, 키보드 전용 조작, 모션 감소, 스크린 리더 구조를 완료 게이트로 둡니다.
- src, tests, scripts, 설정의 각 코드 파일은 물리적으로 499줄 이하로 유지하며 기능별로 분리합니다.
- 구현 오케스트레이션에 gpt-5.6-sol을 사용할 경우 실제 코딩 작업자는 gpt-5.6-luna를 사용하고, 각 작업 뒤 명세 적합성 검토와 코드 품질 검토를 분리합니다.
- 이 계획을 작성하는 현재 단계에서는 아래 명령을 실행하지 않습니다. 모든 명령은 계획 승인 뒤 실행할 항목입니다.

---

## 설계 요구사항 추적표

| 설계 영역 | 구현 연결 | 검증 연결 |
|---|---|---|
| 교육과정 [2수02-01], [2수02-02] | Task 5의 미션 카탈로그와 Task 6의 학습 증거 | missionCatalog.test.ts, sessionReducer.test.ts |
| 기억·이해: 한 묶음 표시 | Task 2, Task 8 | repetition.test.ts, findUnitScreen.test.tsx |
| 적용: 다음 항 이어 가기 | Task 2, Task 8 | continuation.test.ts, continuePatternScreen.test.tsx |
| 분석: 긴 단위와 최소 단위 구별 | Task 2, Task 5 | validateUnitChoice의 not-shortest 판정, 20개 데이터 검사 |
| 창안: 다른 모습으로 표현 | Task 4, Task 9, Task 10 | translation.test.ts, translatePatternScreen.test.tsx, createPatternScreen.test.tsx |
| 기존 앱과의 차별성 | Task 5의 순서·최소 주기 중심 콘텐츠와 번역 미션 | 숫자 계산·분류·열 묶음·증가 규칙이 데이터에 없음을 검사 |
| 핵심 학습 흐름 6단계와 화면 및 상호작용 | Task 6 세션 상태 기계와 Task 8~10 화면 | learner-flow.spec.ts에서 순서와 완료 도장 확인 |
| 내부 ID와 외형 분리 | Task 2 도메인 타입, Task 5 TokenTheme | 색상 제거 E2E와 tokenThemes 무결성 검사 |
| 부분 빈칸 판정 | Task 2 continuation.ts | 한 칸·두 칸·중간 빈칸 단위 테스트 |
| 오류 위치와 교체 항 판정 | Task 3 repair.ts | 단일 오류 위치·오답 위치·오답 교체 테스트 |
| 일대일 대응과 순서 번역 | Task 4 translation.ts | 중복 대응·순서 변경·정답 번역 테스트 |
| 최소 두 번 반복 자유 규칙 | Task 4 freePattern.ts, Task 10 | 한 번 반복 거절·두 번 반복 승인·단일 기호 거절 테스트 |
| 힌트를 전략 사용으로 처리 | Task 6, Task 7, Task 8 | 실패 횟수 없이 hintUsed만 기록하는 리듀서 테스트 |
| 화면당 한 행동, 48px, 3~4개 선택지, 짧은 문장 | Task 5, Task 7, Task 13, Task 15 | 주 제출 버튼 수, 콘텐츠 길이, Playwright boundingBox 검사 |
| gi-pulse와 모션 감소 | Task 7, Task 13 | pulseAction.test.tsx, accessibility.spec.ts |
| 문자와 선택 음성 | Task 11 | audioGuide.test.ts, 같은 transcript가 DOM에 남는 컴포넌트 테스트 |
| 개인정보·정서 안전 | Task 6, Task 12, Task 15 | localStorage 최소 스키마와 외부 요청 차단 검사 |
| MVP 20개와 제외 범위 | Task 5 | 종류별 5개, 구조별 5개, 총 20개를 정적 검사 |
| 320px·200%·키보드·스크린 리더 | Task 15 | 자동 E2E와 VoiceOver 수동 체크리스트 |
| 업데이트 내역 | Task 14 | 날짜·라벨·대화상자 포커스 복귀 테스트 |

## 학습 흐름과 경계

~~~mermaid
flowchart LR
    Catalog[미션 20개와 5개 운행 묶음] --> Reducer[순수 세션 리듀서]
    Domain[반복 판정 순수 함수] --> Reducer
    Reducer --> Find[단위 찾기]
    Find --> Continue[이어 붙이기]
    Continue --> Repair[오류 수리]
    Repair --> Translate[외형 번역]
    Translate --> Create[내 규칙 운행]
    Create --> Summary[활동 도장]
    Themes[모양·무늬·문자 토큰] --> Find
    Themes --> Continue
    Themes --> Repair
    Themes --> Translate
    LocalAudio[검수된 로컬 음원] --> Find
    Store[동의 시 최소 로컬 상태] <--> Reducer
~~~

판정 함수에는 시각 토큰, CSS 클래스, 색상 값, 음원 경로를 전달하지 않습니다. 화면은 판정 결과의 reason을 한국어 피드백 키로 번역할 뿐 정답을 자체 계산하지 않습니다. 이 경계가 색상 독립성과 기존 분류·자릿값 앱과의 차별성을 동시에 보장합니다.

## 고정 도메인 계약

~~~typescript
export type PatternTokenId = 'A' | 'B' | 'C';
export type PatternStructure = 'AB' | 'AAB' | 'ABB' | 'ABC';
export type PatternSlot = PatternTokenId | null;
export type PatternUnit = readonly PatternTokenId[];

export type ValidationReason =
  | 'matches'
  | 'does-not-repeat'
  | 'not-shortest'
  | 'wrong-continuation'
  | 'wrong-position'
  | 'wrong-replacement'
  | 'mapping-not-bijective'
  | 'order-changed'
  | 'needs-second-repeat'
  | 'unit-needs-two-symbols'
  | 'unit-length-out-of-range';

export interface PatternValidation {
  readonly ok: boolean;
  readonly reason: ValidationReason;
  readonly expectedUnit?: PatternUnit;
  readonly expectedTokens?: PatternUnit;
  readonly mismatchIndices?: readonly number[];
}

export interface TranslationPair<TTarget extends string = string> {
  readonly source: PatternTokenId;
  readonly target: TTarget;
}

export interface FreePatternValidation extends PatternValidation {
  readonly repeatCount: number;
}
~~~

시각 콘텐츠 계약은 다음 이름을 고정합니다.

~~~typescript
export type TokenThemeId =
  | 'engine'
  | 'shapes'
  | 'symbols'
  | 'actions'
  | 'cars'
  | 'signals';

export type DisplayTokenId =
  | 'gear'
  | 'bolt'
  | 'lamp'
  | 'circle'
  | 'triangle'
  | 'square'
  | 'star'
  | 'flag'
  | 'diamond'
  | 'hand-up'
  | 'clap'
  | 'step'
  | 'wheel'
  | 'window'
  | 'train';

export type PatternMarkId = 'dots' | 'stripes' | 'crosshatch';

export interface TokenVisual {
  readonly displayTokenId: DisplayTokenId;
  readonly labelKo: string;
  readonly iconId: DisplayTokenId;
  readonly patternMarkId: PatternMarkId;
  readonly patternLabelKo: '점무늬' | '줄무늬' | '격자무늬';
  readonly colorToken: string;
}

export interface TokenTheme {
  readonly id: TokenThemeId;
  readonly tokens: Readonly<Record<PatternTokenId, TokenVisual>>;
}
~~~

각 theme의 A·B·C는 순서대로 서로 다른 dots·stripes·crosshatch를 사용합니다. engine은 gear·bolt·lamp, shapes는 circle·triangle·square, symbols는 star·flag·diamond, actions는 hand-up·clap·step, cars는 wheel·window·train, signals는 lamp·flag·star를 사용합니다. labelKo는 gear=톱니바퀴, bolt=나사못, lamp=전등, circle=동그라미, triangle=세모, square=네모, star=별, flag=깃발, diamond=마름모, hand-up=손들기, clap=손뼉, step=발걸음, wheel=바퀴, window=창문, train=기차로 고정합니다.

## 미션 카탈로그 명세

각 행은 하나의 Mission 객체가 됩니다. 화살표 오른쪽 값은 수리 시 기대 교체 값이며, 번역 행의 대응은 정답 판정용 ID일 뿐 학생 화면에는 로컬 SVG와 한국어 이름으로 표시합니다.

| kind | id | structure | unit | theme | 본 배열 또는 조건 |
|---|---|---|---|---|---|
| find | find-ab-engine | AB | AB | engine | ABABABAB, 후보 A / AB / ABAB |
| find | find-ab-windows | AB | AB | cars | ABABABAB, 후보 ABA / AB / ABAB |
| find | find-aab-lamps | AAB | AAB | signals | AABAABAAB, 후보 AA / AAB / AABAAB |
| find | find-abb-gears | ABB | ABB | engine | ABBABBABB, 후보 AB / ABB / ABBABB |
| find | find-abc-signals | ABC | ABC | signals | ABCABCABC, 후보 AB / ABC / ABCABC |
| continue | continue-ab-cars | AB | AB | cars | ABAB__ → AB, 선택 AB / BA / AA |
| continue | continue-aab-tools | AAB | AAB | engine | AABAA_ → B, 선택 A / B / C |
| continue | continue-abb-lights | ABB | ABB | signals | ABBA__ → BB, 선택 BB / AB / BA |
| continue | continue-abc-panels-one | ABC | ABC | shapes | ABCAB_ → C, 선택 A / B / C |
| continue | continue-abc-panels-two | ABC | ABC | shapes | ABCA__ → BC, 선택 BC / CB / BB |
| repair | repair-ab-flags | AB | AB | symbols | ABAAAB, 넷째 칸 B → 선택 A / B / C |
| repair | repair-aab-bolts | AAB | AAB | engine | AABABBAAB, 다섯째 칸 A → 선택 A / B / C |
| repair | repair-abb-lamps | ABB | ABB | signals | ABBAABABB, 다섯째 칸 B → 선택 A / B / C |
| repair | repair-abb-wheels | ABB | ABB | cars | ABBBBBABB, 넷째 칸 A → 선택 A / B / C |
| repair | repair-abc-signals | ABC | ABC | signals | ABCACCABC, 다섯째 칸 B → 선택 A / B / C |
| translate | translate-ab-shapes | AB | AB | engine→shapes | ABAB, A→circle·B→triangle |
| translate | translate-aab-symbols | AAB | AAB | engine→symbols | AABAAB, A→star·B→flag |
| translate | translate-aab-objects | AAB | AAB | shapes→engine | AABAAB, A→lamp·B→bolt |
| translate | translate-abb-actions | ABB | ABB | shapes→actions | ABBABB, A→hand-up·B→clap |
| translate | translate-abc-cars | ABC | ABC | signals→cars | ABCABC, A→wheel·B→window·C→train |

5개 Journey는 다음 순서를 고정합니다.

1. Journey 0: find-ab-engine → continue-aab-tools → repair-abb-lamps → translate-abc-cars
2. Journey 1: find-aab-lamps → continue-abb-lights → repair-abc-signals → translate-ab-shapes
3. Journey 2: find-abb-gears → continue-abc-panels-one → repair-ab-flags → translate-aab-symbols
4. Journey 3: find-abc-signals → continue-ab-cars → repair-aab-bolts → translate-abb-actions
5. Journey 4: find-ab-windows → continue-abc-panels-two → repair-abb-wheels → translate-aab-objects

이 배치로 종류별 5개, 구조별 5개, 총 20개가 됩니다. 한 Journey가 끝나면 “다음 운행”으로 다음 인덱스를 순환하므로 한 화면에 5개 선택지를 노출하지 않습니다.

## 예상 파일 구조와 책임

| 경로 | 책임 | 목표 최대 줄 수 |
|---|---|---:|
| package.json | 실행·검사 스크립트와 고정 의존성 | 100 |
| vite.config.ts | Vite 정적 SPA 설정 | 80 |
| vitest.config.ts | jsdom, setup, coverage 설정 | 80 |
| playwright.config.ts | webServer, 프로젝트, reduced-motion 설정 | 120 |
| eslint.config.js | TypeScript·React 정적 검사 | 120 |
| index.html | 앱 진입점과 한국어 메타데이터 | 80 |
| src/main.tsx | React 마운트 | 40 |
| src/App.tsx | 세션 상태와 화면 라우팅 조립 | 220 |
| src/domain/pattern/types.ts | 고정 도메인 타입 | 120 |
| src/domain/pattern/repetition.ts | 최소 반복 단위와 반복 생성 | 160 |
| src/domain/pattern/continuation.ts | 빈칸 기대값과 이어 붙이기 판정 | 160 |
| src/domain/pattern/repair.ts | 오류 위치와 교체 판정 | 140 |
| src/domain/pattern/translation.ts | 일대일 대응과 순서 판정 | 160 |
| src/domain/pattern/freePattern.ts | 자유 규칙 길이·반복 횟수 판정 | 140 |
| src/content/missions/types.ts | Mission 판별 유니온 | 180 |
| src/content/missions/findMissions.ts | 찾기 미션 5개 | 180 |
| src/content/missions/continueMissions.ts | 이어 붙이기 미션 5개 | 180 |
| src/content/missions/repairMissions.ts | 수리 미션 5개 | 180 |
| src/content/missions/translateMissions.ts | 번역 미션 5개 | 200 |
| src/content/missions/journeys.ts | 5개 Journey 연결 | 100 |
| src/content/missions/index.ts | 카탈로그 조회 API | 100 |
| src/content/tokenThemes.ts | 내부 ID와 모양·무늬·라벨 매핑 | 240 |
| src/content/copy.ts | 짧은 한국어 안내와 피드백 | 220 |
| src/content/audioGuides.ts | 음원 경로와 transcript | 100 |
| src/content/updateHistory.ts | 날짜가 있는 변경 이력 | 80 |
| src/features/session/types.ts | 상태·이벤트·학습 증거 타입 | 220 |
| src/features/session/reducer.ts | 단계 전이와 판정 호출 | 320 |
| src/features/session/selectors.ts | 현재 미션·화면 파생값 | 140 |
| src/features/start/StartScreen.tsx | 출발 안내와 설정 진입 | 180 |
| src/features/find/FindUnitScreen.tsx | 최소 단위 후보 선택 | 240 |
| src/features/continue/ContinuePatternScreen.tsx | 한 칸·두 칸 이어 붙이기 | 220 |
| src/features/repair/RepairPatternScreen.tsx | 위치 선택 후 항 교체 | 240 |
| src/features/translate/TranslatePatternScreen.tsx | 원래 항과 새 항 대응 | 280 |
| src/features/create/CreatePatternScreen.tsx | 단위 작성·두 번 붙이기·운행 | 320 |
| src/features/summary/SummaryScreen.tsx | 학습 행동 도장과 다음 운행 | 180 |
| src/features/settings/AccessibilitySettings.tsx | 음성·모션·무늬·이어 하기 설정 | 260 |
| src/components/AppShell.tsx | landmark와 공통 레이아웃 | 140 |
| src/components/InstructionCard.tsx | 문자 안내와 음성 버튼 | 120 |
| src/components/PatternBoard.tsx | 순서가 있는 패턴 칸 목록 | 180 |
| src/components/PatternCell.tsx | 칸의 SVG·무늬·스크린 리더 이름 | 180 |
| src/components/TokenIcon.tsx | 외부 요청 없는 로컬 SVG 아이콘 | 300 |
| src/components/ChoiceGrid.tsx | 최대 4개 버튼 선택 그리드 | 140 |
| src/components/PrimaryAction.tsx | 제한된 gi-pulse 적용 API | 100 |
| src/components/FeedbackPanel.tsx | 오류 이유·힌트·성공 피드백 | 160 |
| src/components/AudioGuideButton.tsx | 선택 재생·중지·오류 무시 | 160 |
| src/components/UpdateHistoryButton.tsx | 우하단 문자 버튼 | 80 |
| src/components/UpdateHistoryDialog.tsx | 이력 대화상자와 포커스 복귀 | 180 |
| src/services/audioGuide.ts | HTMLAudioElement 재생 어댑터 | 160 |
| src/services/progressStore.ts | 동의 기반 localStorage 어댑터 | 200 |
| src/hooks/useEffectiveReducedMotion.ts | OS와 앱 설정을 안전하게 합성 | 120 |
| src/styles/tokens.css | 크기·색·간격 디자인 토큰 | 180 |
| src/styles/base.css | light 기본 화면과 전역 접근성 | 220 |
| src/styles/patterns.css | 색에 의존하지 않는 무늬 | 240 |
| src/styles/components.css | 카드·버튼·배열·대화상자 | 360 |
| src/styles/motion.css | gi-pulse·열차·감소 모션 | 180 |
| public/audio/ko/*.mp3 | 검수된 7개 한국어 안내 음원 | 바이너리 |
| tests/setup.ts | jest-dom과 테스트 정리 | 60 |
| tests/unit/*.test.ts | 순수 판정·콘텐츠·상태·서비스 | 파일당 260 |
| tests/components/*.test.tsx | 화면 행동과 의미 구조 | 파일당 300 |
| tests/e2e/*.spec.ts | 실제 학습 흐름·접근성·안전 | 파일당 350 |
| tests/architecture/source-size.test.ts | 499줄 상한 검사 | 100 |
| docs/qa/2026-08-26-accessibility-checklist.md | 수동 검증 절차와 실제 결과 | 180 |
| README.md | 실행법, 학습 모델, 개인정보 경계 | 220 |
| .github/workflows/quality.yml | lint·unit·build·e2e 품질 게이트 | 120 |

## 향후 실행 전제

아래 명령은 구현 승인 뒤 프로젝트 루트에서 순서대로 실행합니다.

~~~bash
pwd
test -f 2026-08-26-pattern-unit-engine-room-design.md
test -f 2026-08-26-pattern-unit-engine-room-implementation-plan.md
git init -b main
npm init -y
npm install --save-exact react react-dom
npm install --save-dev --save-exact vite @vitejs/plugin-react typescript @types/react @types/react-dom
npm install --save-dev --save-exact vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev --save-exact @playwright/test @axe-core/playwright
npm install --save-dev --save-exact eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
npx playwright install chromium
~~~

예상 결과: 현재 경로가 프로젝트 루트로 출력되고 두 문서 검사가 종료 코드 0으로 끝나며, main 브랜치의 빈 Git 저장소, package.json, package-lock.json, Chromium 실행 파일이 생성됩니다. 의존성 설치가 실패하거나 보안 경고가 해결되지 않으면 Task 1을 시작하지 않고 원인을 기록합니다.

## 테스트 helper 계약

코드 예시에서 사용하는 helper는 숨은 fixture가 아니라 아래 테스트 파일 안에 함께 정의합니다.

| 테스트 파일 | helper 계약 | 정확한 책임 |
|---|---|---|
| tests/unit/missionCatalog.test.ts | countBy<T>(items: readonly T[], keyOf: (item: T) => string): Record<string, number> | key별 개수를 0에서 누적 |
| tests/unit/missionCatalog.test.ts | getChoiceCount(mission: Mission): number | kind에 따라 candidates, choices, replacementChoices, targetPool 길이 반환 |
| tests/unit/missionCatalog.test.ts | countCorrectChoices(mission: Mission): number | Task 2~4 validator로 선택지별 ok=true 수를 계산 |
| tests/components/findUnitScreen.test.tsx | FindHarness({ missionId }: { missionId: string }): ReactElement | Journey 0 reducer와 getMission을 연결해 Find 화면 렌더링 |
| tests/components/continuePatternScreen.test.tsx | ContinueHarness({ missionId }: { missionId: string }): ReactElement | continue mission과 SUBMIT_CONTINUATION 연결 |
| tests/components/repairPatternScreen.test.tsx | RepairHarness({ missionId }: { missionId: string }): ReactElement | 칸 선택과 SUBMIT_REPAIR 연결 |
| tests/components/translatePatternScreen.test.tsx | TranslateHarness({ missionId }: { missionId: string }): ReactElement | draft pair state와 SUBMIT_TRANSLATION 연결 |
| tests/components/translatePatternScreen.test.tsx | chooseMapping(user: UserEvent, sourceLabel: string, targetLabel: string): Promise<void> | source button과 target button을 visible label로 차례로 click |
| tests/components/createPatternScreen.test.tsx | CreateHarness(): ReactElement | free unit·track action을 reducer에 연결 |
| tests/components/summaryScreen.test.tsx | COMPLETE_EVIDENCE: readonly LearningEvidence[] | unit-recognized, continued, repaired, translated, created를 각 1개와 hintUsed=false로 정의 |
| tests/components/accessibilitySettings.test.tsx | SettingsHarness(): ReactElement | 기본 AccessibilitySettings와 UPDATE_SETTINGS 연결 |
| tests/unit/audioGuide.test.ts | createMockAudio(), createRejectingMockAudio() | HTMLAudioElement의 play, pause, currentTime을 성공·reject Promise로 모사 |
| tests/unit/progressStore.test.ts | createMemoryStorage(), createMemoryStorageWithValidProgress() | Map 기반 Storage와 version 1 유효 JSON 제공 |
| tests/components/reducedMotion.test.tsx | mockMatchMedia(reduce: boolean): void | matches와 change listener가 있는 window.matchMedia 모사 |
| tests/e2e/learner-flow.spec.ts | completeJourneyZeroByVisibleLabels(page: Page): Promise<void> | 내부 ID 없이 실제 한국어 accessible name으로 Journey 0 완료 |
| tests/e2e/accessibility.spec.ts | interactiveBoundingBoxes(page: Page): Promise<BoundingBox[]> | visible button, link, input, switch의 null이 아닌 boundingBox 반환 |

### Task 1: 프로젝트 기반과 코드 크기 게이트

**Files:**
- Create: package.json
- Create: package-lock.json
- Create: .gitignore
- Create: index.html
- Create: vite.config.ts
- Create: vitest.config.ts
- Create: eslint.config.js
- Create: tsconfig.json
- Create: tsconfig.app.json
- Create: tsconfig.node.json
- Create: src/main.tsx
- Create: src/App.tsx
- Create: src/styles/tokens.css
- Create: src/styles/base.css
- Create: tests/setup.ts
- Create: tests/components/appShell.test.tsx
- Create: tests/architecture/source-size.test.ts

**Interfaces:**
- Consumes: 설계 문서와 Global Constraints
- Produces: npm scripts dev, build, preview, lint, test, test:coverage, test:e2e, check:size, check
- Produces: App(): JSX.Element
- Produces: 모든 코드 파일이 499줄 이하인지 검사하는 architecture test

- [ ] **Step 1: 도구 설정과 스크립트를 고정합니다**

package.json scripts를 다음 계약으로 설정합니다.

~~~json
{
  "name": "pattern-unit-engine-room",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --max-warnings=0",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "check:size": "vitest run tests/architecture/source-size.test.ts",
    "check": "npm run lint && npm run test && npm run build"
  }
}
~~~

TypeScript는 strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitOverride를 켭니다. Vite는 react plugin과 base: './'를 사용하여 하위 경로 정적 호스팅에서도 상대 asset을 읽게 합니다. index.html의 lang은 ko, title은 규칙 단위 기관실로 설정합니다.

- [ ] **Step 2: 실패하는 앱 셸 테스트를 작성합니다**

~~~tsx
it('한국어 이름이 있는 main landmark를 제공한다', () => {
  render(<App />);
  expect(
    screen.getByRole('main', { name: '규칙 단위 기관실' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '규칙 단위 기관실' })).toBeInTheDocument();
});
~~~

- [ ] **Step 3: 테스트가 실패하는지 확인합니다**

Run: npm test -- tests/components/appShell.test.tsx

Expected: FAIL. src/App.tsx가 없거나 이름이 있는 main landmark를 찾지 못했다는 메시지가 나옵니다.

- [ ] **Step 4: 최소 앱 셸을 구현합니다**

~~~tsx
export default function App(): JSX.Element {
  return (
    <main aria-label="규칙 단위 기관실">
      <h1>규칙 단위 기관실</h1>
    </main>
  );
}
~~~

main.tsx는 StrictMode 안에서 App을 root 요소에 마운트합니다. tokens.css와 base.css는 light color-scheme을 기본으로 하며 시스템 다크 모드에서도 밝은 학습 화면을 유지합니다.

- [ ] **Step 5: 앱 셸과 크기 게이트를 통과시킵니다**

source-size.test.ts는 src, tests, scripts, *.config.* 파일을 재귀 탐색하고 500줄 이상인 경로 목록이 빈 배열인지 검사합니다.

Run: npm test -- tests/components/appShell.test.tsx tests/architecture/source-size.test.ts

Expected: 2 test files PASS, oversized source 목록 0개.

- [ ] **Step 6: 정적 검사와 빌드를 확인합니다**

Run: npm run lint

Expected: 종료 코드 0, warning 0개.

Run: npm run build

Expected: TypeScript 오류 없이 dist/index.html과 해시가 붙은 JS·CSS가 생성됩니다.

- [ ] **Step 7: 기반 작업을 커밋합니다**

~~~bash
git add .gitignore package.json package-lock.json index.html vite.config.ts vitest.config.ts eslint.config.js tsconfig.json tsconfig.app.json tsconfig.node.json src/main.tsx src/App.tsx src/styles/tokens.css src/styles/base.css tests/setup.ts tests/components/appShell.test.tsx tests/architecture/source-size.test.ts 2026-08-26-pattern-unit-engine-room-design.md 2026-08-26-pattern-unit-engine-room-implementation-plan.md
git commit -m "chore: scaffold pattern unit engine room"
~~~

Expected: 테스트·빌드가 통과한 기반 파일과 두 설계 문서만 포함한 첫 커밋 1개.

### Task 2: 최소 반복 단위와 빈칸 예측 도메인

**Files:**
- Create: src/domain/pattern/types.ts
- Create: src/domain/pattern/repetition.ts
- Create: src/domain/pattern/continuation.ts
- Create: tests/unit/repetition.test.ts
- Create: tests/unit/continuation.test.ts

**Interfaces:**
- Consumes: PatternTokenId, PatternSlot, PatternUnit, PatternValidation
- Produces: findShortestRepeatingUnit(sequence: readonly PatternTokenId[]): PatternTokenId[] | null
- Produces: repeatUnit(unit: PatternUnit, repeatCount: number): PatternTokenId[]
- Produces: validateUnitChoice(sequence: readonly PatternTokenId[], candidate: PatternUnit): PatternValidation
- Produces: expectedTokensForSlots(unit: PatternUnit, slots: readonly PatternSlot[]): PatternTokenId[]
- Produces: validateContinuation(unit: PatternUnit, slots: readonly PatternSlot[], answer: PatternUnit): PatternValidation

- [ ] **Step 1: 최소 단위 실패 테스트를 작성합니다**

~~~typescript
it.each([
  [['A', 'B', 'A', 'B', 'A', 'B'], ['A', 'B']],
  [['A', 'A', 'B', 'A', 'A', 'B'], ['A', 'A', 'B']],
  [['A', 'B', 'B', 'A', 'B', 'B'], ['A', 'B', 'B']],
  [['A', 'B', 'C', 'A', 'B', 'C'], ['A', 'B', 'C']],
])('가장 짧은 반복 단위를 반환한다', (sequence, expected) => {
  expect(findShortestRepeatingUnit(sequence)).toEqual(expected);
});

it('더 긴 반복 후보를 정답으로 인정하지 않는다', () => {
  expect(validateUnitChoice(['A', 'B', 'A', 'B'], ['A', 'B', 'A', 'B'])).toMatchObject({
    ok: false,
    reason: 'not-shortest',
    expectedUnit: ['A', 'B'],
  });
});
~~~

- [ ] **Step 2: 최소 단위 테스트의 실패를 확인합니다**

Run: npm test -- tests/unit/repetition.test.ts

Expected: FAIL. findShortestRepeatingUnit와 validateUnitChoice export가 존재하지 않습니다.

- [ ] **Step 3: 가능한 길이를 1부터 검사하는 최소 구현을 작성합니다**

~~~typescript
export function findShortestRepeatingUnit(
  sequence: readonly PatternTokenId[],
): PatternTokenId[] | null {
  for (let length = 1; length <= Math.floor(sequence.length / 2); length += 1) {
    if (sequence.length % length !== 0) continue;
    const unit = sequence.slice(0, length);
    const repeats = sequence.every((token, index) => token === unit[index % length]);
    if (repeats) return unit;
  }
  return null;
}
~~~

빈 배열, 한 항, 끝까지 나누어지지 않는 배열은 null로 처리합니다. validateUnitChoice는 전체 반복 가능 여부를 먼저 확인한 뒤 최소 단위와 candidate의 길이·순서를 비교합니다.

- [ ] **Step 4: 최소 단위 테스트를 통과시킵니다**

Run: npm test -- tests/unit/repetition.test.ts

Expected: AB·AAB·ABB·ABC, 비반복 배열, 너무 긴 후보를 포함한 모든 case PASS.

- [ ] **Step 5: 부분 빈칸 실패 테스트를 작성합니다**

~~~typescript
it('한 칸과 두 칸의 기대 항을 원래 인덱스로 계산한다', () => {
  expect(expectedTokensForSlots(['A', 'B', 'C'], ['A', 'B', 'C', 'A', 'B', null])).toEqual(['C']);
  expect(expectedTokensForSlots(['A', 'B', 'B'], ['A', 'B', 'B', 'A', null, null])).toEqual(['B', 'B']);
});

it('보이는 항이 단위와 맞지 않으면 이어 붙이기를 승인하지 않는다', () => {
  expect(validateContinuation(['A', 'B'], ['A', 'A', null], ['B'])).toMatchObject({
    ok: false,
    reason: 'does-not-repeat',
  });
});
~~~

- [ ] **Step 6: 테스트 실패 후 최소 구현하고 통과시킵니다**

Run: npm test -- tests/unit/continuation.test.ts

Expected before implementation: FAIL with missing expectedTokensForSlots export.

빈칸 인덱스마다 unit[index % unit.length]를 계산하고, 보이는 항이 같은 식과 어긋나면 does-not-repeat를 반환합니다.

Run: npm test -- tests/unit/repetition.test.ts tests/unit/continuation.test.ts

Expected after implementation: 두 파일의 모든 test PASS.

- [ ] **Step 7: 도메인 작업을 커밋합니다**

~~~bash
git add src/domain/pattern/types.ts src/domain/pattern/repetition.ts src/domain/pattern/continuation.ts tests/unit/repetition.test.ts tests/unit/continuation.test.ts
git commit -m "feat: add repetition and continuation rules"
~~~

### Task 3: 오류 위치와 교체 항 판정

**Files:**
- Create: src/domain/pattern/repair.ts
- Create: tests/unit/repair.test.ts

**Interfaces:**
- Consumes: PatternTokenId, PatternUnit, PatternValidation
- Produces: findMismatchIndices(sequence: readonly PatternTokenId[], unit: PatternUnit): number[]
- Produces: validateRepair(sequence: readonly PatternTokenId[], unit: PatternUnit, selectedIndex: number, replacement: PatternTokenId): PatternValidation

- [ ] **Step 1: 위치와 교체를 따로 검증하는 실패 테스트를 작성합니다**

~~~typescript
it('규칙을 깨뜨린 0-based 인덱스를 한 개 찾는다', () => {
  expect(findMismatchIndices(['A', 'B', 'A', 'A', 'A', 'B'], ['A', 'B'])).toEqual([3]);
});

it('맞는 위치에 맞는 항을 넣을 때만 승인한다', () => {
  expect(validateRepair(['A', 'B', 'A', 'A', 'A', 'B'], ['A', 'B'], 3, 'B')).toMatchObject({
    ok: true,
    reason: 'matches',
  });
  expect(validateRepair(['A', 'B', 'A', 'A', 'A', 'B'], ['A', 'B'], 2, 'B')).toMatchObject({
    ok: false,
    reason: 'wrong-position',
  });
  expect(validateRepair(['A', 'B', 'A', 'A', 'A', 'B'], ['A', 'B'], 3, 'C')).toMatchObject({
    ok: false,
    reason: 'wrong-replacement',
  });
});
~~~

- [ ] **Step 2: 테스트가 missing module로 실패하는지 확인합니다**

Run: npm test -- tests/unit/repair.test.ts

Expected: FAIL. src/domain/pattern/repair.ts를 찾지 못합니다.

- [ ] **Step 3: mismatch 인덱스와 기대 항으로 최소 구현합니다**

findMismatchIndices는 token !== unit[index % unit.length]인 인덱스만 반환합니다. validateRepair는 mismatch가 정확히 하나인지, selectedIndex가 그 위치인지, replacement가 unit[selectedIndex % unit.length]인지 순서대로 검사합니다.

~~~typescript
const expectedToken = unit[selectedIndex % unit.length];
if (selectedIndex !== mismatchIndices[0]) {
  return { ok: false, reason: 'wrong-position', mismatchIndices };
}
if (replacement !== expectedToken) {
  return {
    ok: false,
    reason: 'wrong-replacement',
    mismatchIndices,
    expectedTokens: [expectedToken],
  };
}
return { ok: true, reason: 'matches', mismatchIndices };
~~~

- [ ] **Step 4: 5개 수리 배열을 모두 통과시킵니다**

Run: npm test -- tests/unit/repair.test.ts

Expected: 설계된 다섯 broken sequence의 기대 위치와 교체 항, 잘못된 위치, 잘못된 교체, 오류가 0개 또는 2개인 방어 case가 모두 PASS.

- [ ] **Step 5: 수리 판정을 커밋합니다**

~~~bash
git add src/domain/pattern/repair.ts tests/unit/repair.test.ts
git commit -m "feat: add pattern repair validation"
~~~

### Task 4: 외형 번역과 자유 규칙 판정

**Files:**
- Create: src/domain/pattern/translation.ts
- Create: src/domain/pattern/freePattern.ts
- Create: tests/unit/translation.test.ts
- Create: tests/unit/freePattern.test.ts

**Interfaces:**
- Consumes: PatternTokenId, PatternUnit, PatternValidation, TranslationPair, FreePatternValidation
- Produces: validateTranslation<TTarget extends string>(sourceSequence: readonly PatternTokenId[], pairs: readonly TranslationPair<TTarget>[], translated: readonly TTarget[]): PatternValidation
- Produces: validateFreeTrack(track: readonly PatternTokenId[]): FreePatternValidation

- [ ] **Step 1: 번역 판정 실패 테스트를 작성합니다**

~~~typescript
const pairs = [
  { source: 'A', target: 'train' },
  { source: 'B', target: 'star' },
] as const;

it('일대일 대응과 원래 순서를 함께 지키면 승인한다', () => {
  expect(validateTranslation(['A', 'B', 'A', 'B'], pairs, ['train', 'star', 'train', 'star']))
    .toMatchObject({ ok: true, reason: 'matches' });
});

it('서로 다른 원래 항을 같은 새 항에 대응시키면 거절한다', () => {
  const duplicatePairs = [
    { source: 'A', target: 'train' },
    { source: 'B', target: 'train' },
  ] as const;
  expect(validateTranslation(['A', 'B'], duplicatePairs, ['train', 'train']))
    .toMatchObject({ ok: false, reason: 'mapping-not-bijective' });
});

it('대응은 맞아도 순서가 바뀌면 거절한다', () => {
  expect(validateTranslation(['A', 'B'], pairs, ['star', 'train']))
    .toMatchObject({ ok: false, reason: 'order-changed' });
});
~~~

- [ ] **Step 2: 번역 테스트가 실패하는지 확인하고 최소 구현합니다**

Run: npm test -- tests/unit/translation.test.ts

Expected: 구현 전에는 missing validateTranslation export로 FAIL.

구현은 sourceSequence에 실제 등장하는 고유 ID마다 정확히 한 pair가 있는지, target 값이 서로 다른지, source 순서로 매핑한 결과와 translated가 같은지를 검사합니다.

Run: npm test -- tests/unit/translation.test.ts

Expected: 구현 뒤에는 정답·중복 대응·누락 대응·순서 변경 case PASS.

- [ ] **Step 3: 자유 규칙 실패 테스트를 작성합니다**

~~~typescript
it.each([
  [['A', 'B'], false, 'needs-second-repeat', 1],
  [['A', 'B', 'A', 'B'], true, 'matches', 2],
  [['A', 'A', 'B', 'A', 'A', 'B'], true, 'matches', 2],
  [['A', 'A', 'A', 'A'], false, 'unit-needs-two-symbols', 4],
  [['A', 'B', 'C', 'A', 'B'], false, 'does-not-repeat', 0],
])('자유 선로의 반복 조건을 판정한다', (track, ok, reason, repeatCount) => {
  expect(validateFreeTrack(track)).toMatchObject({ ok, reason, repeatCount });
});
~~~

- [ ] **Step 4: 자유 규칙 최소 구현 후 테스트를 통과시킵니다**

Run: npm test -- tests/unit/freePattern.test.ts

Expected: 구현 전에는 missing validateFreeTrack export로 FAIL.

구현은 길이 2~3의 비반복 track을 학생이 아직 한 번만 붙인 단위로 해석하여 needs-second-repeat와 repeatCount 1을 반환합니다. 길이 4 이상에서는 findShortestRepeatingUnit을 재사용하고, 단위 길이 2~3, 서로 다른 ID 2개 이상, repeatCount 2 이상을 차례로 확인합니다.

Run: npm test -- tests/unit/translation.test.ts tests/unit/freePattern.test.ts

Expected: 구현 뒤에는 두 파일의 모든 test PASS.

- [ ] **Step 5: 번역과 자유 규칙 판정을 커밋합니다**

~~~bash
git add src/domain/pattern/translation.ts src/domain/pattern/freePattern.ts tests/unit/translation.test.ts tests/unit/freePattern.test.ts
git commit -m "feat: validate translation and free patterns"
~~~

### Task 5: 미션 20개, Journey 5개, 시각 토큰과 문구

**Files:**
- Create: src/content/missions/types.ts
- Create: src/content/missions/findMissions.ts
- Create: src/content/missions/continueMissions.ts
- Create: src/content/missions/repairMissions.ts
- Create: src/content/missions/translateMissions.ts
- Create: src/content/missions/journeys.ts
- Create: src/content/missions/index.ts
- Create: src/content/tokenThemes.ts
- Create: src/content/copy.ts
- Create: tests/unit/missionCatalog.test.ts
- Create: tests/unit/tokenThemes.test.ts
- Create: tests/unit/copy.test.ts

**Interfaces:**
- Produces: MissionKind = 'find' | 'continue' | 'repair' | 'translate'
- Produces: FindMission, ContinueMission, RepairMission, TranslateMission, Mission
- Produces: JourneyIndex = 0 | 1 | 2 | 3 | 4
- Produces: Journey { readonly index: JourneyIndex; readonly findId: string; readonly continueId: string; readonly repairId: string; readonly translateId: string }
- Produces: getMission(id: string): Mission
- Produces: getJourney(index: JourneyIndex): Journey
- Produces: DisplayTokenId, PatternMarkId, TokenVisual, TokenTheme, getTokenVisual(themeId, tokenId)
- Produces: COPY: Readonly<Record<CopyKey, string>>

- [ ] **Step 1: 카탈로그 무결성 실패 테스트를 작성합니다**

~~~typescript
it('미션 종류별 5개와 구조별 5개를 제공한다', () => {
  expect(MISSIONS).toHaveLength(20);
  expect(countBy(MISSIONS, mission => mission.kind)).toEqual({
    find: 5,
    continue: 5,
    repair: 5,
    translate: 5,
  });
  expect(countBy(MISSIONS, mission => mission.structure)).toEqual({
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
~~~

- [ ] **Step 2: 카탈로그 테스트가 실패하는지 확인합니다**

Run: npm test -- tests/unit/missionCatalog.test.ts

Expected: FAIL. MISSIONS와 mission type module이 존재하지 않습니다.

- [ ] **Step 3: 위 미션 카탈로그 명세를 그대로 데이터로 구현합니다**

~~~typescript
export interface MissionBase {
  readonly id: string;
  readonly structure: PatternStructure;
  readonly unit: PatternUnit;
  readonly themeId: TokenThemeId;
  readonly instructionKey: CopyKey;
}

export interface FindMission extends MissionBase {
  readonly kind: 'find';
  readonly sequence: PatternUnit;
  readonly candidates: readonly PatternUnit[];
}

export interface ContinueMission extends MissionBase {
  readonly kind: 'continue';
  readonly slots: readonly PatternSlot[];
  readonly choices: readonly PatternUnit[];
}

export interface RepairMission extends MissionBase {
  readonly kind: 'repair';
  readonly brokenSequence: PatternUnit;
  readonly replacementChoices: readonly PatternTokenId[];
}

export interface TranslateMission extends MissionBase {
  readonly kind: 'translate';
  readonly sourceSequence: PatternUnit;
  readonly targetThemeId: TokenThemeId;
  readonly targetPool: readonly DisplayTokenId[];
  readonly correctPairs: readonly TranslationPair<DisplayTokenId>[];
}

export type Mission =
  | FindMission
  | ContinueMission
  | RepairMission
  | TranslateMission;
~~~

correctCandidateIndex나 정답 boolean을 중복 저장하지 않고 Task 2~4 도메인 함수로 정답을 계산합니다. CopyKey는 keyof typeof COPY로 정의하여 mission instructionKey와 copy.ts의 실제 키가 어긋나면 TypeScript build가 실패하게 합니다.

- [ ] **Step 4: Journey와 카탈로그 테스트를 통과시킵니다**

Run: npm test -- tests/unit/missionCatalog.test.ts

Expected: 총 20개, 종류별 5개, 구조별 5개, Journey마다 네 종류 정확히 한 개, 중복·누락 ID 0개, 모든 정답 1개.

- [ ] **Step 5: 색과 분리된 시각 토큰 실패 테스트를 작성합니다**

~~~typescript
it('각 토큰은 이름·SVG 아이콘·무늬를 모두 가진다', () => {
  for (const theme of TOKEN_THEMES) {
    for (const visual of Object.values(theme.tokens)) {
      expect(visual.labelKo.length).toBeGreaterThan(0);
      expect(visual.iconId.length).toBeGreaterThan(0);
      expect(visual.patternMarkId.length).toBeGreaterThan(0);
    }
    expect(new Set(Object.values(theme.tokens).map(token => token.iconId)).size).toBe(3);
    expect(new Set(Object.values(theme.tokens).map(token => token.patternMarkId)).size).toBe(3);
  }
});
~~~

DisplayTokenId, TokenThemeId, PatternMarkId는 고정 도메인 계약 아래의 시각 콘텐츠 계약을 그대로 사용합니다. 모든 SVG는 TokenIcon.tsx에서 로컬 path로 렌더링하며 외부 이미지 URL을 갖지 않습니다.

- [ ] **Step 6: 짧고 비경쟁적인 문구를 구현하고 검사합니다**

COPY에는 다음 핵심 문구를 정확히 포함합니다.

~~~typescript
export const COPY = {
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
} as const;
~~~

copy.test.ts는 안내 문구 32자 이하, 금지된 점수·순위·속도 표현 0개, 증가·곱셈·분류·열 묶음 활동 문구 0개를 확인합니다.

Run: npm test -- tests/unit/tokenThemes.test.ts tests/unit/copy.test.ts

Expected: 모든 theme가 색 외 3개 채널을 갖고 모든 핵심 안내가 길이·정서 안전 조건을 통과합니다.

- [ ] **Step 7: 콘텐츠를 커밋합니다**

~~~bash
git add src/content/missions src/content/tokenThemes.ts src/content/copy.ts tests/unit/missionCatalog.test.ts tests/unit/tokenThemes.test.ts tests/unit/copy.test.ts
git commit -m "feat: add mission catalog and visual tokens"
~~~

### Task 6: 안내 운행 세션 상태와 학습 증거

**Files:**
- Create: src/features/session/types.ts
- Create: src/features/session/reducer.ts
- Create: src/features/session/selectors.ts
- Create: tests/unit/sessionReducer.test.ts

**Interfaces:**
- Consumes: getJourney, getMission, Task 2~4 판정 함수
- Produces: SessionStage = 'start' | 'find' | 'continue' | 'repair' | 'translate' | 'create-unit' | 'create-track' | 'summary'
- Produces: LearningEvidenceKind = 'unit-recognized' | 'continued' | 'repaired' | 'translated' | 'created'
- Produces: LearningEvidence { kind: LearningEvidenceKind; missionId: string; hintUsed: boolean }
- Produces: AccessibilitySettings { audioEnabled: boolean; motionPreference: 'system' | 'reduce'; patternContrast: 'standard' | 'strong'; persistenceEnabled: boolean }
- Produces: SessionState와 SessionAction 판별 유니온
- Produces: createInitialSession(): SessionState
- Produces: sessionReducer(state: SessionState, action: SessionAction): SessionState

~~~typescript
export interface LearningEvidence {
  readonly kind: LearningEvidenceKind;
  readonly missionId: string;
  readonly hintUsed: boolean;
}

export interface AccessibilitySettings {
  readonly audioEnabled: boolean;
  readonly motionPreference: 'system' | 'reduce';
  readonly patternContrast: 'standard' | 'strong';
  readonly persistenceEnabled: boolean;
}

export interface FeedbackState {
  readonly status: 'retry' | 'success';
  readonly reason: ValidationReason;
  readonly hintVisible: boolean;
}

export interface SessionState {
  readonly stage: SessionStage;
  readonly journeyIndex: JourneyIndex;
  readonly feedback: FeedbackState | null;
  readonly selectedRepairIndex: number | null;
  readonly freeUnit: PatternTokenId[];
  readonly freeTrack: PatternTokenId[];
  readonly evidence: LearningEvidence[];
  readonly currentHintUsed: boolean;
  readonly settings: AccessibilitySettings;
}
~~~

- [ ] **Step 1: 단계 전이와 오답 비진행 실패 테스트를 작성합니다**

~~~typescript
it('정답일 때만 핵심 흐름 순서대로 진행한다', () => {
  let state = createInitialSession();
  state = sessionReducer(state, { type: 'START_JOURNEY' });
  expect(state.stage).toBe('find');

  const unchanged = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A'] });
  expect(unchanged.stage).toBe('find');
  expect(unchanged.feedback?.reason).toBe('does-not-repeat');

  state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A', 'B'] });
  expect(state.feedback?.reason).toBe('matches');
  state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
  expect(state.stage).toBe('continue');
});

it('오답 횟수나 점수 필드를 상태에 만들지 않는다', () => {
  const serialized = JSON.stringify(createInitialSession());
  expect(serialized).not.toMatch(/attempt|score|streak|rank|speed/i);
});
~~~

- [ ] **Step 2: reducer 테스트가 실패하는지 확인합니다**

Run: npm test -- tests/unit/sessionReducer.test.ts

Expected: FAIL. createInitialSession과 sessionReducer가 존재하지 않습니다.

- [ ] **Step 3: 정확한 이벤트 유니온과 최소 리듀서를 구현합니다**

~~~typescript
export type SessionAction =
  | { readonly type: 'START_JOURNEY' }
  | { readonly type: 'SUBMIT_FIND'; readonly candidate: PatternUnit }
  | { readonly type: 'SUBMIT_CONTINUATION'; readonly answer: PatternUnit }
  | { readonly type: 'SELECT_REPAIR_INDEX'; readonly index: number }
  | { readonly type: 'SUBMIT_REPAIR'; readonly replacement: PatternTokenId }
  | { readonly type: 'SUBMIT_TRANSLATION'; readonly pairs: readonly TranslationPair<DisplayTokenId>[]; readonly translated: readonly DisplayTokenId[] }
  | { readonly type: 'USE_HINT' }
  | { readonly type: 'CONTINUE_STAGE' }
  | { readonly type: 'ADD_FREE_TOKEN'; readonly token: PatternTokenId }
  | { readonly type: 'REMOVE_FREE_TOKEN' }
  | { readonly type: 'LOCK_FREE_UNIT' }
  | { readonly type: 'APPEND_FREE_UNIT' }
  | { readonly type: 'SUBMIT_FREE_TRACK' }
  | { readonly type: 'NEXT_JOURNEY' }
  | { readonly type: 'RETURN_HOME' }
  | { readonly type: 'UPDATE_SETTINGS'; readonly settings: AccessibilitySettings };
~~~

정답 제출은 feedback과 evidence를 갱신하고, CONTINUE_STAGE만 다음 화면으로 이동시킵니다. 같은 evidence는 한 번만 추가합니다. USE_HINT는 현재 단계의 hintUsed를 true로 만들되 실패로 기록하지 않습니다.

- [ ] **Step 4: 전체 전이와 5개 학습 증거를 통과시킵니다**

Run: npm test -- tests/unit/sessionReducer.test.ts

Expected: start → find → continue → repair → translate → create-unit → create-track → summary 전이, 오답 시 제자리, 힌트 전략 기록, Journey 4 다음 Journey 0 순환, 점수성 필드 부재가 모두 PASS.

- [ ] **Step 5: 세션 상태를 커밋합니다**

~~~bash
git add src/features/session/types.ts src/features/session/reducer.ts src/features/session/selectors.ts tests/unit/sessionReducer.test.ts
git commit -m "feat: add guided learning session reducer"
~~~

### Task 7: 접근 가능한 조작 기본 컴포넌트

**Files:**
- Create: src/components/AppShell.tsx
- Create: src/components/InstructionCard.tsx
- Create: src/components/PatternBoard.tsx
- Create: src/components/PatternCell.tsx
- Create: src/components/TokenIcon.tsx
- Create: src/components/ChoiceGrid.tsx
- Create: src/components/PrimaryAction.tsx
- Create: src/components/FeedbackPanel.tsx
- Create: tests/components/patternBoard.test.tsx
- Create: tests/components/choiceGrid.test.tsx
- Create: tests/components/pulseAction.test.tsx

**Interfaces:**
- Produces: formatCellAriaLabel(index: number, visual: TokenVisual): string
- Produces: PatternBoardProps { slots; themeId; activeIndices?; selectedIndex?; onSelect? }
- Produces: ChoiceGridProps<T> { label; choices; selectedId; getId; renderChoice; getAccessibleName; onSelect }
- Produces: PulseActionKind = 'find-unit' | 'run'
- Produces: PrimaryActionProps { children; onClick; disabled?; pulseKind?: PulseActionKind }

- [ ] **Step 1: 순서·모양·무늬 이름 실패 테스트를 작성합니다**

~~~tsx
it('각 칸을 순서와 비색상 정보로 읽는다', () => {
  render(<PatternBoard slots={['A', 'B']} themeId="engine" />);
  expect(screen.getByRole('list', { name: '규칙 배열' })).toBeInTheDocument();
  expect(screen.getByLabelText('첫째 칸, 톱니바퀴 모양, 점무늬')).toBeInTheDocument();
  expect(screen.getByLabelText('둘째 칸, 나사못 모양, 줄무늬')).toBeInTheDocument();
});
~~~

- [ ] **Step 2: 컴포넌트 부재로 실패하는지 확인합니다**

Run: npm test -- tests/components/patternBoard.test.tsx

Expected: FAIL. PatternBoard module을 찾지 못합니다.

- [ ] **Step 3: ol·li·button 기반 최소 컴포넌트를 구현합니다**

선택 가능한 칸은 button, 읽기 전용 칸은 aria-label이 있는 li 내부 span으로 렌더링합니다. 빈칸은 “여섯째 칸, 빈칸”처럼 읽습니다. TokenIcon은 aria-hidden이고 의미는 칸의 이름 한 곳에서만 제공합니다.

~~~typescript
const ORDINALS = ['첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째', '일곱째', '여덟째', '아홉째'] as const;

export function formatCellAriaLabel(index: number, visual: TokenVisual): string {
  const ordinal = ORDINALS[index] ?? String(index + 1) + '번째';
  return ordinal + ' 칸, ' + visual.labelKo + ' 모양, ' + visual.patternLabelKo;
}
~~~

- [ ] **Step 4: 선택지 제한과 키보드 버튼 테스트를 작성합니다**

ChoiceGrid는 choices.length가 5 이상이면 개발·테스트 환경에서 오류를 던지고, 모든 선택지를 native button으로 렌더링합니다. selected 항목에는 aria-pressed=true를 둡니다.

Run: npm test -- tests/components/patternBoard.test.tsx tests/components/choiceGrid.test.tsx

Expected: 칸 이름, Tab 초점, Enter·Space 선택, 최대 4개 방어 case PASS.

- [ ] **Step 5: gi-pulse 제한 실패 테스트를 작성합니다**

~~~tsx
it('허용된 두 행동만 pulse API로 표현한다', () => {
  const { rerender } = render(
    <PrimaryAction pulseKind="find-unit" onClick={vi.fn()}>한 묶음 찾기</PrimaryAction>,
  );
  expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveClass('gi-pulse');
  rerender(<PrimaryAction pulseKind="run" onClick={vi.fn()}>운행하기</PrimaryAction>);
  expect(screen.getByRole('button', { name: '운행하기' })).toHaveClass('gi-pulse');
});
~~~

PulseActionKind를 두 literal로 제한하여 다른 화면이 gi-pulse를 임의 사용하지 못하게 합니다.
PrimaryAction은 활성 상태에 data-primary-action="true"를 출력하여 화면별 주 행동 수를 E2E에서 검사할 수 있게 합니다.

Run: npm test -- tests/components/pulseAction.test.tsx

Expected: 두 허용 버튼에만 gi-pulse class가 있고 disabled일 때 animation class가 제거됩니다.

- [ ] **Step 6: 기본 컴포넌트를 커밋합니다**

~~~bash
git add src/components/AppShell.tsx src/components/InstructionCard.tsx src/components/PatternBoard.tsx src/components/PatternCell.tsx src/components/TokenIcon.tsx src/components/ChoiceGrid.tsx src/components/PrimaryAction.tsx src/components/FeedbackPanel.tsx tests/components/patternBoard.test.tsx tests/components/choiceGrid.test.tsx tests/components/pulseAction.test.tsx
git commit -m "feat: add accessible pattern interaction primitives"
~~~

### Task 8: 단위 찾기와 이어 붙이기 화면

**Files:**
- Create: src/features/start/StartScreen.tsx
- Create: src/features/find/FindUnitScreen.tsx
- Create: src/features/continue/ContinuePatternScreen.tsx
- Create: tests/components/startScreen.test.tsx
- Create: tests/components/findUnitScreen.test.tsx
- Create: tests/components/continuePatternScreen.test.tsx
- Modify: src/App.tsx

**Interfaces:**
- Consumes: SessionState, SessionAction, PatternBoard, ChoiceGrid, PrimaryAction, FeedbackPanel
- Produces: StartScreenProps { settings; onStart; onOpenSettings }
- Produces: FindUnitScreenProps { mission; feedback; onSubmit; onHint; onContinue }
- Produces: ContinuePatternScreenProps { mission; feedback; onSubmit; onContinue }

- [ ] **Step 1: 최소 단위 학습 화면 실패 테스트를 작성합니다**

~~~tsx
it('긴 후보를 고르면 단위 테두리 힌트 뒤 다시 선택할 수 있다', async () => {
  const user = userEvent.setup();
  render(<FindHarness missionId="find-ab-engine" />);
  await user.click(screen.getByRole('button', { name: /후보 3/ }));
  await user.click(screen.getByRole('button', { name: '한 묶음 찾기' }));
  expect(screen.getByText('되풀이되지만 더 짧은 한 묶음이 있어요.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '테두리 도움 보기' })).toBeInTheDocument();
  expect(screen.queryByText(/0점|실패|연속/)).not.toBeInTheDocument();
});
~~~

- [ ] **Step 2: 실패를 확인하고 찾기 화면을 최소 구현합니다**

Run: npm test -- tests/components/startScreen.test.tsx tests/components/findUnitScreen.test.tsx

Expected before implementation: FAIL with missing StartScreen 또는 FindUnitScreen module.

Find 화면은 후보를 먼저 선택하게 하고 선택 전 “한 묶음 찾기”를 disabled로 둡니다. 선택 뒤 이 버튼만 pulseKind=find-unit을 받습니다. 오답이면 배열을 expectedUnit 길이의 색 아닌 굵은 테두리로 나누고 포커스를 피드백 heading으로 옮기지 않으며 aria-live=polite로 알립니다.

Run: npm test -- tests/components/startScreen.test.tsx tests/components/findUnitScreen.test.tsx

Expected after implementation: 시작 버튼, 후보 3개, 긴 후보 피드백, 힌트 전략, 정답 뒤 “다음 칸” 노출 case PASS.

- [ ] **Step 3: 한 칸·두 칸 이어 붙이기 실패 테스트를 작성합니다**

~~~tsx
it.each([
  ['continue-aab-tools', /나사못 한 칸/, '이어 붙이기'],
  ['continue-abb-lights', /깃발, 깃발 두 칸/, '이어 붙이기'],
])('빈칸 수와 맞는 선택으로 진행한다', async (missionId, answerName, submitName) => {
  const user = userEvent.setup();
  render(<ContinueHarness missionId={missionId} />);
  await user.click(screen.getByRole('button', { name: answerName }));
  await user.click(screen.getByRole('button', { name: submitName }));
  expect(screen.getByText('한 묶음으로 다음 칸을 이었어요.')).toBeInTheDocument();
});
~~~

- [ ] **Step 4: 이어 붙이기 최소 구현 후 두 화면을 통합합니다**

Continue 화면은 빈칸을 그대로 표시하고 3개 이하의 후보 버튼으로 한 번에 채웁니다. App.tsx는 현재 stage에 따라 Start, Find, Continue를 렌더링하고 모든 판정은 reducer action으로 전달합니다.

Run: npm test -- tests/components/startScreen.test.tsx tests/components/findUnitScreen.test.tsx tests/components/continuePatternScreen.test.tsx tests/unit/sessionReducer.test.ts

Expected: 화면과 reducer가 같은 mission ID와 reason을 사용하며 모든 test PASS.

- [ ] **Step 5: 두 학습 단계를 커밋합니다**

~~~bash
git add src/features/start/StartScreen.tsx src/features/find/FindUnitScreen.tsx src/features/continue/ContinuePatternScreen.tsx src/App.tsx tests/components/startScreen.test.tsx tests/components/findUnitScreen.test.tsx tests/components/continuePatternScreen.test.tsx
git commit -m "feat: add unit finding and continuation missions"
~~~

### Task 9: 오류 수리와 외형 번역 화면

**Files:**
- Create: src/features/repair/RepairPatternScreen.tsx
- Create: src/features/translate/TranslatePatternScreen.tsx
- Create: tests/components/repairPatternScreen.test.tsx
- Create: tests/components/translatePatternScreen.test.tsx
- Modify: src/App.tsx

**Interfaces:**
- Consumes: validateRepair, validateTranslation, PatternBoard, ChoiceGrid, SessionAction
- Produces: RepairPatternScreenProps { mission; selectedIndex; feedback; onSelectIndex; onSubmit; onContinue }
- Produces: TranslatePatternScreenProps { mission; draftPairs; feedback; onChangePair; onSubmit; onContinue }

- [ ] **Step 1: 위치를 먼저 고르는 수리 실패 테스트를 작성합니다**

~~~tsx
it('칸 선택 뒤 교체 항을 눌러 한 오류만 수리한다', async () => {
  const user = userEvent.setup();
  render(<RepairHarness missionId="repair-abb-lamps" />);
  await user.click(screen.getByRole('button', { name: /다섯째 칸/ }));
  await user.click(screen.getByRole('button', { name: /깃발 모양/ }));
  await user.click(screen.getByRole('button', { name: '고치기' }));
  expect(screen.getByText('규칙을 깨뜨린 칸을 고쳤어요.')).toBeInTheDocument();
});
~~~

- [ ] **Step 2: 실패를 확인하고 수리 화면을 구현합니다**

Run: npm test -- tests/components/repairPatternScreen.test.tsx

Expected before implementation: FAIL with missing RepairPatternScreen.

선택 가능한 배열 칸과 교체 후보는 native button이며, 잘못된 위치에는 흔들림·실패음 대신 기대 단위 테두리를 표시합니다. 오류 위치를 정답 전에 강제로 빨간색으로 노출하지 않습니다.

Run: npm test -- tests/components/repairPatternScreen.test.tsx

Expected after implementation: 키보드 칸 선택, 잘못된 위치 재시도, 맞는 위치·교체 승인 case PASS.

- [ ] **Step 3: 일대일 번역 실패 테스트를 작성합니다**

~~~tsx
it('같은 새 모양을 두 원래 항에 쓰면 수정 기회를 준다', async () => {
  const user = userEvent.setup();
  render(<TranslateHarness missionId="translate-ab-shapes" />);
  await chooseMapping(user, '톱니바퀴', '동그라미');
  await chooseMapping(user, '나사못', '동그라미');
  await user.click(screen.getByRole('button', { name: '같은 규칙 확인' }));
  expect(screen.getByText('서로 다른 항에는 서로 다른 새 모양을 골라요.')).toBeInTheDocument();
});

it('외형이 달라도 순서가 같으면 승인한다', async () => {
  const user = userEvent.setup();
  render(<TranslateHarness missionId="translate-ab-shapes" />);
  await chooseMapping(user, '톱니바퀴', '동그라미');
  await chooseMapping(user, '나사못', '세모');
  await user.click(screen.getByRole('button', { name: '같은 규칙 확인' }));
  expect(screen.getByText('모양은 달라도 같은 순서예요.')).toBeInTheDocument();
});
~~~

- [ ] **Step 4: 번역 화면을 구현하고 App에 연결합니다**

원래 ID별로 새 모양 하나를 고르는 작은 단계형 패널을 사용합니다. 현재 원래 항 하나와 target 후보 최대 3개만 보여 주며, 완료 뒤 오른쪽 배열을 생성하여 순서를 확인합니다.

Run: npm test -- tests/components/repairPatternScreen.test.tsx tests/components/translatePatternScreen.test.tsx tests/unit/translation.test.ts

Expected: 중복 대응, 순서 변경, 정답 대응, target 2개와 3개 미션 case PASS.

- [ ] **Step 5: 수리와 번역 화면을 커밋합니다**

~~~bash
git add src/features/repair/RepairPatternScreen.tsx src/features/translate/TranslatePatternScreen.tsx src/App.tsx tests/components/repairPatternScreen.test.tsx tests/components/translatePatternScreen.test.tsx
git commit -m "feat: add repair and translation missions"
~~~

### Task 10: 자유 규칙 만들기와 활동 도장

**Files:**
- Create: src/features/create/CreatePatternScreen.tsx
- Create: src/features/summary/SummaryScreen.tsx
- Create: tests/components/createPatternScreen.test.tsx
- Create: tests/components/summaryScreen.test.tsx
- Modify: src/App.tsx

**Interfaces:**
- Consumes: ADD_FREE_TOKEN, REMOVE_FREE_TOKEN, LOCK_FREE_UNIT, APPEND_FREE_UNIT, SUBMIT_FREE_TRACK, LearningEvidence
- Produces: CreatePatternScreenProps { mode: 'unit' | 'track'; unit; track; feedback; onAddToken; onRemoveToken; onLockUnit; onAppendUnit; onRun }
- Produces: SummaryScreenProps { evidence; journeyIndex; onNextJourney; onReturnHome }

- [ ] **Step 1: 한 묶음과 반복 선로를 나누는 실패 테스트를 작성합니다**

~~~tsx
it('2~3개 단위를 두 번 붙인 뒤에만 운행을 승인한다', async () => {
  const user = userEvent.setup();
  render(<CreateHarness />);
  await user.click(screen.getByRole('button', { name: /톱니바퀴/ }));
  await user.click(screen.getByRole('button', { name: /나사못/ }));
  await user.click(screen.getByRole('button', { name: '묶음 정하기' }));
  await user.click(screen.getByRole('button', { name: '한 묶음 붙이기' }));
  await user.click(screen.getByRole('button', { name: '운행하기' }));
  expect(screen.getByText('같은 묶음을 한 번 더 붙여 보세요.')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: '한 묶음 붙이기' }));
  await user.click(screen.getByRole('button', { name: '운행하기' }));
  expect(screen.getByText('내 규칙이 두 번 되풀이돼요.')).toBeInTheDocument();
});
~~~

- [ ] **Step 2: 실패를 확인하고 자유 규칙 화면을 구현합니다**

Run: npm test -- tests/components/createPatternScreen.test.tsx

Expected before implementation: FAIL with missing CreatePatternScreen.

unit mode에는 토큰 3개와 지우기만, track mode에는 “한 묶음 붙이기”, “다시 만들기”, “운행하기”만 제공합니다. 운행하기만 pulseKind=run을 사용합니다. 단일 기호만 반복하면 “두 가지 모양을 섞어 한 묶음을 만들어 보세요.”를 표시합니다.

Run: npm test -- tests/components/createPatternScreen.test.tsx

Expected after implementation: AB, AAB, ABB, ABC 승인, 한 번 반복·단일 기호·4칸 단위 거절, 선택지 4개 이하 PASS.

- [ ] **Step 3: 점수 없는 활동 도장 실패 테스트를 작성합니다**

~~~tsx
it('다섯 학습 행동만 보여 주고 경쟁 수치를 보여 주지 않는다', () => {
  render(<SummaryScreen evidence={COMPLETE_EVIDENCE} journeyIndex={0} onNextJourney={vi.fn()} onReturnHome={vi.fn()} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(5);
  expect(screen.getByText('가장 짧은 한 묶음 찾기')).toBeInTheDocument();
  expect(screen.getByText('다른 모습으로 같은 순서 만들기')).toBeInTheDocument();
  expect(screen.queryByText(/\d+점|순위|\d+초|연속 정답/)).not.toBeInTheDocument();
});
~~~

- [ ] **Step 4: Summary와 전체 stage를 App에 연결합니다**

Summary는 unit-recognized, continued, repaired, translated, created를 고정 순서로 표시하고 hintUsed가 있으면 “테두리 도움을 사용했어요”를 별도 전략 문장으로 표시합니다. “다음 운행”은 Journey를 순환하고 “처음으로”는 시작 화면으로 돌아갑니다.

Run: npm test -- tests/components/createPatternScreen.test.tsx tests/components/summaryScreen.test.tsx tests/unit/sessionReducer.test.ts

Expected: 다섯 증거, 전략 문장, Journey 순환, 경쟁 수치 부재가 모두 PASS.

- [ ] **Step 5: 자유 규칙과 요약을 커밋합니다**

~~~bash
git add src/features/create/CreatePatternScreen.tsx src/features/summary/SummaryScreen.tsx src/App.tsx tests/components/createPatternScreen.test.tsx tests/components/summaryScreen.test.tsx
git commit -m "feat: add free pattern creation and learning summary"
~~~

### Task 11: 선택형 로컬 음성 안내

**Files:**
- Create: src/content/audioGuides.ts
- Create: src/services/audioGuide.ts
- Create: src/components/AudioGuideButton.tsx
- Create: public/audio/ko/start.mp3
- Create: public/audio/ko/find.mp3
- Create: public/audio/ko/continue.mp3
- Create: public/audio/ko/repair.mp3
- Create: public/audio/ko/translate.mp3
- Create: public/audio/ko/create.mp3
- Create: public/audio/ko/complete.mp3
- Create: tests/unit/audioGuide.test.ts
- Create: tests/components/audioGuideButton.test.tsx
- Modify: src/components/InstructionCard.tsx

**Interfaces:**
- Produces: AudioCue = 'start' | 'find' | 'continue' | 'repair' | 'translate' | 'create' | 'complete'
- Produces: AudioGuideEntry { cue; src; transcriptKey }
- Produces: AudioPlayResult = 'played' | 'stopped' | 'unavailable'
- Produces: createAudioGuide(createElement?: () => HTMLAudioElement): { play(cue): Promise<AudioPlayResult>; stop(): AudioPlayResult }

| cue | 로컬 파일 | transcriptKey |
|---|---|---|
| start | audio/ko/start.mp3 | startTitle |
| find | audio/ko/find.mp3 | findInstruction |
| continue | audio/ko/continue.mp3 | continueInstruction |
| repair | audio/ko/repair.mp3 | repairInstruction |
| translate | audio/ko/translate.mp3 | translateInstruction |
| create | audio/ko/create.mp3 | createInstruction |
| complete | audio/ko/complete.mp3 | complete |

- [ ] **Step 1: 자동 재생 없는 서비스 실패 테스트를 작성합니다**

~~~typescript
it('사용자 요청이 있을 때만 같은 출처 음원을 재생한다', async () => {
  const audio = createMockAudio();
  const guide = createAudioGuide(() => audio.element);
  expect(audio.play).not.toHaveBeenCalled();
  await expect(guide.play('find')).resolves.toBe('played');
  expect(audio.element.src).toContain('/audio/ko/find.mp3');
  expect(audio.play).toHaveBeenCalledTimes(1);
});

it('재생 실패가 학습 흐름을 막지 않는다', async () => {
  const audio = createRejectingMockAudio();
  const guide = createAudioGuide(() => audio.element);
  await expect(guide.play('repair')).resolves.toBe('unavailable');
});
~~~

- [ ] **Step 2: 실패를 확인하고 서비스와 manifest를 구현합니다**

Run: npm test -- tests/unit/audioGuide.test.ts

Expected before implementation: FAIL with missing audioGuide module.

manifest src는 import.meta.env.BASE_URL과 audio/ko/ 내부 상대 경로만 결합합니다. play는 현재 음원을 중지·처음으로 되감은 뒤 재생하고, Promise rejection을 unavailable로 변환합니다.

- [ ] **Step 3: transcript가 항상 남는 컴포넌트 실패 테스트를 작성합니다**

~~~tsx
it('음성을 꺼도 같은 문자 안내를 유지한다', () => {
  render(<InstructionCard cue="find" audioEnabled={false} />);
  expect(screen.getByText('가장 짧게 되풀이되는 한 묶음을 골라요.')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '안내 듣기' })).not.toBeInTheDocument();
});
~~~

- [ ] **Step 4: 검수 음원과 버튼을 추가하고 검사합니다**

각 MP3의 발화는 COPY의 해당 문구와 문자 단위로 일치시킵니다. 배경음, 효과음, 학생 음성, 개인정보를 포함하지 않습니다. AudioGuideButton은 “안내 듣기”와 “안내 멈추기”를 aria-pressed로 표현합니다.

Run: file public/audio/ko/*.mp3

Expected: 7개 파일 모두 MPEG Layer III 또는 ID3가 있는 MP3로 판독됩니다.

Run: npm test -- tests/unit/audioGuide.test.ts tests/components/audioGuideButton.test.tsx

Expected: 자동 재생 0회, 선택 재생, 중지, 오류 fallback, transcript 상시 표시 case PASS.

- [ ] **Step 5: 음성 안내를 커밋합니다**

~~~bash
git add src/content/audioGuides.ts src/services/audioGuide.ts src/components/AudioGuideButton.tsx src/components/InstructionCard.tsx public/audio/ko tests/unit/audioGuide.test.ts tests/components/audioGuideButton.test.tsx
git commit -m "feat: add optional local audio guidance"
~~~

### Task 12: 접근성 설정과 동의 기반 로컬 이어 하기

**Files:**
- Create: src/services/progressStore.ts
- Create: src/features/settings/AccessibilitySettings.tsx
- Create: tests/unit/progressStore.test.ts
- Create: tests/components/accessibilitySettings.test.tsx
- Modify: src/features/session/types.ts
- Modify: src/features/session/reducer.ts
- Modify: src/features/start/StartScreen.tsx
- Modify: src/App.tsx

**Interfaces:**
- Produces: ResumeSnapshotV1 { journeyIndex; stage; completedKinds; freeUnit; freeTrack }
- Produces: PersistedProgressV1 { version: 1; consent: true; snapshot; settings }
- Produces: PROGRESS_KEY = 'pattern-unit-engine-room:v1'
- Produces: ProgressStore { load(): PersistedProgressV1 | null; save(value: PersistedProgressV1): void; clear(): void }
- Produces: createProgressStore(storage: Storage): ProgressStore
- Produces: persistSession(state: SessionState, store: ProgressStore): void
- Produces: disablePersistence(store: ProgressStore): void

~~~typescript
export interface ResumeSnapshotV1 {
  readonly journeyIndex: JourneyIndex;
  readonly stage: SessionStage;
  readonly completedKinds: readonly LearningEvidenceKind[];
  readonly freeUnit: readonly PatternTokenId[];
  readonly freeTrack: readonly PatternTokenId[];
}

export interface PersistedProgressV1 {
  readonly version: 1;
  readonly consent: true;
  readonly snapshot: ResumeSnapshotV1;
  readonly settings: Omit<AccessibilitySettings, 'persistenceEnabled'>;
}

export interface ProgressStore {
  load(): PersistedProgressV1 | null;
  save(value: PersistedProgressV1): void;
  clear(): void;
}
~~~

persistSession은 state.settings.persistenceEnabled가 false이면 return하고 true일 때만 허용 필드로 PersistedProgressV1을 새로 조립해 save합니다. disablePersistence는 store.clear만 호출하며 기존 상태를 다른 키로 복사하지 않습니다.

- [ ] **Step 1: 기본 무저장과 삭제 실패 테스트를 작성합니다**

~~~typescript
it('동의를 켜기 전에는 아무것도 저장하지 않는다', () => {
  const storage = createMemoryStorage();
  persistSession(createInitialSession(), createProgressStore(storage));
  expect(storage.getItem(PROGRESS_KEY)).toBeNull();
});

it('이어 하기를 끄면 기존 항목을 즉시 지운다', () => {
  const storage = createMemoryStorageWithValidProgress();
  disablePersistence(createProgressStore(storage));
  expect(storage.getItem(PROGRESS_KEY)).toBeNull();
});
~~~

- [ ] **Step 2: 실패를 확인하고 최소 저장소를 구현합니다**

Run: npm test -- tests/unit/progressStore.test.ts

Expected before implementation: FAIL with missing progressStore module.

load는 version, consent, JourneyIndex, SessionStage, PatternTokenId 배열을 런타임 검사하고 잘못된 JSON은 삭제 후 null을 반환합니다. 저장 값에는 이름, 오답, 점수, 속도, 시간, 음성, 사진, 자유 텍스트를 넣지 않습니다.

- [ ] **Step 3: 설정 화면 실패 테스트를 작성합니다**

~~~tsx
it('이어 하기는 기본 off이고 켜기 전에 저장 범위를 설명한다', async () => {
  render(<SettingsHarness />);
  const toggle = screen.getByRole('switch', { name: '이 기기에서 이어 하기' });
  expect(toggle).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByText('운행 위치와 접근성 설정만 이 기기에 저장해요.')).toBeInTheDocument();
});
~~~

- [ ] **Step 4: 설정과 reducer hydration을 구현합니다**

설정 항목은 안내 음성, 모션 줄이기, 무늬 대비, 이 기기에서 이어 하기 네 개입니다. OS가 reduce이면 사용자가 system을 선택해도 effectiveReducedMotion은 true입니다. 유효한 저장 상태만 초기 세션에 병합하며 summary 저장은 다음 Journey의 start로 정규화합니다.

Run: npm test -- tests/unit/progressStore.test.ts tests/components/accessibilitySettings.test.tsx tests/unit/sessionReducer.test.ts

Expected: 기본 무저장, 명시적 저장, 즉시 삭제, 손상 데이터 제거, 최소 schema, OS reduce 우선순위 case PASS.

- [ ] **Step 5: 설정과 로컬 저장을 커밋합니다**

~~~bash
git add src/services/progressStore.ts src/features/settings/AccessibilitySettings.tsx src/features/session/types.ts src/features/session/reducer.ts src/features/start/StartScreen.tsx src/App.tsx tests/unit/progressStore.test.ts tests/components/accessibilitySettings.test.tsx
git commit -m "feat: add opt-in local progress"
~~~

### Task 13: 저학년 시각 체계, gi-pulse, 모션 감소

**Files:**
- Create: src/hooks/useEffectiveReducedMotion.ts
- Create: src/styles/patterns.css
- Create: src/styles/components.css
- Create: src/styles/motion.css
- Create: tests/components/reducedMotion.test.tsx
- Modify: src/styles/tokens.css
- Modify: src/styles/base.css
- Modify: src/main.tsx
- Modify: src/App.tsx

**Interfaces:**
- Consumes: AccessibilitySettings.motionPreference, patternContrast
- Produces: useEffectiveReducedMotion(preference): boolean
- Produces: data-motion='reduce' | 'full'과 data-pattern-contrast='standard' | 'strong'
- Produces: .gi-pulse, .pattern-cell--active, .train-track--moving CSS 계약

- [ ] **Step 1: 모션 합성 실패 테스트를 작성합니다**

~~~tsx
it('운영체제가 reduce이면 앱 system 설정에서도 reduce를 반환한다', () => {
  mockMatchMedia(true);
  const { result } = renderHook(() => useEffectiveReducedMotion('system'));
  expect(result.current).toBe(true);
});

it('앱의 reduce 선택은 운영체제 설정과 무관하게 유지된다', () => {
  mockMatchMedia(false);
  const { result } = renderHook(() => useEffectiveReducedMotion('reduce'));
  expect(result.current).toBe(true);
});
~~~

- [ ] **Step 2: 실패를 확인하고 hook과 data attribute를 구현합니다**

Run: npm test -- tests/components/reducedMotion.test.tsx

Expected before implementation: FAIL with missing useEffectiveReducedMotion.

matchMedia change listener를 등록·해제하고 AppShell root에 effective 값과 무늬 대비 값을 data attribute로 둡니다.

- [ ] **Step 3: 큰 터치 영역과 색 독립 무늬를 구현합니다**

~~~css
.choice-button,
.primary-action,
.icon-button,
.pattern-cell--selectable {
  min-inline-size: 48px;
  min-block-size: 48px;
}

.gi-pulse {
  animation: gi-pulse 1.8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .gi-pulse,
  .train-track--moving {
    animation: none;
    transform: none;
  }
}

[data-motion='reduce'] .gi-pulse,
[data-motion='reduce'] .train-track--moving {
  animation: none;
  transform: none;
}

[data-motion='reduce'] .pattern-cell--active {
  outline: 4px solid currentColor;
  outline-offset: 3px;
}
~~~

세 무늬는 repeating-radial-gradient, repeating-linear-gradient, 두 방향 선 교차를 사용합니다. 아이콘 윤곽과 무늬가 모두 달라 grayscale에서도 식별되게 합니다. 화면 흔들림과 자극적인 실패 색 점멸을 만들지 않습니다.

- [ ] **Step 4: CSS와 컴포넌트 계약을 검사합니다**

Run: npm test -- tests/components/reducedMotion.test.tsx tests/components/pulseAction.test.tsx tests/unit/tokenThemes.test.ts

Expected: reduce 합성, pulse 두 종류 제한, 비색상 토큰 무결성 PASS.

Run: npm run build

Expected: CSS 경고 없이 dist asset이 생성되고 외부 font·image URL이 없습니다.

- [ ] **Step 5: 시각·모션 체계를 커밋합니다**

~~~bash
git add src/hooks/useEffectiveReducedMotion.ts src/styles/tokens.css src/styles/base.css src/styles/patterns.css src/styles/components.css src/styles/motion.css src/main.tsx src/App.tsx tests/components/reducedMotion.test.tsx
git commit -m "feat: add accessible motion and visual system"
~~~

### Task 14: 업데이트 내역 버튼과 날짜 기록

**Files:**
- Create: src/content/updateHistory.ts
- Create: src/components/UpdateHistoryButton.tsx
- Create: src/components/UpdateHistoryDialog.tsx
- Create: tests/components/updateHistory.test.tsx
- Modify: src/components/AppShell.tsx

**Interfaces:**
- Produces: UpdateHistoryEntry { date: string; kind: '설계' | '개발' | '개선'; summary: string }
- Produces: UPDATE_HISTORY: readonly UpdateHistoryEntry[]
- Produces: UpdateHistoryDialogProps { open; entries; onClose }

- [ ] **Step 1: 날짜와 대화상자 실패 테스트를 작성합니다**

~~~tsx
it('문자 라벨 버튼으로 날짜가 있는 이력을 열고 닫는다', async () => {
  const user = userEvent.setup();
  render(<AppShell><div>학습 화면</div></AppShell>);
  const trigger = screen.getByRole('button', { name: '업데이트 내역' });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
  expect(within(dialog).getAllByText('2026-08-26')).toHaveLength(2);
  expect(within(dialog).getByText('MVP 학습 흐름과 접근성 검증 추가')).toBeInTheDocument();
  await user.keyboard('{Escape}');
  expect(trigger).toHaveFocus();
});
~~~

- [ ] **Step 2: 실패를 확인하고 고정 이력을 구현합니다**

Run: npm test -- tests/components/updateHistory.test.tsx

Expected before implementation: FAIL with missing history components.

~~~typescript
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
~~~

버튼은 화면 오른쪽 아래 fixed 위치에 두되 320px에서 핵심 행동을 가리지 않도록 safe-area와 12px 간격을 사용합니다. 대화상자는 열린 직후 제목 또는 닫기 버튼에 초점을 두고 Escape·닫기 버튼으로 닫은 뒤 trigger에 초점을 돌려줍니다.

- [ ] **Step 3: 이력 접근성 테스트를 통과시킵니다**

Run: npm test -- tests/components/updateHistory.test.tsx

Expected: 명확한 문자 라벨, 두 날짜 행, Tab 순환, Escape 닫기, 포커스 복귀 PASS.

- [ ] **Step 4: 업데이트 기록 정렬 정책을 검사합니다**

updateHistory.test.tsx에 날짜 내림차순과 같은 날짜에서 개발 → 설계 순서를 검사하는 case를 추가합니다. 향후 앱 수정 커밋은 실제 수정 날짜, kind=개선, 학생에게 보이는 한 문장 summary를 UPDATE_HISTORY의 최신 위치에 추가해야 합니다.

Run: npm test -- tests/components/updateHistory.test.tsx

Expected: 최신 날짜 우선, 같은 날짜의 개발 우선, 중복 entry 0개가 모두 PASS.

- [ ] **Step 5: 업데이트 내역을 커밋합니다**

~~~bash
git add src/content/updateHistory.ts src/components/UpdateHistoryButton.tsx src/components/UpdateHistoryDialog.tsx src/components/AppShell.tsx tests/components/updateHistory.test.tsx
git commit -m "feat: add update history dialog"
~~~

### Task 15: 모바일·키보드·스크린 리더·개인정보 완료 검증

**Files:**
- Create: playwright.config.ts
- Create: tests/e2e/learner-flow.spec.ts
- Create: tests/e2e/accessibility.spec.ts
- Create: tests/e2e/privacy.spec.ts
- Create: docs/qa/2026-08-26-accessibility-checklist.md

**Interfaces:**
- Consumes: 완성된 정적 UI, 로컬 음원, localStorage
- Produces: Chromium desktop, 320px mobile, reduced-motion 자동 검증
- Produces: VoiceOver 수동 검증 기록
- Produces: 외부 네트워크·녹음 API 미사용 증거

- [ ] **Step 1: 전체 학생 흐름 실패 E2E를 작성합니다**

~~~typescript
test('Journey 0을 드래그 없이 끝내고 다섯 활동 도장을 받는다', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '운행 시작' }).click();
  await page.getByRole('button', { name: /후보 2/ }).click();
  await page.getByRole('button', { name: '한 묶음 찾기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
  await completeJourneyZeroByVisibleLabels(page);
  await expect(page.getByRole('heading', { name: '활동 도장' })).toBeVisible();
  await expect(page.getByRole('list', { name: '완료한 학습 행동' }).getByRole('listitem')).toHaveCount(5);
});
~~~

completeJourneyZeroByVisibleLabels는 같은 파일에 실제 버튼 라벨 순서로 구현하고 data-testid나 내부 A/B/C ID로 학생 행동을 선택하지 않습니다.

- [ ] **Step 2: E2E helper와 webServer 설정이 없어 실패하는지 확인합니다**

Run: npm run test:e2e -- tests/e2e/learner-flow.spec.ts

Expected before implementation: FAIL. completeJourneyZeroByVisibleLabels 또는 Playwright webServer 설정이 없다는 첫 오류가 보고됩니다.

- [ ] **Step 3: visible-label helper와 Playwright 설정을 최소 구현하고 재실행합니다**

completeJourneyZeroByVisibleLabels는 Journey 0의 이어 붙이기, 수리, 번역, 자유 규칙 버튼을 실제 한국어 accessible name으로 순서대로 조작합니다. playwright.config.ts는 npm run dev -- --host 127.0.0.1, 재사용하지 않는 webServer, Chromium desktop project를 정의합니다. 앱 불일치가 나오면 Task 15에 임의 우회 코드를 넣지 않고 해당 화면 Task의 listed source file과 component test를 함께 고친 뒤 이 검사를 다시 실행합니다.

Run: npm run test:e2e -- tests/e2e/learner-flow.spec.ts

Expected: Journey 0 완주, 잘못된 답 뒤 재시도, 힌트 사용, 다음 Journey 순환 case PASS.

- [ ] **Step 4: 320px·200%·터치 영역·모션 감소 검사를 작성합니다**

~~~typescript
test.use({ viewport: { width: 320, height: 720 } });

test('320px에서 가로 스크롤과 작은 조작 대상이 없다', async ({ page }) => {
  await page.goto('/');
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
  for (const box of await interactiveBoundingBoxes(page)) {
    expect(box.width).toBeGreaterThanOrEqual(48);
    expect(box.height).toBeGreaterThanOrEqual(48);
  }
});
~~~

200% 자동 검사는 640px viewport에서 CSS pixel 가용 폭을 절반으로 제한한 테스트 페이지와 실제 Chromium pageScaleFactor=2를 함께 사용하고, heading·현재 배열·핵심 버튼이 겹치거나 잘리지 않는지 bounding box와 overflow로 확인합니다. reducedMotion='reduce' 프로젝트는 gi-pulse와 train animationName이 none이며 활성 칸 outline이 4px인지 검사합니다.

- [ ] **Step 5: 키보드와 Axe 검사를 작성합니다**

각 stage에서 활성화된 data-primary-action 버튼이 최대 1개인지 검사합니다. Tab으로 선택지와 제출 버튼에 접근하고 Enter 또는 Space로 동작시켜 전체 흐름을 완료합니다. Find·Continue·Repair·Translate·Create·Summary 화면마다 Axe를 실행하고 violations 배열이 비어 있는지 확인합니다.

Run: npm run test:e2e -- tests/e2e/accessibility.spec.ts

Expected: 화면별 주 행동 최대 1개, desktop, 320px, 200%, reduced-motion, keyboard-only, 6개 화면 Axe 검사 모두 PASS.

- [ ] **Step 6: 색상 독립성과 개인정보 경계를 검사합니다**

privacy.spec.ts는 모든 request URL을 수집하여 앱 origin과 /audio/ko 경로만 허용하고, navigator.mediaDevices.getUserMedia, MediaRecorder, WebSocket, 외부 fetch가 호출되지 않았음을 확인합니다. grayscale CSS를 주입한 상태에서도 visible label로 Journey 0을 완료합니다. persistence off에서는 localStorage key가 없고, on에서는 PersistedProgressV1 한 항목만 존재하며 금지 필드 정규식에 걸리지 않아야 합니다.

Run: npm run test:e2e -- tests/e2e/privacy.spec.ts

Expected: 외부 origin 0개, 녹음 API 호출 0개, 기본 저장 0개, 동의 저장 1개, grayscale 완주 PASS.

- [ ] **Step 7: macOS VoiceOver 수동 검증을 기록합니다**

docs/qa/2026-08-26-accessibility-checklist.md에 다음 실제 검증 결과가 모두 통과한 경우만 기록합니다.

1. Safari에서 VoiceOver를 켜고 제목 → 안내 → 배열 → 선택지 → 제출 순서로 이동합니다.
2. 첫째~아홉째 칸이 순서·모양·무늬 또는 빈칸을 중복 없이 읽는지 확인합니다.
3. 오답 피드백이 polite로 한 번 읽히고 현재 선택 초점을 빼앗지 않는지 확인합니다.
4. 설정 대화상자와 업데이트 내역 대화상자가 제목을 읽고 Escape 뒤 trigger로 돌아오는지 확인합니다.
5. 안내 음성을 끈 상태에서도 모든 문구가 읽히는지 확인합니다.
6. 키보드만으로 Journey 0과 자유 규칙을 완료하고 드래그·더블 클릭 요구가 없는지 확인합니다.
7. Safari 200% 확대와 320px 반응형 모드에서 핵심 버튼·업데이트 내역 버튼이 겹치지 않는지 확인합니다.

하나라도 충족하지 않으면 이 문서를 통과로 기록하거나 커밋하지 않고 해당 Task의 테스트와 구현을 먼저 고칩니다.

- [ ] **Step 8: 완료 검증을 커밋합니다**

~~~bash
git add playwright.config.ts tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/privacy.spec.ts docs/qa/2026-08-26-accessibility-checklist.md
git commit -m "test: verify learner accessibility flows"
~~~

### Task 16: 문서, CI, 최종 품질 게이트

**Files:**
- Create: README.md
- Create: .github/workflows/quality.yml
- Create: tests/unit/readmeContract.test.ts
- Modify: package.json
- Modify: src/content/updateHistory.ts only if the actual implementation date differs from 2026-08-26
- Modify: tests/components/updateHistory.test.tsx only if the actual implementation date differs from 2026-08-26

**Interfaces:**
- Consumes: 모든 unit, component, E2E, build, QA 결과
- Produces: 재현 가능한 로컬 실행법과 GitHub Actions 품질 게이트
- Produces: 최종 완료 기준 판정

- [ ] **Step 1: README 검증 실패 테스트를 작성합니다**

tests/unit/readmeContract.test.ts를 추가하여 README에 학습 목표, 차별성, 20개 미션, 로컬 전용 개인정보 경계, 이어 하기 기본 off, 음성 비녹음, 실행 명령, 접근성 검증, 업데이트 이력 정책이 모두 있는지 검사합니다.

~~~typescript
import { readFileSync } from 'node:fs';

const readme = readFileSync(
  new URL('../../README.md', import.meta.url),
  'utf8',
);

it.each([
  '가장 짧은 반복 단위',
  'AB·AAB·ABB·ABC',
  '미션 20개',
  '기본으로 저장하지 않습니다',
  '학생 음성을 녹음하지 않습니다',
  'npm run check',
  'npm run test:e2e',
])('README에 필수 계약 %s가 있다', phrase => {
  expect(readme).toContain(phrase);
});
~~~

- [ ] **Step 2: README 부재로 실패하는지 확인합니다**

Run: npm test -- tests/unit/readmeContract.test.ts

Expected: FAIL. README.md가 없거나 필수 문구가 없습니다.

- [ ] **Step 3: README와 CI를 구현합니다**

README는 설치, 개발 서버, unit/component, E2E, build 명령과 학습·개인정보·접근성 경계를 기술합니다. quality.yml은 Node.js 22, npm ci, npx playwright install --with-deps chromium, npm run lint, npm run test, npm run build, npm run test:e2e 순서로 실행하고 package-lock.json만 의존합니다.

- [ ] **Step 4: 전체 명령을 깨끗한 설치 조건으로 실행합니다**

Run: npm ci

Expected: package-lock.json과 정확히 일치하는 설치, 종료 코드 0.

Run: npm run lint

Expected: 오류와 warning 0개.

Run: npm run test

Expected: unit, component, architecture test 모두 PASS; mission 총 20개와 oversized source 0개.

Run: npm run build

Expected: TypeScript 오류 0개, dist/index.html 및 로컬 asset 생성.

Run: npm run test:e2e

Expected: learner flow, 320px, 200%, reduced motion, keyboard, Axe, privacy suite 모두 PASS.

- [ ] **Step 5: 실제 날짜와 Git diff를 점검합니다**

Run: date +%F

Expected: 구현 작업을 수행한 현지 날짜 한 줄. 이 값이 2026-08-26과 다르면 UPDATE_HISTORY의 개발 entry 날짜를 이 출력값으로 바꾸고 updateHistory.test.tsx의 기대 날짜도 같은 값으로 바꾼 뒤 관련 테스트를 다시 통과시킵니다.

Run: git diff --check

Expected: 공백 오류 0개.

Run: git status --short

Expected: README.md, quality.yml, readmeContract.test.ts와 날짜가 달랐을 때의 updateHistory 관련 변경만 표시됩니다.

- [ ] **Step 6: 최종 문서와 CI를 커밋합니다**

~~~bash
git add README.md .github/workflows/quality.yml package.json tests/unit/readmeContract.test.ts src/content/updateHistory.ts tests/components/updateHistory.test.tsx
git commit -m "docs: finalize implementation and qa guide"
~~~

날짜가 같아 updateHistory 파일이 변경되지 않았다면 git add에서 두 updateHistory 경로를 제외합니다.

- [ ] **Step 7: 커밋 이후 최종 상태를 확인합니다**

Run: git status --short

Expected: 출력 없음.

Run: git log --oneline --decorate -16

Expected: 아래 커밋 단계가 순서대로 보이고 각 단계의 테스트 증거가 해당 커밋 전에 확보되어 있습니다.

## 향후 커밋 단계

1. chore: scaffold pattern unit engine room
2. feat: add repetition and continuation rules
3. feat: add pattern repair validation
4. feat: validate translation and free patterns
5. feat: add mission catalog and visual tokens
6. feat: add guided learning session reducer
7. feat: add accessible pattern interaction primitives
8. feat: add unit finding and continuation missions
9. feat: add repair and translation missions
10. feat: add free pattern creation and learning summary
11. feat: add optional local audio guidance
12. feat: add opt-in local progress
13. feat: add accessible motion and visual system
14. feat: add update history dialog
15. test: verify learner accessibility flows
16. docs: finalize implementation and qa guide

## 최종 완료 판정

- 미션 카탈로그는 정확히 20개이며 find·continue·repair·translate 각 5개, AB·AAB·ABB·ABC 각 5개입니다.
- 학생은 한 Journey에서 가장 짧은 단위 찾기, 이어 붙이기, 오류 수리, 외형 번역, 자유 규칙 만들기를 순서대로 수행합니다.
- 긴 반복 후보는 not-shortest로 안내되고 부분 빈칸은 보이는 항과 원래 인덱스를 함께 검사합니다.
- 번역은 일대일 대응과 순서를 모두 검사하고 자유 선로는 2~3칸 단위를 최소 두 번 반복해야 승인됩니다.
- 모든 항은 모양·무늬·문자 이름을 가지며 grayscale에서도 Journey를 완료합니다.
- 필수 pulse는 “한 묶음 찾기”와 “운행하기” 두 버튼뿐이고 모션 감소에서는 애니메이션 없이 테두리로 진행을 보여 줍니다.
- 기본 localStorage는 비어 있고 동의 뒤에도 최소 진행·설정 데이터만 한 항목으로 저장합니다.
- 안내 음성은 선택 재생이며 로컬 MP3만 사용하고 문자 안내는 항상 남으며 녹음 API는 호출하지 않습니다.
- 320px, 200%, 최소 48×48px, 키보드 완주, Axe violations 0개, VoiceOver 수동 체크가 통과합니다.
- 각 코드 파일은 499줄 이하이고 lint, unit/component, build, E2E가 모두 통과합니다.
- 우하단 업데이트 내역 버튼에 실제 설계·개발 날짜와 간단한 내역이 표시됩니다.
- 서버·계정·광고·외부 AI·공유·점수·순위·시간 경쟁·증가 규칙은 구현물에 없습니다.

## 자체 검토 기록

| 검토 | 확인 결과 |
|---|---|
| 설계 요구사항 대조 | 학습 목표 4수준, 기존 앱 차별성, 6단계 흐름, 5개 판정 규칙, 피드백, 접근성, 안전, MVP, 제외 범위, 완료 기준, 업데이트 내역을 Task와 테스트에 각각 연결했습니다. |
| 자리표시 문구 검사 | 미정 상태를 나타내는 문구 없이 파일 경로, 타입, 함수, 테스트 명, 명령, 기대 결과를 구체화했습니다. |
| 타입·명명 일관성 | PatternTokenId, PatternUnit, PatternValidation, Mission, JourneyIndex, SessionStage, LearningEvidence, AccessibilitySettings, PersistedProgressV1 명칭을 모든 Task에서 동일하게 사용했습니다. |
| 파일 크기 | 모든 계획 파일에 499줄 이하 목표를 배정하고 자동 architecture test를 Task 1과 최종 게이트에 포함했습니다. |
| 범위 경계 | 구현·패키지 설치·Git·커밋·푸시·배포 명령은 이 계획 작성 중 실행하지 않으며, 배포와 아카이브 등록은 이 MVP 구현 계획의 완료 조건에 포함하지 않았습니다. |

## 실행 인계

계획 승인 뒤에는 두 방식 중 하나를 선택합니다.

1. **Subagent-Driven 권장:** superpowers:subagent-driven-development를 사용하고 Task마다 gpt-5.6-luna 구현 작업자를 새로 배정한 뒤 명세 검토와 품질 검토를 통과시킵니다.
2. **Inline Execution:** superpowers:executing-plans를 사용하여 이 세션에서 Task를 순서대로 실행하고 각 커밋 전에 체크포인트를 공유합니다.

어느 방식이든 설계 문서와 이 계획을 함께 읽고 Task 1부터 시작하며, 별도 지시 전에는 구현을 시작하지 않습니다.
