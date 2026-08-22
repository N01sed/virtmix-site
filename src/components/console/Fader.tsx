interface Props {
  /** Handle position, 0 = top of the rail. */
  position: number;
  tone: string;
  height?: number;
}

export function Fader({ position, tone, height = 228 }: Props) {
  return (
    <div className="fader" style={{ height }} aria-hidden="true">
      <div className="fader__rail" />
      <div className="fader__active" style={{ top: `${position * 100}%`, background: tone }} />
      <div className="fader__handle" style={{ top: `${position * 100}%` }} />
    </div>
  );
}
