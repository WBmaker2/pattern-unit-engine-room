export type PatternTokenId = 'A' | 'B' | 'C';

export type PatternStructure = 'AB' | 'AAB' | 'ABB' | 'ABC';

export type PatternSlot = PatternTokenId | null;

export type PatternUnit = readonly PatternTokenId[];

export type ValidationReason =
  | 'matches'
  | 'does-not-repeat'
  | 'not-shortest'
  | 'wrong-continuation'
  | 'wrong-position'
  | 'wrong-replacement'
  | 'mapping-not-bijective'
  | 'order-changed'
  | 'needs-second-repeat'
  | 'unit-needs-two-symbols'
  | 'unit-length-out-of-range';

export interface PatternValidation {
  readonly ok: boolean;
  readonly reason: ValidationReason;
  readonly expectedUnit?: PatternUnit;
  readonly expectedTokens?: PatternUnit;
  readonly mismatchIndices?: readonly number[];
}

export interface TranslationPair<TTarget extends string = string> {
  readonly source: PatternTokenId;
  readonly target: TTarget;
}

export interface FreePatternValidation extends PatternValidation {
  readonly repeatCount: number;
}
