import type { JSX } from 'react';

import { COPY } from '../../content/copy';
import type { AccessibilitySettings } from '../session/types';
import { PrimaryAction } from '../../components/PrimaryAction';

export interface StartScreenProps {
  readonly settings: AccessibilitySettings;
  readonly onStart: () => void;
  readonly onOpenSettings: () => void;
}

export function StartScreen({ settings, onStart, onOpenSettings }: StartScreenProps): JSX.Element {
  void settings;
  return (
    <section aria-labelledby="start-title" className="start-screen">
      <h2 id="start-title">{COPY.startTitle}</h2>
      <div className="start-screen__actions">
        <PrimaryAction onClick={onStart}>{COPY.startAction}</PrimaryAction>
        <button onClick={onOpenSettings} type="button">
          {COPY.settingsAction}
        </button>
      </div>
    </section>
  );
}
