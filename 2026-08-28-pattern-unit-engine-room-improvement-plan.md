# Pattern Unit Engine Room Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. Each task follows failing test → minimal implementation → passing test and is independently reviewable.

**Goal:** 초등 1~2학년이 공개 Pages에서 모바일 터치, 선택 상태, 다음 학습 단계, 운행 결과를 헷갈리지 않고 반복 규칙 학습을 끝낼 수 있도록 실사용성 감사 결과를 구현으로 반영합니다.

**Architecture:** 기존 Vite + React + TypeScript SPA의 도메인 판정 계층은 유지하고, 화면·접근성·시각 표현을 작은 컴포넌트로 분리합니다. 고정 보조 버튼을 콘텐츠 흐름 안으로 옮겨 핵심 선택지와 겹치지 않게 하고, 선택 표시·진행 표시·운행 애니메이션·학습 도장을 독립 컴포넌트로 제공합니다. 저장소와 화면이 공유하는 자유 선로 길이 상수를 도입해 UI와 `PersistedProgressV1` 계약을 일치시킵니다.

**Tech Stack:** Node.js 22 LTS, npm, Vite 8, React 19, TypeScript 5 strict mode, CSS, Vitest 4, React Testing Library, Playwright 1.62, Axe.

**Spec:**
- 설계 원문: `2026-08-26-pattern-unit-engine-room-design.md`
- 기존 구현 계획: `2026-08-26-pattern-unit-engine-room-implementation-plan.md`
- 실사용성 감사 캡처·백로그: `/private/tmp/pattern-unit-engine-room-audit-20260828/learner-ux-flow-board.html`
- 공개 학습 경로: `https://wbmaker2.github.io/pattern-unit-engine-room/`

## Global Constraints

- 대상은 초등학교 1~2학년이며, 한 화면에서 한 가지 주 행동만 활성화합니다.
- 반복 규칙의 학습 목표(최소 단위 찾기, 다음 항 예측, 오류 수리, 다른 모양 번역, 자기 규칙 창안)를 유지하고 판정 함수의 내부 ID 계약을 바꾸지 않습니다.
- 모든 조작 대상은 최소 48×48 CSS px이고 드래그·시간 제한·더블 클릭·점수·순위·학생 데이터 수집을 추가하지 않습니다.
- 모양과 무늬를 색상과 독립적으로 유지하고 `color-scheme: light`를 유지합니다.
- 교육용 핵심 제출 버튼에만 현재 `gi-pulse` 정책을 유지하며, `prefers-reduced-motion: reduce`와 앱 설정 `data-motion="reduce"`에서 실제 운행 모션을 정적 테두리로 대체합니다.
- 음성은 선택형 동일 출처 로컬 MP3와 문자 안내를 유지하고 자동 재생·녹음·외부 TTS를 추가하지 않습니다.
- 진행 저장은 기본 off, 사용자가 켠 경우에만 `pattern-unit-engine-room:v1` 한 항목에 최소 데이터만 저장합니다.
- 업데이트 내역에는 구현 날짜 `2026-08-28`과 이번 개선 요약을 추가합니다.
- `src`, `tests`, `scripts`, 설정 파일의 단일 파일은 499줄 이하입니다.
- 이번 작업에서는 VoiceOver 구현과 VoiceOver 검증을 수행하지 않습니다. 키보드, DOM 접근성 이름, Axe, 320px·200%·reduced-motion 자동 검증만 완료 기준으로 사용합니다.
- 외부 사이트를 확인하거나 HVC에 전달할 때는 공개 Pages 링크를 보고서에 포함하고, 배포되지 않은 로컬 변경을 공개 배포 완료로 표현하지 않습니다.

## 설계 요구사항 추적

| 설계 요구사항 | 구현 작업 | 합격 증거 |
|---|---|---|
| 네 단계 학습 목표와 다섯 미션 흐름 | Task 3, Task 5, Task 7 | 진행 표시·단계별 다음 문구·완료 도장 E2E |
| 기존 앱과 다른 최소 반복 단위·번역·창안 | 기존 도메인 유지, Task 5·7 UI 보강 | 20개 미션 카탈로그와 Journey E2E 유지 |
| 한 화면 한 행동, 짧은 문장 | Task 3·4 | 문구 테스트, 주 행동 1개 E2E |
| 콘텐츠·판정 모델과 자유 규칙 | Task 6 | reducer/domain/storage 길이 계약 테스트 |
| 접근성 48px·색 독립·모션 감소 | Task 1·2·5·9 | 320px, grayscale, reduced-motion, keyboard, Axe |
| 개인정보·안전 | 기존 local-only 유지, Task 4·6·9 | privacy E2E와 삭제 확인 테스트 |
| 출발 그림·반복 재생·활동 도장 | Task 3·5·7 | 화면 캡처와 컴포넌트 테스트 |
| 업데이트 내역과 실제 날짜 | Task 8 | `updateHistory.test.tsx`, 화면 캡처 |
| VoiceOver 제외 정책 | Task 9 | 문서에 자동 검증 범위만 기록 |

## 예상 파일 구조와 책임

### 새 파일

- `src/components/PatternStrip.tsx`: native button 안에 넣을 비대화형 인라인 패턴 시각 스트립.
- `src/components/ProgressIndicator.tsx`: 현재 미션 단계와 전체 단계 수를 시각·접근성 이름으로 표시.
- `src/components/StartMissionIllustration.tsx`: 외부 자산 없이 제공하는 단순 기관차·선로 SVG 장식.
- `src/components/AnimatedPatternTrack.tsx`: 자유 규칙 성공 시 일반 모션과 reduced-motion 표시를 감싼다.
- `src/components/LearningStampList.tsx`: 색에 의존하지 않는 완료 체크/도장 목록.

