import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const USER_DAILY_LIMIT = Number(process.env.CHAT_USER_DAILY_LIMIT) || 30;
export const GLOBAL_DAILY_LIMIT =
  Number(process.env.CHAT_GLOBAL_DAILY_LIMIT) || 100;

const GLOBAL_KEY = "global";

function createLimiters() {
  if (
    !process.env.REDIS_KV_REST_API_URL ||
    !process.env.REDIS_KV_REST_API_TOKEN
  )
    return null;

  const redis = new Redis({
    url: process.env.REDIS_KV_REST_API_URL,
    token: process.env.REDIS_KV_REST_API_TOKEN,
  });

  return {
    user: new Ratelimit({
      redis,
      prefix: "chat:user",
      limiter: Ratelimit.slidingWindow(USER_DAILY_LIMIT, "1 d"),
    }),
    global: new Ratelimit({
      redis,
      prefix: "chat:global",
      limiter: Ratelimit.fixedWindow(GLOBAL_DAILY_LIMIT, "1 d"),
    }),
  };
}

const limiters = createLimiters();

/**
 * Without Redis the chat is only usable in development, where limits are skipped.
 */
export const isRateLimitConfigured = () =>
  limiters !== null || process.env.NODE_ENV !== "production";

export async function getChatQuota(ip: string) {
  if (!limiters)
    return {
      globalRemaining: GLOBAL_DAILY_LIMIT,
      remaining: USER_DAILY_LIMIT,
      reset: 0,
    };

  const [global, user] = await Promise.all([
    limiters.global.getRemaining(GLOBAL_KEY),
    limiters.user.getRemaining(ip),
  ]);

  return {
    globalRemaining: global.remaining,
    remaining: user.remaining,
    reset: user.reset,
  };
}

export type ConsumeResult =
  | { ok: true; remaining: number; reset: number }
  | { ok: false; reason: "user"; reset: number }
  | { ok: false; reason: "global" };

/**
 * Consumes one message from both the visitor and the global quota.
 * The visitor quota is checked first so blocked visitors don't drain the global one.
 */
export async function consumeChatQuota(ip: string): Promise<ConsumeResult> {
  if (!limiters) return { ok: true, remaining: USER_DAILY_LIMIT, reset: 0 };

  const global = await limiters.global.getRemaining(GLOBAL_KEY);
  if (global.remaining <= 0) return { ok: false, reason: "global" };

  const user = await limiters.user.limit(ip);
  if (!user.success) return { ok: false, reason: "user", reset: user.reset };

  const globalResult = await limiters.global.limit(GLOBAL_KEY);
  if (!globalResult.success) return { ok: false, reason: "global" };

  return { ok: true, remaining: user.remaining, reset: user.reset };
}
