import type { JSX, ReactNode } from 'react';

export interface AppShellProps {
  readonly children: ReactNode;
  readonly motion?: 'reduce' | 'full';
  readonly patternContrast?: 'standard' | 'strong';
}

export function AppShell({
  children,
  motion = 'full',
  patternContrast = 'standard',
}: AppShellProps): JSX.Element {
  return (
    <main
      aria-label="규칙 단위 기관실"
      className="app-shell"
      data-motion={motion}
      data-pattern-contrast={patternContrast}
    >
      <div className="app-shell__content">{children}</div>
    </main>
  );
}