### 수정 파일과 책임

- `src/components/AppShell.tsx`, `src/components/UpdateHistoryButton.tsx`, `src/components/UpdateHistoryDialog.tsx`: 보조 버튼의 흐름 배치·모달 연결·포커스 경계.
- `src/components/ChoiceGrid.tsx`, `src/styles/components.css`, `src/styles/patterns.css`: 선택 상태와 유효한 button 콘텐츠.
- `src/content/copy.ts`, `src/content/audioGuides.ts`: 시작 안내·단계별 다음 문구·설정 확인·완료 takeaway.
- `src/features/start/StartScreen.tsx`, 다섯 미션 화면: 진행 표시, 시작 그림, 단계별 전환 문구.
- `src/features/settings/AccessibilitySettings.tsx`: 명시적 켜짐/꺼짐과 이어 하기 끄기 확인.
- `src/features/create/CreatePatternScreen.tsx`, `src/features/session/reducer.ts`, `src/features/session/types.ts`: 자유 선로 상한과 운행 표시.
- `src/features/summary/SummaryScreen.tsx`: 학습 도장·배운 점·다음 선택.
- `src/domain/pattern/freePattern.ts`, `src/services/progressStore.ts`: 공유 자유 선로 상수.
- `src/styles/motion.css`: 실제 운행 트랙 모션과 정적 대체.
- `tests/components/*.test.tsx`, `tests/unit/*.test.ts`, `tests/e2e/accessibility.spec.ts`, `tests/e2e/privacy.spec.ts`: 회귀·접근성·저장 계약.
- `README.md`, `docs/qa/2026-08-26-accessibility-checklist.md`, `src/content/updateHistory.ts`, `index.html`, `public/favicon.svg`: 문서 범위·날짜·아이콘·검증 명세.

## 순차 구현 작업

### Task 1: 업데이트 버튼을 콘텐츠 흐름으로 이동하고 모바일 겹침을 차단

**Files:**
- Modify: `src/components/AppShell.tsx:44-83`
- Modify: `src/components/UpdateHistoryButton.tsx:12-27`
- Modify: `src/components/UpdateHistoryDialog.tsx:64-88`
- Modify: `src/styles/components.css:1-17,130-165`
- Test: `tests/components/appShell.test.tsx`, `tests/components/updateHistory.test.tsx`, `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: `AppShellProps`, `UpdateHistoryButtonProps`, `UpdateHistoryDialogProps`.
- Produces: `.app-shell__footer` 안의 `UpdateHistoryButton`, `UpdateHistoryDialog` id `update-history-dialog`, trigger의 `aria-controls="update-history-dialog"`.

- [ ] **Step 1: 겹침과 모달 노출을 검증하는 실패 테스트를 먼저 작성합니다.**

```tsx
it('업데이트 버튼은 콘텐츠 footer에 있고 dialog가 열리면 배경 조작 대상이 숨겨진다', async () => {
  render(<AppShell><h1>테스트</h1></AppShell>);
  const trigger = screen.getByRole('button', { name: '업데이트 내역' });
  expect(trigger.closest('.app-shell__footer')).not.toBeNull();
  expect(trigger).toHaveAttribute('aria-controls', 'update-history-dialog');
  await userEvent.setup().click(trigger);
  expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toHaveAttribute('id', 'update-history-dialog');
  expect(screen.queryByRole('button', { name: '운행 시작' })).not.toBeInTheDocument();
});
```

```ts
async function assertNoVisibleInteractiveOverlap(page: Page): Promise<void> {
  const intersections = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>('button:visible, input:visible, select:visible, textarea:visible')];
    return nodes.flatMap((a, index) => nodes.slice(index + 1).filter((b) => {
      const x = a.getBoundingClientRect(); const y = b.getBoundingClientRect();
      return !(x.right <= y.left || y.right <= x.left || x.bottom <= y.top || y.bottom <= x.top);
    }).map((b) => [a.className, b.className]));
  });
  expect(intersections).toEqual([]);
}
```

- [ ] **Step 2: 테스트가 현재 fixed 버튼 구조와 겹침 검증에서 실패하는지 확인합니다.**

Run: `npm test -- tests/components/appShell.test.tsx tests/components/updateHistory.test.tsx`

Expected: `footer` 또는 `aria-controls` 기대가 실패합니다.

Run: `npm run test:e2e -- tests/e2e/accessibility.spec.ts --grep "겹침"`

Expected: 새 320px 겹침 테스트가 현재 fixed 버튼과 후보 카드의 교차를 보고 FAIL합니다.

- [ ] **Step 3: footer 배치와 모달 배경 경계를 최소 구현합니다.**

```tsx
<div aria-hidden={historyOpen || undefined} className="app-shell__content" ref={contentRef}>
  {children}
  <div className="app-shell__footer">
    <UpdateHistoryButton
      ariaControls="update-history-dialog"
      onClick={() => setHistoryOpen(true)}
      open={historyOpen}
      ref={triggerRef}
      {...(historyOpen ? { tabIndex: -1 } : {})}
    />
  </div>
