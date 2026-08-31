import type { JSX } from 'react';

import { FeedbackPanel } from '../../components/FeedbackPanel';
import { AnimatedPatternTrack } from '../../components/AnimatedPatternTrack';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PrimaryAction } from '../../components/PrimaryAction';
import { StageHeader } from '../../components/StageHeader';
import { ActionRail } from '../../components/ActionRail';
import { COPY, formatTokenShape, formatTrackProgress } from '../../content/copy';
import { getTokenVisual } from '../../content/tokenThemes';
import type { PatternTokenId, PatternUnit } from '../../domain/pattern/types';
import type { FeedbackState } from '../session/types';

export interface CreatePatternScreenProps {
  readonly mode: 'unit' | 'track';
  readonly unit: PatternUnit;
  readonly track: PatternUnit;
  readonly feedback: FeedbackState | null;
  readonly onAddToken: (token: PatternTokenId) => void;
  readonly onRemoveToken: () => void;
  readonly onLockUnit: () => void;
  readonly onAppendUnit: () => void;
  readonly onReset: () => void;
  readonly onRun: () => void;
  readonly onContinue: () => void;
  readonly audioEnabled?: boolean;
  readonly reducedMotion: boolean;
  readonly maxTrackTokens: number;
}

const TOKEN_IDS: readonly PatternTokenId[] = ['A', 'B', 'C'];

function feedbackMessage(feedback: FeedbackState): string {
  if (feedback.status === 'success') return COPY.createSuccess;
  if (feedback.reason === 'needs-second-repeat') return COPY.needsSecondRepeat;
  if (feedback.reason === 'unit-needs-two-symbols') return COPY.retryUnitNeedsTwo;
  if (feedback.reason === 'unit-length-out-of-range') return COPY.retryUnitLength;
  return COPY.retryDoesNotRepeat;
}

function Board({ label, tokens, emptyHint }: {
  readonly label: string;
  readonly tokens: PatternUnit;
  readonly emptyHint?: string;
}): JSX.Element {
  return (
    <section aria-label={label}>
      {tokens.length === 0 && emptyHint ? <p className="pattern-board__empty-hint">{emptyHint}</p> : null}
      <PatternBoard slots={tokens} themeId="engine" />
    </section>
  );
}

function UnitMode({ props }: { readonly props: CreatePatternScreenProps }): JSX.Element {
  const { unit, feedback } = props;
  return (
    <>
      <InstructionCard title={COPY.createUnitTitle} cue="create" audioEnabled={props.audioEnabled ?? false} showTranscript={false} />
      <fieldset>
        <legend>{COPY.createTokenChoices}</legend>
        {TOKEN_IDS.map((token) => (
          <button
            aria-label={formatTokenShape(getTokenVisual('engine', token).labelKo)}
            key={token}
            onClick={() => props.onAddToken(token)}
            type="button"
          >
            {formatTokenShape(getTokenVisual('engine', token).labelKo)}
          </button>
        ))}
      </fieldset>
      <Board emptyHint={COPY.freeUnitEmptyHint} label={COPY.freeUnitBoardLabel} tokens={unit} />
      <button disabled={unit.length === 0} onClick={props.onRemoveToken} type="button">
        {COPY.removeFreeToken}
      </button>
      <ActionRail primary={<PrimaryAction disabled={unit.length === 0} onClick={props.onLockUnit}>{COPY.lockFreeUnit}</PrimaryAction>} />
      {feedback !== null ? <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} /> : null}
    </>
  );
}

function TrackMode({ props }: { readonly props: CreatePatternScreenProps }): JSX.Element {
  const { feedback, track } = props;
  const isSuccess = feedback?.status === 'success';
  const canAppendUnit = track.length + props.unit.length <= props.maxTrackTokens;
  return (
    <>
      <InstructionCard title={COPY.createTrackTitle} cue="create" audioEnabled={props.audioEnabled ?? false} showTranscript={false} />
      <Board label={COPY.freeUnitBoardLabel} tokens={props.unit} />
      <AnimatedPatternTrack
        isRunning={isSuccess}
        label={COPY.freeTrackBoardLabel}
        reducedMotion={props.reducedMotion}
        slots={track}
        themeId="engine"
      />
      <p aria-label={formatTrackProgress(track.length, props.maxTrackTokens)} className="create-track__progress">
        {formatTrackProgress(track.length, props.maxTrackTokens)}
      </p>
      {!canAppendUnit ? <p role="status">{COPY.freeTrackLimit}</p> : null}
      <ActionRail
        primary={isSuccess ? <PrimaryAction onClick={props.onContinue}>{COPY.summaryTitle} 보기</PrimaryAction> : <PrimaryAction disabled={track.length === 0} onClick={props.onRun} pulseKind="run">{COPY.runFreePattern}</PrimaryAction>}
        secondary={<><button disabled={!canAppendUnit} onClick={props.onAppendUnit} type="button">{COPY.appendFreeUnit}</button><button onClick={props.onReset} type="button">{COPY.resetFreePattern}</button></>}
      />
      {feedback !== null ? <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} /> : null}
    </>
  );
}

export function CreatePatternScreen(props: CreatePatternScreenProps): JSX.Element {
  return (
    <section aria-label={COPY.createTitle} className="create-screen">
      <StageHeader
        eyebrow="5단계"
        title={COPY.createTitle}
        instruction={props.mode === 'track' ? COPY.createTrackInstruction : COPY.createInstruction}
        current={5}
        total={5}
      />
      {props.mode === 'unit' ? <UnitMode props={props} /> : <TrackMode props={props} />}
    </section>
  );
}
