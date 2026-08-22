import { COMP_PARAMS, GATE_PARAMS } from '../../data/content';
import { ParamSlider } from '../console/ParamSlider';
import { Reveal } from '../Reveal';

export function FxSection() {
  return (
    <section className="section" id="fx" aria-labelledby="fx-title">
      <div className="wrap split">
        <Reveal className="split__text">
          <p className="eyebrow eyebrow--cyan">FX CHAIN</p>
          <h2 className="section-title" id="fx-title">
            Gate, then compressor
          </h2>
          <p className="section-lede">
            The gate cuts the silence, the compressor levels what is left — in that order, because
            compressing first would lift the room noise you were trying to remove.
          </p>
          <dl className="facts">
            <div>
              <dt>PLUGINS</dt>
              <dd>LADSPA swh-plugins · gate_1410 → sc4m_1916</dd>
            </div>
            <div>
              <dt>EDITING</dt>
              <dd>live, no dropout — the chain is rebuilt in place</dd>
            </div>
            <div>
              <dt>OPTIONAL</dt>
              <dd>without the package the FX button simply greys out</dd>
            </div>
            <div>
              <dt>SURVIVES REBOOT</dt>
              <dd>user service filter-chain.service</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="split__visual" step={1}>
          <p className="sr-only">
            The FX drawer, opened over a dimmed console: a noise gate with threshold, attack, hold
            and decay, feeding a compressor with threshold, ratio, attack and make-up gain.
          </p>
          <div className="drawer" aria-hidden="true">
            <div className="drawer__dim" aria-hidden="true">
              <span>CONSOLE DIMMED — STILL LIVE</span>
            </div>
            <div className="drawer__body">
              <div className="drawer__bar">
                <span className="tag tag--cyan">FX</span>
                <span className="drawer__title">AUDIENT iD14 — INPUT CHAIN</span>
                <span className="drawer__hint">adjusts live, no dropout</span>
                <span className="console__spacer" />
                <span className="btn btn--glyph">✕ CLOSE</span>
              </div>

              <div className="drawer__cols">
                <div className="drawer__col">
                  <div className="drawer__step">
                    <span className="tag tag--green">1 · NOISE GATE</span>
                    <span className="drawer__state drawer__state--green">ENABLED</span>
                  </div>
                  {GATE_PARAMS.map((p) => (
                    <ParamSlider key={p.label} {...p} tone="var(--sig-green)" />
                  ))}
                </div>

                <div className="drawer__col">
                  <div className="drawer__step">
                    <span className="tag tag--cyan">2 · COMPRESSOR</span>
                    <span className="drawer__state drawer__state--cyan">ENABLED</span>
                  </div>
                  {COMP_PARAMS.map((p) => (
                    <ParamSlider key={p.label} {...p} tone="var(--sig-cyan)" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
