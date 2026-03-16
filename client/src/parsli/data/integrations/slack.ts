import {
  MessageSquare,
  Settings,
  Zap,
  Bell,
  FileText,
  Search,
  Hash,
  Shield,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const slackData: IntegrationPageData = {
  slug: "slack",
  seo: {
    title: "Parsli + Slack Integration | Get Document Extraction Alerts in Slack",
    description:
      "Receive real-time Slack notifications when Parsli extracts data from your documents. Review results, flag issues, and share findings\u2014all inside Slack.",
    keywords:
      "Slack integration, Parsli Slack bot, document extraction notifications, Slack alerts OCR, Slack document workflow, team collaboration extraction",
  },
  hero: {
    integrationName: "Slack",
    integrationLogo: "\u{1F4AC}",
    headline: "Get Document Extraction Results Delivered to Slack",
    subheadline:
      "Parsli sends extraction summaries, alerts, and actionable notifications directly to your Slack channels\u2014keeping your team informed without leaving their workspace.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Install the Parsli Slack App",
      description:
        "Add the Parsli bot to your Slack workspace with a single click. We request only the permissions needed to post messages to your selected channels.",
      icon: MessageSquare,
    },
    {
      step: "2",
      title: "Choose Notification Channels",
      description:
        "Select which Slack channels or DMs should receive extraction alerts. Route different document types to different channels for organized notifications.",
      icon: Hash,
    },
    {
      step: "3",
      title: "Customize Alert Content",
      description:
        "Define what data appears in each Slack notification: extracted fields, confidence scores, document thumbnails, or download links.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Go Live",
      description:
        "Activate the integration. Every time Parsli processes a document, a formatted notification is posted to your configured Slack channels.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Bell,
      title: "Real-Time Extraction Alerts",
      description:
        "Receive a Slack message within seconds of Parsli completing an extraction. Each notification includes key extracted fields and a link to full results.",
      benefit: "Stay informed without checking the Parsli dashboard.",
    },
    {
      icon: Hash,
      title: "Channel-Based Routing",
      description:
        "Send invoice alerts to #finance, receipt notifications to #expenses, and contract extractions to #legal. Each document type gets its own channel.",
      benefit: "Right information, right team, right channel.",
    },
    {
      icon: Search,
      title: "Slash Command Extraction",
      description:
        "Use the /parsli slash command to upload a document directly from Slack and receive extracted data as an inline reply.",
      benefit: "Extract documents without leaving your Slack conversation.",
    },
    {
      icon: FileText,
      title: "Rich Message Formatting",
      description:
        "Notifications use Slack\u2019s Block Kit for clean formatting: tables for extracted data, buttons for actions, and expandable sections for details.",
      benefit: "Readable, actionable notifications\u2014not walls of text.",
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description:
        "Control who can trigger extractions and view results in Slack based on channel membership and Parsli role settings.",
      benefit: "Keep sensitive document data visible only to authorized team members.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Invoice Approval Notifications",
      description:
        "When Parsli extracts an invoice, post the vendor name, amount, and due date to a Slack channel for quick team review and approval.",
      slug: "invoice-parsing",
    },
    {
      title: "Lead Capture Alerts",
      description:
        "Notify your sales team in Slack whenever a new lead document is parsed, including contact details and inquiry information.",
      slug: "lead-capture",
    },
    {
      title: "Order Processing Updates",
      description:
        "Post order details to a fulfillment channel when purchase orders are parsed, enabling your operations team to act immediately.",
      slug: "order-processing",
    },
  ],
  faq: [
    {
      question: "Can I upload documents directly to Slack for extraction?",
      answer:
        "Yes. Use the /parsli slash command or upload a file in a channel where the Parsli bot is active. Parsli will extract data and reply with results inline.",
    },
    {
      question: "Will Parsli post to private channels?",
      answer:
        "Yes, as long as the Parsli bot has been invited to the private channel. Notifications respect Slack\u2019s existing channel permissions.",
    },
    {
      question: "Can I customize which fields appear in Slack notifications?",
      answer:
        "Absolutely. In the Parsli settings, you can choose exactly which extracted fields, confidence scores, and metadata appear in each Slack message.",
    },
    {
      question: "Does the Slack integration work with Slack Connect?",
      answer:
        "Yes. If the Parsli bot is added to a Slack Connect channel, it can post extraction notifications to shared channels with external partners.",
    },
    {
      question: "How do I stop notifications for specific document types?",
      answer:
        "You can create notification rules in Parsli that filter by document type, extraction template, or confidence threshold. Only matching extractions trigger Slack messages.",
    },
  ],
};
