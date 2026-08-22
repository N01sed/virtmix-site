import { Console } from '../console/Console';
import { Reveal } from '../Reveal';

const CALLOUTS = [
  {
    title: 'MULTIPLE SENDS AT ONCE',
    tone: 'green',
    body: 'A1–A5 reach real outputs, B the virtual mic. Each send is on or off: a PipeWire link carries no volume of its own, so the level is the strip fader.',
  },
  {
    title: 'OFFLINE IS NEVER ERASED',
    tone: 'amber',
    body: 'Unplug the USB mic, switch the headset off — the strip just leaves the table. Its channel, its gate and its sends stay saved and come straight back the moment the device reconnects.',
  },
  {
    title: '● UNSAVED MEANS UNSAVED',
    tone: 'cyan',
    body: 'The amber dot is the whole story. Nothing reaches ~/.config/virtmix/config.json until you press SAVE CONFIG, in the window or from the tray.',
  },
] as const;

export function ConsoleSection() {
  return (
    <section className="section" id="console" aria-labelledby="console-title">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">THE CONSOLE</p>
          <h2 className="section-title" id="console-title">
            The whole desk in one window
          </h2>
          <p className="section-lede">
            No pop-ups. Settings, the FX drawer and the bus matrix are states of the same window.
          </p>
        </Reveal>

        <Reveal>
          <p className="sr-only">
            A reproduction of the VirtMix console: six vertical strips — a hardware input, an
            application, two buses, an output and a virtual mic — each with a level meter, a
            fader, a mute button and its grid of A and B sends.
          </p>
          <Console />
        </Reveal>

        <p className="scroll-hint">◂ drag the rack sideways ▸</p>

        <div className="grid grid--3">
          {CALLOUTS.map((item, i) => (
            <Reveal key={item.title} className="cell" step={i}>
              <h3 className={`cell__title cell__title--${item.tone}`}>{item.title}</h3>
              <p className="cell__body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
