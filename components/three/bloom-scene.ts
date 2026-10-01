// WebGL scene for the hero bloom. Loaded lazily (only after the capability gate passes).
// Lifecycle mirrors the founders' terrain scene: 30 fps ambient cap, frame-health downgrade,
// offscreen and hidden-tab pause, resize tracking, context-loss fallback, full disposal.
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { colors } from '@/lib/tokens';
import { buildBloom } from './bloom-geometry';

export interface BloomOptions {
  paused: boolean;
  onReady: () => void;
  onFail: () => void;
}

export interface BloomScene {
  setPaused: (paused: boolean) => void;
  dispose: () => void;
}

const yieldToMain = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
const noop: BloomScene = { setPaused: () => {}, dispose: () => {} };

export async function mountBloom(canvas: HTMLCanvasElement, opts: BloomOptions): Promise<BloomScene> {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: true,
  });
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(new Color(colors.bg), 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 20);
  camera.up.set(0, 0, 1);
  const target = new Vector3(0, 0, 0.18);
  camera.position.set(0, -2.55, 2.35);
  camera.lookAt(target);

  const geometry = buildBloom();
  const group = new Group();
  scene.add(group);

  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new Float32BufferAttribute(geometry.lines, 3));
  lineGeo.setAttribute('color', new Float32BufferAttribute(geometry.colors, 3));
  const lineMat = new LineBasicMaterial({ vertexColors: true });
  group.add(new LineSegments(lineGeo, lineMat));
  await yieldToMain();

  const occluderGeo = new BufferGeometry();
  occluderGeo.setAttribute('position', new Float32BufferAttribute(geometry.occluder, 3));
  const occluderMat = new MeshBasicMaterial({
    color: new Color(colors.bg),
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  group.add(new Mesh(occluderGeo, occluderMat));
  await yieldToMain();

  let paused = opts.paused;
  let dirty = true;
  let visible = true;
  let raf = 0;
  let last = 0;
  let t = 0;
  let disposed = false;
  const samples: number[] = [];
  let prevTick = 0;
  let warmup = 5;
  let sampled = false;

  // Pointer parallax (fine pointers only): the bloom leans gently towards the cursor.
  let tiltX = 0;
  let tiltY = 0;
  let aimX = 0;
  let aimY = 0;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onPointer = (e: PointerEvent) => {
    aimY = ((e.clientX / window.innerWidth) * 2 - 1) * 0.08;
    aimX = -((e.clientY / window.innerHeight) * 2 - 1) * 0.08;
  };
  if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // setSize clears the drawing buffer, so draw again even while paused (the loop is stopped then).
    dirty = true;
    schedule();
  };

  const frame = (now: number) => {
    raf = 0;
    if (disposed) return;
    if (prevTick && !sampled) {
      if (warmup > 0) warmup--;
      else samples.push(now - prevTick);
    }
    prevTick = now;
    const ambient = !paused;
    if (ambient && now - last < 33 && !dirty) {
      schedule();
      checkHealth();
      return;
    }
    const dt = last ? Math.min(now - last, 100) : 16;
    last = now;
    if (ambient) {
      t += dt / 1000;
      group.rotation.z = t * 0.04;
      group.scale.z = 1 + 0.06 * Math.sin(t * 0.8);
      tiltX += (aimX - tiltX) * 0.04;
      tiltY += (aimY - tiltY) * 0.04;
      group.rotation.x = tiltX;
      group.rotation.y = tiltY;
    }
    renderer.render(scene, camera);
    dirty = false;
    if (checkHealth()) return;
    if (ambient || dirty) schedule();
    else prevTick = 0;
  };

  /** After 60 real ticks: median > 20 ms → DPR 1; > 33 ms → give up and keep the static poster. */
  function checkHealth(): boolean {
    if (sampled || samples.length < 60) return false;
    sampled = true;
    const median = [...samples].sort((a, b) => a - b)[30];
    if (median > 33) {
      fail();
      return true;
    }
    if (median > 20 && dpr > 1) {
      dpr = 1;
      renderer.setPixelRatio(dpr);
      resize();
    }
    return false;
  }

  const schedule = () => {
    if (!raf && visible && !disposed && !document.hidden) raf = requestAnimationFrame(frame);
    else if (!raf) prevTick = 0;
  };
  const kick = () => {
    dirty = true;
    schedule();
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const onVisibility = () => {
    if (!document.hidden) kick();
  };
  document.addEventListener('visibilitychange', onVisibility);
  const onLost = (e: Event) => {
    e.preventDefault();
    fail();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  function teardown() {
    if (disposed) return;
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointer);
    canvas.removeEventListener('webglcontextlost', onLost);
    lineGeo.dispose();
    occluderGeo.dispose();
    lineMat.dispose();
    occluderMat.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  function fail() {
    teardown();
    opts.onFail();
  }

  resize();
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    fail();
    return noop;
  }
  if (disposed) return noop;
  renderer.render(scene, camera);
  opts.onReady();
  schedule();

  return {
    setPaused: (p) => {
      paused = p;
      kick();
    },
    dispose: teardown,
  };
}
