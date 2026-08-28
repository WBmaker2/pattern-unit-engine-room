import { validateFreeTrack } from '../domain/pattern/freePattern';
import type { PatternTokenId } from '../domain/pattern/types';
import type {
  LearningEvidenceKind,
  PersistedProgressV1,
  ProgressStore,
  SessionStage,
  SessionState,
} from '../features/session/types';

export const PROGRESS_KEY = 'pattern-unit-engine-room:v1';
const MAX_STORAGE_CHARS = 4096;
const JOURNEY_INDICES = [0, 1, 2, 3, 4] as const;
const TOKEN_IDS = ['A', 'B', 'C'] as const;
const STAGES = [
  'start', 'find', 'continue', 'repair', 'translate', 'create-unit', 'create-track', 'summary',
] as const;
const EVIDENCE_ORDER = [
  'unit-recognized', 'continued', 'repaired', 'translated', 'created',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype;
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === keys.length && keys.every((key) => Object.prototype.hasOwnProperty.call(value, key));
}

function isToken(value: unknown): value is PatternTokenId {
  return typeof value === 'string' && (TOKEN_IDS as readonly string[]).includes(value);
}

function isTokenArray(value: unknown, maxLength: number): value is PatternTokenId[] {
  return Array.isArray(value) && value.length <= maxLength && value.every(isToken);
}

function isEvidenceKind(value: unknown): value is LearningEvidenceKind {
  return typeof value === 'string' && (EVIDENCE_ORDER as readonly string[]).includes(value);
}

function expectedKinds(stage: SessionStage): readonly LearningEvidenceKind[] {
  switch (stage) {
    case 'start':
    case 'find': return [];
    case 'continue': return ['unit-recognized'];
    case 'repair': return ['unit-recognized', 'continued'];
    case 'translate': return ['unit-recognized', 'continued', 'repaired'];
    case 'create-unit': return ['unit-recognized', 'continued', 'repaired', 'translated'];
    case 'create-track': return ['unit-recognized', 'continued', 'repaired', 'translated'];
    case 'summary': return EVIDENCE_ORDER;
  }
}

function isAllowedKinds(stage: SessionStage, value: unknown): value is LearningEvidenceKind[] {
  if (!Array.isArray(value) || !value.every(isEvidenceKind)) return false;
  if (new Set(value).size !== value.length) return false;
  const required = expectedKinds(stage);
  const isPrefix = required.length === value.length && required.every((kind, index) => value[index] === kind);
  if (isPrefix) return true;
  return stage === 'create-track'
    && value.length === EVIDENCE_ORDER.length
    && EVIDENCE_ORDER.every((kind, index) => value[index] === kind);
}

function isRepeatingUnit(track: readonly PatternTokenId[], unit: readonly PatternTokenId[]): boolean {
  return track.every((token, index) => token === unit[index % unit.length]);
}

function validSnapshot(value: unknown): value is PersistedProgressV1['snapshot'] {
  if (!isRecord(value) || !hasExactKeys(value, ['journeyIndex', 'stage', 'completedKinds', 'freeUnit', 'freeTrack'])) {
    return false;
  }
  const journeyIndex = value.journeyIndex;
  const stage = value.stage;
  if (!(JOURNEY_INDICES as readonly unknown[]).includes(journeyIndex) || !(STAGES as readonly unknown[]).includes(stage)) {
    return false;
  }
  if (!isAllowedKinds(stage as SessionStage, value.completedKinds)) return false;
  if (!isTokenArray(value.freeUnit, 3) || !isTokenArray(value.freeTrack, 12)) return false;

  if (stage !== 'create-unit' && stage !== 'create-track' && (value.freeUnit.length !== 0 || value.freeTrack.length !== 0)) {
    return false;
  }
  if (stage === 'create-unit' && value.freeTrack.length !== 0) return false;
  if (stage !== 'create-track') return true;
  if (value.freeUnit.length < 2 || value.freeUnit.length > 3) return false;
  if (value.freeTrack.length % value.freeUnit.length !== 0) return false;
  if (!isRepeatingUnit(value.freeTrack, value.freeUnit)) return false;
  const hasCreated = value.completedKinds.length === EVIDENCE_ORDER.length;
  return !hasCreated || validateFreeTrack(value.freeTrack).ok;
}

