# Elementary Web App UX Orchestrator Report

## 수용 요약

- 모드: `full`
- 대상: 초등 1~2학년, 15~25분 정적 학습 앱
- 실행일: 2026-08-31
- Stage 0: `ready` (`work/elementary-webapp-ux-bootstrap.md`)
- 시뮬레이션 결정: `not-needed` (`work/elementary-webapp-ux-simulation-decision.md`)
- P0: 0개, 해결되지 않은 P1: 0개
- 판정: **pass — 자동·대화형 브라우저·시뮬레이션 패널 기준**
- 실제 어린이·교사 표본 승인, iOS Safari·Android 물리 기기 확인은 수행하지 않았으며 별도 사람 검토로 남긴다. 이 보고서는 학생 집단 연구 결과를 주장하지 않는다.

## 100점 보조 지표

| 영역 | 점수 | 근거 |
|---|---:|---|
| 학습 목표·과제 명료성 | 15/15 | 다섯 활동의 순서, 단계 헤더, 구체 행동 문장, 완료 takeaway 확인 |
| 언어적 가독성·인지부하 | 19/20 | 번역 대응 수, 모양 선택 문장, 선로 칸 명칭, 빈 상태 힌트와 문장 장부 확인 |
| 화면 구조·행동 위계 | 12/12 | 단계 전환 focus region, primary/secondary ActionRail, 성공 후 다음 버튼 확인 |
| 피드백·오류 회복 | 13/13 | find·repair 오답 후 이유와 재선택, 성공 후 다음 활동 확인 |
| 시각적 가독성 | 9/10 | 320/375px에서 줄바꿈·대비·CTA 통과; 1280px 하단 장식 여백은 P3 |
| 키보드·의미·기본 접근성 | 10/10 | 48px 버튼, focus-visible, `role=region`, `aria-live`, axe 0 위반 |
| 반응형 학습 흐름 | 10/10 | 320×844, 375×812, 1280×900 및 200% Playwright 통과 |
| 런타임 안정성 | 5/5 | 콘솔 오류·경고 0, 로컬 요청만, 새로고침 후 초기 화면 정상 |
| 맥락적 시각자료·자산 안전 | 5/5 | 기존 인라인 SVG·로컬 MP3 유지, 새 생성 이미지 불필요 판정 |
| **합계** | **98/100** | **pass** |

## P0–P3 장부

| ID | 심각도 | 상태 | 근거와 결과 |
|---|---|---|---|
| EDU-UX-001 | P1 | 해결 | 단계 변경 뒤 `BODY`, `scrollY=212`였던 baseline을 `role=region`, `aria-label=현재 학습 단계`, `scrollY=0`으로 변경 |
| EDU-UX-002 | P2 | 해결 | 번역 화면에 `고른 대응 0 / 3 → 1 / 3 → 3 / 3`과 구체 지시 추가 |
| EDU-UX-003 | P2 | 해결 | `한 묶음을 두 번 이상 붙이면 운행할 수 있어요`, `선로에 놓은 칸: n / 12` 추가 |
| EDU-UX-004 | P2 | 해결 | 빈 묶음 보드에 `아래에서 모양을 눌러 한 묶음을 채워요` 추가 |
| EDU-UX-005 | P3 | 관찰 유지 | 1280px 출발 화면 하단 여백은 학습을 막지 않아 이번 사이클에서 구조 변경하지 않음 |

## 문장 감사 장부

상세 내용은 `work/elementary-webapp-ux-language-audit.md`에 있다.

- 번역: `같은 순서를 새 모양으로 바꾸어 보세요.` → `원래 항과 새 모양을 하나씩 짝지어 보세요.`
- 만들기: `2~3개로 내 한 묶음을 만들어요.` → `모양 2~3개를 골라 한 묶음을 만들어요.`
- 진행: 맥락 없는 `4 / 12` → `선로에 놓은 칸: 4 / 12`
- 빈 입력: 보드 빈 목록 → `아래에서 모양을 눌러 한 묶음을 채워요.`
- 기존 긍정 피드백과 오답 회복 문장은 의미가 분명해 유지했다.

## 시뮬레이션 결정·검증 장부

- 결정: `not-needed`; DOM/SVG 버튼과 결정적 미션 배열만으로 반복 순서와 대응 관계를 직접 관찰할 수 있다.
- 구현된 2D/3D 모델, 시간 기반 상태, 생성 이미지 수치·정답 의존이 없다.
- simulation gate: N/A. 별도 `simulation-test` 파일은 만들지 않았다.

## 시뮬레이션 학습자 패널

실제 학생 표본이 아닌 휴리스틱 점검이며, 주 페르소나는 7~8세 초1–2 `민서`, 보조 가드레일은 8~10세 `준호`와 10~12세 `서윤`이다.

| viewport/상태 | 관찰 가능한 probe | 결과 |
|---|---|---|
| 민서, 375×812, 시작 | “지금 무엇을 배우나요?” | `모양의 반복 규칙을 찾아 다섯 가지 미션을 해요`라는 목적과 `운행 시작`을 보고 첫 행동 실행 |
| find 오답 | “틀리면 무엇을 해 볼까요?” | 후보 1 오답 뒤 `다시 해 봐요`와 이유를 읽고 후보 2를 다시 선택 |
| 단계 전환 | 다음 화면에서 어디부터 볼지 확인 | `현재 학습 단계` region이 포커스를 받고 새 h2와 `scrollY=0`이 즉시 노출 |
| translate, 한 쌍 | “몇 개를 더 해야 하나요?” | `고른 대응 1 / 3`을 읽고 남은 두 대응을 선택 |
| create-unit 빈 상태 | 첫 조작 예측 | 빈 보드의 힌트를 읽고 아래 모양 버튼을 눌러 채움 |
| create-track | 운행 버튼 결과 예측 | `두 번 이상` 조건과 `선로에 놓은 칸` 수를 보고 두 묶음 붙인 뒤 운행 |
| summary | “끝나면 무엇을 하나요?” | 다섯 도장, takeaway, `다음 운행`·`처음으로`를 확인 |

