"use client";

import type { ChatMessage } from "@/lib/chat/tools";
import { TURNSTILE_ACTION, TURNSTILE_FIELD } from "@/lib/chat/turnstile";
import { type TranslationKey } from "@/lib/i18n";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  RotateCcw,
  Sparkles,
  Square,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../i18n-provider";
import { markRequestStart, requestDuration, track } from "./analytics";
import { loadMessages, saveMessages } from "./storage";
import {
  ChatMessageView,
  type LinkClickHandler,
  TypingIndicator,
} from "./chat-message";
import type { ChatStatus } from "./chat-widget";
import { useTurnstile } from "./use-turnstile";

type AvailableStatus = Extract<ChatStatus, { available: true }>;

const MAX_LENGTH = 1000;
const suggestions = [1, 2, 3, 4].map(
  (i) => `chat.suggestion${i}` as TranslationKey,
);

function parseError(error: Error | undefined) {
  if (!error) return null;
  try {
    return JSON.parse(error.message) as { code?: string; reset?: number };
  } catch {
    return { code: "error" };
  }
}

const countTurns = (messages: ChatMessage[]) =>
  messages.filter((message) => message.role === "user").length;

function formatDuration(ms: number) {
  const minutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return `${minutes}m`;
  return minutes % 60 === 0 ? `${hours}h` : `${hours}h ${minutes % 60}m`;
}

