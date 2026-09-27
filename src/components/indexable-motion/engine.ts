import type { MotionCopy } from '../../i18n/content';

/**
 * Imperative renderer for the "how Indexable works" motion graphic.
 * Everything is a pure function of time: `render(t)` draws the frame at
 * second t, so playback, scrubbing and step jumps are all the same call.
 * The SVG uses viewBox 0 120 1920 700 (the stage only; captions live in HTML).
 */

export const DURATION = 57;
/** [start, end] of each of the five steps, in seconds */
export const STEPS: [number, number][] = [
  [4, 12],
  [12, 20],
  [20, 28],
  [28, 35],
  [35, 43],
  [43, 51],
];

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
  { x: 420, y: 150, k: 'obl', s: 0 },
  { x: 590, y: 30, k: 'cond', s: 0 },
  { x: -390, y: 40, k: 'ent', s: 2 },
  { x: -290, y: 200, k: 'perm', s: 1 },
  { x: 210, y: 230, k: 'obl', s: 1 },
  { x: -400, y: -150, k: 'fact', s: 2 },
  { x: 30, y: -250, k: 'fact', s: 2 },
  { x: 480, y: -200, k: 'ent', s: 0 },
  { x: -560, y: -40, k: 'fact', s: 2 },
  { x: 600, y: 240, k: 'fact', s: 1 },
] as const;
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 10], [2, 11], [2, 4], [4, 5], [5, 6], [4, 12], [12, 5], [0, 9],
  [9, 1], [7, 8], [8, 3], [8, 2], [7, 10], [10, 13], [5, 14], [11, 0], [9, 14], [7, 13],
];
const KIND: Record<string, string> = { obl: C.b3, perm: C.warn, ent: C.b1, cond: C.mag, fact: C.lil };
const REQ_NODE = [0, 5, 8, 9];
const DOC_Y = [250, 430, 610];
const GX = 1010;
const GY = 430;
const CW = 760;
const CH = 112;
const PX = 1060;
const PY = 188;
const PW = 720;
const PH = 482;
const LH = 38;
const L0 = PY + 98;
const CODE: [string, string][][] = [
  [['public ', 'k'], ['Result ', 't'], ['validate', 'f'], ['(Mandate m) {', 'p']],
  [['  if ', 'k'], ['(m.getSignatureDate() == ', 'p'], ['null', 'k'], [') {', 'p']],
  [['    return ', 'k'], ['Result.', 'p'], ['reject', 'f'], ['(', 'p'], ['MISSING_SIGNATURE', 'c'], [');', 'p']],
  [['  }', 'p']],
  [['  if ', 'k'], ['(now().isAfter(', 'p'], ['cutoff', 'f'], ['(m, ', 'p'], ['D_MINUS_1', 'c'], ['))) {', 'p']],
  [['    return ', 'k'], ['Result.', 'p'], ['reject', 'f'], ['(', 'p'], ['LATE_SUBMISSION', 'c'], [');', 'p']],
  [['  }', 'p']],
  [['  return ', 'k'], ['Result.', 'p'], ['accept', 'f'], ['();', 'p']],
  [['}', 'p']],
];
const TOK: Record<string, string> = { k: C.b1, t: C.lil, f: C.ink, p: '#cfcbe0', c: C.b3 };

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
  const introWord = h('text', { x: 960, y: 590, 'font-size': 118, fill: C.ink, class: 'font-display', 'font-weight': 600, 'text-anchor': 'middle', 'letter-spacing': '.04em' }, intro, 'INDEXABLE');
  const introSub = mono(intro, 960, 655, copy.introSub, 18, C.b1, 'middle', 0.32, 500);

  /* ---------- scene 1: grammatical extraction ---------- */
  const ROLE_COL = [C.b1, C.b3, C.ink, C.lil, C.mag];
  const s1 = h('g');
  const s1doc = h('g', {}, s1);
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
    h('path', { d: `M180 ${y - 58} h62 l22 22 v94 h-84 z`, fill: C.panel, stroke: 'rgba(255,255,255,.35)', 'stroke-width': 1.5 }, g);
    h('path', { d: `M242 ${y - 58} v22 h22`, fill: 'none', stroke: 'rgba(255,255,255,.35)', 'stroke-width': 1.5 }, g);
    [-24, -10, 4, 18].forEach((dy, j) => h('rect', { x: 194, y: y + dy, width: j === 3 ? 34 : 54, height: 4, rx: 2, fill: '#fff', 'fill-opacity': 0.25 }, g));
    mono(g, 222, y + 84, copy.docs[i], 13, C.grey, 'middle', 0.2);
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
    const lab = mono(g, 0, big ? 40 : 28, n.l, 13, C.grey, 'middle', 0.08);
    return { g, halo, lab };
  });
  const provEls = nodes.map(() => ({
    p: h('path', { stroke: C.b1, 'stroke-opacity': 0.35, 'stroke-width': 1.2, fill: 'none', 'stroke-dasharray': '3 6' }, provG) as Path,
    dot: h('circle', { r: 3.5, fill: C.b1 }, provG),
  }));
  const appear = nodes.map((n, i) => (i === 0 ? 12.3 : 12.35 + (n.d / 700) * 2.6));

  /* ---------- requirement cards (scenes 3-5) ---------- */
  const linkG = h('g');
  const cardsG = h('g');
  const reqsLab = mono(root, 960, 166, copy.reqsLabel, 13, C.b1, 'start', 0.2, 500);
  const reqLinks = copy.reqs.map(() => h('path', { stroke: C.b3, 'stroke-width': 1.6, fill: 'none', 'stroke-opacity': 0.8 }, linkG) as Path);
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

  /* ---------- scene 5: code ---------- */
  const s5 = h('g');
  const panel = h('g', {}, s5);
  h('rect', { x: PX, y: PY, width: PW, height: PH, rx: 10, fill: C.panel, stroke: 'rgba(255,255,255,.16)', 'stroke-width': 1.2 }, panel);
  h('path', { d: `M${PX} ${PY + 52} h${PW}`, stroke: 'rgba(255,255,255,.10)' }, panel);
  mono(panel, PX + 26, PY + 33, 'MandateValidator.java', 13, C.grey, 'start', 0.08);
  mono(panel, PX + PW - 26, PY + 33, 'payments-core', 12, C.grey, 'end', 0.16);
  const hl = [[1, 3], [4, 6]].map(([a, b]) =>
    h('rect', { x: PX + 12, y: L0 + (a - 1) * LH - 26, width: PW - 24, height: (b - a + 1) * LH - 2, rx: 6, fill: C.b3, 'fill-opacity': 0.1, stroke: C.b3, 'stroke-opacity': 0.5 }, s5)
  );
  const codeLines = CODE.map((toks, i) => {
    const g = h('g', {}, s5);
    mono(g, PX + 46, L0 + i * LH, String(i + 1), 15, 'rgba(255,255,255,.3)', 'end', 0);
    const t = h('text', { x: PX + 66, y: L0 + i * LH, 'font-size': 18, class: 'font-mono' }, g);
    t.style.whiteSpace = 'pre';
    toks.forEach(([s, k]) => h('tspan', { fill: TOK[k] }, t, s));
    return g;
  });
  const missNote = h('g', {}, s5);
  h('rect', { x: PX + 12, y: L0 + 9 * LH - 26, width: PW - 24, height: LH - 2, rx: 6, fill: C.warn, 'fill-opacity': 0.08, stroke: C.warn, 'stroke-opacity': 0.6, 'stroke-dasharray': '5 5' }, missNote);
  mono(missNote, PX + 66, L0 + 9 * LH, copy.missingComment, 17, C.warn, 'start', 0);
  const s5sum = mono(s5, 960, 748, copy.summaryCode, 15, C.grey, 'middle', 0.22);

  /* ---------- scene 6: repeatable and auditable ---------- */
  const pr = copy.proof;
  const s6 = h('g');
  const s6q = h('g', {}, s6);
  mono(s6q, 960, 196, pr.questionLabel, 13, C.grey, 'middle', 0.24);
  h('text', { x: 960, y: 238, 'font-size': 30, fill: C.ink, 'font-weight': 500, 'text-anchor': 'middle' }, s6q, pr.question);
  const PXS = [140, 1020];
  const PWID = 760;
  const s6head = PXS.map((x, k) => {
    const g = h('g', {}, s6);
    h('path', { d: `M${x} 300 h${PWID}`, stroke: k ? C.b3 : C.warn, 'stroke-opacity': 0.6, 'stroke-width': 1.4 }, g);
    mono(g, x, 288, k ? pr.ixLabel : pr.genLabel, 14, k ? C.b3 : C.warn, 'start', 0.24, 500);
    return g;
  });
  function scramble(str: string, p: number, seed: number) {
    const chars = 'abcdefghilmnoprstuvz';
    const keep = Math.floor(str.length * p);
    let out = str.slice(0, keep);
    for (let i = keep; i < str.length; i++) {
      out += str[i] === ' ' ? ' ' : chars[(i * 7 + seed * 13) % chars.length];
    }
    return out;
  }
  const s6rows = PXS.map((x, k) =>
    [0, 1, 2].map((r) => {
      const y = 322 + r * 96;
      const g = h('g', {}, s6);
      const box = h('rect', { x, y, width: PWID, height: 80, rx: 10, fill: C.panel, 'fill-opacity': 0.92, stroke: 'rgba(255,255,255,.16)', 'stroke-width': 1.2 }, g);
      mono(g, x + 24, y + 28, `${pr.run} ${r + 1}`, 12, C.grey, 'start', 0.2, 500);
      const fp = k ? pr.ixPrint : pr.genPrints[r];
      mono(g, x + PWID - 24, y + 28, `${pr.print}  ${fp}`, 12, k ? C.b3 : C.warn, 'end', 0.12, 500);
      const final = k ? pr.ixAnswer : pr.genAnswers[r];
      const txt = h('text', { x: x + 24, y: y + 60, 'font-size': 21, fill: C.ink, 'font-weight': 500 }, g, final);
      const flag = h('g', { opacity: 0 }, g);
      const fx = x + PWID - 30;
      if (k) h('path', { d: `M${fx - 7} ${y + 54} l5 5 l9 -10`, stroke: C.b3, 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, flag);
      else h('path', { d: `M${fx - 6} ${y + 48} l12 12 M${fx + 6} ${y + 48} l-12 12`, stroke: C.warn, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, flag);
      return { g, box, txt, flag, final };
    })
  );
  const s6verdict = PXS.map((x, k) => mono(s6, x, 634, k ? pr.ixVerdict : pr.genVerdict, 13, k ? C.b3 : C.warn, 'start', 0.2, 500));
  const s6trace = h('path', { d: `M${1020 + PWID / 2} ${322 + 2 * 96 + 80} C ${1400} 700, 1200 700, 960 ${716}`, stroke: C.b3, 'stroke-width': 1.8, fill: 'none', 'stroke-dasharray': '0' }, s6) as Path;
  const s6src = h('g', {}, s6);
  mono(s6src, 960, 740, pr.traceLabel, 12, C.b3, 'middle', 0.24, 500);
  const srcSentence = copy.sentence.words.map((w) => w[0]).join(' ');
  const s6srcTxt = h('text', { x: 960, y: 776, 'font-size': 22, fill: C.lil, 'text-anchor': 'middle' }, s6src);
  h('tspan', { fill: C.grey, class: 'font-mono', 'font-size': 14 }, s6srcTxt, `${pr.traceSource}   `);
  h('tspan', {}, s6srcTxt, srcSentence);
  const srcW = s6srcTxt.getComputedTextLength();
  const s6srcLine = h('path', { d: `M${960 - srcW / 2} 790 L${960 + srcW / 2} 790`, stroke: C.b3, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' }, s6src) as Path;

  /* ---------- outro ---------- */
  const outro = h('g');
  const outLogo = logo(outro, 960, 310, 150);
  const outWord = h('text', { x: 960, y: 500, 'font-size': 104, fill: C.ink, class: 'font-display', 'font-weight': 600, 'text-anchor': 'middle', 'letter-spacing': '.04em' }, outro, 'INDEXABLE');
  const outLine = h('text', { x: 960, y: 570, 'font-size': 34, fill: C.lil, 'text-anchor': 'middle', 'font-weight': 400 }, outro, copy.outroLine);
  const outChain = mono(outro, 960, 645, copy.outroChain, 15, C.b1, 'middle', 0.26, 500);
  const outUrl = mono(outro, 960, 740, 'DEEP4IT.COM', 18, C.grey, 'middle', 0.32, 500);

  h('rect', { x: 0, y: 120, width: 1920, height: 700, fill: u('vig'), 'pointer-events': 'none' });

  /* ---------- geometry ---------- */
  function graphXform(t: number) {
    const p = eio(seg(t, 20.2, 21.6));
    return { s: lerp(1, 0.56, p), cx: lerp(GX, 440, p), cy: lerp(GY, 430, p) };
  }
  function cardPos(i: number, t: number) {
    let x = 960;
    let y = 186 + i * (CH + 20);
    x = lerp(x, 520, eio(seg(t, 28.2, 29.2)));
    const p5 = eio(seg(t, 35.4, 36.6));
    const y5 = [230, 368, 368, 506][i];
    x = lerp(x, 140, p5);
    y = lerp(y, y5, p5);
    return { x, y };
  }

  /* ---------- render ---------- */
  function render(t: number) {
    glowEl.setAttribute('cx', (960 + Math.sin(t * 0.25) * 140).toFixed(1));
    glowEl.setAttribute('cy', (440 + Math.cos(t * 0.19) * 50).toFixed(1));

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
    const s2on = t >= 12.3 && t < 28.6;
    set(s2, s2on ? 1 : 0);
    if (s2on) {
      const gx = graphXform(t);
      graphG.setAttribute('transform', `translate(${gx.cx.toFixed(2)} ${gx.cy.toFixed(2)}) scale(${gx.s.toFixed(4)})`);
      graphG.setAttribute('opacity', (1 - eio(seg(t, 27.9, 28.6))).toFixed(3));
      const docO = inout(t, 12.6, 13.4, 20.0, 20.7);
      docEls.forEach((d, i) => {
        const p = eo(seg(t, 12.6 + i * 0.2, 13.3 + i * 0.2));
        set(d, Math.min(p, docO), (1 - p) * -30, 0);
      });
      nodes.forEach((n, i) => {
        const p = eo(seg(t, appear[i], appear[i] + 0.5));
        const drift = i ? 5 : 0;
        n.cx = n.x + Math.sin(t * 0.6 + i * 1.7) * drift;
        n.cy = n.y + Math.cos(t * 0.5 + i * 1.3) * drift;
        set(nodeEls[i].g, p, n.cx, n.cy, 0.4 + 0.6 * p);
        const labO = eo(seg(t, appear[i] + 0.3, appear[i] + 0.8)) * (1 - 0.75 * eio(seg(t, 20.2, 21.0)));
        nodeEls[i].lab.setAttribute('opacity', labO.toFixed(3));
        const isReq = REQ_NODE.includes(i);
        const hlp = isReq ? eo(seg(t, 21.2, 21.8)) : 0;
        const dim = isReq ? 1 : lerp(1, 0.45, eio(seg(t, 20.8, 21.6)));
        nodeEls[i].g.setAttribute('opacity', (p * dim).toFixed(3));
        const pulse = isReq && t > 21.2 ? 1 + 0.25 * Math.sin((t - 21.2) * 4) : 1;
        nodeEls[i].halo.setAttribute('transform', `scale(${(1 + hlp * 0.6 * pulse).toFixed(3)})`);
      });
      EDGES.forEach(([a, b], i) => {
        const st = Math.max(appear[a], appear[b]) + 0.25;
        const e = edgeEls[i];
        e.setAttribute('d', `M${nodes[a].cx.toFixed(1)} ${nodes[a].cy.toFixed(1)} L${nodes[b].cx.toFixed(1)} ${nodes[b].cy.toFixed(1)}`);
        e.__len = null;
        const p = eo(seg(t, st, st + 0.6));
        draw(e, p);
        e.setAttribute('opacity', (p > 0 ? lerp(1, 0.5, eio(seg(t, 20.8, 21.6))) : 0).toFixed(3));
      });
      provG.setAttribute('opacity', inout(t, 16.0, 16.4, 19.8, 20.5).toFixed(3));
      if (t > 15.9 && t < 20.6) {
        nodes.forEach((n, i) => {
          const { p, dot } = provEls[i];
          const dy = DOC_Y[n.s];
          const x1 = GX + n.cx;
          const y1 = GY + n.cy;
          p.setAttribute('d', `M268 ${dy} C 428 ${dy}, ${(x1 - 160).toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`);
          const st = 16.0 + i * 0.1;
          const q = eo(seg(t, st, st + 0.9));
          p.setAttribute('opacity', q.toFixed(3));
          const tp = (((t - st) * 0.45) % 1 + 1) % 1;
          if (t > st && t < 20) {
            const pt = p.getPointAtLength(p.getTotalLength() * tp);
            dot.setAttribute('cx', pt.x.toFixed(1));
            dot.setAttribute('cy', pt.y.toFixed(1));
            dot.setAttribute('opacity', (Math.sin(tp * Math.PI) * q).toFixed(3));
          } else dot.setAttribute('opacity', '0');
        });
      }
    }

    // cards
    const cardsOn = t >= 21 && t < 43.9;
    cardsG.style.display = cardsOn ? '' : 'none';
    linkG.style.display = cardsOn ? '' : 'none';
    if (cardsOn) {
      const gx = graphXform(t);
      const allOut = 1 - eio(seg(t, 43, 43.8));
      copy.reqs.forEach((r, i) => {
        const c = cards[i];
        const st = 21.9 + i * 0.85;
        const p = eo(seg(t, st + 0.45, st + 1.0));
        const pos = cardPos(i, t);
        let o = p * allOut;
        if (i === 2) o *= 1 - eio(seg(t, 35.1, 35.7));
        set(c.g, o, pos.x + (1 - p) * 40, pos.y);
        if (t < 35) {
          const n = nodes[REQ_NODE[i]];
          const nx = gx.cx + n.cx * gx.s;
          const ny = gx.cy + n.cy * gx.s;
          const ex = pos.x;
          const ey = pos.y + CH / 2;
          const L = reqLinks[i];
          L.setAttribute('d', `M${nx.toFixed(1)} ${ny.toFixed(1)} C ${(nx + 180).toFixed(1)} ${ny.toFixed(1)}, ${(ex - 180).toFixed(1)} ${ey.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`);
          L.__len = null;
          draw(L, eo(seg(t, st, st + 0.6)));
          L.setAttribute('stroke', r.permission ? C.warn : C.b3);
          L.setAttribute('opacity', (1 - eio(seg(t, 27.6, 28.3))).toFixed(3));
        }
        let chip = '';
        let chipT = 0;
        const scanT = 29.2 + ((186 + i * (CH + 20) + CH / 2 - 170) / 560) * 1.6;
        const conflicted = i === 0 || i === 2;
        if (t >= scanT && t < 35.2) {
          chip = conflicted ? 'conflict' : 'ok';
          chipT = scanT;
        }
        c.warnBox.setAttribute('opacity', (conflicted ? inout(t, scanT, scanT + 0.3, 35.0, 35.6) : 0).toFixed(3));
        const covT = [37.8, 38.9, 0, 40.0][i];
        if (covT && t >= covT + 0.5) {
          chip = i === 3 ? 'missing' : 'covered';
          chipT = covT + 0.5;
        }
        setChip(c, chip);
        c.chip.setAttribute('opacity', (chip ? eo(seg(t, chipT, chipT + 0.35)) : 0).toFixed(3));
      });
    }

    // label over the proposed requirements (scene 3 only)
    set(reqsLab, inout(t, 22.2, 22.8, 27.4, 28.0));

    // scene 4
    const s4on = t >= 28 && t < 35.8;
    s4.style.display = s4on ? '' : 'none';
    if (s4on) {
      const sy = lerp(170, 730, eio(seg(t, 29.2, 30.8)));
      const so = inout(t, 29.1, 29.3, 30.6, 30.9);
      set(scanLine, so, 480, sy);
      set(scanGlow, so * 0.9, 480, sy);
      const bx = 520 + CW;
      const y0 = 186 + CH / 2;
      const y2 = 186 + 2 * (CH + 20) + CH / 2;
      bracket.setAttribute('d', `M${bx + 6} ${y0} H${bx + 70} V${y2} H${bx + 6}`);
      draw(bracket, eio(seg(t, 31.0, 32.0)));
      const bo = 1 - eio(seg(t, 34.9, 35.5));
      bracket.setAttribute('opacity', bo.toFixed(3));
      const lp = eo(seg(t, 31.7, 32.3));
      set(conflictLab, Math.min(lp, bo), bx + 96 + (1 - lp) * 12, (y0 + y2) / 2 - 18);
      set(s4sum, inout(t, 32.4, 33.0, 34.8, 35.3), 0, (1 - eo(seg(t, 32.4, 33))) * 10);
    }

    // scene 5
    const s5on = t >= 35.3 && t < 43.9;
    s5.style.display = s5on ? '' : 'none';
    if (s5on) {
      const all = 1 - eio(seg(t, 43, 43.8));
      const pp = eo(seg(t, 35.6, 36.4));
      set(panel, pp * all, (1 - pp) * 40, 0);
      codeLines.forEach((g, i) => {
        const p = eo(seg(t, 36.1 + i * 0.13, 36.4 + i * 0.13));
        set(g, p * all, (1 - p) * 10, 0);
      });
      [37.8, 38.9].forEach((st, k) => hl[k].setAttribute('opacity', (eo(seg(t, st + 0.3, st + 0.7)) * all).toFixed(3)));
      const mp = eo(seg(t, 40.4, 40.9));
      set(missNote, mp * all, (1 - mp) * 10, 0);
      const sm = eo(seg(t, 41.3, 41.9));
      set(s5sum, sm * all, 0, (1 - sm) * 10);
    }
    if (t >= 35 && t < 43.9) {
      const all = 1 - eio(seg(t, 43, 43.8));
      ([[0, 37.8, 1, 3], [1, 38.9, 4, 6], [3, 40.0, 0, 0]] as const).forEach(([i, st, a, b]) => {
        const L = reqLinks[i];
        const pos = cardPos(i, t);
        const sx = pos.x + CW;
        const sy = pos.y + CH / 2;
        const ty = a ? L0 + ((a + b) / 2 - 1) * LH - 8 : L0 + 9 * LH - 8;
        L.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} C ${(sx + 90).toFixed(1)} ${sy.toFixed(1)}, ${PX - 90} ${ty.toFixed(1)}, ${PX} ${ty.toFixed(1)}`);
        L.__len = null;
        draw(L, eo(seg(t, st, st + 0.5)));
        L.setAttribute('stroke', a ? C.b3 : C.warn);
        L.setAttribute('opacity', (t > st ? all : 0).toFixed(3));
      });
      reqLinks[2].setAttribute('opacity', '0');
    }

    // scene 6: repeatable and auditable
    const s6on = t >= 42.9 && t < 51.2;
    s6.style.display = s6on ? '' : 'none';
    if (s6on) {
      const all = 1 - eio(seg(t, 50.3, 51.0));
      const q = eo(seg(t, 43.3, 43.9));
      set(s6q, q * all, 0, (1 - q) * 12);
      const hp = eo(seg(t, 43.6, 44.2));
      const leftDim = lerp(1, 0.32, eio(seg(t, 47.2, 47.9)));
      set(s6head[0], hp * all * leftDim);
      set(s6head[1], hp * all);
      [0, 1, 2].forEach((r) => {
        const st = 44.1 + r * 0.8;
        const p = eo(seg(t, st, st + 0.45));
        const L = s6rows[0][r];
        const R = s6rows[1][r];
        set(L.g, p * all * leftDim, (1 - p) * -24, 0);
        set(R.g, p * all, (1 - p) * 24, 0);
        // generative text shuffles before settling; Indexable text is stable from the start
        const scr = seg(t, st, st + 0.7);
        L.txt.textContent = scr < 1 ? scramble(L.final, scr, r * 7 + Math.floor(t * 24)) : L.final;
        const vp = eo(seg(t, 46.4 + r * 0.12, 46.8 + r * 0.12));
        L.flag.setAttribute('opacity', (vp).toFixed(3));
        R.flag.setAttribute('opacity', (vp).toFixed(3));
      });
      const vv = eo(seg(t, 46.7, 47.2));
      set(s6verdict[0], vv * all * leftDim, 0, (1 - vv) * 8);
      set(s6verdict[1], vv * all, 0, (1 - vv) * 8);
      // audit trail: from the Indexable answer back to the source sentence
      const glow = eo(seg(t, 47.4, 47.9));
      s6rows[1][2].box.setAttribute('stroke', glow > 0.5 ? C.b3 : 'rgba(255,255,255,.16)');
      draw(s6trace, eio(seg(t, 47.8, 48.7)));
      s6trace.setAttribute('opacity', all.toFixed(3));
      const sp = eo(seg(t, 48.5, 49.1));
      set(s6src, sp * all, 0, (1 - sp) * 10);
      draw(s6srcLine, eo(seg(t, 48.8, 49.5)));
    }

    // outro
    const oon = t >= 51.4;
    set(outro, oon ? 1 : 0);
    if (oon) {
      outLogo.forEach((l, i) => {
        const p = eo(seg(t, 51.6 + (2 - i) * 0.25, 52.3 + (2 - i) * 0.25));
        set(l, p, 0, (1 - p) * -70);
      });
      const w = eo(seg(t, 52.4, 53.2));
      set(outWord, w, 0, (1 - w) * 24);
      outWord.setAttribute('letter-spacing', `${lerp(0.24, 0.04, w).toFixed(3)}em`);
      const l1 = eo(seg(t, 53.0, 53.8));
      set(outLine, l1, 0, (1 - l1) * 14);
      const l2 = eo(seg(t, 53.6, 54.3));
      set(outChain, l2, 0, (1 - l2) * 10);
      set(outUrl, eo(seg(t, 54.2, 54.9)));
      outro.setAttribute('opacity', (1 - eio(seg(t, 56.4, 57))).toFixed(3));
    }
  }

  return {
    render,
    destroy: () => root.remove(),
  };
}
