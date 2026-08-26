import { useEffect, useMemo, useRef, useState, type JSX } from 'react';

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
  const requestGeneration = useRef(0);

  useEffect(() => {
    requestGeneration.current += 1;
    setIsPlaying(false);
    setUnavailable(false);
    const unsubscribe = guide.onEnded?.(() => setIsPlaying(false));
    return () => {
      requestGeneration.current += 1;
      unsubscribe?.();
      guide.stop();
    };
  }, [cue, guide]);

  const handleClick = async () => {
    if (isPlaying) {
      requestGeneration.current += 1;
      guide.stop();
      setIsPlaying(false);
      return;
    }
    const generation = ++requestGeneration.current;
    const result = await guide.play(cue);
    if (generation !== requestGeneration.current) return;
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
