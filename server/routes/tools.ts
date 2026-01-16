import type { Express, Request, Response } from "express";
import { aiToolsLimiter, getRateLimitInfo } from "../middleware/rateLimit";
import * as openRouterService from "../services/openrouter.service";

/**
 * Register all tool-related API routes
 */
export function registerToolRoutes(app: Express) {
  // Status endpoint - check if AI services are available
  app.get("/api/tools/status", (_req: Request, res: Response) => {
    res.json({
      aiAvailable: openRouterService.isOpenRouterConfigured(),
      timestamp: new Date().toISOString(),
    });
  });

  // Rate limit status endpoint
  app.get("/api/tools/rate-limit-status", (req: Request, res: Response) => {
    const info = getRateLimitInfo(req);
    res.json(info);
  });

  // AI Document Summarizer
  app.post("/api/tools/summarize", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text, length = "medium", language } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      if (text.length > 50000) {
        return res.status(400).json({ error: "Text too long. Maximum 50,000 characters." });
      }

      const result = await openRouterService.summarizeDocument(text, length, language);
      res.json(result);
    } catch (error) {
      console.error("Summarize error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to summarize document",
      });
    }
  });

  // Document Translator
  app.post("/api/tools/translate", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text, targetLanguage, sourceLanguage } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      if (!targetLanguage || typeof targetLanguage !== "string") {
        return res.status(400).json({ error: "Target language is required" });
      }

      if (text.length > 30000) {
        return res.status(400).json({ error: "Text too long. Maximum 30,000 characters." });
      }

      const result = await openRouterService.translateDocument(text, targetLanguage, sourceLanguage);
      res.json(result);
    } catch (error) {
      console.error("Translate error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to translate document",
      });
    }
  });

  // Invoice Data Extractor
  app.post("/api/tools/extract-invoice", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const result = await openRouterService.extractInvoiceData(text);

      // Try to parse the JSON from the response
      try {
        const jsonData = JSON.parse(result.content);
        res.json({ ...result, parsedData: jsonData });
      } catch {
        // If parsing fails, return the raw content
        res.json(result);
      }
    } catch (error) {
      console.error("Invoice extraction error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to extract invoice data",
      });
    }
  });

  // Receipt Scanner
  app.post("/api/tools/extract-receipt", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const result = await openRouterService.extractReceiptData(text);

      try {
        const jsonData = JSON.parse(result.content);
        res.json({ ...result, parsedData: jsonData });
      } catch {
        res.json(result);
      }
    } catch (error) {
      console.error("Receipt extraction error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to extract receipt data",
      });
    }
  });

  // Resume/CV Parser
  app.post("/api/tools/parse-resume", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const result = await openRouterService.parseResume(text);

      try {
        const jsonData = JSON.parse(result.content);
        res.json({ ...result, parsedData: jsonData });
      } catch {
        res.json(result);
      }
    } catch (error) {
      console.error("Resume parsing error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to parse resume",
      });
    }
  });

  // Contract Analyzer
  app.post("/api/tools/analyze-contract", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      if (text.length > 100000) {
        return res.status(400).json({ error: "Document too long. Maximum 100,000 characters." });
      }

      const result = await openRouterService.analyzeContract(text);
      res.json(result);
    } catch (error) {
      console.error("Contract analysis error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to analyze contract",
      });
    }
  });

  // Business Card Scanner
  app.post("/api/tools/scan-card", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const result = await openRouterService.scanBusinessCard(text);

      try {
        const jsonData = JSON.parse(result.content);
        res.json({ ...result, parsedData: jsonData });
      } catch {
        res.json(result);
      }
    } catch (error) {
      console.error("Business card scan error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to scan business card",
      });
    }
  });

  // Chat with Document
  app.post("/api/tools/chat", aiToolsLimiter, async (req: Request, res: Response) => {
    try {
      const { documentText, question, conversationHistory } = req.body;

      if (!documentText || typeof documentText !== "string") {
        return res.status(400).json({ error: "Document text is required" });
      }

      if (!question || typeof question !== "string") {
        return res.status(400).json({ error: "Question is required" });
      }

      if (documentText.length > 50000) {
        return res.status(400).json({ error: "Document too long. Maximum 50,000 characters." });
      }

      const result = await openRouterService.chatWithDocument(
        documentText,
        question,
        conversationHistory || []
      );
      res.json(result);
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to process chat",
      });
    }
  });
}
