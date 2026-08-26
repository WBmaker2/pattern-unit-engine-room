import { useEffect, useRef, useState, type JSX, type ReactNode } from 'react';

import { UPDATE_HISTORY } from '../content/updateHistory';
import { UpdateHistoryButton } from './UpdateHistoryButton';
import { UpdateHistoryDialog } from './UpdateHistoryDialog';

export interface AppShellProps {
  readonly children: ReactNode;
  readonly motion?: 'reduce' | 'full';
  readonly patternContrast?: 'standard' | 'strong';
}

export function AppShell({
  children,
  motion = 'full',
  patternContrast = 'standard',
}: AppShellProps): JSX.Element {
  const [historyOpen, setHistoryOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasHistoryOpen = useRef(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (!historyOpen) {
      content.removeAttribute('inert');
      return;
    }

    content.setAttribute('inert', '');
    const focusable = Array.from(content.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ));
    const previousTabIndices = focusable.map((element) => ({
      element,
      tabIndex: element.getAttribute('tabindex'),
    }));
    focusable.forEach((element) => element.setAttribute('tabindex', '-1'));

    return () => {
      content.removeAttribute('inert');
      previousTabIndices.forEach(({ element, tabIndex }) => {
        if (tabIndex === null) element.removeAttribute('tabindex');
        else element.setAttribute('tabindex', tabIndex);
      });
    };
  }, [historyOpen]);

  useEffect(() => {
    if (wasHistoryOpen.current && !historyOpen) triggerRef.current?.focus();
    wasHistoryOpen.current = historyOpen;
  }, [historyOpen]);

  return (
    <main
      aria-label="규칙 단위 기관실"
      className="app-shell"
      data-motion={motion}
      data-pattern-contrast={patternContrast}
    >
      <div
        aria-hidden={historyOpen || undefined}
        className="app-shell__content"
        ref={contentRef}
      >{children}</div>
      <UpdateHistoryButton
        onClick={() => setHistoryOpen(true)}
        open={historyOpen}
        ref={triggerRef}
        {...(historyOpen ? { tabIndex: -1 } : {})}
      />
      <UpdateHistoryDialog
        entries={UPDATE_HISTORY}
        onClose={() => setHistoryOpen(false)}
        open={historyOpen}
      />
    </main>
  );
}
