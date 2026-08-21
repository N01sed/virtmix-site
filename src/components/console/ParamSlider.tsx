interface Props {
  label: string;
  value: string;
  /** Handle position, 0..1 from the left. */
  pos: number;
  tone: string;
}

export function ParamSlider({ label, value, pos, tone }: Props) {
  return (
    <div className="param">
      <div className="param__head">
        <span>{label}</span>
        <span className="param__value">{value}</span>
      </div>
      <div className="param__track" aria-hidden="true">
        <div className="param__rail" />
        <div className="param__active" style={{ width: `${pos * 100}%`, background: tone }} />
        <div className="param__handle" style={{ left: `${pos * 100}%` }} />
      </div>
    </div>
  );
}
