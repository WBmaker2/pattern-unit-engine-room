# Task 4 구현 보고서

## 범위

접근성 설정의 네 가지 스위치에 `켜짐`/`꺼짐` 상태를 글자로 표시하고, 켜진 `이 기기에서 이어 하기`를 끌 때 확인 전에는 설정과 localStorage를 바꾸지 않도록 구현했습니다. 확인 패널에서 `이어 하기 끄기`를 눌렀을 때만 `onChange`가 `persistenceEnabled: false`를 전달하며, App의 기존 `disablePersistence` 경로가 저장 키를 지웁니다.

## 변경 파일

- `src/features/settings/AccessibilitySettings.tsx`
  - `SettingSwitch` 인터페이스에 `stateLabel` 추가.
  - 모든 switch에 visible `켜짐`/`꺼짐` 상태 추가.
  - `aria-label`을 설정 이름으로 고정하고 기존 `aria-checked` 계약 유지.
  - `confirmPersistenceOff: boolean` 상태 추가.
  - 이어 하기 끄기 첫 입력은 alertdialog만 열고, 확인 버튼에서만 `onChange` 호출.
  - `계속 사용`은 패널만 닫고 기존 켜짐 상태 유지.
- `src/content/copy.ts`
  - 상태/확인 패널 문구 추가.
  - 저장 해제 안내를 확인 후 삭제로 정정.
- `src/styles/components.css`
  - 상태 텍스트 및 확인 패널/버튼 레이아웃 추가.
  - 확인 버튼도 최소 48px inline 크기 유지.
- `tests/components/accessibilitySettings.test.tsx`
  - 상태 텍스트, 승인, 취소 및 즉시 호출 방지 테스트 추가.
- `tests/unit/copy.test.ts`
  - 저장 해제 안내 문구 기대값 갱신.
- `tests/e2e/privacy.spec.ts`
  - 승인 전 localStorage 보존, 취소 후 켜짐 유지, 승인 후 키 삭제 E2E 추가.
  - 기존 회색조 흐름의 현재 학습 단계 버튼 문구를 갱신해 privacy 전체 흐름을 현재 UI와 일치시킴.

## TDD 및 검증 결과

1. 테스트 우선: 상태/확인 테스트 2건을 먼저 추가했습니다.
2. RED 확인: `npm test -- tests/components/accessibilitySettings.test.tsx`
   - 7 tests 중 2 failed, 5 passed.
   - `켜짐` 텍스트와 `이어 하기 끄기 확인` alertdialog 부재를 확인했습니다.
3. 구현 후 설정/저장소: `npm test -- tests/components/accessibilitySettings.test.tsx tests/unit/progressStore.test.ts`
   - 2 files passed, 32 tests passed.
4. 개인정보 E2E: `npm run test:e2e -- tests/e2e/privacy.spec.ts`
   - 4 tests passed.
   - 앱 origin/로컬 음원 요청 제한, 기본 off/최소 저장, 이어 하기 끄기 확인·삭제, 회색조 Journey 0 흐름을 통과했습니다.
5. 전체 단위 테스트: `npm test`
   - 30 files passed, 177 tests passed.
6. 정적 검사: `npm run lint`
   - `eslint . --max-warnings=0` 통과.
7. 빌드: `npm run build`
   - TypeScript 및 Vite production build 통과.
8. 파일 크기: `npm run check:size`
   - architecture source-size test 통과.
9. 통합 확인: `npm run check`
   - lint, 30개 테스트 파일/177개 테스트, build 모두 통과.
10. `git diff --check`
    - 공백 오류 없음.

## 자체 검토

- 확인 전에는 `onChange` 및 저장 키 삭제가 실행되지 않습니다.
- `aria-checked`와 설정 이름 접근성 이름을 유지했습니다.
- 상태를 색상에 의존하지 않고 글자로 표시했습니다.
- 확인/취소 버튼 및 스위치의 48px 최소 크기를 유지했습니다.
- light mode, local-only opt-in 저장, 기존 `gi-pulse` 및 reduced-motion 동작을 변경하지 않았습니다.
- 새 컴포넌트 파일은 125줄로 500줄 제한 이내입니다.
- VoiceOver 검증과 외부 릴리스(커밋 이후 push/deploy)는 범위에서 제외했습니다.

## 커밋

