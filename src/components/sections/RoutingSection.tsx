import { FEATURES } from '../../data/content';
import { Reveal } from '../Reveal';

export function RoutingSection() {
  return (
    <section className="section" id="routing" aria-labelledby="routing-title">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">02 · ROUTING</p>
          <h2 className="section-title" id="routing-title">
            One source, as many destinations as you need
          </h2>
          <p className="section-lede">
            A strip is not tied to a single output. The same microphone can feed the audio
            interface, a Bluetooth headset and Discord at once, each send switched independently.
          </p>
        </Reveal>

        <Reveal className="path" aria-label="Signal path: source, strip, sends, destinations">
          <span className="path__node">
            SOURCE
            <em>device · app · bus</em>
          </span>
          <span className="path__link" aria-hidden="true">
            →
          </span>
          <span className="path__node path__node--wide">
            STRIP
            <em>fader · mute · channel · FX</em>
          </span>
          <span className="path__link" aria-hidden="true">
            →
          </span>
          <span className="path__fork">
            <span className="path__node path__node--green">
              A1 – A5
              <em>outputs</em>
            </span>
            <span className="path__node path__node--cyan">
              B1 – B3
              <em>virtual mics</em>
            </span>
          </span>
        </Reveal>

        <div className="grid grid--3 grid--flush">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.id} className="cell cell--tall" step={i % 3}>
              <p className="cell__index">{feature.index}</p>
              <h3 className={`cell__title cell__title--${feature.tone}`}>{feature.title}</h3>
              <p className="cell__body">{feature.body}</p>
              {feature.detail ? <p className="cell__detail">{feature.detail}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
