import { useState, type JSX } from 'react';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App';
import { COPY } from '../../src/content/copy';
import { createInitialSession } from '../../src/features/session/reducer';
import { AccessibilitySettings, resolveReducedMotion } from '../../src/features/settings/AccessibilitySettings';

function PersistenceSettingsHarness(): JSX.Element {
  const [settings, setSettings] = useState({ ...createInitialSession().settings, persistenceEnabled: true });
  return <AccessibilitySettings settings={settings} onChange={setSettings} onClose={() => {}} />;
}

describe('접근성 설정', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it('네 가지 native switch 이름과 기본 상태를 보여 준다', () => {
    render(
      <AccessibilitySettings
        settings={createInitialSession().settings}
        onChange={vi.fn()}
        onClose={vi.fn()}
        systemPrefersReduce={false}
      />,
    );
    expect(screen.getByRole('heading', { name: COPY.settingsTitle })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: COPY.audioSetting })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('switch', { name: COPY.motionSetting })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('switch', { name: COPY.patternContrastSetting })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('switch', { name: COPY.persistenceSetting })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText(COPY.storageExplanation)).toBeInTheDocument();
    expect(screen.getByText(COPY.storageOffExplanation)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: COPY.settingsClose })).toBeInTheDocument();
  });

  it('각 설정은 켜짐 또는 꺼짐을 글자로 보여 준다', () => {
    render(
      <AccessibilitySettings
        settings={{ ...createInitialSession().settings, persistenceEnabled: true }}
        onChange={() => {}}
        onClose={() => {}}
      />,
    );
    expect(screen.getAllByText('켜짐').length).toBeGreaterThan(0);
    expect(screen.getAllByText('꺼짐').length).toBeGreaterThan(0);
  });

  it('이어 하기를 끌 때 즉시 삭제하지 않고 확인 후 저장을 지운다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <AccessibilitySettings
        settings={{ ...createInitialSession().settings, persistenceEnabled: true }}
        onChange={onChange}
        onClose={() => {}}
      />,
    );
    await user.click(screen.getByRole('switch', { name: '이 기기에서 이어 하기' }));
    expect(screen.getByRole('alertdialog', { name: '이어 하기 끄기 확인' })).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: '이어 하기 끄기' }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ persistenceEnabled: false }));
  });

  it('확인 패널은 첫 동작에 초점을 주고 Tab을 안에서 순환하며 Escape로 닫는다', async () => {
    const user = userEvent.setup();
    render(
      <AccessibilitySettings
        settings={{ ...createInitialSession().settings, persistenceEnabled: true }}
        onChange={() => {}}
        onClose={() => {}}
      />,
    );
    const persistenceSwitch = screen.getByRole('switch', { name: '이 기기에서 이어 하기' });
    await user.click(persistenceSwitch);
    const dialog = screen.getByRole('alertdialog', { name: '이어 하기 끄기 확인' });
    const confirm = screen.getByRole('button', { name: '이어 하기 끄기' });
    const cancel = screen.getByRole('button', { name: '계속 사용' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(confirm).toHaveFocus();
    await user.tab();
    expect(cancel).toHaveFocus();
    await user.tab();
    expect(confirm).toHaveFocus();
    await user.tab({ shift: true });
    expect(cancel).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('alertdialog', { name: '이어 하기 끄기 확인' })).not.toBeInTheDocument();
    await waitFor(() => expect(persistenceSwitch).toHaveFocus());
  });

  it('이어 하기를 끄면 승인 후 상태를 끄고 스위치에 초점을 돌려준다', async () => {
    const user = userEvent.setup();
    render(<PersistenceSettingsHarness />);
    const persistenceSwitch = screen.getByRole('switch', { name: '이 기기에서 이어 하기' });
    await user.click(persistenceSwitch);
    await user.click(screen.getByRole('button', { name: '이어 하기 끄기' }));
    expect(persistenceSwitch).toHaveAttribute('aria-checked', 'false');
    await waitFor(() => expect(persistenceSwitch).toHaveFocus());
  });

  it('이어 하기 끄기에서 계속 사용을 누르면 현재 상태를 유지한다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <AccessibilitySettings
        settings={{ ...createInitialSession().settings, persistenceEnabled: true }}
        onChange={onChange}
        onClose={() => {}}
      />,
    );
    await user.click(screen.getByRole('switch', { name: '이 기기에서 이어 하기' }));
    await user.click(screen.getByRole('button', { name: '계속 사용' }));
    expect(screen.queryByRole('alertdialog', { name: '이어 하기 끄기 확인' })).not.toBeInTheDocument();
    expect(screen.getByRole('switch', { name: '이 기기에서 이어 하기' })).toHaveAttribute('aria-checked', 'true');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('설정 토글은 새 설정을 전달하고 닫기 버튼은 닫는다', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(<AccessibilitySettings settings={createInitialSession().settings} onChange={onChange} onClose={onClose} />);
    await user.click(screen.getByRole('switch', { name: COPY.audioSetting }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ audioEnabled: true }));
    await user.click(screen.getByRole('button', { name: COPY.settingsClose }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('명시적 줄이기와 OS 줄이기를 모두 적용한다', () => {
    expect(resolveReducedMotion('reduce', false)).toBe(true);
    expect(resolveReducedMotion('system', true)).toBe(true);
    expect(resolveReducedMotion('system', false)).toBe(false);
  });

  it('App은 stable store를 사용해 localStorage load를 재렌더링마다 반복하지 않는다', () => {
    const load = vi.spyOn(Storage.prototype, 'getItem');
    const { rerender } = render(<App />);
    rerender(<App />);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('App은 이어 하기 삭제 실패 시 저장 동의를 끄지 않는다', async () => {
    const user = userEvent.setup();
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    window.localStorage.setItem('pattern-unit-engine-room:v1', JSON.stringify({
      version: 1,
      consent: true,
      snapshot: {
        journeyIndex: 0,
        stage: 'start',
        completedKinds: [],
        freeUnit: [],
        freeTrack: [],
      },
      settings: { audioEnabled: false, motionPreference: 'system', patternContrast: 'standard' },
    }));
    try {
      render(<App />);
      await user.click(screen.getByRole('button', { name: '접근성 설정' }));
      const persistenceSwitch = screen.getByRole('switch', { name: '이 기기에서 이어 하기' });
      await user.click(persistenceSwitch);
      await user.click(screen.getByRole('button', { name: '이어 하기 끄기' }));
      expect(persistenceSwitch).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('alertdialog', { name: '이어 하기 끄기 확인' })).toBeInTheDocument();
      expect(window.localStorage.getItem('pattern-unit-engine-room:v1')).not.toBeNull();
    } finally {
      removeItem.mockRestore();
    }
  });

  it('App 경로에서 확인 패널이 열리면 시작 화면과 업데이트 버튼을 Tab 대상에서 제외한다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '접근성 설정' }));
    const persistenceSwitch = screen.getByRole('switch', { name: '이 기기에서 이어 하기' });
    await user.click(persistenceSwitch);
    await user.click(persistenceSwitch);

    const content = screen.getByRole('main').querySelector('.app-shell__content');
    const startButton = Array.from(content?.querySelectorAll<HTMLButtonElement>('button') ?? [])
      .find((button) => button.textContent === '운행 시작');
    const settingsButton = Array.from(content?.querySelectorAll<HTMLButtonElement>('button') ?? [])
      .find((button) => button.textContent === '접근성 설정');
    const historyButton = Array.from(content?.querySelectorAll<HTMLButtonElement>('button') ?? [])
      .find((button) => button.textContent === '업데이트 내역');
    await waitFor(() => expect(content).toHaveAttribute('inert', ''));
    expect(startButton).toHaveAttribute('tabindex', '-1');
    expect(settingsButton).toHaveAttribute('tabindex', '-1');
    expect(historyButton).toHaveAttribute('tabindex', '-1');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(content).not.toHaveAttribute('inert'));
    expect(startButton).not.toHaveAttribute('tabindex', '-1');
    expect(settingsButton).not.toHaveAttribute('tabindex', '-1');
    expect(historyButton).not.toHaveAttribute('tabindex', '-1');
    await waitFor(() => expect(persistenceSwitch).toHaveFocus());
  });

  it('create-track 완료 상태를 새로고침해도 summary의 다음 행동에 도달한다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('pattern-unit-engine-room:v1', JSON.stringify({
      version: 1,
      consent: true,
      snapshot: {
        journeyIndex: 0,
        stage: 'create-track',
        completedKinds: ['unit-recognized', 'continued', 'repaired', 'translated', 'created'],
        freeUnit: ['A', 'B'],
        freeTrack: ['A', 'B', 'A', 'B'],
      },
      settings: { audioEnabled: false, motionPreference: 'system', patternContrast: 'standard' },
    }));
    render(<App />);
    expect(screen.getByRole('heading', { name: '활동 도장' })).toBeInTheDocument();
    const next = screen.getByRole('button', { name: '다음 운행' });
    expect(next).toBeEnabled();
    await user.click(next);
    expect(screen.getByRole('heading', { name: '한 묶음 찾기' })).toBeInTheDocument();
  });
});
