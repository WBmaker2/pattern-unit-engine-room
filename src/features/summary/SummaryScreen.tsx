import type { JSX } from 'react';

import { PrimaryAction } from '../../components/PrimaryAction';
import { InstructionCard } from '../../components/InstructionCard';
import { COPY } from '../../content/copy';
import type { LearningEvidence } from '../session/types';

export interface SummaryScreenProps {
  readonly evidence: readonly LearningEvidence[];
  readonly journeyIndex: number;
  readonly onNextJourney: () => void;
  readonly onReturnHome: () => void;
  readonly audioEnabled?: boolean;
}

const EVIDENCE_ORDER = [
  'unit-recognized',
  'continued',
  'repaired',
  'translated',
  'created',
] as const;

const EVIDENCE_COPY: Record<(typeof EVIDENCE_ORDER)[number], string> = {
  'unit-recognized': COPY.evidenceUnit,
  continued: COPY.evidenceContinue,
  repaired: COPY.evidenceRepair,
  translated: COPY.evidenceTranslate,
  created: COPY.evidenceCreate,
};

export function SummaryScreen({
  evidence,
  onNextJourney,
  onReturnHome,
  audioEnabled = false,
}: SummaryScreenProps): JSX.Element {
  const completedKinds = new Set(evidence.map((item) => item.kind));
  const hasHint = evidence.some((item) => item.hintUsed);

  return (
    <section aria-label={COPY.summaryTitle} className="summary-screen">
      <InstructionCard title={COPY.summaryTitle} cue="complete" audioEnabled={audioEnabled} />
      <ul aria-label={COPY.summaryListLabel}>
        {EVIDENCE_ORDER.filter((kind) => completedKinds.has(kind)).map((kind) => (
          <li key={kind}>{EVIDENCE_COPY[kind]}</li>
        ))}
      </ul>
      {hasHint ? <p>{COPY.strategySummary}</p> : null}
      <PrimaryAction onClick={onNextJourney}>{COPY.nextJourney}</PrimaryAction>
      <button onClick={onReturnHome} type="button">{COPY.returnHome}</button>
    </section>
  );
}
