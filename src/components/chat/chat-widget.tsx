"use client";

import { useFetcher } from "@/utils/fetcher";
import { Sparkles, X } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "../i18n-provider";
import { track } from "./analytics";
import { loadMessages } from "./storage";

const ChatPanel = dynamic(() => import("./chat-panel"), { ssr: false });

export type ChatStatus =
  | { available: false }
  | { available: true; remaining: number; limit: number; reset: number };

const storedTurns = () =>
  loadMessages().filter((message) => message.role === "user").length;

const hiddenPaths = ["/drive", "/upload", "/login", "/register", "/logout"];

export default function ChatWidget() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The panel stays mounted after the first open to keep the conversation
  const [mounted, setMounted] = useState(false);

  const { data: status, mutate } = useFetcher<ChatStatus>("/api/chat/status");

  const close = () => {
    track("chat_closed", {
      page: window.location.pathname,
      turns: storedTurns(),
    });
    setOpen(false);
  };

  // Count visitors who don't see the chatbot because the global limit was hit
  useEffect(() => {
    if (status?.available !== false) return;
    try {
      if (sessionStorage.getItem("chat-unavailable-tracked")) return;
      sessionStorage.setItem("chat-unavailable-tracked", "1");
    } catch {
      return;
    }
    track("chat_unavailable", { during_chat: false });
  }, [status?.available]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    // On phones the panel is a full-screen sheet, don't scroll the page behind it
    const isMobile = !window.matchMedia("(min-width: 640px)").matches;
    if (isMobile) document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (isMobile) document.body.style.overflow = "";
    };
  }, [open]);

  if (!status?.available) return null;
  if (hiddenPaths.some((path) => pathname.startsWith(path))) return null;

  const toggle = () => {
    if (open) return close();

    track("chat_opened", {
      page: pathname,
      has_history: storedTurns() > 0,
    });
    setMounted(true);
    setOpen(true);
  };

  return (
    <>
      {mounted && (
        <ChatPanel
          open={open}
          status={status}
          onClose={close}
          onStatusChange={(next) => mutate(next, { revalidate: false })}
        />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? t("chat.close") : t("chat.open")}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary text-black font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95 h-14 ${
          open
            ? "w-14 justify-center max-sm:hidden"
            : "w-14 sm:w-auto sm:px-5 justify-center"
        }`}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <Sparkles className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline">{t("chat.open")}</span>
          </>
        )}
      </button>
    </>
  );
}