function normalizeSnapshot(snapshot: PersistedProgressV1['snapshot']): PersistedProgressV1['snapshot'] {
  if (snapshot.stage !== 'summary') {
    return {
      journeyIndex: snapshot.journeyIndex,
      stage: snapshot.stage,
      completedKinds: [...snapshot.completedKinds],
      freeUnit: [...snapshot.freeUnit],
      freeTrack: [...snapshot.freeTrack],
    };
  }
  const journeyIndex = snapshot.journeyIndex === 4 ? 0 : (snapshot.journeyIndex + 1) as 0 | 1 | 2 | 3 | 4;
  return { journeyIndex, stage: 'start', completedKinds: [], freeUnit: [], freeTrack: [] };
}

function parseProgress(raw: string): PersistedProgressV1 | null {
  if (raw.length > MAX_STORAGE_CHARS) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !hasExactKeys(parsed, ['version', 'consent', 'snapshot', 'settings'])) return null;
    if (parsed.version !== 1 || parsed.consent !== true || !validSnapshot(parsed.snapshot)) return null;
    const settings = parsed.settings;
    if (!isRecord(settings) || !hasExactKeys(settings, ['audioEnabled', 'motionPreference', 'patternContrast'])) return null;
    if (typeof settings.audioEnabled !== 'boolean') return null;
    if (settings.motionPreference !== 'system' && settings.motionPreference !== 'reduce') return null;
    if (settings.patternContrast !== 'standard' && settings.patternContrast !== 'strong') return null;
    return {
      version: 1,
      consent: true,
      snapshot: normalizeSnapshot(parsed.snapshot),
      settings: {
        audioEnabled: settings.audioEnabled,
        motionPreference: settings.motionPreference,
        patternContrast: settings.patternContrast,
      },
    };
  } catch {
    return null;
  }
}

export function createProgressStore(storage: Storage): ProgressStore {
  const clear = (): boolean => {
    try {
      storage.removeItem(PROGRESS_KEY);
      return storage.getItem(PROGRESS_KEY) === null;
    } catch {
      // Storage can be unavailable or full; learning remains usable.
      return false;
    }
  };

  return {
    load(): PersistedProgressV1 | null {
      let raw: string | null;
      try {
        raw = storage.getItem(PROGRESS_KEY);
      } catch {
        return null;
      }
      if (raw === null) return null;
      const progress = parseProgress(raw);
      if (progress === null) clear();
      return progress;
    },
    save(value: PersistedProgressV1): void {
      try {
        const serialized = JSON.stringify(value);
        if (serialized.length <= MAX_STORAGE_CHARS) storage.setItem(PROGRESS_KEY, serialized);
      } catch {
        // Storage and serialization failures must not interrupt the lesson.
      }
    },
    clear,
  };
}

function savedKinds(state: SessionState): LearningEvidenceKind[] {
  const kinds = new Set(state.evidence.map((item) => item.kind));
  if (state.stage === 'create-track' && EVIDENCE_ORDER.every((kind) => kinds.has(kind))) {
    return [...EVIDENCE_ORDER];
  }
  const required = expectedKinds(state.stage);
  if (state.stage === 'summary') return [...EVIDENCE_ORDER];
  return EVIDENCE_ORDER.filter((kind) => required.includes(kind) && kinds.has(kind));
}

function snapshotForState(state: SessionState): PersistedProgressV1['snapshot'] {
  if (state.stage === 'summary') {
    const journeyIndex = state.journeyIndex === 4 ? 0 : (state.journeyIndex + 1) as 0 | 1 | 2 | 3 | 4;
    return { journeyIndex, stage: 'start', completedKinds: [], freeUnit: [], freeTrack: [] };
  }
  return {
    journeyIndex: state.journeyIndex,
    stage: state.stage,
    completedKinds: savedKinds(state),
    freeUnit: state.stage === 'create-unit' || state.stage === 'create-track' ? [...state.freeUnit] : [],
    freeTrack: state.stage === 'create-track' ? [...state.freeTrack] : [],
  };
}

export function persistSession(state: SessionState, store: ProgressStore): void {
  if (!state.settings.persistenceEnabled) return;
  const snapshot = snapshotForState(state);
  const settings = {
    audioEnabled: state.settings.audioEnabled,
    motionPreference: state.settings.motionPreference,
    patternContrast: state.settings.patternContrast,
  };
  store.save({ version: 1, consent: true, snapshot, settings });
}

export function disablePersistence(store: ProgressStore): boolean {
  return store.clear();
}
