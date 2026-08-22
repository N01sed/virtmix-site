interface Props {
  size?: number;
  className?: string;
}

/**
 * The VirtMix mark — four meters at rest, one holding an amber peak. Same
 * artwork as public/favicon.svg without its black plate, so it sits straight
 * on whatever surface it lands on. Always paired with the wordmark, hence
 * hidden from assistive tech.
 */
export function Logo({ size = 18, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="5" y="16" width="4" height="11" fill="var(--sig-green)" />
      <rect x="12" y="9" width="4" height="18" fill="var(--sig-green)" />
      <rect x="19" y="5" width="4" height="4" fill="var(--sig-amber)" />
      <rect x="19" y="11" width="4" height="16" fill="var(--sig-green)" />
      <rect x="26" y="20" width="1" height="7" fill="var(--sig-green)" />
    </svg>
  );
}
