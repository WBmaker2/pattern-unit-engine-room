import { AUDIO_GUIDES, type AudioCue } from '../content/audioGuides';

export type AudioPlayResult = 'played' | 'stopped' | 'unavailable';

export interface AudioGuide {
  play(cue: AudioCue): Promise<AudioPlayResult>;
  stop(): AudioPlayResult;
}

type AudioElementFactory = () => HTMLAudioElement;

export function createAudioGuide(createElement: AudioElementFactory = () => new Audio()): AudioGuide {
  let activeAudio: HTMLAudioElement | null = null;

  return {
    async play(cue) {
      const audio = createElement();
      activeAudio?.pause();
      activeAudio = audio;
      audio.pause();
      audio.currentTime = 0;
      audio.src = AUDIO_GUIDES[cue].src;

      try {
        await audio.play();
        return 'played';
      } catch {
        return 'unavailable';
      }
    },
    stop() {
      if (activeAudio !== null) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
      }
      return 'stopped';
    },
  };
}