</div>
<UpdateHistoryDialog dialogId="update-history-dialog" ... />
```

`UpdateHistoryButtonProps`에 `readonly ariaControls?: string`을 추가하고, 버튼은 `aria-controls`를 렌더링합니다. `.update-history-button`의 `position: fixed`, `inset-*`, `z-index`를 제거하고 `.app-shell__footer { display:flex; justify-content:flex-end; margin-block-start: var(--space-5); }`를 추가합니다. 대화상자 루트에는 `id={dialogId}`를 지정하고 기존 포커스 복귀를 유지합니다.

- [ ] **Step 4: 컴포넌트와 320px·390px 겹침 테스트를 통과시킵니다.**

Run: `npm test -- tests/components/appShell.test.tsx tests/components/updateHistory.test.tsx`

Expected: 두 컴포넌트 테스트 PASS.

Run: `npm run test:e2e -- tests/e2e/accessibility.spec.ts --grep "320px|겹침"`

Expected: 320px 및 390px에서 intersection 배열이 빈 배열이고 가로 스크롤이 없습니다.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/components/AppShell.tsx src/components/UpdateHistoryButton.tsx src/components/UpdateHistoryDialog.tsx src/styles/components.css tests/components/appShell.test.tsx tests/components/updateHistory.test.tsx tests/e2e/accessibility.spec.ts
git commit -m "fix: keep update history out of learner controls"
```

### Task 2: 선택 상태를 보이게 하고 button 안의 목록 마크업을 제거

**Files:**
- Create: `src/components/PatternStrip.tsx`
- Modify: `src/components/ChoiceGrid.tsx:24-46`
- Modify: `src/features/find/FindUnitScreen.tsx:54-66`
- Modify: `src/features/continue/ContinuePatternScreen.tsx:52-60`
- Modify: `src/features/repair/RepairPatternScreen.tsx:61-70`
- Modify: `src/styles/components.css:68-81`
- Test: `tests/components/choiceGrid.test.tsx`, `tests/components/patternStrip.test.tsx`, `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- `PatternStripProps { readonly slots: readonly PatternTokenId[]; readonly themeId: TokenThemeId; }`.
- `ChoiceGrid` keeps `aria-pressed` and adds `choice-button--selected` plus visible `선택됨` text when `selectedId` matches.

- [ ] **Step 1: 선택 표시와 유효한 button 콘텐츠 실패 테스트를 작성합니다.**

```tsx
it('선택된 후보는 포커스가 없어도 시각 클래스와 선택됨 표시를 유지한다', () => {
  render(<ChoiceGrid label="후보" choices={choices} selectedId="ba" getId={(x) => x.id} renderChoice={(x) => x.label} getAccessibleName={(x) => x.label} onSelect={() => {}} />);
  const selected = screen.getByRole('button', { name: 'BA 묶음' });
  expect(selected).toHaveClass('choice-button--selected');
  expect(selected).toHaveTextContent('선택됨');
});
```

```tsx
it('PatternStrip은 ol/li 없이 비대화형 시각 요소만 렌더링한다', () => {
  render(<button><PatternStrip slots={['A', 'B']} themeId="engine" /></button>);
  expect(screen.getByRole('button').querySelector('ol')).toBeNull();
  expect(screen.getByRole('button').querySelector('[aria-hidden="true"]')).not.toBeNull();
});
```

- [ ] **Step 2: 테스트가 현재 `aria-pressed`만 있고 nested `<ol>`인 구현에서 실패하는지 확인합니다.**

Run: `npm test -- tests/components/choiceGrid.test.tsx tests/components/patternStrip.test.tsx`

Expected: `choice-button--selected`와 새 모듈 부재 오류가 발생합니다.

- [ ] **Step 3: PatternStrip과 선택 CSS를 최소 구현합니다.**

`PatternStrip`은 `<span className="pattern-strip" aria-hidden="true">` 안에 각 토큰을 `<span className="pattern-strip__cell">`로 렌더링하고 `getTokenVisual`과 `TokenIcon`을 사용합니다. `ChoiceGrid`는 선택된 id에 `choice-button--selected`를 추가하고 버튼 끝에 `<span className="choice-button__selected-label">선택됨</span>`을 렌더링합니다. CSS는 선택 상태에 `border-color: var(--color-accent-strong)`, `box-shadow: inset 0 0 0 4px var(--color-accent)`, `background: var(--color-surface-muted)`를 적용하고 grayscale에서도 테두리로 구별되게 합니다.

- [ ] **Step 4: 세 미션 화면을 PatternStrip으로 교체하고 테스트를 통과시킵니다.**

Run: `npm test -- tests/components/choiceGrid.test.tsx tests/components/patternStrip.test.tsx tests/components/findUnitScreen.test.tsx tests/components/continuePatternScreen.test.tsx tests/components/repairPatternScreen.test.tsx`

Expected: 선택 스타일, nested list 제거, 기존 접근 가능한 이름 테스트가 모두 PASS.

Run: `npm run test:e2e -- tests/e2e/accessibility.spec.ts --grep "키보드|Axe"`

Expected: 포커스 이동 뒤에도 선택 class가 남고 Axe 위반이 0개입니다.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/components/PatternStrip.tsx src/components/ChoiceGrid.tsx src/features/find/FindUnitScreen.tsx src/features/continue/ContinuePatternScreen.tsx src/features/repair/RepairPatternScreen.tsx src/styles/components.css tests/components/choiceGrid.test.tsx tests/components/patternStrip.test.tsx tests/e2e/accessibility.spec.ts
git commit -m "fix: make pattern choices visibly selectable"
```

### Task 3: 시작 안내·진행 표시·단계별 다음 문구를 저학년용으로 정리

**Files:**
- Create: `src/components/ProgressIndicator.tsx`
- Create: `src/components/StartMissionIllustration.tsx`
- Modify: `src/content/copy.ts:1-95`
- Modify: `src/content/audioGuides.ts:25-33`
- Modify: `src/features/start/StartScreen.tsx:17-26`
- Modify: `src/features/find/FindUnitScreen.tsx`, `src/features/continue/ContinuePatternScreen.tsx`, `src/features/repair/RepairPatternScreen.tsx`, `src/features/translate/TranslatePatternScreen.tsx`, `src/features/create/CreatePatternScreen.tsx`
- Test: `tests/components/startScreen.test.tsx`, `tests/components/progressIndicator.test.tsx`, `tests/unit/copy.test.ts`, `tests/e2e/learner-flow.spec.ts`

