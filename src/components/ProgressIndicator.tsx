import type { JSX } from 'react';

import { COPY } from '../content/copy';

export interface ProgressIndicatorProps {
  readonly current: 1 | 2 | 3 | 4 | 5;
  readonly total: 5;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps): JSX.Element {
  return (
    <p
      aria-atomic="true"
      aria-live="off"
      className="progress-indicator"
      role="status"
    >
      {COPY.progressLabel} {current} / {total}
    </p>
  );
}
