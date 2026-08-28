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
    render(<AppShell><h1>테스트</h1></AppShell>);
    const trigger = screen.getByRole('button', { name: '업데이트 내역' });
    expect(trigger.closest('.app-shell__footer')).not.toBeNull();
    expect(trigger).toHaveAttribute('aria-controls', 'update-history-dialog');
    await userEvent.setup().click(trigger);
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toHaveAttribute('id', 'update-history-dialog');
    expect(screen.queryByRole('button', { name: '운행 시작' })).not.toBeInTheDocument();
  });
});
