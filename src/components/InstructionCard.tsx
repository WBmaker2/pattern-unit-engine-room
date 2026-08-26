import type { JSX, ReactNode } from 'react';

import { AudioGuideButton } from './AudioGuideButton';
import { getAudioTranscript, type AudioCue } from '../content/audioGuides';
import { COPY } from '../content/copy';

export interface InstructionCardProps {
  readonly children?: ReactNode;
  readonly text?: string;
  readonly title?: string;
  readonly cue?: AudioCue;
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
  cue,
  audioEnabled = false,
}: InstructionCardProps): JSX.Element {
  const transcript = cue === undefined ? undefined : getAudioTranscript(cue);
  const visibleText = transcript !== undefined
    ? transcript
    : hasVisibleContent(children)
    ? children
    : hasVisibleContent(text)
      ? text
      : transcript ?? DEFAULT_INSTRUCTION;

  return (
    <div className="instruction-card">
      {title !== undefined ? <h2>{title}</h2> : null}
      <p>{visibleText}</p>
      {audioEnabled && cue !== undefined ? (
        <>
          <AudioGuideButton cue={cue} />
          <p>{COPY.audioDisclosure}</p>
        </>
      ) : null}
    </div>
  );
}