export default function ChatPanel({
  open,
  status,
  onClose,
  onStatusChange,
}: {
  open: boolean;
  status: AvailableStatus;
  onClose: () => void;
  onStatusChange: (status: ChatStatus) => void;
}) {
  const { t, locale } = useTranslation();
  const [input, setInput] = useState("");
  const [initialMessages] = useState(loadMessages);
  const [now, setNow] = useState(() => Date.now());
  // Text of the message waiting for a Turnstile token
  const [verifying, setVerifying] = useState<string | null>(null);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const {
    containerRef: turnstileRef,
    getToken,
    interactive: turnstileInteractive,
  } = useTurnstile(TURNSTILE_ACTION);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickToBottom = useRef(true);

  const [transport] = useState(
    () =>
      new DefaultChatTransport<ChatMessage>({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: {
            ...body,
            messages: messages.map(({ role, parts }) => ({ role, parts })),
          },
        }),
      }),
  );

  const {
    messages,
    setMessages,
    sendMessage,
    status: chatStatus,
    error,
    stop,
    regenerate,
    clearError,
  } = useChat<ChatMessage>({
    transport,
    messages: initialMessages,
    onFinish: ({ message, messages, isAbort, isError }) => {
      const metadata = message.metadata;
      if (metadata)
        onStatusChange({
          ...status,
          remaining: metadata.remaining,
          reset: metadata.reset,
        });

      if (isError) return;

      const turn = countTurns(messages);
      const duration_ms = requestDuration();

      if (isAbort) {
        track("chat_response_stopped", { turn, duration_ms });
        return;
      }

      const tools: string[] = [];
      const projectCards: string[] = [];
      let responseLength = 0;
      for (const part of message.parts) {
        if (part.type === "text") responseLength += part.text.length;
        else if (part.type.startsWith("tool-")) tools.push(part.type.slice(5));

        if (
          part.type === "tool-showProjects" &&
          part.state === "output-available"
        )
          projectCards.push(...part.output.map((project) => project.name));
      }

      track("chat_response_received", {
        turn,
        duration_ms,
        tools,
        project_cards: projectCards,
        response_length: responseLength,
        off_topic: !!metadata?.offTopic,
        finish_reason: metadata?.finishReason,
        input_tokens: metadata?.usage?.inputTokens,
        output_tokens: metadata?.usage?.outputTokens,
        remaining: metadata?.remaining ?? status.remaining,
      });
    },
    onError: (err) => {
      const code = parseError(err)?.code ?? "error";
      const turn = countTurns(messages);

      // Global quota exhausted: hide the whole feature
      if (code === "unavailable") {
        track("chat_unavailable", { during_chat: true });
        onClose();
        onStatusChange({ available: false });
        return;
      }

      if (code === "rate_limited") {
        track("chat_rate_limited", { turn });
        // The unanswered question shouldn't stay in the history
        setMessages((current) =>
          current.at(-1)?.role === "user" ? current.slice(0, -1) : current,
        );
        return;
      }

      track("chat_error", { code, turn });
    },
  });

  const busy =
    chatStatus === "submitted" || chatStatus === "streaming" || !!verifying;
  const parsedError = parseError(error);
  const rateLimited =
    parsedError?.code === "rate_limited" || status.remaining <= 0;
  const resetAt = parsedError?.reset ?? status.reset;

  useEffect(() => {
    if (!rateLimited) return;
    const interval = setInterval(() => setNow(Date.now()), 30_000);
    const timeout = setTimeout(() => setNow(Date.now()), 0);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [rateLimited]);

  useEffect(() => {
    if (chatStatus === "ready" || chatStatus === "error")
      saveMessages(messages);
  }, [messages, chatStatus]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages, chatStatus, open]);

  useEffect(() => {
    if (open && window.matchMedia("(min-width: 640px)").matches)
      inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  /**
   * Every request needs a fresh single-use Turnstile token.
   * Returns null when the visitor couldn't be verified.
   */
  const requestBody = async () => {
    const token = await getToken();
    if (token === null) {
      setVerifyFailed(true);
      track("chat_error", { code: "turnstile", turn: countTurns(messages) });
      return null;
    }
    return { locale, [TURNSTILE_FIELD]: token };
  };

  const send = async (
    text: string,
    source: "typed" | "suggestion" = "typed",
  ) => {
    const trimmed = text.trim();
    if (!trimmed || busy || rateLimited || trimmed.length > MAX_LENGTH) return;

    stickToBottom.current = true;
    clearError();
    setVerifyFailed(false);
    setInput("");
    setVerifying(trimmed);

    const body = await requestBody();
    setVerifying(null);
    if (!body) {
      setInput(trimmed);
      return;
    }

    markRequestStart();
    sendMessage({ text: trimmed }, { body });
    track("chat_message_sent", {
      length: trimmed.length,
      source,
      turn: countTurns(messages) + 1,
      page: window.location.pathname,
      locale,
    });
  };

  const retry = async () => {
    clearError();
    setVerifyFailed(false);
    const body = await requestBody();
    if (!body) return;

    markRequestStart();
    track("chat_retry", { turn: countTurns(messages) });
    regenerate({ body });
  };

  const onLinkClick: LinkClickHandler = (link) => {
    track("chat_link_clicked", link);
    // On phones the chat covers the page, close it to show the destination
    if (
      link.kind !== "external" &&
      !window.matchMedia("(min-width: 640px)").matches
    )
      onClose();
  };

  const reset = () => {
    track("chat_reset", { turns: countTurns(messages) });
    stop();
    setMessages([]);
    clearError();
    setVerifyFailed(false);
    saveMessages([]);
    inputRef.current?.focus();
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottom.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const last = messages.at(-1);
  const waiting =
    chatStatus === "submitted" ||
    (chatStatus === "streaming" &&
      last?.role === "assistant" &&
      !last.parts.some(
        (p) => (p.type === "text" && p.text) || p.type.startsWith("tool-"),
      ));

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("chat.title")}
      aria-hidden={!open}
      inert={!open}
      className={`fixed z-50 flex flex-col overflow-hidden bg-[#181818]/95 backdrop-blur-xl shadow-2xl shadow-black/50 transition-all duration-300 ease-out origin-bottom-right
        inset-0 h-dvh sm:inset-auto sm:bottom-24 sm:right-5 sm:w-[400px] sm:h-[min(640px,calc(100dvh-8rem))] sm:rounded-3xl sm:border sm:border-white/10
        ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"}`}
    >
      <header className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <div className="relative shrink-0">
          <Image
            src="/icon.webp"
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-black ring-2 ring-[#181818]">
            <Sparkles className="w-3 h-3" />
          </span>
        </div>
        <div className="min-w-0 grow">
          <h2 className="font-semibold leading-tight">{t("chat.title")}</h2>
          <p className="text-xs text-gray-400 truncate">{t("chat.subtitle")}</p>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={reset}
            title={t("chat.reset")}
            aria-label={t("chat.reset")}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          title={t("chat.close")}
          aria-label={t("chat.close")}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="grow overflow-y-auto overscroll-contain px-4 py-5 space-y-4"
        aria-live="polite"
      >
        <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-gray-200">
          {t("chat.greeting")}
        </div>

        {messages.length === 0 && (
          <div className="flex flex-col items-start gap-2 pt-1">
            {suggestions.map((key) => (
              <button
                key={key}
                type="button"
                disabled={rateLimited}
                onClick={() => send(t(key), "suggestion")}
                className="group flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-gray-300 transition-colors hover:border-primary/50 hover:text-white disabled:opacity-50"
              >
                {t(key)}
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 transition-colors group-hover:text-primary" />
              </button>
            ))}
          </div>
        )}

        {messages.map((message, i) => (
          <ChatMessageView
            key={message.id}
            message={message}
            streaming={busy && i === messages.length - 1}
            onLinkClick={onLinkClick}
          />
        ))}

        {verifying && (
          <div className="flex justify-end">
            <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-primary/70 px-4 py-2.5 text-sm text-black">
              {verifying}
            </div>
          </div>
        )}

        {(waiting || verifying) && <TypingIndicator />}

        {verifyFailed && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-300">
            {t("chat.verifyFailed")}
          </div>
        )}

        {error && !rateLimited && parsedError?.code !== "unavailable" && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-300">
            {parsedError?.code === "too_long"
              ? t("chat.tooLong")
              : parsedError?.code === "bot"
                ? t("chat.verifyFailed")
                : t("chat.error")}
            {parsedError?.code !== "too_long" && (
              <button
                type="button"
                onClick={retry}
                className="shrink-0 font-medium text-white hover:text-primary transition-colors"
              >
                {t("chat.retry")}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="px-3 pb-3 pt-2 border-t border-white/5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Invisible unless Cloudflare asks the visitor to interact */}
        <div
          ref={turnstileRef}
          className={turnstileInteractive ? "mb-2" : undefined}
        />

        {rateLimited ? (
          <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-gray-200">
            <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <p>
              {t("chat.rateLimited", {
                limit: status.limit,
                time: formatDuration(resetAt - now),
              })}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 pl-3.5 transition-colors focus-within:border-white/25"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder={t("chat.placeholder")}
              aria-label={t("chat.placeholder")}
              className="grow resize-none bg-transparent py-2 text-[16px] sm:text-sm text-white placeholder:text-gray-500 focus:outline-none max-h-[140px]"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                title={t("chat.stop")}
                aria-label={t("chat.stop")}
                className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                title={t("chat.send")}
                aria-label={t("chat.send")}
                className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-primary text-black transition-all hover:brightness-110 disabled:opacity-30 disabled:bg-white/20 disabled:text-white"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </form>
        )}

        <p className="mt-2 px-1 flex justify-between gap-2 text-[11px] text-gray-500">
          <span>
            {t("chat.disclaimer")}{" "}
            <Link
              href="/privacy"
              onClick={() =>
                onLinkClick({ href: "/privacy", kind: "internal" })
              }
              className="underline underline-offset-2 hover:text-gray-300"
            >
              {t("chat.privacy")}
            </Link>
          </span>
          {!rateLimited && status.remaining <= 10 && (
            <span className="shrink-0">
              {t("chat.remaining", { count: status.remaining })}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