- 초기 구현 커밋: `51ca87d fix: make accessibility settings explicit and safe`

## 우려/보류

- 리뷰에서 저장 삭제 실패 시 fail-closed 계약과 확인 패널의 키보드 초점 계약을 보강하도록 요청받아 수정 라운드를 진행합니다.
- 브라우저 기반 E2E는 Chromium으로 확인했으며, VoiceOver·Safari·실기기 수동 검증은 지침대로 수행하지 않았습니다.

## Fix round 1

### 리뷰 반영

- `ProgressStore.clear()`가 `boolean` 성공값을 반환하도록 계약을 확장했습니다.
- `removeItem` 후 키를 다시 읽어 실제로 사라졌는지도 확인하며, 예외 또는 잔존 시 `false`를 반환합니다.
- App은 이어 하기 삭제 실패 시 `UPDATE_SETTINGS`를 dispatch하지 않고 `false`를 반환합니다. 설정 UI도 실패 응답을 받으면 확인 패널을 유지해 성공으로 오인하지 않게 했습니다.
- 확인 alertdialog의 `aria-modal="true"`에 맞춰 첫 확인 버튼 자동 포커스, Escape 닫기, 확인/취소 후 스위치 포커스 복원, 두 버튼 간 Tab/Shift+Tab 순환을 구현했습니다.
- 패널이 열려 있는 동안 배경 설정 스위치와 설정 닫기 버튼을 disabled 처리해 Tab 대상에서 제외했습니다.

### Fix TDD

1. RED: `npm test -- tests/components/accessibilitySettings.test.tsx tests/unit/progressStore.test.ts`
   - 새 실패 5건을 확인했습니다(저장소 clear 반환값 2건, alertdialog 포커스/승인 포커스/App 실패 유지 3건).
2. 구현 후 동일 명령
   - 2 files passed, 36 tests passed.
3. 전체 단위 테스트: `npm test`
   - 30 files passed, 181 tests passed.
4. 개인정보 E2E: `npm run test:e2e -- tests/e2e/privacy.spec.ts`
   - Chromium 4 tests passed.
5. 정적 검사/빌드: `npm run lint`, `npm run build`, `npm run check:size`
   - 모두 통과했습니다.
6. `git diff --check`
   - 공백 오류 없음.

### 자체 검토

- 정상 삭제는 `true`를 반환하고 키를 제거하며, throwing `removeItem`은 `false`를 반환하고 기존 키/동의를 보존합니다.
- App 실패 경로는 persistence 설정을 끄지 않고 확인 패널을 유지합니다.
- 모달 포커스 순환은 확인/취소 두 버튼 안에서만 일어나며, Escape와 두 버튼 모두 스위치로 포커스를 되돌립니다.
- 관련 파일은 모두 500줄 미만이며 VoiceOver, push, deploy는 수행하지 않았습니다.

### Fix 커밋

- 구현 커밋: `714e1b5 fix: fail closed persistence disable and modal focus`
- 보고서 전용 커밋: `ca10fb5 docs: record task 4 fix round`, `ef21770 docs: finalize task 4 fix report`

## Fix round 2

### 리뷰 반영

- confirmation alertdialog를 `react-dom` portal로 `document.body`에 렌더링해 inert 배경 밖에 두었습니다.
- AppShell에 `modalOpen` 계약을 추가하고, 확인 패널이 열린 동안 실제 App의 `.app-shell__content`에 `inert`와 `aria-hidden`을 적용했습니다.
- AppShell의 시작 버튼, 접근성 설정 버튼, 업데이트 내역 버튼을 Tab 대상에서 제외하고, 닫으면 원래 tabindex를 복원합니다.
- 기존 확인 버튼 포커스, Escape/Tab 순환 및 persistence 스위치 포커스 복원을 유지했습니다.
- 시작 화면과 footer 업데이트 버튼까지 차단하는 App 회귀 테스트를 추가했습니다.

### Fix round 2 검증

- RED: `npm test -- tests/components/accessibilitySettings.test.tsx`
  - App 경로 회귀 테스트가 inert 배경 부재로 1건 실패했습니다.
- 구현 후: `npm test -- tests/components/accessibilitySettings.test.tsx`
  - 12 tests passed.
- 저장/설정 집중 검증: `npm test -- tests/components/accessibilitySettings.test.tsx tests/unit/progressStore.test.ts`
  - 2 files passed, 37 tests passed.
