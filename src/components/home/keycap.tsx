"use client";

import Link from "next/link";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { playKeySound, preloadKeySound } from "./key-sound";

export type KeyColor = "yellow" | "cream" | "graphite" | "blue";

interface KeycapProps {
  children: ReactNode;
  /** Small legend printed in the corner of the cap */
  sub?: string;
  color?: KeyColor;
  pressed?: boolean;
  /** Deeper sound, for big keys like Enter */
  heavy?: boolean;
  className?: string;
  style?: CSSProperties;
  href?: string;
  external?: boolean;
  label?: string;
  /** Purely visual: rendered as a span and hidden from assistive tech */
  decorative?: boolean;
  onClick?: () => void;
}

export function Keycap({
  children,
  sub,
  color = "cream",
  pressed,
  heavy,
  className = "",
  style,
  href,
  external,
  label,
  decorative,
  onClick,
}: KeycapProps) {
  const lastPress = useRef(0);
  const voice = label ?? sub ?? (typeof children === "string" ? children : "");

  const sound = () => {
    // Pointer presses also flip `pressed`, so don't play the same press twice
    if (performance.now() - lastPress.current < 150) return;
    lastPress.current = performance.now();
    playKeySound({ id: voice, heavy });
  };

  useEffect(preloadKeySound, []);

  // Presses driven from outside (e.g. the physical keyboard) click too
  useEffect(() => {
    if (pressed) sound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressed]);

  const classes = `keycap keycap-${color}${pressed ? " is-pressed" : ""} ${className}`;
  const inner = (
    <span className="keycap-top">
      {sub && <span className="keycap-sub">{sub}</span>}
      <span className="keycap-label">{children}</span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={label}
        className={classes}
        style={style}
        onPointerDown={sound}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  if (decorative) {
    return (
      <span
        aria-hidden
        className={classes}
        style={style}
        onPointerDown={sound}
      >
        {inner}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={classes}
      style={style}
      onPointerDown={sound}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
