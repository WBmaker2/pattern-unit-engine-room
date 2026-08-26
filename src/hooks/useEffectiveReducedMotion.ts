import { useEffect, useState } from 'react';

import type { AccessibilitySettings } from '../features/session/types';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export type MotionPreference = AccessibilitySettings['motionPreference'];

function readSystemPreference(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * 앱 설정과 운영체제 설정을 합친 실제 모션 정책입니다.
 * 둘 중 하나라도 줄이기를 요구하면 항상 true가 됩니다.
 */
export function useEffectiveReducedMotion(preference: MotionPreference): boolean {
  const [systemPrefersReduce, setSystemPrefersReduce] = useState(readSystemPreference);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setSystemPrefersReduce(false);
      return undefined;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent): void => {
      setSystemPrefersReduce(event.matches);
    };

    setSystemPrefersReduce(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return preference === 'reduce' || (preference === 'system' && systemPrefersReduce);
}
