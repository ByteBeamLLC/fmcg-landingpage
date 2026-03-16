import { Mail, Forward, Inbox, Filter, Zap, Shield, Clock, RefreshCw } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliIntegrationGrid from "../components/ParsliIntegrationGrid";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";

const emailFeatures = [
  { icon: Inbox, title: "Dedicated Email Inbox", description: "Get a unique @parsli.io email address for each parser. Forward emails or set up auto-forwarding rules.", benefit: "Unique inbox per parser" },
  { icon: Forward, title: "Auto-Forward Rules", description: "Set up Gmail or Outlook rules to auto-forward specific emails. New messages are parsed instantly.", benefit: "Zero manual effort" },
  { icon: Filter, title: "Smart Filtering", description: "Parse only specific parts of emails — body text, attachments, or both. Ignore signatures and boilerplate.", benefit: "Precision control" },
  { icon: Mail, title: "Attachment Parsing", description: "Automatically extract data from email attachments — PDFs, images, spreadsheets, and more.", benefit: "Any attachment type" },
  { icon: RefreshCw, title: "Auto-Learning", description: "Parsli learns your email patterns. The more emails you process, the more accurate it becomes.", benefit: "Improves over time" },
  { icon: Shield, title: "Secure Processing", description: "Emails are encrypted in transit and at rest. Parsed data is stored securely with GDPR compliance.", benefit: "Enterprise security" },
];

const emailSteps = [
  { step: "1", title: "Get Your Parsli Inbox", description: "Create a new parser and get a unique email address like invoices@yourcompany.parsli.io. Each parser gets its own inbox.", icon: Inbox },
  { step: "2", title: "Forward or Auto-Route Emails", description: "Set up auto-forwarding in Gmail/Outlook, or manually forward emails. Parsli processes them within seconds of arrival.", icon: Forward },
  { step: "3", title: "Data Extracted & Delivered", description: "Parsli extracts structured data from the email body and attachments, then sends it to Google Sheets, your CRM, or any connected app.", icon: Zap },
];

const emailFAQ = [
  { question: "Can I parse emails from Gmail and Outlook?", answer: "Yes. Set up auto-forwarding rules in Gmail or Outlook to send specific emails to your Parsli inbox. Works with any email provider that supports forwarding." },
  { question: "Does Parsli read email attachments?", answer: "Yes. Parsli parses both the email body and all attachments. Supported formats include PDF, images (JPG, PNG), Excel, CSV, Word docs, and more." },
  { question: "Can I set up rules for which emails get parsed?", answer: "Yes. Use your email provider's filtering/forwarding rules to send only specific emails (e.g., from certain senders or with specific subjects) to your Parsli inbox." },
  { question: "How fast are emails processed?", answer: "Most emails are processed within 5-10 seconds of arriving in your Parsli inbox. You'll receive the extracted data almost instantly via your configured output." },
  { question: "Is there a limit on email attachments?", answer: "Each email counts as 1 page, plus 1 page per attachment page. A 5-page PDF attachment counts as 5 pages. There's no limit on attachment size or number." },
];

export default function ParsliEmailParser() {
  return (
    <>
      <ParsliSEO
        title="Email Parser - Extract Data From Emails Automatically"
        description="Parse emails and attachments into structured data automatically. Forward emails to your Parsli inbox and get extracted data in Google Sheets, CRM, or any app."
        path="/email-parser"
        keywords="email parser, parse email data, extract email attachments, email to spreadsheet, automated email processing, email data extraction"
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge="Email Parser"
        badgeIcon={Mail}
        headline="Turn Emails Into Structured Data"
        highlightWord="Structured Data"
        subheadline="Forward emails to your Parsli inbox — we extract data from the body and attachments, then send it wherever you need."
        stats={[
          { value: "< 10s", label: "Processing Time" },
          { value: "99.2%", label: "Accuracy on Emails" },
          { value: "50+", label: "Attachment Formats" },
        ]}
      />

      <ParsliHowItWorks
        headline="Email Parsing in 3 Steps"
        subheadline="Set it up once, then forget about it. Parsli handles incoming emails automatically."
        steps={emailSteps}
      />

      <ParsliFeatureGrid
        headline="Email Parsing Features"
        subheadline="Everything you need to automate email data extraction."
        features={emailFeatures}
        columns={3}
      />

      <ParsliIntegrationGrid
        headline="Where Email Data Goes"
        subheadline="Extracted email data flows directly to your tools."
        filterSlugs={["gmail", "outlook", "google-sheets", "zapier", "slack", "webhooks"]}
        compact
      />

      <ParsliFAQ items={emailFAQ} />

      <ParsliCTA
        headline="Start Parsing Emails in Minutes"
        subheadline="Get your Parsli inbox and start extracting data today. Free 26 pages/month."
      />

      <ParsliFooter />
    </>
  );
}
