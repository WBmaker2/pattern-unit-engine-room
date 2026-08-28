import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App';
import { COPY } from '../../src/content/copy';
import { createInitialSession } from '../../src/features/session/reducer';
import { AccessibilitySettings, resolveReducedMotion } from '../../src/features/settings/AccessibilitySettings';

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
