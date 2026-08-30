import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActionRail } from '../../src/components/ActionRail';

describe('ActionRail', () => {
  it('primary, next, secondary 순서를 지킨다', () => {
    render(<ActionRail primary={<button>확인</button>} next={<button>다음</button>} secondary={<button>처음</button>} />);
    expect([...screen.getAllByRole('button')].map((button) => button.textContent)).toEqual(['확인', '다음', '처음']);
  });
});
