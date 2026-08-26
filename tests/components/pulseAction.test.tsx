import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PrimaryAction } from '../../src/components/PrimaryAction';

describe('PrimaryAction', () => {
  afterEach(cleanup);

  it('허용된 두 행동만 pulse API로 표현한다', () => {
    const { rerender } = render(
      <PrimaryAction pulseKind="find-unit" onClick={vi.fn()}>
        한 묶음 찾기
      </PrimaryAction>,
    );
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
    expect(button).not.toHaveClass('gi-pulse');
    expect(button).not.toHaveAttribute('data-primary-action');
  });
});
