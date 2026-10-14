"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hue wheel for trying out colour schemes.
 *
 * Only the hue is picked; every other value in the palette is derived from it,
 * so the whole page stays coherent no matter where you drag. The variables it
 * writes are the same ones declared in globals.css, set as inline styles on
 * <html> so they win over the stylesheet.
 *
 * Written straight to CSS custom properties rather than through React state
 * because the site has no other runtime styling layer to thread through.
 */

const STORAGE_KEY = "portfolio-hue";

/** Hue of the default warm orange (#e8873a) the palette ships with. */
const DEFAULT_HUE = 27;

function palette(hue: number) {
  return {
    "--accent": `hsl(${hue} 62% 58%)`,
    "--accent-hover": `hsl(${hue} 68% 66%)`,
    "--accent-ink": `hsl(${hue} 55% 9%)`,
    "--accent-soft": `hsl(${hue} 42% 15%)`,
    "--ring": `hsl(${hue} 62% 58%)`,
    // Neutrals are tinted very slightly towards the hue, so a green or blue
    // scheme reads as a deliberate theme rather than grey with a coloured link.
    "--bg": `hsl(${hue} 22% 7%)`,
    "--bg-tint": `hsl(${hue} 20% 11%)`,
    "--surface": `hsl(${hue} 20% 11%)`,
    "--surface-2": `hsl(${hue} 17% 16%)`,
    "--border": `hsl(${hue} 16% 24%)`,
    "--ink": `hsl(${hue} 25% 93%)`,
    "--muted": `hsl(${hue} 13% 67%)`,
  } as const;
}

function apply(hue: number) {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(palette(hue))) {
    root.style.setProperty(name, value);
  }
}

export default function HuePicker() {
  const [hue, setHue] = useState(DEFAULT_HUE);
  const wheelRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Restore the saved hue after mount. This runs client-side only, so there is
  // a brief flash of the default palette for anyone with a colour saved.
  useEffect(() => {
    let initial = DEFAULT_HUE;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number(saved);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 360) {
          initial = parsed;
        }
      }
    } catch {
      // Storage blocked: fall back to the default and skip persisting.
    }
    setHue(initial);
    apply(initial);
  }, []);

  const commit = useCallback((next: number) => {
    const wrapped = ((next % 360) + 360) % 360;
    setHue(wrapped);
    apply(wrapped);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(wrapped));
    } catch {
      // Non-fatal: the colour still applies for this page view.
    }
  }, []);

  const hueFromPointer = useCallback((clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const distance = Math.hypot(dx, dy);
    const outer = rect.width / 2;

    // Ignore the middle, so dragging through the centre does not jump the hue.
    if (distance < outer * 0.45 || distance > outer + 2) return null;

    // 0deg sits at the top of the wheel, matching the conic gradient.
    const degrees = (Math.atan2(dy, dx) * 180) / Math.PI;
    return degrees + 90;
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const next = hueFromPointer(event.clientX, event.clientY);
      if (next === null) return;
      dragging.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      commit(next);
    },
    [commit, hueFromPointer],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const next = hueFromPointer(event.clientX, event.clientY);
      if (next !== null) commit(next);
    },
    [commit, hueFromPointer],
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? 15 : 3;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          commit(hue + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          commit(hue - step);
          break;
        case "Home":
          event.preventDefault();
          commit(DEFAULT_HUE);
          break;
      }
    },
    [commit, hue],
  );

  const isCustom = Math.round(hue) !== DEFAULT_HUE;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={wheelRef}
        role="slider"
        tabIndex={0}
        aria-label="Accent colour"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hue)}
        aria-valuetext={`Hue ${Math.round(hue)} degrees`}
        title="Drag to change the colour scheme"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="relative h-16 w-16 cursor-pointer touch-none rounded-full select-none"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(0 62% 58%), hsl(60 62% 58%), hsl(120 62% 58%), hsl(180 62% 58%), hsl(240 62% 58%), hsl(300 62% 58%), hsl(360 62% 58%))",
        }}
      >
        {/* Pointer on the ring at the current hue. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--ink)]"
          style={{
            transform: `translate(-50%, -50%) rotate(${hue}deg) translateY(-24px)`,
            background: `hsl(${hue} 62% 58%)`,
          }}
        />
      </div>

      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>colour</span>
        {isCustom && (
          <button
            type="button"
            onClick={() => commit(DEFAULT_HUE)}
            className="rounded px-1 underline underline-offset-2 transition-colors hover:text-accent"
          >
            reset
          </button>
        )}
      </div>
    </div>
  );
}