**Interfaces:**
- `ProgressIndicatorProps { readonly current: 1 | 2 | 3 | 4 | 5; readonly total: 5; }` renders `현재 단계 {current} / {total}`.
- `StartMissionIllustrationProps { readonly title?: string; }` renders a decorative inline SVG with `aria-hidden="true"` unless a title is explicitly supplied.
- New copy keys: `startInstruction`, `progressLabel`, `nextContinueStage`, `nextRepairStage`, `nextTranslateStage`, `nextCreateStage`, `summaryTakeaway`, `summaryNextPrompt`.

- [ ] **Step 1: 중복 시작 문장·진행 표시·단계별 버튼 실패 테스트를 작성합니다.**

```tsx
it('시작 화면은 질문과 다른 안내를 보여 주고 미션 그림을 포함한다', () => {
  render(<StartScreen settings={settings} onStart={() => {}} onOpenSettings={() => {}} />);
  expect(screen.getByRole('heading', { name: COPY.startTitle })).toBeInTheDocument();
  expect(screen.getByText(COPY.startInstruction)).toBeInTheDocument();
  expect(screen.queryAllByText(COPY.startTitle)).toHaveLength(1);
  expect(screen.getByTestId('start-mission-illustration')).toBeInTheDocument();
});
```

```tsx
it('진행 표시가 현재 단계와 전체 단계를 읽는다', () => {
  render(<ProgressIndicator current={2} total={5} />);
  expect(screen.getByRole('status')).toHaveTextContent('현재 단계 2 / 5');
});
```

- [ ] **Step 2: 현재 문구가 중복되고 진행 표시가 없어서 실패하는지 확인합니다.**

Run: `npm test -- tests/components/startScreen.test.tsx tests/components/progressIndicator.test.tsx tests/unit/copy.test.ts`

Expected: `startInstruction`, illustration, ProgressIndicator 모듈 기대가 FAIL합니다.

- [ ] **Step 3: 시작 안내와 진행 컴포넌트를 최소 구현합니다.**

`COPY.startInstruction`은 `모양의 반복 규칙을 찾아 다섯 가지 미션을 해 봐요.`로 설정하고 `AUDIO_GUIDES.start`의 transcript key도 `startInstruction`으로 바꿉니다. StartScreen은 `InstructionCard title={COPY.startTitle}` 아래에 `StartMissionIllustration`을 렌더링합니다. 각 미션 화면은 기존 제목 아래에 `ProgressIndicator`를 한 번 렌더링하고, 성공 뒤 버튼은 각각 `다음 활동: 이어 붙이기`, `다음 활동: 규칙 수리하기`, `다음 활동: 새 모양으로 바꾸기`, `다음 활동: 내 규칙 만들기`를 사용합니다. 자유 제작 성공 뒤에는 `활동 도장 보기`를 사용합니다.

- [ ] **Step 4: 화면·문구 테스트와 Journey E2E를 통과시킵니다.**

Run: `npm test -- tests/components/startScreen.test.tsx tests/components/progressIndicator.test.tsx tests/unit/copy.test.ts tests/components/findUnitScreen.test.tsx tests/components/continuePatternScreen.test.tsx tests/components/repairPatternScreen.test.tsx tests/components/translatePatternScreen.test.tsx tests/components/createPatternScreen.test.tsx tests/components/summaryScreen.test.tsx`

Expected: 문구 중복 0, 각 미션 단계 표시, 단계별 다음 label이 PASS.

Run: `npm run test:e2e -- tests/e2e/learner-flow.spec.ts`

