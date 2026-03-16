import { Shield, Lock, Globe, Server, Eye, FileCheck, Users, Clock } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";

const securityFeatures = [
  { icon: Lock, title: "End-to-End Encryption", description: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your documents are never stored unencrypted.", benefit: "AES-256 + TLS 1.3" },
  { icon: Shield, title: "SOC 2 Type II", description: "Independently audited controls for security, availability, and confidentiality. Annual audit by a certified third party.", benefit: "Certified compliant" },
  { icon: Globe, title: "GDPR Compliant", description: "Full GDPR compliance with EU data processing, right to erasure, data portability, and DPA agreements available.", benefit: "EU data processing" },
  { icon: Server, title: "Data Residency", description: "Choose where your data is processed and stored. Options include US, EU, and custom regions for enterprise customers.", benefit: "Your choice of region" },
  { icon: Eye, title: "Access Controls", description: "Role-based access control (RBAC) with SSO/SAML support. Audit logs track every action in your account.", benefit: "Full audit trail" },
  { icon: FileCheck, title: "Data Retention Policies", description: "Configure automatic data deletion. Set retention periods from 24 hours to unlimited. Delete documents on-demand at any time.", benefit: "You control retention" },
  { icon: Users, title: "Team Permissions", description: "Granular permissions per user, per parser. Separate admin, editor, and viewer roles for fine-grained control.", benefit: "Granular RBAC" },
  { icon: Clock, title: "99.9% Uptime SLA", description: "Enterprise plans include SLA-backed 99.9% uptime guarantee with proactive monitoring and incident response.", benefit: "SLA guaranteed" },
];

const securityFAQ = [
  { question: "Where is my data stored?", answer: "By default, data is processed and stored in the US (AWS us-east-1). EU customers can opt for EU data processing (AWS eu-west-1). Enterprise plans support custom regions." },
  { question: "Can I delete my data?", answer: "Yes. Delete individual documents, parser results, or your entire account at any time. Deletion is immediate and irreversible. We also support configurable auto-deletion policies." },
  { question: "Do you share data with third parties?", answer: "No. Your documents and extracted data are never shared with, sold to, or accessed by third parties. We do not use your data to train AI models." },
  { question: "Is Parsli HIPAA compliant?", answer: "We offer HIPAA-eligible configurations for healthcare customers on Enterprise plans, including BAA agreements and dedicated infrastructure." },
  { question: "Do you support SSO/SAML?", answer: "Yes. Enterprise plans include SAML-based SSO integration with providers like Okta, Azure AD, and Google Workspace." },
  { question: "How do you handle vulnerability management?", answer: "We conduct weekly automated vulnerability scans, annual third-party penetration testing, and maintain a responsible disclosure program. Critical vulnerabilities are patched within 24 hours." },
];

export default function ParsliSecurityPage() {
  return (
    <>
      <ParsliSEO
        title="Security & Compliance - Enterprise-Grade Data Protection"
        description="SOC 2 Type II certified, GDPR compliant, end-to-end encryption. Learn how Parsli protects your documents and extracted data."
        path="/security"
        keywords="document parser security, SOC 2 certified, GDPR compliant document processing, secure data extraction, enterprise document security"
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge="Security"
        badgeIcon={Shield}
        headline="Enterprise Security You Can Trust"
        highlightWord="Trust"
        subheadline="SOC 2 Type II certified, GDPR compliant, end-to-end encrypted. Your documents are always under your control."
        stats={[
          { value: "SOC 2", label: "Type II Certified" },
          { value: "GDPR", label: "Fully Compliant" },
          { value: "AES-256", label: "Encryption Standard" },
        ]}
      />

      <ParsliFeatureGrid
        headline="Security & Compliance Features"
        subheadline="Built from the ground up with enterprise security requirements in mind."
        features={securityFeatures}
        columns={4}
      />

      <ParsliFAQ
        headline="Security FAQ"
        subheadline="Common questions about how we protect your data."
        items={securityFAQ}
      />

      <ParsliCTA
        headline="Security Questions?"
        subheadline="Contact our security team for audit reports, DPA agreements, or custom compliance requirements."
        ctaText="Contact Security Team"
        secondaryCta="Start Free Trial"
        secondaryHref="/parsli/pricing"
      />

      <ParsliFooter />
    </>
  );
}
