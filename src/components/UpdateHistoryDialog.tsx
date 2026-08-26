import { useEffect, useRef, type JSX, type KeyboardEvent } from 'react';

import { UPDATE_HISTORY_COPY, type UpdateHistoryEntry } from '../content/updateHistory';

export interface UpdateHistoryDialogProps {
  readonly open: boolean;
  readonly entries: readonly UpdateHistoryEntry[];
  readonly onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function UpdateHistoryDialog({
  open,
  entries,
  onClose,
}: UpdateHistoryDialogProps): JSX.Element | null {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    if (event.shiftKey && (document.activeElement === dialog || document.activeElement === first)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
      event.preventDefault();
      if (document.activeElement === dialog) {
        first.focus();
      } else {
        dialog.focus();
      }
    }
  };

  return (
    <div className="update-history-modal" role="presentation">
      <div
        ref={dialogRef}
        aria-labelledby="update-history-title"
        aria-modal="true"
        className="update-history-dialog"
        onKeyDown={handleKeyDown}
        role="dialog"
        tabIndex={-1}
      >
        <h2 id="update-history-title">{UPDATE_HISTORY_COPY.title}</h2>
        <ol className="update-history-list">
          {entries.map((entry) => (
            <li className="update-history-entry" key={`${entry.date}-${entry.kind}-${entry.summary}`}>
              <time dateTime={entry.date}>{entry.date}</time>
              <span className="update-history-entry__kind">{entry.kind}</span>
              <p>{entry.summary}</p>
            </li>
          ))}
        </ol>
        <button onClick={onClose} type="button">{UPDATE_HISTORY_COPY.close}</button>
      </div>
    </div>
  );
}
