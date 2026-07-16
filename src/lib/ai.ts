import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { Locale } from "./i18n";

export const translateDescription = async (
  description: string,
  locale: Locale,
) => {
  if (!description || description.length === 0) return description;

  const openrouter = createOpenRouter();

  const response = await generateText({
    model: openrouter("openai/gpt-5-nano"),
    prompt: `Translate the following description to "${locale}".
    
    Rules:
    - Preserve the same text style, project names and formatting. Do not translate any code snippets or technical terms.
    - Return ONLY the translated version of the text, no explanations, formatting ticks or additional text.

    Text:
    ${description}`,
  });

  return response.text;
};
