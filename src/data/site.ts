export const SITE = {
  name: 'VirtMix',
  url: 'https://n01sed.github.io/virtmix-site/',
  repo: 'https://github.com/N01sed/virtmix',
  version: '1.2.2',
  license: 'MIT',
  engine: 'PIPEWIRE 48000 / 512',
} as const;

export const NAV = [
  { href: '#console', label: 'CONSOLE' },
  { href: '#routing', label: 'ROUTING' },
  { href: '#config', label: 'CONFIG' },
  { href: '#install', label: 'INSTALL' },
  { href: '#limits', label: 'LIMITS' },
] as const;
