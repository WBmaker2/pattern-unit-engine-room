# Education Webapp Redesign Asset Review

## Review basis

- Project: `/Volumes/ External Drive 256G/Dev2/codex/pattern-unit-engine-room`
- Safety rules: `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/references/asset-safety.md`
- Decision: existing assets communicate the learning context without factual claims, external tracking, or broken references. No new image is needed for this redesign.
- Skill status (2026-08-30): `$imagegen` instructions were read from `/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`. The tool was not called because the existing inline SVG already explains the departure mission and adding a decorative raster would not improve the learning goal.

## Asset map

| 원본 | 화면·역할 | 판정 | 새 파일 | 접근성 | 상태 | 롤백 |
|---|---|---|---|---|---|---|
| `src/components/StartMissionIllustration.tsx` | 출발역의 가상 기관차 개념 그림 | 유지 | 없음 | 순수 장식일 때 `aria-hidden="true"`; 제목 prop을 전달한 별도 맥락에서만 SVG title로 의미를 읽음 | 확인 완료, JSX 참조 유지 | 컴포넌트 렌더링을 기존 `<StartMissionIllustration />` 호출로 되돌림 |
| `public/favicon.svg` | 브라우저 탭의 앱 식별 아이콘 | 유지 | 없음 | 문서 아이콘이며 학습 내용의 대체 텍스트로 사용하지 않음 | 확인 완료, `index.html` 참조 유지 | `index.html`의 기존 `./favicon.svg` 참조 유지 |
| `public/audio/ko/start.mp3` | 시작 화면 선택형 안내 | 유지 | 없음 | 같은 내용의 visible transcript를 항상 제공 | 확인 완료, 로컬 경로만 요청 | `InstructionCard`의 cue/audio 연결을 기존 호출로 되돌림 |
| `public/audio/ko/find.mp3` | 최소 단위 찾기 안내 | 유지 | 없음 | `COPY.findInstruction`가 음성 대체 문장 | 확인 완료 | 기존 cue 경로 유지 |
| `public/audio/ko/continue.mp3` | 다음 칸 안내 | 유지 | 없음 | `COPY.continueInstruction`가 음성 대체 문장 | 확인 완료 | 기존 cue 경로 유지 |
| `public/audio/ko/repair.mp3` | 규칙 수리 안내 | 유지 | 없음 | `COPY.repairInstruction`가 음성 대체 문장 | 확인 완료 | 기존 cue 경로 유지 |
| `public/audio/ko/translate.mp3` | 외형 번역 안내 | 유지 | 없음 | `COPY.translateInstruction`가 음성 대체 문장 | 확인 완료 | 기존 cue 경로 유지 |
| `public/audio/ko/create.mp3` | 자유 규칙 만들기 안내 | 유지 | 없음 | `COPY.createInstruction`가 음성 대체 문장 | 확인 완료 | 기존 cue 경로 유지 |
| `public/audio/ko/complete.mp3` | 활동 도장 요약 안내 | 유지 | 없음 | `COPY.complete`가 음성 대체 문장 | 확인 완료 | 기존 cue 경로 유지 |
| `output/playwright/redesign/start-390.png`, `start-1280.png`, `find-1280.png`, `find-success-1280.png` | 이번 브라우저 검토용 캡처 | 프로젝트 자산 아님 | 없음 | 테스트 증거일 뿐 런타임 화면에 삽입하지 않음 | 검토 완료, 참조 없음 | 캡처를 제거해도 런타임에는 영향 없음 |
| HVC 첫 화면 캡처 | 기존 화면을 설명하는 스크린샷 | 자동 교체 금지 | 없음 | 앱 런타임에 삽입하지 않음 | 보존 | 기존 외부 HVC 기록을 변경하지 않음 |

## Image generation decision

이번 변경은 새 이미지를 “삽입”하지 않고 기존 인라인 SVG를 레이아웃 안에서 재사용했다. 따라서 `$imagegen`은 지침만 읽고 생성 호출을 하지 않았다. 새 장식·개념 그림을 추가해야 하는 별도 승인 요청이 생기면 다음 순서로 진행한다.

1. 이미지가 전달할 주장, 대상 연령, 비율, 대비를 먼저 문서화한다.
2. 사실·수치·기관·실제 인물·로고·지도·절차 캡처를 포함하지 않는지 확인한다.
3. 원본을 유지한 채 의미 있는 버전 파일명(예: `start-illustration-v2.webp`)으로 생성한다.
4. JSX/CSS/HTML 참조와 alt 결정을 갱신하고, 생성물이 학습 단서를 가리거나 오답을 유도하지 않는지 사람 검토한다.

## External request check

`src`, `public`, `index.html`의 이미지·오디오 참조는 로컬 경로와 인라인 SVG뿐이다. 신규 CDN, 원격 이미지, 자동 재생, TTS API, 학생 음성 녹음은 추가하지 않았다. `tests/e2e/privacy.spec.ts`의 허용 경로 검증이 16개 E2E 중 관련 시나리오에서 PASS했다.
