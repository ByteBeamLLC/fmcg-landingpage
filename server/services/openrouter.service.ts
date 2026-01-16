/**
 * OpenRouter Service
 * Handles all AI-powered document processing via OpenRouter API
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// Use cost-effective models for free tools
const DEFAULT_MODEL = "anthropic/claude-3-haiku"; // or "openai/gpt-4o-mini"

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Check if OpenRouter is configured
 */
export function isOpenRouterConfigured(): boolean {
  return !!OPENROUTER_API_KEY;
}

/**
 * Call OpenRouter API with a prompt
 */
async function callOpenRouter(
  messages: ChatMessage[],
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<{ content: string; model: string; usage?: { promptTokens: number; completionTokens: number; totalTokens: number } }> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key not configured");
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://bytebeam.co",
      "X-Title": "ByteBeam Free Tools",
    },
    body: JSON.stringify({
      model: options.model || DEFAULT_MODEL,
      messages,
      max_tokens: options.maxTokens || 2000,
      temperature: options.temperature || 0.3,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
  }

  const data: OpenRouterResponse = await response.json();

  return {
    content: data.choices[0]?.message?.content || "",
    model: options.model || DEFAULT_MODEL,
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        }
      : undefined,
  };
}

/**
 * Summarize a document
 */
export async function summarizeDocument(
  text: string,
  length: "short" | "medium" | "long" = "medium",
  language?: string
) {
  const lengthInstructions = {
    short: "Provide a very brief summary in 2-3 sentences.",
    medium: "Provide a comprehensive summary in 1-2 paragraphs.",
    long: "Provide a detailed summary covering all main points in 3-4 paragraphs.",
  };

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a document summarization assistant. ${lengthInstructions[length]} ${language ? `Respond in ${language}.` : ""} Focus on the key points and main ideas.`,
    },
    {
      role: "user",
      content: `Please summarize the following document:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages);
}

/**
 * Translate a document
 */
export async function translateDocument(
  text: string,
  targetLanguage: string,
  sourceLanguage?: string
) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a professional translator. Translate the following text ${sourceLanguage ? `from ${sourceLanguage} ` : ""}to ${targetLanguage}. Maintain the original formatting and structure as much as possible.`,
    },
    {
      role: "user",
      content: text,
    },
  ];

  return callOpenRouter(messages);
}

/**
 * Extract structured data from an invoice
 */
export async function extractInvoiceData(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are an invoice data extraction assistant. Extract the following information from the invoice and return it as a JSON object:
- invoiceNumber: string
- invoiceDate: string (YYYY-MM-DD format)
- dueDate: string (YYYY-MM-DD format) or null
- vendor: { name: string, address: string, phone: string, email: string }
- customer: { name: string, address: string, phone: string, email: string }
- lineItems: [{ description: string, quantity: number, unitPrice: number, total: number }]
- subtotal: number
- tax: number
- total: number
- currency: string
- paymentTerms: string or null
- notes: string or null

If any field is not found, use null or an empty string. Return only the JSON object, no additional text.`,
    },
    {
      role: "user",
      content: `Extract invoice data from:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { temperature: 0.1 });
}

/**
 * Extract structured data from a receipt
 */
export async function extractReceiptData(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a receipt data extraction assistant. Extract the following information from the receipt and return it as a JSON object:
- merchant: { name: string, address: string, phone: string }
- date: string (YYYY-MM-DD format)
- time: string (HH:MM format) or null
- items: [{ description: string, quantity: number, price: number }]
- subtotal: number
- tax: number
- total: number
- paymentMethod: string
- currency: string
- category: string (e.g., "groceries", "restaurant", "retail", "gas", "other")

If any field is not found, use null or an empty string. Return only the JSON object, no additional text.`,
    },
    {
      role: "user",
      content: `Extract receipt data from:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { temperature: 0.1 });
}

/**
 * Parse resume/CV
 */
export async function parseResume(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a resume/CV parsing assistant. Extract the following information and return it as a JSON object:
- name: string
- email: string
- phone: string
- location: string
- summary: string (professional summary/objective)
- experience: [{ title: string, company: string, location: string, startDate: string, endDate: string or "Present", description: string, highlights: [string] }]
- education: [{ degree: string, institution: string, location: string, graduationDate: string, gpa: string or null }]
- skills: [string]
- certifications: [{ name: string, issuer: string, date: string }]
- languages: [{ language: string, proficiency: string }]
- linkedIn: string or null
- website: string or null

If any field is not found, use null or an empty array. Return only the JSON object, no additional text.`,
    },
    {
      role: "user",
      content: `Parse this resume:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { temperature: 0.1 });
}

/**
 * Analyze a contract
 */
export async function analyzeContract(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a contract analysis assistant. Analyze the contract and provide:
1. A brief summary of the contract type and purpose
2. Key parties involved
3. Important dates (effective date, termination date, renewal dates)
4. Key terms and conditions
5. Financial terms (if applicable)
6. Obligations of each party
7. Termination conditions
8. Potential risks or concerns to be aware of
9. Notable clauses (confidentiality, non-compete, etc.)

Format your response as a structured analysis with clear sections.`,
    },
    {
      role: "user",
      content: `Analyze this contract:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { maxTokens: 3000 });
}

/**
 * Extract business card information
 */
export async function scanBusinessCard(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a business card scanning assistant. Extract the following information and return it as a JSON object:
- name: string
- title: string
- company: string
- email: string
- phone: string (primary)
- mobile: string or null
- fax: string or null
- address: string
- website: string or null
- linkedIn: string or null
- twitter: string or null

If any field is not found, use null. Return only the JSON object, no additional text.`,
    },
    {
      role: "user",
      content: `Extract business card information from:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { temperature: 0.1 });
}

/**
 * Chat with a document
 */
export async function chatWithDocument(
  documentText: string,
  question: string,
  conversationHistory: ChatMessage[] = []
) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a helpful assistant that answers questions about documents. Use the following document as context for answering questions. Be concise and accurate. If the answer cannot be found in the document, say so.

Document:
${documentText}`,
    },
    ...conversationHistory,
    {
      role: "user",
      content: question,
    },
  ];

  return callOpenRouter(messages);
}
