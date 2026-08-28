# 접근성·개인정보 완료 검증 체크리스트

검증일: 2026-08-28<br>
범위: Task 15 자동 E2E와 Task 8 자동 접근성·개인정보 검증 범위

## 자동 검증 결과

자동 검증은 로컬 `127.0.0.1` Vite 서버와 Playwright Chromium에서 실행했습니다. 테스트는 매번 localStorage를 비우고, 외부 네트워크 요청을 허용하지 않는 증거 수집을 포함합니다.

| 영역 | 명령 | 실제 결과 |
|---|---|---|
| 학습자 흐름 | `npm run test:e2e -- tests/e2e/learner-flow.spec.ts` | PASS · 3 tests |
| 모바일·확대·모션·키보드·Axe | `npm run test:e2e -- tests/e2e/accessibility.spec.ts` | PASS · 6 tests |
| 개인정보·색상 독립성 | `npm run test:e2e -- tests/e2e/privacy.spec.ts` | PASS · 3 tests |

자동 검증에서 확인한 항목:

- Journey 0을 드래그 없이 완료하고 다섯 활동 도장을 확인했습니다.
- 의도적 오답 → 피드백·힌트 → 재시도를 Find와 Continue/Repair에서 확인했습니다.
- 320px 가로 overflow 없음과 보이는 interactive target 48×48 CSS px 이상을 확인했습니다.
- 640px physical metrics와 CDP `pageScaleFactor=2`를 navigation 이후 적용하고, pinch scale만으로 reflow되지 않는 점을 반영해 테스트 harness의 `html`·`body`·`#root`에 명시적 320px CSS surface를 주입했습니다. 실제 Chromium `visualViewport.scale=2`, `visualViewport.width=320`, root width `<=320`을 확인하고 핵심 요소의 visual 좌우·상하 경계, 자체 clipping, 문서 좌표 상호 겹침을 검사했습니다. 이는 native browser page zoom 결과가 아닌 결합 harness입니다.
- `prefers-reduced-motion: reduce`에서 Journey 0의 실제 Create 선로에 `운행하기`를 누른 뒤 `.train-track--moving`이 존재하고 computed animation과 transform이 `none`, `.pattern-cell--active` outline이 4px임을 확인했습니다.
- 각 단계의 활성 `data-primary-action`이 최대 하나이고, Tab 포커스 후 Enter/Space로 전체 흐름을 완료함을 확인했습니다.
- Find, Continue, Repair, Translate, Create, Summary 각 상태의 Axe violations 0개를 확인했습니다.
- Start에서 안내 음성을 켜고 `안내 듣기`를 눌러 정확한 same-origin `/audio/ko/start.mp3` 요청과 HTTP 206 Range 응답을 확인했습니다. 허용 음원은 `start.mp3`, `find.mp3`, `continue.mp3`, `repair.mp3`, `translate.mp3`, `create.mp3`, `complete.mp3` 7개로만 제한했습니다. settle window 뒤에도 외부 origin 0개, 허용된 Vite asset prefix·7개 로컬 audio 외 경로 0개, 앱의 녹음 API 호출 0개였습니다. Vite HMR WebSocket은 앱 호출과 분리해 기록했습니다.
- 기본 진행 저장은 없고, 동의 후 `pattern-unit-engine-room:v1` 하나만 저장되며 `PersistedProgressV1` allowlist와 금지 개인정보 필드 검사를 통과했습니다.
- grayscale CSS 주입 후에도 visible label만으로 Journey 0을 완료했습니다.

실행 환경:

- macOS, Node.js `v24.13.1`, Playwright `1.62.1`, Google Chrome for Testing `151.0.7922.34`, Chromium 프로젝트 1개, workers 1, retries 0
- webServer: `npm run dev -- --host 127.0.0.1`, baseURL: `http://127.0.0.1:5173`
- 실패 산출물 위치: 기존 ignored 디렉터리 `test-results/` (커밋 대상 아님)

## 로컬 안내 음성 사람 청취 검수

상태: **사람의 청취 검수 대기**

자동 검증에서는 7개 로컬 MP3의 exact transcript/path/MIME/codec/duration과 동일 출처 브라우저 요청을 확인했습니다. 이는 파일·경로 계약과 자동 재생 경계를 확인한 결과이며, 사람이 음질을 듣고 판단한 결과가 아닙니다. 아래 항목을 실제 사람이 듣기 전에는 PASS로 표시하지 않습니다.

- 발음이 어린 학습자에게 자연스럽고 정확한가
- 속도가 한 차시 활동을 따라갈 수 있는가
- 명료도가 작은 기기에서도 충분한가
- 아동 적합성이 있는 말투·내용인가
- 볼륨이 안내로 적절하고 자극적이지 않은가

안내 음성의 사람 청취 검수와 자동 접근성 계약은 서로 다른 범위입니다. VoiceOver 검증은 이 개선 범위에 포함하지 않습니다. 자동 검증은 keyboard, Axe, DOM, 320px, 200%, reduced-motion, privacy 계약으로 기록합니다.
