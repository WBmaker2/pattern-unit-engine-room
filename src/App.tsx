import { useEffect, useReducer, useState, type JSX } from 'react';

import { AppShell } from './components/AppShell';
import { COPY } from './content/copy';
import { ContinuePatternScreen } from './features/continue/ContinuePatternScreen';
import { CreatePatternScreen } from './features/create/CreatePatternScreen';
import { FindUnitScreen } from './features/find/FindUnitScreen';
import { RepairPatternScreen } from './features/repair/RepairPatternScreen';
import { StartScreen } from './features/start/StartScreen';
import { TranslatePatternScreen } from './features/translate/TranslatePatternScreen';
import { SummaryScreen } from './features/summary/SummaryScreen';
import type { DisplayTokenId } from './content/tokenThemes';
import type { TranslationPair } from './domain/pattern/types';
import { createInitialSession, sessionReducer } from './features/session/reducer';
import { selectCanContinue, selectCurrentMission } from './features/session/selectors';
import { AccessibilitySettings } from './features/settings/AccessibilitySettings';
import type { AccessibilitySettings as AccessibilitySettingsState, ProgressStore } from './features/session/types';
import { createProgressStore, disablePersistence, persistSession } from './services/progressStore';
import { useEffectiveReducedMotion } from './hooks/useEffectiveReducedMotion';

function createNoopStorage(): Storage {
  return {
    get length() { return 0; },
    clear() {},
    getItem() { return null; },
    key() { return null; },
    removeItem() {},
    setItem() {},
  };
}

function getAvailableStorage(): Storage {
  if (typeof window === 'undefined') return createNoopStorage();
  let candidate: unknown;
  try {
    candidate = window.localStorage;
    if (candidate === null || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
      return createNoopStorage();
    }
    const storage = candidate as Partial<Storage>;
    if (typeof storage.getItem !== 'function'
      || typeof storage.setItem !== 'function'
      || typeof storage.removeItem !== 'function') {
      return createNoopStorage();
    }
    return candidate as Storage;
  } catch {
    return createNoopStorage();
  }
}

function initializeSession(progressStore: ProgressStore) {
  return createInitialSession(progressStore.load());
}

export default function App(): JSX.Element {
  const [progressStore] = useState<ProgressStore>(() => createProgressStore(getAvailableStorage()));
  const [state, dispatch] = useReducer(sessionReducer, progressStore, initializeSession);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const mission = selectCurrentMission(state);
  const canContinue = selectCanContinue(state);
  const reducedMotion = useEffectiveReducedMotion(state.settings.motionPreference);
  const [translationPairs, setTranslationPairs] = useState<readonly TranslationPair<DisplayTokenId>[]>([]);

  useEffect(() => {
    if (state.stage !== 'translate') setTranslationPairs([]);
  }, [state.stage, mission?.id]);

  useEffect(() => {
    persistSession(state, progressStore);
  }, [progressStore, state]);

  const updateSettings = (settings: AccessibilitySettingsState): boolean => {
    if (state.settings.persistenceEnabled && !settings.persistenceEnabled) {
      if (!disablePersistence(progressStore)) return false;
    }
    dispatch({ type: 'UPDATE_SETTINGS', settings });
    return true;
  };

  const startJourney = (): void => {
    setSettingsOpen(false);
    dispatch({ type: 'START_JOURNEY' });
  };

  const continueStage = () => {
    if (canContinue) dispatch({ type: 'CONTINUE_STAGE' });
  };

  return (
    <AppShell
      motion={reducedMotion ? 'reduce' : 'full'}
      patternContrast={state.settings.patternContrast}
    >
      <h1>{COPY.appTitle}</h1>
      {state.stage === 'start' ? (
        <StartScreen
          settings={state.settings}
          onStart={startJourney}
          onOpenSettings={() => setSettingsOpen(true)}
          audioEnabled={state.settings.audioEnabled}
        />
      ) : null}
      {state.stage === 'start' && settingsOpen ? (
        <AccessibilitySettings
          effectiveReducedMotion={reducedMotion}
          settings={state.settings}
          onChange={updateSettings}
          onClose={() => setSettingsOpen(false)}
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
          audioEnabled={state.settings.audioEnabled}
        />
      ) : null}
      {state.stage === 'continue' && mission?.kind === 'continue' ? (
        <ContinuePatternScreen
          mission={mission}
          feedback={state.feedback}
          onSubmit={(answer) => dispatch({ type: 'SUBMIT_CONTINUATION', answer })}
          onContinue={continueStage}
          audioEnabled={state.settings.audioEnabled}
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
          audioEnabled={state.settings.audioEnabled}
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
          audioEnabled={state.settings.audioEnabled}
        />
      ) : null}
      {state.stage === 'create-unit' ? (
        <CreatePatternScreen
          mode="unit"
          unit={state.freeUnit}
          track={state.freeTrack}
          feedback={state.feedback}
          onAddToken={(token) => dispatch({ type: 'ADD_FREE_TOKEN', token })}
          onRemoveToken={() => dispatch({ type: 'REMOVE_FREE_TOKEN' })}
          onLockUnit={() => dispatch({ type: 'LOCK_FREE_UNIT' })}
          onAppendUnit={() => dispatch({ type: 'APPEND_FREE_UNIT' })}
          onReset={() => dispatch({ type: 'RESET_FREE_PATTERN' })}
          onRun={() => dispatch({ type: 'SUBMIT_FREE_TRACK' })}
          onContinue={continueStage}
          audioEnabled={state.settings.audioEnabled}
        />
      ) : null}
      {state.stage === 'create-track' ? (
        <CreatePatternScreen
          mode="track"
          unit={state.freeUnit}
          track={state.freeTrack}
          feedback={state.feedback}
          onAddToken={(token) => dispatch({ type: 'ADD_FREE_TOKEN', token })}
          onRemoveToken={() => dispatch({ type: 'REMOVE_FREE_TOKEN' })}
          onLockUnit={() => dispatch({ type: 'LOCK_FREE_UNIT' })}
          onAppendUnit={() => dispatch({ type: 'APPEND_FREE_UNIT' })}
          onReset={() => dispatch({ type: 'RESET_FREE_PATTERN' })}
          onRun={() => dispatch({ type: 'SUBMIT_FREE_TRACK' })}
          onContinue={continueStage}
          audioEnabled={state.settings.audioEnabled}
        />
      ) : null}
      {state.stage === 'summary' ? (
        <SummaryScreen
          evidence={state.evidence}
          journeyIndex={state.journeyIndex}
          onNextJourney={() => dispatch({ type: 'NEXT_JOURNEY' })}
          onReturnHome={() => dispatch({ type: 'RETURN_HOME' })}
          audioEnabled={state.settings.audioEnabled}
        />
      ) : null}
    </AppShell>
  );
}
