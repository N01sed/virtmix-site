export type SignalTone = 'green' | 'cyan' | 'amber' | 'dim';

/** A send slot: wired, declared but off, or an undeclared slot. */
export type SendState = 'on' | 'off' | 'empty';

export interface Strip {
  id: string;
  name: string;
  type: string;
  tone: SignalTone;
  group: 'sources' | 'rack';
  /** Fader handle position, 0 = top of the rail, 1 = bottom. */
  fader: number;
  value: string;
  /** Base meter level, 0..1. `null` means the strip carries no meter. */
  level: number | null;
  muted?: boolean;
  channel?: string;
  fx?: 'on' | 'off';
  sendsA?: readonly SendState[];
  sendsB?: readonly SendState[];
  note?: readonly [string, string];
}

/** Screen 1a of the mockups — the reference console, strip for strip. */
export const STRIPS: readonly Strip[] = [
  {
    id: 'id14-in',
    name: 'AUDIENT iD14 Pro',
    type: 'HW INPUT',
    tone: 'green',
    group: 'sources',
    channel: 'CH 2',
    fader: 0.22,
    value: '-3.5 dB',
    level: 0.66,
    fx: 'on',
    sendsA: ['on', 'off', 'empty', 'empty', 'empty'],
    sendsB: ['on'],
  },
  {
    id: 'discord',
    name: 'DISCORD',
    type: 'APP',
    tone: 'cyan',
    group: 'sources',
    fader: 0.38,
    value: '-12.0 dB',
    level: 0.42,
    sendsA: ['off', 'on', 'empty', 'empty', 'empty'],
    sendsB: ['on'],
  },
  {
    id: 'music',
    name: 'MUSIC',
    type: 'BUS',
    tone: 'amber',
    group: 'rack',
    fader: 0.3,
    value: '-6.0 dB',
    level: 0.58,
    sendsA: ['on', 'on', 'empty', 'empty', 'empty'],
    sendsB: ['off'],
  },
  {
    id: 'system-media',
    name: 'SYSTEM MEDIA',
    type: 'BUS',
    tone: 'amber',
    group: 'rack',
    fader: 0.14,
    value: '0.0 dB',
    level: 0,
    muted: true,
    sendsA: ['on', 'off', 'empty', 'empty', 'empty'],
    sendsB: ['off'],
  },
  {
    id: 'id14-out',
    name: 'Audient iD14 Pro',
    type: 'OUTPUT A1',
    tone: 'cyan',
    group: 'rack',
    fader: 0.26,
    value: '-4.5 dB',
    level: 0.71,
    note: ['MASTER FADER', 'NO SENDS'],
  },
  {
    id: 'vmic',
    name: 'VIRTUAL MIC',
    type: 'VIRTUAL MIC',
    tone: 'cyan',
    group: 'rack',
    channel: 'STEREO',
    fader: 0.18,
    value: '-2.0 dB',
    level: 0.52,
    fx: 'off',
    note: ['SEEN BY APPS AS', '« micro-virtuel »'],
  },
];

export const LEGEND = [
  { tone: 'green', label: 'A SENDS' },
  { tone: 'cyan', label: 'B SENDS / FX' },
  { tone: 'amber', label: 'CLIP · UNSAVED' },
  { tone: 'red', label: 'MUTE' },
] as const;
