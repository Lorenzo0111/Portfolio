"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1500, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/\d+/);
  const target = match ? Number(match[0]) : 0;
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    const element = ref.current;
    if (!element || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {match ? value.replace(match[0], String(current)) : value}
    </span>
  );
}
