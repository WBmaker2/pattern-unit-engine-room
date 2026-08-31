import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App';
import { COPY } from '../../src/content/copy';

describe('단계 전환 포커스', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('학습 단계를 바꾸면 새 학습 영역으로 포커스하고 페이지를 위로 돌린다', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    render(<App />);

    await user.click(screen.getByRole('button', { name: COPY.startAction }));
    await user.click(screen.getByRole('button', { name: /후보 2:/ }));
    await user.click(screen.getByRole('button', { name: COPY.findSubmit }));
    await user.click(screen.getByRole('button', { name: COPY.nextContinueStage }));

    const focusRegion = screen.getByRole('region', { name: '현재 학습 단계' });
    expect(focusRegion).toHaveFocus();
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' });
  });
});
