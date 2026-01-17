import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// All routes that should be prerendered for SEO
// These will be prerendered using a post-build script
export const routesToPrerender = [
  // Main pages
  "/",
  "/about",
  
  // Solutions hub
  "/solutions",
  
  // Solution pages
  "/solutions/uae-food-label-localization",
  "/solutions/saudi-pharma-gap-analysis",
  
  // Industries hub
  "/industries",
  
  // Industry pages
  "/industries/fmcg",
  "/industries/pharma",
  "/industries/finance",
  "/industries/legal",
  "/industries/insurance",
  "/industries/operations",
  
  // Tools directory
  "/tools",
  
  // Contract & Legal Tools
  "/tools/contract-analyzer",
  "/tools/contract-clause-finder",
  "/tools/contract-compare",
  "/tools/legal-summarizer",
  "/tools/nda-generator",
  "/tools/lease-generator",
  
  // Policy & Compliance Tools
  "/tools/policy-analyzer",
  "/tools/document-compare",
  
  // Search, Chat & Summarization
  "/tools/pdf-chat",
  "/tools/file-search",
  "/tools/ai-summarizer",
  
  // Extract, Convert & Prepare Tools
  "/tools/invoice-parser",
  "/tools/receipt-scanner",
  "/tools/bank-statement-parser",
  "/tools/resume-parser",
  "/tools/pdf-table-extractor",
  
  // OCR & Text Extraction
  "/tools/image-to-text",
  "/tools/pdf-to-text",
  "/tools/handwriting-to-text",
  "/tools/screenshot-to-text",
  "/tools/photo-to-text",
  
  // PDF Tools
  "/tools/pdf-redactor",
  "/tools/pdf-compressor",
  "/tools/image-to-pdf",
  "/tools/pdf-merger",
  "/tools/pdf-splitter",
  "/tools/pdf-page-remover",
  "/tools/pdf-rotate",
  
  // Image Tools
  "/tools/image-compressor",
  "/tools/image-resizer",
  "/tools/image-converter",
  "/tools/heic-to-jpg",
  "/tools/webp-converter",
  
  // Spreadsheet Tools
  "/tools/csv-to-excel",
  "/tools/excel-to-csv",
  "/tools/json-to-excel",
  "/tools/excel-to-json",
  
  // QR Code Tools
  "/tools/qr-code-generator",
  "/tools/qr-code-reader",
  
  // Document Generators
  "/tools/w2-generator",
  "/tools/1099-generator",
  
  // Blog
  "/blog",
  "/blog/automation-platform-comparison-2026",
  "/blog/uae-food-labeling-requirements-2026",
  "/blog/sfda-drug-registration-guide-saudi-arabia",
  "/blog/dubai-municipality-montaji-food-registration",
  "/blog/gcc-document-compliance-automation-2026",
  "/blog/no-code-document-automation-regulatory-teams-2026",
  "/blog/intelligent-document-processing-business-guide-2026",
  "/blog/automating-invoice-processing-2026",
  
  // Case studies
  "/case-study/takhlees",
  "/case-study/carrefour",
  "/case-study/research-copilot",
];

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
