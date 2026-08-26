import { expect, test, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function activate(locator: Locator, key: 'Enter' | 'Space' = 'Enter'): Promise<void> {
  await locator.focus();
  await locator.press(key);
}

async function tabActivate(page: Page, locator: Locator, key: 'Enter' | 'Space'): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await locator.evaluate((element) => element === document.activeElement)) break;
    await page.keyboard.press('Tab');
  }
  await expect(locator).toBeFocused();
  await page.keyboard.press(key);
}

async function startJourney(page: Page): Promise<void> {
  await page.goto('/');
  await activate(page.getByRole('button', { name: '운행 시작' }));
}

async function completeFind(page: Page): Promise<void> {
  await page.getByRole('button', { name: /후보 2:/ }).click();
  await page.getByRole('button', { name: '한 묶음 찾기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
}

async function completeContinue(page: Page): Promise<void> {
  await page.getByRole('button', { name: '나사못 한 칸' }).click();
  await page.getByRole('button', { name: '이어 붙이기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
}

async function completeRepair(page: Page): Promise<void> {
  await page.getByRole('button', { name: /다섯째 칸/ }).click();
  await page.getByRole('button', { name: '깃발 모양', exact: true }).click();
  await page.getByRole('button', { name: '고치기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
}

async function completeTranslate(page: Page): Promise<void> {
  const pairs = [
    ['전등', '바퀴'],
    ['깃발', '창문'],
    ['별', '기차'],
  ] as const;
  for (const [source, target] of pairs) {
    await page.getByRole('button', { name: source, exact: true }).click();
    await page.getByRole('button', { name: target, exact: true }).click();
  }
  await page.getByRole('button', { name: '같은 규칙 확인' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
}

async function completeCreate(page: Page): Promise<void> {
  await page.getByRole('button', { name: '톱니바퀴 모양', exact: true }).click();
  await page.getByRole('button', { name: '나사못 모양', exact: true }).click();
  await page.getByRole('button', { name: '묶음 정하기' }).click();
  await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
  await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
  await page.getByRole('button', { name: '운행하기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
}

async function assertOneOrFewerPrimaryActions(page: Page): Promise<void> {
  expect(await page.locator('[data-primary-action="true"]').count()).toBeLessThanOrEqual(1);
}

async function interactiveBoundingBoxes(page: Page): Promise<Array<{ width: number; height: number }>> {
  return page.locator('button:visible, a:visible, input:visible, select:visible, textarea:visible, [role="switch"]:visible')
    .evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }));
}

async function assert320Layout(page: Page): Promise<void> {
  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth);
  for (const box of await interactiveBoundingBoxes(page)) {
    expect(box.width).toBeGreaterThanOrEqual(48);
    expect(box.height).toBeGreaterThanOrEqual(48);
  }
}

async function assertStageAxe(page: Page): Promise<void> {
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations, result.violations.map((violation) => `${violation.id}: ${violation.help}`).join('\n'))
    .toEqual([]);
}

test.describe('모바일·확대·모션 접근성', () => {
  test('320px에서 가로 스크롤과 작은 조작 대상이 없다', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');
    await assert320Layout(page);
    await page.getByRole('button', { name: '접근성 설정' }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: '설정 닫기' }).click();
    await page.getByRole('button', { name: '업데이트 내역' }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: '업데이트 내역 닫기' }).click();
    await page.getByRole('button', { name: '운행 시작' }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: /후보 2:/ }).click();
    await page.getByRole('button', { name: '한 묶음 찾기' }).click();
    await page.getByRole('button', { name: '다음 칸' }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: '나사못 한 칸' }).click();
    await page.getByRole('button', { name: '이어 붙이기' }).click();
    await page.getByRole('button', { name: '다음 칸' }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: /다섯째 칸/ }).click();
    await page.getByRole('button', { name: '깃발 모양', exact: true }).click();
    await page.getByRole('button', { name: '고치기' }).click();
    await page.getByRole('button', { name: '다음 칸' }).click();
    await assert320Layout(page);
    await completeTranslate(page);
    await assert320Layout(page);
    await page.getByRole('button', { name: '톱니바퀴 모양', exact: true }).click();
    await page.getByRole('button', { name: '나사못 모양', exact: true }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: '묶음 정하기' }).click();
    await assert320Layout(page);
    await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
    await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
    await page.getByRole('button', { name: '운행하기' }).click();
    await page.getByRole('button', { name: '다음 칸' }).click();
    await assert320Layout(page);
  });

  test('640px viewport의 2배 페이지 배율에서도 핵심 요소가 겹치거나 잘리지 않는다', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 720 });
    await startJourney(page);
    await page.getByRole('button', { name: /후보 2:/ }).click();
    expect(await page.locator('[data-primary-action="true"]').count()).toBeGreaterThan(0);
    expect(await page.locator('h2').count()).toBeGreaterThan(0);
    expect(await page.locator('.find-screen > ol[aria-label="규칙 배열"]').count()).toBeGreaterThan(0);
    expect(await page.locator('button[data-primary-action="true"]').count()).toBeGreaterThan(0);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 640,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 });
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('ol[aria-label="규칙 배열"]').first()).toBeVisible();
    const viewport = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      visualScale: window.visualViewport?.scale ?? 1,
      visualWidth: window.visualViewport?.width ?? document.documentElement.clientWidth,
    }));
    expect(viewport.visualScale).toBe(2);
    expect(viewport.visualWidth).toBe(320);
    expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth);
    const boxes = await page.locator('h2, .find-screen > ol[aria-label="규칙 배열"], button[data-primary-action="true"]')
      .evaluateAll((elements) => elements.map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
          clientHeight: element.clientHeight,
          scrollHeight: element.scrollHeight,
          overflowX: style.overflowX,
          overflowY: style.overflowY,
        };
      }));
    const documentBounds = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
    }));
    for (const box of boxes) {
      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(viewport.clientWidth);
      expect(box.top).toBeGreaterThanOrEqual(0);
      expect(box.bottom).toBeLessThanOrEqual(documentBounds.height);
      expect(box.scrollWidth).toBeLessThanOrEqual(box.clientWidth);
      expect(box.scrollHeight).toBeLessThanOrEqual(box.clientHeight);
      if (box.overflowX === 'hidden' || box.overflowX === 'clip') {
        expect(box.scrollWidth).toBeLessThanOrEqual(box.clientWidth);
      }
      if (box.overflowY === 'hidden' || box.overflowY === 'clip') {
        expect(box.scrollHeight).toBeLessThanOrEqual(box.clientHeight);
      }
    }
    for (let index = 0; index < boxes.length; index += 1) {
      for (let next = index + 1; next < boxes.length; next += 1) {
        const first = boxes[index]!;
        const second = boxes[next]!;
        const separated = first.right <= second.left || second.right <= first.left
          || first.bottom <= second.top || second.bottom <= first.top;
        expect(separated).toBe(true);
      }
    }
  });

  test('모션 감소에서는 pulse·열차 애니메이션을 끄고 활성 칸은 정적 4px 테두리다', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await startJourney(page);
    await page.evaluate(() => {
      const probe = document.createElement('span');
      probe.className = 'train-track--moving';
      probe.setAttribute('aria-hidden', 'true');
      document.querySelector('#root')?.append(probe);
    });
    await page.getByRole('button', { name: /후보 1:/ }).click();
    await page.getByRole('button', { name: '한 묶음 찾기' }).click();
    await page.getByRole('button', { name: '테두리 도움 보기' }).click();
    const motion = await page.evaluate(() => ({
      trainProbeCount: document.querySelectorAll('.train-track--moving').length,
      pulseCount: document.querySelectorAll('.gi-pulse').length,
      animationNames: Array.from(document.querySelectorAll('.gi-pulse, .train-track--moving'))
        .map((element) => getComputedStyle(element).animationName),
      transforms: Array.from(document.querySelectorAll('.gi-pulse, .train-track--moving'))
        .map((element) => getComputedStyle(element).transform),
      activeOutlineWidths: Array.from(document.querySelectorAll('.pattern-cell--active'))
        .map((element) => getComputedStyle(element).outlineWidth),
      appMotion: document.querySelector('.app-shell')?.getAttribute('data-motion'),
    }));
    expect(motion.appMotion).toBe('reduce');
    expect(motion.trainProbeCount).toBe(1);
    expect(motion.pulseCount).toBeGreaterThan(0);
    expect(motion.animationNames.every((name) => name === 'none')).toBe(true);
    expect(motion.transforms.every((transform) => transform === 'none')).toBe(true);
    expect(motion.activeOutlineWidths.length).toBeGreaterThan(0);
    expect(motion.activeOutlineWidths.every((width) => width === '4px')).toBe(true);
  });
});

