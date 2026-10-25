import { RefObject, useEffect, useRef } from "react";

/**
 * "pin": 0 when the element's top reaches the viewport top, 1 when its
 * bottom reaches the viewport bottom (for sticky, pinned sections).
 * "exit": 0 at the top, 1 once the element has fully scrolled out.
 */
type Mode = "pin" | "exit";

/**
 * Tracks how far the page has scrolled through an element and exposes it as
 * the `--p` CSS variable (0..1) on that element, so styles can be keyframed
 * against scroll without re-rendering on every frame.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  mode: Mode,
  onProgress?: (progress: number) => void,
) {
  const callback = useRef(onProgress);

  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance =
        mode === "pin" ? rect.height - window.innerHeight : rect.height;
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(distance, 1)),
      );
      el.style.setProperty("--p", progress.toFixed(4));
      callback.current?.(progress);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, mode]);
}

/**
 * True when the keyboard event comes from somewhere that owns the keys.
 * With `includeControls`, focused links and buttons count too (they act on Enter).
 */
export function isTypingTarget(
  target: EventTarget | null,
  includeControls = false,
) {
  const selector =
    "input, textarea, select, [contenteditable='true'], [role='dialog']" +
    (includeControls ? ", button, a" : "");
  return target instanceof HTMLElement && !!target.closest(selector);
}
