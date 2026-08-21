import { Console } from '../console/Console';
import { Reveal } from '../Reveal';

const CALLOUTS = [
  {
    title: 'SENDS ARE PER STRIP',
    tone: 'green',
    body: 'A1–A5 reach real outputs, B1–B3 the virtual mics. Each send is on or off: a PipeWire link carries no volume of its own, so the level is the strip fader.',
  },
  {
    title: 'OFFLINE IS NEVER ERASED',
    tone: 'amber',
    body: 'Unplug the USB mic, switch the headset off — the strip greys out and keeps its channel, its gate and its sends until the device comes back.',
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
          <p className="eyebrow">01 · THE CONSOLE</p>
          <h2 className="section-title" id="console-title">
            The whole desk in one window
          </h2>
          <p className="section-lede">
            No pop-ups. Settings, the FX drawer and the bus matrix are states of the same window.
            Below is the console itself — vertical strips, live meters, sends laid out as a grid.
          </p>
        </Reveal>

        <Reveal>
          <p className="sr-only">
            A reproduction of the VirtMix console: seven vertical strips — a hardware input, an
            application, two buses, two outputs and a virtual mic — each with a level meter, a
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
