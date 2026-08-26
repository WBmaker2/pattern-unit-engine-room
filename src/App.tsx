import { useEffect, useReducer, useState, type JSX } from 'react';

import { AppShell } from './components/AppShell';
import { COPY } from './content/copy';
import { ContinuePatternScreen } from './features/continue/ContinuePatternScreen';
import { FindUnitScreen } from './features/find/FindUnitScreen';
import { RepairPatternScreen } from './features/repair/RepairPatternScreen';
import { StartScreen } from './features/start/StartScreen';
import { TranslatePatternScreen } from './features/translate/TranslatePatternScreen';
import type { DisplayTokenId } from './content/tokenThemes';
import type { TranslationPair } from './domain/pattern/types';
import { createInitialSession, sessionReducer } from './features/session/reducer';
import { selectCanContinue, selectCurrentMission } from './features/session/selectors';

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSession);
  const mission = selectCurrentMission(state);
  const canContinue = selectCanContinue(state);
  const [translationPairs, setTranslationPairs] = useState<readonly TranslationPair<DisplayTokenId>[]>([]);

  useEffect(() => {
    if (state.stage !== 'translate') setTranslationPairs([]);
  }, [state.stage, mission?.id]);

  const continueStage = () => {
    if (canContinue) dispatch({ type: 'CONTINUE_STAGE' });
  };

  return (
    <AppShell>
      <h1>{COPY.appTitle}</h1>
      {state.stage === 'start' ? (
        <StartScreen
          settings={state.settings}
          onStart={() => dispatch({ type: 'START_JOURNEY' })}
          onOpenSettings={() => dispatch({ type: 'UPDATE_SETTINGS', settings: state.settings })}
        />
      ) : null}
      {state.stage === 'find' && mission?.kind === 'find' ? (
        <FindUnitScreen
          mission={mission}
          feedback={state.feedback}
          hintUsed={state.currentHintUsed}
          onSubmit={(candidate) => dispatch({ type: 'SUBMIT_FIND', candidate })}
          onHint={() => dispatch({ type: 'USE_HINT' })}
          onContinue={continueStage}
        />
      ) : null}
      {state.stage === 'continue' && mission?.kind === 'continue' ? (
        <ContinuePatternScreen
          mission={mission}
          feedback={state.feedback}
          onSubmit={(answer) => dispatch({ type: 'SUBMIT_CONTINUATION', answer })}
          onContinue={continueStage}
        />
      ) : null}
      {state.stage === 'repair' && mission?.kind === 'repair' ? (
        <RepairPatternScreen
          mission={mission}
          feedback={state.feedback}
          selectedIndex={state.selectedRepairIndex}
          onSelectIndex={(index) => dispatch({ type: 'SELECT_REPAIR_INDEX', index })}
          onSubmit={(replacement) => dispatch({ type: 'SUBMIT_REPAIR', replacement })}
          onContinue={continueStage}
        />
      ) : null}
      {state.stage === 'translate' && mission?.kind === 'translate' ? (
        <TranslatePatternScreen
          mission={mission}
          feedback={state.feedback}
          draftPairs={translationPairs}
          onChangePair={(source, target) => setTranslationPairs((pairs) => [
            ...pairs.filter((item) => item.source !== source),
            { source, target },
          ])}
          onSubmit={(pairs, translated) => dispatch({ type: 'SUBMIT_TRANSLATION', pairs, translated })}
          onContinue={continueStage}
        />
      ) : null}
      {state.stage === 'create-unit' || state.stage === 'create-track' || state.stage === 'summary' ? (
        <section aria-label={COPY.nextStageSectionLabel}>
          <h2>{COPY.nextStage}</h2>
          <p>{COPY.complete}</p>
        </section>
      ) : null}
    </AppShell>
  );
}
