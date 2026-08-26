import type { JSX } from 'react';
import type { DisplayTokenId } from '../content/tokenThemes';

export interface TokenIconProps {
  readonly id: DisplayTokenId;
  readonly className?: string;
}

const ICON_PATHS: Readonly<Record<DisplayTokenId, string>> = Object.freeze({
  gear: 'M12 3l1.4 2.1 2.5-.1.8 2.4 2.2 1.2-.8 2.3.8 2.3-2.2 1.2-.8 2.4-2.5-.1L12 21l-1.4-2.1-2.5.1-.8-2.4-2.2-1.2.8-2.3-.8-2.3 2.2-1.2.8-2.4 2.5.1L12 3z',
  bolt: 'M13 2L5 13h5l-1 9 8-11h-5l1-9z',
  lamp: 'M8 10a4 4 0 1 1 8 0c0 1.4-.7 2.6-1.8 3.4V16H9.8v-2.6A4 4 0 0 1 8 10zM10 19h4M10.5 21h3',
  circle: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  triangle: 'M12 3l9 17H3L12 3z',
  square: 'M4 4h16v16H4z',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z',
  flag: 'M6 21V4m0 1h11l-2 4 2 4H6',
  diamond: 'M12 2l9 10-9 10L3 12 12 2z',
  'hand-up': 'M10 21v-8H7a2 2 0 0 1 0-4h3V5a2 2 0 0 1 4 0v4h2a2 2 0 0 1 2 2v4a6 6 0 0 1-6 6h-2z',
  clap: 'M7 5l8 8M5 8l8 8M9 3l8 8M3 11l8 8M12 20l6-6',
  step: 'M7 4h5l1 6h5v4h-8l-1-6H7v8H3v-4h4V4z',
  wheel: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v10m-5-5h10m-3.5-3.5l-3 7m0-7l3 7',
  window: 'M4 4h16v16H4zM4 12h16M12 4v16',
  train: 'M6 4h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2zM8 22l2-4m4 0 2 4M4 13h16M8 8h.01M16 8h.01',
});

export function TokenIcon({ id, className }: TokenIconProps): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-icon={id}
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={ICON_PATHS[id]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
