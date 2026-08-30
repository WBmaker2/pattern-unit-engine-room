import type { JSX, ReactNode } from 'react';

export type FeedbackStatus = 'retry' | 'success';

export interface FeedbackPanelProps {
  readonly status?: FeedbackStatus;
  readonly message?: string;
  readonly hint?: ReactNode;
  readonly children?: ReactNode;
  readonly nextActionLabel?: string;
  readonly onNext?: () => void;
}

const defaultMessage: Record<FeedbackStatus, string> = {
  retry: '다시 살펴봐요.',
  success: '잘했어요.',
};

export function FeedbackPanel({
  status,
  message,
  hint,
  children,
  nextActionLabel,
  onNext,
}: FeedbackPanelProps): JSX.Element | null {
  if (status === undefined && message === undefined && children === undefined && hint === undefined) {
    return null;
  }

  const text = message ?? (status === undefined ? undefined : defaultMessage[status]);

  return (
    <section
      aria-atomic="true"
      aria-live="polite"
      className={`feedback-panel feedback-panel--${status ?? 'neutral'}`}
      role="status"
    >
      {status !== undefined ? <h3>{status === 'success' ? '잘했어요' : '다시 해 봐요'}</h3> : null}
      {text !== undefined ? <p>{text}</p> : null}
      {children !== undefined ? <div>{children}</div> : null}
      {hint !== undefined ? <p>{hint}</p> : null}
      {nextActionLabel !== undefined && onNext !== undefined ? <button onClick={onNext} type="button">{nextActionLabel}</button> : null}
    </section>
  );
}
