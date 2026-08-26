import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { COPY } from '../../src/content/copy';
import { SummaryScreen } from '../../src/features/summary/SummaryScreen';
import type { LearningEvidence } from '../../src/features/session/types';

const evidence: LearningEvidence[] = [
  { kind: 'created', missionId: 'create', hintUsed: false },
  { kind: 'translated', missionId: 'translate', hintUsed: false },
  { kind: 'repaired', missionId: 'repair', hintUsed: false },
  { kind: 'continued', missionId: 'continue', hintUsed: false },
  { kind: 'unit-recognized', missionId: 'find', hintUsed: true },
];

describe('SummaryScreen', () => {
  afterEach(cleanup);

  it('shows exactly five ordered learning actions without competitive measures', () => {
    render(<SummaryScreen evidence={evidence} journeyIndex={0} onNextJourney={vi.fn()} onReturnHome={vi.fn()} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getByRole('list', { name: COPY.summaryListLabel })).toHaveTextContent(
      `${COPY.evidenceUnit}${COPY.evidenceContinue}${COPY.evidenceRepair}${COPY.evidenceTranslate}${COPY.evidenceCreate}`,
    );
    expect(screen.queryByText(/\d+점|순위|\d+초|연속 정답/)).not.toBeInTheDocument();
    expect(screen.getAllByText(COPY.strategySummary)).toHaveLength(1);
  });

  it('omits missing evidence kinds and exposes one enabled primary next action', () => {
    const onNextJourney = vi.fn();
    render(
      <SummaryScreen
        evidence={[{ kind: 'created', missionId: 'hidden-id', hintUsed: false }]}
        journeyIndex={4}
        onNextJourney={onNextJourney}
        onReturnHome={vi.fn()}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText(COPY.evidenceCreate)).toBeInTheDocument();
    expect(screen.queryByText('hidden-id')).not.toBeInTheDocument();
    const next = screen.getByRole('button', { name: COPY.nextJourney });
    expect(next).toBeEnabled();
    expect(next).not.toHaveClass('gi-pulse');
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(1);
  });
});
