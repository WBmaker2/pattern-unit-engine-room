import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { COPY } from '../../src/content/copy';
import { createInitialSession } from '../../src/features/session/reducer';
import { AccessibilitySettings, resolveReducedMotion } from '../../src/features/settings/AccessibilitySettings';

describe('접근성 설정', () => {
  afterEach(cleanup);

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
});
