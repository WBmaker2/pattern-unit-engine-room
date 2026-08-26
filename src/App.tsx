import { useReducer, type JSX } from 'react';

import { AppShell } from './components/AppShell';
import { COPY } from './content/copy';
import { ContinuePatternScreen } from './features/continue/ContinuePatternScreen';
import { FindUnitScreen } from './features/find/FindUnitScreen';
import { StartScreen } from './features/start/StartScreen';
import { createInitialSession, sessionReducer } from './features/session/reducer';
import { selectCanContinue, selectCurrentMission } from './features/session/selectors';

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSession);
  const mission = selectCurrentMission(state);
  const canContinue = selectCanContinue(state);

  const continueStage = () => {
    if (canContinue) dispatch({ type: 'CONTINUE_STAGE' });
  };

  return (
    <AppShell>
      <h1>규칙 단위 기관실</h1>
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
      {state.stage !== 'start' && state.stage !== 'find' && state.stage !== 'continue' ? (
        <section aria-label="다음 학습 단계">
          <h2>{COPY.nextStage}</h2>
          <p>{COPY.complete}</p>
        </section>
      ) : null}
    </AppShell>
  );
}
