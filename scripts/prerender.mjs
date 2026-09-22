// Renders the app once and writes the HTML into dist/index.html, so the first
// paint has real content and the client bundle only has to hydrate.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const { render } = await import('../dist-ssr/entry-server.js');
const html = render();

const file = new URL('../dist/index.html', import.meta.url);
const tpl = readFileSync(file, 'utf8');
const slot = '<div id="root"></div>';
if (!tpl.includes(slot)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
writeFileSync(file, tpl.replace(slot, `<div id="root">${html}</div>`));
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
console.log(`prerender: ${(html.length / 1024).toFixed(1)} kB of HTML written into dist/index.html`);
