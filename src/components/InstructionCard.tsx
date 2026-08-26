import type { JSX, ReactNode } from 'react';

export interface InstructionCardProps {
  readonly children?: ReactNode;
  readonly text?: string;
  readonly title?: string;
  readonly cue?: string;
  readonly audioEnabled?: boolean;
}

const DEFAULT_INSTRUCTION = '안내를 읽고 차례로 해 보세요.';

function hasVisibleContent(value: ReactNode | undefined): boolean {
  if (value === null || value === undefined || typeof value === 'boolean') {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number' || typeof value === 'bigint') {
    return true;
  }
  if (Array.isArray(value)) {
    return value.some((item) => hasVisibleContent(item));
  }
  return true;
}

export function InstructionCard({
  children,
  text,
  title,
}: InstructionCardProps): JSX.Element {
  const visibleText = hasVisibleContent(children)
    ? children
    : hasVisibleContent(text)
      ? text
      : DEFAULT_INSTRUCTION;

  return (
    <section aria-label={title} className="instruction-card">
      {title !== undefined ? <h2>{title}</h2> : null}
      <p>{visibleText}</p>
    </section>
  );
}
