import type { MotionCopy } from '../../i18n/content';

/**
 * Imperative renderer for the "how Ormentis works" motion graphic.
 * Everything is a pure function of time: `render(t)` draws the frame at
 * second t, so playback, scrubbing and step jumps are all the same call.
 * The SVG uses viewBox 0 120 1920 700 (the stage only; captions live in HTML).
 */

/*
 * Timing. The scenes are written on an "animation clock" (0-63 s). The real
 * clock is slower (PACE) and stops at READING PAUSES: moments where a scene is
 * complete on screen and people need time to read it.
 */
const PACE = 1.1;
const HOLDS: [number, number][] = [
  [2.8, 1.0], // intro
  [9.4, 2.5], // parsed sentence and claim
  [18.6, 1.5], // graph with its sources
  [23.9, 1.5], // first answer from the knowledge base
  [27.3, 3.0], // agent + Indexable beats agent + documents
  [33.8, 4.0], // the four families of services
  [41.0, 3.0], // change request impact
  [47.8, 3.0], // consistency check
  [52.6, 2.0], // three different answers vs always the same
  [56.2, 2.5], // traced back to the source
];
const ANIM_END = 63;
/** real seconds at which the animation clock reaches `a` */
export function fromAnim(a: number) {
  return a * PACE + HOLDS.reduce((acc, [h, d]) => (h < a ? acc + d : acc), 0);
}
/** animation clock at real second `r` */
function toAnim(r: number) {
  let prev = 0;
  for (const [h, d] of HOLDS) {
    const start = h * PACE + prev;
    if (r < start) return (r - prev) / PACE;
    if (r < start + d) return h;
    prev += d;
  }
  return (r - prev) / PACE;
}
export const DURATION = fromAnim(ANIM_END);
const A_STEPS: [number, number][] = [
  [4, 12],
  [12, 20],
  [20, 28],
  [28, 35],
  [35, 42],
  [42, 49],
  [49, 57],
];
/** [start, end] of each step, in real seconds */
export const STEPS: [number, number][] = A_STEPS.map(([a, b]) => [fromAnim(a), fromAnim(b)]);

const NS = 'http://www.w3.org/2000/svg';
const C = {
  ink: '#ffffff',
  grey: '#b7b7b7',
  dim: 'rgba(255,255,255,.16)',
  b1: '#a38aff',
  b3: '#67efbd',
  mag: '#e455ff',
  lil: '#d9d4ea',
  warn: '#ffa45c',
  panel: '#0e0d16',
  bg: '#07070b',
};

type Attrs = Record<string, string | number>;
type Path = SVGPathElement & { __len?: number | null };

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const eo = (x: number) => 1 - Math.pow(1 - x, 3);
const eio = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
const inout = (t: number, a: number, b: number, c: number, d: number) => Math.min(eo(seg(t, a, b)), 1 - eio(seg(t, c, d)));

const LOGO = {
  bot: 'm 146.84908,366.91072 12.83847,-8.95937 q 5.1354,-3.19976 10.27079,0 l 73.17933,46.07673 q 6.41925,3.83973 12.83848,0 l 73.17934,-46.07673 q 5.13539,-3.19976 10.27078,0 l 13.4804,8.95937 q 6.41924,4.47969 0,8.95936 l -96.93052,72.31486 q -6.41923,4.47968 -12.83848,0 l -96.28859,-72.31486 q -6.41924,-4.47967 0,-8.95936 z',
  mid: 'm 105.32944,268.66033 17.86678,-12.07865 q 7.14671,-4.3138 14.29342,0 l 101.84065,62.11878 q 8.93339,5.17657 17.86678,0 l 101.84066,-62.11878 q 7.14671,-4.3138 14.29342,0 l 18.76012,12.07865 q 8.93339,6.03933 0,12.07866 l -134.8942,97.49197 q -8.93339,6.03933 -17.86678,0 L 105.32944,280.73899 q -8.933402,-6.03933 0,-12.07866 z',
  top: 'm 233.81571,76.575759 q 14,-9 28,0 l 158,99.000001 q 14,9 0,18 l -158,99 q -14,9 -28,0 l -157.000002,-99 q -14,-9 0,-18 z m -68,102.000001 q -9,6 0,12 l 73,46 q 9,6 18,0 l 74,-46 q 9,-6 0,-12 l -74,-46 q -9,-6 -18,0 z',
};

const NODES = [
  { x: 0, y: 0, k: 'obl', s: 0 },
  { x: -190, y: -120, k: 'ent', s: 0 },
  { x: 170, y: -150, k: 'ent', s: 0 },
  { x: -60, y: 170, k: 'cond', s: 0 },
  { x: 330, y: -30, k: 'ent', s: 0 },
  { x: 420, y: 150, k: 'obl', s: 2 },
  { x: 590, y: 30, k: 'cond', s: 0 },
  { x: -390, y: 40, k: 'ent', s: 3 },
  { x: -290, y: 200, k: 'perm', s: 1 },
  { x: 210, y: 230, k: 'obl', s: 1 },
  { x: -400, y: -150, k: 'fact', s: 4 },
  { x: 30, y: -250, k: 'fact', s: 3 },
  { x: 480, y: -200, k: 'ent', s: 2 },
  { x: -560, y: -40, k: 'fact', s: 4 },
  { x: 600, y: 240, k: 'fact', s: 1 },
] as const;
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 10], [2, 11], [2, 4], [4, 5], [5, 6], [4, 12], [12, 5], [0, 9],
  [9, 1], [7, 8], [8, 3], [8, 2], [7, 10], [10, 13], [5, 14], [11, 0], [9, 14], [7, 13],
];
const KIND: Record<string, string> = { obl: C.b3, perm: C.warn, ent: C.b1, cond: C.mag, fact: C.lil };
const DOC_Y = [200, 320, 440, 560, 680];
// nodes touched by the example Change Request, in cascade order
const IMPACTED = [0, 3, 2, 8, 11];
const GX = 1010;
const GY = 430;
const CW = 760;
const CH = 112;
export interface Motion {
  render: (t: number) => void;
  destroy: () => void;
}

