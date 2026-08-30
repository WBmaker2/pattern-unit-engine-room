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
  readonly showTranscript?: boolean;
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
  showTranscript = true,
}: InstructionCardProps): JSX.Element | null {
  const transcript = cue === undefined ? undefined : getAudioTranscript(cue);
  const visibleText = transcript !== undefined
    ? transcript
    : hasVisibleContent(children)
    ? children
    : hasVisibleContent(text)
      ? text
      : transcript ?? DEFAULT_INSTRUCTION;
  const hasAudioControl = audioEnabled && cue !== undefined;

  // StageHeader owns the visible instruction. Do not leave an empty card
  // behind when audio is disabled and the transcript is intentionally hidden.
  if (!showTranscript && !hasAudioControl && title === undefined) return null;

  return (
    <div className="instruction-card">
      {title !== undefined ? <h2>{title}</h2> : null}
      {showTranscript ? <p>{visibleText}</p> : null}
      {hasAudioControl ? (
        <>
          <AudioGuideButton cue={cue} />
          <p>{COPY.audioDisclosure}</p>
        </>
      ) : null}
    </div>
  );
}
