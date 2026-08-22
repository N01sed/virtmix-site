import { useCallback, useRef, useState } from 'react';

interface Props {
  /** What lands in the clipboard. */
  text: string;
  label: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * A page cannot run an installer, so the honest equivalent is handing over the
 * command ready to paste. When the clipboard is refused — over http, or without
 * the permission — the label points back at the block that holds the commands.
 */
export function CopyButton({ text, label, copiedLabel = '● COPIED', className = '' }: Props) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(() => {
    window.clearTimeout(timer.current);
    navigator.clipboard
      .writeText(text)
      .then(() => setState('copied'))
      .catch(() => setState('failed'));
    timer.current = window.setTimeout(() => setState('idle'), 2400);
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      className={`${className} ${state === 'copied' ? 'btn--copied' : ''}`.trim()}
      data-state={state}
      aria-live="polite"
    >
      {state === 'copied' ? copiedLabel : state === 'failed' ? '↑ COPY THE LINES ABOVE' : label}
    </button>
  );
}
