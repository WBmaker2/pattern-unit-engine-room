import { describe, expect, it, vi } from 'vitest';

import { getJourney } from '../../src/content/missions';
import { createInitialSession, sessionReducer } from '../../src/features/session/reducer';
import type { PersistedProgressV1, SessionState } from '../../src/features/session/types';
import {
  PROGRESS_KEY,
  createProgressStore,
  disablePersistence,
  persistSession,
} from '../../src/services/progressStore';

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    clear: vi.fn(() => values.clear()),
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    key: vi.fn((index: number) => [...values.keys()][index] ?? null),
    removeItem: vi.fn((key: string) => values.delete(key)),
    setItem: vi.fn((key: string, value: string) => values.set(key, value)),
  };
}

function validProgress(overrides: Partial<PersistedProgressV1['snapshot']> = {}): PersistedProgressV1 {
  return {
    version: 1,
    consent: true,
    snapshot: {
      journeyIndex: 0,
      stage: 'continue',
      completedKinds: ['unit-recognized'],
      freeUnit: [],
      freeTrack: [],
      ...overrides,
    },
    settings: {
      audioEnabled: true,
      motionPreference: 'system',
      patternContrast: 'strong',
    },
  };
}

describe('동의 기반 로컬 진행 저장소', () => {
  it('동의를 켜기 전에는 아무것도 저장하지 않는다', () => {
    const storage = createMemoryStorage();
    persistSession(createInitialSession(), createProgressStore(storage));
    expect(storage.getItem(PROGRESS_KEY)).toBeNull();
  });

  it('동의를 켜면 허용된 정확한 키만 새로 저장한다', () => {
    const storage = createMemoryStorage();
    let state = createInitialSession();
    state = sessionReducer(state, { type: 'UPDATE_SETTINGS', settings: { ...state.settings, persistenceEnabled: true } });
    persistSession(state, createProgressStore(storage));
    const saved = JSON.parse(storage.getItem(PROGRESS_KEY) ?? 'null') as Record<string, unknown>;
    expect(saved).toEqual({
      version: 1,
      consent: true,
      snapshot: { journeyIndex: 0, stage: 'start', completedKinds: [], freeUnit: [], freeTrack: [] },
      settings: { audioEnabled: false, motionPreference: 'system', patternContrast: 'standard' },
    });
    expect(Object.keys(saved)).toEqual(['version', 'consent', 'snapshot', 'settings']);
  });

  it('summary는 다음 운행의 start로 저장한다', () => {
    const storage = createMemoryStorage();
    const state: SessionState = {
      ...createInitialSession(),
      stage: 'summary',
      journeyIndex: 4,
      evidence: [
        { kind: 'unit-recognized', missionId: 'x', hintUsed: true },
        { kind: 'continued', missionId: 'x', hintUsed: false },
        { kind: 'repaired', missionId: 'x', hintUsed: false },
        { kind: 'translated', missionId: 'x', hintUsed: false },
        { kind: 'created', missionId: 'x', hintUsed: false },
      ],
      settings: { ...createInitialSession().settings, persistenceEnabled: true },
    };
    persistSession(state, createProgressStore(storage));
    expect(JSON.parse(storage.getItem(PROGRESS_KEY) ?? 'null')).toMatchObject({
      snapshot: { journeyIndex: 0, stage: 'start', completedKinds: [], freeUnit: [], freeTrack: [] },
    });
  });

  it('유효한 저장 상태를 읽고 배열을 복제한다', () => {
    const storage = createMemoryStorage();
    storage.setItem(PROGRESS_KEY, JSON.stringify(validProgress()));
    const loaded = createProgressStore(storage).load();
    expect(loaded).toEqual(validProgress());
    expect(loaded?.snapshot).not.toBe((validProgress()).snapshot);
  });

  it('hydration은 현재 journey의 evidence ID를 복원하고 transient 값을 비운다', () => {
    const progress = validProgress({
      stage: 'create-track',
      completedKinds: ['unit-recognized', 'continued', 'repaired', 'translated'],
      freeUnit: ['A', 'B'],
      freeTrack: ['A', 'B', 'A', 'B'],
    });
    const state = createInitialSession(progress);
    expect(state.stage).toBe('create-track');
    expect(state.evidence).toEqual([
      { kind: 'unit-recognized', missionId: 'find-ab-engine', hintUsed: false },
      { kind: 'continued', missionId: 'continue-aab-tools', hintUsed: false },
      { kind: 'repaired', missionId: 'repair-abb-lamps', hintUsed: false },
      { kind: 'translated', missionId: 'translate-abc-cars', hintUsed: false },
    ]);
    expect(state.feedback).toBeNull();
    expect(state.selectedRepairIndex).toBeNull();
    expect(state.currentHintUsed).toBe(false);
    expect(state.freeUnit).not.toBe(progress.snapshot.freeUnit);
    expect(state.freeTrack).not.toBe(progress.snapshot.freeTrack);
  });

  it('유효한 summary hydration은 다음 journey의 start로 정규화한다', () => {
    const state = createInitialSession(validProgress({
      journeyIndex: 4,
      stage: 'summary',
      completedKinds: ['unit-recognized', 'continued', 'repaired', 'translated', 'created'],
    }));
    expect(state).toMatchObject({ stage: 'start', journeyIndex: 0, evidence: [], freeUnit: [], freeTrack: [] });
    expect(state.settings.persistenceEnabled).toBe(true);
  });

  it('create-track에서 다섯 행동을 마친 저장값은 현재 journey summary로 복원한다', () => {
    const state = createInitialSession(validProgress({
      stage: 'create-track',
      completedKinds: ['unit-recognized', 'continued', 'repaired', 'translated', 'created'],
      freeUnit: ['A', 'B'],
      freeTrack: ['A', 'B', 'A', 'B'],
    }));
    expect(state.stage).toBe('summary');
    expect(state.journeyIndex).toBe(0);
    expect(state.evidence).toEqual([
      { kind: 'unit-recognized', missionId: 'find-ab-engine', hintUsed: false },
      { kind: 'continued', missionId: 'continue-aab-tools', hintUsed: false },
      { kind: 'repaired', missionId: 'repair-abb-lamps', hintUsed: false },
      { kind: 'translated', missionId: 'translate-abc-cars', hintUsed: false },
      { kind: 'created', missionId: 'create-journey-0', hintUsed: false },
    ]);
    expect(state.feedback).toBeNull();
  });

  it.each([
    ['missing top key', { version: 1, consent: true, snapshot: validProgress().snapshot }],
    ['extra top key', { ...validProgress(), extra: true }],
    ['wrong version', { ...validProgress(), version: 2 }],
    ['wrong consent', { ...validProgress(), consent: false }],
    ['extra snapshot key', { ...validProgress(), snapshot: { ...validProgress().snapshot, extra: true } }],
    ['invalid journey', validProgress({ journeyIndex: 9 as never })],
    ['invalid stage', validProgress({ stage: 'find' })],
    ['wrong prefix', validProgress({ completedKinds: ['continued'] })],
    ['duplicate kinds', validProgress({ completedKinds: ['unit-recognized', 'unit-recognized'] })],
    ['invalid token', validProgress({ freeUnit: ['D' as never] })],
    ['too many unit tokens', validProgress({ freeUnit: ['A', 'B', 'C', 'A'] })],
    ['too many track tokens', validProgress({ stage: 'create-track', freeUnit: ['A', 'B'], freeTrack: Array(13).fill('A') })],
  ])('손상된 %s는 해당 키만 지우고 null을 반환한다', (_label, value) => {
    const storage = createMemoryStorage();
    storage.setItem(PROGRESS_KEY, JSON.stringify(value));
    storage.setItem('other', 'keep');
    expect(createProgressStore(storage).load()).toBeNull();
    expect(storage.getItem(PROGRESS_KEY)).toBeNull();
    expect(storage.getItem('other')).toBe('keep');
  });

  it('4096자를 넘는 값과 JSON·Storage 예외를 삼킨다', () => {
    const storage = createMemoryStorage();
    storage.setItem(PROGRESS_KEY, 'x'.repeat(4097));
    expect(createProgressStore(storage).load()).toBeNull();
    const failing = {
      ...storage,
      getItem: vi.fn(() => { throw new Error('blocked'); }),
      removeItem: vi.fn(() => { throw new Error('blocked'); }),
      setItem: vi.fn(() => { throw new Error('blocked'); }),
    } as unknown as Storage;
    expect(() => createProgressStore(failing).load()).not.toThrow();
    expect(() => createProgressStore(failing).save(validProgress())).not.toThrow();
    expect(() => createProgressStore(failing).clear()).not.toThrow();
  });

  it('이어 하기를 끄면 기존 항목을 즉시 지운다', () => {
    const storage = createMemoryStorage();
    storage.setItem(PROGRESS_KEY, JSON.stringify(validProgress()));
    disablePersistence(createProgressStore(storage));
    expect(storage.getItem(PROGRESS_KEY)).toBeNull();
  });

  it('journey 범위는 현재 고정된 다섯 칸과 일치한다', () => {
    expect(getJourney(0).index).toBe(0);
    expect(getJourney(4).index).toBe(4);
  });
});
