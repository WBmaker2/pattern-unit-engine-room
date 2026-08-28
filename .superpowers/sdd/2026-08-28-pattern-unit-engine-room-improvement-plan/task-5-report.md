# Task 5 Report: 실제 운행 결과와 reduced-motion 대체 표시

## 구현 결과

- `AnimatedPatternTrack`을 추가해 자유 규칙 성공 상태에서 실제 `.train-track--moving` runtime 요소를 렌더링합니다.
- 반복 단위의 시작 인덱스를 계산해 reduced-motion 상태에서 `.pattern-cell--active` 정적 테두리로 반복 구조를 보여 줍니다.
- Create unit/track 화면에 App의 유효 `reducedMotion` 값을 전달했습니다.
- 기존 운행 주 행동의 `gi-pulse` 정책과 성공 FeedbackPanel, 48px 조작 대상, 패턴 무늬 표시를 유지했습니다.
- reduced-motion E2E는 DOM에 CSS probe를 주입하지 않고 실제 Journey 0을 끝까지 진행해 운행 결과를 확인합니다.

## 변경 파일

- `src/components/AnimatedPatternTrack.tsx`
  - `AnimatedPatternTrackProps` 인터페이스와 반복 단위 시작 인덱스 계산을 추가했습니다.
  - 성공 상태에서만 `train-track--moving`을 표시하고 reduced-motion에서 active indices를 전달합니다.
- `src/features/create/CreatePatternScreen.tsx`
  - `reducedMotion` prop을 추가하고 track 보드를 `AnimatedPatternTrack`으로 연결했습니다.
- `src/App.tsx`
  - create-unit/create-track에 `reducedMotion`을 전달했습니다.
- `src/styles/motion.css`
  - 선로 이동 애니메이션의 transform origin을 추가했습니다. 기존 OS/app reduced-motion 정적 규칙은 유지됩니다.
- `src/styles/patterns.css`
  - 선로 wrapper의 inline 크기 제약을 추가했습니다.
- `tests/components/createPatternScreen.test.tsx`
  - 성공 runtime moving class와 reduced-motion active cell 회귀 테스트를 추가했습니다.
- `tests/e2e/accessibility.spec.ts`
  - CSS-only probe를 제거하고 실제 Create track 성공 흐름에서 computed animation/transform/outline을 검증하도록 수정했습니다.

## TDD 및 검증

1. 구현 전 실패 확인:

   `npm test -- tests/components/createPatternScreen.test.tsx tests/components/reducedMotion.test.tsx`

   결과: `1 failed | 1 passed`, 총 14건 중 새 runtime moving class 기대 2건 실패.

2. 구현 후 지정 컴포넌트 테스트:

   `npm test -- tests/components/createPatternScreen.test.tsx tests/components/reducedMotion.test.tsx`

   결과: `2 passed`, `14 passed`.

3. 실제 reduced-motion 접근성 E2E:

   `npm run test:e2e -- tests/e2e/accessibility.spec.ts --grep "모션 감소"`

   결과: `1 passed (1.8s)`. 실제 운행 후 `.train-track--moving` 1개, computed `animationName: none`, `transform: none`, active outline `4px`, app `data-motion="reduce"` 확인.

4. 전체 단위/컴포넌트 테스트:

   `npm test`

   결과: `30 passed`, `184 passed`.

5. 정적 검증:

   `npm run lint` — 성공.

   `npm run build` — 성공, Vite production build 완료.

   `npm run check:size` — 성공, source-size 1건 통과.

   `git diff --check` — whitespace 오류 없음.

## Self-review

- `train-track--moving`은 성공 feedback에서만 실제 컴포넌트에 붙습니다.
- reduced-motion에서도 선로 moving class는 유지되어 구조적 상태를 전달하고, CSS computed animation은 `none`이 됩니다.
- 유효한 반복 트랙에서 각 반복 단위의 시작 칸만 active 처리하며, 일반 모션에서는 active fallback을 추가하지 않습니다.
- 기존 `gi-pulse` 주 행동, 색상에 의존하지 않는 dots/stripes/crosshatch 패턴, light mode, local-only persistence 계약을 변경하지 않았습니다.
- 추가 컴포넌트는 52줄로 파일 500줄 제한을 지킵니다.
- VoiceOver 검증, 외부 release, push/deploy는 수행하지 않았습니다.

## Commit

- Commit: `1eb7535d2d49899eb4694e032524c92ece5ebf5d`
- Message: `feat: show free pattern run with motion fallback`

## Environment concerns

- 첫 E2E 시도는 기존 helper가 현재 UI의 `다음 활동: ...` 라벨 대신 오래된 `다음 칸`을 기다려 30초 timeout이 났습니다. 해당 Task 5 테스트 경로를 현재 learner-facing 라벨로 맞춘 뒤 재실행해 통과했습니다.
- 브라우저/OS VoiceOver 및 Safari 수동 게이트는 이 작업 범위에서 확인하지 않았습니다.