Expected: visible label 기반 Journey 완료와 5개 학습 행동이 PASS.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/components/ProgressIndicator.tsx src/components/StartMissionIllustration.tsx src/content/copy.ts src/content/audioGuides.ts src/features/start/StartScreen.tsx src/features/find/FindUnitScreen.tsx src/features/continue/ContinuePatternScreen.tsx src/features/repair/RepairPatternScreen.tsx src/features/translate/TranslatePatternScreen.tsx src/features/create/CreatePatternScreen.tsx tests/components/startScreen.test.tsx tests/components/progressIndicator.test.tsx tests/unit/copy.test.ts tests/e2e/learner-flow.spec.ts
git commit -m "feat: clarify learner steps and start guidance"
```

### Task 4: 접근성 설정의 상태 표시와 이어 하기 끄기 확인

**Files:**
- Modify: `src/features/settings/AccessibilitySettings.tsx:20-86`
- Modify: `src/content/copy.ts:84-97`
- Modify: `src/styles/components.css:101-125`
- Test: `tests/components/accessibilitySettings.test.tsx`, `tests/e2e/privacy.spec.ts`

**Interfaces:**
- `SettingSwitch`는 `name`, `checked`, `stateLabel`, `onChange`를 받고 `aria-checked`와 visible `켜짐`/`꺼짐`을 함께 렌더링합니다.
- `AccessibilitySettings` 내부 상태 `confirmPersistenceOff: boolean`을 사용합니다. 켜진 이어 하기를 끄려는 첫 입력은 확인 패널만 열고, `이어 하기 끄기`를 눌렀을 때 `onChange`로 false를 전달합니다.

- [ ] **Step 1: 상태 텍스트와 확인 패널 실패 테스트를 작성합니다.**

```tsx
it('각 설정은 켜짐 또는 꺼짐을 글자로 보여 준다', () => {
  render(<AccessibilitySettings settings={{ ...settings, persistenceEnabled: true }} onChange={() => {}} onClose={() => {}} />);
  expect(screen.getAllByText('켜짐').length).toBeGreaterThan(0);
  expect(screen.getAllByText('꺼짐').length).toBeGreaterThan(0);
});
```

```tsx
it('이어 하기를 끌 때 즉시 삭제하지 않고 확인 후 저장을 지운다', async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();
  render(<AccessibilitySettings settings={{ ...settings, persistenceEnabled: true }} onChange={onChange} onClose={() => {}} />);
  await user.click(screen.getByRole('switch', { name: '이 기기에서 이어 하기' }));
  expect(screen.getByRole('alertdialog', { name: '이어 하기 끄기 확인' })).toBeInTheDocument();
  expect(onChange).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: '이어 하기 끄기' }));
  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ persistenceEnabled: false }));
});
```

- [ ] **Step 2: 현재 네모 스위치와 즉시 삭제 동작에서 테스트가 실패하는지 확인합니다.**

Run: `npm test -- tests/components/accessibilitySettings.test.tsx`

Expected: visible 상태·alertdialog 기대가 FAIL합니다.

- [ ] **Step 3: 명시적 상태와 확인 UI를 최소 구현합니다.**

각 label에 `<span className="settings-panel__state">{checked ? '켜짐' : '꺼짐'}</span>`을 추가합니다. persistence 스위치가 true에서 false로 바뀌면 `confirmPersistenceOff`를 true로 만들고 `<div role="alertdialog" aria-label="이어 하기 끄기 확인">` 안에 `저장된 이어 하기 기록을 지울까요?`, `이어 하기 끄기`, `계속 사용`을 렌더링합니다. 확인 버튼에서만 `onChange({ ...settings, persistenceEnabled: false })`를 호출하고, 취소는 현재 상태를 유지합니다.

- [ ] **Step 4: 설정·개인정보 테스트를 통과시킵니다.**

Run: `npm test -- tests/components/accessibilitySettings.test.tsx tests/unit/progressStore.test.ts`

Expected: 상태 이름, 확인 취소/승인, 기존 최소 저장 계약이 PASS.

Run: `npm run test:e2e -- tests/e2e/privacy.spec.ts`

Expected: 기본 off, opt-in 저장, 끄기 승인 후 key 삭제가 PASS.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/features/settings/AccessibilitySettings.tsx src/content/copy.ts src/styles/components.css tests/components/accessibilitySettings.test.tsx tests/e2e/privacy.spec.ts
git commit -m "fix: make accessibility settings explicit and safe"
```

### Task 5: 실제 운행 결과와 reduced-motion 대체 표시

