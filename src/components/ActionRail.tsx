import type { JSX, ReactNode } from 'react';

export interface ActionRailProps {
  readonly primary: ReactNode;
  readonly next?: ReactNode;
  readonly secondary?: ReactNode;
  readonly labelledBy?: string;
}

export function ActionRail({ primary, next, secondary, labelledBy }: ActionRailProps): JSX.Element {
  return (
    <div
      {...(labelledBy ? { 'aria-labelledby': labelledBy } : { 'aria-label': '이번 행동' })}
      className="action-rail"
      role="group"
    >
      {primary}
      {next}
      {secondary}
    </div>
  );
}
