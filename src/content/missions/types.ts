import type {
  PatternSlot,
  PatternStructure,
  PatternTokenId,
  PatternUnit,
  TranslationPair,
} from '../../domain/pattern/types';
import type { CopyKey } from '../copy';
import type { DisplayTokenId, TokenThemeId } from '../tokenThemes';

export type MissionKind = 'find' | 'continue' | 'repair' | 'translate';

export interface MissionBase {
  readonly id: string;
  readonly structure: PatternStructure;
  readonly unit: PatternUnit;
  readonly themeId: TokenThemeId;
  readonly instructionKey: CopyKey;
}

export interface FindMission extends MissionBase {
  readonly kind: 'find';
  readonly sequence: PatternUnit;
  readonly candidates: readonly PatternUnit[];
}

export interface ContinueMission extends MissionBase {
  readonly kind: 'continue';
  readonly slots: readonly PatternSlot[];
  readonly choices: readonly PatternUnit[];
}

export interface RepairMission extends MissionBase {
  readonly kind: 'repair';
  readonly brokenSequence: PatternUnit;
  readonly replacementChoices: readonly PatternTokenId[];
}

export interface TranslateMission extends MissionBase {
  readonly kind: 'translate';
  readonly sourceSequence: PatternUnit;
  readonly targetThemeId: TokenThemeId;
  readonly targetPool: readonly DisplayTokenId[];
  readonly correctPairs: readonly TranslationPair<DisplayTokenId>[];
}

export type Mission = FindMission | ContinueMission | RepairMission | TranslateMission;

export type JourneyIndex = 0 | 1 | 2 | 3 | 4;

export interface Journey {
  readonly index: JourneyIndex;
  readonly findId: string;
  readonly continueId: string;
  readonly repairId: string;
  readonly translateId: string;
}

export function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value as Record<string, unknown>)) {
      deepFreeze(child);
    }
    Object.freeze(value);
  }
  return value;
}
