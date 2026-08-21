# virtmix-vitrine

Landing site for [VirtMix](https://github.com/N01sed/virtmix), the virtual mixing desk for
PipeWire. Single page, React 19 + TypeScript, prerendered to static HTML at build time.

## Running it

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm run preview    # serve dist/
```

`npm run build` runs three steps: a type check, the client bundle, then an SSR bundle whose
output is rendered once and injected into `dist/index.html`. The result is a fully static
page — crawlers get the complete markup, the browser hydrates it for the animations.

## Serving it

`dist/` is plain static files; any web host will do. For a durable deployment:

```sh
docker compose up -d --build   # http://localhost:8080
```

The image builds on `node:24-alpine` and serves from `nginxinc/nginx-unprivileged` — no root,
read-only root filesystem, hashed assets cached for a year, `index.html` always revalidated.

## Layout

```
src/
  data/          content — strips, features, limits, install table
  components/
    console/     the reproduction of the app UI (rack, meters, faders, FX drawer)
    sections/    one file per page section
  hooks/         shared animation clock, IntersectionObserver wrapper
  styles/        tokens, base, console, sections
scripts/
  prerender.mjs  injects the SSR render into dist/index.html
  og-card.js     the canvas script that produced public/og.png
deploy/
  nginx.conf     production server config
```

## Design system

Everything follows the VirtMix style guide: pure black surfaces, IBM Plex Mono only, radius 0,
no shadows, no soft gradients, and the four signal colours used for meaning rather than
decoration — green for A sends and levels, cyan for B sends and FX, amber for unsaved and
offline, red for mute. Motion is short and stepped: live meters, a blinking LED, a 200 ms
reveal. Nothing eases slowly, nothing parallaxes.

## Deploying

Pushing to `main` publishes the site: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
builds it and hands `dist/` to GitHub Pages.

Live at **https://n01sed.github.io/virtmix-site/**.

It is a project page, so everything is served from a sub-path: Vite's `base` is
`/virtmix-site/`, and the canonical, Open Graph and sitemap URLs in `index.html`,
`public/sitemap.xml` and `public/robots.txt` are written out in full. Change all four
together if the site ever moves — a custom domain would put it back at the root and `base`
would become `/`.

One caveat of project pages: crawlers only read `robots.txt` from the domain root, so the
copy shipped here is inert until the site gets its own domain. Submit `sitemap.xml` directly
if the page needs to be indexed sooner.
