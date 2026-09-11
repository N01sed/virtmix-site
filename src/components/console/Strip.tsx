import type { SendState, SignalTone, Strip as StripModel } from '../../data/console';
import { Fader } from './Fader';
import { Meter } from './Meter';

const TONE: Record<SignalTone, string> = {
  green: 'var(--sig-green)',
  cyan: 'var(--sig-cyan)',
  amber: 'var(--sig-amber)',
  dim: 'var(--fg-dim)',
};

interface SendsProps {
  prefix: 'A' | 'B';
  states: readonly SendState[];
  tone: string;
}

function Sends({ prefix, states, tone }: SendsProps) {
  // A single slot is the virtual mic — real VirtMix labels its one button "B",
  // never "B1": there is only ever one, so numbering it would be a lie.
  const label = (i: number) => (states.length > 1 ? `${prefix}${i + 1}` : prefix);

  return (
    <div className="strip__sends" style={{ gridTemplateColumns: `repeat(${states.length}, 1fr)` }}>
      {states.map((state, i) => (
        <span
          key={`${prefix}${i + 1}`}
          className="send"
          data-state={state}
          style={state === 'on' ? { background: tone, borderColor: tone } : undefined}
        >
          {state === 'empty' ? '·' : label(i)}
        </span>
      ))}
    </div>
  );
}

const PAN_POSITIONS = ['L', 'C', 'R'] as const;

interface PanRowProps {
  pan?: 'L' | 'C' | 'R' | undefined;
  stereo?: boolean | undefined;
  tone: string;
}

// Inputs get one row for stereo placement: L/C/R/ST while capturing a single
// channel, or — once ST is engaged — a continuous two-handle slider instead,
// since the strip now carries a real channel pair rather than a hard pan.
function PanRow({ pan, stereo, tone }: PanRowProps) {
  if (stereo) {
    return (
      <div className="strip__st" aria-hidden="true">
        <div className="st-slider">
          <div className="st-slider__rail" />
          <span className="st-slider__handle" style={{ left: '20%' }} />
          <span className="st-slider__handle" style={{ left: '80%' }} />
        </div>
        <span className="st-slider__label" style={{ color: tone }}>
          ST
        </span>
      </div>
    );
  }

  if (!pan) return null;

  return (
    <div className="strip__pan" aria-hidden="true">
      {PAN_POSITIONS.map((p) => (
        <span key={p} className="pan" data-active={p === pan} style={p === pan ? { background: tone, borderColor: tone } : undefined}>
          {p}
        </span>
      ))}
      <span className="pan pan--st">ST</span>
    </div>
  );
}

interface Props {
  strip: StripModel;
  index: number;
  active: boolean;
}

export function Strip({ strip, index, active }: Props) {
  const tone = TONE[strip.tone];

  return (
    <article className="strip">
      <header className="strip__head">
        <p className="strip__name">{strip.name}</p>
        <p className="strip__type" style={{ color: tone }}>
          {strip.type}
        </p>
      </header>

      <div className={`strip__channel${strip.channel ? '' : ' strip__channel--empty'}`}>
        {strip.channel ? (
          <>
            <span className="strip__arrow">◂</span>
            <span>{strip.channel}</span>
            <span className="strip__arrow">▸</span>
          </>
        ) : null}
      </div>

      <PanRow pan={strip.pan} stereo={strip.stereo} tone={tone} />

      <div className="strip__travel">
        <Meter level={strip.level} seed={index * 1.7} active={active} />
        <Fader position={strip.fader} tone={tone} />
      </div>

      <p className="strip__value">{strip.value}</p>

      <div className="strip__controls">
        <div className="strip__row">
          <span className={`btn btn--strip${strip.muted ? ' btn--muted' : ''}`}>
            {strip.muted ? 'MUTED' : 'MUTE'}
          </span>

          {strip.rec ? (
            <span
              className="btn btn--strip"
              data-on={strip.rec === 'on'}
              style={strip.rec === 'on' ? { background: 'var(--sig-red)', borderColor: 'var(--sig-red)', color: '#000' } : undefined}
            >
              {strip.rec === 'on' ? '● REC' : 'REC'}
            </span>
          ) : null}
        </div>

        {strip.fx ? (
          <span
            className="btn btn--strip"
            data-on={strip.fx === 'on'}
            style={strip.fx === 'on' ? { background: 'var(--sig-cyan)', borderColor: 'var(--sig-cyan)', color: '#000' } : undefined}
          >
            {strip.fx === 'on' ? 'FX ● ON' : 'FX OFF'}
          </span>
        ) : null}

        {strip.sendsA ? <Sends prefix="A" states={strip.sendsA} tone="var(--sig-green)" /> : null}
        {strip.sendsB ? <Sends prefix="B" states={strip.sendsB} tone="var(--sig-cyan)" /> : null}

        {strip.note ? (
          <p className="strip__note">
            <span>{strip.note[0]}</span>
            <span>{strip.note[1]}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
