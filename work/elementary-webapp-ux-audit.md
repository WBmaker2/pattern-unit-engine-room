# Elementary Web App UX Audit

## 감사 범위

- 대상: `/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room`의 Vite + React + TypeScript 정적 SPA
- 모드: `full` (`elementary-webapp-ux-orchestrator`)
- 기준: `2026-08-26-pattern-unit-engine-room-design.md`, `PRODUCT.md`, `design-system/MASTER.md`, 기존 `work/education-webapp-redesign-plan.md`
- 검증 범위: 실제 Playwright 대화형 브라우저, 소스·테스트 정적 검토, 초등 1~2학년 문장 감사, 접근성·개인정보·모션 규칙
- 제외: VoiceOver 실행 및 실제 어린이 인터뷰. 실제 교실·물리 기기 확인은 자동 검증과 분리한다.

## 기준 상태 증거

| 확인 | 결과 | 증거 |
|---|---|---|
| 첫 화면 제목·학습 순서 | 통과 | 브라우저 제목 `규칙 단위 기관실`, 다섯 항목 `찾기 → 이어 붙이기 → 수리하기 → 번역하기 → 만들기` 표시 |
| 375×812 반응형 | 통과 | `innerWidth=375`, `clientWidth=375`, `scrollWidth=375`; 첫 화면·활동 CTA가 잘리지 않음 |
| 1280×720 반응형 | 통과 | `innerWidth=1280`, `clientWidth=1280`, `scrollWidth=1280`; 데스크톱 2열 출발 화면 렌더링 |
| 학습자 전체 흐름 | 통과 | `운행 시작` 후 find, continue, repair, translate, create-unit, create-track, summary 순서 완료 |
| 오답 복구 | 통과 | find 후보 1, repair 위치·모양 오답에서 이유와 다시 고를 행동 표시 |
| 선택형 핵심 행동 | 통과 | find·create의 제출/운행 버튼은 선택 전 비활성, 성공 후 다음 활동 버튼으로 전환 |
| 설정·업데이트 접근점 | 통과 | 설정 패널·업데이트 대화상자 열기, 닫기 후 각각 트리거로 포커스 복귀 |
| 브라우저 콘솔 | 통과 | 오류 0, 경고 0; React DevTools 안내 info 1건은 개발 도구 안내 |
| 정적 요청·개인정보 | 통과 | 초기 요청 65건 모두 `127.0.0.1:5182` 로컬 자원, 외부 분석·계정·학생 식별자 요청 없음 |
| reduced motion·업데이트 기록 | 기존 계약 유지 | `motion.css`, `useEffectiveReducedMotion`, 날짜별 `updateHistory.ts`와 기존 테스트 확인 |

## 우선순위 발견 사항

### [P1] EDU-UX-001 — 단계 전환 뒤 포커스와 스크롤 위치가 새 활동을 가리키지 않음

- 위치: `src/App.tsx:99-216`의 조건부 화면 렌더링
- 재현: 375×812 브라우저에서 find 정답 제출 후 `다음 활동: 이어 붙이기`를 클릭한다.
- 관찰값: `document.activeElement.tagName === "BODY"`, `role === null`, `scrollY === 212`. 새 화면의 제목은 DOM에 있지만 키보드 사용자의 포커스가 새 활동으로 이동하지 않는다.
- 학습 영향: 다음 행동을 찾기 전에 화면을 위로 되돌려야 하고, 스크린 리더 사용자는 새 단계 제목을 즉시 듣지 못한다. 핵심 흐름의 중단이므로 P1이다.
- 원인: `App`이 화면 JSX를 교체하지만 공통 포커스 경계나 전환 후 `scrollTo` 계약이 없다.
- 개선 방향: `StageFocusRegion` 공통 컴포넌트를 추가해 단계 키가 바뀔 때 `tabIndex=-1` 영역으로 포커스를 이동하고 `window.scrollTo({ top: 0, left: 0, behavior: 'auto' })`를 호출한다. 영역에는 현재 학습 단계라는 명시적 라벨을 붙인다.
- 합격 조건: find→continue, summary→next journey, start→find 전환에서 포커스 영역이 활성화되고 `scrollY=0`이 되며, 기존 모달 닫기 포커스 복귀가 유지된다.

### [P2] EDU-UX-002 — 번역 활동에서 필요한 대응 개수와 남은 일이 보이지 않음

- 위치: `src/features/translate/TranslatePatternScreen.tsx:72-133`, `src/content/copy.ts:22-30`
- 재현: 세 항 미션에서 원래 항 하나와 새 모양 하나만 고른다.
- 관찰값: `고른 대응` 목록에는 1개가 보이지만 확인 버튼은 비활성이고, 왜 비활성인지 알려 주는 진행 수가 없다.
- 학습 영향: 초등 1~2학년이 “몇 개를 더 골라야 하는지” 추측해야 하므로 일대일 대응이라는 학습 목표보다 UI 해석에 주의가 쏠린다.
- 원인: `mappingComplete` 판정은 존재하지만 화면에는 `draftPairs.length`와 고유 원래 항 수가 노출되지 않는다.
- 개선 방향: 행동 문장을 `원래 항과 새 모양을 하나씩 짝지어 보세요.`로 구체화하고, 선택 영역 앞에 `고른 대응 n / 전체` 진행 문장을 `aria-live="polite"`로 제공한다.
- 합격 조건: 시작 시 `고른 대응 0 / 3`, 한 쌍 뒤 `1 / 3`, 세 쌍 뒤 `3 / 3`이 보이고, 세 쌍 전 확인 버튼은 비활성, 세 쌍 후 활성이다.

