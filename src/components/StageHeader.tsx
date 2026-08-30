import type { JSX } from 'react';
import { ProgressIndicator } from './ProgressIndicator';

export type StageNumber = 1 | 2 | 3 | 4 | 5;

export interface StageHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly instruction: string;
  readonly current: StageNumber;
  readonly total: 5;
  readonly labelledBy?: string;
}

export function StageHeader({ eyebrow, title, instruction, current, total, labelledBy }: StageHeaderProps): JSX.Element {
  const titleId = labelledBy ?? `stage-title-${current}`;
  return (
    <header className="stage-header" aria-labelledby={titleId}>
      <p className="stage-header__eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <p className="stage-header__instruction">{instruction}</p>
      <ProgressIndicator current={current} total={total} />
    </header>
  );
}
