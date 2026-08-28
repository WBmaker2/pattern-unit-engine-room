import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { ProgressIndicator } from '../../src/components/ProgressIndicator';

describe('ProgressIndicator', () => {
  afterEach(cleanup);

  it('진행 표시가 현재 단계와 전체 단계를 읽는다', () => {
    render(<ProgressIndicator current={2} total={5} />);

    expect(screen.getByRole('status')).toHaveTextContent('현재 단계 2 / 5');
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'off');
  });
});
