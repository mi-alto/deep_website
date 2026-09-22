import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uScroll;
varying float vElev;

// compound sine wave field — amplitude grows as you descend the page
float wave(vec2 p, float t) {
  float amp = 1.15 + min(uScroll * 0.00035, 0.9);
  float w = 0.0;
  w += sin(p.x * 0.55 + t * 0.55) * 0.85;
  w += sin(p.y * 0.42 - t * 0.38) * 0.68;
  w += sin((p.x + p.y) * 0.28 + t * 0.22) * 0.8;
  w += sin(length(p) * 0.5 - t * 0.5) * 0.6;
  w *= amp;
  // mouse ripple: localized force field with smoothstep falloff
  float d = distance(p, uMouse);
  w += sin(d * 3.0 - t * 3.2) * smoothstep(4.5, 0.0, d) * uMouseStrength * 1.8;
  return w;
}

void main() {
  vec3 pos = position;
  float e = wave(pos.xy, uTime);
  pos.z += e;
  vElev = e;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = -mv.z;
  gl_PointSize = clamp(90.0 / dist, 1.0, 3.4);
}
`;

const FRAG = /* glsl */ `
precision highp float;
varying float vElev;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;
  float soft = smoothstep(0.5, 0.08, r);
  // brand gradient: violet in the troughs, magenta on the slopes, white on the crests
  float a = clamp(0.26 + vElev * 0.28, 0.08, 1.0);
  vec3 deep     = vec3(0.24, 0.16, 0.70);
  vec3 lavender = vec3(0.66, 0.55, 1.00);
  vec3 mint     = vec3(0.55, 0.98, 0.80);
  vec3 col = mix(deep, lavender, smoothstep(-1.6, 1.2, vElev));
  col = mix(col, mint, smoothstep(1.0, 2.2, vElev));
  col = mix(col, vec3(1.0), smoothstep(2.0, 2.8, vElev) * 0.6);
  gl_FragColor = vec4(col, a * soft);
}
`;

// drifting current streams — a second particle system with per-particle phases
const STREAM_VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStrength;
attribute float aSeed;
varying float vAlpha;

void main() {
  vec3 p = position;
  float s = aSeed;
  // slow horizontal drift + sinusoidal meander, unique per particle
  p.x = mod(p.x + uTime * (0.25 + s * 0.55) + 14.0, 28.0) - 14.0;
  p.y += sin(uTime * (0.35 + s * 0.6) + s * 43.0) * 1.3;
  p.z += sin(uTime * (0.5 + s * 0.4) + s * 91.0) * 1.1;
  // repelled by the cursor
  vec2 dvec = p.xy - uMouse;
  float d = length(dvec);
  float f = smoothstep(5.0, 0.0, d) * uMouseStrength;
  p.xy += normalize(dvec + 0.0001) * f * 2.6;
  p.z += f * 1.2;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = -mv.z;
  gl_PointSize = clamp((60.0 + s * 90.0) / dist, 0.8, 4.2);
  vAlpha = 0.12 + s * 0.5 + f * 0.5;
}
`;

const STREAM_FRAG = /* glsl */ `
precision highp float;
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;
  float soft = smoothstep(0.5, 0.05, r);
  gl_FragColor = vec4(vec3(0.85, 0.82, 1.0), vAlpha * soft);
}
`;

export default function ParticleField({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    // phones get a lighter field: fewer points, lower DPR cap — same look, a fraction of the GPU work
    const small = mount.clientWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 3.4, 9.2);
    camera.lookAt(0, 0.4, 0);

    const COLS = small ? 120 : 200;
    const ROWS = COLS;
    const W = 22;
    const H = 22;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    let i = 0;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        positions[i++] = (x / (COLS - 1) - 0.5) * W;
        positions[i++] = (y / (ROWS - 1) - 0.5) * H;
        positions[i++] = 0;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseStrength: { value: 0 },
      uScroll: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    points.rotation.x = -Math.PI * 0.4;
    points.position.y = -2.2;
    scene.add(points);

    // ── drifting current streams ─────────────────────────────────────────────
    const S_COUNT = small ? 600 : 1300;
    const sPos = new Float32Array(S_COUNT * 3);
    const sSeed = new Float32Array(S_COUNT);
    for (let j = 0; j < S_COUNT; j++) {
      sPos[j * 3] = (Math.random() - 0.5) * 28;
      sPos[j * 3 + 1] = (Math.random() - 0.5) * 16;
      sPos[j * 3 + 2] = (Math.random() - 0.5) * 8;
      sSeed[j] = Math.random();
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute('aSeed', new THREE.BufferAttribute(sSeed, 1));
    const sMat = new THREE.ShaderMaterial({
      vertexShader: STREAM_VERT,
      fragmentShader: STREAM_FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const streams = new THREE.Points(sGeo, sMat);
    streams.position.y = -1.0;
    scene.add(streams);

    // smoothed pointer (lerp 0.1 — liquid response), tracked across the whole window
    const target = new THREE.Vector2(999, 999);
    const smooth = new THREE.Vector2(999, 999);
    let targetStrength = 0;
    let scrollY = 0;
    let raf = 0;
    const clock = new THREE.Clock();

    const onMove = (ev: PointerEvent) => {
      const nx = ev.clientX / window.innerWidth;
      const ny = ev.clientY / window.innerHeight;
      // map screen -> plane local coords (plane spans W x H, rotated)
      target.set((nx - 0.5) * W, (ny - 0.5) * H);
      targetStrength = 1;
    };
    const onLeave = () => {
      targetStrength = 0;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uScroll.value += (scrollY - uniforms.uScroll.value) * 0.08;
      smooth.lerp(target, 0.1);
      uniforms.uMouse.value.copy(smooth);
      uniforms.uMouseStrength.value += (targetStrength - uniforms.uMouseStrength.value) * 0.06;
      // the field slowly drifts and tilts as you travel down the page
      points.rotation.z = uniforms.uScroll.value * 0.00012;
      streams.rotation.z = -uniforms.uScroll.value * 0.00006;
      camera.position.y = 3.4 + Math.sin(uniforms.uScroll.value * 0.0006) * 0.5;
      camera.lookAt(0, 0.4, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      geo.dispose();
      mat.dispose();
      sGeo.dispose();
      sMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`fx-in ${className ?? ''}`} aria-hidden="true" />;
}
