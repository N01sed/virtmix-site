export interface Feature {
  id: string;
  index: string;
  title: string;
  tone: 'green' | 'cyan' | 'amber';
  body: string;
  detail?: string;
}

export const FEATURES: readonly Feature[] = [
  {
    id: 'strips',
    index: '',
    title: 'ONE STRIP PER SOURCE',
    tone: 'green',
    body: 'Every declared hardware input, application and bus gets its own fader, its own mute and its own sends. A single strip can feed the audio interface, a Bluetooth headset and Discord at the same time.',
    detail: 'A1..A5 · IN 1..3 · B',
  },
  {
    id: 'vmics',
    index: '',
    title: 'ONE VIRTUAL MIC APPS TRUST',
    tone: 'cyan',
    body: 'There is exactly one, named micro-virtuel, and the name is frozen on purpose — applications remember it, so renaming it would cut them all off at once. It is the point of the project, not a device among others.',
    detail: 'B = micro-virtuel',
  },
  {
    id: 'fx',
    index: '',
    title: 'GATE, COMPRESSOR, EQ',
    tone: 'cyan',
    body: 'The gate cuts the silence, the compressor levels what is left, the EQ shapes the tone — in that order, adjusted live with no dropout. LADSPA swh-plugins, gate_1410 → sc4m_1916 → dj_eq_1901.',
    detail: 'optional · FX greys out without the package',
  },
  {
    id: 'pan',
    index: '',
    title: 'HARD PAN ON EVERY SEND',
    tone: 'green',
    body: 'An input places its signal left, centre or right in a destination’s stereo field. Build a stereo image on the virtual mic from two mono sources instead of hearing everything centred.',
    detail: 'L · C · R per input',
  },
  {
    id: 'stereo',
    index: '',
    title: 'CAPTURES A REAL STEREO PAIR',
    tone: 'cyan',
    body: 'A source that exposes a true channel pair — a stereo line, XY mics — gets one button, ST, to grab both at once. Each channel then lands on its own continuous slider instead of the hard steps.',
    detail: 'ST · -1 left to +1 right · mono FX only',
  },
  {
    id: 'rec',
    index: '',
    title: 'REC ON EVERY STRIP',
    tone: 'amber',
    body: 'Any strip records to its own independent .wav, alone — exactly what its meter already shows: the channel picked for an input, the monitor for a bus or an output.',
    detail: '~/Music/VirtMix/ · one file per strip',
  },
  {
    id: 'buses',
    index: '',
    title: 'BUSES AND A BUS MAPPER',
    tone: 'amber',
    body: 'Buses are real pw-loopback processes, rebuilt at start-up with their name, fader and sends. The Bus Mapper is a plain apps-by-bus matrix: Firefox on MUSIC, one choice per row.',
    detail: 'apps × buses',
  },
  {
    id: 'tray',
    index: '',
    title: 'FOLDS INTO THE TRAY',
    tone: 'green',
    body: 'Closing the window does not quit; the wiring stays live. Tucked away, VirtMix suspends its refreshes and meters — measured at nearly no cost on the machine.',
    detail: '0.4% CPU hidden',
  },
  {
    id: 'single',
    index: '',
    title: 'DRIVES PIPEWIRE, NEVER REPLACES IT',
    tone: 'green',
    body: 'No separate daemon, no sudo outside the installer, one instance only — launching VirtMix again brings the console back instead of opening a second one. Files written outside its own folder are all prefixed virtmix.',
    detail: 'filter-chain.service',
  },
];

export interface FxParam {
  label: string;
  value: string;
  pos: number;
}

export const GATE_PARAMS: readonly FxParam[] = [
  { label: 'THRESHOLD', value: '-42 dB', pos: 0.38 },
  { label: 'ATTACK', value: '4 ms', pos: 0.18 },
  { label: 'HOLD', value: '120 ms', pos: 0.55 },
  { label: 'DECAY', value: '250 ms', pos: 0.7 },
];

export const COMP_PARAMS: readonly FxParam[] = [
  { label: 'THRESHOLD', value: '-18 dB', pos: 0.62 },
  { label: 'RATIO', value: '3.0 : 1', pos: 0.4 },
  { label: 'ATTACK', value: '12 ms', pos: 0.24 },
  { label: 'MAKE-UP', value: '+4.0 dB', pos: 0.33 },
];

/** One gesture on an XY pad drives the 3-band EQ: tilt warm/bright on x, presence thin/full on y. */
export const EQ_PAD = { x: 0.64, y: 0.42 } as const;

export const MAPPER_BUSES = ['MUSIC', 'MEDIA', 'VOICE'] as const;

export interface MapperRow {
  app: string;
  /** Index into MAPPER_BUSES, or -1 for the system default. */
  bus: number;
}

export const MAPPER_ROWS: readonly MapperRow[] = [
  { app: 'Firefox', bus: 0 },
  { app: 'Spotify', bus: 0 },
  { app: 'mpv', bus: 1 },
  { app: 'Discord', bus: 2 },
  { app: 'Steam', bus: -1 },
];

export interface Limit {
  title: string;
  body: string;
}

export const LIMITS: readonly Limit[] = [
  {
    title: 'NO PER-SEND GAIN',
    body: 'A PipeWire link carries no volume of its own. A send is on or off; the level is the strip fader.',
  },
  {
    title: 'NO METER ON A BLUETOOTH MIC',
    body: 'Measuring it would force the whole headset into mono 16 kHz HFP — listening quality would collapse just to draw a bar. The mic stays usable; it is the meter that is dropped.',
  },
  {
    title: 'TWO OUTPUTS SHARE ONE CLOCK',
    body: 'Play to the interface and a Bluetooth sink at once and a Bluetooth dropout propagates to both.',
  },
  {
    title: 'ORPHAN GATES ARE NOT SWEPT',
    body: 'Left-over gate configs stay until you clear them. The settings panel offers the clean-up; nothing deletes on its own.',
  },
];

export interface Distro {
  name: string;
  command: string;
  state: 'covered' | 'manual';
}

export const DISTROS: readonly Distro[] = [
  { name: 'Debian / Ubuntu', command: 'apt-get install …', state: 'covered' },
  { name: 'Fedora', command: 'dnf install …', state: 'covered' },
  { name: 'Arch', command: 'listed, run it yourself', state: 'manual' },
  { name: 'Others', command: 'package table in the README', state: 'manual' },
];

export const PREREQS: readonly string[] = [
  'PipeWire, with pactl / pw-link / pw-cli / wpctl on PATH',
  'Rust toolchain — the installer compiles from source',
  'fontconfig and freetype development headers',
  'LADSPA swh-plugins, optional, only for the FX chain',
];
