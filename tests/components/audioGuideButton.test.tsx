import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AudioGuideButton } from '../../src/components/AudioGuideButton';
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
    const button = screen.getByRole('button', { name: '안내 듣기' });

    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(guide.play).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(guide.play).toHaveBeenCalledWith('find');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('재생 중에는 안내 멈추기로 바뀐다', async () => {
    const guide = createGuideMock();
    render(<AudioGuideButton cue="find" guide={guide} />);
    await userEvent.click(screen.getByRole('button', { name: '안내 듣기' }));
    const stopButton = screen.getByRole('button', { name: '안내 멈추기' });

    await userEvent.click(stopButton);
    expect(guide.stop).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: '안내 듣기' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
