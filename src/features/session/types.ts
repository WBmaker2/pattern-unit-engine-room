import type { JourneyIndex } from '../../content/missions/types';
import type { DisplayTokenId } from '../../content/tokenThemes';
import type {
  PatternTokenId,
  PatternUnit,
  TranslationPair,
  ValidationReason,
} from '../../domain/pattern/types';

export type SessionStage =
  | 'start'
  | 'find'
  | 'continue'
  | 'repair'
  | 'translate'
  | 'create-unit'
  | 'create-track'
  | 'summary';

export type LearningEvidenceKind =
  | 'unit-recognized'
  | 'continued'
  | 'repaired'
  | 'translated'
  | 'created';

export interface LearningEvidence {
  readonly kind: LearningEvidenceKind;
  readonly missionId: string;
  readonly hintUsed: boolean;
}

export interface AccessibilitySettings {
  readonly audioEnabled: boolean;
  readonly motionPreference: 'system' | 'reduce';
  readonly patternContrast: 'standard' | 'strong';
  readonly persistenceEnabled: boolean;
}

export interface FeedbackState {
  readonly status: 'retry' | 'success';
  readonly reason: ValidationReason;
  readonly hintVisible: boolean;
}

export interface SessionState {
  readonly stage: SessionStage;
  readonly journeyIndex: JourneyIndex;
  readonly feedback: FeedbackState | null;
  readonly selectedRepairIndex: number | null;
  readonly freeUnit: PatternTokenId[];
  readonly freeTrack: PatternTokenId[];
  readonly evidence: LearningEvidence[];
  readonly currentHintUsed: boolean;
  readonly settings: AccessibilitySettings;
}

export type SessionAction =
  | { readonly type: 'START_JOURNEY' }
  | { readonly type: 'SUBMIT_FIND'; readonly candidate: PatternUnit }
  | { readonly type: 'SUBMIT_CONTINUATION'; readonly answer: PatternUnit }
  | { readonly type: 'SELECT_REPAIR_INDEX'; readonly index: number }
  | { readonly type: 'SUBMIT_REPAIR'; readonly replacement: PatternTokenId }
  | {
      readonly type: 'SUBMIT_TRANSLATION';
      readonly pairs: readonly TranslationPair<DisplayTokenId>[];
      readonly translated: readonly DisplayTokenId[];
    }
  | { readonly type: 'USE_HINT' }
  | { readonly type: 'CONTINUE_STAGE' }
  | { readonly type: 'ADD_FREE_TOKEN'; readonly token: PatternTokenId }
  | { readonly type: 'REMOVE_FREE_TOKEN' }
  | { readonly type: 'LOCK_FREE_UNIT' }
  | { readonly type: 'APPEND_FREE_UNIT' }
  | { readonly type: 'SUBMIT_FREE_TRACK' }
  | { readonly type: 'RESET_FREE_PATTERN' }
  | { readonly type: 'NEXT_JOURNEY' }
  | { readonly type: 'RETURN_HOME' }
  | { readonly type: 'UPDATE_SETTINGS'; readonly settings: AccessibilitySettings };
