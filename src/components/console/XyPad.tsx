interface Props {
  /** 0 = warm, 1 = bright. */
  x: number;
  /** 0 = thin, 1 = full. */
  y: number;
  tone: string;
}

/** The EQ's control surface: one dot on a pad instead of three sliders. */
export function XyPad({ x, y, tone }: Props) {
  return (
    <div className="xypad" aria-hidden="true">
      <div className="xypad__grid" />
      <div className="xypad__dot" style={{ left: `${x * 100}%`, top: `${(1 - y) * 100}%`, background: tone, borderColor: tone }} />
    </div>
  );
}