### [P2] EDU-UX-003 — 자유 규칙 선로의 반복 조건과 숫자 단위가 불분명함

- 위치: `src/features/create/CreatePatternScreen.tsx:78-103`, `src/content/copy.ts:51,68-70`
- 재현: 두 모양으로 한 묶음을 정한 뒤 한 번만 붙인 상태를 본다.
- 관찰값: `4 / 12`처럼 맥락 없는 숫자만 보이며, 운행에 두 번 이상 반복이 필요하다는 설명은 오답 후에만 나타난다.
- 학습 영향: 학생은 비활성/활성 상태를 시행착오로 알아내야 하고, `12`가 칸 수인지 시도 횟수인지 바로 읽기 어렵다.
- 원인: 도메인 판정의 `needs-second-repeat` 안내가 실패 피드백에만 연결되어 있고, track 화면의 진행 문장이 기술적 숫자에 머문다.
- 개선 방향: 트랙 화면에 `한 묶음을 두 번 이상 붙이면 운행할 수 있어요.`를 항상 표시하고, 숫자를 `선로에 놓은 칸: n / 12`로 명명한다. 기존 `gi-pulse`는 운행 가능한 경우의 `운행하기`에만 유지한다.
- 합격 조건: 빈/한 번 반복 상태에서도 조건 문장이 보이고, 성공 가능한 상태에서도 `선로에 놓은 칸: 4 / 12`처럼 읽히며, 판정·버튼 활성 규칙은 바뀌지 않는다.

### [P2] EDU-UX-004 — 한 묶음 빈 상태에 다음 조작 힌트가 없음

- 위치: `src/features/create/CreatePatternScreen.tsx:50-75`
- 관찰값: `내 한 묶음` 보드가 비어 있을 때 빈 목록만 보여 선택지와 보드의 관계를 학생이 스스로 연결해야 한다.
- 학습 영향: 첫 조작에서 무엇을 눌러야 하는지 한 번 더 해석한다. P1 흐름을 막지는 않지만 저학년 안내 품질을 낮춘다.
- 개선 방향: 단위가 비어 있을 때 보드 안에 `아래에서 모양을 눌러 한 묶음을 채워요.`를 한 줄로 표시한다. 토큰 선택·판정 로직은 변경하지 않는다.
- 합격 조건: 빈 상태에서만 힌트가 보이고 첫 토큰을 추가하면 사라지며, 단위 길이 제한과 버튼 disabled 계약이 그대로 통과한다.

### [P3] EDU-UX-005 — 1280px 출발 화면 하단의 장식 여백

- 관찰값: 1280×720에서 출발 그림과 카드가 상단에 모이고 하단 오른쪽에 넓은 빈 공간이 남는다.
- 판단: CTA·학습 순서·설명은 잘 보이고 학습을 막지 않는다. 이번 범위에서는 구조를 흔드는 레이아웃 변경을 하지 않고, 교사/어린이 실제 사용 검토에서 필요성이 확인될 때 별도 디자인 작업으로 다룬다.

## 유지해야 할 강점

- `src/domain/pattern/*`의 AB·AAB·ABB·ABC 판정과 `src/content/missions/*`의 20개 미션은 그대로 유지한다.
- 이름·사진·음성 녹음·외부 서버 없이 `ProgressStore`가 로컬에서만 진행 위치를 저장한다.
- 색·모양·무늬·한국어 대체 라벨을 함께 제공하고, 버튼 최소 48px과 키보드 semantics를 유지한다.
- `gi-pulse`는 현재 핵심 학습 버튼에만 사용하며 `prefers-reduced-motion`에서는 정적 강조로 대체한다.
- 설정 패널과 업데이트 내역은 날짜 기록, inert 배경, 닫기 후 트리거 포커스 복귀를 유지한다.

## 요구사항 대조 요약

| 설계 요구 | 현 상태 증거 | 이번 개선 연결 |
|---|---|---|
| 가장 짧은 단위 찾기 | `findMissions.ts`, `repetition.ts`, find 화면 완료 | 변경하지 않고 단계 전환 포커스만 보강 |
| 다음 항 예측 | `continueMissions.ts`, `continuation.ts` | 모든 전환에 공통 포커스·스크롤 적용 |
| 오류 수리 | `repairMissions.ts`, `repair.ts` | 오답 문구·조작 유지 |
| 외형 번역 | `translateMissions.ts`, `translation.ts` | 대응 진행 수와 구체 행동 문장 추가 |
| 자유 규칙 창안 | `freePattern.ts`, create 화면 | 반복 조건·빈 상태 안내 추가 |
| 접근성 | 48px, focus-visible, reduced motion, 로컬 설정 | 전환 포커스와 모바일 위치를 자동·대화형 검증 |
| 개인정보·안전 | `progressStore.ts`, privacy E2E | 네트워크·식별자 경계 유지 |
| MVP·완료 기준 | 기존 reducer·E2E·업데이트 내역 | TDD와 같은 시나리오 재검증으로 회귀 방지 |
