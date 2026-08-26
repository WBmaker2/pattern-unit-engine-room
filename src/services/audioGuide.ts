import { getAudioGuideEntry, type AudioCue } from '../content/audioGuides';

export type AudioPlayResult = 'played' | 'stopped' | 'unavailable';

export interface AudioGuide {
  play(cue: AudioCue): Promise<AudioPlayResult>;
  stop(): AudioPlayResult;
  onEnded?: (listener: () => void) => () => void;
}

type AudioElementFactory = () => HTMLAudioElement;

export function createAudioGuide(createElement: AudioElementFactory = () => new Audio()): AudioGuide {
  let activeAudio: HTMLAudioElement | null = null;
  const endedListeners = new Set<() => void>();

  const onEnded = () => {
    for (const listener of endedListeners) listener();
  };

  const stopAudio = (audio: HTMLAudioElement | null): void => {
    if (audio === null) return;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // A browser can reject media cleanup; stopping is best effort.
    }
  };

  return {
    async play(cue) {
      try {
        const entry = getAudioGuideEntry(cue);
        if (activeAudio === null) {
          activeAudio = createElement();
          activeAudio.addEventListener('ended', onEnded);
        }
        stopAudio(activeAudio);
        activeAudio.src = entry.src;
        await activeAudio.play();
        return 'played';
      } catch {
        return 'unavailable';
      }
    },
    stop() {
      stopAudio(activeAudio);
      return 'stopped';
    },
    onEnded(listener) {
      endedListeners.add(listener);
      return () => endedListeners.delete(listener);
    },
  };
}
