import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PatternStrip } from '../../src/components/PatternStrip';

describe('PatternStrip', () => {
  afterEach(cleanup);

  it('PatternStrip은 ol/li 없이 비대화형 시각 요소만 렌더링한다', () => {
    render(
      <button type="button">
        <PatternStrip slots={['A', 'B']} themeId="engine" />
      </button>,
    );

    const button = screen.getByRole('button');
    expect(button.querySelector('ol')).toBeNull();
    expect(button.querySelector('li')).toBeNull();
    expect(button.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(button.querySelectorAll('.pattern-strip__cell')).toHaveLength(2);
  });
});
