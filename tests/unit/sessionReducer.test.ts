import { describe, expect, it } from 'vitest';

import { getJourney, getMission } from '../../src/content/missions';
import { validateContinuation } from '../../src/domain/pattern/continuation';
import { validateFreeTrack } from '../../src/domain/pattern/freePattern';
import { validateRepair } from '../../src/domain/pattern/repair';
import { validateUnitChoice } from '../../src/domain/pattern/repetition';
import { validateTranslation } from '../../src/domain/pattern/translation';
import {
  createInitialSession,
  sessionReducer,
} from '../../src/features/session/reducer';
import {
  selectCanContinue,
  selectCurrentJourney,
  selectCurrentMission,
} from '../../src/features/session/selectors';
import type { SessionState } from '../../src/features/session/types';

describe('guided learning session reducer', () => {
  it('starts deterministically and excludes score-like fields', () => {
    const state = createInitialSession();
    expect(state).toEqual({
      stage: 'start',
      journeyIndex: 0,
      feedback: null,
      selectedRepairIndex: null,
      freeUnit: [],
      freeTrack: [],
      evidence: [],
      currentHintUsed: false,
      settings: {
        audioEnabled: false,
        motionPreference: 'system',
        patternContrast: 'standard',
        persistenceEnabled: false,
      },
    });
    expect(JSON.stringify(state)).not.toMatch(/attempt|score|streak|rank|speed/i);
  });

  it('advances only after a successful submission', () => {
    let state = sessionReducer(createInitialSession(), { type: 'START_JOURNEY' });
    expect(state.stage).toBe('find');
    state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A'] });
    expect(state.stage).toBe('find');
    expect(state.feedback).toMatchObject({ status: 'retry', reason: 'does-not-repeat' });
    state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A', 'B'] });
    expect(state.feedback).toMatchObject({ status: 'success', reason: 'matches' });
    expect(selectCanContinue(state)).toBe(true);
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    expect(state.stage).toBe('continue');
    expect(state.feedback).toBeNull();
  });

  it('keeps selectors pure and hides missions on non-mission stages', () => {
    const start = createInitialSession();
    expect(selectCurrentJourney(start)).toEqual(getJourney(0));
    expect(selectCurrentMission(start)).toBeNull();
    let state = sessionReducer(start, { type: 'START_JOURNEY' });
    expect(selectCurrentMission(state)).toEqual(getMission('find-ab-engine'));
    state = { ...state, stage: 'create-unit' };
    expect(selectCurrentMission(state)).toBeNull();
    expect(selectCurrentJourney(state)).toEqual(getJourney(0));
  });

  it('completes the first journey and records one evidence per stage', () => {
    let state = sessionReducer(createInitialSession(), { type: 'START_JOURNEY' });
    state = sessionReducer(state, { type: 'USE_HINT' });
    state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A', 'B'] });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    state = sessionReducer(state, { type: 'SUBMIT_CONTINUATION', answer: ['B'] });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    state = sessionReducer(state, { type: 'SELECT_REPAIR_INDEX', index: 4 });
    state = sessionReducer(state, { type: 'SUBMIT_REPAIR', replacement: 'B' });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    state = sessionReducer(state, {
      type: 'SUBMIT_TRANSLATION',
      pairs: [
        { source: 'A', target: 'wheel' },
        { source: 'B', target: 'window' },
        { source: 'C', target: 'train' },
      ],
      translated: ['wheel', 'window', 'train', 'wheel', 'window', 'train'],
    });
    expect(state.evidence).toEqual([
      { kind: 'unit-recognized', missionId: 'find-ab-engine', hintUsed: true },
      { kind: 'continued', missionId: 'continue-aab-tools', hintUsed: false },
      { kind: 'repaired', missionId: 'repair-abb-lamps', hintUsed: false },
      { kind: 'translated', missionId: 'translate-abc-cars', hintUsed: false },
    ]);
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    expect(state.stage).toBe('create-unit');
    state = sessionReducer(state, { type: 'ADD_FREE_TOKEN', token: 'A' });
    state = sessionReducer(state, { type: 'ADD_FREE_TOKEN', token: 'B' });
    state = sessionReducer(state, { type: 'LOCK_FREE_UNIT' });
    expect(state.stage).toBe('create-track');
    state = sessionReducer(state, { type: 'APPEND_FREE_UNIT' });
    state = sessionReducer(state, { type: 'APPEND_FREE_UNIT' });
    state = sessionReducer(state, { type: 'SUBMIT_FREE_TRACK' });
    expect(state.feedback).toMatchObject({ status: 'success', reason: 'matches' });
    expect(state.evidence).toHaveLength(5);
    expect(state.evidence.at(-1)).toEqual({
      kind: 'created',
      missionId: 'create-journey-0',
      hintUsed: false,
    });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    expect(state.stage).toBe('summary');
  });

  it('links every retry to its validator and does not invent repair index', () => {
    let state = sessionReducer(createInitialSession(), { type: 'START_JOURNEY' });
    const find = getMission('find-ab-engine');
    if (find.kind !== 'find') throw new Error('test fixture');
    expect(validateUnitChoice(find.sequence, ['A']).reason).toBe('does-not-repeat');
    state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A'] });
    expect(state.feedback?.reason).toBe('does-not-repeat');
    state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A', 'B'] });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    const continuation = getMission('continue-aab-tools');
    if (continuation.kind !== 'continue') throw new Error('test fixture');
    expect(validateContinuation(continuation.unit, continuation.slots, ['A']).reason).toBe('wrong-continuation');
    state = sessionReducer(state, { type: 'SUBMIT_CONTINUATION', answer: ['A'] });
    expect(state.feedback?.reason).toBe('wrong-continuation');
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    expect(state.stage).toBe('continue');
    state = sessionReducer(state, { type: 'SUBMIT_CONTINUATION', answer: ['B'] });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    expect(state.stage).toBe('repair');
    const before = state;
    state = sessionReducer(state, { type: 'SUBMIT_REPAIR', replacement: 'B' });
    expect(state.feedback?.reason).toBe('wrong-position');
    expect(state).not.toBe(before);
    state = sessionReducer(state, { type: 'SELECT_REPAIR_INDEX', index: 99 });
    state = sessionReducer(state, { type: 'SUBMIT_REPAIR', replacement: 'B' });
    expect(state.feedback?.reason).toBe('wrong-position');
    state = sessionReducer(state, { type: 'SELECT_REPAIR_INDEX', index: 4 });
    state = sessionReducer(state, { type: 'SUBMIT_REPAIR', replacement: 'A' });
    expect(state.feedback?.reason).toBe('wrong-replacement');
    const repair = getMission('repair-abb-lamps');
    if (repair.kind !== 'repair') throw new Error('test fixture');
    expect(validateRepair(repair.brokenSequence, repair.unit, 4, 'A').reason).toBe('wrong-replacement');
    state = sessionReducer(state, { type: 'SUBMIT_REPAIR', replacement: 'B' });
    state = sessionReducer(state, { type: 'CONTINUE_STAGE' });
    expect(state.stage).toBe('translate');
    const translation = getMission('translate-abc-cars');
    if (translation.kind !== 'translate') throw new Error('test fixture');
    const badPairs = [{ source: 'A', target: 'wheel' as const }];
    expect(validateTranslation(translation.sourceSequence, badPairs, []).reason).toBe('mapping-not-bijective');
    state = sessionReducer(state, {
      type: 'SUBMIT_TRANSLATION',
      pairs: badPairs,
      translated: [],
    });
    expect(state.feedback?.reason).toBe('mapping-not-bijective');
  });

  it('shows a hint without recording an attempt and carries it into success', () => {
    let state = sessionReducer(createInitialSession(), { type: 'START_JOURNEY' });
    state = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A'] });
    const retry = sessionReducer(state, { type: 'USE_HINT' });
    expect(retry.feedback).toMatchObject({ status: 'retry', hintVisible: true });
    expect(retry.evidence).toEqual([]);
    state = sessionReducer(retry, { type: 'SUBMIT_FIND', candidate: ['A', 'B'] });
    expect(state.evidence[0]?.hintUsed).toBe(true);
    const duplicate = sessionReducer(state, { type: 'SUBMIT_FIND', candidate: ['A', 'B'] });
    expect(duplicate.evidence).toHaveLength(1);
  });

  it('handles free creation retries, immutable arrays, and validator output', () => {
    let state = sessionReducer(createInitialSession(), { type: 'START_JOURNEY' });
    state = { ...state, stage: 'create-unit' };
    const original = state.freeUnit;
    state = sessionReducer(state, { type: 'ADD_FREE_TOKEN', token: 'A' });
    expect(original).toEqual([]);
    state = sessionReducer(state, { type: 'LOCK_FREE_UNIT' });
    expect(state.feedback?.reason).toBe('unit-length-out-of-range');
    state = sessionReducer(state, { type: 'ADD_FREE_TOKEN', token: 'B' });
    state = sessionReducer(state, { type: 'ADD_FREE_TOKEN', token: 'A' });
    state = sessionReducer(state, { type: 'LOCK_FREE_UNIT' });
    expect(state.stage).toBe('create-track');
    state = sessionReducer(state, { type: 'APPEND_FREE_UNIT' });
    const track = state.freeTrack;
    expect(track).toEqual(['A', 'B', 'A']);
    state = sessionReducer(state, { type: 'SUBMIT_FREE_TRACK' });
    expect(validateFreeTrack(track)).toMatchObject({ reason: 'needs-second-repeat' });
    expect(state.feedback?.reason).toBe('needs-second-repeat');
    state = sessionReducer(state, { type: 'APPEND_FREE_UNIT' });
    state = sessionReducer(state, { type: 'SUBMIT_FREE_TRACK' });
    expect(state.feedback?.status).toBe('success');
  });

  it('supports stage no-ops, journey wrap, and settings/home preservation', () => {
    const initial = createInitialSession();
    expect(sessionReducer(initial, { type: 'CONTINUE_STAGE' })).toBe(initial);
    expect(sessionReducer(initial, { type: 'REMOVE_FREE_TOKEN' })).toBe(initial);
    let state: SessionState = {
      ...initial,
      stage: 'summary',
      journeyIndex: 4,
      evidence: [{ kind: 'created', missionId: 'create-journey-4', hintUsed: true }],
      currentHintUsed: true,
      settings: { ...initial.settings, audioEnabled: true },
    };
    state = sessionReducer(state, { type: 'NEXT_JOURNEY' });
    expect(state).toMatchObject({ stage: 'find', journeyIndex: 0, evidence: [], freeUnit: [], freeTrack: [] });
    expect(state.settings.audioEnabled).toBe(true);
    state = sessionReducer(state, { type: 'RETURN_HOME' });
    expect(state).toMatchObject({ stage: 'start', journeyIndex: 0, evidence: [], currentHintUsed: false });
    expect(state.settings.audioEnabled).toBe(true);
    const updated = sessionReducer(state, {
      type: 'UPDATE_SETTINGS',
      settings: { ...state.settings, motionPreference: 'reduce' },
    });
    expect(updated.stage).toBe('start');
    expect(updated.settings.motionPreference).toBe('reduce');
  });

  it('resets only a free pattern from track mode and preserves journey evidence and settings', () => {
    const initial = createInitialSession();
    const state: SessionState = {
      ...initial,
      stage: 'create-track',
      journeyIndex: 3,
      freeUnit: ['A', 'B'],
      freeTrack: ['A', 'B', 'A'],
      feedback: { status: 'retry', reason: 'needs-second-repeat', hintVisible: false },
      currentHintUsed: true,
      evidence: [{ kind: 'translated', missionId: 'kept', hintUsed: false }],
      settings: { ...initial.settings, audioEnabled: true },
    };
    const reset = sessionReducer(state, { type: 'RESET_FREE_PATTERN' });
    expect(reset).toMatchObject({
      stage: 'create-unit',
      journeyIndex: 3,
      freeUnit: [],
      freeTrack: [],
      feedback: null,
      currentHintUsed: false,
      evidence: state.evidence,
      settings: state.settings,
    });
    const wrongStage = { ...state, stage: 'create-unit' as const };
    expect(sessionReducer(wrongStage, { type: 'RESET_FREE_PATTERN' })).toBe(wrongStage);
  });
});