**Files:**
- Create: `src/components/AnimatedPatternTrack.tsx`
- Modify: `src/features/create/CreatePatternScreen.tsx:75-103`
- Modify: `src/App.tsx:155-185`
- Modify: `src/styles/motion.css:1-46`
- Modify: `src/styles/patterns.css:1-80`
- Test: `tests/components/createPatternScreen.test.tsx`, `tests/components/reducedMotion.test.tsx`, `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- `AnimatedPatternTrackProps { readonly slots: readonly PatternTokenId[]; readonly themeId: TokenThemeId; readonly reducedMotion: boolean; readonly isRunning: boolean; readonly label: string; }`.
- `CreatePatternScreenProps`에 `readonly reducedMotion: boolean`을 추가하고 App에서 `reducedMotion` 값을 전달합니다.

- [ ] **Step 1: 실제 runtime class와 reduced fallback 실패 테스트를 작성합니다.**

```tsx
it('자유 규칙 성공 시 실제 선로에 moving class를 붙인다', () => {
  render(<CreatePatternScreen {...props} mode="track" feedback={{ status: 'success', reason: 'matches', hintVisible: false }} reducedMotion={false} />);
  expect(document.querySelector('.train-track--moving')).not.toBeNull();
});
```

```tsx
it('reduced motion에서는 moving animation 없이 반복 칸 테두리를 표시한다', () => {
  render(<CreatePatternScreen {...props} mode="track" feedback={{ status: 'success', reason: 'matches', hintVisible: false }} reducedMotion />);
  expect(document.querySelector('.train-track--moving')).not.toBeNull();
  expect(document.querySelectorAll('.pattern-cell--active').length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: 현재 앱에 runtime moving class가 없어 테스트가 실패하는지 확인합니다.**

Run: `npm test -- tests/components/createPatternScreen.test.tsx tests/components/reducedMotion.test.tsx`

Expected: runtime track와 active cell 기대가 FAIL합니다.

- [ ] **Step 3: AnimatedPatternTrack을 최소 구현합니다.**

성공 상태에서만 `train-track--moving`을 붙이고, `reducedMotion`이면 `activeIndices`를 반복 단위의 각 시작 인덱스로 계산해 `PatternBoard`에 전달합니다. 일반 모션에서는 현재 `gi-pulse` 정책을 바꾸지 않고 train-track animation만 사용합니다. `aria-label={label}`과 기존 성공 `FeedbackPanel`을 유지합니다.

- [ ] **Step 4: 실제 화면 reduced-motion E2E를 통과시킵니다.**

Run: `npm test -- tests/components/createPatternScreen.test.tsx tests/components/reducedMotion.test.tsx`

Expected: component tests PASS.

Run: `npm run test:e2e -- tests/e2e/accessibility.spec.ts --grep "모션 감소"`

Expected: 실제 Create track 화면에서 `.train-track--moving`이 존재하고 computed `animationName`이 `none`, active outline이 4px입니다. CSS만 주입한 probe만으로 통과시키지 않습니다.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/components/AnimatedPatternTrack.tsx src/features/create/CreatePatternScreen.tsx src/App.tsx src/styles/motion.css src/styles/patterns.css tests/components/createPatternScreen.test.tsx tests/components/reducedMotion.test.tsx tests/e2e/accessibility.spec.ts
git commit -m "feat: show free pattern run with motion fallback"
```

### Task 6: 자유 선로 길이 상한과 저장 계약 통합

**Files:**
- Modify: `src/domain/pattern/freePattern.ts:1-60`
- Modify: `src/services/progressStore.ts:1-95`
- Modify: `src/features/session/reducer.ts:270-285`
- Modify: `src/features/create/CreatePatternScreen.tsx:75-100`
- Modify: `src/features/session/types.ts:1-100`
- Modify: `src/content/copy.ts:64-84`
- Test: `tests/unit/freePattern.test.ts`, `tests/unit/progressStore.test.ts`, `tests/unit/sessionReducer.test.ts`, `tests/components/createPatternScreen.test.tsx`

**Interfaces:**
- Export `MAX_FREE_TRACK_TOKENS = 12` from `src/domain/pattern/freePattern.ts`.
- `CreatePatternScreenProps`에 `readonly maxTrackTokens: number`를 추가합니다.
- `COPY.freeTrackLimit: '선로는 12칸까지 만들 수 있어요.'`를 추가합니다.

- [ ] **Step 1: 상한 공유와 UI 비활성화 실패 테스트를 작성합니다.**

```ts
it('자유 선로는 화면과 저장소가 같은 최대 길이를 사용한다', () => {
  expect(MAX_FREE_TRACK_TOKENS).toBe(12);
  const state = { ...createInitialSession(), stage: 'create-track' as const, freeUnit: ['A', 'B'], freeTrack: Array(12).fill('A') as PatternTokenId[] };
  expect(sessionReducer(state, { type: 'APPEND_FREE_UNIT' }).freeTrack).toHaveLength(12);
});
```

```tsx
it('최대 길이에 도달하면 한 묶음 붙이기를 막고 안내한다', () => {
  render(<CreatePatternScreen {...props} mode="track" unit={['A','B']} track={Array(12).fill('A')} maxTrackTokens={12} />);
  expect(screen.getByRole('button', { name: '한 묶음 붙이기' })).toBeDisabled();
  expect(screen.getByText(COPY.freeTrackLimit)).toBeInTheDocument();
});
```

- [ ] **Step 2: 현재 reducer 무제한 append와 storage 12칸 검증 불일치가 실패하는지 확인합니다.**

Run: `npm test -- tests/unit/freePattern.test.ts tests/unit/progressStore.test.ts tests/unit/sessionReducer.test.ts tests/components/createPatternScreen.test.tsx`

Expected: 12칸에서 append가 막히지 않아 새 기대가 FAIL합니다.

- [ ] **Step 3: 공유 상수와 reducer/UI guard를 최소 구현합니다.**

`MAX_STORAGE_CHARS` 옆에 별도 숫자를 복제하지 않고 `validSnapshot`의 `isTokenArray(value.freeTrack, MAX_FREE_TRACK_TOKENS)`를 사용합니다. reducer의 `APPEND_FREE_UNIT`은 `state.freeTrack.length + state.freeUnit.length <= MAX_FREE_TRACK_TOKENS`일 때만 append합니다. TrackMode는 같은 조건으로 버튼을 disabled하고 현재 `track.length / maxTrackTokens`와 안내 문구를 보여 줍니다. 성공 후에도 append 버튼은 상한까지 유지되며 상한을 넘지 않습니다.

- [ ] **Step 4: 저장 새로고침·UI 테스트를 통과시킵니다.**

Run: `npm test -- tests/unit/freePattern.test.ts tests/unit/progressStore.test.ts tests/unit/sessionReducer.test.ts tests/components/createPatternScreen.test.tsx`

Expected: 상한 guard, PersistedProgressV1 parse, 기존 두 번 반복 판정이 모두 PASS.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/domain/pattern/freePattern.ts src/services/progressStore.ts src/features/session/reducer.ts src/features/create/CreatePatternScreen.tsx src/features/session/types.ts src/content/copy.ts tests/unit/freePattern.test.ts tests/unit/progressStore.test.ts tests/unit/sessionReducer.test.ts tests/components/createPatternScreen.test.tsx
git commit -m "fix: align free track limits with persistence"
```

### Task 7: 활동 도장에 시각적 보상과 학습 takeaway 추가

**Files:**
- Create: `src/components/LearningStampList.tsx`
- Modify: `src/features/summary/SummaryScreen.tsx:1-55`
- Modify: `src/content/copy.ts:69-84`
- Modify: `src/styles/components.css:90-129`
- Test: `tests/components/summaryScreen.test.tsx`, `tests/e2e/learner-flow.spec.ts`

**Interfaces:**
- `LearningStampListProps { readonly items: readonly string[]; }` renders a labelled `<ul>` with a non-color check/stamp marker and one list item per completed action.
- New copy keys: `summaryTakeaway`, `summaryNextPrompt`, `summaryStampMarker`.

- [ ] **Step 1: plain bullet list의 실패 테스트를 도장·takeaway 기준으로 바꿉니다.**

```tsx
it('완료 화면은 다섯 행동의 도장과 배운 점을 보여 준다', () => {
  render(<SummaryScreen evidence={evidence} journeyIndex={0} onNextJourney={() => {}} onReturnHome={() => {}} />);
  expect(screen.getByRole('list', { name: COPY.summaryListLabel }).querySelectorAll('.learning-stamp')).toHaveLength(5);
  expect(screen.getByText(COPY.summaryTakeaway)).toBeInTheDocument();
  expect(screen.getByText(COPY.summaryNextPrompt)).toBeInTheDocument();
});
```

- [ ] **Step 2: 테스트가 현재 일반 `<ul><li>`와 takeaway 부재에서 실패하는지 확인합니다.**

Run: `npm test -- tests/components/summaryScreen.test.tsx`

Expected: `.learning-stamp`, `summaryTakeaway`, `summaryNextPrompt` 기대가 FAIL합니다.

- [ ] **Step 3: LearningStampList와 학습 문장을 최소 구현합니다.**

`COPY.summaryTakeaway`는 `반복되는 한 묶음을 찾으면 다음 칸을 예측할 수 있어요.`로, `COPY.summaryNextPrompt`는 `다음에는 다른 모양의 규칙도 찾아봐요.`로 설정합니다. 각 항목 앞에 `✓`와 `aria-hidden="true"`가 있는 `.learning-stamp__mark`를 두고 글자도 함께 렌더링해 색상만으로 완료를 전달하지 않습니다.

- [ ] **Step 4: 완료 화면 E2E와 Axe를 통과시킵니다.**

Run: `npm test -- tests/components/summaryScreen.test.tsx`

Expected: 도장 5개, takeaway, 경쟁 요소 없음이 PASS.

Run: `npm run test:e2e -- tests/e2e/learner-flow.spec.ts --grep "다섯 활동"`

Expected: Journey 완료 후 도장 5개와 다음 운행 버튼이 PASS.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/components/LearningStampList.tsx src/features/summary/SummaryScreen.tsx src/content/copy.ts src/styles/components.css tests/components/summaryScreen.test.tsx tests/e2e/learner-flow.spec.ts
git commit -m "feat: make learning summary feel complete"
```

### Task 8: 날짜·문서·favicon·검증 범위 정리

**Files:**
- Modify: `src/content/updateHistory.ts:12-31`
- Modify: `README.md:80-104`
- Modify: `docs/qa/2026-08-26-accessibility-checklist.md`
- Modify: `index.html:4-12`
- Create: `public/favicon.svg`
- Test: `tests/components/updateHistory.test.tsx`, `tests/unit/readmeContract.test.ts`

**Interfaces:**
- `UPDATE_HISTORY` 최신 항목은 `{ date: '2026-08-28', kind: '개선', summary: '초등학생 관점 모바일·선택·운행 피드백 개선' }`입니다.
- `index.html`은 `<link rel="icon" href="%BASE_URL%favicon.svg" type="image/svg+xml">`를 사용합니다.

- [ ] **Step 1: 날짜·favicon·문서 범위 실패 테스트를 작성합니다.**

```tsx
it('최신 업데이트 날짜와 개선 요약이 기록된다', () => {
  expect(UPDATE_HISTORY[0]).toMatchObject({ date: '2026-08-28', kind: '개선' });
});
```

```ts
it('README는 현재 자동 검증 범위와 공개 경로를 기록한다', () => {
  const readme = readFileSync('README.md', 'utf8');
  expect(readme).toContain('VoiceOver 검증은 이 개선 범위에 포함하지 않습니다');
  expect(readme).toContain('https://wbmaker2.github.io/pattern-unit-engine-room/');
  expect(readme).toContain('favicon.svg');
});
```

- [ ] **Step 2: 현재 날짜·favicon·문서 문자열 기대가 실패하는지 확인합니다.**

Run: `npm test -- tests/components/updateHistory.test.tsx tests/unit/readmeContract.test.ts`

Expected: 2026-08-28 항목과 문서 계약이 FAIL합니다.

- [ ] **Step 3: 날짜·문서·아이콘을 최소 구현합니다.**

업데이트 이력에 최신 항목을 배열 첫 요소로 추가합니다. README의 기존 `167건`을 전체 테스트 실행 결과의 실제 건수로 갱신하고, Safari/VoiceOver 수동 검증 대기 문장을 자동 키보드·Axe·DOM 검증 범위와 “VoiceOver 검증 제외” 정책으로 바꿉니다. `docs/qa` 체크리스트에서 VoiceOver 수동 단계는 제거하고 320px, 200%, keyboard, reduced-motion, Axe, privacy 자동 단계만 남깁니다. `public/favicon.svg`는 24×24 단색 기관차 아이콘을 inline path로 제공하며 외부 요청을 사용하지 않습니다. `index.html`의 icon href는 Vite base 경로를 사용합니다.

- [ ] **Step 4: 문서·favicon·공개 HTML 참조 테스트를 통과시킵니다.**

Run: `npm test -- tests/components/updateHistory.test.tsx tests/unit/readmeContract.test.ts`

Expected: 날짜, 공개 URL, VoiceOver 제외 범위, favicon 계약이 PASS.

Run: `npm run build && test -f dist/favicon.svg`

Expected: build 성공과 `dist/favicon.svg` 생성.

- [ ] **Step 5: 변경을 커밋합니다.**

```bash
git add src/content/updateHistory.ts README.md docs/qa/2026-08-26-accessibility-checklist.md index.html public/favicon.svg tests/components/updateHistory.test.tsx tests/unit/readmeContract.test.ts
git commit -m "docs: record learner UX improvement scope"
```

### Task 9: 전체 품질 게이트와 HVC 전달용 결과 기록

**Files:**
- Modify: `tests/e2e/accessibility.spec.ts` if a regression assertion from Tasks 1–5 needs tightening.
- Modify: `README.md` only for exact command output counts produced in this task.
- Create: `docs/qa/2026-08-28-learner-ux-improvement-result.md`

**Interfaces:**
- Result document fields: `Scope`, `Automated evidence`, `Public learner URL`, `Known limits`, `Changed files`, `Release status`.
- This task does not include `git push`, GitHub repository settings, or deployment unless the user separately requests release actions.

- [ ] **Step 1: 변경 후 전체 실패 지점을 먼저 확인합니다.**

Run: `npm run check:size && npm run lint && npm test && npm run build && npm run test:e2e`

Expected: 새 UI·문서 변경으로 실패한 명령과 첫 오류 파일을 기록하고, 실패가 있으면 해당 Task의 테스트와 구현으로 돌아갑니다.

- [ ] **Step 2: 최소 수정 후 전체 품질 게이트를 통과시킵니다.**

Run: `npm run check`

Expected: lint, 28개 이상 Vitest 파일, TypeScript strict build가 모두 PASS합니다.

Run: `npm run test:e2e`

Expected: Journey, 320px·200%, reduced-motion, keyboard, Axe, privacy와 새 겹침·선택·runtime motion 검사가 모두 PASS합니다.

Run: `curl -I -L -sS https://wbmaker2.github.io/pattern-unit-engine-room/`

Expected: 공개 Pages 응답이 `HTTP/2 200`입니다. 이 명령은 현재 배포본만 확인하며 로컬 변경이 자동 배포되었다고 간주하지 않습니다.

- [ ] **Step 3: 결과 문서를 작성하고 검토합니다.**

`docs/qa/2026-08-28-learner-ux-improvement-result.md`에 실제 통과 수, 로컬 검증 시각, 공개 URL, 미배포 로컬 상태를 적습니다. VoiceOver 결과를 쓰지 않고 “범위 외”로 기록합니다. 코드 파일 줄 수와 `git diff --check` 결과를 포함합니다.

- [ ] **Step 4: 최종 변경을 한 번 검토합니다.**

Run: `git diff --check && git status --short && git log --oneline -12`

Expected: 공백 오류가 없고, 의도한 개선 파일만 남으며, 각 코드 파일이 499줄 이하입니다.

- [ ] **Step 5: 구현 완료를 보고합니다.**

보고서에는 [공개 HVC 확인 링크](https://wbmaker2.github.io/pattern-unit-engine-room/)를 포함하고, 로컬 개선이 배포 전이면 “공개 URL은 이전 배포본”이라고 명시합니다. 사용자가 별도로 커밋·푸시·배포를 요청하기 전에는 외부 release 작업을 실행하지 않습니다.

## 향후 실행 명령과 예상 결과

```bash
npm ci
npm run check:size
npm run lint
npm test
npm run build
npm run test:e2e
git diff --check
git status --short
```

예상 결과는 의존성 재현 성공, 499줄 이하, lint·unit/component·build·Chromium E2E·privacy·Axe·320px·200%·reduced-motion·keyboard PASS입니다. 위 명령은 구현 작업자가 각 TDD 단계에서 실행할 항목이며 이 계획을 작성하는 동안 실행하지 않습니다.

## 커밋 단계

1. `fix: keep update history out of learner controls`
2. `fix: make pattern choices visibly selectable`
3. `feat: clarify learner steps and start guidance`
4. `fix: make accessibility settings explicit and safe`
5. `feat: show free pattern run with motion fallback`
6. `fix: align free track limits with persistence`
7. `feat: make learning summary feel complete`
8. `docs: record learner UX improvement scope`
9. `test: record learner UX improvement evidence`

각 커밋 전 해당 Task의 테스트를 실행하고 `git diff --check`를 확인합니다. 커밋·푸시·배포는 이 계획의 자동 단계가 아니며 별도 사용자 지시가 있을 때만 수행합니다.

## 최종 완료 판정

- 320px에서 업데이트 버튼과 어떤 핵심 선택·제출 버튼도 겹치지 않습니다.
- 선택 후보가 포커스 이탈 뒤에도 시각적으로 선택 상태를 유지합니다.
- 시작 문장이 중복되지 않고 첫 화면에 미션 그림·목표·현재 단계가 있습니다.
- 성공 후 다음 버튼이 다음 학습 활동을 구체적으로 말합니다.
- 일반 모션에서 실제 반복 선로가 움직이고, reduced-motion에서는 실제 칸 테두리가 진행을 보여 줍니다.
- 이어 하기를 끌 때 확인 없이 저장 기록이 삭제되지 않습니다.
- 자유 선로 UI와 `PersistedProgressV1`가 `MAX_FREE_TRACK_TOKENS = 12`를 공유합니다.
- 완료 화면에 다섯 학습 행동의 도장, 배운 점, 다음 행동이 있습니다.
- 최신 업데이트 내역에 2026-08-28 개선 날짜가 있습니다.
- 단위·component·E2E·privacy·Axe·keyboard·320px·200%·reduced-motion·grayscale 검사가 통과합니다.
- VoiceOver 구현·검증은 결과에 포함하지 않습니다.
- 구현 파일은 499줄 이하이고 공개 HVC 링크가 결과 문서에 있습니다.

## 자체 검토 기록

- 설계 문서의 학습 목표, 차별성, 핵심 흐름, 콘텐츠·판정, 접근성, 개인정보·안전, MVP, 완료 기준을 위 추적표와 Task에 연결했습니다.
- 금지된 자리표시자 없이 모든 단계에 실행 가능한 경로·인터페이스·검증 조건을 기록했습니다.
- 모든 새 타입·컴포넌트·상수의 파일 경로와 테스트 합격 조건을 이 문서에 명시했습니다.
- fixed overlay, 선택 상태, runtime motion, storage 상한, summary reward를 자동 테스트로 재현하도록 계획했습니다.
