import { useEffect, useRef, type JSX, type ReactNode } from 'react';

export interface StageFocusRegionProps {
  readonly focusKey: string;
  readonly label: string;
  readonly children: ReactNode;
}

export function StageFocusRegion({ focusKey, label, children }: StageFocusRegionProps): JSX.Element {
  const regionRef = useRef<HTMLDivElement>(null);
  const previousFocusKey = useRef<string | null>(null);

  useEffect(() => {
    if (previousFocusKey.current === null) {
      previousFocusKey.current = focusKey;
      return;
    }
    if (previousFocusKey.current === focusKey) return;
    previousFocusKey.current = focusKey;
    const region = regionRef.current;
    if (!region) return;
    region.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [focusKey]);

  return (
    <div
      aria-label={label}
      className="stage-focus-region"
      ref={regionRef}
      role="region"
      tabIndex={-1}
    >
      {children}
    </div>
  );
}
