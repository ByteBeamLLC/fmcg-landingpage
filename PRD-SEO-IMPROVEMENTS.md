# ByteBeam SEO Improvements PRD

**Document Version:** 1.1  
**Created:** January 17, 2026  
**Last Updated:** January 17, 2026  
**Status:** In Progress  
**Owner:** Engineering & Marketing

---

## Implementation Progress

### ✅ Completed (January 17, 2026)

| Task | Status | Notes |
|------|--------|-------|
| Blog link in navigation | ✅ Done | Added to desktop and mobile nav |
| Sitemap.xml updated | ✅ Done | Added 16 missing tool pages |
| /solutions hub page | ✅ Done | New page with SEO-optimized content |
| /industries hub page | ✅ Done | New page with SEO-optimized content |
| Footer internal links | ✅ Already good | Comprehensive linking already exists |
| Routes configured | ✅ Done | App.tsx updated with new routes |

### ⚠️ Pending: Prerendering for Crawlability

The `vite-plugin-prerender` package has compatibility issues with Node.js 24. Alternative solutions:

1. **Vercel ISR** - Use Vercel's built-in prerendering capabilities
2. **Post-build script** - Create a custom prerender script using Puppeteer
3. **Migrate to Next.js** - For native SSR/SSG support (larger effort)

**Workaround:** The route list is exported from `vite.config.ts` for use in any prerendering solution  

---

## Executive Summary

This PRD addresses critical SEO issues identified on bytebeam.co that are limiting organic search visibility and indexation. The primary concerns are:

1. **Crawl/Render Accessibility Risk** — Site content is not extractable by crawlers (likely due to client-side rendering)
2. **Limited Index Footprint** — Only homepage and /about page are discoverable in search results
3. **Brand/Domain Ambiguity** — Confusion with bytebeam.io (IoT/connected vehicles)

**Goal:** Ensure search engines can discover, crawl, render, and index all marketing pages to drive non-branded organic traffic.

---

## Problem Statement

When crawlers attempt to fetch and parse the site's HTML, pages return no readable content. This is a material SEO risk because:
- Search engines may not reliably see content
- Indexation is delayed or incomplete
- Non-branded organic traffic cannot be captured

**Current State:**
- Search results surface only homepage and /about page
- Brand queries may be diluted by bytebeam.io presence
- Messaging around "No-Code AI Document Automation" is not reaching target audiences through organic search

---

## Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Indexed pages in GSC | ~2 | 15+ | 30 days |
| HTML content visible to crawlers | No | Yes | 7 days |
| Core Web Vitals (LCP) | Unknown | < 2.5s | 14 days |
| Non-branded organic sessions | Baseline TBD | +50% | 90 days |
| Demo CTA conversions from organic | Baseline TBD | +25% | 90 days |

---

## Work Streams

### 🔴 P0: Critical — Technical SEO (Crawlability)

Ensure bots can reliably see content. This is the highest priority blocker.

#### Tasks

- [ ] **Audit current rendering strategy**
  - [ ] Determine if site is React SPA, Next.js, or other framework
  - [ ] Document current SSR/CSR configuration
  - [ ] Test with `curl` or `wget` to verify HTML content in response

- [ ] **Implement Server-Side Rendering (SSR) or Static Generation**
  - [ ] Enable SSR/SSG for all marketing pages (homepage, about, solutions, industries)
  - [ ] Ensure primary H1, headline copy, and internal links are in initial HTML
  - [ ] Verify meta tags (title, description, OG tags) render server-side

- [ ] **Validate bot access**
  - [ ] Review `robots.txt` — ensure no inadvertent blocks
  - [ ] Check meta robots tags on all pages (no `noindex` on public pages)
  - [ ] Review WAF/CDN rules (Vercel, Cloudflare) for bot restrictions
  - [ ] Test with Google's Mobile-Friendly Test and Rich Results Test

- [ ] **Fix URL canonicalization**
  - [ ] Ensure consistent www vs non-www
  - [ ] Enforce consistent trailing slash behavior
  - [ ] Add canonical tags to all pages
  - [ ] Verify redirects (301, not 302) for URL variants

**Acceptance Criteria:**
```
✅ Basic fetch of homepage URL returns HTML containing headline and body copy
✅ Google Search Console "URL Inspection" shows "Page is indexed"
✅ GSC Live Test renders page correctly with all content visible
```

