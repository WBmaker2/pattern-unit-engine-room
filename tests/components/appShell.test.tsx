import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';

describe('앱 셸', () => {
  it('한국어 이름이 있는 main landmark를 제공한다', () => {
    render(<App />);

    expect(
      screen.getByRole('main', { name: '규칙 단위 기관실' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '규칙 단위 기관실' }),
    ).toBeInTheDocument();
  });
});