test.describe('단계별 주 행동·키보드·Axe', () => {
  test('각 stage의 활성 주 행동은 최대 하나다', async ({ page }) => {
    await startJourney(page);
    await assertOneOrFewerPrimaryActions(page);
    await page.getByRole('button', { name: /후보 2:/ }).click();
    await assertOneOrFewerPrimaryActions(page);
    await page.getByRole('button', { name: '한 묶음 찾기' }).click();
    await page.getByRole('button', { name: '다음 칸' }).click();
    await assertOneOrFewerPrimaryActions(page);
    await completeContinue(page);
    await assertOneOrFewerPrimaryActions(page);
    await completeRepair(page);
    await assertOneOrFewerPrimaryActions(page);
    await completeTranslate(page);
    await assertOneOrFewerPrimaryActions(page);
    await completeCreate(page);
    await assertOneOrFewerPrimaryActions(page);
  });

  test('Tab으로 이동하고 Enter·Space로 Journey 0 전체를 완료한다', async ({ page }) => {
    await page.goto('/');
    await tabActivate(page, page.getByRole('button', { name: '운행 시작' }), 'Space');

    await tabActivate(page, page.getByRole('button', { name: /후보 2:/ }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '한 묶음 찾기' }), 'Space');
    await tabActivate(page, page.getByRole('button', { name: '다음 칸' }), 'Enter');

    await tabActivate(page, page.getByRole('button', { name: '나사못 한 칸' }), 'Space');
    await tabActivate(page, page.getByRole('button', { name: '이어 붙이기' }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '다음 칸' }), 'Space');

    await tabActivate(page, page.getByRole('button', { name: /다섯째 칸/ }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '깃발 모양', exact: true }), 'Space');
    await tabActivate(page, page.getByRole('button', { name: '고치기' }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '다음 칸' }), 'Space');

    for (const [source, target] of [['전등', '바퀴'], ['깃발', '창문'], ['별', '기차']] as const) {
      await tabActivate(page, page.getByRole('button', { name: source, exact: true }), 'Enter');
      await tabActivate(page, page.getByRole('button', { name: target, exact: true }), 'Space');
    }
    await tabActivate(page, page.getByRole('button', { name: '같은 규칙 확인' }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '다음 칸' }), 'Space');

    await tabActivate(page, page.getByRole('button', { name: '톱니바퀴 모양', exact: true }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '나사못 모양', exact: true }), 'Space');
    await tabActivate(page, page.getByRole('button', { name: '묶음 정하기' }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '한 묶음 붙이기' }), 'Space');
    await tabActivate(page, page.getByRole('button', { name: '한 묶음 붙이기' }), 'Enter');
    await tabActivate(page, page.getByRole('button', { name: '운행하기' }), 'Space');
    await tabActivate(page, page.getByRole('button', { name: '다음 칸' }), 'Enter');
    await expect(page.getByRole('heading', { name: '활동 도장' })).toBeVisible();
  });

  test('Find·Continue·Repair·Translate·Create·Summary의 Axe 위반이 0개다', async ({ page }) => {
    await startJourney(page);
    await assertStageAxe(page);

    await completeFind(page);
    await assertStageAxe(page);
    await completeContinue(page);
    await assertStageAxe(page);
    await completeRepair(page);
    await assertStageAxe(page);
    await completeTranslate(page);
    await assertStageAxe(page);
    await completeCreate(page);
    await assertStageAxe(page);
  });
});
