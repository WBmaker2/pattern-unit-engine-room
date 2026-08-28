import type { JSX } from 'react';

export interface StartMissionIllustrationProps {
  readonly title?: string;
}

export function StartMissionIllustration({ title }: StartMissionIllustrationProps): JSX.Element {
  const hasTitle = title !== undefined;

  return (
    <svg
      aria-hidden={hasTitle ? undefined : 'true'}
      aria-label={hasTitle ? title : undefined}
      data-testid="start-mission-illustration"
      fill="none"
      height="144"
      role={hasTitle ? 'img' : undefined}
      style={{ blockSize: 'auto', maxInlineSize: '100%' }}
      viewBox="0 0 320 144"
      width="320"
      xmlns="http://www.w3.org/2000/svg"
    >
      {hasTitle ? <title>{title}</title> : null}
      <rect fill="#E8F0FF" height="112" rx="24" width="304" x="8" y="16" />
      <path d="M48 88h224" stroke="#24324A" strokeLinecap="round" strokeWidth="8" />
      <path d="M64 64h32v24H64zM112 48h32v40h-32zM160 72h32v16h-32zM208 56h32v32h-32z" fill="#FFD166" stroke="#24324A" strokeLinejoin="round" strokeWidth="4" />
      <path d="M48 40h32M112 32h32M208 32h32" stroke="#24324A" strokeLinecap="round" strokeWidth="6" />
      <circle cx="80" cy="104" fill="#4ECDC4" r="12" stroke="#24324A" strokeWidth="4" />
      <circle cx="240" cy="104" fill="#FF7A59" r="12" stroke="#24324A" strokeWidth="4" />
      <path d="m142 104 18 12 18-12-18-12-18 12Z" fill="#FFFFFF" stroke="#24324A" strokeLinejoin="round" strokeWidth="4" />
    </svg>
  );
}
