import { useCallback, useRef } from 'react';
import { useTicker } from '../../hooks/useTicker';

interface Props {
  /** Base level 0..1, or null for a strip that carries no meter. */
  level: number | null;
  seed: number;
  active: boolean;
  height?: number;
}

export function Meter({ level, seed, active, height = 228 }: Props) {
  const fill = useRef<HTMLDivElement>(null);

  const tick = useCallback(
    (t: number) => {
      const el = fill.current;
      if (!el || level === null) return;
      const wobble =
        0.15 * Math.sin(t * 0.0021 + seed) +
        0.1 * Math.sin(t * 0.0073 + seed * 3.1) +
        0.05 * Math.sin(t * 0.017 + seed * 7.7);
      const v = Math.min(1, Math.max(0.02, level + wobble));
      el.style.height = `${(v * 100).toFixed(1)}%`;
      el.dataset.clip = v > 0.94 ? 'on' : 'off';
    },
    [level, seed],
  );

  useTicker(tick, active && level !== null && level > 0);

  const idle = level === null ? 0 : level * 100;

  return (
    <div className="meter" style={{ height }} aria-hidden="true">
      {level !== null && (
        <div ref={fill} className="meter__fill" data-clip="off" style={{ height: `${idle}%` }} />
      )}
      <div className="meter__segments" />
    </div>
  );
}
