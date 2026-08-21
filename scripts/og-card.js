/*
 * Draws public/og.png (1200×630) — the Open Graph card.
 *
 * Not part of the build: it needs a browser, because the card is typeset in the
 * real IBM Plex Mono rather than in an approximation. Open the site, paste this
 * into the console, and save the PNG the last line prints.
 */
(async () => {
  await document.fonts.load("700 104px 'IBM Plex Mono'");
  await document.fonts.load("600 27px 'IBM Plex Mono'");

  const W = 1200;
  const H = 630;
  const GREEN = '#2EE86C';
  const CYAN = '#4DD7FF';
  const AMBER = '#FFB020';
  const GRID = '#1e1e1e';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const x = canvas.getContext('2d');

  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);

  const bars = [0.62, 0.34, 0.78, 0.21, 0.55, 0.91, 0.44, 0.68, 0.29, 0.73, 0.5, 0.38];
  const bw = 14;
  const gap = 12;
  const top = 96;
  const bh = 438;
  let bx = W - 72 - (bars.length * (bw + gap) - gap);

  for (const v of bars) {
    x.fillStyle = '#0c0c0c';
    x.fillRect(bx, top, bw, bh);
    x.strokeStyle = '#1c1c1c';
    x.lineWidth = 1;
    x.strokeRect(bx + 0.5, top + 0.5, bw - 1, bh - 1);

    const h = Math.round(bh * v);
    x.fillStyle = v > 0.85 ? AMBER : GREEN;
    x.fillRect(bx, top + bh - h, bw, h);
    if (v > 0.85) {
      x.fillStyle = GREEN;
      x.fillRect(bx, top + bh - h + 26, bw, h - 26);
    }

    x.fillStyle = '#000';
    for (let y = top; y < top + bh; y += 5) x.fillRect(bx, y, bw, 2);
    bx += bw + gap;
  }

  x.fillStyle = GRID;
  x.fillRect(0, 60, W, 1);
  x.fillRect(0, H - 78, W, 1);

  x.textBaseline = 'alphabetic';
  x.font = "600 15px 'IBM Plex Mono'";
  x.letterSpacing = '3px';
  x.fillStyle = '#555';
  x.fillText('PIPEWIRE 48000 / 512', 72, 38);
  x.fillStyle = AMBER;
  x.fillRect(W - 190, 27, 8, 8);
  x.fillText('UNSAVED', W - 172, 38);

  x.font = "700 104px 'IBM Plex Mono'";
  x.letterSpacing = '-2px';
  x.fillStyle = '#fff';
  x.fillText('VIRTMIX', 68, 250);

  x.font = "600 27px 'IBM Plex Mono'";
  x.letterSpacing = '0px';
  x.fillStyle = '#888';
  x.fillText('A mixing desk for PipeWire.', 72, 306);
  x.fillText('One strip per device or app.', 72, 346);

  x.font = "700 15px 'IBM Plex Mono'";
  x.letterSpacing = '2.4px';
  let lx = 72;
  for (const [label, colour] of [
    ['A1 – A5 OUTPUTS', GREEN],
    ['B1 – B3 VIRTUAL MICS', CYAN],
    ['MIT · RUST', AMBER],
  ]) {
    x.fillStyle = colour;
    x.fillRect(lx, 408, 10, 10);
    x.fillStyle = '#ccc';
    x.fillText(label, lx + 20, 418);
    lx += x.measureText(label).width + 62;
  }

  x.font = "600 16px 'IBM Plex Mono'";
  x.letterSpacing = '2.6px';
  x.fillStyle = '#555';
  x.fillText('GITHUB.COM/N01SED/VIRTMIX', 72, H - 34);
  x.fillStyle = GREEN;
  x.fillText('v1.2.2', W - 160, H - 34);

  console.log(canvas.toDataURL('image/png'));
})();
