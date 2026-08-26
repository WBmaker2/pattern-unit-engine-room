import { getJourney, getMission } from '../../content/missions';
import type { Mission } from '../../content/missions/types';
import { validateContinuation } from '../../domain/pattern/continuation';
import { validateFreeTrack } from '../../domain/pattern/freePattern';
import { validateRepair } from '../../domain/pattern/repair';
import { validateUnitChoice } from '../../domain/pattern/repetition';
import { validateTranslation } from '../../domain/pattern/translation';
import type { PatternValidation } from '../../domain/pattern/types';
import type {
  AccessibilitySettings,
  FeedbackState,
  LearningEvidence,
  SessionAction,
  SessionStage,
  SessionState,
} from './types';

const INITIAL_SETTINGS: AccessibilitySettings = {
  audioEnabled: false,
  motionPreference: 'system',
  patternContrast: 'standard',
  persistenceEnabled: false,
};

export function createInitialSession(): SessionState {
  return {
    stage: 'start',
    journeyIndex: 0,
    feedback: null,
    selectedRepairIndex: null,
    freeUnit: [],
    freeTrack: [],
    evidence: [],
    currentHintUsed: false,
    settings: { ...INITIAL_SETTINGS },
  };
}

function missionForStage(state: SessionState, stage: SessionStage): Mission | null {
  const journey = getJourney(state.journeyIndex);
  const missionId = {
    find: journey.findId,
    continue: journey.continueId,
    repair: journey.repairId,
    translate: journey.translateId,
  }[stage as 'find' | 'continue' | 'repair' | 'translate'];

  return missionId === undefined ? null : getMission(missionId);
}

function feedback(result: PatternValidation, hintVisible = false): FeedbackState {
  return { status: result.ok ? 'success' : 'retry', reason: result.reason, hintVisible };
}

function withEvidence(
  state: SessionState,
  result: PatternValidation,
  evidence: LearningEvidence,
): SessionState {
  if (!result.ok) {
    return { ...state, feedback: feedback(result) };
  }

  const alreadyRecorded = state.evidence.some(
    (item) => item.kind === evidence.kind && item.missionId === evidence.missionId,
  );
  return {
    ...state,
    feedback: feedback(result),
    evidence: alreadyRecorded ? state.evidence : [...state.evidence, evidence],
  };
}

function resetTransient(state: SessionState, stage: SessionStage, journeyIndex = state.journeyIndex): SessionState {
  return {
    ...state,
    stage,
    journeyIndex,
    feedback: null,
    selectedRepairIndex: null,
    freeUnit: [],
    freeTrack: [],
    evidence: [],
    currentHintUsed: false,
  };
}

function submitFind(state: SessionState, candidate: SessionAction & { type: 'SUBMIT_FIND' }): SessionState {
  const mission = missionForStage(state, 'find');
  if (mission?.kind !== 'find') return state;
  const result = validateUnitChoice(mission.sequence, candidate.candidate);
  return withEvidence(state, result, {
    kind: 'unit-recognized',
    missionId: mission.id,
    hintUsed: state.currentHintUsed,
  });
}

function submitContinuation(
  state: SessionState,
  action: SessionAction & { type: 'SUBMIT_CONTINUATION' },
): SessionState {
  const mission = missionForStage(state, 'continue');
  if (mission?.kind !== 'continue') return state;
  const result = validateContinuation(mission.unit, mission.slots, action.answer);
  return withEvidence(state, result, {
    kind: 'continued',
    missionId: mission.id,
    hintUsed: state.currentHintUsed,
  });
}

function submitRepair(state: SessionState, action: SessionAction & { type: 'SUBMIT_REPAIR' }): SessionState {
  const mission = missionForStage(state, 'repair');
  if (mission?.kind !== 'repair') return state;
  if (state.selectedRepairIndex === null) {
    return {
      ...state,
      feedback: { status: 'retry', reason: 'wrong-position', hintVisible: false },
    };
  }
  const result = validateRepair(
    mission.brokenSequence,
    mission.unit,
    state.selectedRepairIndex,
    action.replacement,
  );
  return withEvidence(state, result, {
    kind: 'repaired',
    missionId: mission.id,
    hintUsed: state.currentHintUsed,
  });
}

