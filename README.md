# 규칙 단위 기관실

초등학교 1~2학년을 위한 서버 없는 반복 규칙 학습 웹앱입니다. 학생은 색만 보고 외우는 대신 모양·무늬·문자 이름을 함께 살피며, **가장 짧은 반복 단위**를 찾아 반복 구조를 다른 모습으로 표현합니다. 한 차시 권장 시간은 15~25분입니다.

## 학습 목표와 흐름

AB·AAB·ABB·ABC 네 구조(4개 구조)에서 다음을 경험합니다.

- 길게 보이는 배열에서 가장 짧은 반복 단위를 찾습니다.
- 단위 찾기 단계에서 반복되는 최소 묶음을 표시합니다.
- 최소 단위를 이용해 빈칸의 다음 항을 이어 붙입니다.
- 규칙을 깨뜨린 칸과 바꿀 항을 찾아 수리합니다.
- 같은 순서를 다른 모양·무늬로 번역합니다.
- 2~3칸 단위로 나만의 반복 규칙을 만들고 두 번 이상 붙입니다.

전체 흐름은 **찾기→이어 붙이기→수리→번역→자유 제작→활동 도장**입니다. **미션 20개**, 20개 미션/5 Journeys(20개 미션/5 Journeys)로 구성되며, 찾기·이어 붙이기·수리·번역이 각 5개이고 AB·AAB·ABB·ABC도 각 5개입니다. 한 Journey에서는 한 번에 하나의 주 행동만 수행합니다.

기존 단순 다음 항 맞히기 앱이 다음 한 칸을 빠르게 맞히는 데 머무르는 것과 달리, 이 앱은 가장 짧은 단위를 먼저 찾고, 부분 배열을 이어 가며, 오류를 수리하고, 다른 외형으로 번역하고, 자유 규칙을 만드는 과정을 연결합니다. 숫자 계산·증가 규칙·속도 경쟁은 핵심 활동에 포함하지 않습니다.

## 판정 경계

판정 경계는 **최소 단위, 부분 빈칸 인덱스, 일대일 번역+순서, 2~3칸 단위 최소 2회 자유 선로**입니다.

- 반복 단위는 배열 전체를 만들 수 있는 가장 짧은 묶음으로 판정합니다. 더 긴 후보는 정답으로 인정하지 않습니다.
- 이어 붙이기의 부분 빈칸은 빈칸 개수만 세지 않고 원래 배열의 인덱스와 보이는 항을 함께 검사합니다.
- 번역은 모든 원래 항이 하나의 새 항과 일대일로 대응하는지, 그 대응 순서가 바뀌지 않았는지 검사합니다.
- 자유 선로는 길이 2~3칸 단위여야 하며, 같은 단위를 최소 2회 반복해야 승인합니다. 한 번만 붙인 선로와 단일 기호는 규칙으로 승인하지 않습니다.
- 화면의 색·아이콘·음원 경로가 아니라 `PatternTokenId` 내부 값으로 정답을 판정합니다.

## 로컬 실행

Node.js 22 LTS 이상과 npm이 필요합니다. 이 저장소는 `package-lock.json`을 사용하므로 설치와 CI에서 `npm ci`를 실행합니다.

```bash
npm ci
npm run dev
```

개발 서버가 열리면 터미널에 표시된 로컬 주소(기본 `http://localhost:5173`)로 접속합니다. 별도 서버, 계정, 데이터베이스가 필요하지 않습니다.

검사 명령은 다음과 같습니다.

```bash
# 전체 unit·component·architecture 테스트
npm run test

# unit 테스트만
npm run test -- tests/unit

# component 테스트만
npm run test -- tests/components

# 타입 검사와 정적 빌드
npm run build

# lint, unit/component, build를 차례로 실행
npm run check

# 소스·설정 파일 499줄 이하 검사
npm run check:size

# 로컬 Chromium E2E
npx playwright install --with-deps chromium
npm run test:e2e
```

