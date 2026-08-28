import type { JSX } from 'react';

import { COPY } from '../content/copy';

export interface LearningStampListProps {
  readonly items: readonly string[];
}

export function LearningStampList({ items }: LearningStampListProps): JSX.Element {
  return (
    <ul aria-label={COPY.summaryListLabel} className="learning-stamp-list">
      {items.map((item) => (
        <li className="learning-stamp" key={item}>
          <span aria-hidden="true" className="learning-stamp__mark">
            {COPY.summaryStampMarker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
