import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LearningJourney } from '../../src/components/LearningJourney';

describe('LearningJourney', () => {
  afterEach(cleanup);

  it('상태를 색상 없이 텍스트로 표시한다', () => {
    render(<LearningJourney items={[
      { key: 'find', label: '찾기', status: 'complete' },
      { key: 'continue', label: '이어 붙이기', status: 'current' },
      { key: 'repair', label: '수리하기', status: 'upcoming' },
    ]} />);
    expect(screen.getByRole('navigation', { name: '학습 여정' })).toBeInTheDocument();
    expect(screen.getByText('완료')).toBeInTheDocument();
    expect(screen.getByText('현재').closest('li')).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('예정')).toBeInTheDocument();
  });

  it('현재 단계 의미를 목록 항목 전체에 연결한다', () => {
    render(<LearningJourney items={[
      { key: 'find', label: '찾기', status: 'complete' },
      { key: 'continue', label: '이어 붙이기', status: 'current' },
      { key: 'repair', label: '수리하기', status: 'upcoming' },
    ]} />);

    const currentItem = screen.getByText('이어 붙이기').closest('li');
    expect(currentItem).not.toBeNull();
    expect(currentItem).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('현재')).not.toHaveAttribute('aria-current');
  });
});
