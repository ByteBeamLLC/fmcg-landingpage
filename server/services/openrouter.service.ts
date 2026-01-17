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

/**
 * Extract bank statement data
 */
export async function extractBankStatementData(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a bank statement data extraction assistant. Extract the following information from the bank statement and return it as a JSON object:
- accountHolder: string
- accountNumber: string (last 4 digits only for privacy)
- bankName: string
- statementPeriod: { startDate: string, endDate: string }
- openingBalance: number
- closingBalance: number
- currency: string
- transactions: [{ date: string, description: string, type: "credit" | "debit", amount: number, balance: number }]
- totalCredits: number
- totalDebits: number
- summary: { deposits: number, withdrawals: number, fees: number, interest: number }

If any field is not found, use null or an empty string. Return only the JSON object, no additional text.`,
    },
    {
      role: "user",
      content: `Extract bank statement data from:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { temperature: 0.1 });
}

/**
 * Analyze insurance/policy document
 */
export async function analyzePolicy(text: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a policy document analysis assistant. Analyze the insurance or policy document and provide:
1. Policy Type (life, health, auto, home, etc.)
2. Policy Number and Dates (effective date, expiration)
3. Policyholder Information
4. Coverage Details (what's covered, limits, deductibles)
5. Exclusions (what's NOT covered)
6. Premium Information (amount, frequency, due dates)
7. Claims Process (how to file, contact info)
8. Key Terms and Definitions
9. Riders or Endorsements (additional coverage)
10. Important Deadlines and Notice Periods

Format your response as a structured analysis with clear sections. Highlight any unusual terms or potential concerns.`,
    },
    {
      role: "user",
      content: `Analyze this policy document:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { maxTokens: 3000 });
}

/**
 * Find specific clauses in a contract
 */
export async function findContractClauses(text: string, clauseTypes?: string[]) {
  const defaultClauses = [
    "Confidentiality/NDA",
    "Non-compete",
    "Termination",
    "Indemnification",
    "Limitation of Liability",
    "Force Majeure",
    "Dispute Resolution/Arbitration",
    "Intellectual Property",
    "Payment Terms",
    "Warranty",
  ];

  const clausesToFind = clauseTypes && clauseTypes.length > 0 ? clauseTypes : defaultClauses;

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a contract clause finder assistant. Search the contract for the following types of clauses and extract them:
${clausesToFind.map((c, i) => `${i + 1}. ${c}`).join('\n')}

For each clause found, provide:
- Clause Type
- Location (section/paragraph number if available)
- Exact Text (quote the relevant portion)
- Plain English Summary
- Risk Level (Low/Medium/High) with brief explanation

Return the results as a JSON object with this structure:
{
  "clausesFound": [
    {
      "type": string,
      "location": string,
      "exactText": string,
      "summary": string,
      "riskLevel": "Low" | "Medium" | "High",
      "riskExplanation": string
    }
  ],
  "clausesNotFound": [string],
  "additionalNotes": string
}

Return only the JSON object, no additional text.`,
    },
    {
      role: "user",
      content: `Find clauses in this contract:\n\n${text}`,
    },
  ];

  return callOpenRouter(messages, { temperature: 0.1, maxTokens: 4000 });
}

/**
 * Compare two documents
 */
export async function compareDocuments(text1: string, text2: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a document comparison assistant. Compare the two documents and identify:

1. **Key Differences**: Major differences in terms, conditions, or content
2. **Added Content**: What's in Document 2 that's not in Document 1
3. **Removed Content**: What's in Document 1 that's not in Document 2
4. **Modified Sections**: Sections that exist in both but have different wording
5. **Risk Assessment**: Any changes that could pose risks or concerns
6. **Summary**: Overall comparison summary with recommendations

Be specific about locations and quote relevant text when possible.
Format your response with clear sections and bullet points.`,
    },
    {
      role: "user",
      content: `Compare these two documents:

=== DOCUMENT 1 ===
${text1}

=== DOCUMENT 2 ===
${text2}`,
    },
  ];

  return callOpenRouter(messages, { maxTokens: 4000 });
}

/**
 * AI-powered file search across multiple documents
 */
export async function searchDocuments(
  query: string,
  documents: { name: string; content: string }[]
) {
  const documentList = documents
    .map((doc, i) => `=== DOCUMENT ${i + 1}: ${doc.name} ===\n${doc.content.slice(0, 15000)}`)
    .join("\n\n");

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are an intelligent document search assistant. The user has uploaded multiple documents and wants to find specific information.

Your task:
1. Search through all provided documents for content relevant to the user's query
2. Understand the MEANING of the query, not just keyword matching
3. Find related concepts even if exact words don't match
4. Return results from each document that contains relevant information

Return a JSON object with this exact structure:
{
  "summary": "Brief overall summary of what was found across all documents (2-3 sentences)",
  "results": [
    {
      "fileName": "exact filename",
      "relevance": "High" | "Medium" | "Low",
      "summary": "Brief summary of relevant content found in this document",
      "excerpts": ["Direct quote 1 from document", "Direct quote 2 if applicable"]
    }
  ]
}

Guidelines:
- Only include documents that have relevant content
- Order results by relevance (High first)
- Keep excerpts concise but meaningful (1-3 sentences each)
- Maximum 3 excerpts per document
- If nothing relevant is found, return empty results array with an appropriate summary
- Return ONLY valid JSON, no additional text`,
    },
    {
      role: "user",
      content: `Search Query: "${query}"

Documents to search:

${documentList}`,
    },
  ];

  const response = await callOpenRouter(messages, { maxTokens: 3000, temperature: 0.2 });

  // Parse the JSON response
  try {
    const parsed = JSON.parse(response.content);
    return {
      summary: parsed.summary || "Search completed",
      results: parsed.results || [],
    };
  } catch (e) {
    // If parsing fails, return a fallback
    return {
      summary: response.content,
      results: [],
    };
  }
}
