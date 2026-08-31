import { useEffect, useMemo, useState, type JSX } from 'react';

import { ChoiceGrid } from '../../components/ChoiceGrid';
import { formatOrdinal } from '../../components/PatternBoard';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { InstructionCard } from '../../components/InstructionCard';
import { PatternBoard } from '../../components/PatternBoard';
import { PrimaryAction } from '../../components/PrimaryAction';
import { StageHeader } from '../../components/StageHeader';
import { ActionRail } from '../../components/ActionRail';
import { TokenIcon } from '../../components/TokenIcon';
import {
  COPY,
  formatOriginalToken,
  formatTokenShape,
  formatTranslationProgress,
} from '../../content/copy';
import {
  getTokenVisual,
  getDisplayTokenVisual,
  type DisplayTokenId,
} from '../../content/tokenThemes';
import type { TranslateMission } from '../../content/missions/types';
import type { PatternTokenId, TranslationPair } from '../../domain/pattern/types';
import type { FeedbackState } from '../session/types';

export interface TranslatePatternScreenProps {
  readonly mission: TranslateMission;
  readonly draftPairs: readonly TranslationPair<DisplayTokenId>[];
  readonly feedback: FeedbackState | null;
  readonly onChangePair: (source: PatternTokenId, target: DisplayTokenId) => void;
  readonly onSubmit: (
    pairs: readonly TranslationPair<DisplayTokenId>[],
    translated: readonly DisplayTokenId[],
  ) => void;
  readonly onContinue: () => void;
  readonly audioEnabled?: boolean;
}

function feedbackMessage(feedback: FeedbackState): string {
  if (feedback.status === 'success') return COPY.translateSuccess;
  if (feedback.reason === 'mapping-not-bijective') {
    return COPY.retryMappingNotBijective;
  }
  if (feedback.reason === 'order-changed') return COPY.retryOrderChanged;
  return COPY.retryMissingMapping;
}

function uniqueTokens(sequence: readonly PatternTokenId[]): PatternTokenId[] {
  return [...new Set(sequence)];
}

export function TranslatePatternScreen({
  mission,
  draftPairs,
  feedback,
  onChangePair,
  onSubmit,
  onContinue,
  audioEnabled = false,
}: TranslatePatternScreenProps): JSX.Element {
  const [selectedSource, setSelectedSource] = useState<PatternTokenId | null>(null);
  const sourceTokens = useMemo(() => uniqueTokens(mission.sourceSequence), [mission.sourceSequence]);
  const mappingComplete = draftPairs.length === sourceTokens.length;
  const translated = mappingComplete
    ? mission.sourceSequence.map((source) => draftPairs.find((pair) => pair.source === source)?.target)
    : [];
  const translatedComplete = mappingComplete && translated.length > 0 && translated.every(
    (target): target is DisplayTokenId => target !== undefined,
  );
  const isSuccess = feedback?.status === 'success';

  useEffect(() => {
    setSelectedSource(null);
  }, [mission.id]);

  return (
    <section aria-label={COPY.translateTitle} className="translate-screen">
      <StageHeader eyebrow="4단계" title={COPY.translateTitle} instruction={COPY.translateInstruction} current={4} total={5} />
      <InstructionCard cue="translate" audioEnabled={audioEnabled} showTranscript={false} />
      <p aria-live="polite" className="translation-progress">
        {formatTranslationProgress(draftPairs.length, sourceTokens.length)}
      </p>
      <PatternBoard slots={mission.sourceSequence} themeId={mission.themeId} />
      <ChoiceGrid
        label={COPY.translationSourceLabel}
        choices={sourceTokens}
        selectedId={selectedSource}
        getId={(choice) => choice}
        getAccessibleName={(choice) => getTokenVisual(mission.themeId, choice).labelKo}
        onSelect={setSelectedSource}
        renderChoice={(choice) => <span>{formatOriginalToken(getTokenVisual(mission.themeId, choice).labelKo)}</span>}
      />
      <ChoiceGrid
        label={COPY.translationTargetLabel}
        choices={mission.targetPool}
        selectedId={selectedSource === null ? null : draftPairs.find((pair) => pair.source === selectedSource)?.target ?? null}
        getId={(choice) => choice}
        getAccessibleName={(choice) => getDisplayTokenVisual(mission.targetThemeId, choice).labelKo}
        onSelect={(target) => {
          if (selectedSource !== null) {
            onChangePair(selectedSource, target);
            setSelectedSource(null);
          }
        }}
        renderChoice={(choice) => <span>{formatTokenShape(getDisplayTokenVisual(mission.targetThemeId, choice).labelKo)}</span>}
      />
      {draftPairs.length > 0 ? (
        <ul aria-label={COPY.translationPairsLabel} className="translation-pairs">
          {draftPairs.map((pair) => (
            <li key={pair.source}>
              {getTokenVisual(mission.themeId, pair.source).labelKo} → {getDisplayTokenVisual(mission.targetThemeId, pair.target).labelKo}
            </li>
          ))}
        </ul>
      ) : null}
      {translatedComplete ? (
        <ol aria-label={COPY.translatedBoardLabel} className="translated-board">
          {translated.map((target, index) => {
            const visual = getDisplayTokenVisual(mission.targetThemeId, target);
            return (
              <li key={`${index}-${target}`}>
                <span aria-label={`${formatOrdinal(index)} ${COPY.cellSuffix}, ${formatTokenShape(visual.labelKo)}`}>
                  <TokenIcon id={visual.iconId} />
                </span>
              </li>
            );
          })}
        </ol>
      ) : null}
      {feedback !== null ? (
        <FeedbackPanel status={feedback.status} message={feedbackMessage(feedback)} />
      ) : null}
      <ActionRail primary={isSuccess ? <PrimaryAction onClick={onContinue}>{COPY.nextCreateStage}</PrimaryAction> : <PrimaryAction
          disabled={!translatedComplete}
          onClick={() => {
            if (translatedComplete) onSubmit(draftPairs, translated);
          }}
        >
          {COPY.translateSubmit}
        </PrimaryAction>} />
    </section>
  );
}