export function mountMotion(svg: SVGSVGElement, copy: MotionCopy): Motion {
  const uid = `ixm${Math.random().toString(36).slice(2, 7)}`;
  const root = document.createElementNS(NS, 'g');
  svg.appendChild(root);

  function h<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Attrs = {}, parent: Element = root, text?: string) {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, String(attrs[k]));
    if (text != null) el.textContent = text;
    parent.appendChild(el);
    return el;
  }
  function set(el: SVGElement, o = 1, x = 0, y = 0, s = 1) {
    el.setAttribute('opacity', o.toFixed(3));
    el.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})`);
    el.style.display = o <= 0.001 ? 'none' : '';
  }
  function draw(path: Path, p: number) {
    const L = path.__len || (path.__len = path.getTotalLength());
    path.setAttribute('stroke-dasharray', `${L} ${L}`);
    path.setAttribute('stroke-dashoffset', (L * (1 - p)).toFixed(2));
  }
  function mono(parent: Element, x: number, y: number, str: string, size = 14, fill = C.grey, anchor = 'start', ls = 0.18, weight = 400) {
    return h('text', { x, y, 'font-size': size, fill, 'text-anchor': anchor, class: 'font-mono', 'letter-spacing': `${ls}em`, 'font-weight': weight }, parent, str);
  }
  const u = (n: string) => `url(#${uid}-${n})`;

  /* ---------- defs + background ---------- */
  const defs = h('defs');
  defs.innerHTML = `
    <radialGradient id="${uid}-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#4022c3" stop-opacity=".42"/><stop offset="1" stop-color="#4022c3" stop-opacity="0"/></radialGradient>
    <radialGradient id="${uid}-vig" cx="50%" cy="50%" r="75%"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
    <pattern id="${uid}-dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.1" fill="#fff" fill-opacity=".07"/></pattern>
    <linearGradient id="${uid}-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d4ea"/></linearGradient>
    <linearGradient id="${uid}-mid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e455ff"/><stop offset="1" stop-color="#b41fe6"/></linearGradient>
    <linearGradient id="${uid}-bot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a1fd0"/><stop offset="1" stop-color="#4a0a80"/></linearGradient>
    <filter id="${uid}-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>`;
  h('rect', { x: 0, y: 120, width: 1920, height: 700, fill: C.bg });
  const glowEl = h('ellipse', { cx: 960, cy: 440, rx: 900, ry: 520, fill: u('glow') });
  h('rect', { x: 0, y: 120, width: 1920, height: 700, fill: u('dots') });
  const soft = u('soft');

  function logo(parent: Element, x: number, y: number, size: number) {
    const g = h('g', {}, parent);
    const inner = h('g', { transform: `translate(${x} ${y}) scale(${size / 404}) translate(-250 -260)` }, g);
    const layers = (['bot', 'mid', 'top'] as const).map((n) => {
      const lg = h('g', {}, inner);
      h('path', { d: LOGO[n], fill: u(n), 'fill-rule': 'evenodd' }, lg);
      return lg;
    });
    return layers;
  }

  /* ---------- intro ---------- */
  const intro = h('g');
  const introLogo = logo(intro, 960, 380, 190);
  const introWord = h('text', { x: 960, y: 590, 'font-size': 118, fill: C.ink, class: 'font-display', 'font-weight': 600, 'text-anchor': 'middle', 'letter-spacing': '.04em' }, intro, 'ORMENTIS');
  const introSub = mono(intro, 960, 655, copy.introSub, 18, C.b1, 'middle', 0.32, 500);

  /* ---------- scene 1: grammatical extraction ---------- */
  const ROLE_COL = [C.b1, C.b3, C.ink, C.lil, C.mag];
  const s1 = h('g');
  const s1doc = h('g', {}, s1);
  mono(s1doc, 960, 236, copy.sourcesLine, 16, C.b1, 'middle', 0.26, 500);
  mono(s1doc, 960, 300, copy.sentence.header, 14, C.grey, 'middle', 0.22);
  [[340, 1180], [372, 980], [596, 1120], [628, 760]].forEach(([y, w]) =>
    h('rect', { x: 370, y, width: w, height: 8, rx: 4, fill: '#fff', 'fill-opacity': 0.07 }, s1doc)
  );
  const s1sent = h('g', {}, s1);
  const words = copy.sentence.words;
  const wordEls = words.map(([w]) => h('text', { x: 0, y: 468, 'font-size': 44, fill: C.ink, 'font-weight': 500 }, s1sent, w));
  const s1marks = h('g', {}, s1);
  const roleEls: { line: Path; tick: SVGElement; lab: SVGElement }[] = [];
  const claimLine = h('g', {}, s1);
  const claimTxt = h('text', { x: 960, y: 640, 'font-size': 19, class: 'font-mono', 'text-anchor': 'middle', fill: C.grey }, claimLine);
  copy.sentence.claim.forEach(([s, r]) => h('tspan', { fill: r < 0 ? C.grey : ROLE_COL[r] }, claimTxt, s));
  const s1node = h('g', {}, s1);
  h('circle', { r: 26, fill: C.b3, 'fill-opacity': 0.25, filter: soft }, s1node);
  h('circle', { r: 13, fill: C.bg, stroke: C.b3, 'stroke-width': 3 }, s1node);
  h('circle', { r: 5, fill: C.b3 }, s1node);

  function layoutS1() {
    s1marks.replaceChildren();
    roleEls.length = 0;
    const space = 12;
    const ws = wordEls.map((e) => e.getComputedTextLength());
    const total = ws.reduce((a, b) => a + b, 0) + space * (ws.length - 1);
    let x = 960 - total / 2;
    const pos: [number, number][] = [];
    wordEls.forEach((e, i) => {
      e.setAttribute('x', x.toFixed(1));
      pos.push([x, x + ws[i]]);
      x += ws[i] + space;
    });
    copy.sentence.roles.forEach((label, ri) => {
      const idx = words.map((w, i) => (w[1] === ri ? i : -1)).filter((i) => i >= 0);
      if (!idx.length) return;
      const x0 = pos[idx[0]][0];
      const x1 = pos[idx[idx.length - 1]][1];
      const g = h('g', {}, s1marks);
      const line = h('path', { d: `M${x0} 492 L${x1} 492`, stroke: ROLE_COL[ri], 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, g) as Path;
      const tick = h('path', { d: `M${(x0 + x1) / 2} 500 L${(x0 + x1) / 2} 516`, stroke: ROLE_COL[ri], 'stroke-width': 1.5, 'stroke-opacity': 0.6 }, g);
      const lab = mono(g, (x0 + x1) / 2, 540, label, 14, ROLE_COL[ri], 'middle', 0.2, 500);
      roleEls.push({ line, tick, lab });
    });
  }
  layoutS1();

  /* ---------- scene 2: graph ---------- */
  const nodes = NODES.map((n, i) => ({ ...n, l: copy.nodes[i] ?? '', d: Math.hypot(n.x, n.y) + i * 3, cx: n.x as number, cy: n.y as number }));
  const s2 = h('g');
  const docsG = h('g', {}, s2);
  const docEls = DOC_Y.map((y, i) => {
    const g = h('g', {}, docsG);
    h('path', { d: `M180 ${y - 45} h48 l18 18 v72 h-66 z`, fill: C.panel, stroke: 'rgba(255,255,255,.35)', 'stroke-width': 1.5 }, g);
    h('path', { d: `M228 ${y - 45} v18 h18`, fill: 'none', stroke: 'rgba(255,255,255,.35)', 'stroke-width': 1.5 }, g);
    [-16, -5, 6, 17].forEach((dy, j) => h('rect', { x: 191, y: y + dy, width: j === 3 ? 28 : 42, height: 4, rx: 2, fill: '#fff', 'fill-opacity': 0.25 }, g));
    mono(g, 213, y + 66, copy.docs[i] ?? '', 13, C.grey, 'middle', 0.2);
    return g;
  });
  const provG = h('g', {}, s2);
  const graphG = h('g', {}, s2);
  const edgeG = h('g', {}, graphG);
  const nodeG = h('g', {}, graphG);
  const edgeEls = EDGES.map(() => h('path', { stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1.4, fill: 'none' }, edgeG) as Path);
  const nodeEls = nodes.map((n) => {
    const g = h('g', {}, nodeG);
    const col = KIND[n.k];
    const big = n.k === 'obl' || n.k === 'perm';
    const halo = h('circle', { r: big ? 30 : 20, fill: col, 'fill-opacity': 0.28, filter: soft }, g);
    if (big) {
      h('circle', { r: 13, fill: C.bg, stroke: col, 'stroke-width': 3 }, g);
      h('circle', { r: 5, fill: col }, g);
    } else {
      h('circle', { r: n.k === 'ent' ? 9 : 6.5, fill: col }, g);
    }
    const ring = h('circle', { r: big ? 24 : 18, fill: 'none', stroke: C.warn, 'stroke-width': 3, opacity: 0 }, g);
    const lab = mono(g, 0, big ? 40 : 28, n.l, 13, C.grey, 'middle', 0.08);
    return { g, halo, ring, lab };
  });
  const provEls = nodes.map(() => ({
    p: h('path', { stroke: C.b1, 'stroke-opacity': 0.35, 'stroke-width': 1.2, fill: 'none', 'stroke-dasharray': '3 6' }, provG) as Path,
    dot: h('circle', { r: 3.5, fill: C.b1 }, provG),
  }));
  const appear = nodes.map((n, i) => (i === 0 ? 12.3 : 12.35 + (n.d / 700) * 2.6));

  /* ---------- requirement cards (scenes 3-5) ---------- */
  // lines drawn from graph nodes to other panels sit behind the graph
  const backG = h('g');
  root.insertBefore(backG, s2);

  /* ---------- scene 3: plugin for Claude Code and Codex ---------- */
  const pl = copy.plugin;
  const P2X = 900;
  const P2Y = 176;
  const P2W = 880;
  const P2H = 520;
  const sP = h('g');
  const pPanel = h('g', {}, sP);
  h('rect', { x: P2X, y: P2Y, width: P2W, height: P2H, rx: 12, fill: C.panel, 'fill-opacity': 0.95, stroke: 'rgba(255,255,255,.18)', 'stroke-width': 1.2 }, pPanel);
  h('path', { d: `M${P2X} ${P2Y + 70} h${P2W}`, stroke: 'rgba(255,255,255,.10)' }, pPanel);
  const tabPill = h('rect', { x: P2X + 22, y: P2Y + 18, width: 170, height: 34, rx: 17, fill: '#fff', 'fill-opacity': 0.1, stroke: 'rgba(255,255,255,.35)' }, pPanel);
  const tabTxt = pl.tabs.map((tb, k) => mono(pPanel, P2X + 107 + k * 180, P2Y + 41, tb, 14, C.grey, 'middle', 0.16, 500));
  mono(pPanel, P2X + P2W - 26, P2Y + 41, pl.header, 13, C.b3, 'end', 0.22, 500);
  const PL = (dy: number) => P2Y + dy;
  const q1 = mono(sP, P2X + 34, PL(124), '', 21, C.ink, 'start', 0, 400);
  const call1 = h('text', { x: P2X + 34, y: PL(172), 'font-size': 18, class: 'font-mono', fill: C.b1 }, sP);
  h('tspan', { fill: C.b3 }, call1, '●  ');
  h('tspan', {}, call1, `ormentis  ·  ${pl.call1}`);
  const ans = h('text', { x: P2X + 34, y: PL(236), 'font-size': 30, fill: C.ink, 'font-weight': 500 }, sP, pl.answer);
  const src1 = mono(sP, P2X + 34, PL(272), pl.source, 14, C.grey, 'start', 0.18, 500);
  const q2 = mono(sP, P2X + 34, PL(348), '', 21, C.ink, 'start', 0, 400);
  const call2 = h('text', { x: P2X + 34, y: PL(396), 'font-size': 18, class: 'font-mono', fill: C.b1 }, sP);
  h('tspan', { fill: C.b3 }, call2, '●  ');
  h('tspan', {}, call2, `ormentis  ·  ${pl.call2}`);
  const done = h('g', {}, sP);
  h('path', { d: `M${P2X + 36} ${PL(448)} l7 7 l13 -15`, stroke: C.b3, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, done);
  h('text', { x: P2X + 70, y: PL(456), 'font-size': 24, fill: C.b3, 'font-weight': 500 }, done, pl.done);
  const versus = h('text', { x: P2X + P2W / 2, y: 768, 'font-size': 30, 'text-anchor': 'middle', 'font-weight': 600, class: 'font-display' }, sP);
  pl.versus.forEach((part, k) => h('tspan', { fill: k === 0 ? C.b3 : C.grey, style: 'white-space:pre' }, versus, part));
  const firstEx = [q1, call1, ans, src1];
  const qLinks = [0, 1, 2].map(() => h('path', { stroke: C.b1, 'stroke-width': 1.6, fill: 'none', 'stroke-dasharray': '4 6' }, backG) as Path);

  /* ---------- scene 4: services around the graph ---------- */
  const md = copy.modules;
  const FAM_COL = [C.b1, C.b3, C.mag, C.lil];
  const FAM_BOX: [number, number][] = [[140, 170], [1280, 170], [140, 590], [1280, 590]];
  const FAM_CORNER: [number, number][] = [[640, 370], [1280, 370], [640, 590], [1280, 590]];
  const sM = h('g');
  const mLab = mono(sM, 960, 186, md.label, 15, C.grey, 'middle', 0.26, 500);
  const famLinks = FAM_CORNER.map(() => h('path', { stroke: 'rgba(255,255,255,.35)', 'stroke-width': 1.4, fill: 'none' }, backG) as Path);
  const famEls = md.families.map((f, i) => {
    const [x, y] = FAM_BOX[i];
    const g = h('g', {}, sM);
    h('rect', { x, y, width: 500, height: 200, rx: 12, fill: C.panel, 'fill-opacity': 0.94, stroke: FAM_COL[i], 'stroke-opacity': 0.55, 'stroke-width': 1.4 }, g);
    mono(g, x + 28, y + 40, `0${i + 1}`, 13, C.grey, 'start', 0.2, 500);
    h('text', { x: x + 28, y: y + 86, 'font-size': 36, fill: FAM_COL[i], class: 'font-display', 'font-weight': 600 }, g, f.name.toUpperCase());
    const items = f.items.map((it, j) => h('text', { x: x + 28, y: y + 128 + j * 30, 'font-size': 20, fill: '#cfcbe0' }, g, it));
    return { g, items };
  });

  /* ---------- scene 5: change request impact ---------- */
  const ch = copy.change;
  const sC = h('g');
  const crCard = h('g', {}, sC);
  h('rect', { x: 90, y: 140, width: 520, height: 110, rx: 12, fill: C.panel, 'fill-opacity': 0.95, stroke: C.warn, 'stroke-opacity': 0.7, 'stroke-width': 1.6 }, crCard);
  mono(crCard, 114, 178, ch.tag, 14, C.warn, 'start', 0.2, 500);
  h('text', { x: 114, y: 222, 'font-size': 22, fill: C.ink, 'font-weight': 500 }, crCard, ch.text);
  const crArrow = h('path', { stroke: C.warn, 'stroke-width': 2, fill: 'none' }, backG) as Path;
  const impPanel = h('g', {}, sC);
  h('rect', { x: 1360, y: 470, width: 460, height: 260, rx: 12, fill: C.panel, 'fill-opacity': 0.95, stroke: C.warn, 'stroke-opacity': 0.55, 'stroke-width': 1.4 }, impPanel);
  mono(impPanel, 1386, 510, ch.impactLabel, 14, C.warn, 'start', 0.24, 500);
  const impLines = ch.impacts.map((tx, j) => {
    const g = h('g', {}, impPanel);
    h('circle', { cx: 1394, cy: 552 + j * 44, r: 5, fill: C.warn }, g);
    h('text', { x: 1412, y: 560 + j * 44, 'font-size': 23, fill: C.ink, 'font-weight': 500 }, g, tx);
    return g;
  });

  /* ---------- scene 6: consistency of the requirements ---------- */
  const cardsG = h('g');
  const reqsLab = mono(root, 520, 166, copy.reqsLabel, 13, C.b1, 'start', 0.2, 500);
  type Card = { g: SVGGElement; warnBox: SVGElement; chip: SVGGElement; chipBg: SVGElement; chipIcon: SVGElement; chipTxt: SVGElement; cur: string };
  const cards: Card[] = copy.reqs.map((r) => {
    const g = h('g', {}, cardsG);
    h('rect', { width: CW, height: CH, rx: 10, fill: C.panel, 'fill-opacity': 0.92, stroke: 'rgba(255,255,255,.16)', 'stroke-width': 1.2 }, g);
    const warnBox = h('rect', { width: CW, height: CH, rx: 10, fill: 'none', stroke: C.warn, 'stroke-width': 2, opacity: 0 }, g);
    mono(g, 28, 36, r.id, 15, C.b1, 'start', 0.16, 500);
    mono(g, 130, 36, r.permission ? copy.modality.permission : copy.modality.obligation, 12, r.permission ? C.warn : C.b3, 'start', 0.2, 500);
    h('text', { x: 28, y: 72, 'font-size': 22, fill: C.ink, 'font-weight': 500 }, g, r.text);
    mono(g, 28, 98, r.source, 12, C.grey, 'start', 0.16);
    const chip = h('g', {}, g);
    const chipBg = h('rect', { x: CW - 170, y: 16, width: 148, height: 28, rx: 14, 'stroke-width': 1.4 }, chip);
    const chipIcon = h('path', { fill: 'none', 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, chip);
    const chipTxt = mono(chip, CW - 84, 35, '', 12, C.ink, 'middle', 0.18, 500);
    return { g, warnBox, chip, chipBg, chipIcon, chipTxt, cur: '' };
  });
  function setChip(c: Card, kind: string) {
    if (c.cur === kind) return;
    c.cur = kind;
    const x = CW - 150;
    const y = 30;
    const okPath = `M${x - 5} ${y} l4 4 l7 -8`;
    const map: Record<string, [string, string, string]> = {
      ok: [C.b3, copy.chips.ok, okPath],
      conflict: [C.warn, copy.chips.conflict, `M${x} ${y - 7} v8 M${x} ${y + 6} v0.5`],
      covered: [C.b3, copy.chips.covered, okPath],
      missing: [C.warn, copy.chips.missing, `M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10`],
    };
    const m = map[kind];
    if (!m) {
      c.chip.style.display = 'none';
      return;
    }
    c.chip.style.display = '';
    c.chipBg.setAttribute('stroke', m[0]);
    c.chipBg.setAttribute('fill', m[0]);
    c.chipBg.setAttribute('fill-opacity', '.10');
    c.chipIcon.setAttribute('stroke', m[0]);
    c.chipIcon.setAttribute('d', m[2]);
    c.chipTxt.setAttribute('fill', m[0]);
    c.chipTxt.textContent = m[1];
  }

  /* ---------- scene 4 ---------- */
  const s4 = h('g');
  const scanLine = h('rect', { width: 840, height: 2, fill: C.b1 }, s4);
  const scanGlow = h('rect', { y: -10, width: 840, height: 22, fill: C.b1, 'fill-opacity': 0.18, filter: soft }, s4);
  const bracket = h('path', { stroke: C.warn, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }, s4) as Path;
  const conflictLab = h('g', {}, s4);
  mono(conflictLab, 0, 0, copy.conflict[0], 15, C.warn, 'start', 0.22, 500);
  mono(conflictLab, 0, 30, copy.conflict[1], 15, C.grey, 'start', 0.04);
  mono(conflictLab, 0, 54, copy.conflict[2], 15, C.grey, 'start', 0.04);
  const s4sum = mono(s4, 960, 748, copy.summaryCheck, 15, C.grey, 'middle', 0.22);

  /* ---------- scene 7: repeatable and auditable ----------
     Beat A: the same documents, graph built three times. Three different LLMs
     give three different graphs; Ormentis gives the same graph every time.
     Beat B: the audit trail of one answer: what was retrieved and why. */
  const pr = copy.proof;
  const s6 = h('g');
  const s6q = h('g', {}, s6);
  mono(s6q, 960, 182, pr.questionLabel, 15, C.grey, 'middle', 0.24, 500);
  h('text', { x: 960, y: 232, 'font-size': 38, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }, s6q, pr.question);
  const COLX = [160, 1000];
  const COLW = 760;
  const s6head = COLX.map((x, k) => {
    const g = h('g', {}, s6);
    mono(g, x, 294, k ? pr.rightLabel : pr.leftLabel, 15, k ? C.b3 : C.warn, 'start', 0.22, 500);
    h('path', { d: `M${x} 308 h${COLW}`, stroke: k ? C.b3 : C.warn, 'stroke-opacity': 0.55, 'stroke-width': 1.4 }, g);
    return g;
  });
  // small deterministic pseudo-random generator, so every frame draws the same "different" graphs
  const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const MINI = NODES.slice(0, 9);
  const MINI_EDGES = EDGES.filter(([a2, b2]) => a2 < 9 && b2 < 9);
  type Mini = { g: SVGGElement; edges: Path[]; dots: SVGElement[] };
  const minis: Mini[][] = COLX.map((x, k) =>
    [0, 1, 2].map((j) => {
      const bx = x + j * 262;
      const g = h('g', {}, s6);
      h('rect', { x: bx, y: 326, width: 236, height: 196, rx: 10, fill: C.panel, 'fill-opacity': 0.94, stroke: 'rgba(255,255,255,.16)', 'stroke-width': 1.2 }, g);
      mono(g, bx + 118, 510, k ? pr.rightTags[j] : pr.leftTags[j], 12, C.grey, 'middle', 0.2, 500);
      const r = rng(7 + j * 31);
      const pos = MINI.map((n, i) => {
        const jx = k || i === 0 ? 0 : (r() - 0.5) * 260;
        const jy = k || i === 0 ? 0 : (r() - 0.5) * 180;
        return [bx + 118 + (n.x + jx) * 0.19, 414 + (n.y + jy) * 0.26] as [number, number];
      });
      let pairs: [number, number][] = MINI_EDGES;
      if (!k) {
        pairs = MINI_EDGES.filter(() => r() > 0.5);
        for (let e = 0; e < 4; e++) pairs.push([Math.floor(r() * 9), Math.floor(r() * 9)]);
        pairs = pairs.filter(([a2, b2]) => a2 !== b2);
      }
      const edges = pairs.map(([a2, b2]) => h('path', { d: `M${pos[a2][0].toFixed(1)} ${pos[a2][1].toFixed(1)} L${pos[b2][0].toFixed(1)} ${pos[b2][1].toFixed(1)}`, stroke: k ? C.b3 : C.warn, 'stroke-opacity': 0.6, 'stroke-width': 1.4, fill: 'none' }, g) as Path);
      const dropped = k ? -1 : 1 + Math.floor(r() * 8);
      const dots = MINI.map((n, i) => h('circle', { cx: pos[i][0].toFixed(1), cy: pos[i][1].toFixed(1), r: n.k === 'obl' || n.k === 'perm' ? 6 : 4.5, fill: KIND[n.k], opacity: i === dropped ? 0 : 1 }, g));
      return { g, edges, dots };
    })
  );
  const s6verdict = h('g', {}, s6);
  h('text', { x: COLX[0], y: 580, 'font-size': 27, fill: C.warn, 'font-weight': 600, class: 'font-display' }, s6verdict, pr.leftVerdict);
  pr.leftSources.forEach((src, i) => mono(s6verdict, COLX[0], 610 + i * 22, src, 11, C.grey, 'start', 0.06, 500));
  h('text', { x: COLX[1], y: 580, 'font-size': 27, fill: C.b3, 'font-weight': 600, class: 'font-display' }, s6verdict, pr.rightVerdict);
  // beat B: audit trail
  const s6trace = h('g', {}, s6);
  const traceLab = mono(s6trace, 960, 184, pr.traceLabel, 16, C.b3, 'middle', 0.24, 500);
  const TX = 330;
  const ROWS_Y = [252, 352, 468, 590];
  const traceLine = h('path', { d: `M${TX} ${ROWS_Y[0]} V${ROWS_Y[3]}`, stroke: C.b3, 'stroke-opacity': 0.5, 'stroke-width': 2, fill: 'none' }, s6trace) as Path;
  const traceRows = pr.steps.map((st, i) => {
    const y = ROWS_Y[i];
    const g = h('g', {}, s6trace);
    const last = i === pr.steps.length - 1;
    h('circle', { cx: TX, cy: y, r: 9, fill: C.bg, stroke: last ? C.b3 : C.b1, 'stroke-width': 3 }, g);
    mono(g, TX + 34, y - 14, st.label, 13, last ? C.b3 : C.b1, 'start', 0.22, 500);
    h('text', { x: TX + 34, y: y + 20, 'font-size': last ? 27 : 23, fill: C.ink, 'font-weight': last ? 600 : 500 }, g, st.text);
    if (st.why) h('text', { x: TX + 34, y: y + 50, 'font-size': 19, fill: C.grey }, g, st.why);
    return g;
  });

  /* ---------- outro ---------- */
  const outro = h('g');
  const outLogo = logo(outro, 960, 310, 150);
  const outWord = h('text', { x: 960, y: 500, 'font-size': 104, fill: C.ink, class: 'font-display', 'font-weight': 600, 'text-anchor': 'middle', 'letter-spacing': '.04em' }, outro, 'ORMENTIS');
  const outLine = h('text', { x: 960, y: 570, 'font-size': 34, fill: C.lil, 'text-anchor': 'middle', 'font-weight': 400 }, outro, copy.outroLine);
  const outChain = mono(outro, 960, 645, copy.outroChain, 15, C.b1, 'middle', 0.26, 500);
  const outUrl = mono(outro, 960, 740, 'DEEP4IT.COM', 18, C.grey, 'middle', 0.32, 500);

  h('rect', { x: 0, y: 120, width: 1920, height: 700, fill: u('vig'), 'pointer-events': 'none' });

  /* ---------- geometry ---------- */
  // graph position and scale over time: [t, cx, cy, scale]
  const GK: [number, number, number, number][] = [
    [0, GX, GY, 1],
    [20.2, GX, GY, 1],
    [21.6, 440, 440, 0.56],
    [28.3, 440, 440, 0.56],
    [29.3, 960, 480, 0.42],
    [34.9, 960, 480, 0.42],
    [35.9, 820, 450, 0.8],
    [999, 820, 450, 0.8],
  ];
  function graphXform(t: number) {
    for (let i = 0; i < GK.length - 1; i++) {
      const [t0, x0, y0, s0] = GK[i];
      const [t1, x1, y1, s1] = GK[i + 1];
      if (t <= t1) {
        const p = eio(seg(t, t0, t1));
        return { cx: lerp(x0, x1, p), cy: lerp(y0, y1, p), s: lerp(s0, s1, p) };
      }
    }
    return { cx: 820, cy: 450, s: 0.8 };
  }
  const nodeAt = (i: number, gx: { cx: number; cy: number; s: number }) => ({ x: gx.cx + nodes[i].cx * gx.s, y: gx.cy + nodes[i].cy * gx.s });
  const CARD_X = 520;
  const cardY = (i: number) => 186 + i * (CH + 20);
  const typed = (str: string, p: number) => (p >= 1 ? str : str.slice(0, Math.floor(str.length * p)) + '_');

  /* ---------- render ---------- */
  function render(realT: number) {
    const t = toAnim(realT);
    // ambient motion (background, node drift, flowing dots, pulses) keeps running during reading pauses
    const amb = realT / PACE;
    glowEl.setAttribute('cx', (960 + Math.sin(amb * 0.25) * 140).toFixed(1));
    glowEl.setAttribute('cy', (440 + Math.cos(amb * 0.19) * 50).toFixed(1));

    // intro
    set(intro, 1 - eio(seg(t, 3.2, 4.0)));
    introLogo.forEach((l, i) => {
      const p = eo(seg(t, 0.2 + (2 - i) * 0.28, 0.9 + (2 - i) * 0.28));
      set(l, p, 0, (1 - p) * -90);
    });
    const wp = eo(seg(t, 1.1, 2.0));
    set(introWord, wp, 0, (1 - wp) * 30);
    introWord.setAttribute('letter-spacing', `${lerp(0.3, 0.04, wp).toFixed(3)}em`);
    const sp = eo(seg(t, 1.8, 2.6));
    set(introSub, sp, 0, (1 - sp) * 14);

    // scene 1
    const s1on = t >= 3.8 && t < 12.6;
    set(s1, s1on ? 1 : 0);
    if (s1on) {
      set(s1doc, inout(t, 4.0, 4.6, 6.2, 7.0));
      wordEls.forEach((w, i) => {
        const p = eo(seg(t, 4.3 + i * 0.12, 4.8 + i * 0.12));
        const role = words[i][1];
        const cp = seg(t, 6.3 + role * 0.32, 6.7 + role * 0.32);
        w.setAttribute('fill', cp > 0.5 ? ROLE_COL[role] : C.ink);
        w.setAttribute('opacity', p.toFixed(3));
        w.setAttribute('transform', `translate(0 ${((1 - p) * 20).toFixed(2)})`);
      });
      roleEls.forEach((r, ri) => {
        const a = 6.3 + ri * 0.32;
        draw(r.line, eo(seg(t, a, a + 0.5)));
        const lp = eo(seg(t, a + 0.2, a + 0.7));
        set(r.lab, lp, 0, (1 - lp) * -8);
        set(r.tick, lp);
      });
      const cl = eo(seg(t, 8.6, 9.3));
      set(claimLine, cl, 0, (1 - cl) * 14);
      const cp = eio(seg(t, 10.4, 11.4));
      const k = lerp(1, 0.02, cp);
      const coll = `translate(960 470) scale(${k}) translate(-960 -470)`;
      [s1sent, s1marks, claimLine].forEach((g) => g.setAttribute('transform', coll));
      s1sent.setAttribute('opacity', (1 - seg(t, 10.9, 11.4)).toFixed(3));
      s1marks.setAttribute('opacity', (1 - seg(t, 10.4, 11.0)).toFixed(3));
      if (cp > 0) claimLine.setAttribute('opacity', ((1 - seg(t, 10.4, 10.9)) * cl).toFixed(3));
      const np = eo(seg(t, 11.0, 11.6));
      const mv = eio(seg(t, 11.6, 12.4));
      set(s1node, np * (t < 12.4 ? 1 : 0), lerp(960, GX, mv), lerp(470, GY, mv), 0.6 + np * 0.4);
    }

    // scene 2 (graph stays through scene 3)
    const s2on = t >= 12.3 && t < 42.3;
    set(s2, s2on ? 1 : 0);
    if (s2on) {
      const gx = graphXform(t);
      graphG.setAttribute('transform', `translate(${gx.cx.toFixed(2)} ${gx.cy.toFixed(2)}) scale(${gx.s.toFixed(4)})`);
      graphG.setAttribute('opacity', (1 - eio(seg(t, 41.5, 42.2))).toFixed(3));
      const docO = inout(t, 12.6, 13.4, 20.0, 20.7);
      docEls.forEach((d, i) => {
        const p = eo(seg(t, 12.6 + i * 0.2, 13.3 + i * 0.2));
        set(d, Math.min(p, docO), (1 - p) * -30, 0);
      });
      nodes.forEach((n, i) => {
        const p = eo(seg(t, appear[i], appear[i] + 0.5));
        const drift = i ? 5 : 0;
        n.cx = n.x + Math.sin(amb * 0.6 + i * 1.7) * drift;
        n.cy = n.y + Math.cos(amb * 0.5 + i * 1.3) * drift;
        set(nodeEls[i].g, p, n.cx, n.cy, 0.4 + 0.6 * p);
        const imp = IMPACTED.indexOf(i);
        const impT = 37.0 + imp * 0.35;
        const queried = i === 0 || i === 5;
        const qT = i === 0 ? 22.7 : 25.8;
        // labels: full while the graph is built, faint beside the plugin, hidden around the services,
        // and back (bigger, orange) for the nodes hit by the change request
        let labO = eo(seg(t, appear[i] + 0.3, appear[i] + 0.8)) * (1 - 0.75 * eio(seg(t, 20.2, 21.0))) * (1 - eio(seg(t, 28.3, 29.0)));
        const L = nodeEls[i].lab;
        if (t > 35.3) {
          labO = imp >= 0 ? eo(seg(t, impT, impT + 0.4)) : 0.3 * eo(seg(t, 35.8, 36.4)) * (1 - 0.7 * eio(seg(t, 36.8, 37.4)));
          L.setAttribute('font-size', imp >= 0 ? '19' : '13');
          L.setAttribute('fill', imp >= 0 ? C.warn : C.grey);
        } else {
          L.setAttribute('font-size', '13');
          L.setAttribute('fill', C.grey);
        }
        L.setAttribute('opacity', labO.toFixed(3));
        const dimPlug = queried ? 1 : 1 - 0.5 * eio(seg(t, 21.6, 22.4)) * (1 - eio(seg(t, 28.3, 29.0)));
        const dimChange = imp >= 0 ? 1 : 1 - 0.65 * eio(seg(t, 36.8, 37.4));
        nodeEls[i].g.setAttribute('opacity', (p * dimPlug * dimChange).toFixed(3));
        const hlp = queried ? eo(seg(t, qT, qT + 0.4)) * (1 - eio(seg(t, 27.8, 28.4))) : 0;
        const pulse = hlp > 0 ? 1 + 0.25 * Math.sin((amb - qT) * 5) : 1;
        nodeEls[i].halo.setAttribute('transform', `scale(${(1 + hlp * 0.7 * pulse).toFixed(3)})`);
        nodeEls[i].ring.setAttribute('opacity', (imp >= 0 ? eo(seg(t, impT, impT + 0.35)) : 0).toFixed(3));
      });
      EDGES.forEach(([a, b], i) => {
        const st = Math.max(appear[a], appear[b]) + 0.25;
        const e = edgeEls[i];
        e.setAttribute('d', `M${nodes[a].cx.toFixed(1)} ${nodes[a].cy.toFixed(1)} L${nodes[b].cx.toFixed(1)} ${nodes[b].cy.toFixed(1)}`);
        e.__len = null;
        const p = eo(seg(t, st, st + 0.6));
        draw(e, p);
        const hot = IMPACTED.includes(a) && IMPACTED.includes(b) && t > 37.0 + Math.max(IMPACTED.indexOf(a), IMPACTED.indexOf(b)) * 0.35;
        const eo2 = (1 - 0.5 * eio(seg(t, 21.6, 22.4)) * (1 - eio(seg(t, 28.3, 29.0)))) * (hot ? 1 : 1 - 0.6 * eio(seg(t, 36.8, 37.4)));
        e.setAttribute('stroke', hot ? C.warn : 'rgba(255,255,255,.28)');
        e.setAttribute('stroke-width', hot ? '2.4' : '1.4');
        e.setAttribute('opacity', (p > 0 ? eo2 : 0).toFixed(3));
      });
      provG.setAttribute('opacity', inout(t, 16.0, 16.4, 19.8, 20.5).toFixed(3));
      if (t > 15.9 && t < 20.6) {
        nodes.forEach((n, i) => {
          const { p, dot } = provEls[i];
          const dy = DOC_Y[n.s];
          const x1 = GX + n.cx;
          const y1 = GY + n.cy;
          p.setAttribute('d', `M250 ${dy} C 410 ${dy}, ${(x1 - 160).toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`);
          const st = 16.0 + i * 0.1;
          const q = eo(seg(t, st, st + 0.9));
          p.setAttribute('opacity', q.toFixed(3));
          const tp = (((amb - st) * 0.45) % 1 + 1) % 1;
          if (t > st && t < 20) {
            const pt = p.getPointAtLength(p.getTotalLength() * tp);
            dot.setAttribute('cx', pt.x.toFixed(1));
            dot.setAttribute('cy', pt.y.toFixed(1));
            dot.setAttribute('opacity', (Math.sin(tp * Math.PI) * q).toFixed(3));
          } else dot.setAttribute('opacity', '0');
        });
      }
    }

    const gxNow = graphXform(t);

    // scene 3: plugin
    const sPon = t >= 20.4 && t < 28.6;
    sP.style.display = sPon ? '' : 'none';
    if (sPon) {
      const all = 1 - eio(seg(t, 27.8, 28.4));
      const pp = eo(seg(t, 20.6, 21.3));
      set(pPanel, pp * all, (1 - pp) * 40, 0);
      const sw = eio(seg(t, 24.2, 24.6)); // Claude Code -> Codex
      tabPill.setAttribute('transform', `translate(${(sw * 180).toFixed(1)} 0)`);
      tabTxt.forEach((tt, k) => tt.setAttribute('fill', (k === 0 ? sw < 0.5 : sw >= 0.5) ? C.ink : C.grey));
      q1.textContent = `> ${typed(pl.q1, seg(t, 21.4, 22.4))}`;
      set(q1, pp * all);
      set(call1, eo(seg(t, 22.7, 23.0)) * all);
      set(ans, eo(seg(t, 23.1, 23.5)) * all, 0, (1 - eo(seg(t, 23.1, 23.5))) * 8);
      set(src1, eo(seg(t, 23.5, 23.8)) * all);
      const dimFirst = 1 - 0.55 * eio(seg(t, 24.2, 24.6));
      firstEx.forEach((el) => el.setAttribute('opacity', (Number(el.getAttribute('opacity')) * dimFirst).toFixed(3)));
      q2.textContent = `> ${typed(pl.q2, seg(t, 24.7, 25.6))}`;
      set(q2, eo(seg(t, 24.6, 24.7)) * all);
      set(call2, eo(seg(t, 25.8, 26.1)) * all);
      const dp = eo(seg(t, 26.2, 26.6));
      set(done, dp * all, (1 - dp) * 10, 0);
      const vp = eo(seg(t, 26.7, 27.2));
      set(versus, vp * all, 0, (1 - vp) * 12);
      // query lines from the graph to the panel
      ([[0, 22.7, PL(166)], [0, 25.8, PL(390)], [5, 25.8, PL(390)]] as const).forEach(([ni, st, ty], k) => {
        const n = nodeAt(ni, gxNow);
        const L = qLinks[k];
        L.setAttribute('d', `M${n.x.toFixed(1)} ${n.y.toFixed(1)} C ${(n.x + 160).toFixed(1)} ${n.y.toFixed(1)}, ${P2X - 160} ${ty}, ${P2X} ${ty}`);
        L.__len = null;
        const lp = eio(seg(t, st, st + 0.5));
        L.setAttribute('stroke-dasharray', lp < 1 ? `${(L.getTotalLength() * lp).toFixed(1)} 9999` : '4 6');
        L.setAttribute('opacity', (lp > 0 ? all * (k === 0 ? dimFirst : 1) : 0).toFixed(3));
      });
    } else qLinks.forEach((L) => L.setAttribute('opacity', '0'));

    // scene 4: services
    const sMon = t >= 28.8 && t < 35.2;
    sM.style.display = sMon ? '' : 'none';
    if (sMon) {
      const all = 1 - eio(seg(t, 34.4, 35.0));
      set(mLab, eo(seg(t, 29.2, 29.7)) * all);
      famEls.forEach((f, i) => {
        const st = 29.5 + i * 0.55;
        const [cx, cy] = FAM_CORNER[i];
        const L = famLinks[i];
        // short connector from the edge of the graph to the inner corner of the box
        const sx = gxNow.cx + (i % 2 ? 150 : -150);
        const sy = gxNow.cy + (i < 2 ? -60 : 60);
        L.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} L${cx} ${cy}`);
        L.__len = null;
        draw(L, eio(seg(t, st, st + 0.5)));
        L.setAttribute('stroke', FAM_COL[i]);
        L.setAttribute('opacity', (0.7 * all).toFixed(3));
        const bp = eo(seg(t, st + 0.35, st + 0.8));
        set(f.g, bp * all, 0, (1 - bp) * (i < 2 ? -14 : 14));
        f.items.forEach((it, j) => it.setAttribute('opacity', eo(seg(t, st + 0.6 + j * 0.15, st + 0.9 + j * 0.15)).toFixed(3)));
      });
    } else famLinks.forEach((L) => L.setAttribute('opacity', '0'));

    // scene 5: change request
    const sCon = t >= 35.3 && t < 42.2;
    sC.style.display = sCon ? '' : 'none';
    if (sCon) {
      const all = 1 - eio(seg(t, 41.4, 42.0));
      const cp = eo(seg(t, 35.7, 36.3));
      set(crCard, cp * all, (1 - cp) * -30, 0);
      const n0 = nodeAt(0, gxNow);
      crArrow.setAttribute('d', `M610 195 C 760 195, ${n0.x.toFixed(1)} ${(n0.y - 160).toFixed(1)}, ${n0.x.toFixed(1)} ${(n0.y - 22).toFixed(1)}`);
      crArrow.__len = null;
      draw(crArrow, eio(seg(t, 36.4, 37.0)));
      crArrow.setAttribute('opacity', all.toFixed(3));
      const ip = eo(seg(t, 38.8, 39.3));
      set(impPanel, ip * all, (1 - ip) * 30, 0);
      impLines.forEach((g, j) => set(g, eo(seg(t, 39.2 + j * 0.3, 39.6 + j * 0.3))));
    } else crArrow.setAttribute('opacity', '0');

    // scene 6: requirement cards and consistency check
    const cardsOn = t >= 42.1 && t < 49.1;
    cardsG.style.display = cardsOn ? '' : 'none';
    set(reqsLab, inout(t, 42.4, 42.9, 48.2, 48.8));
    if (cardsOn) {
      const allOut = 1 - eio(seg(t, 48.3, 48.9));
      copy.reqs.forEach((_, i) => {
        const c = cards[i];
        const p = eo(seg(t, 42.3 + i * 0.2, 42.8 + i * 0.2));
        set(c.g, p * allOut, CARD_X + (1 - p) * 40, cardY(i));
        const scanT = 43.6 + ((cardY(i) + CH / 2 - 170) / 560) * 1.6;
        const conflicted = i === 0 || i === 2;
        const chip = t >= scanT ? (conflicted ? 'conflict' : 'ok') : '';
        c.warnBox.setAttribute('opacity', (conflicted ? eo(seg(t, scanT, scanT + 0.3)) : 0).toFixed(3));
        setChip(c, chip);
        c.chip.setAttribute('opacity', (chip ? eo(seg(t, scanT, scanT + 0.35)) : 0).toFixed(3));
      });
    }
    const s4on = t >= 43.4 && t < 49.1;
    s4.style.display = s4on ? '' : 'none';
    if (s4on) {
      const allOut = 1 - eio(seg(t, 48.3, 48.9));
      const sy = lerp(170, 730, eio(seg(t, 43.6, 45.2)));
      const so = inout(t, 43.5, 43.7, 45.0, 45.3);
      set(scanLine, so, CARD_X - 40, sy);
      set(scanGlow, so * 0.9, CARD_X - 40, sy);
      const bx = CARD_X + CW;
      const y0 = cardY(0) + CH / 2;
      const y2 = cardY(2) + CH / 2;
      bracket.setAttribute('d', `M${bx + 6} ${y0} H${bx + 70} V${y2} H${bx + 6}`);
      draw(bracket, eio(seg(t, 45.5, 46.4)));
      bracket.setAttribute('opacity', allOut.toFixed(3));
      const lp = eo(seg(t, 46.2, 46.8));
      set(conflictLab, lp * allOut, bx + 96 + (1 - lp) * 12, (y0 + y2) / 2 - 18);
      set(s4sum, eo(seg(t, 46.9, 47.5)) * allOut, 0, (1 - eo(seg(t, 46.9, 47.5))) * 10);
    }

    // scene 7: repeatable and auditable
    const s6on = t >= 48.9 && t < 57.2;
    s6.style.display = s6on ? '' : 'none';
    if (s6on) {
      const all = 1 - eio(seg(t, 56.4, 57.0));
      const beatB = eio(seg(t, 52.8, 53.5)); // 0 = graphs, 1 = audit trail
      const q = eo(seg(t, 49.2, 49.8));
      set(s6q, q * (1 - beatB), 0, (1 - q) * 12);
      const hp = eo(seg(t, 49.5, 50.0));
      s6head.forEach((g) => set(g, hp * (1 - beatB)));
      minis.forEach((col) =>
        col.forEach((m, j) => {
          const st = 49.9 + j * 0.55;
          const p = eo(seg(t, st, st + 0.4));
          set(m.g, p * (1 - beatB), 0, (1 - p) * 14);
          m.edges.forEach((e) => draw(e, eio(seg(t, st + 0.2, st + 0.7))));
        })
      );
      const vv = eo(seg(t, 51.8, 52.3));
      set(s6verdict, vv * (1 - beatB), 0, (1 - vv) * 10);
      set(s6trace, all);
      set(traceLab, eo(seg(t, 53.3, 53.8)));
      draw(traceLine, eio(seg(t, 53.5, 55.8)));
      traceRows.forEach((g, i) => {
        const st = 53.6 + i * 0.6;
        const p = eo(seg(t, st, st + 0.45));
        set(g, p, (1 - p) * 20, 0);
      });
    }

    // outro
    const oon = t >= 57.4;
    set(outro, oon ? 1 : 0);
    if (oon) {
      outLogo.forEach((l, i) => {
        const p = eo(seg(t, 57.6 + (2 - i) * 0.25, 58.3 + (2 - i) * 0.25));
        set(l, p, 0, (1 - p) * -70);
      });
      const w = eo(seg(t, 58.4, 59.2));
      set(outWord, w, 0, (1 - w) * 24);
      outWord.setAttribute('letter-spacing', `${lerp(0.24, 0.04, w).toFixed(3)}em`);
      const l1 = eo(seg(t, 59, 59.8));
      set(outLine, l1, 0, (1 - l1) * 14);
      const l2 = eo(seg(t, 59.6, 60.3));
      set(outChain, l2, 0, (1 - l2) * 10);
      set(outUrl, eo(seg(t, 60.2, 60.9)));
      outro.setAttribute('opacity', (1 - eio(seg(t, 62.4, 63))).toFixed(3));
    }
  }

  return {
    render,
    destroy: () => root.remove(),
  };
}
