import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StageHeader } from '../../src/components/StageHeader';

describe('StageHeader', () => {
  it('단계·행동·진행을 한 헤더에 제공한다', () => {
    render(<StageHeader eyebrow="2단계" title="이어 붙이기" instruction="다음 칸을 골라요." current={2} total={5} />);
    expect(screen.getByRole('heading', { name: '이어 붙이기' })).toBeInTheDocument();
    expect(screen.getByText('다음 칸을 골라요.')).toBeInTheDocument();
    expect(screen.getByText('현재 단계 2 / 5')).toBeInTheDocument();
  });
});
