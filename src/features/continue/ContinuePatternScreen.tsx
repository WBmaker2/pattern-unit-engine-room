import { useEffect, useState, type JSX } from 'react';

import { ChoiceGrid } from '../../components/ChoiceGrid';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PatternStrip } from '../../components/PatternStrip';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { PrimaryAction } from '../../components/PrimaryAction';
import { COPY, formatUnitChoice } from '../../content/copy';
import { getTokenVisual } from '../../content/tokenThemes';
import type { ContinueMission } from '../../content/missions/types';
import type { PatternUnit } from '../../domain/pattern/types';
import type { FeedbackState } from '../session/types';

export interface ContinuePatternScreenProps {
  readonly mission: ContinueMission;
  readonly feedback: FeedbackState | null;
  readonly onSubmit: (answer: PatternUnit) => void;
  readonly onContinue: () => void;
  readonly audioEnabled?: boolean;
}

function formatTokenUnit(unit: PatternUnit, themeId: ContinueMission['themeId']): string {
  const labels = unit.map((token) => getTokenVisual(themeId, token).labelKo);
  return formatUnitChoice(labels);
}

function feedbackMessage(feedback: FeedbackState): string {
  if (feedback.status === 'success') return COPY.continueSuccess;
  if (feedback.reason === 'wrong-continuation') return COPY.retryWrongContinuation;
  return COPY.retryDoesNotRepeat;
}

export function ContinuePatternScreen({
  mission,
  feedback,
  onSubmit,
  onContinue,
  audioEnabled = false,
}: ContinuePatternScreenProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = mission.choices.find((choice) => choice.join('') === selectedId);
  const isSuccess = feedback?.status === 'success';

  useEffect(() => {
    setSelectedId(null);
  }, [mission.id]);

  return (
    <section aria-label={COPY.continueTitle} className="continue-screen">
      <InstructionCard title={COPY.continueTitle} cue="continue" audioEnabled={audioEnabled} />
      <ProgressIndicator current={2} total={5} />
      <PatternBoard slots={mission.slots} themeId={mission.themeId} />
      <ChoiceGrid
        label={COPY.continueChoicesLabel}
        choices={mission.choices}
        selectedId={selectedId}
        getId={(choice) => choice.join('')}
        getAccessibleName={(choice) => formatTokenUnit(choice, mission.themeId)}
        onSelect={(choice) => setSelectedId(choice.join(''))}
        renderChoice={(choice) => <PatternStrip slots={choice} themeId={mission.themeId} />}
      />
      {feedback !== null ? (
        <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} />
      ) : null}
      {isSuccess ? (
        <button onClick={onContinue} type="button">
          {COPY.nextRepairStage}
        </button>
      ) : (
        <PrimaryAction
          disabled={selected === undefined}
          onClick={() => {
            if (selected !== undefined) onSubmit(selected);
          }}
        >
          {COPY.continueSubmit}
        </PrimaryAction>
      )}
    </section>
  );
}
