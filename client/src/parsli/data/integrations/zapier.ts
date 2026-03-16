import {
  Zap,
  Settings,
  GitBranch,
  FileText,
  Repeat,
  Layers,
  Clock,
  Puzzle,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const zapierData: IntegrationPageData = {
  slug: "zapier",
  seo: {
    title: "Parsli + Zapier Integration | Connect Document Extraction to 6,000+ Apps",
    description:
      "Use Parsli\u2019s Zapier integration to automatically extract data from documents and send it to any of 6,000+ apps\u2014CRMs, ERPs, spreadsheets, and more.",
    keywords:
      "Zapier integration, Parsli Zapier, document extraction automation, no-code document parsing, Zapier OCR, automate data entry Zapier, Zap document workflow",
  },
  hero: {
    integrationName: "Zapier",
    integrationLogo: "\u26A1",
    headline: "Connect Parsli to 6,000+ Apps with Zapier",
    subheadline:
      "Build powerful no-code automations that extract data from documents and route it to your favorite tools\u2014CRMs, accounting software, project managers, and beyond.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Add Parsli to Your Zap",
      description:
        "Search for Parsli in the Zapier app directory and add it as a trigger or action step in any new or existing Zap.",
      icon: Puzzle,
    },
    {
      step: "2",
      title: "Authenticate Your Account",
      description:
        "Enter your Parsli API key to securely connect your account. Zapier stores your credentials encrypted and never exposes them.",
      icon: Settings,
    },
    {
      step: "3",
      title: "Configure Trigger & Fields",
      description:
        "Choose a trigger event (e.g., \u201CNew Document Processed\u201D) and map extracted fields to downstream app fields with Zapier\u2019s visual mapper.",
      icon: GitBranch,
    },
    {
      step: "4",
      title: "Test & Publish",
      description:
        "Run a test extraction, verify the data flows correctly into your destination app, then publish your Zap to run automatically.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Layers,
      title: "6,000+ App Connections",
      description:
        "Parsli\u2019s extracted data can flow into any Zapier-supported app: Salesforce, QuickBooks, Notion, Airtable, HubSpot, and thousands more.",
      benefit: "Eliminate custom code for every new destination system.",
    },
    {
      icon: GitBranch,
      title: "Multi-Step Zap Support",
      description:
        "Use Parsli as a trigger or mid-Zap action. Chain extraction with filters, formatters, and multiple downstream actions in a single workflow.",
      benefit: "Build sophisticated document pipelines without writing a line of code.",
    },
    {
      icon: Repeat,
      title: "Trigger & Action Modes",
      description:
        "Trigger a Zap when Parsli finishes processing a document, or use Parsli as an action to extract data from a file provided by another app.",
      benefit: "Flexibility to fit any workflow direction.",
    },
    {
      icon: Clock,
      title: "Real-Time or Scheduled",
      description:
        "Run Zaps instantly on every new extraction or batch them on a schedule that suits your reporting cadence.",
      benefit: "Control timing to match your operational rhythm.",
    },
    {
      icon: FileText,
      title: "Structured JSON Output",
      description:
        "Parsli delivers clean, structured JSON to Zapier so every field maps neatly to your destination app\u2014no manual cleanup needed.",
      benefit: "Reliable, consistent data in every Zap run.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Invoice Data to Accounting Software",
      description:
        "Extract invoice details with Parsli and push them directly into QuickBooks, Xero, or FreshBooks via Zapier\u2014automating accounts payable end to end.",
      slug: "invoice-parsing",
    },
    {
      title: "Lead Document Capture to CRM",
      description:
        "Parse lead forms, business cards, or inquiry documents and create new contacts in HubSpot, Salesforce, or Pipedrive automatically.",
      slug: "lead-capture",
    },
    {
      title: "Receipt Data to Expense Tracker",
      description:
        "Extract receipt amounts, dates, and vendors, then log them into Expensify, Google Sheets, or any expense management tool via Zapier.",
      slug: "receipt-parsing",
    },
  ],
  faq: [
    {
      question: "Is the Parsli Zapier integration free?",
      answer:
        "The Parsli Zapier app is free to install. You will need an active Parsli plan for document extraction and a Zapier plan that supports the number of tasks you need.",
    },
    {
      question: "Can I use Parsli as both a trigger and an action in Zapier?",
      answer:
        "Yes. Parsli supports trigger events (e.g., \u201CNew Document Processed\u201D) and action steps (e.g., \u201CExtract Data from File\u201D), so you can use it in either position.",
    },
    {
      question: "What data format does Parsli send to Zapier?",
      answer:
        "Parsli sends structured JSON with labeled fields (e.g., vendor_name, total_amount, line_items). Zapier automatically maps these fields for you in the visual editor.",
    },
    {
      question: "How many Zaps can I create with Parsli?",
      answer:
        "There is no limit on the number of Zaps you can create. The only constraint is your Zapier plan\u2019s task quota and your Parsli extraction quota.",
    },
  ],
};
