import { SITE } from '../data/site';

const FACTS = ['RUST + PIPEWIRE', 'MIT LICENCE', 'NO DAEMON', 'NO SUDO'] as const;

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <p className="eyebrow eyebrow--green">LINUX · PIPEWIRE · v{SITE.version}</p>

        <h1 className="hero__title">
          <span className="hero__line">A MIXING DESK</span>{' '}
          <span className="hero__line">FOR PIPEWIRE</span>
        </h1>

        <p className="hero__lede">
          One strip per device or application. Independent sends to five outputs and three virtual
          mics that Discord and OBS see as ordinary inputs. Voicemeeter's idea, built for Linux and
          driving PipeWire rather than replacing it.
        </p>

        <div className="hero__actions">
          <a className="btn btn--primary btn--lg" href="#install">
            INSTALL
          </a>
          <a className="btn btn--lg" href={SITE.repo} rel="noreferrer noopener">
            SOURCE ON GITHUB
          </a>
        </div>

        <ul className="hero__facts">
          {FACTS.map((fact) => (
            <li key={fact}>
              <i className="chip chip--green" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="chase" aria-hidden="true" />
    </section>
  );
}
