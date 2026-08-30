import type { JSX } from 'react';
import type { JourneyProgressItem } from '../features/session/selectors';

export interface LearningJourneyProps {
  readonly items: readonly JourneyProgressItem[];
  readonly labelledBy?: string;
}

const statusLabel = { complete: '완료', current: '현재', upcoming: '예정' } as const;

export function LearningJourney({ items, labelledBy }: LearningJourneyProps): JSX.Element {
  return (
    <nav {...(labelledBy ? { 'aria-labelledby': labelledBy } : { 'aria-label': '학습 여정' })} className="learning-journey">
      <ol>
        {items.map((item) => (
          <li
            key={item.key}
            aria-current={item.status === 'current' ? 'step' : undefined}
            data-status={item.status}
          >
            <span className="learning-journey__label">{item.label}</span>
            <span className="learning-journey__status">
              {statusLabel[item.status]}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
