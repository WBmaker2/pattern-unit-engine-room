import { COPY, type CopyKey } from './copy';

export type AudioCue = 'start' | 'find' | 'continue' | 'repair' | 'translate' | 'create' | 'complete';

export interface AudioGuideEntry {
  readonly cue: AudioCue;
  readonly src: string;
  readonly transcriptKey: CopyKey;
}

const AUDIO_ROOT = `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}audio/ko/`;

export const AUDIO_GUIDES: Readonly<Record<AudioCue, AudioGuideEntry>> = Object.freeze({
  start: { cue: 'start', src: `${AUDIO_ROOT}start.mp3`, transcriptKey: 'startTitle' },
  find: { cue: 'find', src: `${AUDIO_ROOT}find.mp3`, transcriptKey: 'findInstruction' },
  continue: {
    cue: 'continue',
    src: `${AUDIO_ROOT}continue.mp3`,
    transcriptKey: 'continueInstruction',
  },
  repair: { cue: 'repair', src: `${AUDIO_ROOT}repair.mp3`, transcriptKey: 'repairInstruction' },
  translate: {
    cue: 'translate',
    src: `${AUDIO_ROOT}translate.mp3`,
    transcriptKey: 'translateInstruction',
  },
  create: { cue: 'create', src: `${AUDIO_ROOT}create.mp3`, transcriptKey: 'createInstruction' },
  complete: { cue: 'complete', src: `${AUDIO_ROOT}complete.mp3`, transcriptKey: 'complete' },
});

export function getAudioTranscript(cue: AudioCue): string {
  return COPY[AUDIO_GUIDES[cue].transcriptKey];
}
