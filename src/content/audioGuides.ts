import { COPY, type CopyKey } from './copy';

export type AudioCue = 'start' | 'find' | 'continue' | 'repair' | 'translate' | 'create' | 'complete';

export interface AudioGuideEntry {
  readonly cue: AudioCue;
  readonly src: string;
  readonly transcriptKey: CopyKey;
}

const configuredBase = import.meta.env.BASE_URL;

export function buildAudioSrc(base: string, cue: AudioCue): string {
  const safeBase = /^(?:\.\/|\.\.\/|\/(?!\/))/.test(base) ? base : './';
  const normalizedBase = safeBase.replace(/\/+$/, '');
  return `${normalizedBase}/audio/ko/${cue}.mp3`;
}

function createEntry(cue: AudioCue, transcriptKey: CopyKey): AudioGuideEntry {
  return Object.freeze({ cue, src: buildAudioSrc(configuredBase, cue), transcriptKey });
}

export const AUDIO_GUIDES: Readonly<Record<AudioCue, AudioGuideEntry>> = Object.freeze({
  start: createEntry('start', 'startTitle'),
  find: createEntry('find', 'findInstruction'),
  continue: createEntry('continue', 'continueInstruction'),
  repair: createEntry('repair', 'repairInstruction'),
  translate: createEntry('translate', 'translateInstruction'),
  create: createEntry('create', 'createInstruction'),
  complete: createEntry('complete', 'complete'),
});

export function getAudioGuideEntry(cue: AudioCue | string): AudioGuideEntry {
  if (typeof cue !== 'string' || !Object.hasOwn(AUDIO_GUIDES, cue)) {
    throw new Error(`Unknown audio cue: ${String(cue)}`);
  }
  return AUDIO_GUIDES[cue as AudioCue];
}

export function getAudioTranscript(cue: AudioCue): string {
  return COPY[getAudioGuideEntry(cue).transcriptKey];
}
