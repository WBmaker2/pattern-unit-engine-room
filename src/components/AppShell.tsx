import type { JSX, ReactNode } from 'react';

export interface AppShellProps {
  readonly children: ReactNode;
}

export function AppShell({ children }: AppShellProps): JSX.Element {
  return (
    <main aria-label="규칙 단위 기관실" className="app-shell">
      <div className="app-shell__content">{children}</div>
    </main>
  );
}
