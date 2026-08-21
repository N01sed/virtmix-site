import { useEffect } from 'react';

type Tick = (elapsedMs: number) => void;

const subscribers = new Set<Tick>();
let frame = 0;
let start = 0;

function loop(now: number): void {
  if (start === 0) start = now;
  const elapsed = now - start;
  for (const tick of subscribers) tick(elapsed);
  frame = requestAnimationFrame(loop);
}

function wake(): void {
  if (frame === 0 && subscribers.size > 0 && !document.hidden) {
    frame = requestAnimationFrame(loop);
  }
}

function sleep(): void {
  if (frame !== 0) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => (document.hidden ? sleep() : wake()));
}

/**
 * Shared animation clock. Meters that scroll out of view unsubscribe, so an
 * idle page costs nothing — the same reason the app suspends its own meters
 * once it is tucked into the tray.
 */
export function useTicker(tick: Tick, active: boolean): void {
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    subscribers.add(tick);
    wake();

    return () => {
      subscribers.delete(tick);
      if (subscribers.size === 0) sleep();
    };
  }, [tick, active]);
}
