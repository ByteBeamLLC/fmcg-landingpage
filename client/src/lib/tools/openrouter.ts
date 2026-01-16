/**
 * OpenRouter API client for AI-powered tools
 * This file contains client-side utilities for calling the backend API
 * which proxies requests to OpenRouter
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIRequestOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface DocumentSummaryRequest {
  text: string;
  length?: "short" | "medium" | "long";
  language?: string;
}

export interface TranslationRequest {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
}

export interface DataExtractionRequest {
  text: string;
  extractionType: "invoice" | "receipt" | "resume" | "business_card" | "contract";
}

export interface ChatWithDocumentRequest {
  documentText: string;
  question: string;
  conversationHistory?: ChatMessage[];
}

// API base URL - will use relative path to hit the backend
const API_BASE = "/api/tools";

/**
 * Generic function to call AI endpoints
 */
async function callAIEndpoint<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));

    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again in an hour or sign up for unlimited access.");
    }

    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Summarize a document using AI
 */
export async function summarizeDocument(
  request: DocumentSummaryRequest
): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/summarize", request);
}

/**
 * Translate document text
 */
export async function translateDocument(
  request: TranslationRequest
): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/translate", request);
}

/**
 * Extract structured data from documents
 */
export async function extractData(
  request: DataExtractionRequest
): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>(`/extract-${request.extractionType}`, {
    text: request.text,
  });
}

/**
 * Chat with a document (Q&A)
 */
export async function chatWithDocument(
  request: ChatWithDocumentRequest
): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/chat", request);
}

/**
 * Analyze a contract
 */
export async function analyzeContract(text: string): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/analyze-contract", { text });
}

/**
 * Parse a resume/CV
 */
export async function parseResume(text: string): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/parse-resume", { text });
}

/**
 * Extract data from an invoice
 */
export async function extractInvoiceData(text: string): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/extract-invoice", { text });
}

/**
 * Extract data from a receipt
 */
export async function extractReceiptData(text: string): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/extract-receipt", { text });
}

/**
 * Scan and extract business card information
 */
export async function scanBusinessCard(text: string): Promise<AIResponse> {
  return callAIEndpoint<AIResponse>("/scan-card", { text });
}

/**
 * Check if the AI service is available
 */
export async function checkAIServiceStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/status`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get remaining rate limit
 */
export async function getRateLimitStatus(): Promise<{
  remaining: number;
  resetTime: Date;
} | null> {
  try {
    const response = await fetch(`${API_BASE}/rate-limit-status`);
    if (response.ok) {
      const data = await response.json();
      return {
        remaining: data.remaining,
        resetTime: new Date(data.resetTime),
      };
    }
    return null;
  } catch {
    return null;
  }
}
