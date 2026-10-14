/**
 * The hero's ASCII monogram.
 *
 * Block letters rather than a rendered portrait: it needs no photo, stays
 * crisp at any size, and echoes the terminal panel the games are built with.
 *
 * Laid out on a strict 6-row grid: the V is 7 columns wide, the W is 9, and the
 * W's middle peak reaches row 3 so it reads as a W rather than as two Vs.
 * Every W row is mirror-symmetric about its centre column -- an off-by-one
 * there is exactly what makes an ASCII W look twisted.
 */
const VW = [
  "█     █ █       █",
  "█     █ █       █",
  "█     █ █   █   █",
  " █   █  █  █ █  █",
  "  █ █   █ █   █ █",
  "   █    ██     ██",
];

export default function AsciiMonogram() {
  return (
    <div className="relative w-full max-w-[340px] select-none overflow-hidden rounded-2xl border border-border bg-surface/70 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      {/* Warm glow behind the letters, tinted by the palette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_70%)] opacity-70"
      />

      <div className="relative flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>monogram</span>
        <span className="text-accent">● ● ●</span>
      </div>

      <pre
        aria-label="Valentin Wannesian, initials V W"
        className="relative overflow-x-auto font-mono text-[13px] leading-[1.45] font-bold text-accent [text-shadow:0_0_18px_color-mix(in_srgb,var(--accent)_45%,transparent)] sm:text-[15px]"
      >
        {VW.join("\n")}
      </pre>

      <div className="relative mt-4 flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>est. 2014</span>
        <span>Sweden</span>
      </div>
    </div>
  );
}