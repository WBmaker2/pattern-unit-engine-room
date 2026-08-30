import type { JSX, RefObject } from 'react';

import { COPY } from '../../content/copy';
import { InstructionCard } from '../../components/InstructionCard';
import { StartMissionIllustration } from '../../components/StartMissionIllustration';
import type { AccessibilitySettings } from '../session/types';
import { PrimaryAction } from '../../components/PrimaryAction';
import { ActionRail } from '../../components/ActionRail';
import { LearningJourney } from '../../components/LearningJourney';
import type { JourneyProgressItem } from '../session/selectors';

export interface StartScreenProps {
  readonly settings: AccessibilitySettings;
  readonly onStart: () => void;
  readonly onOpenSettings: () => void;
  readonly audioEnabled?: boolean;
  readonly journeyItems?: readonly JourneyProgressItem[];
  readonly settingsTriggerRef?: RefObject<HTMLButtonElement | null>;
}

export function StartScreen({
  onStart,
  onOpenSettings,
  audioEnabled = false,
  journeyItems = [],
  settingsTriggerRef,
}: StartScreenProps): JSX.Element {
  return (
    <section aria-label={COPY.startTitle} className="start-screen start-layout">
      <div className="start-screen__copy">
        <InstructionCard showTranscript={false} title={COPY.startTitle} cue="start" audioEnabled={audioEnabled} />
        <p className="start-screen__instruction">{COPY.startInstruction}</p>
      </div>
      {journeyItems.length > 0 ? <LearningJourney items={journeyItems} /> : null}
      <StartMissionIllustration />
      <ActionRail
        primary={<PrimaryAction onClick={onStart} pulseKind="find-unit">{COPY.startAction}</PrimaryAction>}
        secondary={<button onClick={onOpenSettings} ref={settingsTriggerRef} type="button">{COPY.settingsAction}</button>}
      />
    </section>
  );
}
