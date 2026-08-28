# Learner UX Improvement 결과

## Scope

Task 9 전체 품질 게이트와 HVC 전달용 결과 기록입니다. Task 1–8의 학습 흐름, 선택 상태, 단계별 다음 활동 레이블, 접근성·개인정보·모션 계약을 대상으로 검증했습니다. 구 레이블 `다음 칸`을 기다리던 접근성 E2E 선택자를 현재 learner-facing 레이블(`다음 활동: ...`, `활동 도장 보기`)로 정렬했습니다.

## Automated evidence

로컬 검증 시각: 2026-08-28 15:37 KST (macOS, branch `codex/learner-ux-improvements`)

1. 변경 직후 게이트

   ```text
   npm run check:size       PASS — Test Files 1 passed, Tests 1 passed
   npm run lint             PASS
   npm test                 PASS — Test Files 30 passed, Tests 192 passed
   npm run build            PASS — 65 modules transformed; built in 96ms
   npm run test:e2e         FAIL (sandbox 실행 환경) — 16개가 Chromium
   MachPortRendezvous ... Permission denied (1100) / SIGTRAP으로 0ms 실패
   ```

   외부 실행 환경에서 재검증한 결과, 구 레이블 선택자 4건이 timeout됐고 이를 수정했습니다.

2. 수정 후 게이트

   ```text
   npx playwright test tests/e2e/accessibility.spec.ts
   PASS — 8 passed (9.6s)

   npm run check
   PASS — lint; Test Files 30 passed; Tests 192 passed; build 65 modules transformed

   npm run test:e2e
   PASS — 16 passed (16.2s), 1 worker
   ```

   세부 증거(각 상태의 소유 spec/test 포함):

   | 상태 | 결과 | 명령 | 소유 spec/test 및 실제 결과 |
   | --- | --- | --- | --- |
   | source/type-check | PASS | `npm run build` (`tsc -b`) | TypeScript strict project check 통과 |
   | unit/component | PASS | `npm test` | Vitest 30 files / 192 tests 통과 |
   | production build | PASS | `npm run build` | Vite 65 modules transformed, production build 통과 |
   | browser E2E (sandbox) | 환경 차단 | `npm run test:e2e` | Chromium `MachPortRendezvous ... Permission denied (1100)`/`SIGTRAP`; 16개 0ms 실패 |
   | browser E2E (외부 실행) | PASS | `npm run test:e2e` | `tests/e2e/accessibility.spec.ts` 8/8, `tests/e2e/learner-flow.spec.ts` 3/3, `tests/e2e/privacy.spec.ts` 5/5; 전체 16/16 |
   | privacy | PASS | 위 전체 E2E의 `tests/e2e/privacy.spec.ts` | 앱 origin/로컬 음원, 최소 저장·삭제 확인, grayscale Journey 0; 5/5 |
   | Axe | PASS | 위 전체 E2E의 `tests/e2e/accessibility.spec.ts` | `Find·Continue·Repair·Translate·Create·Summary의 Axe 위반이 0개다` (line 390), 1/1 |
   | keyboard | PASS | 위 전체 E2E의 `tests/e2e/accessibility.spec.ts` | `Tab으로 이동하고 Enter·Space로 Journey 0 전체를 완료한다` (line 356), 1/1 |
   | 320px | PASS | 위 전체 E2E의 `tests/e2e/accessibility.spec.ts` | 320px·390px 겹침/가로 넘침 및 48px 검사 (lines 114, 128), 2/2 |
   | 200% zoom | PASS | 위 전체 E2E의 `tests/e2e/accessibility.spec.ts` | 640px viewport 2배 페이지 배율 검사 (line 167), 1/1 |
   | reduced-motion | PASS | 위 전체 E2E의 `tests/e2e/accessibility.spec.ts` | 실제 운행의 moving track/정적 4px 테두리 검사 (line 279), 1/1 |
   | grayscale | PASS | 위 전체 E2E의 `tests/e2e/privacy.spec.ts` | `색을 회색조로 바꾸어도 visible label만으로 Journey 0을 완료한다` (line 222), 1/1 |

3. 변경 무결성 및 크기

   ```text
   git diff --check
   PASS — whitespace 오류 없음

   find src tests ... | sort -nr | head
   PASS — 최대 파일 tests/e2e/accessibility.spec.ts 405줄 (모든 코드 파일 499줄 이하)
   ```

## Public learner URL

[https://wbmaker2.github.io/pattern-unit-engine-room/](https://wbmaker2.github.io/pattern-unit-engine-room/)

읽기 전용 `curl -I -L -sS` 확인: `HTTP/2 200`, `last-modified: Wed, 26 Aug 2026 23:06:17 GMT`. 현재 로컬 변경은 아직 push/deploy하지 않았으므로, 위 공개 URL은 이 브랜치 변경이 반영된 주소가 아니라 이전 배포본입니다.

## Known limits

- 자동 검증은 unit/component, TypeScript strict build, Chromium E2E, Axe, keyboard, 320px·200%·reduced-motion·grayscale·privacy 계약 범위입니다.
- VoiceOver 구현·검증은 이 개선 범위 외입니다.
- 음원 청취 적합성, 사람의 콘텐츠·시각 검수, 별도 release approval은 자동 PASS와 분리된 후속 게이트입니다.

## Changed files

- `tests/e2e/accessibility.spec.ts` — 최신 단계 전환 및 완료 버튼 accessible name에 맞춘 E2E 선택자 15건 정렬
- `README.md` — 실제 전체 수치로 Chromium E2E 16건, unit/component 포함 192건 갱신
- `docs/qa/2026-08-28-learner-ux-improvement-result.md` — 본 결과 기록

참고: `.superpowers/sdd/2026-08-28-pattern-unit-engine-room-improvement-plan/task-9-report.md`는 저장소 ignore 대상인 로컬 워커 아티팩트이며, Task 9 커밋의 변경 파일에는 포함되지 않습니다. `git show --name-only f91164f`로 확인한 커밋 변경 파일은 위 세 파일입니다.

## Release status

로컬 브랜치는 Task 9 evidence 커밋 `f91164f`와 이 검토 수정 커밋을 포함한 현재 HEAD에서 clean입니다(`git status --short` 출력 없음). 이 Task에서는 `git push`, GitHub 설정, Pages 배포를 실행하지 않았습니다. 공개 URL은 이전 배포본이며 로컬 브랜치 변경의 공개 반영을 의미하지 않습니다.
