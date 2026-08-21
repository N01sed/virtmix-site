import { Fragment } from 'react';
import { MAPPER_BUSES, MAPPER_ROWS } from '../../data/content';
import { Reveal } from '../Reveal';

export function MapperSection() {
  return (
    <section className="section" id="mapper" aria-labelledby="mapper-title">
      <div className="wrap split split--reverse">
        <Reveal className="split__text">
          <p className="eyebrow eyebrow--amber">04 · BUSES</p>
          <h2 className="section-title" id="mapper-title">
            Which app plays on which bus
          </h2>
          <p className="section-lede">
            A bus is a real pw-loopback process VirtMix creates, names and rebuilds at start-up with
            its fader and its sends. The mapper is one choice per row — Firefox on MUSIC, mpv on
            MEDIA. Anything not listed follows the system default.
          </p>
          <dl className="facts">
            <div>
              <dt>CREATE</dt>
              <dd>name it in the settings panel, it appears as a strip</dd>
            </div>
            <div>
              <dt>REBUILT</dt>
              <dd>at every start, wiring included</dd>
            </div>
            <div>
              <dt>DEVICES</dt>
              <dd>show up on their own — ⟳ only re-reads everything</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="split__visual" step={1}>
          <p className="sr-only">
            The Bus Mapper tab: Firefox and Spotify on the MUSIC bus, mpv on MEDIA, Discord on
            VOICE, Steam left on the system default.
          </p>
          <div className="panel" aria-hidden="true">
            <div className="panel__bar">
              <span className="btn btn--glyph">← CONSOLE</span>
              <span className="panel__title">SETTINGS</span>
              <span className="console__spacer" />
              <span className="tabs">
                <span className="tabs__tab">HARDWARE</span>
                <span className="tabs__tab tabs__tab--on">BUS MAPPER</span>
              </span>
            </div>
            <div className="panel__body">
              <p className="panel__note">
                Which app plays on which bus. One per row — apps not listed follow the system
                default.
              </p>
              <div className="matrix">
                <span className="matrix__head">APP</span>
                {MAPPER_BUSES.map((bus) => (
                  <span key={bus} className="matrix__head matrix__head--amber">
                    {bus}
                  </span>
                ))}
                <span className="matrix__head matrix__head--center">DEFAULT</span>

                {MAPPER_ROWS.map((row) => (
                  <Fragment key={row.app}>
                    <span className="matrix__app">{row.app}</span>
                    {MAPPER_BUSES.map((bus, i) => (
                      <span key={bus} className="matrix__cell">
                        <i className={`box${row.bus === i ? ' box--on' : ''}`} />
                      </span>
                    ))}
                    <span className="matrix__cell">
                      <i className={`box${row.bus === -1 ? ' box--on box--dim' : ''}`} />
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
