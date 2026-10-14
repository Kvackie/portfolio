"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hue wheel for trying out colour schemes.
 *
 * Only the hue is picked; every other value in the palette is derived from it,
 * so the page stays coherent wherever you drag. The variables written here are
 * the same ones declared in globals.css, set inline on <html> so they win over
 * the stylesheet.
 */

const STORAGE_KEY = "portfolio-hue";

/** Hue of the default warm orange (#e8873a) the palette ships with. */
const DEFAULT_HUE = 27;

/**
 * Perceived brightness is not flat across the wheel: yellow at the same HSL
 * lightness reads much brighter than blue, so a fixed value makes yellows
 * washed out and blues murky. This nudges lightness to compensate, which keeps
 * every hue landing at roughly the same contrast against the dark background.
 */
function lightness(hue: number) {
  return 58 - Math.cos(((hue - DEFAULT_HUE) * Math.PI) / 180) * 7;
}

function palette(hue: number) {
  const l = lightness(hue);
  return {
    "--accent": `hsl(${hue} 62% ${l}%)`,
    "--accent-hover": `hsl(${hue} 68% ${l + 8}%)`,
    "--accent-ink": `hsl(${hue} 55% 9%)`,
    "--accent-soft": `hsl(${hue} 42% 15%)`,
    "--ring": `hsl(${hue} 62% ${l}%)`,
    // Neutrals carry a trace of the hue, so a green or blue scheme reads as a
    // deliberate theme rather than grey with a coloured link.
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

  // Restore the saved hue after mount. Client-side only, so there is a brief
  // flash of the default palette for anyone who has a colour stored.
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
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const outer = rect.width / 2;

    // The middle is left deliberately slack. Dragging across the centre would
    // otherwise spin the hue wildly as the angle sweeps through the poles.
    if (Math.hypot(dx, dy) < outer * 0.5 || Math.hypot(dx, dy) > outer + 8) {
      return null;
    }

    // 0deg sits at the top, matching the conic gradient.
    return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Capture on any press inside the wheel, not only on the ring. Requiring
      // the press to start on the ring made the wheel feel like it ignored
      // most clicks.
      event.currentTarget.setPointerCapture(event.pointerId);
      dragging.current = true;
      const next = hueFromPointer(event.clientX, event.clientY);
      if (next !== null) commit(next);
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

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? 15 : 2;
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        commit(hue + step);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        commit(hue - step);
      }
    },
    [commit, hue],
  );

  return (
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
      onLostPointerCapture={endDrag}
      onKeyDown={onKeyDown}
      className="relative h-[76px] w-[76px] shrink-0 cursor-pointer touch-none rounded-full select-none"
      style={{
        // Conic gradient masked into a ring, so it reads as a wheel with a
        // hollow centre rather than a flat disc.
        background:
          "conic-gradient(from 0deg, hsl(0 62% 58%), hsl(60 62% 58%), hsl(120 62% 58%), hsl(180 62% 58%), hsl(240 62% 58%), hsl(300 62% 58%), hsl(360 62% 58%))",
        maskImage: "radial-gradient(circle, transparent 0 52%, #000 52% 100%)",
        WebkitMaskImage: "radial-gradient(circle, transparent 0 52%, #000 52% 100%)",
      }}
    >
      {/* Marker sitting on the ring at the current hue. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full ring-2 ring-[var(--ink)]"
        style={{
          width: 13,
          height: 13,
          background: `hsl(${hue} 62% ${lightness(hue)}%)`,
          // Rotate about the centre, then push out to the ring radius.
          transform: `translate(-50%, -50%) rotate(${hue}deg) translateY(-27px)`,
        }}
      />
    </div>
  );
}