function submitTranslation(
  state: SessionState,
  action: SessionAction & { type: 'SUBMIT_TRANSLATION' },
): SessionState {
  const mission = missionForStage(state, 'translate');
  if (mission?.kind !== 'translate') return state;
  const result = validateTranslation(mission.sourceSequence, action.pairs, action.translated);
  return withEvidence(state, result, {
    kind: 'translated',
    missionId: mission.id,
    hintUsed: state.currentHintUsed,
  });
}

function submitFreeTrack(state: SessionState): SessionState {
  if (state.stage !== 'create-track') return state;
  const result = validateFreeTrack(state.freeTrack);
  return withEvidence(state, result, {
    kind: 'created',
    missionId: `create-journey-${state.journeyIndex}`,
    hintUsed: state.currentHintUsed,
  });
}

const NEXT_STAGE: Partial<Record<SessionStage, SessionStage>> = {
  find: 'continue',
  continue: 'repair',
  repair: 'translate',
  translate: 'create-unit',
  'create-track': 'summary',
};

function continueStage(state: SessionState): SessionState {
  if (!state.feedback || state.feedback.status !== 'success') return state;
  const next = NEXT_STAGE[state.stage];
  if (next === undefined) return state;
  return {
    ...state,
    stage: next,
    feedback: null,
    selectedRepairIndex: null,
    currentHintUsed: false,
  };
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'START_JOURNEY':
      return state.stage === 'start' ? resetTransient(state, 'find') : state;
    case 'SUBMIT_FIND':
      return state.stage === 'find' ? submitFind(state, action) : state;
    case 'SUBMIT_CONTINUATION':
      return state.stage === 'continue' ? submitContinuation(state, action) : state;
    case 'SELECT_REPAIR_INDEX':
      return state.stage === 'repair' ? { ...state, selectedRepairIndex: action.index } : state;
    case 'SUBMIT_REPAIR':
      return state.stage === 'repair' ? submitRepair(state, action) : state;
    case 'SUBMIT_TRANSLATION':
      return state.stage === 'translate' ? submitTranslation(state, action) : state;
    case 'USE_HINT':
      if (state.stage === 'start' || state.stage === 'create-unit' || state.stage === 'summary') return state;
      return {
        ...state,
        currentHintUsed: true,
        feedback: state.feedback?.status === 'retry' ? { ...state.feedback, hintVisible: true } : state.feedback,
      };
    case 'CONTINUE_STAGE':
      return continueStage(state);
    case 'ADD_FREE_TOKEN':
      return state.stage === 'create-unit' && state.freeUnit.length < 3
        ? { ...state, freeUnit: [...state.freeUnit, action.token] }
        : state;
    case 'REMOVE_FREE_TOKEN':
      return state.stage === 'create-unit' && state.freeUnit.length > 0
        ? { ...state, freeUnit: state.freeUnit.slice(0, -1) }
        : state;
    case 'LOCK_FREE_UNIT':
      if (state.stage !== 'create-unit') return state;
      if (state.freeUnit.length < 2 || state.freeUnit.length > 3) {
        return {
          ...state,
          feedback: { status: 'retry', reason: 'unit-length-out-of-range', hintVisible: false },
        };
      }
      return { ...state, stage: 'create-track', feedback: null, freeTrack: [] };
    case 'APPEND_FREE_UNIT':
      return state.stage === 'create-track'
        ? { ...state, freeTrack: [...state.freeTrack, ...state.freeUnit] }
        : state;
    case 'SUBMIT_FREE_TRACK':
      return submitFreeTrack(state);
    case 'RESET_FREE_PATTERN':
      return state.stage === 'create-track'
        ? {
            ...state,
            stage: 'create-unit',
            feedback: null,
            freeUnit: [],
            freeTrack: [],
            currentHintUsed: false,
          }
        : state;
    case 'NEXT_JOURNEY': {
      if (state.stage !== 'summary') return state;
      const nextIndex = state.journeyIndex === 4 ? 0 : (state.journeyIndex + 1) as 0 | 1 | 2 | 3 | 4;
      return resetTransient(state, 'find', nextIndex);
    }
    case 'RETURN_HOME':
      return resetTransient(state, 'start');
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...action.settings } };
  }
}
