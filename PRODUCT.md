# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

주 사용자는 초등학교 1~2학년 학생입니다. 교실이나 가정에서 15~25분 동안 화면의 반복 배열을 보고 가장 짧은 단위를 찾고, 다음 항을 예측하고, 틀린 항을 고치고, 다른 모양으로 같은 규칙을 표현합니다. 보호자와 교사는 학생 옆에서 문자 안내와 접근성 설정을 확인할 수 있습니다.

## Product Purpose

`규칙 단위 기관실`은 반복되는 모양에서 가장 짧은 규칙 단위를 찾아 여러 방식으로 나타내는 정적 수학 학습 앱입니다. 학생이 속도·점수 경쟁 없이 찾기 → 이어 붙이기 → 수리하기 → 번역하기 → 만들기의 증거를 남기는 것이 성공입니다.

## Positioning

분류나 계산 결과를 맞히는 대신, AB·AAB·ABB·ABC 순서에서 최소 반복 단위를 발견하고 겉모양이 달라져도 구조를 번역하게 하는 저학년용 학습 흐름이 고유한 중심입니다.

## Operating Context

서버 없는 Vite 정적 웹앱으로 브라우저에서 실행하며, 마우스·터치·키보드로 조작합니다. 화면에는 배열과 큰 선택 버튼, 짧은 문자 안내가 보이고 선택형 안내 음원은 로컬 파일에서만 재생됩니다. GitHub Pages 하위 경로에서도 정적 자산이 로드되어야 합니다.

## Capabilities and Constraints

- Vite + React + TypeScript SPA와 기존 `sessionReducer`, 미션 카탈로그, 반복 판정 함수를 유지합니다.
- 20개 AB·AAB·ABB·ABC 미션, 다섯 학습 활동, 버튼 기반 자유 규칙 만들기를 제공합니다.
- 색상 외에 모양·무늬·문자 라벨을 함께 보여 주고, 주요 학습 버튼에만 `gi-pulse`를 사용합니다.
- 48px 이상 조작 영역, 키보드 포커스, reduced-motion 대체, 업데이트 내역 모달을 제공합니다.
- 학생 이름·사진·음성 녹음·음성 인식·계정·광고·분석·외부 TTS·외부 이미지 요청을 추가하지 않습니다.
- 진행 저장은 현재 `PersistedProgressV1`의 로컬 fail-closed 계약과 접근성 설정만 사용합니다.
- VoiceOver 실행·검증은 이 프로젝트 범위에서 제외합니다.

## Brand Commitments

서비스명은 `규칙 단위 기관실`이며, 어린 학습자가 읽기 쉬운 한국어 동사형 문장과 밝은 라이트 모드를 사용합니다. 가상의 기관차 인라인 SVG와 기존 로컬 MP3는 맥락과 출처 안전성 때문에 보존합니다.

## Evidence on Hand

- 확정 설계: `2026-08-26-pattern-unit-engine-room-design.md`
- 실행 계획: `work/education-webapp-redesign-plan.md`
- 현재 디자인 기준: `design-system/MASTER.md`, `design-system/pages/start.md`
- 실제 미션·판정: `src/content/missions/`, `src/domain/pattern/`
- 기존 자산: `src/components/StartMissionIllustration.tsx`, `public/audio/ko/*.mp3`, `public/favicon.svg`
- 사람의 실제 초등학생·교사 인터뷰와 보조공학 승인은 아직 증거로 확보되지 않았습니다.

## Product Principles

1. 한 화면에서 한 행동만 분명하게 제시합니다.
2. 모양보다 반복 구조를 발견하게 합니다.
3. 오답은 이유와 다시 할 행동을 함께 알려 줍니다.
4. 점수·속도·개인정보 없이 학습 증거를 남깁니다.
5. 문자와 키보드 경로를 음성·모션보다 먼저 보장합니다.

## Accessibility & Inclusion

웹 기준 WCAG AA에 맞춰 키보드 순서와 `:focus-visible`, 48px 조작 영역, 색 이외 상태 단서, `prefers-reduced-motion`, 320px·200% 확대 레이아웃을 확인합니다. 음성 안내는 선택 기능이며 같은 문장을 항상 문자로 제공합니다. VoiceOver는 검증하지 않습니다.
