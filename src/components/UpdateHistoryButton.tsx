import { forwardRef, type JSX } from 'react';

import { UPDATE_HISTORY_COPY } from '../content/updateHistory';

export interface UpdateHistoryButtonProps {
  readonly open?: boolean;
  readonly onClick: () => void;
  readonly tabIndex?: number;
}

export const UpdateHistoryButton = forwardRef<HTMLButtonElement, UpdateHistoryButtonProps>(
  function UpdateHistoryButton({ open = false, onClick, tabIndex }, ref): JSX.Element {
    return (
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="update-history-button"
        onClick={onClick}
        ref={ref}
        tabIndex={tabIndex}
        type="button"
      >
        {UPDATE_HISTORY_COPY.button}
      </button>
    );
  },
);
