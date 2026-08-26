import { useEffect, useState, type JSX } from 'react';

import { ChoiceGrid } from '../../components/ChoiceGrid';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PrimaryAction } from '../../components/PrimaryAction';
import { COPY } from '../../content/copy';
import { getTokenVisual } from '../../content/tokenThemes';
import type { ContinueMission } from '../../content/missions/types';
import type { PatternUnit } from '../../domain/pattern/types';
import type { FeedbackState } from '../session/types';

export interface ContinuePatternScreenProps {
  readonly mission: ContinueMission;
  readonly feedback: FeedbackState | null;
  readonly onSubmit: (answer: PatternUnit) => void;
  readonly onContinue: () => void;
}

const COUNT_WORDS: Record<number, string> = { 1: '한', 2: '두', 3: '세' };

function formatUnit(unit: PatternUnit, themeId: ContinueMission['themeId']): string {
  const labels = unit.map((token) => getTokenVisual(themeId, token).labelKo);
  return `${labels.join(', ')} ${COUNT_WORDS[unit.length] ?? unit.length} 칸`;
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
}: ContinuePatternScreenProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = mission.choices.find((choice) => choice.join('') === selectedId);
  const isSuccess = feedback?.status === 'success';

  useEffect(() => {
    setSelectedId(null);
  }, [mission.id]);

  return (
    <section aria-label={COPY.continueTitle} className="continue-screen">
      <InstructionCard title={COPY.continueTitle} text={COPY.continueInstruction} />
      <PatternBoard slots={mission.slots} themeId={mission.themeId} />
      <ChoiceGrid
        label="다음 칸 선택"
        choices={mission.choices}
        selectedId={selectedId}
        getId={(choice) => choice.join('')}
        getAccessibleName={(choice) => formatUnit(choice, mission.themeId)}
        onSelect={(choice) => setSelectedId(choice.join(''))}
        renderChoice={(choice) => <PatternBoard slots={choice} themeId={mission.themeId} />}
      />
      {feedback !== null ? (
        <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} />
      ) : null}
      {isSuccess ? (
        <PrimaryAction onClick={onContinue}>{COPY.nextStage}</PrimaryAction>
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
