# Education Webapp Redesign Report

## 결과 요약

기존 `규칙 단위 기관실`의 반복 판정·미션·로컬 저장을 건드리지 않고, 학습 여정이 보이고 다음 행동을 찾기 쉬운 화면 계층으로 리디자인했다. 시작 화면과 모든 학습 단계에 공통 여정 지도와 단계 헤더를 적용했고, 주요 제출·성공 이동·보조 행동을 `ActionRail`로 정리했다. 오답/성공 피드백은 상태 제목과 이유, 다음 행동을 함께 보여 준다. 설정 패널을 닫을 때 원래 버튼으로 포커스를 돌려 키보드 흐름도 보완했다.

구현 변경은 `53fb790` 커밋으로 푸시했고, [PR #1](https://github.com/WBmaker2/pattern-unit-engine-room/pull/1)을 squash merge하여 `main`의 `f14c6f2d293fc0c3171543093b64ef9db78de685`에 반영했다. [Quality 검증](https://github.com/WBmaker2/pattern-unit-engine-room/actions/runs/33292349396)과 [GitHub Pages 배포](https://github.com/WBmaker2/pattern-unit-engine-room/actions/runs/33292349442)는 모두 성공했다. 공개 학습자 주소는 [규칙 단위 기관실 GitHub Pages](https://wbmaker2.github.io/pattern-unit-engine-room/)다. HVC 등록·동기화는 실행하지 않았다.

## 커밋·푸시·배포 결과

| 항목 | 결과 |
|---|---|
| 기능 커밋 | `53fb790 feat: redesign pattern learner journey` |
| Pull Request | [#1 feat: redesign pattern learner journey](https://github.com/WBmaker2/pattern-unit-engine-room/pull/1), merged 2026-08-30 |
| `main` 병합 커밋 | `f14c6f2d293fc0c3171543093b64ef9db78de685` |
| `main` Quality workflow | [run 33292349396](https://github.com/WBmaker2/pattern-unit-engine-room/actions/runs/33292349396), PASS |
| Pages Deploy workflow | [run 33292349442](https://github.com/WBmaker2/pattern-unit-engine-room/actions/runs/33292349442), PASS |
| 공개 URL | [https://wbmaker2.github.io/pattern-unit-engine-room/](https://wbmaker2.github.io/pattern-unit-engine-room/) |

Pages 배포 run은 빌드와 배포 job을 모두 통과했고 공개 주소는 HTTP 200으로 응답했다. 워크플로 로그에는 Node.js 20 actions deprecation 안내가 annotation으로 남았지만 현재 릴리스를 막는 오류는 아니다.

## 설계 요구사항 연결

| 설계 요구사항 | 구현·검증 근거 |
|---|---|
| `[2수02-01]` 최소 반복 단위 찾기 | `StageHeader`, `find` 화면의 기존 판정과 `LearningJourney` 1단계 |
| `[2수02-02]` 정한 규칙으로 배열 만들기 | `create-unit`/`create-track`의 기존 reducer와 공통 행동 레일 |
| 찾기·이어 붙이기·수리·번역·창안 | `src/features/*/*Screen.tsx` 다섯 화면과 `learner-flow.spec.ts` |
| AB/AAB/ABB/ABC MVP | `src/content/missions/*`와 기존 도메인 테스트를 그대로 보존 |
| 색상 외 모양·무늬·텍스트 | `PatternCell`, `ChoiceGrid`, 흑백 Journey E2E |
| 48px·키보드·reduced motion | `base.css`, `motion.css`, `accessibility.spec.ts` 8개 시나리오 |
| 외부 서버·학생 데이터 없음 | `privacy.spec.ts` 5개 시나리오, 로컬 MP3만 허용 |
| 업데이트 내역 날짜 기록 | `src/content/updateHistory.ts`에 2026-08-30·2026-08-29 개선 항목과 이전 기록 유지 |
| VoiceOver 제외 | 계획·구현·검증에서 실행하지 않음 |

## 변경 파일과 책임

### 새 공통 컴포넌트

- `src/components/LearningJourney.tsx`: `JourneyProgressItem[]`을 `<nav aria-label="학습 여정">`와 상태 텍스트로 렌더링한다.
- `src/components/StageHeader.tsx`: `StageNumber = 1 | 2 | 3 | 4 | 5`로 단계 제목·행동 문장·진행을 고정한다.
- `src/components/ActionRail.tsx`: `role="group"` 안에서 primary → next → secondary DOM 순서를 보장한다.

### 기존 컴포넌트·화면

- `src/features/session/selectors.ts`: `selectJourneyProgress`와 `JourneyProgressItem` 읽기 모델을 추가했다.
- `src/components/AppShell.tsx`: 제목 다음에 여정 지도를 삽입하고 업데이트 내역 모달의 inert/포커스 복귀를 유지한다.
- `src/features/start/StartScreen.tsx`: 출발 카드·그림·시작/설정 행동을 정리하고 시작 primary에 `gi-pulse`를 적용했다.
- `src/features/find/FindUnitScreen.tsx`, `continue/ContinuePatternScreen.tsx`, `repair/RepairPatternScreen.tsx`, `translate/TranslatePatternScreen.tsx`, `create/CreatePatternScreen.tsx`: 공통 `StageHeader`/`ActionRail`을 사용하도록 정리했다.
- `src/components/FeedbackPanel.tsx`: `role="status"`, retry/success 제목, 선택적 `nextActionLabel`/`onNext`를 추가했다.
- `src/components/InstructionCard.tsx`: StageHeader가 보이는 안내를 소유할 때 음성 비활성 빈 카드를 만들지 않는다.
- `src/styles/tokens.css`, `src/styles/components.css`: 의미 기반 토큰, 반응형 지도/행동 레일, 320px 레이아웃 규칙을 연결했다.
- `src/content/updateHistory.ts`, `src/content/copy.ts`: 리디자인 변경 날짜와 단계 문구를 기록했다.

모든 변경 소스는 500줄 미만이다. 최장 소스는 `src/styles/components.css` 395줄이다.

## 자동 검증 증거

실행한 명령과 결과는 다음과 같다.

```text
npm run check
  ESLint: PASS (오류 0, 경고 0)
  Vitest: 36개 파일, 204개 테스트 PASS
  TypeScript/Vite build: PASS (dist 생성)

npm run check:size
  source-size: 1개 테스트 PASS

git diff --check
  PASS

npm run test:e2e (승인된 권한으로 재실행)
  Chromium E2E: 16개 테스트 PASS (최종 16.3초)

git diff --check
  PASS
```

초기 sandbox 권한으로 실행한 E2E는 macOS Chromium의 `MachPortRendezvous ... Permission denied`로 브라우저 시작 전에 0ms 실패했다. 코드를 변경하지 않고 승인된 권한으로 한 번 재실행했으며 위의 16개 PASS를 얻었다. 이 환경성 실패와 코드 검증 결과를 분리해 기록한다.

Playwright E2E는 프로젝트 개발 서버를 격리 포트에서 실행해 통과시켰다. 대화형 검토에서는 `127.0.0.1:5181` 서버와 `pattern-redesign` 세션을 사용했으며, 검토가 끝난 뒤 서버·브라우저를 종료했다.

## 브라우저·학습자 관점 확인

승인된 Playwright Chromium으로 390×844와 1280×900을 확인하고, 오답 재시도·설정 토글·설정 닫기·업데이트 대화상자 경로를 직접 실행했다.

- 시작 화면: 제목 2개(앱 제목·시작 질문), `학습 여정` 1개, 버튼 순서 `운행 시작 → 접근성 설정 → 업데이트 내역`
- 첫 미션: `찾기 현재 → 이어 붙이기 예정 → 수리하기 예정 → 번역하기 예정 → 만들기 예정`, 현재 단계 `1 / 5`
- 정답 제출 뒤 `잘했어요 → 가장 짧은 한 묶음을 찾았어요.` 피드백과 teal `다음 활동: 이어 붙이기` primary가 보이며, 다음 버튼에는 pulse가 없음
- 오답 후보 1 선택 뒤 `다시 해 봐요`와 `이 묶음으로는 끝까지 되풀이되지 않아요.`가 나타남
- 모션 줄이기 토글 뒤 상태가 `켜짐`과 `모션을 줄여서 보여 줘요.`로 바뀌고, 설정 닫기 뒤 설정 버튼이 포커스를 가짐
- 업데이트 대화상자 닫기 뒤 업데이트 버튼이 포커스를 가짐
- 390px/1280px에서 `scrollWidth === clientWidth`; 390px 시작 캡처에서 CTA가 첫 화면 안에 보임
- 시작 제목 중복 없음, 비활성 제출 버튼에 활성 primary marker 없음
- 로컬 브라우저 콘솔 `Errors: 0`, `Warnings: 0`; 로컬 정적 요청은 `127.0.0.1:5181` 동일 출처뿐
- 공개 Pages 브라우저에서도 제목 `규칙 단위 기관실`, 첫 미션 `한 묶음 찾기`, 정답 피드백 `잘했어요`를 확인했다. 390px 공개 화면의 `scrollWidth`와 `clientWidth`는 각각 390이며, 콘솔 `Errors: 0`, `Warnings: 0`, 요청 4건은 모두 `https://wbmaker2.github.io/pattern-unit-engine-room/` 동일 출처였다.

캡처 파일은 검토용으로 [start-390.png](../output/playwright/redesign/start-390.png), [start-1280.png](../output/playwright/redesign/start-1280.png), [find-1280.png](../output/playwright/redesign/find-1280.png), [find-success-1280.png](../output/playwright/redesign/find-success-1280.png)에 남겼다. 이는 프로젝트 런타임 자산으로 참조하지 않는다.

## 자산·지원 스킬 상태

- `src/components/StartMissionIllustration.tsx`의 기존 인라인 SVG, `public/favicon.svg`, `public/audio/ko/*.mp3`는 맥락·접근성·출처 안전성 때문에 유지했다.
- `references/asset-safety.md`를 읽고 자산 분류를 `work/education-webapp-redesign-assets.md`에 기록했다. `$imagegen` 지침(`/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`)도 읽었으나 새 raster 이미지가 필요하지 않아 생성 호출은 하지 않았다.
- `$impeccable`(`/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md`), `$ui-ux-pro-max`(`/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md`), `$redesign-existing-projects`(`/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md`)를 실제 경로에서 읽고 역할에 맞게 적용했다. `detect.mjs`는 1회 실행해 `[]`를 반환했으며, `$ui-ux-pro-max` 검색은 semantic HTML·focus·touch·reduced motion 기준을 확인하는 데 사용했다.

## 남은 사람 검토

- 실제 초등학생 1~2학년과 교사가 문장 난이도·손가락 조작·학습 이해를 확인하는 현장 사용성 검토는 수행하지 않았다.
- 실제 iOS Safari/Android 물리 기기와 브라우저 200% 확대의 시각 품질은 자동 E2E 결과와 별도 확인이 필요하다. 200% 결합 확대 harness 자체는 자동 E2E에서 통과했다.
- VoiceOver 검증은 프로젝트 범위에서 제외했다.

## 롤백

현재 `main`에는 `f14c6f2d293fc0c3171543093b64ef9db78de685`가 배포되어 있다. 문제가 확인되면 해당 커밋을 기준으로 별도 수정 커밋을 만들고 Quality workflow와 Pages 배포를 다시 통과시킨 뒤 공개 URL에서 회귀를 확인한다. `work/`와 `design-system/` 문서는 감사·계획 이력으로 보존한다.

현재 공개 빌드: [규칙 단위 기관실](https://wbmaker2.github.io/pattern-unit-engine-room/)