## 브라우저·자동 검증 증거

### 명령 결과

- `npm run check`: lint 통과, **37 test files / 206 tests 통과**, TypeScript build 통과
- `npm run check:size`: source-size 테스트 통과
- `git diff --check`: 출력 없음
- `npm run test:e2e`: **16 passed** (accessibility, learner-flow, privacy, axe 포함)
- `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src`: `[]`

### 대화형 Playwright

- 로컬 URL: `http://127.0.0.1:5182/`
- baseline에서 375px 단계 전환 직후 `activeTag=BODY`, `scrollY=212`를 기록했다.
- 수정 후 find→continue, create→summary 전환에서 `activeRole=region`, `activeLabel=현재 학습 단계`, `scrollY=0`을 기록했다.
- 번역 세 항 미션에서 `고른 대응 0 / 3`, `1 / 3`, `3 / 3`과 확인 버튼 disabled/enabled를 확인했다.
- create 화면에서 빈 힌트와 `선로에 놓은 칸: 0 / 12`, 두 묶음 뒤 `4 / 12`, 실행 가능한 `gi-pulse`를 확인했다.
- settings 닫기 후 `접근성 설정` 버튼 포커스, update dialog 최신 날짜 `2026-08-31`을 확인했다.
- 모션 줄이기 설정 후 `data-motion=reduce`와 `모션을 줄여서 보여 줘요`를 확인했다.
- 새로고침 후 저장 꺼짐 초기 화면으로 돌아왔으며, 단일 라우트의 뒤로가기는 `about:blank`으로 나갔다. 이는 별도 페이지가 없는 정적 SPA의 기존 브라우저 동작이다.

### 캡처

- [baseline 320px](/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room/output/playwright/ux-baseline-start-320.png)
- [final 320px](/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room/output/playwright/ux-final-start-320.png)
- [final 375px](/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room/output/playwright/ux-final-start-375.png)
- [final 1280px](/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room/output/playwright/ux-final-start-1280.png)

## 변경 파일

- `src/components/StageFocusRegion.tsx`: 단계 전환 포커스·상단 스크롤 경계
- `src/App.tsx`: 모든 학습 화면을 focus region으로 연결
- `src/content/copy.ts`: 번역·선로·빈 상태 학습자 문장과 formatter
- `src/features/translate/TranslatePatternScreen.tsx`: 대응 진행 표시
- `src/features/create/CreatePatternScreen.tsx`: 반복 조건·빈 보드·선로 칸 명명
- `src/styles/components.css`: 전환 포커스 링과 안내 문장 스타일
- `src/content/updateHistory.ts`: 2026-08-31 개선 기록
- `tests/components/appStageFocus.test.tsx`, `tests/components/translatePatternScreen.test.tsx`, `tests/components/createPatternScreen.test.tsx`, `tests/components/updateHistory.test.tsx`, `tests/unit/copy.test.ts`, `tests/setup.ts`: TDD·문구·jsdom 회귀 계약
- 계획·감사·결정·부트스트랩 문서: `work/elementary-webapp-ux-*.md`

## 전문 라우팅·자산 결정

- `elementary-webapp-ux-orchestrator`: Stage 0, 감사, 시뮬레이션 결정, 동일 시나리오 수용 게이트
- `playwright`: 실제 대화형 브라우저와 자동 E2E
- `impeccable`: context 확인 및 최종 deterministic detector (`[]`); 별도 critique dual-agent 실행은 하지 않음
- `redesign-existing-projects`: 기존 Vite + React 구조 보존과 기능별 파일 분리
- `design-system`: `design-system/MASTER.md`의 light mode, 48px, `gi-pulse`, reduced-motion, VoiceOver 제외 규칙 적용
- `imagegen`: 새 이미지가 학습 정보를 늘리지 않아 호출하지 않음. 기존 인라인 SVG와 로컬 MP3를 유지함.

## 남은 사람 검토와 다음 권장 행동

1. 교사가 초1–2 학생 1~2명에게 같은 375px 흐름을 보여 주고 “왜 두 번 붙여야 해?”와 “다음에 무엇을 눌러?”를 자기 말로 답하는지 기록한다.
2. iOS Safari·Android Chrome 실제 기기에서 320/375px, 키보드 대체 조작, 모션 감소, 터치 hit area를 확인한다.
3. 교사 검토에서 P3 여백이 산만하다고 판정될 때만 `design-system/pages/start.md`와 함께 출발 화면 레이아웃을 별도 계획한다.

## 릴리스 경계

이번 요청에서는 커밋, 푸시, GitHub 저장소 생성, GitHub Pages 배포, HVC 등록을 실행하지 않았다. 변경사항은 현재 작업 트리에 남아 있으며, 사용자가 별도로 릴리스를 요청할 때 CI·Pages·공개 learner path를 확인한 뒤 진행한다.
