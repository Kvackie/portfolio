/**
 * Header wordmark. Server-rendered -- it is only an anchor, so there is no
 * reason for it to cost client-side JavaScript.
 */
export default function Wordmark() {
  return (
    <a
      href="#top"
      className="flex shrink-0 items-center gap-1.5 font-mono text-sm font-bold tracking-tight"
    >
      <span>Valentin</span>
      <span className="text-accent">Wannesian</span>
    </a>
  );
}