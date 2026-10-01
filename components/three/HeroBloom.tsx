'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { canGoLive, motionPaused, saveMotion, whenQuiet } from './gate';
import type { BloomScene } from './bloom-scene';

/**
 * Wraps the static bloom poster. On capable desktops it lazily loads the WebGL scene,
 * cross-fades it in and shows a pause control; everywhere else the poster stays.
 */
export function HeroBloom({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<BloomScene | null>(null);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!canGoLive()) return;
    let cancelled = false;
    whenQuiet(async () => {
      try {
        if (cancelled || !canvasRef.current) return;
        const { mountBloom } = await import('./bloom-scene');
        if (cancelled || !canvasRef.current) return;
        const startPaused = motionPaused();
        setPaused(startPaused);
        const scene = await mountBloom(canvasRef.current, {
          paused: startPaused,
          onReady: () => {
            if (!cancelled) setLive(true);
          },
          onFail: () => {
            sceneRef.current = null;
            if (!cancelled) setLive(false);
          },
        });
        // Unmounted while the scene was being built: the cleanup below found nothing to dispose.
        if (cancelled) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
      } catch {
        // WebGL can still fail after the capability probe (context limits, a GPU change): keep the poster.
        sceneRef.current = null;
      }
    });
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    saveMotion(next);
    sceneRef.current?.setPaused(next);
  };

  return (
    <div className="relative h-full w-full">
      <div className={`h-full w-full transition-opacity duration-[900ms] ${live ? 'opacity-0' : 'opacity-100'}`}>{children}</div>
      <canvas
        ref={canvasRef}
        data-bloom-canvas=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full touch-pan-y transition-opacity duration-[900ms] ${live ? 'opacity-100' : 'opacity-0'}`}
      />
      {live ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          className="absolute bottom-2 right-2 min-h-11 rounded-full border border-hairline bg-bg/80 px-4 font-mono text-xs uppercase tracking-[0.14em] text-muted backdrop-blur hover:text-gold"
        >
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      ) : null}
    </div>
  );
}