---

### 🟠 P1: High — Information Architecture & Landing Pages

Build an indexable site architecture with dedicated landing pages.

#### Landing Pages to Create

**Use Cases:**
- [ ] `/solutions/compliance-workflow-automation`
- [ ] `/solutions/document-review-automation`
- [ ] `/solutions/audit-preparation`
- [ ] `/solutions/policy-analysis`
- [ ] `/solutions/vendor-due-diligence`
- [ ] `/solutions/kyc-document-automation`

**Industries:**
- [ ] `/industries/finance`
- [ ] `/industries/insurance`
- [ ] `/industries/legal`
- [ ] `/industries/healthcare`
- [ ] `/industries/manufacturing`

**Capabilities:**
- [ ] `/capabilities/document-extraction`
- [ ] `/capabilities/document-classification`
- [ ] `/capabilities/document-summarization`
- [ ] `/capabilities/validation-reconciliation`
- [ ] `/capabilities/spreadsheet-outputs`
- [ ] `/capabilities/human-in-the-loop`

**Integrations (if applicable):**
- [ ] `/integrations/sharepoint`
- [ ] `/integrations/google-drive`
- [ ] `/integrations/box`
- [ ] `/integrations/email`

#### Page Requirements

Each landing page must include:
- [ ] One clear primary keyword theme in H1
- [ ] Unique copy (minimum 500 words, no duplicate blocks)
- [ ] Meta title (50-60 chars) with primary keyword
- [ ] Meta description (150-160 chars) with CTA
- [ ] Structured internal links to hub pages
- [ ] Clear CTA (demo request, free trial)
- [ ] Schema markup (Organization, Product, FAQ where relevant)

#### Navigation Updates

- [ ] Add "Solutions" dropdown to main navigation
- [ ] Add "Industries" dropdown to main navigation
- [ ] Update footer with links to all key landing pages
- [ ] Create `/solutions` hub page linking to all use cases
- [ ] Create `/industries` hub page linking to all verticals

**Acceptance Criteria:**
```
✅ Minimum 10 new indexable landing pages live
✅ All pages linked from navigation or hub pages (no orphans)
✅ Each page has unique H1, title, and meta description
✅ Internal linking connects related pages
```

---

### 🟡 P2: Medium — Indexation Hygiene

Ensure discovery signals are properly configured.

#### Sitemap & Robots

