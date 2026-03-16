import {
  Code,
  Settings,
  Zap,
  FileJson,
  Shield,
  Gauge,
  BookOpen,
  Terminal,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const restApiData: IntegrationPageData = {
  slug: "rest-api",
  seo: {
    title: "Parsli REST API | Programmatic Document Extraction for Developers",
    description:
      "Use Parsli\u2019s RESTful API to extract structured data from documents programmatically. Full control over extraction with simple HTTP requests.",
    keywords:
      "Parsli REST API, document extraction API, OCR API, developer API document parsing, programmatic data extraction, API integration document processing, JSON extraction API",
  },
  hero: {
    integrationName: "REST API",
    integrationLogo: "\u{1F517}",
    headline: "Full Programmatic Control with the Parsli REST API",
    subheadline:
      "Submit documents, configure extraction parameters, and retrieve structured data through simple RESTful endpoints. Build document intelligence directly into your applications.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Generate an API Key",
      description:
        "Create an API key from the Parsli dashboard. Keys support scoped permissions so you can limit access to specific endpoints or document types.",
      icon: Shield,
    },
    {
      step: "2",
      title: "Explore the API Documentation",
      description:
        "Browse the interactive API reference with request/response examples, field descriptions, and a built-in API explorer to test live calls.",
      icon: BookOpen,
    },
    {
      step: "3",
      title: "Submit Your First Document",
      description:
        "Send a POST request with your document (file upload or URL) to the /extract endpoint. Specify the extraction template or let Parsli auto-detect the document type.",
      icon: Terminal,
    },
    {
      step: "4",
      title: "Retrieve Structured Results",
      description:
        "Poll the extraction status endpoint or receive results via webhook. The response contains structured JSON with all extracted fields and confidence scores.",
      icon: FileJson,
    },
  ],
  features: [
    {
      icon: Code,
      title: "RESTful Design",
      description:
        "Standard HTTP methods, predictable resource URLs, and JSON request/response bodies. If you can make an HTTP call, you can use Parsli.",
      benefit: "Works with every programming language and framework.",
    },
    {
      icon: FileJson,
      title: "Structured JSON Responses",
      description:
        "Every extraction returns a JSON object with labeled fields, confidence scores, bounding box coordinates, and document metadata.",
      benefit: "Machine-readable output ready for database insertion or downstream processing.",
    },
    {
      icon: Gauge,
      title: "High-Throughput Processing",
      description:
        "The API supports concurrent requests and batch extraction endpoints for processing hundreds of documents in parallel.",
      benefit: "Scale from a single document to thousands without changing your integration.",
    },
    {
      icon: Shield,
      title: "API Key & OAuth Authentication",
      description:
        "Authenticate with API keys for server-to-server calls or OAuth 2.0 for user-facing applications. Keys support fine-grained permission scoping.",
      benefit: "Secure access control for every use case.",
    },
    {
      icon: BookOpen,
      title: "SDKs & Code Examples",
      description:
        "Official SDKs for Python, Node.js, Java, and Go\u2014plus copy-paste code examples in the API docs for every endpoint.",
      benefit: "Get integrated in hours, not weeks.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Custom Invoice Processing System",
      description:
        "Embed Parsli\u2019s extraction API into your custom AP workflow to parse invoices programmatically and write results directly to your database.",
      slug: "invoice-parsing",
    },
    {
      title: "Resume Parsing for ATS Platforms",
      description:
        "Integrate Parsli\u2019s API into your applicant tracking system to extract candidate details from uploaded resumes automatically.",
      slug: "resume-parsing",
    },
    {
      title: "Contract Data Extraction Pipeline",
      description:
        "Build a contract analysis tool that uses the Parsli API to extract key terms, dates, and obligations from legal documents at scale.",
      slug: "contract-extraction",
    },
  ],
  faq: [
    {
      question: "What is the rate limit for the Parsli API?",
      answer:
        "Rate limits depend on your plan: Free tier allows 10 requests/minute, Pro allows 100 requests/minute, and Enterprise offers custom limits. All plans support burst capacity.",
    },
    {
      question: "Does the API support synchronous and asynchronous extraction?",
      answer:
        "Yes. For small documents, use the synchronous endpoint for immediate results. For larger files or batch processing, use the async endpoint and poll for status or receive a webhook.",
    },
    {
      question: "What file formats can I submit via the API?",
      answer:
        "The API accepts PDF, PNG, JPG, TIFF, WEBP, BMP, and DOCX files. You can upload files directly (multipart/form-data) or provide a publicly accessible URL.",
    },
    {
      question: "Are there official SDKs available?",
      answer:
        "Yes. Parsli offers official SDKs for Python (pip install parsli), Node.js (npm install @parsli/sdk), Java, and Go. Community SDKs are also available for Ruby and PHP.",
    },
    {
      question: "Can I define custom extraction schemas via the API?",
      answer:
        "Absolutely. The API supports a schema definition endpoint where you can create, update, and manage custom extraction templates programmatically.",
    },
  ],
};
