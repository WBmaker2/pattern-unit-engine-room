# 접근성·개인정보 완료 검증 체크리스트

검증일: 2026-08-26<br>
범위: Task 15 자동 E2E와 Safari + VoiceOver 수동 검증 경계

## 자동 검증 결과

자동 검증은 로컬 `127.0.0.1` Vite 서버와 Playwright Chromium에서 실행했습니다. 테스트는 매번 localStorage를 비우고, 외부 네트워크 요청을 허용하지 않는 증거 수집을 포함합니다.

| 영역 | 명령 | 실제 결과 |
|---|---|---|
| 학습자 흐름 | `npm run test:e2e -- tests/e2e/learner-flow.spec.ts` | PASS · 2 tests |
| 모바일·확대·모션·키보드·Axe | `npm run test:e2e -- tests/e2e/accessibility.spec.ts` | PASS · 6 tests |
| 개인정보·색상 독립성 | `npm run test:e2e -- tests/e2e/privacy.spec.ts` | PASS · 3 tests |

자동 검증에서 확인한 항목:

- Journey 0을 드래그 없이 완료하고 다섯 활동 도장을 확인했습니다.
- 의도적 오답 → 피드백·힌트 → 재시도를 Find와 Continue/Repair에서 확인했습니다.
- 320px 가로 overflow 없음과 보이는 interactive target 48×48 CSS px 이상을 확인했습니다.
- 640px 장치 폭·deviceScaleFactor 2·CDP page scale 설정으로 CSS 가용 폭을 절반 취지로 제한하고 핵심 요소 경계를 확인했습니다.
- `prefers-reduced-motion: reduce`에서 `gi-pulse`/열차 이동 animation이 `none`, 도움 칸 outline이 4px임을 확인했습니다.
- 각 단계의 활성 `data-primary-action`이 최대 하나이고, Tab 포커스 후 Enter/Space로 전체 흐름을 완료함을 확인했습니다.
- Find, Continue, Repair, Translate, Create, Summary 각 상태의 Axe violations 0개를 확인했습니다.
- 앱 요청은 앱 origin으로만 발생했으며 외부 origin 0개, 앱의 녹음 API 호출 0개였습니다. Vite HMR WebSocket은 앱 호출과 분리해 기록했습니다.
- 기본 진행 저장은 없고, 동의 후 `pattern-unit-engine-room:v1` 하나만 저장되며 `PersistedProgressV1` allowlist와 금지 개인정보 필드 검사를 통과했습니다.
- grayscale CSS 주입 후에도 visible label만으로 Journey 0을 완료했습니다.

실행 환경:

- macOS, Node.js `v24.13.1`, Playwright `1.62.1`, Google Chrome for Testing `151.0.7922.34`, Chromium 프로젝트 1개, workers 1, retries 0
- webServer: `npm run dev -- --host 127.0.0.1`, baseURL: `http://127.0.0.1:5173`
- 실패 산출물 위치: 기존 ignored 디렉터리 `test-results/` (커밋 대상 아님)

## Safari + VoiceOver 수동 검증

상태: **수동 검증 대기**

이 실행에서는 macOS Safari에서 VoiceOver를 켜고 실제 청취·읽기 검증을 수행하지 않았습니다. 자동 accessibility tree와 Axe 결과를 사람의 청취 검증을 대신한 것으로 간주하지 않습니다.

다음 항목을 Safari에서 실제로 확인한 뒤 날짜·기기·결과를 갱신해야 합니다.

1. 제목 → 안내 → 배열 → 선택지 → 제출 순서로 VoiceOver 포커스가 이동합니다.
2. 첫째~아홉째 칸이 순서·모양·무늬 또는 빈칸을 중복 없이 읽습니다.
3. 오답 피드백이 `polite`로 한 번 읽히고 현재 선택 초점을 빼앗지 않습니다.
4. 접근성 설정과 업데이트 내역 대화상자가 제목을 읽고 Escape 뒤 trigger로 돌아옵니다.
5. 안내 음성을 끈 상태에서도 모든 문구가 읽힙니다.
6. 키보드만으로 Journey 0과 자유 규칙을 완료하며 드래그·더블 클릭이 필요하지 않습니다.
7. Safari 200% 확대와 320px 반응형 모드에서 핵심 버튼과 업데이트 내역 버튼이 겹치지 않습니다.

수동 검증자가 위 항목을 실제 수행하기 전에는 본 체크리스트를 전체 PASS로 표시하지 않습니다.
