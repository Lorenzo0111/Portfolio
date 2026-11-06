import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Locale } from "./i18n";

const GATEWAY_URL = process.env.AI_GATEWAY_URL ?? "https://ai.lorenzo0111.me";

export const isAIConfigured = () => !!process.env.AI_GATEWAY_TOKEN;

// Cloudflare AI Gateway on a custom domain. The OpenAI key is supplied by the
// gateway (Unified Billing or BYOK), so the placeholder key must not be forwarded
const createGatewayOpenAI = (headers: Record<string, string> = {}) =>
  createOpenAI({
    baseURL: `${GATEWAY_URL}/openai/v1`,
    apiKey: "cloudflare",
    headers: {
      "cf-aig-authorization": `Bearer ${process.env.AI_GATEWAY_TOKEN}`,
      ...headers,
    },
    fetch: (input, init) => {
      const requestHeaders = new Headers(init?.headers);
      requestHeaders.delete("authorization");
      return fetch(input, { ...init, headers: requestHeaders });
    },
  });

const openai = createGatewayOpenAI();

// Visitors' questions must not be stored or used for training by the providers
const privateOpenAI = createGatewayOpenAI({
  "cf-aig-zdr": "true",
  "cf-aig-collect-log": "false",
});

export const chatModel = privateOpenAI("gpt-6-luna");
export const guardModel = privateOpenAI("gpt-5-nano");

export const translateDescription = async (
  description: string,
  locale: Locale,
) => {
  if (!description || description.length === 0) return description;

  const response = await generateText({
    model: openai("gpt-5-nano"),
    prompt: `Translate the following description to "${locale}".
    
    Rules:
    - Preserve the same text style, project names and formatting. Do not translate any code snippets or technical terms.
    - Return ONLY the translated version of the text, no explanations, formatting ticks or additional text.

    Text:
    ${description}`,
  });

  return response.text;
};
