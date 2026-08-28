import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App';
import { COPY } from '../../src/content/copy';
import { StartScreen } from '../../src/features/start/StartScreen';
import { createInitialSession } from '../../src/features/session/reducer';

describe('StartScreen', () => {
  afterEach(cleanup);

  it('시작 화면은 질문과 다른 안내를 보여 주고 미션 그림을 포함한다', () => {
    render(
      <StartScreen
        settings={createInitialSession().settings}
        onStart={() => {}}
        onOpenSettings={() => {}}
      />,
    );

    expect(screen.getByRole('heading', { name: COPY.startTitle })).toBeInTheDocument();
    expect(screen.getByText(COPY.startInstruction)).toBeInTheDocument();
    expect(screen.queryAllByText(COPY.startTitle)).toHaveLength(1);
    expect(screen.getByTestId('start-mission-illustration')).toBeInTheDocument();
    expect(screen.getByTestId('start-mission-illustration')).toHaveAttribute('aria-hidden', 'true');
  });

  it('제목과 시작·접근성 설정 행동을 보여 주고 각각의 콜백을 호출한다', async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();
    const onOpenSettings = vi.fn();
    render(
      <StartScreen
        settings={createInitialSession().settings}
        onStart={onStart}
        onOpenSettings={onOpenSettings}
      />,
    );

    expect(screen.getByRole('heading', { name: '기관실 문을 열어 볼까요?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '운행 시작' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '접근성 설정' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '운행 시작' })).not.toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: '접근성 설정' })).not.toHaveClass('gi-pulse');

    await user.click(screen.getByRole('button', { name: '접근성 설정' }));
    await user.click(screen.getByRole('button', { name: '운행 시작' }));
    expect(onOpenSettings).toHaveBeenCalledOnce();
    expect(onStart).toHaveBeenCalledOnce();
    expect(screen.queryByText(/점수|순위|속도|시도/)).not.toBeInTheDocument();
  });

  it('실제 앱 리듀서가 시작 화면에서 첫 단위 찾기 화면으로 이동한다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '운행 시작' }));

    expect(screen.getByRole('heading', { name: '한 묶음 찾기' })).toBeInTheDocument();
    expect(screen.getByText('가장 짧게 되풀이되는 한 묶음을 골라요.')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-primary-action="true"]')).toHaveLength(0);
  });
});
