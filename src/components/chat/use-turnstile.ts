"use client";

import { useEffect, useRef, useState } from "react";

type RenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  execution?: "render" | "execute";
  "refresh-expired"?: "auto" | "manual" | "never";
  callback?: (token: string) => void;
  "error-callback"?: (code: string) => void;
  "expired-callback"?: () => void;
  "before-interactive-callback"?: () => void;
  "after-interactive-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: RenderOptions) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TOKEN_TIMEOUT = 20_000;

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

let scriptPromise: Promise<void> | null = null;

function loadScript() {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve();

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Turnstile"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Renders an invisible Turnstile widget and keeps one token ready.
 * Tokens are single use: `getToken` hands it out and immediately starts
 * solving the next one, so sending a message rarely has to wait.
 * Without a site key (local development) it resolves `undefined`.
 */
export function useTurnstile(action: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const pending = useRef(false);
  const waiters = useRef<((token: string | null) => void)[]>([]);
  const [interactive, setInteractive] = useState(false);

  const settle = (value: string | null) => {
    for (const resolve of waiters.current.splice(0)) resolve(value);
  };

  const solve = () => {
    const id = widgetId.current;
    if (!id || !window.turnstile || pending.current) return;

    pending.current = true;
    window.turnstile.reset(id);
    window.turnstile.execute(id);
  };

  useEffect(() => {
    if (!turnstileSiteKey) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;

        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: turnstileSiteKey!,
          action,
          theme: "dark",
          size: "flexible",
          appearance: "interaction-only",
          execution: "execute",
          "refresh-expired": "manual",
          callback: (value) => {
            pending.current = false;
            setInteractive(false);

            if (waiters.current.length > 0) {
              settle(value);
              solve();
            } else {
              token.current = value;
            }
          },
          // A new token is solved on the next message, no background refresh
          "expired-callback": () => {
            token.current = null;
          },
          "error-callback": () => {
            pending.current = false;
            setInteractive(false);
            settle(null);
          },
          "before-interactive-callback": () => setInteractive(true),
          "after-interactive-callback": () => setInteractive(false),
        });

        solve();
      })
      .catch(() => settle(null));

    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
      token.current = null;
      pending.current = false;
      settle(null);
    };
  }, [action]);

  const getToken = (): Promise<string | null | undefined> => {
    if (!turnstileSiteKey) return Promise.resolve(undefined);

    const ready = token.current;
    if (ready) {
      token.current = null;
      solve();
      return Promise.resolve(ready);
    }

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        waiters.current = waiters.current.filter((w) => w !== done);
        resolve(null);
      }, TOKEN_TIMEOUT);
      const done = (value: string | null) => {
        clearTimeout(timeout);
        resolve(value);
      };

      waiters.current.push(done);
      solve();
    });
  };

  return { containerRef, getToken, interactive };
}
