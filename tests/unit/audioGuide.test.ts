import { describe, expect, it, vi } from 'vitest';

import { AUDIO_GUIDES } from '../../src/content/audioGuides';
import { createAudioGuide } from '../../src/services/audioGuide';

interface MockAudio {
  readonly element: HTMLAudioElement;
  readonly play: ReturnType<typeof vi.fn>;
  readonly pause: ReturnType<typeof vi.fn>;
}

function createMockAudio(): MockAudio {
  const element = document.createElement('audio');
  const play = vi.fn().mockResolvedValue(undefined);
  const pause = vi.fn();
  element.play = play;
  element.pause = pause;
  return { element, play, pause };
}

function createRejectingMockAudio(): MockAudio {
  const audio = createMockAudio();
  audio.play.mockRejectedValue(new Error('blocked'));
  return audio;
}

describe('로컬 음성 안내 서비스', () => {
  it('사용자 요청이 있을 때만 같은 출처 음원을 재생한다', async () => {
    const audio = createMockAudio();
    const guide = createAudioGuide(() => audio.element);

    expect(audio.play).not.toHaveBeenCalled();
    await expect(guide.play('find')).resolves.toBe('played');
    expect(audio.element.src).toContain('/audio/ko/find.mp3');
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(audio.element.currentTime).toBe(0);
  });

  it('재생 실패가 학습 흐름을 막지 않는다', async () => {
    const audio = createRejectingMockAudio();
    const guide = createAudioGuide(() => audio.element);

    await expect(guide.play('repair')).resolves.toBe('unavailable');
  });

  it('재생 중인 안내를 처음으로 되감고 멈출 수 있다', async () => {
    const audio = createMockAudio();
    const guide = createAudioGuide(() => audio.element);

    await guide.play('find');
    expect(guide.stop()).toBe('stopped');
    expect(audio.pause).toHaveBeenCalledTimes(2);
    expect(audio.element.currentTime).toBe(0);
  });

  it('7개 안내는 모두 로컬 MP3와 COPY transcript 키를 가진다', () => {
    expect(Object.keys(AUDIO_GUIDES)).toHaveLength(7);
    for (const entry of Object.values(AUDIO_GUIDES)) {
      expect(entry.src).toMatch(/^\.?\/audio\/ko\/[a-z-]+\.mp3$/);
      expect(entry.transcriptKey).toBeTruthy();
    }
  });
});
