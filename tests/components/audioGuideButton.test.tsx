import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AudioGuideButton } from '../../src/components/AudioGuideButton';
import { COPY } from '../../src/content/copy';
import { InstructionCard } from '../../src/components/InstructionCard';
import type { AudioGuide } from '../../src/services/audioGuide';

function createGuideMock(): AudioGuide {
  return {
    play: vi.fn().mockResolvedValue('played'),
    stop: vi.fn().mockReturnValue('stopped'),
  };
}

describe('선택형 음성 안내 버튼', () => {
  afterEach(cleanup);

  it('음성을 꺼도 같은 문자 안내를 유지한다', () => {
    render(<InstructionCard cue="find" audioEnabled={false} />);

    expect(screen.getByText('가장 짧게 되풀이되는 한 묶음을 골라요.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '안내 듣기' })).not.toBeInTheDocument();
  });

  it('음성을 켜면 요청할 때만 재생하고 aria-pressed를 표시한다', async () => {
    const guide = createGuideMock();
    render(<AudioGuideButton cue="find" guide={guide} />);
    const button = screen.getByRole('button', { name: COPY.audioListen });

    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveClass('icon-button');
    expect(guide.play).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(guide.play).toHaveBeenCalledWith('find');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('재생 중에는 안내 멈추기로 바뀐다', async () => {
    const guide = createGuideMock();
    render(<AudioGuideButton cue="find" guide={guide} />);
    await userEvent.click(screen.getByRole('button', { name: COPY.audioListen }));
    const stopButton = screen.getByRole('button', { name: COPY.audioStop });

    await userEvent.click(stopButton);
    expect(guide.stop).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: COPY.audioListen })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('재생할 수 없으면 polite fallback을 보여 준다', async () => {
    const guide: AudioGuide = {
      play: vi.fn().mockResolvedValue('unavailable'),
      stop: vi.fn().mockReturnValue('stopped'),
    };
    render(<AudioGuideButton cue="find" guide={guide} />);
    await userEvent.click(screen.getByRole('button', { name: COPY.audioListen }));
    expect(screen.getByRole('status')).toHaveTextContent(COPY.audioUnavailable);
    expect(screen.getByRole('button', { name: COPY.audioListen })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('자연 종료 이벤트가 오면 다시 듣기 상태로 돌아온다', async () => {
    const guide = createGuideMock();
    let ended: (() => void) | undefined;
    guide.onEnded = (listener) => {
      ended = listener;
      return () => undefined;
    };
    render(<AudioGuideButton cue="find" guide={guide} />);
    await userEvent.click(screen.getByRole('button', { name: COPY.audioListen }));
    expect(screen.getByRole('button', { name: COPY.audioStop })).toBeInTheDocument();
    ended?.();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: COPY.audioListen })).toBeInTheDocument();
    });
  });

  it('cue가 바뀌거나 컴포넌트가 사라지면 음성을 멈춘다', () => {
    const guide = createGuideMock();
    const { rerender, unmount } = render(<AudioGuideButton cue="find" guide={guide} />);
    rerender(<AudioGuideButton cue="repair" guide={guide} />);
    unmount();
    expect(guide.stop).toHaveBeenCalledTimes(2);
  });
});
