import posthog from "posthog-js";

export type ChatLinkKind = "internal" | "external" | "project_card";

/**
 * Every PostHog event emitted by the chatbot, so the dashboard
 * and the code can't drift apart.
 */
type ChatEvents = {
  chat_opened: { page: string; has_history: boolean };
  chat_closed: { page: string; turns: number };
  // The question text is deliberately not captured, it may contain personal data
  chat_message_sent: {
    length: number;
    source: "typed" | "suggestion";
    turn: number;
    page: string;
    locale: string;
  };
  chat_response_received: {
    turn: number;
    duration_ms: number;
    tools: string[];
    project_cards: string[];
    response_length: number;
    off_topic: boolean;
    finish_reason?: string;
    input_tokens?: number;
    output_tokens?: number;
    remaining: number;
  };
  chat_response_stopped: { turn: number; duration_ms: number };
  chat_link_clicked: { href: string; kind: ChatLinkKind; project?: string };
  chat_rate_limited: { turn: number };
  chat_unavailable: { during_chat: boolean };
  chat_error: { code: string; turn: number };
  chat_retry: { turn: number };
  chat_reset: { turns: number };
};

export function track<E extends keyof ChatEvents>(
  event: E,
  properties: ChatEvents[E],
) {
  posthog.capture(event, properties);
}

let requestStartedAt = 0;

/** Marks the start of a chat request, to measure response times */
export function markRequestStart() {
  requestStartedAt = Date.now();
}

export function requestDuration() {
  return requestStartedAt ? Date.now() - requestStartedAt : 0;
}
