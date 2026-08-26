import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App';
import { useEffectiveReducedMotion } from '../../src/hooks/useEffectiveReducedMotion';

interface MatchMediaController {
  readonly query: string;
  matches: boolean;
  readonly change: (matches: boolean) => void;
  readonly addEventListener: ReturnType<typeof vi.fn>;
  readonly removeEventListener: ReturnType<typeof vi.fn>;
}

function mockMatchMedia(initialMatches: boolean): MatchMediaController {
  let currentMatches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const addEventListener = vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
    if (type === 'change') listeners.add(listener);
  });
  const removeEventListener = vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
    if (type === 'change') listeners.delete(listener);
  });
  const mediaQuery = {
    get matches() {
      return currentMatches;
    },
    media: '(prefers-reduced-motion: reduce)',
    addEventListener,
    removeEventListener,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;
  const controller: MatchMediaController = {
    query: '(prefers-reduced-motion: reduce)',
    matches: currentMatches,
    change(nextMatches) {
      currentMatches = nextMatches;
      controller.matches = nextMatches;
      const event = { matches: nextMatches, media: controller.query } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
    addEventListener,
    removeEventListener,
  };
  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: globalThis.matchMedia,
  });
  return controller;
}

describe('useEffectiveReducedMotion 및 앱 모션 표지', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('운영체제가 reduce이면 앱 system 설정에서도 reduce를 반환한다', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useEffectiveReducedMotion('system'));
    expect(result.current).toBe(true);
  });

  it('앱의 reduce 선택은 운영체제 설정과 무관하게 유지된다', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useEffectiveReducedMotion('reduce'));
    expect(result.current).toBe(true);
  });

  it('앱 system 설정은 OS change를 따라가고 listener를 해제한다', () => {
    const controller = mockMatchMedia(false);
    const { result, unmount } = renderHook(() => useEffectiveReducedMotion('system'));
    expect(result.current).toBe(false);
    act(() => controller.change(true));
    expect(result.current).toBe(true);
    act(() => controller.change(false));
    expect(result.current).toBe(false);
    expect(controller.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    unmount();
    expect(controller.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('앱 root에 유효 모션과 무늬 대비 data attribute를 연결한다', async () => {
    const user = userEvent.setup();
    mockMatchMedia(false);
    render(<App />);
    const appRoot = screen.getByRole('main', { name: '규칙 단위 기관실' });
    expect(appRoot).toHaveAttribute('data-motion', 'full');
    expect(appRoot).toHaveAttribute('data-pattern-contrast', 'standard');

    await user.click(screen.getByRole('button', { name: '접근성 설정' }));
    await user.click(screen.getByRole('switch', { name: '모션 줄이기' }));
    await user.click(screen.getByRole('switch', { name: '무늬 대비 높이기' }));
    expect(appRoot).toHaveAttribute('data-motion', 'reduce');
    expect(appRoot).toHaveAttribute('data-pattern-contrast', 'strong');
  });
});
