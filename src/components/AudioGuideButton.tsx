import { useMemo, useState, type JSX } from 'react';

import type { AudioCue } from '../content/audioGuides';
import { createAudioGuide, type AudioGuide } from '../services/audioGuide';

export interface AudioGuideButtonProps {
  readonly cue: AudioCue;
  readonly guide?: AudioGuide;
}

export function AudioGuideButton({ cue, guide: providedGuide }: AudioGuideButtonProps): JSX.Element {
  const defaultGuide = useMemo(() => createAudioGuide(), []);
  const guide = providedGuide ?? defaultGuide;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    if (isPlaying) {
      guide.stop();
      setIsPlaying(false);
      return;
    }
    const result = await guide.play(cue);
    setIsPlaying(result === 'played');
  };

  return (
    <button
      aria-pressed={isPlaying}
      className="audio-guide-button"
      onClick={handleClick}
      type="button"
    >
      {isPlaying ? '안내 멈추기' : '안내 듣기'}
    </button>
  );
}
