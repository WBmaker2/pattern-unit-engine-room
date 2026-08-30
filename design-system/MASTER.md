# Pattern Unit Engine Room Design System

## Purpose

이 디자인 시스템은 초등학교 1~2학년이 반복 규칙을 보고 한 번에 한 행동을 수행하도록 화면의 위치, 말투, 대비, 모션을 일관되게 정한다. 장식보다 `규칙을 찾고 → 확인하고 → 다음으로 가는` 흐름을 우선하며, 점수·순위·시간 압박을 만들지 않는다.

## Semantic tokens

`src/styles/tokens.css`의 기존 색을 의미 토큰으로 사용한다. 모든 컴포넌트는 원시 색상값 대신 아래 이름을 사용한다.

| 토큰 | 값/역할 | 사용처 |
|---|---|---|
| `--surface-page` | 따뜻한 light 페이지 배경 | body, 앱 바깥 |
| `--surface-card` | 흰 카드 | 단계 카드, 피드백 |
| `--surface-subtle` | 연한 보조 배경 | 지도·설정 그룹 |
| `--ink-strong` | 본문 최강 대비 | 제목, 버튼 글자 |
| `--ink-muted` | 설명용 보조 대비 | 도움 문장, 상태 |
| `--accent-action` | 주요 teal | 제출·시작 버튼 |
| `--accent-focus` | 주황 focus ring | `:focus-visible` |
| `--status-success` | 성공 테두리/아이콘 | success 텍스트와 함께 사용 |
| `--status-retry` | 재시도 테두리 | retry 텍스트와 함께 사용 |
| `--border-default` | 카드·구분선 | 구조 표시 |
| `--content-max` | `64rem` | 데스크톱 본문 최대 폭 |
| `--space-1`~`--space-5` | 8/12/16/24/32px | 카드·섹션 간격 |
| `--control-min-size` | `48px` | button, choice, icon control |
| `--focus-ring` | 3px solid `--accent-focus` + 2px offset | 키보드 위치 표시 |

## Typography and copy

- 시스템 글꼴 `Noto Sans KR`, `Apple SD Gothic Neo`, sans-serif를 사용한다. 외부 폰트 요청은 만들지 않는다.
- 화면당 하나의 h1, 단계 카드당 하나의 h2를 사용한다. 헤더 문장은 동사로 끝낸다: `한 묶음을 찾아요`, `다음 칸을 골라요`.
- 초등학생용 안내는 한 문장, 최대 두 줄을 기본으로 한다. 내부 ID·판정 용어·개발자 메모는 숨긴다.
- 상태 문장은 색상 없이도 의미가 드러나야 한다. 예: `다시 해 봐요 — 깨진 칸을 먼저 골라요.`

## Layout

- 앱 전체는 `max-width: var(--content-max)`와 좌우 16px padding으로 감싼다.
- 320px~639px: 한 열, 여정 지도는 가로로 압축된 5개 항목, primary 행동은 폭 100%.
- 640px~959px: 출발·요약 카드는 한 열, 패턴 보드와 선택지는 필요한 경우 두 열.
- 960px 이상: 출발 카드는 그림/설명과 행동을 두 열로 배치하되 주요 버튼을 첫 viewport 아래로 보내지 않는다.
- 카드 내부의 첫 요소는 제목 또는 eyebrow, 마지막 요소는 행동 레일이다. 카드 간 기본 간격은 16px, 섹션 내부는 12px이다.
- 패턴 보드가 폭을 넘을 때 토큰을 축소하지 않고 `overflow-x: auto`를 사용하되 320px에서 전체 앱 `scrollWidth`는 viewport와 같게 유지한다.

## Journey map

`LearningJourney`는 `<nav aria-label="학습 여정">` 안에 `<ol>`을 렌더링한다.

- 완료: 단계명 + `완료` 텍스트 (체크 장식은 학습 정보를 대신하지 않음)
- 현재: 단계명 + `현재` 텍스트 + `aria-current="step"`
- 예정: 단계명 + `예정` 텍스트

세 상태는 배경색만으로 구분하지 않고 텍스트·테두리·아이콘을 함께 사용한다. 지도 항목은 링크가 아니며 세션 상태를 바꾸지 않는다.

## StageHeader

`StageHeader`는 `eyebrow`, h2 `title`, 두 줄 이내 `instruction`, `현재 단계 n / 5`를 이 순서로 렌더링한다. `aria-labelledby`는 h2 ID에 연결하며 숫자 진행은 상태 문장으로도 읽힌다. 시작 화면은 단계 헤더 대신 핵심 질문을 사용한다.

## ActionRail

`ActionRail`은 `<div aria-label="이번 행동">` 안에 다음 순서를 보장한다.

1. 현재 화면에서 학습을 판정하는 primary button
2. 성공 뒤 나타나는 next button
3. reset/settings 같은 secondary button

현재 화면의 primary 하나에만 `data-primary-action`을 붙인다. `한 묶음 찾기`와 `운행하기`에는 `pulseKind`를 연결하고, `운행 시작`은 시작 화면의 유일한 주요 행동으로 pulse를 유지한다. 갱신 내역·설정·다시 만들기는 pulse 대상이 아니다.

## FeedbackPanel

피드백은 `role="status" aria-live="polite" aria-atomic="true"`를 유지한다.

- retry: `다시 해 봐요` 제목 → 오답 이유 → “다시 고를 곳” 문장
- success: `잘했어요` 제목 → 학습 증거 문장 → next action

성공/재시도 색은 테두리와 상태 텍스트를 보조하는 수단이며 유일한 표시가 아니다. 피드백이 없을 때 빈 status 영역을 만들지 않는다.

## Controls and focus

- 모든 interactive control은 48px 이상 높이·너비를 갖는다.
- 키보드 focus ring은 3px 대비 테두리 + 2px offset으로 표시한다.
- 눌림 선택은 `aria-pressed`와 `선택됨` 텍스트를 함께 사용한다.
- 모달이 열리면 본문에 inert를 적용하고, 닫히면 열기 버튼으로 focus를 복귀한다.

## Motion

- `gi-pulse`는 학습의 현재 주요 행동 하나에만 사용한다.
- `prefers-reduced-motion: reduce` 또는 설정의 `motionPreference: 'reduce'`에서는 keyframe 이동을 제거하고 활성 칸의 정적 테두리만 보여 준다.
- 흔들림, 자극적인 실패음, 자동 전환, 시간 제한을 사용하지 않는다.

## Content and privacy guardrails

- 문자는 항상 음성보다 먼저 존재한다. 로컬 MP3가 없으면 안내 버튼을 비활성화하고 대체 문구를 제공한다.
- 저장하는 데이터는 `PersistedProgressV1`의 진행 위치·완료 증거·접근성 설정뿐이다. 이름, 사진, 음성, 광고 식별자, 네트워크 요청을 추가하지 않는다.
- 활동 도장은 학습 행동의 완료를 보여 주며 점수나 등급으로 변환하지 않는다.

## QA contract

- 자동: `npm run lint`, `npm test`, `npm run build`, `npm run check:size`, 세 Playwright E2E, axe.
- 수동: 320×844, 375×812, 1280×900, 브라우저 200% 확대, 키보드 Tab 순서, reduced motion, 흑백/저대비 환경.
- VoiceOver는 이 프로젝트의 검증 범위에 포함하지 않는다.
