import { chatModel, guardModel } from "@/lib/ai";
import {
  buildInstructions,
  guardInstructions,
  refusals,
} from "@/lib/chat/prompt";
import { consumeChatQuota, isRateLimitConfigured } from "@/lib/chat/ratelimit";
import {
  chatTools,
  type ChatMessage,
  type ChatMetadata,
} from "@/lib/chat/tools";
import { defaultLocale, locales } from "@/lib/i18n";
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  generateText,
  isStepCount,
  type ModelMessage,
  Output,
  streamText,
  toUIMessageStream,
} from "ai";
import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";
import z from "zod";
import { ipAddress } from "@vercel/functions";

export const maxDuration = 60;

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;

const bodySchema = z.object({
  locale: z.enum(locales).catch(defaultLocale),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        parts: z.array(z.looseObject({ type: z.string() })).max(50),
      }),
    )
    .min(1)
    .max(100),
});

const error = (code: string, status: number, extra?: object) =>
  NextResponse.json({ code, ...extra }, { status });

/**
 * Only plain text is forwarded to the model: tool parts sent by the client
 * can't be trusted, and the model can always call the tools again.
 */
function toModelMessages(messages: z.infer<typeof bodySchema>["messages"]) {
  return messages
    .map((message) => ({
      role: message.role,
      content: message.parts
        .filter((part) => part.type === "text" && typeof part.text === "string")
        .map((part) => part.text as string)
        .join("\n")
        .slice(0, MAX_MESSAGE_LENGTH * 2)
        .trim(),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-MAX_HISTORY) satisfies ModelMessage[];
}

async function isOnTopic(messages: ModelMessage[]) {
  try {
    const { output } = await generateText({
      model: guardModel,
      instructions: guardInstructions,
      output: Output.object({
        schema: z.object({ inScope: z.boolean() }),
      }),
      prompt: messages
        .slice(-4)
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n\n"),
      providerOptions: { openrouter: { reasoning: { effort: "minimal" } } },
      maxRetries: 1,
      timeout: 8000,
    });

    return output.inScope;
  } catch (err) {
    // Fail open, the main model is instructed to refuse off-topic requests too
    console.error("Chat guard failed", err);
    return true;
  }
}

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY || !isRateLimitConfigured())
    return error("unavailable", 503);

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return error("invalid", 400);

  const { locale } = parsed.data;
  const messages = toModelMessages(parsed.data.messages);
  const last = messages.at(-1);

  if (!last || last.role !== "user") return error("invalid", 400);
  if (last.content.length > MAX_MESSAGE_LENGTH) return error("too_long", 400);

  const verification = await checkBotId();
  if (verification.isBot) return error("bot", 403);

  const quota = await consumeChatQuota(ipAddress(req) ?? "unknown");
  if (!quota.ok) {
    if (quota.reason === "global") return error("unavailable", 503);
    return error("rate_limited", 429, { reset: quota.reset });
  }

  const metadata: ChatMetadata = {
    remaining: quota.remaining,
    reset: quota.reset,
  };

  if (!(await isOnTopic(messages))) {
    const stream = createUIMessageStream<ChatMessage>({
      execute: ({ writer }) => {
        const id = generateId();
        writer.write({
          type: "start",
          messageMetadata: { ...metadata, offTopic: true },
        });
        writer.write({ type: "text-start", id });
        writer.write({ type: "text-delta", id, delta: refusals[locale] });
        writer.write({ type: "text-end", id });
        writer.write({ type: "finish" });
      },
    });

    return createUIMessageStreamResponse({ stream });
  }

  const result = streamText({
    model: chatModel,
    instructions: buildInstructions(locale),
    messages,
    tools: chatTools,
    stopWhen: isStepCount(6),
    maxOutputTokens: 1200,
    abortSignal: req.signal,
    onError: ({ error }) => console.error("Chat stream failed", error),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream<typeof chatTools, ChatMessage>({
      stream: result.stream,
      tools: chatTools,
      sendReasoning: false,
      messageMetadata: ({ part }) => {
        if (part.type === "start") return metadata;
        if (part.type === "finish")
          return {
            ...metadata,
            finishReason: part.finishReason,
            usage: {
              inputTokens: part.totalUsage.inputTokens,
              outputTokens: part.totalUsage.outputTokens,
            },
          };
      },
      onError: (err) => {
        console.error("Chat stream part failed", err);
        return "Something went wrong";
      },
    }),
  });
}
