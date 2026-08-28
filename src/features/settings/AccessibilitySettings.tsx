import { useState, type ChangeEvent, type JSX } from 'react';

import { COPY } from '../../content/copy';
import type { AccessibilitySettings as Settings } from '../session/types';

export interface AccessibilitySettingsProps {
  readonly settings: Settings;
  readonly onChange: (settings: Settings) => void;
  readonly onClose: () => void;
  readonly effectiveReducedMotion?: boolean;
  readonly systemPrefersReduce?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export function resolveReducedMotion(
  preference: Settings['motionPreference'],
  systemPrefersReduce: boolean,
): boolean {
  return preference === 'reduce' || (preference === 'system' && systemPrefersReduce);
}

interface SwitchProps {
  readonly name: string;
  readonly checked: boolean;
  readonly stateLabel: string;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SettingSwitch({ name, checked, stateLabel, onChange }: SwitchProps): JSX.Element {
  return (
    <label className="settings-panel__switch">
      <span>{name}</span>
      <span className="settings-panel__state">{stateLabel}</span>
      <input
        aria-label={name}
        aria-checked={checked}
        checked={checked}
        onChange={onChange}
        role="switch"
        type="checkbox"
      />
    </label>
  );
}

export function AccessibilitySettings({
  settings,
  onChange,
  onClose,
  effectiveReducedMotion: effectiveReducedMotionProp,
  systemPrefersReduce,
}: AccessibilitySettingsProps): JSX.Element {
  const [confirmPersistenceOff, setConfirmPersistenceOff] = useState(false);
  const effectiveReducedMotion = effectiveReducedMotionProp
    ?? resolveReducedMotion(settings.motionPreference, systemPrefersReduce ?? false);
  const update = (key: keyof Settings, value: boolean | Settings['motionPreference'] | Settings['patternContrast']): void => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <section aria-label={COPY.settingsTitle} className="settings-panel">
      <h2>{COPY.settingsTitle}</h2>
      <p>{COPY.storageExplanation}</p>
      <p>{COPY.storageOffExplanation}</p>
      <SettingSwitch
        checked={settings.audioEnabled}
        name={COPY.audioSetting}
        stateLabel={settings.audioEnabled ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => update('audioEnabled', event.currentTarget.checked)}
      />
      <SettingSwitch
        checked={settings.motionPreference === 'reduce'}
        name={COPY.motionSetting}
        stateLabel={settings.motionPreference === 'reduce' ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => update('motionPreference', event.currentTarget.checked ? 'reduce' : 'system')}
      />
      <p>{COPY.systemMotionNotice}</p>
      <p aria-live="polite">{effectiveReducedMotion ? COPY.motionReducedNotice : COPY.motionDefaultNotice}</p>
      <SettingSwitch
        checked={settings.patternContrast === 'strong'}
        name={COPY.patternContrastSetting}
        stateLabel={settings.patternContrast === 'strong' ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => update('patternContrast', event.currentTarget.checked ? 'strong' : 'standard')}
      />
      <SettingSwitch
        checked={settings.persistenceEnabled}
        name={COPY.persistenceSetting}
        stateLabel={settings.persistenceEnabled ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => {
          if (settings.persistenceEnabled && !event.currentTarget.checked) {
            setConfirmPersistenceOff(true);
            return;
          }
          update('persistenceEnabled', event.currentTarget.checked);
        }}
      />
      {confirmPersistenceOff ? (
        <div
          aria-label={COPY.persistenceOffTitle}
          aria-modal="true"
          className="settings-panel__confirmation"
          role="alertdialog"
        >
          <h3>{COPY.persistenceOffTitle}</h3>
          <p>{COPY.persistenceOffMessage}</p>
          <div className="settings-panel__confirmation-actions">
            <button
              onClick={() => {
                update('persistenceEnabled', false);
                setConfirmPersistenceOff(false);
              }}
              type="button"
            >
              {COPY.persistenceOffConfirm}
            </button>
            <button onClick={() => setConfirmPersistenceOff(false)} type="button">
              {COPY.persistenceOffCancel}
            </button>
          </div>
        </div>
      ) : null}
      <button onClick={onClose} type="button">{COPY.settingsClose}</button>
    </section>
  );
}
