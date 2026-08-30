import { useEffect, useState, type JSX } from 'react';

import { ChoiceGrid } from '../../components/ChoiceGrid';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PatternStrip } from '../../components/PatternStrip';
import { PrimaryAction } from '../../components/PrimaryAction';
import { StageHeader } from '../../components/StageHeader';
import { ActionRail } from '../../components/ActionRail';
import { COPY, formatTokenShape } from '../../content/copy';
import { getTokenVisual } from '../../content/tokenThemes';
import type { RepairMission } from '../../content/missions/types';
import type { PatternTokenId } from '../../domain/pattern/types';
import type { FeedbackState } from '../session/types';

export interface RepairPatternScreenProps {
  readonly mission: RepairMission;
  readonly selectedIndex: number | null;
  readonly feedback: FeedbackState | null;
  readonly onSelectIndex: (index: number) => void;
  readonly onSubmit: (replacement: PatternTokenId) => void;
  readonly onContinue: () => void;
  readonly audioEnabled?: boolean;
}

function feedbackMessage(feedback: FeedbackState): string {
  if (feedback.status === 'success') return COPY.repairSuccess;
  if (feedback.reason === 'wrong-position') return COPY.retryWrongPosition;
  if (feedback.reason === 'wrong-replacement') return COPY.retryWrongReplacement;
  return COPY.retryDoesNotRepeat;
}

export function RepairPatternScreen({
  mission,
  selectedIndex,
  feedback,
  onSelectIndex,
  onSubmit,
  onContinue,
  audioEnabled = false,
}: RepairPatternScreenProps): JSX.Element {
  const [replacement, setReplacement] = useState<PatternTokenId | null>(null);
  const isSuccess = feedback?.status === 'success';
  const boundaryIndices = mission.brokenSequence
    .map((_, index) => (index % mission.unit.length === 0 ? index : -1))
    .filter((index) => index >= 0);

  useEffect(() => {
    setReplacement(null);
  }, [mission.id, selectedIndex]);

  return (
    <section aria-label={COPY.repairTitle} className="repair-screen">
      <StageHeader eyebrow="3단계" title={COPY.repairTitle} instruction={COPY.repairInstruction} current={3} total={5} />
      <InstructionCard cue="repair" audioEnabled={audioEnabled} showTranscript={false} />
      <PatternBoard
        slots={mission.brokenSequence}
        themeId={mission.themeId}
        onSelect={onSelectIndex}
        selectedIndex={selectedIndex}
        activeIndices={feedback?.status === 'retry' && feedback.reason === 'wrong-position' ? boundaryIndices : []}
      />
      {selectedIndex !== null ? (
        <ChoiceGrid
          label={COPY.repairChoicesLabel}
          choices={mission.replacementChoices}
          selectedId={replacement}
          getId={(choice) => choice}
          getAccessibleName={(choice) => formatTokenShape(getTokenVisual(mission.themeId, choice).labelKo)}
          onSelect={setReplacement}
          renderChoice={(choice) => <PatternStrip slots={[choice]} themeId={mission.themeId} />}
        />
      ) : null}
      {feedback !== null ? (
        <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} />
      ) : null}
      <ActionRail primary={isSuccess ? <PrimaryAction onClick={onContinue}>{COPY.nextTranslateStage}</PrimaryAction> : <PrimaryAction
          disabled={selectedIndex === null || replacement === null}
          onClick={() => {
            if (replacement !== null) onSubmit(replacement);
          }}
        >
          {COPY.repairSubmit}
        </PrimaryAction>} />
    </section>
  );
}
