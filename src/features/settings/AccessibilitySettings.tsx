import { useMemo, type ChangeEvent, type JSX } from 'react';

import { COPY } from '../../content/copy';
import type { AccessibilitySettings as Settings } from '../session/types';

export interface AccessibilitySettingsProps {
  readonly settings: Settings;
  readonly onChange: (settings: Settings) => void;
  readonly onClose: () => void;
  readonly systemPrefersReduce?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export function resolveReducedMotion(
  preference: Settings['motionPreference'],
  systemPrefersReduce: boolean,
): boolean {
  return preference === 'reduce' || (preference === 'system' && systemPrefersReduce);
}

function useSystemMotionPreference(override: boolean | undefined): boolean {
  return useMemo(() => {
    if (override !== undefined) return override;
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [override]);
}

interface SwitchProps {
  readonly name: string;
  readonly checked: boolean;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SettingSwitch({ name, checked, onChange }: SwitchProps): JSX.Element {
  return (
    <label className="settings-panel__switch">
      <span>{name}</span>
      <input
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
  systemPrefersReduce,
}: AccessibilitySettingsProps): JSX.Element {
  const prefersReduce = useSystemMotionPreference(systemPrefersReduce);
  const effectiveReducedMotion = resolveReducedMotion(settings.motionPreference, prefersReduce);
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
        onChange={(event) => update('audioEnabled', event.currentTarget.checked)}
      />
      <SettingSwitch
        checked={settings.motionPreference === 'reduce'}
        name={COPY.motionSetting}
        onChange={(event) => update('motionPreference', event.currentTarget.checked ? 'reduce' : 'system')}
      />
      <p>{COPY.systemMotionNotice}</p>
      <p aria-live="polite">{effectiveReducedMotion ? COPY.motionReducedNotice : COPY.motionDefaultNotice}</p>
      <SettingSwitch
        checked={settings.patternContrast === 'strong'}
        name={COPY.patternContrastSetting}
        onChange={(event) => update('patternContrast', event.currentTarget.checked ? 'strong' : 'standard')}
      />
      <SettingSwitch
        checked={settings.persistenceEnabled}
        name={COPY.persistenceSetting}
        onChange={(event) => update('persistenceEnabled', event.currentTarget.checked)}
      />
      <button onClick={onClose} type="button">{COPY.settingsClose}</button>
    </section>
  );
}
