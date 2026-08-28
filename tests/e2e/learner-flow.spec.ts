import { expect, test, type Page } from '@playwright/test';

async function submitFind(page: Page, candidate: RegExp | string): Promise<void> {
  await page.getByRole('button', { name: candidate }).click();
  await page.getByRole('button', { name: '한 묶음 찾기' }).click();
}

async function completeJourneyZeroByVisibleLabels(page: Page): Promise<void> {
  // 찾기: 일부러 틀린 후보와 힌트를 거친 뒤 정답을 다시 고릅니다.
  await submitFind(page, /후보 1:/);
  await expect(page.getByText('이 묶음으로는 끝까지 되풀이되지 않아요.')).toBeVisible();
  await page.getByRole('button', { name: '테두리 도움 보기' }).click();
  await submitFind(page, /후보 2:/);
  await page.getByRole('button', { name: '다음 활동: 이어 붙이기' }).click();

  // 이어 붙이기: AAB의 마지막 항인 나사못을 선택합니다.
  await page.getByRole('button', { name: '톱니바퀴 한 칸' }).click();
  await page.getByRole('button', { name: '이어 붙이기' }).click();
  await expect(page.getByText('한 묶음의 순서를 다시 살펴봐요.')).toBeVisible();
  await page.getByRole('button', { name: '나사못 한 칸' }).click();
  await page.getByRole('button', { name: '이어 붙이기' }).click();
  await page.getByRole('button', { name: '다음 활동: 규칙 수리하기' }).click();

  // 수리: 먼저 틀린 칸/모양을 제출하고, 다섯째 칸을 깃발로 교체합니다.
  await page.getByRole('button', { name: /둘째 칸/ }).click();
  await page.getByRole('button', { name: '깃발 모양', exact: true }).click();
  await page.getByRole('button', { name: '고치기' }).click();
  await expect(page.getByText('규칙을 깨뜨린 칸을 다시 찾아봐요.')).toBeVisible();
  await page.getByRole('button', { name: /다섯째 칸/ }).click();
  await page.getByRole('button', { name: '깃발 모양', exact: true }).click();
  await page.getByRole('button', { name: '고치기' }).click();
  await page.getByRole('button', { name: '다음 활동: 새 모양으로 바꾸기' }).click();

  // 번역: 원래 항을 고른 다음 대응하는 새 모양을 고릅니다.
  const translation = [
    ['전등', '바퀴'],
    ['깃발', '창문'],
    ['별', '기차'],
  ] as const;
  for (const [source, target] of translation) {
    await page.getByRole('button', { name: source }).click();
    await page.getByRole('button', { name: target }).click();
  }
  await page.getByRole('button', { name: '같은 규칙 확인' }).click();
  await page.getByRole('button', { name: '다음 활동: 내 규칙 만들기' }).click();

  // 자유 규칙: 두 모양으로 한 묶음을 정하고 두 번 붙인 뒤 운행합니다.
  await page.getByRole('button', { name: '톱니바퀴 모양', exact: true }).click();
  await page.getByRole('button', { name: '나사못 모양', exact: true }).click();
  await page.getByRole('button', { name: '묶음 정하기' }).click();
  await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
  await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
  await page.getByRole('button', { name: '운행하기' }).click();
  await page.getByRole('button', { name: '활동 도장 보기' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
});

test('Journey 0을 드래그 없이 끝내고 다섯 활동 도장을 받는다', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '운행 시작' }).click();
  await completeJourneyZeroByVisibleLabels(page);
  await expect(page.getByRole('heading', { name: '활동 도장' })).toBeVisible();
  const stamps = page.getByRole('list', { name: '완료한 학습 행동' });
  await expect(stamps.getByRole('listitem')).toHaveCount(5);
  await expect(stamps.locator('.learning-stamp')).toHaveCount(5);
  await expect(page.getByText('반복되는 한 묶음을 찾으면 다음 칸을 예측할 수 있어요.')).toBeVisible();
  await expect(page.getByText('다음에는 다른 모양의 규칙도 찾아봐요.')).toBeVisible();
});

test('활동 도장에서 다음 Journey를 순환한다', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '운행 시작' }).click();
  await completeJourneyZeroByVisibleLabels(page);
  await page.getByRole('button', { name: '다음 운행' }).click();
  await expect(page.getByRole('heading', { name: '한 묶음 찾기' })).toBeVisible();
  await expect(page.getByRole('button', { name: /후보 2: 전등, 전등, 깃발 세 칸/ })).toBeVisible();
});

test('Journey 4 다음 운행은 Journey 0으로 돌아온다', async ({ page }) => {
  await page.addInitScript((progress) => {
    window.localStorage.setItem('pattern-unit-engine-room:v1', JSON.stringify(progress));
  }, {
    version: 1,
    consent: true,
    snapshot: {
      journeyIndex: 4,
      stage: 'create-track',
      completedKinds: ['unit-recognized', 'continued', 'repaired', 'translated', 'created'],
      freeUnit: ['A', 'B'],
      freeTrack: ['A', 'B', 'A', 'B'],
    },
    settings: {
      audioEnabled: false,
      motionPreference: 'system',
      patternContrast: 'standard',
    },
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '활동 도장' })).toBeVisible();
  await page.getByRole('button', { name: '다음 운행' }).click();
  await expect(page.getByRole('heading', { name: '한 묶음 찾기' })).toBeVisible();
  await expect(page.getByRole('button', { name: /후보 2: 톱니바퀴, 나사못 두 칸/ })).toBeVisible();
});
