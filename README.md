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

## The APT repository

The site serves the Debian repository behind `apt install virtmix`:

| | |
|---|---|
| repository | `https://n01sed.github.io/virtmix-site/apt` |
| signing key | `https://n01sed.github.io/virtmix-site/virtmix.asc` |

[scripts/apt-repo.sh](scripts/apt-repo.sh) assembles it during the deploy: it reads the
latest release of [N01sed/virtmix](https://github.com/N01sed/virtmix), downloads the
`_amd64.deb` asset, builds `Packages` and a signed `Release`/`InRelease` with
`apt-ftparchive`, and writes the tree into `dist/apt` alongside the site.

**No package is ever committed here.** A `.deb` is several megabytes and a new one lands
at every release; committing them would grow this repository forever. The cost of that
choice: apt only sees a new version once the site rebuilds — hence the nightly `schedule`
trigger in the workflow, and the "Run workflow" button when a fresh release should not
wait for it. Only the latest version is served, so `apt install virtmix=1.2.2` cannot pin
an older one.

### The signing key

apt refuses an unsigned repository, so the deploy needs a private key in the
`APT_GPG_PRIVATE_KEY` secret. Without it the step logs a line and skips — the site still
publishes, but `apt` will find nothing at `/apt`.

The key is a repository-signing key, not a personal one, and it carries **no passphrase**:
CI cannot type one.

```sh
gpg --batch --passphrase '' \
    --quick-gen-key "VirtMix Repository <you@example.org>" rsa4096 sign never
gpg --armor --export-secret-keys "VirtMix Repository" > virtmix-private.asc
gh secret set APT_GPG_PRIVATE_KEY --repo N01sed/virtmix-site < virtmix-private.asc
shred -u virtmix-private.asc
```

The public half is not committed: `apt-repo.sh` exports it from the private key at build
time, so the key users trust and the key that signs cannot drift apart. Replacing the key
means every user re-runs the two install commands — it is not a routine operation.
