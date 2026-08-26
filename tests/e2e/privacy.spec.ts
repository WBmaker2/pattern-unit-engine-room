import { expect, test, type Page } from '@playwright/test';

const PROGRESS_KEY = 'pattern-unit-engine-room:v1';

function isAllowedDevPath(pathname: string): boolean {
  return pathname === '/'
    || pathname === '/@vite/client'
    || pathname === '/@react-refresh'
    || pathname.startsWith('/src/')
    || pathname.startsWith('/node_modules/.vite/deps/')
    || pathname.startsWith('/node_modules/vite/dist/client/')
    || pathname.startsWith('/audio/ko/');
}

async function installPrivacyProbe(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const probe = {
      getUserMedia: 0,
      mediaRecorder: 0,
      webSockets: [] as Array<{ url: string; isVite: boolean }>,
      fetches: [] as string[],
    };
    Object.defineProperty(window, '__privacyProbe', { configurable: true, value: probe });

    const mediaDevices = navigator.mediaDevices;
    if (mediaDevices && typeof mediaDevices.getUserMedia === 'function') {
      const originalGetUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
      mediaDevices.getUserMedia = (...args: Parameters<MediaDevices['getUserMedia']>) => {
        probe.getUserMedia += 1;
        return originalGetUserMedia(...args);
      };
    }

    const OriginalMediaRecorder = window.MediaRecorder;
    if (OriginalMediaRecorder) {
      window.MediaRecorder = class extends OriginalMediaRecorder {
        constructor(...args: ConstructorParameters<typeof MediaRecorder>) {
          probe.mediaRecorder += 1;
          super(...args);
        }
      };
    }

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = class extends OriginalWebSocket {
      constructor(url: string | URL, protocols?: string | string[]) {
        const stack = new Error().stack ?? '';
        const isVite = stack.includes('/@vite/client') || String(url).includes('__vite_ping');
        probe.webSockets.push({ url: String(url), isVite });
        if (protocols === undefined) super(url);
        else super(url, protocols);
      }
    };

    const originalFetch = window.fetch.bind(window);
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      probe.fetches.push(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
      return originalFetch(input, init);
    };
  });
}

async function completeGrayscaleJourney(page: Page): Promise<void> {
  await page.goto('/');
  await page.addStyleTag({ content: '* { filter: grayscale(1) !important; }' });
  await page.getByRole('button', { name: '운행 시작' }).click();

  await page.getByRole('button', { name: /후보 2:/ }).click();
  await page.getByRole('button', { name: '한 묶음 찾기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
  await page.getByRole('button', { name: '나사못 한 칸' }).click();
  await page.getByRole('button', { name: '이어 붙이기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();

  await page.getByRole('button', { name: /다섯째 칸/ }).click();
  await page.getByRole('button', { name: '깃발 모양', exact: true }).click();
  await page.getByRole('button', { name: '고치기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();

  for (const [source, target] of [['전등', '바퀴'], ['깃발', '창문'], ['별', '기차']] as const) {
    await page.getByRole('button', { name: source, exact: true }).click();
    await page.getByRole('button', { name: target, exact: true }).click();
  }
  await page.getByRole('button', { name: '같은 규칙 확인' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();

  await page.getByRole('button', { name: '톱니바퀴 모양', exact: true }).click();
  await page.getByRole('button', { name: '나사못 모양', exact: true }).click();
  await page.getByRole('button', { name: '묶음 정하기' }).click();
  await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
  await page.getByRole('button', { name: '한 묶음 붙이기' }).click();
  await page.getByRole('button', { name: '운행하기' }).click();
  await page.getByRole('button', { name: '다음 칸' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
});

test('앱 요청은 앱 origin과 로컬 한국어 음원 경로만 사용한다', async ({ page }) => {
  await installPrivacyProbe(page);
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.getByRole('button', { name: '접근성 설정' }).click();
  await page.getByRole('switch', { name: '안내 음성' }).check();
  await page.getByRole('button', { name: '설정 닫기' }).click();
  const audioRequestPromise = page.waitForRequest((request) => {
    const url = new URL(request.url());
    return url.pathname === '/audio/ko/start.mp3';
  });
  const audioResponsePromise = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return url.pathname === '/audio/ko/start.mp3';
  });
  await page.getByRole('button', { name: '안내 듣기' }).click();
  const audioRequest = await audioRequestPromise;
  const audioResponse = await audioResponsePromise;
  expect(new URL(audioRequest.url()).pathname).toBe('/audio/ko/start.mp3');
  expect([200, 206]).toContain(audioResponse.status());
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);
  const appOrigin = new URL(page.url()).origin;
  const disallowed = requests.filter((requestUrl) => {
    const url = new URL(requestUrl);
    return url.origin !== appOrigin || !isAllowedDevPath(url.pathname);
  });
  expect(disallowed).toEqual([]);
  const probe = await page.evaluate(() => (window as unknown as {
    __privacyProbe: { getUserMedia: number; mediaRecorder: number; webSockets: Array<{ isVite: boolean }>; fetches: string[] };
  }).__privacyProbe);
  expect(probe.getUserMedia).toBe(0);
  expect(probe.mediaRecorder).toBe(0);
  expect(probe.webSockets.filter((socket) => !socket.isVite)).toEqual([]);
  expect(probe.fetches.filter((requestUrl) => {
    const url = new URL(requestUrl, appOrigin);
    return url.origin !== appOrigin || !isAllowedDevPath(url.pathname);
  })).toEqual([]);
});

test('기본 저장은 꺼져 있고 동의하면 최소 PersistedProgressV1만 저장한다', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '운행 시작' }).click();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);

  await page.goto('/');
  await page.getByRole('button', { name: '접근성 설정' }).click();
  await page.getByRole('switch', { name: '이 기기에서 이어 하기' }).check();
  await expect.poll(() => page.evaluate(() => Object.keys(localStorage))).toEqual([PROGRESS_KEY]);
  const value = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? 'null'), PROGRESS_KEY) as {
    version: number;
    consent: boolean;
    snapshot: Record<string, unknown>;
    settings: Record<string, unknown>;
  };
  expect(Object.keys(value).sort()).toEqual(['consent', 'settings', 'snapshot', 'version']);
  expect(value.version).toBe(1);
  expect(value.consent).toBe(true);
  expect(Object.keys(value.snapshot).sort()).toEqual(['completedKinds', 'freeTrack', 'freeUnit', 'journeyIndex', 'stage']);
  expect(Object.keys(value.settings).sort()).toEqual(['audioEnabled', 'motionPreference', 'patternContrast']);
  expect(JSON.stringify(value)).not.toMatch(/name|photo|voice|record|score|speed|streak|rank|attempt|time/i);
});

test('색을 회색조로 바꾸어도 visible label만으로 Journey 0을 완료한다', async ({ page }) => {
  await completeGrayscaleJourney(page);
  await expect(page.getByRole('heading', { name: '활동 도장' })).toBeVisible();
  await expect(page.getByRole('list', { name: '완료한 학습 행동' }).getByRole('listitem')).toHaveCount(5);
});
