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

- 커밋 메시지: `fix: make accessibility settings explicit and safe`
- 커밋 해시: `a59032d`

## 우려/보류

- 남은 기능상 우려는 없습니다.
- 브라우저 기반 E2E는 Chromium으로 확인했으며, VoiceOver·Safari·실기기 수동 검증은 지침대로 수행하지 않았습니다.
