import { LucideIcon } from "lucide-react";

// Shared types
export interface ParsliStat {
  value: string;
  label: string;
}

export interface ParsliStep {
  step: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface ParsliFAQItem {
  question: string;
  answer: string;
}

export interface ParsliFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit?: string;
}

export interface ParsliIntegrationRef {
  slug: string;
  relevance: string;
}

export interface ParsliPricingTier {
  name: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  quota: number | null;
  quotaLabel: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  badge?: string;
}

// Page data shapes
export interface UseCasePageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    badge: string;
    badgeIcon: LucideIcon;
    headline: string;
    subheadline: string;
    stats: ParsliStat[];
    ctaText: string;
  };
  painPoints: {
    headline: string;
    subheadline: string;
    items: ParsliStat[];
  };
  howItWorks: {
    headline: string;
    subheadline: string;
    steps: ParsliStep[];
  };
  features: ParsliFeature[];
  integrations: ParsliIntegrationRef[];
  faq: ParsliFAQItem[];
  cta: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  relatedUseCases: string[];
}

export interface IndustryPageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    badge: string;
    badgeIcon: LucideIcon;
    headline: string;
    subheadline: string;
    stats: ParsliStat[];
  };
  painPoints: {
    headline: string;
    subheadline: string;
    items: ParsliStat[];
  };
  useCases: {
    headline: string;
    subheadline: string;
    items: ParsliFeature[];
  };
  howItWorks: ParsliStep[];
  benefits: ParsliFeature[];
  faq: ParsliFAQItem[];
  cta: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  relatedIndustries: string[];
}

export interface IntegrationPageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    integrationName: string;
    integrationLogo: string;
    headline: string;
    subheadline: string;
  };
  setupSteps: ParsliStep[];
  features: ParsliFeature[];
  useCasesWithIntegration: {
    title: string;
    description: string;
    slug: string;
  }[];
  faq: ParsliFAQItem[];
}

export interface ComparisonPageData {
  slug: string;
  competitorName: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    headline: string;
    subheadline: string;
  };
  comparisonTable: {
    categories: {
      name: string;
      features: {
        name: string;
        parsli: string | boolean;
        competitor: string | boolean;
        highlight?: boolean;
      }[];
    }[];
  };
  pricingComparison: {
    tiers: {
      name: string;
      parsliPrice: string;
      parsliQuota: string;
      competitorPrice: string;
      competitorQuota: string;
    }[];
  };
  advantages: ParsliFeature[];
  faq: ParsliFAQItem[];
}

export interface DocumentTypePageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    badge: string;
    badgeIcon: LucideIcon;
    headline: string;
    subheadline: string;
    stats: ParsliStat[];
  };
  extractableFields: {
    fieldName: string;
    description: string;
    example: string;
  }[];
  howItWorks: ParsliStep[];
  supportedFormats: string[];
  relatedUseCases: string[];
  faq: ParsliFAQItem[];
}
