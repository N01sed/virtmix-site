import { Reveal } from '../Reveal';

const CONFIG = `{
  "outputs":  { "A1": "alsa_output.usb-Audient_iD14",
                "A2": "bluez_output.WH_1000XM5" },
  "vmics":    { "B1": "micro-virtuel" },
  "strips": [
    { "name":  "AUDIENT iD14",
      "channel": 2,
      "volume":  0.67,
      "mute":    false,
      "sends":   { "A": ["A1"], "B": ["B1"] },
      "fx":      { "gate": true, "comp": true } }
  ]
}`;

export function ConfigSection() {
  return (
    <section className="section" id="config" aria-labelledby="config-title">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">05 · STATE</p>
          <h2 className="section-title" id="config-title">
            Nothing autosaves
          </h2>
          <p className="section-lede">
            Choosing an output, importing a profile, creating a bus — none of it touches the disk.
            The amber ● UNSAVED marker stays lit until you press SAVE CONFIG. The whole desk then
            fits in one readable file, reapplied at the next start, wiring included.
          </p>
        </Reveal>

        <div className="split split--code">
          <Reveal className="split__visual">
            <figure className="code">
              <figcaption className="code__cap">~/.config/virtmix/config.json — abridged</figcaption>
              <pre className="code__body">
                <code>{CONFIG}</code>
              </pre>
            </figure>
          </Reveal>

          <Reveal className="split__text" step={1}>
            <dl className="facts facts--lead">
              <div>
                <dt>ONE FILE</dt>
                <dd>plain JSON, editable by hand, reapplied at start-up</dd>
              </div>
              <div>
                <dt>EXPORT / IMPORT</dt>
                <dd>move a profile between machines — an import applies without writing</dd>
              </div>
              <div>
                <dt>ABSENT ≠ DELETED</dt>
                <dd>a device that is gone keeps its channel, its gate and its sends</dd>
              </div>
              <div>
                <dt>PREFIXED</dt>
                <dd>every file written outside its own folder starts with virtmix</dd>
              </div>
            </dl>

            <p className="sr-only">
              The tray menu: open console, save config with its unsaved marker, and close VirtMix.
              Meters and refreshes are suspended while the window is hidden; the routing stays live.
            </p>
            <div className="tray" aria-hidden="true">
              <div className="tray__head">
                <span className="tray__icon" aria-hidden="true">
                  V
                </span>
                <span>
                  <span className="tray__name">VIRTMIX</span>
                  <span className="tray__state">RUNNING · 0.4% CPU</span>
                </span>
              </div>
              <ul className="tray__menu">
                <li className="tray__item tray__item--on">Open console</li>
                <li className="tray__item">
                  Save config <i className="led led--amber" />
                </li>
                <li className="tray__rule" role="separator" />
                <li className="tray__item tray__item--danger">Close VirtMix</li>
              </ul>
              <p className="tray__foot">
                Meters &amp; refresh suspended while hidden. Routing stays live.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
