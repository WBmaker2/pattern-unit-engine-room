import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react';

export type PulseActionKind = 'find-unit' | 'run';

export interface PrimaryActionProps {
  readonly children: ReactNode;
  readonly onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  readonly disabled?: boolean;
  readonly pulseKind?: PulseActionKind;
}

export function PrimaryAction({
  children,
  onClick,
  disabled = false,
  pulseKind,
}: PrimaryActionProps): JSX.Element {
  const enabled = !disabled;
  const className = ['primary-action', enabled && pulseKind !== undefined ? 'gi-pulse' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      data-primary-action={enabled ? 'true' : undefined}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
