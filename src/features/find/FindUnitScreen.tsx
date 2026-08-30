import { useEffect, useState, type JSX } from 'react';

import { ChoiceGrid } from '../../components/ChoiceGrid';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PatternStrip } from '../../components/PatternStrip';
import { PrimaryAction } from '../../components/PrimaryAction';
import { StageHeader } from '../../components/StageHeader';
import { ActionRail } from '../../components/ActionRail';
import { COPY, formatFindCandidate } from '../../content/copy';
import { getTokenVisual } from '../../content/tokenThemes';
import type { FindMission } from '../../content/missions/types';
import type { PatternUnit } from '../../domain/pattern/types';
import type { FeedbackState } from '../session/types';

export interface FindUnitScreenProps {
  readonly mission: FindMission;
  readonly feedback: FeedbackState | null;
  readonly hintUsed?: boolean;
  readonly onSubmit: (candidate: PatternUnit) => void;
  readonly onHint: () => void;
  readonly onContinue: () => void;
  readonly audioEnabled?: boolean;
}

function feedbackMessage(feedback: FeedbackState): string {
  if (feedback.status === 'success') return COPY.findSuccess;
  return feedback.reason === 'not-shortest' ? COPY.retryNotShortest : COPY.retryDoesNotRepeat;
}

export function FindUnitScreen({
  mission,
  feedback,
  hintUsed = false,
  onSubmit,
  onHint,
  onContinue,
  audioEnabled = false,
}: FindUnitScreenProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = mission.candidates.find((candidate) => candidate.join('') === selectedId);
  const isSuccess = feedback?.status === 'success';
  const boundaries = mission.sequence
    .map((_, index) => (index % mission.unit.length === 0 ? index : -1))
    .filter((index) => index >= 0);

  useEffect(() => {
    setSelectedId(null);
  }, [mission.id]);

  return (
    <section aria-label={COPY.findTitle} className="find-screen">
      <StageHeader eyebrow="1단계" title={COPY.findTitle} instruction={COPY.findInstruction} current={1} total={5} />
      <InstructionCard cue="find" audioEnabled={audioEnabled} showTranscript={false} />
      <PatternBoard slots={mission.sequence} themeId={mission.themeId} />
      <ChoiceGrid
        label={COPY.findChoicesLabel}
        choices={mission.candidates}
        selectedId={selectedId}
        getId={(candidate) => candidate.join('')}
        getAccessibleName={(candidate) => {
          const index = mission.candidates.indexOf(candidate);
          return formatFindCandidate(index, candidate.map((token) => getTokenVisual(mission.themeId, token).labelKo));
        }}
        onSelect={(candidate) => setSelectedId(candidate.join(''))}
        renderChoice={(candidate) => <PatternStrip slots={candidate} themeId={mission.themeId} />}
      />
      {feedback !== null ? (
        <FeedbackPanel
          status={feedback.status}
          message={feedbackMessage(feedback)}
          hint={feedback.status === 'retry' && feedback.hintVisible ? COPY.hintUnitOutline : undefined}
        >
          {feedback.status === 'success' && hintUsed ? <p>{COPY.strategyUsed}</p> : null}
          {feedback.status === 'retry' && feedback.hintVisible ? (
            <PatternBoard
              slots={mission.sequence}
              themeId={mission.themeId}
              activeIndices={boundaries}
            />
          ) : null}
        </FeedbackPanel>
      ) : null}
      <ActionRail primary={isSuccess ? <PrimaryAction onClick={onContinue}>
          {COPY.nextContinueStage}
        </PrimaryAction> : <PrimaryAction
          disabled={selected === undefined}
          onClick={() => {
            if (selected !== undefined) onSubmit(selected);
          }}
          pulseKind="find-unit"
        >
          {COPY.findSubmit}
        </PrimaryAction>} secondary={feedback?.status === 'retry' && !feedback.hintVisible ? <button onClick={onHint} type="button">{COPY.findHintAction}</button> : undefined} />
    </section>
  );
}
