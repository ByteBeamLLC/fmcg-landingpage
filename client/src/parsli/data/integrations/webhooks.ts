import {
  Webhook,
  Settings,
  Zap,
  Code,
  Shield,
  RefreshCw,
  FileJson,
  Bell,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const webhooksData: IntegrationPageData = {
  slug: "webhooks",
  seo: {
    title: "Parsli Webhooks | Receive Extraction Results via HTTP Callbacks",
    description:
      "Configure webhooks to receive real-time HTTP POST callbacks whenever Parsli finishes extracting data from a document. Build event-driven document pipelines.",
    keywords:
      "webhooks integration, Parsli webhooks, HTTP callback document extraction, real-time extraction events, webhook OCR, event-driven document processing, webhook automation",
  },
  hero: {
    integrationName: "Webhooks",
    integrationLogo: "\u{1FA9D}",
    headline: "Receive Extraction Results Instantly via Webhooks",
    subheadline:
      "Parsli sends an HTTP POST request to your endpoint every time a document is processed\u2014delivering structured JSON data in real time so your systems can react immediately.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Register Your Endpoint",
      description:
        "Provide the URL of your HTTP endpoint in the Parsli dashboard. Parsli will send POST requests with extraction results to this URL.",
      icon: Webhook,
    },
    {
      step: "2",
      title: "Configure Event Types",
      description:
        "Choose which events trigger a webhook: extraction completed, extraction failed, confidence below threshold, or all events.",
      icon: Settings,
    },
    {
      step: "3",
      title: "Set Security Headers",
      description:
        "Add a signing secret so your endpoint can verify that incoming requests genuinely originate from Parsli. HMAC-SHA256 signatures are included in every request.",
      icon: Shield,
    },
    {
      step: "4",
      title: "Test & Activate",
      description:
        "Send a test payload to verify your endpoint responds correctly, then activate the webhook to start receiving live extraction events.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: FileJson,
      title: "Structured JSON Payloads",
      description:
        "Every webhook delivers a clean JSON payload with extracted fields, confidence scores, document metadata, and processing timestamps.",
      benefit: "Parse the payload directly into your database or application logic.",
    },
    {
      icon: Shield,
      title: "HMAC-SHA256 Signing",
      description:
        "Every webhook request includes an HMAC signature header so your endpoint can cryptographically verify the request originated from Parsli.",
      benefit: "Prevent spoofed or tampered payloads from reaching your systems.",
    },
    {
      icon: RefreshCw,
      title: "Automatic Retries",
      description:
        "If your endpoint returns a non-2xx status, Parsli retries the webhook up to 5 times with exponential backoff. Failed deliveries are logged for review.",
      benefit: "Never lose extraction results due to transient endpoint issues.",
    },
    {
      icon: Bell,
      title: "Event Filtering",
      description:
        "Subscribe only to the events you care about: successful extractions, failures, low-confidence results, or specific document types.",
      benefit: "Reduce noise and process only the events relevant to your workflow.",
    },
    {
      icon: Code,
      title: "Developer-Friendly Documentation",
      description:
        "Full payload schema documentation, sample payloads, and code examples in Python, Node.js, Go, and PHP are available in the Parsli developer docs.",
      benefit: "Integrate webhooks into your stack in minutes, not days.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Real-Time Invoice Processing",
      description:
        "Receive a webhook when an invoice is extracted, then automatically create a bill in your accounting system or trigger an approval workflow.",
      slug: "invoice-parsing",
    },
    {
      title: "Order Processing Pipeline",
      description:
        "Trigger order creation in your ERP or fulfillment system the moment a purchase order is parsed, reducing order-to-shipment time.",
      slug: "order-processing",
    },
    {
      title: "Lead Capture Automation",
      description:
        "When a lead form or business card is extracted, fire a webhook to create a new contact in your CRM and notify your sales team.",
      slug: "lead-capture",
    },
  ],
  faq: [
    {
      question: "What HTTP method does Parsli use for webhooks?",
      answer:
        "Parsli sends HTTP POST requests with a JSON body and Content-Type: application/json header to your registered endpoint.",
    },
    {
      question: "How do I verify webhook authenticity?",
      answer:
        "Every request includes an X-Parsli-Signature header containing an HMAC-SHA256 hash of the payload. Compute the hash with your signing secret and compare to verify.",
    },
    {
      question: "What happens if my endpoint is down?",
      answer:
        "Parsli retries failed deliveries up to 5 times with exponential backoff (1s, 5s, 30s, 2min, 10min). All delivery attempts are logged in your dashboard.",
    },
    {
      question: "Can I register multiple webhook endpoints?",
      answer:
        "Yes. You can register multiple endpoints and configure each one to receive different event types or extraction results from different document templates.",
    },
    {
      question: "Is there a webhook delivery log?",
      answer:
        "Yes. The Parsli dashboard shows a complete history of webhook deliveries including status codes, response times, and retry attempts for debugging.",
    },
  ],
};
