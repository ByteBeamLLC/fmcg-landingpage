/**
 * OpenRouter Direct API Client — adapted from pharma-tools/lib/openrouter.ts
 *
 * Provides direct HTTP requests to OpenRouter API. All LLM calls go through
 * OpenRouter with API key and model from environment variables.
 *
 * Differences from pharma-tools original:
 * - generateObject() (zod-based structured output) is omitted; the SFDA routes
 *   only use generateText().
 * - OPENROUTER_MODEL falls back to "google/gemini-2.5-pro" instead of throwing.
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemini-2.5-pro";

export interface Message {
  role: "user" | "assistant" | "system";
  content:
    | string
    | Array<{
        type: "text" | "image_url";
        text?: string;
        image_url?: { url: string };
      }>;
}

interface GenerateTextOptions {
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

function getApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY environment variable is not set. " +
        "Please add it to the Vercel project's environment variables."
    );
  }
  return apiKey;
}

function getModel(override?: string): string {
  return (
    override ||
    process.env.OPENROUTER_SFDA_MODEL ||
    process.env.OPENROUTER_MODEL ||
    DEFAULT_MODEL
  );
}

interface FormattedMessage {
  role: "user" | "assistant" | "system";
  content:
    | string
    | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

interface ContentItemWithImage {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
  image?: string;
}

function formatMessages(messages: Message[]): FormattedMessage[] {
  return messages.map((msg) => {
    if (typeof msg.content === "string") {
      return { role: msg.role, content: msg.content };
    }

    const content = msg.content.map((item) => {
      if (item.type === "text") {
        return { type: "text", text: item.text };
      } else {
        const itemWithImage = item as ContentItemWithImage;
        const imageData = itemWithImage.image || itemWithImage.image_url?.url;
        if (imageData) {
          return {
            type: "image_url",
            image_url: {
              url: imageData.startsWith("data:")
                ? imageData
                : `data:image/jpeg;base64,${imageData}`,
            },
          };
        }
      }
      return item;
    });

    return { role: msg.role, content };
  });
}

export async function generateText(
  options: GenerateTextOptions
): Promise<{ text: string }> {
  const apiKey = getApiKey();
  const model = getModel(options.model);

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_SITE_URL || "https://bytebeam.co",
      "X-Title": "ByteBeam SFDA Tools",
    },
    body: JSON.stringify({
      model,
      messages: formatMessages(options.messages),
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";

  return { text };
}

export function isOpenRouterConfigured(): boolean {
  return !!process.env.OPENROUTER_API_KEY;
}
