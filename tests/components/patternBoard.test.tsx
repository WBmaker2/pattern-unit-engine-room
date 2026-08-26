import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PatternBoard } from '../../src/components/PatternBoard';
import { TokenIcon } from '../../src/components/TokenIcon';

describe('PatternBoard', () => {
  afterEach(cleanup);

  it('각 칸을 순서와 비색상 정보로 읽는다', () => {
    render(<PatternBoard slots={['A', 'B']} themeId="engine" />);

    expect(screen.getByRole('list', { name: '규칙 배열' })).toBeInTheDocument();
    expect(
      screen.getByLabelText('첫째 칸, 톱니바퀴 모양, 점무늬'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('둘째 칸, 나사못 모양, 줄무늬'),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('빈 칸과 열 번째 칸도 순서 이름을 유지한다', () => {
    render(
      <PatternBoard
        slots={[null, 'A', 'B', 'C', 'A', null, 'B', 'C', 'A', 'B']}
        themeId="engine"
      />,
    );

    expect(screen.getByLabelText('첫째 칸, 빈칸')).toBeInTheDocument();
    expect(
      screen.getByLabelText('10번째 칸, 나사못 모양, 줄무늬'),
    ).toBeInTheDocument();
  });

  it('선택 가능한 칸은 native button으로 semantic index를 전달한다', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <PatternBoard
        slots={['A', 'B']}
        themeId="engine"
        selectedIndex={1}
        activeIndices={[0]}
        onSelect={onSelect}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveClass('pattern-cell--selectable');
    expect(buttons[1]).toHaveClass('pattern-cell--selectable');
    expect(buttons[0].parentElement).not.toHaveClass('pattern-cell');
    expect(buttons[0].parentElement).not.toHaveAttribute('data-pattern-mark');
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[0]).toHaveClass('pattern-cell--active');

    await user.click(buttons[0]);
    expect(onSelect).toHaveBeenCalledWith(0);

    buttons[1].focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onSelect).toHaveBeenCalledWith(1);
    expect(onSelect).toHaveBeenCalledTimes(3);
  });

  it('읽기 전용 셀의 스타일·데이터 계약은 labelled span 하나에만 둔다', () => {
    const { container } = render(<PatternBoard slots={['A']} themeId="engine" />);
    const item = container.querySelector('li');
    const cell = container.querySelector('li > span[aria-label]');

    expect(item).not.toHaveClass('pattern-cell');
    expect(item).not.toHaveAttribute('data-icon');
    expect(cell).toHaveClass('pattern-cell');
    expect(cell).toHaveAttribute('data-icon', 'gear');
  });

  it('읽기 전용 칸은 button 없이 labelled span을 사용한다', () => {
    const { container } = render(
      <PatternBoard slots={['A']} themeId="engine" />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(
      container.querySelector('li > span[aria-label="첫째 칸, 톱니바퀴 모양, 점무늬"]'),
    ).toBeInTheDocument();
  });

  it('TokenIcon은 SVG 접근성 이름을 중복하지 않는다', () => {
    render(<TokenIcon id="gear" />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-label');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
