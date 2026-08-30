# Start Screen Page Rules

## Intent

출발역은 학생이 “무엇을 배우고, 지금 무엇을 누르는지”를 5초 안에 이해하는 화면이다. 출발 그림은 가상의 기관차 분위기를 보조하고, 규칙 학습 문장이 중심이다.

## Component order

1. `h1` 앱 이름: `규칙 단위 기관실`
2. 핵심 질문이 들어 있는 시작 카드의 h2: `기관실 문을 열어 볼까요?`
3. 두 줄 이내 안내: 가장 짧은 반복 단위를 찾아 다섯 활동을 한다는 설명
4. `LearningJourney`: 찾기, 이어 붙이기, 수리하기, 번역하기, 만들기
5. 인라인 `StartMissionIllustration`: 장식 `aria-hidden`
6. `ActionRail`: `운행 시작` primary, `접근성 설정` secondary
7. 앱 바닥의 `업데이트 내역` 작은 버튼

## Responsive behavior

- 320~639px: 카드 한 열, 여정 항목은 각 단계명과 상태가 잘리지 않도록 짧은 라벨을 사용한다. `운행 시작`은 카드의 첫 viewport 안에 둔다.
- 640px 이상: 그림과 카드 설명을 두 열로 배치하며, 여정 지도는 설명 아래에 두어 제목에서 행동까지 시선이 끊기지 않게 한다.
- 1280px: 카드 최대 폭을 유지하고 바깥 장식 여백은 콘텐츠보다 눈에 띄지 않게 한다.

## Interaction and accessibility

- 시작 버튼은 48px 이상, focus ring, `data-primary-action`, `gi-pulse`를 갖는다.
- 접근성 설정은 버튼으로 열리고, audio/motion/contrast/persistence 상태를 텍스트로 함께 표시한다.
- 시작 카드가 포커스를 독점하지 않으며, Tab 순서는 제목 → 여정 지도(비interactive) → 시작 → 설정 → 업데이트 내역이다.
- 새 이미지나 자동 재생을 추가하지 않는다. 인라인 그림은 정보가 아니므로 빈 대체 텍스트를 사용한다.

## Acceptance checks

- `getByRole('heading', { name: '기관실 문을 열어 볼까요?' })`가 핵심 카드에 존재한다.
- `getByRole('navigation', { name: '학습 여정' })`에서 5개 단계와 상태 문장을 읽을 수 있다.
- `getByRole('button', { name: '운행 시작' })`이 주요 행동이며 설정 버튼과 구분된다.
- 320px에서 시작 카드와 버튼이 잘리지 않고 `scrollWidth === innerWidth`이다.
