import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PrimaryAction } from '../../src/components/PrimaryAction';
import { InstructionCard } from '../../src/components/InstructionCard';

describe('PrimaryAction', () => {
  afterEach(cleanup);

  it('허용된 두 행동만 pulse API로 표현한다', () => {
    const { rerender } = render(
      <PrimaryAction pulseKind="find-unit" onClick={vi.fn()}>
        한 묶음 찾기
      </PrimaryAction>,
    );
    expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveClass('primary-action');
    expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: '한 묶음 찾기' })).toHaveAttribute(
      'data-primary-action',
      'true',
    );

    rerender(
      <PrimaryAction pulseKind="run" onClick={vi.fn()}>
        운행하기
      </PrimaryAction>,
    );
    expect(screen.getByRole('button', { name: '운행하기' })).toHaveClass('gi-pulse');
  });

  it('비활성화된 주 행동은 pulse와 primary marker를 모두 제거한다', () => {
    render(
      <PrimaryAction pulseKind="run" disabled onClick={vi.fn()}>
        운행하기
      </PrimaryAction>,
    );

    const button = screen.getByRole('button', { name: '운행하기' });
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass('primary-action');
    expect(button).not.toHaveClass('gi-pulse');
    expect(button).not.toHaveAttribute('data-primary-action');
  });

  it('빈 문자열이나 공백 안내도 기본 visible instruction으로 대체한다', () => {
    const { rerender } = render(<InstructionCard text="" />);
    expect(screen.getByText('안내를 읽고 차례로 해 보세요.')).toBeInTheDocument();

    rerender(<InstructionCard text="   " />);
    expect(screen.getByText('안내를 읽고 차례로 해 보세요.')).toBeInTheDocument();

    rerender(<InstructionCard>{'   '}</InstructionCard>);
    expect(screen.getByText('안내를 읽고 차례로 해 보세요.')).toBeInTheDocument();
  });
});