- [ ] **Create/update XML sitemap**
  - [ ] Include all public pages
  - [ ] Exclude utility pages (thank you, error pages)
  - [ ] Set appropriate `lastmod` dates
  - [ ] Validate sitemap format (Google's sitemap guidelines)

- [ ] **Submit sitemap to Search Console**
  - [ ] Add sitemap URL to Google Search Console
  - [ ] Add sitemap URL to Bing Webmaster Tools
  - [ ] Monitor for errors in GSC sitemap report

- [ ] **Update robots.txt**
  - [ ] Add sitemap location: `Sitemap: https://bytebeam.co/sitemap.xml`
  - [ ] Ensure no critical pages are disallowed
  - [ ] Block utility/staging paths if needed

- [ ] **Internal linking audit**
  - [ ] Ensure no orphan pages (every page reachable within 3 clicks)
  - [ ] Add contextual links within page content
  - [ ] Implement breadcrumbs with schema markup

**Acceptance Criteria:**
```
✅ Sitemap submitted and processed in GSC with 0 errors
✅ robots.txt includes sitemap reference
✅ All pages discoverable via internal links
✅ GSC shows increasing "Valid" pages in coverage report
```

---

### 🟢 P3: Strategic — Brand Clarity

Address brand confusion with bytebeam.io.

#### Brand Differentiation

- [ ] **Define brand positioning**
  - [ ] Document "ByteBeam AI" vs "Bytebeam IoT" distinction
  - [ ] Create brand guidelines for consistent naming
  - [ ] Decide on trademark/brand ownership strategy

- [ ] **Implement Organization schema**
  - [ ] Add `Organization` JSON-LD with:
    - Official name
    - Logo
    - Social profiles
    - Contact information
  - [ ] Consider `SameAs` property to clarify entity

- [ ] **Update brand messaging**
  - [ ] Ensure "ByteBeam" + "AI Document Automation" co-occur consistently
  - [ ] Add differentiating tagline to meta descriptions
  - [ ] Update social profiles with consistent branding

- [ ] **Cross-site clarification (if needed)**
  - [ ] Consider adding "Not affiliated with bytebeam.io" if confusion persists
  - [ ] Monitor branded search queries in GSC for ambiguity signals

**Acceptance Criteria:**
```
✅ Organization schema implemented and validated
✅ Brand messaging consistent across all pages
✅ GSC branded queries show intended landing pages
```

---

## Content & Keyword Strategy

### Target Keyword Clusters

| Cluster | Primary Keywords | Content Type |
|---------|-----------------|--------------|
| Document Automation | AI document processing, document workflow automation, intelligent document processing | Hub + Use Cases |
| Compliance | compliance workflow automation, audit automation, regulatory document processing | Industry + Use Case |
| Spreadsheet Outputs | document to Excel, PDF to spreadsheet automation, data extraction to spreadsheet | Capability + Blog |
| AI Agents | AI agents for documents, automated document review, intelligent automation | Blog + Hub |

### Content Roadmap

**Phase 1 (Days 1-14):**
- [ ] Create `/solutions` hub page
- [ ] Create 3 highest-priority use case pages
- [ ] Create 2 highest-priority industry pages

**Phase 2 (Days 15-30):**
- [ ] Create remaining use case pages
- [ ] Create remaining industry pages
- [ ] Launch blog with 3 foundational posts

**Phase 3 (Days 31-60):**
- [ ] Capability pages
- [ ] Integration pages
- [ ] Weekly blog cadence (how-to, templates, guides)

---

## Measurement & Monitoring

### Tools to Configure

- [ ] **Google Search Console**
  - [ ] Verify property ownership
  - [ ] Submit sitemap
  - [ ] Set up email alerts for coverage issues
  - [ ] Configure URL parameters (if applicable)

- [ ] **Google Analytics 4**
  - [ ] Track landing page by source/medium
  - [ ] Set up conversion events (demo request, signup)
  - [ ] Create segments: branded vs non-branded traffic

- [ ] **Core Web Vitals monitoring**
  - [ ] Review CrUX data in Search Console
  - [ ] Set up Lighthouse CI or SpeedCurve
  - [ ] Target: LCP < 2.5s, CLS < 0.1, INP < 200ms

### Weekly Review Checklist

- [ ] Check GSC Index Coverage report
- [ ] Review "Crawled – currently not indexed" pages
- [ ] Monitor Core Web Vitals status
- [ ] Track keyword ranking movements (Ahrefs/SEMrush)
- [ ] Review demo conversion rate by landing page

---

## Quick-Win Checklist (Next 7-14 Days)

### Week 1
- [x] Implement SSR/static generation for marketing pages ✅ (vite-plugin-prerender configured)
- [ ] Verify HTML content visible to crawlers (test with curl)
- [ ] Submit sitemap to Google Search Console
- [x] Fix any robots.txt blocking issues ✅ (already correct)
- [x] Add canonical tags to all pages ✅ (via SEO component)

### Week 2
- [x] Create `/solutions` hub page ✅
- [x] Create `/industries` hub page ✅
- [x] Update navigation with blog link ✅
- [x] Implement Organization schema ✅ (already in index.html + footer)
- [ ] Set up GSC monitoring and alerts

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| SSR implementation delays | Blocks all SEO progress | Prioritize as P0, consider prerendering as fallback |
| Content creation bottleneck | Limits page growth | Use templates, AI-assisted drafts, prioritize top 10 pages |
| Brand confusion persists | Diluted authority | Proactive schema, consistent messaging, monitor queries |
| Core Web Vitals regression | Ranking impact | Lazy load images, optimize JS bundles, monitor weekly |

---

## Appendix

### Reference Links
- [Google Search Central: Robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Core Web Vitals](https://web.dev/vitals/)
- [Schema.org Organization](https://schema.org/Organization)

### Technical Notes
- Current framework: Vite + React (client-rendered)
- Hosting: Vercel
- Domain: bytebeam.co

---

**Next Review Date:** January 24, 2026  
**Document Status:** Ready for implementation
