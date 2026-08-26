# Task 11 보고서: 선택형 로컬 음성 안내

## 범위와 기준

요청된 `SDD/task-11-brief.md`와 `SDD/global-constraints.md`는 기준 체크아웃에 없었습니다. 대신 `2026-08-26-pattern-unit-engine-room-implementation-plan.md`의 Task 11(1279–1365행)과 설계 문서의 음성 계약을 기준으로 구현했습니다. 시작 기준 HEAD는 `150553100774441ab2a38c48601fb9855ce07691`이었습니다.

## RED → GREEN 증거

- RED: 구현 전 `npm test -- tests/unit/audioGuide.test.ts tests/components/audioGuideButton.test.tsx`가 두 모듈(`audioGuides`, `AudioGuideButton`)을 찾지 못해 실패했습니다.
- GREEN: 구현 후 같은 명령이 2개 파일, 7개 테스트 모두 통과했습니다.
- 서비스는 호출 전 자동 재생하지 않고, 요청한 cue의 같은 출처 로컬 MP3만 재생합니다. 현재 음원은 중지·처음으로 되감고, `play()` 거부는 `unavailable`로 바꾸어 학습 흐름을 막지 않습니다.
- 버튼은 `안내 듣기`/`안내 멈추기`와 `aria-pressed`를 제공하며, 음성을 꺼도 transcript는 화면에 남습니다.

## 오프라인 음원 합성

네트워크, API, 패키지 설치 없이 macOS 시스템 `say`와 로컬 `ffmpeg`를 사용했습니다.

- 합성 음성: `Yuna` (`ko_KR`), 속도 `165` (`say -r 165`)
- 입력 문장: `startTitle=기관실 문을 열어 볼까요?`; `findInstruction=가장 짧게 되풀이되는 한 묶음을 골라요.`; `continueInstruction=한 묶음을 보고 다음 칸을 이어 보세요.`; `repairInstruction=규칙을 깨뜨린 칸을 찾아 고쳐요.`; `translateInstruction=같은 순서를 새 모양으로 바꾸어 보세요.`; `createInstruction=2~3개로 내 한 묶음을 만들어요.`; `complete=찾고, 잇고, 고치고, 바꾸고, 만들었어요.`
- 각 입력은 `say -v Yuna -r 165 -o /private/tmp/pattern-unit-audio/<cue>.aiff '<COPY 문장>'`으로 만들었습니다.
- MP3 변환 플래그: `ffmpeg -y -i <cue>.aiff -codec:a libmp3lame -q:a 4 -ar 44100 -ac 1 <cue>.mp3`
- `find`는 COPY 문장과 일치하도록 마침표 문장으로 다시 합성했습니다.

`file`은 7개 파일 모두 `ID3 version 2.4.0`, `MPEG ADTS, layer III, v1`, `44.1 kHz`, `Monaural`로 판독했습니다. `ffprobe`에서 모두 `codec_name=mp3`, `codec_type=audio`, `sample_rate=44100`, `channels=1`이 확인되었습니다.

| 파일 | 크기 | 길이(초) |
|---|---:|---:|
| `start.mp3` | 17,346 bytes | 1.744399 |
| `find.mp3` | 25,674 bytes | 2.777324 |
| `continue.mp3` | 25,464 bytes | 2.794286 |
| `repair.mp3` | 24,513 bytes | 2.440635 |
| `translate.mp3` | 25,651 bytes | 2.684444 |
| `create.mp3` | 23,806 bytes | 2.470295 |
| `complete.mp3` | 33,299 bytes | 3.961905 |

## 검사 결과

- `npm test`: 23개 파일, 117개 테스트 통과
- `npm run lint`: 통과
- `npm run build`: 통과
- `npm run check:size`: 통과(코드 파일 499줄 이하)
- targeted audio/component tests: 2개 파일, 7개 테스트 통과

## 검수 경계

파일 형식, MIME 판독, 재생시간, manifest 경로, transcript 키와 자동 재생·실패 fallback은 자동 검사했습니다. 사람의 음색·속도·발음에 대한 지각적 청취 승인은 수행하지 않았습니다.

## 커밋

최종 커밋 full SHA는 커밋 후 handoff에 기록합니다.
