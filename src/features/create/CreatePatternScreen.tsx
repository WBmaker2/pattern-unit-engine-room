import type { JSX } from 'react';

import { FeedbackPanel } from '../../components/FeedbackPanel';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PrimaryAction } from '../../components/PrimaryAction';
import { COPY, formatTokenShape } from '../../content/copy';
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
}

const TOKEN_IDS: readonly PatternTokenId[] = ['A', 'B', 'C'];

function feedbackMessage(feedback: FeedbackState): string {
  if (feedback.status === 'success') return COPY.createSuccess;
  if (feedback.reason === 'needs-second-repeat') return COPY.needsSecondRepeat;
  if (feedback.reason === 'unit-needs-two-symbols') return COPY.retryUnitNeedsTwo;
  if (feedback.reason === 'unit-length-out-of-range') return COPY.retryUnitLength;
  return COPY.retryDoesNotRepeat;
}

function Board({ label, tokens }: { readonly label: string; readonly tokens: PatternUnit }): JSX.Element {
  return (
    <section aria-label={label}>
      <PatternBoard slots={tokens} themeId="engine" />
    </section>
  );
}

function UnitMode({ props }: { readonly props: CreatePatternScreenProps }): JSX.Element {
  const { unit, feedback } = props;
  return (
    <>
      <InstructionCard title={COPY.createUnitTitle} cue="create" audioEnabled={props.audioEnabled ?? false} />
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
      <Board label={COPY.freeUnitBoardLabel} tokens={unit} />
      <button disabled={unit.length === 0} onClick={props.onRemoveToken} type="button">
        {COPY.removeFreeToken}
      </button>
      <PrimaryAction disabled={unit.length === 0} onClick={props.onLockUnit}>
        {COPY.lockFreeUnit}
      </PrimaryAction>
      {feedback !== null ? <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} /> : null}
    </>
  );
}

function TrackMode({ props }: { readonly props: CreatePatternScreenProps }): JSX.Element {
  const { feedback, track } = props;
  const isSuccess = feedback?.status === 'success';
  return (
    <>
      <InstructionCard title={COPY.createTrackTitle} cue="create" audioEnabled={props.audioEnabled ?? false} />
      <Board label={COPY.freeUnitBoardLabel} tokens={props.unit} />
      <Board label={COPY.freeTrackBoardLabel} tokens={track} />
      <button onClick={props.onAppendUnit} type="button">
        {COPY.appendFreeUnit}
      </button>
      <button onClick={props.onReset} type="button">
        {COPY.resetFreePattern}
      </button>
      {feedback !== null ? <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} /> : null}
      {isSuccess ? (
        <button onClick={props.onContinue} type="button">{COPY.nextStage}</button>
      ) : (
        <PrimaryAction
          disabled={track.length === 0}
          onClick={props.onRun}
          pulseKind="run"
        >
          {COPY.runFreePattern}
        </PrimaryAction>
      )}
    </>
  );
}

export function CreatePatternScreen(props: CreatePatternScreenProps): JSX.Element {
  return (
    <section aria-label={COPY.createTitle} className="create-screen">
      <h2>{COPY.createTitle}</h2>
      {props.mode === 'unit' ? <UnitMode props={props} /> : <TrackMode props={props} />}
    </section>
  );
}
