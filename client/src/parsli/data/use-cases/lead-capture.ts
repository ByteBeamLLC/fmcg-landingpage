import {
  UserPlus,
  Mail,
  Upload,
  Cpu,
  CheckCircle,
  Target,
  Clock,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const leadCaptureData: UseCasePageData = {
  slug: "lead-capture",
  seo: {
    title: "Automated Lead Capture from Emails & Forms | Parsli",
    description:
      "Parse lead notification emails, web form submissions, and inquiry messages to extract contact info, company details, and intent signals — then push them straight into your CRM.",
    keywords:
      "lead capture automation, parse lead emails, email to CRM, lead data extraction, automated lead entry, web form parsing, lead management automation",
  },
  hero: {
    badge: "Lead Capture",
    badgeIcon: UserPlus,
    headline: "Never Let a Lead Slip Through the Cracks",
    subheadline:
      "Parsli monitors your inbox for lead notification emails, web form submissions, and inquiry messages — extracts name, email, phone, company, and intent — and pushes structured lead data into your CRM within seconds.",
    stats: [
      { value: "< 10s", label: "Lead-to-CRM entry time" },
      { value: "99.5%", label: "Contact field extraction accuracy" },
      { value: "2.4x", label: "Faster speed-to-lead vs. manual entry" },
    ],
    ctaText: "Automate Lead Capture Free",
  },
  painPoints: {
    headline: "Manual Lead Entry Kills Conversion",
    subheadline:
      "Every minute between a lead's inquiry and your first response reduces close rates. Manual CRM entry makes it worse.",
    items: [
      {
        value: "78%",
        label: "Of deals go to the vendor that responds first",
      },
      {
        value: "23 min",
        label: "Average delay to manually enter one lead from email to CRM",
      },
      {
        value: "27%",
        label: "Of leads are never entered into CRM due to human oversight",
      },
    ],
  },
  howItWorks: {
    headline: "From Inquiry to CRM in Three Steps",
    subheadline:
      "Connect your lead sources. Parsli handles the data entry.",
    steps: [
      {
        step: "1",
        title: "Connect Lead Sources",
        description:
          "Forward lead notification emails (from web forms, marketplaces, or landing pages) to Parsli, or connect Gmail/Outlook for automatic filtering.",
        icon: Mail,
      },
      {
        step: "2",
        title: "AI Extracts Lead Details",
        description:
          "Parsli identifies and extracts name, email, phone, company name, job title, message body, source channel, and any custom fields from each lead communication.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Lead Lands in Your CRM",
        description:
          "Structured lead data is pushed to your CRM (Salesforce, HubSpot, Pipedrive, etc.) via Zapier, Make, or our REST API — with deduplication to avoid creating duplicate contacts.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Target,
      title: "Intent Signal Detection",
      description:
        "Parsli analyzes the lead's message content to extract buying signals, budget mentions, timeline references, and product interest — giving your sales team context before the first call.",
      benefit: "Prioritize hot leads based on extracted intent, not gut feel.",
    },
    {
      icon: Clock,
      title: "Real-Time Processing",
      description:
        "Leads are parsed and pushed to your CRM within seconds of email arrival. No batching delays. Your sales team gets notified instantly.",
      benefit: "Respond to leads in under a minute, not hours.",
    },
    {
      icon: Users,
      title: "Deduplication & Enrichment",
      description:
        "Parsli checks incoming leads against existing CRM contacts to prevent duplicates. When a match is found, the existing record is updated with new information instead.",
      benefit: "Clean CRM data without manual dedup work.",
    },
    {
      icon: BarChart3,
      title: "Source Attribution",
      description:
        "Automatically tags each lead with its source channel (Google Ads form, LinkedIn inquiry, website contact form, marketplace listing) based on email sender and content patterns.",
      benefit: "Accurate channel-level ROI tracking without UTM headaches.",
    },
    {
      icon: Bell,
      title: "Instant Slack/Email Alerts",
      description:
        "Get notified in Slack or via email the moment a new lead is parsed. Include extracted details in the notification so reps can act without opening the CRM.",
      benefit: "Sales reps see lead details in Slack and can respond immediately.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Auto-ingest lead notification emails from Gmail without forwarding rules.",
    },
    {
      slug: "outlook",
      relevance:
        "Connect Outlook 365 for enterprise lead email parsing.",
    },
    {
      slug: "zapier",
      relevance:
        "Push parsed lead data to Salesforce, HubSpot, Pipedrive, or any CRM via Zapier.",
    },
    {
      slug: "slack",
      relevance:
        "Send real-time lead alerts to a Slack channel with extracted contact details.",
    },
  ],
  faq: [
    {
      question: "What types of lead emails can Parsli parse?",
      answer:
        "Parsli handles web form notification emails (WordPress, Typeform, Webflow, HubSpot forms), marketplace lead alerts (Zillow, Thumbtack, Angi), LinkedIn InMail notifications, and plain-text inquiry emails. No templates needed.",
    },
    {
      question: "Can Parsli detect duplicate leads?",
      answer:
        "Yes. Parsli checks extracted email addresses and phone numbers against your existing CRM data via the integration layer. Duplicates are flagged and can be configured to either skip or update the existing record.",
    },
    {
      question: "How does Parsli handle leads from different form providers?",
      answer:
        "Parsli's model is trained on notification emails from dozens of form providers. It adapts to each provider's email format automatically — you don't need to set up separate parsers for Typeform vs. Gravity Forms vs. Webflow.",
    },
    {
      question: "Can I extract custom fields specific to my business?",
      answer:
        "Absolutely. Beyond standard contact fields, you can define custom extraction fields like 'budget range,' 'property type,' 'project timeline,' or any domain-specific attribute that appears in your lead emails.",
    },
    {
      question: "Does speed-to-lead actually matter?",
      answer:
        "Research consistently shows that responding within 5 minutes yields 8x higher contact rates than responding within 30 minutes. Parsli reduces the lead-to-CRM step to seconds, giving your team a head start.",
    },
    {
      question: "What if a lead email contains multiple contacts?",
      answer:
        "Parsli detects multi-contact emails (like CC'd stakeholders or team inquiries) and creates separate lead records for each person identified, linked together as part of the same inquiry.",
    },
  ],
  cta: {
    headline: "Capture Every Lead. Automatically.",
    subheadline:
      "Connect your inbox and CRM. Parsli fills the gap in seconds.",
    ctaText: "Start Capturing Leads Free",
  },
  relatedUseCases: [
    "email-to-spreadsheet",
    "resume-parsing",
    "order-processing",
  ],
};
