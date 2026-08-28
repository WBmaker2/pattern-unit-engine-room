import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import App from '../../src/App';
import { AppShell } from '../../src/components/AppShell';

describe('앱 셸', () => {
  afterEach(cleanup);

  it('한국어 이름이 있는 main landmark를 제공한다', () => {
    render(<App />);

    expect(
      screen.getByRole('main', { name: '규칙 단위 기관실' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '규칙 단위 기관실' }),
    ).toBeInTheDocument();
  });

  it('업데이트 버튼은 콘텐츠 footer에 있고 dialog가 열리면 배경 조작 대상이 숨겨진다', async () => {
    render(
      <AppShell>
        <h1>테스트</h1>
        <button type="button">운행 시작</button>
      </AppShell>,
    );
    const trigger = screen.getByRole('button', { name: '업데이트 내역' });
    const learnerAction = screen.getByRole('button', { name: '운행 시작' });
    const content = trigger.closest('.app-shell__content');
    expect(trigger.closest('.app-shell__footer')).not.toBeNull();
    expect(trigger).toHaveAttribute('aria-controls', 'update-history-dialog');
    expect(learnerAction).toBeInTheDocument();
    expect(content).not.toBeNull();
    await userEvent.setup().click(trigger);
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toHaveAttribute('id', 'update-history-dialog');
    expect(content).toHaveAttribute('aria-hidden', 'true');
    expect(content).toHaveAttribute('inert', '');
    expect(screen.queryByRole('button', { name: '운행 시작' })).not.toBeInTheDocument();
  });
});
