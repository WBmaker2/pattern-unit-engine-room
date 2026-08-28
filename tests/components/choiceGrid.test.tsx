import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ChoiceGrid } from '../../src/components/ChoiceGrid';

const choices = [
  { id: 'ab', label: 'AB' },
  { id: 'ba', label: 'BA' },
  { id: 'aa', label: 'AA' },
] as const;

describe('ChoiceGrid', () => {
  afterEach(cleanup);

  it('최대 네 개의 native button 선택지를 labelled group으로 보여 준다', () => {
    render(
      <ChoiceGrid
        label="한 묶음 선택"
        choices={choices}
        selectedId="ba"
        getId={(choice) => choice.id}
        renderChoice={(choice) => choice.label}
        getAccessibleName={(choice) => `${choice.label} 묶음`}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole('group', { name: '한 묶음 선택' })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getAllByRole('button').every((button) => button.classList.contains('choice-button'))).toBe(true);
    expect(screen.getByRole('button', { name: 'BA 묶음' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'AB 묶음' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('선택된 후보는 포커스가 없어도 시각 클래스와 선택됨 표시를 유지한다', () => {
    render(
      <ChoiceGrid
        label="후보"
        choices={choices}
        selectedId="ba"
        getId={(choice) => choice.id}
        renderChoice={(choice) => choice.label}
        getAccessibleName={(choice) => `${choice.label} 묶음`}
        onSelect={() => {}}
      />,
    );

    const selected = screen.getByRole('button', { name: 'BA 묶음' });
    expect(selected).toHaveClass('choice-button--selected');
    expect(selected).toHaveTextContent('선택됨');
  });

  it('클릭·Enter·Space를 native 동작으로 선택한다', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ChoiceGrid
        label="한 묶음 선택"
        choices={choices}
        selectedId={null}
        getId={(choice) => choice.id}
        renderChoice={(choice) => choice.label}
        getAccessibleName={(choice) => `${choice.label} 묶음`}
        onSelect={onSelect}
      />,
    );

    const ab = screen.getByRole('button', { name: 'AB 묶음' });
    await user.click(ab);
    ab.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onSelect).toHaveBeenNthCalledWith(1, choices[0]);
    expect(onSelect).toHaveBeenNthCalledWith(2, choices[0]);
    expect(onSelect).toHaveBeenNthCalledWith(3, choices[0]);
  });

  it('다섯 개 이상 선택지는 개발·테스트에서 결정적으로 거부한다', () => {
    const fiveChoices = [...choices, { id: 'abc', label: 'ABC' }, { id: 'bc', label: 'BC' }];

    expect(() =>
      render(
        <ChoiceGrid
          label="너무 많은 선택"
          choices={fiveChoices}
          selectedId={null}
          getId={(choice) => choice.id}
          renderChoice={(choice) => choice.label}
          getAccessibleName={(choice) => choice.label}
          onSelect={vi.fn()}
        />,
      ),
    ).toThrow(/4개 이하/);
  });
});
