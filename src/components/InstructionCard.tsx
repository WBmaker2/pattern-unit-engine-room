import type { JSX, ReactNode } from 'react';

export interface InstructionCardProps {
  readonly children?: ReactNode;
  readonly text?: string;
  readonly title?: string;
  readonly cue?: string;
  readonly audioEnabled?: boolean;
}

export function InstructionCard({
  children,
  text,
  title,
}: InstructionCardProps): JSX.Element {
  const visibleText = children ?? text ?? '안내를 읽고 차례로 해 보세요.';

  return (
    <section aria-label={title} className="instruction-card">
      {title !== undefined ? <h2>{title}</h2> : null}
      <p>{visibleText}</p>
    </section>
  );
}
