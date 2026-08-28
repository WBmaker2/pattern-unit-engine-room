import type { JSX } from 'react';

import { COPY } from '../../content/copy';
import { InstructionCard } from '../../components/InstructionCard';
import { StartMissionIllustration } from '../../components/StartMissionIllustration';
import type { AccessibilitySettings } from '../session/types';
import { PrimaryAction } from '../../components/PrimaryAction';

export interface StartScreenProps {
  readonly settings: AccessibilitySettings;
  readonly onStart: () => void;
  readonly onOpenSettings: () => void;
  readonly audioEnabled?: boolean;
}

export function StartScreen({ settings, onStart, onOpenSettings, audioEnabled = false }: StartScreenProps): JSX.Element {
  void settings;
  return (
    <section aria-label={COPY.startTitle} className="start-screen">
      <InstructionCard title={COPY.startTitle} cue="start" audioEnabled={audioEnabled} />
      <StartMissionIllustration />
      <div className="start-screen__actions">
        <PrimaryAction onClick={onStart}>{COPY.startAction}</PrimaryAction>
        <button onClick={onOpenSettings} type="button">
          {COPY.settingsAction}
        </button>
      </div>
    </section>
  );
}
