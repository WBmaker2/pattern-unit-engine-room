import { describe, expect, it, vi } from 'vitest';

import { AUDIO_GUIDES, buildAudioSrc, getAudioGuideEntry } from '../../src/content/audioGuides';
import { createAudioGuide } from '../../src/services/audioGuide';

interface MockAudio {
  readonly element: HTMLAudioElement;
  readonly play: ReturnType<typeof vi.fn>;
  readonly pause: ReturnType<typeof vi.fn>;
  readonly addEventListener: ReturnType<typeof vi.fn>;
}

function createMockAudio(): MockAudio {
  const element = document.createElement('audio');
  const play = vi.fn().mockResolvedValue(undefined);
  const pause = vi.fn();
  const addEventListener = vi.fn();
  element.play = play;
  element.pause = pause;
  element.addEventListener = addEventListener;
  return { element, play, pause, addEventListener };
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

  it('하나의 HTMLAudioElement를 늦게 만들고 cue를 바꿔 재사용한다', async () => {
    const audio = createMockAudio();
    const factory = vi.fn(() => audio.element);
    const guide = createAudioGuide(factory);

    expect(factory).not.toHaveBeenCalled();
    await guide.play('find');
    await guide.play('repair');
    expect(factory).toHaveBeenCalledTimes(1);
    expect(audio.pause).toHaveBeenCalledTimes(2);
    expect(audio.element.src).toContain('/audio/ko/repair.mp3');
  });

  it('manifest 경계에서 잘못된 cue를 즉시 거부한다', () => {
    expect(() => getAudioGuideEntry('unknown' as never)).toThrow(/unknown/);
  });

  it('7개 안내는 모두 로컬 MP3와 COPY transcript 키를 가진다', () => {
    expect(Object.keys(AUDIO_GUIDES)).toHaveLength(7);
    for (const entry of Object.values(AUDIO_GUIDES)) {
      expect(entry.src).toMatch(/^\.?\/audio\/ko\/[a-z-]+\.mp3$/);
      expect(entry.transcriptKey).toBeTruthy();
      expect(entry.src).not.toMatch(/:\/\//);
      expect(entry.src).not.toContain('//audio');
    }
  });

  it('manifest와 파일 항목은 깊게 얼어 있고 cue와 경로가 중복되지 않는다', () => {
    expect(Object.isFrozen(AUDIO_GUIDES)).toBe(true);
    expect(Object.values(AUDIO_GUIDES).every((entry) => Object.isFrozen(entry))).toBe(true);
    expect(new Set(Object.keys(AUDIO_GUIDES)).size).toBe(7);
    expect(new Set(Object.values(AUDIO_GUIDES).map((entry) => entry.cue)).size).toBe(7);
    expect(new Set(Object.values(AUDIO_GUIDES).map((entry) => entry.src)).size).toBe(7);
  });

  it('정상 base만 보존하고 protocol-relative·외부 scheme은 로컬 기본 경로로 격리한다', () => {
    expect(buildAudioSrc('./', 'find')).toBe('./audio/ko/find.mp3');
    expect(buildAudioSrc('/pattern/', 'find')).toBe('/pattern/audio/ko/find.mp3');
    expect(buildAudioSrc('//cdn.example/', 'find')).toBe('./audio/ko/find.mp3');
    expect(buildAudioSrc('https://cdn.example/', 'find')).toBe('./audio/ko/find.mp3');
    expect(buildAudioSrc('ftp://cdn.example/', 'find')).toBe('./audio/ko/find.mp3');
    expect(buildAudioSrc('javascript:alert(1)', 'find')).toBe('./audio/ko/find.mp3');
  });
});
