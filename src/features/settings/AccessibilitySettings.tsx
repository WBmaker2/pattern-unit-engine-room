import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type JSX,
  type KeyboardEvent,
  type RefObject,
} from 'react';

import { COPY } from '../../content/copy';
import type { AccessibilitySettings as Settings } from '../session/types';

export interface AccessibilitySettingsProps {
  readonly settings: Settings;
  readonly onChange: (settings: Settings) => boolean | void;
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
  readonly disabled: boolean;
  readonly inputRef?: RefObject<HTMLInputElement | null>;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SettingSwitch({ name, checked, stateLabel, disabled, inputRef, onChange }: SwitchProps): JSX.Element {
  return (
    <label className="settings-panel__switch">
      <span>{name}</span>
      <span className="settings-panel__state">{stateLabel}</span>
      <input
        aria-label={name}
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        ref={inputRef}
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
  const persistenceSwitchRef = useRef<HTMLInputElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmationWasOpen = useRef(false);
  const effectiveReducedMotion = effectiveReducedMotionProp
    ?? resolveReducedMotion(settings.motionPreference, systemPrefersReduce ?? false);
  const update = (key: keyof Settings, value: boolean | Settings['motionPreference'] | Settings['patternContrast']): boolean | void => {
    return onChange({ ...settings, [key]: value });
  };

  useEffect(() => {
    if (confirmPersistenceOff) {
      confirmationWasOpen.current = true;
      confirmButtonRef.current?.focus();
      return;
    }
    if (confirmationWasOpen.current) {
      confirmationWasOpen.current = false;
      persistenceSwitchRef.current?.focus();
    }
  }, [confirmPersistenceOff]);

  const handleConfirmationKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setConfirmPersistenceOff(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const first = confirmButtonRef.current;
    const last = cancelButtonRef.current;
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section aria-label={COPY.settingsTitle} className="settings-panel">
      <h2>{COPY.settingsTitle}</h2>
      <p>{COPY.storageExplanation}</p>
      <p>{COPY.storageOffExplanation}</p>
      <SettingSwitch
        checked={settings.audioEnabled}
        disabled={confirmPersistenceOff}
        name={COPY.audioSetting}
        stateLabel={settings.audioEnabled ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => update('audioEnabled', event.currentTarget.checked)}
      />
      <SettingSwitch
        checked={settings.motionPreference === 'reduce'}
        disabled={confirmPersistenceOff}
        name={COPY.motionSetting}
        stateLabel={settings.motionPreference === 'reduce' ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => update('motionPreference', event.currentTarget.checked ? 'reduce' : 'system')}
      />
      <p>{COPY.systemMotionNotice}</p>
      <p aria-live="polite">{effectiveReducedMotion ? COPY.motionReducedNotice : COPY.motionDefaultNotice}</p>
      <SettingSwitch
        checked={settings.patternContrast === 'strong'}
        disabled={confirmPersistenceOff}
        name={COPY.patternContrastSetting}
        stateLabel={settings.patternContrast === 'strong' ? COPY.settingsOn : COPY.settingsOff}
        onChange={(event) => update('patternContrast', event.currentTarget.checked ? 'strong' : 'standard')}
      />
      <SettingSwitch
        checked={settings.persistenceEnabled}
        disabled={confirmPersistenceOff}
        inputRef={persistenceSwitchRef}
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
          onKeyDown={handleConfirmationKeyDown}
          role="alertdialog"
        >
          <h3>{COPY.persistenceOffTitle}</h3>
          <p>{COPY.persistenceOffMessage}</p>
          <div className="settings-panel__confirmation-actions">
            <button
              ref={confirmButtonRef}
              onClick={() => {
                const result = update('persistenceEnabled', false);
                if (result !== false) setConfirmPersistenceOff(false);
              }}
              type="button"
            >
              {COPY.persistenceOffConfirm}
            </button>
            <button ref={cancelButtonRef} onClick={() => setConfirmPersistenceOff(false)} type="button">
              {COPY.persistenceOffCancel}
            </button>
          </div>
        </div>
      ) : null}
      <button disabled={confirmPersistenceOff} onClick={onClose} type="button">{COPY.settingsClose}</button>
    </section>
  );
}
