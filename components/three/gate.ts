// Capability gate and scheduling for the WebGL hero. Only capable desktops ever fetch three.js.
export const MOTION_KEY = 'rb-motion';

export function canGoLive(): boolean {
  const mq = (q: string) => window.matchMedia(q).matches;
  if (!mq('(hover: hover) and (pointer: fine)')) return false;
  if (!mq('(min-width: 1024px)')) return false;
  if (mq('(prefers-reduced-motion: reduce)')) return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && nav.connection.effectiveType !== '4g') return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    return false;
  }
  return true;
}

/** At least 2 s after load, when the browser is idle (Safari has no requestIdleCallback). */
export function whenQuiet(cb: () => void) {
  const idle = () => {
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(cb, { timeout: 3000 });
    else setTimeout(cb, 1500);
  };
  const afterLoad = () => setTimeout(idle, 2000);
  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });
}

export const motionPaused = () => window.localStorage.getItem(MOTION_KEY) === 'paused';
export const saveMotion = (paused: boolean) => window.localStorage.setItem(MOTION_KEY, paused ? 'paused' : 'running');
