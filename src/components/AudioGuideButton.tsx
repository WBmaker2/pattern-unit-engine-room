import { useEffect, useMemo, useState, type JSX } from 'react';

import type { AudioCue } from '../content/audioGuides';
import { COPY } from '../content/copy';
import { createAudioGuide, type AudioGuide } from '../services/audioGuide';

export interface AudioGuideButtonProps {
  readonly cue: AudioCue;
  readonly guide?: AudioGuide;
  readonly createElement?: () => HTMLAudioElement;
}

export function AudioGuideButton({
  cue,
  guide: providedGuide,
  createElement,
}: AudioGuideButtonProps): JSX.Element {
  const defaultGuide = useMemo(() => createAudioGuide(createElement), [createElement]);
  const guide = providedGuide ?? defaultGuide;
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setUnavailable(false);
    const unsubscribe = guide.onEnded?.(() => setIsPlaying(false));
    return () => {
      unsubscribe?.();
      guide.stop();
    };
  }, [cue, guide]);

  const handleClick = async () => {
    if (isPlaying) {
      guide.stop();
      setIsPlaying(false);
      return;
    }
    const result = await guide.play(cue);
    setIsPlaying(result === 'played');
    setUnavailable(result === 'unavailable');
  };

  return (
    <>
      <button
        aria-pressed={isPlaying}
        className="icon-button audio-guide-button"
        onClick={handleClick}
        type="button"
      >
        {isPlaying ? COPY.audioStop : COPY.audioListen}
      </button>
      {unavailable ? <p aria-live="polite" role="status">{COPY.audioUnavailable}</p> : null}
    </>
  );
}
