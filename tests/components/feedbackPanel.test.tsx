import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FeedbackPanel } from '../../src/components/FeedbackPanel';

describe('FeedbackPanel', () => {
  it('재시도 상태는 제목·이유·다음 행동을 한 라이브 영역에 보여 준다', () => {
    render(
      <FeedbackPanel
        message="규칙을 깨뜨린 칸을 다시 찾아봐요."
        nextActionLabel="다시 고를 곳 보기"
        onNext={() => {}}
        status="retry"
      />,
    );

    const panel = screen.getByRole('status');
    expect(panel).toHaveAttribute('aria-live', 'polite');
    expect(panel).toHaveAttribute('aria-atomic', 'true');
    expect(panel.tagName).toBe('SECTION');
    expect(screen.getByRole('heading', { name: '다시 해 봐요' })).toBeInTheDocument();
    expect(screen.getByText('규칙을 깨뜨린 칸을 다시 찾아봐요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다시 고를 곳 보기' })).toBeInTheDocument();
  });

  it('성공 상태의 다음 행동은 한 번만 호출된다', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(
      <FeedbackPanel
        message="가장 짧은 한 묶음을 찾았어요."
        nextActionLabel="다음 활동"
        onNext={onNext}
        status="success"
      />,
    );

    expect(screen.getByRole('heading', { name: '잘했어요' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '다음 활동' }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('기본 성공 안내는 느낌표 없이 차분하게 읽힌다', () => {
    render(<FeedbackPanel status="success" />);

    expect(screen.getByText('잘했어요.')).toBeInTheDocument();
  });
});
