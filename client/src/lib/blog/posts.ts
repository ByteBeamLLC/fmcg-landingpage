/**
 * Single source of truth for published blog posts.
 *
 * Used by:
 * - /blog index (card grid + category sections)
 * - BlogRelatedPosts (cross-post cards rendered inside blog posts)
 *
 * Adding a new post: add an entry here and a `<Route>` in App.tsx. Posts
 * with `hidden: true` are excluded from the index and cross-link helpers
 * (e.g. content that has been migrated to a sibling domain).
 *
 * Categories follow the parsli SEO framework's pillar split: a small,
 * stable taxonomy (3-4 categories) prevents tag sprawl and keeps the
 * index readable at scale.
 */

export type BlogCategory =
  | "Regulatory"
  | "Compliance"
  | "Automation"
  | "Industry";

export interface BlogPostMeta {
  slug: string;
  title: string;
  /** Short version for related-posts cards (the long title is hard to scan in 2 lines). */
  shortTitle?: string;
  description: string;
  category: BlogCategory;
  /** Vertical / industry tag — separate from the SEO pillar. */
  industry: string;
  readTime: string;
  date: string;
  /** Hide from the index and from related-posts helpers. Use for migrated/redirected posts. */
  hidden?: boolean;
  /** When set, used as the `dateModified` schema field. Falls back to `date`. */
  updated?: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "sfda-pharmacovigilance-qppv-requirements",
    title:
      "SFDA Pharmacovigilance & QPPV Requirements: A Practical Guide for In-House Teams in 2026",
    shortTitle: "SFDA Pharmacovigilance & QPPV Guide",
    description:
      "SFDA pharmacovigilance for in-house RA/PV teams: QPPV qualifications, PSSF, ICSR/PSUR/RMP cycles, and where automation actually helps in 2026.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "14 min",
    date: "2026-05-07",
    updated: "2026-05-07",
  },
  {
    slug: "sfda-variations-type-ia-ib-ii-decision-guide",
    title:
      "SFDA Variations Decision Guide: Type IA, IB, II — A Practical Reference for In-House RA Teams",
    shortTitle: "SFDA Variations Decision Guide",
    description:
      "How SFDA classifies post-approval variations under Guidelines v6.3, when to use Type IA / IA(IN) / IB / II, and where the work is automatable.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "14 min",
    date: "2026-05-07",
    updated: "2026-05-07",
  },
  {
    slug: "sfda-ectd-submission-module-structure",
    title:
      "SFDA eCTD Submission Format: Module 1 Regional Requirements & Common RFIs in 2026",
    shortTitle: "SFDA eCTD Submission Format",
    description:
      "How SFDA submissions work in eCTD: GCC Module 1 specification, module content, what triggers RFIs, and where in-house teams should focus automation.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "14 min",
    date: "2026-05-07",
    updated: "2026-05-07",
  },
  {
    slug: "sfda-drug-master-file-letter-of-access",
    title:
      "SFDA Drug Master File (DMF) and Letter of Access: A Practical Guide for API Manufacturers and MAHs",
    shortTitle: "SFDA DMF & Letter of Access Guide",
    description:
      "How DMFs are submitted to SFDA, how the Letter of Access works, what the open and restricted parts contain, and where API manufacturers lose review time.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "13 min",
    date: "2026-05-07",
    updated: "2026-05-07",
  },
  {
    slug: "sfda-impurity-profile-ich-q3a-q3b-q3d",
    title:
      "Impurity Profile for SFDA Drug Submissions: ICH Q3A, Q3B, Q3D, and M7 in Practice",
    shortTitle: "Impurity Profile Guide (ICH Q3 / M7)",
    description:
      "Build a defensible impurity profile for SFDA submissions: ICH Q3A/B thresholds, Q3D elemental impurities, and M7 mutagenic-impurity assessment.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "14 min",
    date: "2026-05-07",
    updated: "2026-05-07",
  },
  {
    slug: "sfda-drug-registration-guide-saudi-arabia",
    title: "SFDA Drug Registration Guide Saudi Arabia: Complete 2026 Process",
    shortTitle: "SFDA Drug Registration Guide",
    description:
      "Navigate SFDA drug registration in Saudi Arabia. Complete guide covering CTD requirements, GMP certification, pricing approval, and timeline for 2026.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "18 min",
    date: "2026-01-16",
    updated: "2026-05-07",
  },
  {
    slug: "no-code-document-automation-regulatory-teams-2026",
    title: "No-Code Document Automation for Regulatory Teams: 2026 Guide",
    shortTitle: "No-Code Document Automation for RA Teams",
    description:
      "Learn how regulatory teams use no-code document automation to build compliance workflows without IT. Citizen developer guide with tools and use cases for 2026.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "10 min",
    date: "2026-01-16",
  },
  {
    slug: "arabic-ocr-challenges-solutions-2026",
    title: "Arabic OCR in 2026: Why It's Still Hard and What Actually Works",
    shortTitle: "Arabic OCR: What Actually Works",
    description:
      "Arabic OCR remains 20-30% less accurate than English. Learn why, what solutions actually work (we tested them), and how to design production systems around 80% accuracy.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "8 min",
    date: "2026-01-21",
  },
  {
    slug: "agentic-ocr-intelligent-data-extraction-2026",
    title:
      "Agentic OCR: How AI Agents Are Revolutionizing Document Data Extraction in 2026",
    shortTitle: "Agentic OCR Explained",
    description:
      "Agentic OCR explained for 2026. Learn how AI agents transform document extraction with adaptive reasoning, when to use it, and what it means for your business.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "12 min",
    date: "2026-01-21",
  },
  {
    slug: "intelligent-document-processing-business-guide-2026",
    title:
      "Intelligent Document Processing Explained: A Business User's Guide for 2026",
    shortTitle: "Intelligent Document Processing Explained",
    description:
      "IDP explained for 2026. Learn what intelligent document processing is, how it differs from OCR, and how your team can use it—no tech background needed.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "9 min",
    date: "2026-01-16",
  },
  {
    slug: "automation-platform-comparison-2026",
    title:
      "Automation Platforms Compared (2026): AI Agent Builders vs RPA vs IDP vs Workflow",
    shortTitle: "Automation Platforms Compared",
    description:
      "In 2026, automation is a stack. This guide compares AI agent builders, RPA, IDP, and workflow platforms—plus how non-technical SMEs can build document-work agents.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "12 min",
    date: "2026-01-17",
  },
  {
    slug: "automating-invoice-processing-2026",
    title:
      "Automating Invoice Processing in 2026: The Complete Guide for Finance Teams",
    shortTitle: "Automating Invoice Processing",
    description:
      "Cut invoice processing costs by 80% in 2026. Learn how AI automation reduces manual AP work from $16 to $3 per invoice with step-by-step implementation.",
    category: "Automation",
    industry: "Finance",
    readTime: "11 min",
    date: "2026-01-16",
  },
  {
    slug: "uae-food-labeling-requirements-2026",
    title: "UAE Food Labeling Requirements: Complete Compliance Guide 2026",
    shortTitle: "UAE Food Labeling Requirements",
    description:
      "Comprehensive guide to UAE food labeling requirements. Covers ESMA standards, Dubai Municipality Montaji registration, 12 mandatory label elements, Arabic language rules, GSO 2233:2021 nutritional information, allergen declarations, and penalties.",
    category: "Compliance",
    industry: "FMCG",
    readTime: "14 min",
    date: "2025-11-15",
  },
  {
    slug: "dubai-municipality-montaji-food-registration",
    title: "Dubai Municipality Montaji Food Registration Guide",
    shortTitle: "Dubai Montaji Food Registration",
    description:
      "Step-by-step guide to registering FMCG products with Dubai Municipality's Montaji portal — required documents, timelines, and common rejections.",
    category: "Compliance",
    industry: "FMCG",
    readTime: "10 min",
    date: "2025-11-15",
  },
  // Migrated to recipebuilder.bytebeam.co — kept here so the route still
  // resolves (with a 5s redirect) but excluded from index + related lists.
  {
    slug: "gcc-document-compliance-automation-2026",
    title: "GCC Document Compliance Automation: A No-Code Approach for 2026",
    description:
      "Migrated to RecipeBuilder by ByteBeam. See recipebuilder.bytebeam.co for the latest food labeling and nutrition compliance guides.",
    category: "Compliance",
    industry: "FMCG",
    readTime: "—",
    date: "2026-01-16",
    hidden: true,
  },
];

export function getVisiblePosts(): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => !p.hidden);
}

export function getPost(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsBySlugs(slugs: string[]): BlogPostMeta[] {
  return slugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPostMeta => p !== undefined && !p.hidden);
}

export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
  return getVisiblePosts().filter((p) => p.category === category);
}