GitHub Pages 공개 주소는 [https://wbmaker2.github.io/pattern-unit-engine-room/](https://wbmaker2.github.io/pattern-unit-engine-room/)입니다. `main` push 또는 `workflow_dispatch`로 GitHub Actions의 Pages workflow가 Node.js 22 환경에서 `npm ci`와 `npm run build`를 실행하고, `dist` artifact를 `github-pages` 환경에 배포합니다. Vite는 `%BASE_URL%favicon.svg`를 사용해 동일 출처의 `favicon.svg`를 빌드에 포함합니다. 로컬 실행과 품질 검증은 위 명령으로 수행합니다.

## local-only 개인정보 경계

이 앱은 **서버/계정 없음**인 local-only 앱입니다. **기본으로 저장하지 않습니다**. 사용자가 설정에서 “이 기기에서 이어 하기”를 켠 경우에만 **opt-in exact minimal localStorage** 항목 하나(`pattern-unit-engine-room:v1`)에 현재 단계·완료 행동·자유 단위·자유 선로·접근성 설정만 저장합니다.

학생 이름/사진/음성/점수/속도/순위/시간은 비수집입니다(수집하지 않습니다). 학생 음성을 녹음하지 않습니다. 음성 안내는 자동 재생하지 않으며, 사용자가 누를 때만 동일 출처의 **로컬 MP3 선택 재생**을 합니다. 음원은 exact transcript/path/MIME/codec/duration 및 자동 브라우저 요청 검증을 완료했지만, 발음·속도·명료도·아동 적합성·볼륨에 대한 **사람의 청취 검수 대기** 상태입니다. 문자 안내는 음성을 끈 상태에서도 항상 화면에 남습니다.

다음 기능은 이 MVP에 없습니다.

- 학생 간 공유, 광고, 외부 AI, 상점·포인트·순위 경쟁
- 음성 인식, 학생 음성 녹음, 이름·사진 입력
- 자유 그림 업로드, 증가·곱셈·복잡한 수열 규칙

## 접근성 및 QA 범위

다음은 자동 테스트로 확인하는 계약입니다.

- 주요 터치 대상은 최소 48×48 CSS px이고 320px CSS 폭에서 가로 넘침이 없습니다.
- 200% 결합 확대 harness, keyboard 전용 조작, 색상 독립(grayscale), Axe 검사를 확인합니다.
- `prefers-reduced-motion`과 앱의 reduced motion 설정에서는 열차 이동 대신 칸 테두리로 진행을 표시합니다.
- 선택 음성의 동일 문구 transcript, DOM 접근성 이름·순서·모양·무늬, 한 화면 한 주 행동을 확인합니다.
- `업데이트 내역` 버튼은 현재 개발 날짜와 변경 요약을 보여 줍니다. 기능을 수정할 때마다 `src/content/updateHistory.ts`에 날짜·구분·짧은 내역을 최신 항목으로 추가합니다.

이 개선 범위의 자동 검증은 keyboard·Axe·DOM·320px·200%·reduced-motion·privacy 계약으로 한정합니다. **VoiceOver 검증은 이 개선 범위에 포함하지 않습니다.** 자동 PASS는 사람의 보조공학 검증을 의미하지 않으며, 체크리스트는 자동 검증 범위를 기록하는 문서로 제공합니다.

- 상대 링크: [접근성·개인정보 완료 검증 체크리스트](docs/qa/2026-08-26-accessibility-checklist.md)
- 저장소 기준 절대 경로: `/docs/qa/2026-08-26-accessibility-checklist.md`

이번 리디자인 이후 Chromium 자동 E2E 16건과 unit/component 포함 전체 테스트 204건을 통과했습니다. 이는 VoiceOver 검증 결과가 아니며, 이 개선 범위에서는 VoiceOver 수동 검증을 수행하지 않습니다.

## 업데이트 내역

화면 오른쪽 아래의 작은 `업데이트 내역` 버튼에서 설계·개발·개선 날짜와 요약을 확인할 수 있습니다. 현재 개선 날짜는 2026-08-30이며, 날짜가 바뀌는 수정은 같은 파일과 관련 테스트의 날짜를 함께 갱신합니다.

리디자인 계획·감사·자산 검토·검증 결과는 다음 문서에 기록되어 있습니다.

- [리디자인 실행 계획](work/education-webapp-redesign-plan.md)
- [초기 UX·접근성 감사](work/education-webapp-redesign-audit.md)
- [자산 안전 검토](work/education-webapp-redesign-assets.md)
- [리디자인 검증 보고서](work/education-webapp-redesign-report.md)

## 범위

이 프로젝트는 반복 구조를 찾고 표현하는 저학년 수학 활동의 MVP입니다. 모든 정답 판정은 화면 외형과 분리되어 있으며, 드래그·시간 제한·빠른 더블 클릭을 요구하지 않습니다. 별도 서버·계정·학생 데이터 서버 저장·공개 갤러리 등록은 이 구현 범위에 포함하지 않습니다.
