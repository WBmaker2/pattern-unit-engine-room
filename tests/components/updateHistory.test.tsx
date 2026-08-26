import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { AppShell } from '../../src/components/AppShell';
import { UPDATE_HISTORY } from '../../src/content/updateHistory';

describe('업데이트 내역', () => {
  afterEach(cleanup);

  it('문자 라벨 버튼으로 날짜가 있는 이력을 열고 닫는다', async () => {
    const user = userEvent.setup();
    render(<AppShell><div>학습 화면</div></AppShell>);

    const trigger = screen.getByRole('button', { name: '업데이트 내역' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
    expect(within(dialog).getAllByText('2026-08-26')).toHaveLength(2);
    expect(within(dialog).getByText('MVP 학습 흐름과 접근성 검증 추가')).toBeInTheDocument();
    expect(within(dialog).getByText('최초 설계 문서 작성')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });

  it('최신 날짜와 같은 날짜의 개발 우선 순서를 지키며 중복이 없다', () => {
    expect(UPDATE_HISTORY).toEqual([
      {
        date: '2026-08-26',
        kind: '개발',
        summary: 'MVP 학습 흐름과 접근성 검증 추가',
      },
      {
        date: '2026-08-26',
        kind: '설계',
        summary: '최초 설계 문서 작성',
      },
    ]);

    const keys = UPDATE_HISTORY.map(({ date, kind, summary }) => `${date}:${kind}:${summary}`);
    expect(new Set(keys).size).toBe(keys.length);
    expect(UPDATE_HISTORY.map((entry) => entry.date)).toEqual(['2026-08-26', '2026-08-26']);
    expect(UPDATE_HISTORY.map((entry) => entry.kind)).toEqual(['개발', '설계']);
  });

  it('앱 콘텐츠 하단 여백에 safe-area 하단 inset을 포함한다', async () => {
    const styles = await readFile(
      resolve(import.meta.dirname, '../../src/styles/components.css'),
      'utf8',
    );
    const appShellBlock = styles.match(/\.app-shell\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

    expect(appShellBlock).toContain('env(safe-area-inset-bottom, 0px)');
  });

  it('열린 모달에서 Tab이 내부에 순환하고 닫기 버튼으로 trigger에 돌아온다', async () => {
    const user = userEvent.setup();
    render(<AppShell><button type="button">뒤 콘텐츠 버튼</button></AppShell>);

    const trigger = screen.getByRole('button', { name: '업데이트 내역' });
    const backgroundButton = screen.getByRole('button', { name: '뒤 콘텐츠 버튼' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
    const closeButton = within(dialog).getByRole('button', { name: '업데이트 내역 닫기' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveFocus();
    expect(backgroundButton).toHaveAttribute('tabindex', '-1');

    await user.tab();
    expect(closeButton).toHaveFocus();
    await user.tab();
    expect(dialog).toHaveFocus();
    await user.tab({ shift: true });
    expect(closeButton).toHaveFocus();

    await user.click(closeButton);
    expect(screen.queryByRole('dialog', { name: '업데이트 내역' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
