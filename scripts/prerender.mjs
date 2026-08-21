import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const dist = path.join(root, 'dist');
const ssrDir = path.join(dist, '.ssr');

const { render } = await import(path.join(ssrDir, 'entry-server.js'));

const indexPath = path.join(dist, 'index.html');
const template = await readFile(indexPath, 'utf8');
const html = template.replace('<!--app-html-->', render());

if (html === template) {
  throw new Error('prerender: <!--app-html--> placeholder not found in dist/index.html');
}

await writeFile(indexPath, html);
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerendered ${(html.length / 1024).toFixed(1)} kB into dist/index.html`);