- 개인정보 E2E: `npm run test:e2e -- tests/e2e/privacy.spec.ts`
  - Chromium 4 tests passed.
- 정적 검사: `npm run lint`
  - 통과.
- 빌드: `npm run build`
  - TypeScript 및 Vite production build 통과.
- 파일 크기: `npm run check:size`
  - 통과.
- `git diff --check`
  - 공백 오류 없음.

### Fix round 2 자체 검토

- 모달 확인 중에는 실제 App의 시작/설정/업데이트 컨트롤이 pointer·keyboard 상호작용에서 inert 처리됩니다.
- 모달이 취소 또는 승인으로 닫히면 배경 tabindex와 persistence 스위치 포커스가 복원됩니다.
- portal backdrop는 기존 light mode 색상 토큰과 48px 버튼 제약을 사용합니다.
- VoiceOver, push, deploy는 수행하지 않았으며 MachPortRendezvous 환경 오류도 발생하지 않았습니다.

### Fix round 2 커밋

- 구현 커밋: `5bd4c3b fix: make persistence confirmation a page modal`
- 보고서 전용 커밋: `9588637 docs: finalize task 4 modal report`

## Fix round 3

### 리뷰 반영

- 모달 닫힘 effect와 AppShell의 배경 `inert` 해제 effect 순서가 엇갈려 persistence 스위치가 body에 포커스를 잃을 수 있던 문제를 수정했습니다.
- 확인 패널이 닫힌 뒤 `requestAnimationFrame`에서 스위치를 찾고, 아직 `inert` 조상 아래에 있으면 다음 frame에서 재시도하도록 했습니다. 스위치가 없거나 disabled인 경우에는 포커스하지 않으며, effect cleanup에서 예약 frame을 취소합니다.
- 컴포넌트 테스트는 비동기 포커스 복구를 `waitFor`로 확인하고, Chromium privacy E2E는 취소와 실제 삭제 확인 모두 `document.activeElement`가 `이 기기에서 이어 하기` 스위치인지 검증합니다.

### Fix round 3 TDD 및 검증

1. RED: `npm run test:e2e -- tests/e2e/privacy.spec.ts -g '이어 하기를 끌 때'`
   - 구현 전 새 실제 브라우저 포커스 assertion이 취소 후 `document.activeElement`의 `aria-label`을 `null`로 받아 5초 timeout으로 실패했습니다.
2. 구현 후 집중 설정/저장소 테스트: `npm test -- tests/components/accessibilitySettings.test.tsx tests/unit/progressStore.test.ts`
   - 2 files passed, 37 tests passed.
3. 회귀 Chromium 경로: `npm run test:e2e -- tests/e2e/privacy.spec.ts -g '이어 하기를 끌 때'`
   - 1 test passed. 취소와 확인 후 모두 persistence 스위치로 포커스를 복구했습니다.
4. 개인정보 E2E 전체: `npm run test:e2e -- tests/e2e/privacy.spec.ts`
   - Chromium 4 tests passed.
5. 정적 검사: `npm run lint`
   - `eslint . --max-warnings=0` 통과.
6. 빌드: `npm run build`
   - TypeScript 및 Vite production build 통과.
7. 파일 크기: `npm run check:size`
   - architecture source-size test 1 passed.
8. `git diff --check`
   - 공백 오류 없음.

### Fix round 3 자체 검토

- 실제 App 경로의 page-level modal blocking(`inert`, `aria-hidden`, tabindex 복원)은 유지했습니다.
- 포커스 복구는 배경 inert 해제 이후에만 수행되므로 modal close effect 순서에 의존해 focus가 거부되지 않습니다.
- 취소/확인 모두 스위치 focus 복구를 실제 Chromium과 컴포넌트 테스트에서 확인했습니다.
- VoiceOver, push, deploy는 수행하지 않았습니다. 이번 검증에서는 MachPortRendezvous 오류도 발생하지 않았습니다.
- 변경 파일은 모두 500줄 미만입니다.

### Fix round 3 커밋

- 구현 커밋: `f955f58 fix: restore persistence focus after modal cleanup`
- 보고서 전용 커밋: 이 문서 자체를 참조하는 해시는 self-reference를 피하기 위해 최종 전달 내용에 별도로 기록합니다.
