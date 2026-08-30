import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InstructionCard } from '../../src/components/InstructionCard';

describe('InstructionCard', () => {
  it('StageHeader가 안내를 소유하면 음성 꺼짐 상태의 빈 카드를 만들지 않는다', () => {
    const { container } = render(
      <InstructionCard cue="find" showTranscript={false} audioEnabled={false} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('음성을 켜면 transcript 없이도 로컬 안내 조작을 남긴다', () => {
    render(<InstructionCard cue="find" showTranscript={false} audioEnabled />);

    expect(screen.getByRole('button', { name: '안내 듣기' })).toBeInTheDocument();
    expect(screen.getByText('AI 합성 음성으로 만든 안내예요.')).toBeInTheDocument();
  });
});
