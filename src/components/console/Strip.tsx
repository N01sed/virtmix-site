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
  return (
    <div className="strip__sends" style={{ gridTemplateColumns: `repeat(${states.length}, 1fr)` }}>
      {states.map((state, i) => (
        <span
          key={`${prefix}${i + 1}`}
          className="send"
          data-state={state}
          style={state === 'on' ? { background: tone, borderColor: tone } : undefined}
        >
          {state === 'empty' ? '·' : `${prefix}${i + 1}`}
        </span>
      ))}
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
    <article className={`strip${strip.offline ? ' strip--offline' : ''}`}>
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

      <div className="strip__travel">
        <Meter level={strip.level} seed={index * 1.7} active={active} />
        <Fader position={strip.fader} tone={tone} dimmed={strip.offline ?? false} />
      </div>

      <p className="strip__value">{strip.value}</p>

      <div className="strip__controls">
        <span className={`btn btn--strip${strip.muted ? ' btn--muted' : ''}`}>
          {strip.muted ? 'MUTED' : 'MUTE'}
        </span>

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
