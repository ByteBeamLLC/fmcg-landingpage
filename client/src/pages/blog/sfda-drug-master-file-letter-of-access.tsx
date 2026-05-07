import { Link } from "wouter";
import BlogLayout from "@/components/BlogLayout";
import BlogKeyTakeaways from "@/components/blog/BlogKeyTakeaways";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import BlogRelatedTools from "@/components/blog/BlogRelatedTools";
import BlogDiscoveryCallCta from "@/components/blog/BlogDiscoveryCallCta";

const PUBLISHED = "2026-05-07";
const UPDATED = "2026-05-07";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "SFDA Drug Master File (DMF) and Letter of Access: A Practical Guide for API Manufacturers and MAHs",
    description:
      "How DMFs are submitted to SFDA, how the Letter of Access works, what the restricted and open parts must contain, and where API manufacturers most often lose review time.",
    image: "https://bytebeam.co/images/blog/sfda-drug-master-file.jpg",
    author: {
      "@type": "Person",
      name: "Talal Bazerbachi",
      jobTitle: "Founder, ByteBeam",
      url: "https://bytebeam.co/about",
    },
    publisher: {
      "@type": "Organization",
      name: "ByteBeam",
      logo: {
        "@type": "ImageObject",
        url: "https://bytebeam.co/assets/bytebeam-logo.png",
      },
    },
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://bytebeam.co/blog/sfda-drug-master-file-letter-of-access",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bytebeam.co",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://bytebeam.co/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "SFDA Drug Master File and Letter of Access",
        item: "https://bytebeam.co/blog/sfda-drug-master-file-letter-of-access",
      },
    ],
  },
];

export default function SfdaDmfBlog() {
  return (
    <BlogLayout
      title="SFDA Drug Master File (DMF) and Letter of Access: A Practical Guide for API Manufacturers and MAHs"
      description="How DMFs are submitted to SFDA, how the Letter of Access works, what the restricted and open parts must contain, and where API manufacturers most often lose review time."
      keywords="SFDA DMF, SFDA Drug Master File, Letter of Access SFDA, Active Substance Master File ASMF, API regulatory Saudi Arabia, DMF submission Saudi, restricted part DMF, open part DMF"
      canonical="https://bytebeam.co/blog/sfda-drug-master-file-letter-of-access"
      structuredData={structuredData}
      category="Regulatory"
      industry="Pharma"
      readTime="13 min"
      date={PUBLISHED}
      updated={UPDATED}
      author="Talal Bazerbachi"
    >
      <p className="text-xl leading-relaxed mb-8">
        For an API manufacturer, the <strong>Drug Master File (DMF)</strong> is the document that lets a finished-product MAH register a medicine in Saudi Arabia without ever seeing your manufacturing know-how. For the MAH, the DMF and the accompanying <strong>Letter of Access</strong> are the procedural plumbing that drops a third-party API into Module 3 of the eCTD. Get either piece wrong and the SFDA review stalls — sometimes for months — without anyone touching the actual scientific content.
      </p>

      <p>
        This guide is written for in-house RA teams on both sides of the relationship: API manufacturers preparing DMFs for the Saudi market, and finished-product MAHs filing dossiers that reference third-party APIs. We cover how SFDA's DMF mechanism actually works, how the open and restricted parts split, what the Letter of Access must contain, where the most expensive review delays come from, and where AI agents now meaningfully compress the document workload around DMF preparation and lifecycle maintenance.
      </p>

      <BlogKeyTakeaways
        points={[
          "SFDA does not accept stand-alone DMFs — the DMF supports a finished-product dossier (MAA) submitted by an MAH, and is represented in section 3.2.S of the eCTD.",
          "The DMF splits into an open (applicant's) part visible to the MAH and a restricted (closed) part visible only to SFDA reviewers — protecting the API manufacturer's confidential know-how.",
          "The Letter of Access is the legal instrument that grants SFDA permission to review the restricted part on behalf of a specific MAH for a specific finished product.",
          "DMF structure follows ICH M4Q for content; SFDA aligns with FDA Type II DMF and EMA ASMF practice but adds Saudi-specific procedural requirements.",
          "The most common SFDA RFIs on DMFs concern incomplete restricted-part submissions, mismatches between the DMF and the MAH's 3.2.S sections, and missing or expired Letters of Access.",
        ]}
      />

      <h2>What is a Drug Master File under SFDA?</h2>

      <p>
        A Drug Master File is a confidential, comprehensive document that an API manufacturer submits to a regulator describing the chemistry, manufacturing, controls, and quality systems for an active pharmaceutical ingredient (or, in some cases, an excipient or packaging component). The DMF allows the API manufacturer to provide regulators with the data needed to review a finished product without disclosing proprietary manufacturing know-how to the finished-product company.<sup><a href="#ref1">[1]</a></sup>
      </p>

      <p>
        SFDA's DMF mechanism receives Drug Master Files supporting drug substances (commonly known as APIs), excipients, and other materials used in preparation such as packaging components.<sup><a href="#ref2">[2]</a></sup> The Saudi DMF system is conceptually aligned with the EMA's <strong>Active Substance Master File (ASMF)</strong> procedure, which has the same purpose and the same open/closed split.<sup><a href="#ref3">[3]</a></sup> US FDA Type II DMFs serve the equivalent function in the United States.<sup><a href="#ref4">[4]</a></sup>
      </p>

      <p>
        Critically, <strong>SFDA does not accept stand-alone DMF submissions</strong>. The DMF is always submitted in support of a finished-product Marketing Authorisation Application — meaning the API manufacturer cannot pre-register a DMF independently. The MAH submits its dossier via eSDR; the DMF is referenced from Module 3 (specifically section 3.2.S) of that dossier; the API manufacturer parallelly submits the restricted part directly to SFDA via the secure-link channel.<sup><a href="#ref2">[2]</a></sup>
      </p>

      <h2>The two-part structure: open and restricted</h2>

      <p>
        Every DMF splits into two parts. The procedural mechanics differ slightly between SFDA, EMA (ASMF), and FDA (Type II), but the underlying logic is identical.
      </p>

      <h3>Open part (Applicant's Part)</h3>

      <p>
        The open part is the section the MAH receives from the API manufacturer and includes in its own dossier. It contains <strong>non-confidential information</strong> that the MAH needs to take regulatory responsibility for the medicinal product: general API information, controls, specifications, container-closure system, stability summaries, and any information the API manufacturer is willing to share.<sup><a href="#ref5">[5]</a></sup> The MAH includes the open part in section 3.2.S of its eCTD pack.
      </p>

      <h3>Restricted part (Closed Part)</h3>

      <p>
        The restricted part contains the <strong>confidential manufacturing know-how</strong>: detailed synthesis routes, intermediate specifications, in-process controls, validation data, and proprietary process parameters. The MAH never sees this. The API manufacturer submits the restricted part directly to SFDA via the secure submission channel — historically by email or via an SFDA-provided secure link.<sup><a href="#ref2">[2]</a></sup>
      </p>

      <p>
        SFDA reviewers read both parts together; the MAH's quality assessment relies on the open part plus the regulator's assessment of the restricted part. The mechanism preserves the API manufacturer's commercial position (recipes stay proprietary) while giving regulators the full picture they need to assess the medicinal product.
      </p>

      <h2>The Letter of Access — the legal instrument that ties it all together</h2>

      <p>
        The DMF and the MAH's dossier are independent submissions; the <strong>Letter of Access</strong> is the legal instrument that links them.<sup><a href="#ref6">[6]</a></sup> When an API manufacturer authorises a specific MAH to reference its DMF for a specific finished product, the manufacturer issues a Letter of Access — addressed to SFDA, on the manufacturer's letterhead — that grants permission for SFDA to review the restricted part on behalf of that MAH.
      </p>

      <p>
        SFDA's Letter of Access expectations are specific:
      </p>

      <ul>
        <li>The same identifying information used in the DMF cover letter must be repeated in the Letter of Access.</li>
        <li>The Letter and the DMF form must both be on the API manufacturer's letterhead.</li>
        <li>If the API is manufactured at multiple sites, every site must be listed explicitly.</li>
        <li>The Letter must clearly identify the specific MAH and the specific finished product it authorises.</li>
        <li>Letters are typically issued per-product, per-MAH — not as blanket authorisations.</li>
      </ul>

      <p>
        For an API manufacturer supplying multiple MAHs across the GCC, Letter of Access management quickly becomes a non-trivial administrative workload. Each MAH-product pair gets its own letter; each new SKU triggers a new letter; expirations and renewals trigger updates. Tracking which Letters are active, which are pending renewal, and which have lapsed is the layer that most often catches teams out at audit.
      </p>

      <h2>What goes in each part — content expectations</h2>

      <p>
        DMF structure follows ICH M4Q, the common technical document quality module. Both parts populate sections of 3.2.S:
      </p>

      <h3>Section 3.2.S.1 — General Information (Open)</h3>
      <p>API name, structure, properties. Always in the open part.</p>

      <h3>Section 3.2.S.2 — Manufacture (Open + Restricted)</h3>
      <p>The most consequential split. Manufacturer name and address: open. Description of manufacturing process and process controls: typically restricted. Controls of materials and critical steps: split based on what reveals proprietary know-how. Process validation: typically restricted.</p>

      <h3>Section 3.2.S.3 — Characterisation (Open + Restricted)</h3>
      <p>Elucidation of structure: open. Detailed impurity discussion (especially genotoxic impurities and their control strategy under <Link href="/blog/sfda-impurity-profile-ich-q3a-q3b-q3d">ICH Q3A/B/D</Link>): often restricted, depending on what reveals manufacturing know-how.</p>

      <h3>Section 3.2.S.4 — Control of Drug Substance (Open)</h3>
      <p>Specification, analytical procedures, validation, batch analysis, justification. Generally fully in the open part — the MAH needs to rely on the specification.</p>

      <h3>Section 3.2.S.5 — Reference Standards (Open)</h3>
      <p>Reference standard or materials. Open.</p>

      <h3>Section 3.2.S.6 — Container Closure System (Open)</h3>
      <p>Description and specifications of the API container closure. Open.</p>

      <h3>Section 3.2.S.7 — Stability (Open + Restricted)</h3>
      <p>Stability summary and conclusion: open. Detailed primary stability data and protocols: typically restricted.</p>

      <p>
        The split is not regulator-dictated; it's a commercial decision by the API manufacturer about what reveals their know-how. The principle is: the MAH needs enough information to take responsibility; the rest stays restricted.
      </p>

      <BlogDiscoveryCallCta
        topic="DMF"
        variant="inline"
        eyebrow="Bytebeam · Discovery call"
        headline="DMF preparation and Letter of Access management — automation candidates"
        body="If your team prepares DMFs for multiple finished-product MAHs across the GCC, walk us through your current process. We'll identify where AI agents can compress the per-Letter-of-Access overhead and where the per-product DMF assembly cycle is automatable."
        ctaLabel="Book a 30-min DMF scoping call"
        showProofOfPattern={false}
      />

      <h2>Why DMFs and Letters of Access eat in-house RA time</h2>

      <p>
        For an API manufacturer's RA team supplying multiple finished-product MAHs across multiple markets, DMF and Letter of Access work has a particular shape:
      </p>

      <ul>
        <li><strong>Per-MAH duplication.</strong> The same API supplied to ten MAHs requires ten Letters of Access, ten parallel restricted-part submissions to SFDA (referenced from each MAH's eSDR submission), and ten ongoing tracking entries. The science is identical; the procedural overhead multiplies.</li>
        <li><strong>Per-market open/restricted split decisions.</strong> SFDA's DMF expectations align with EMA ASMF and FDA Type II but with national-specific differences. The API manufacturer maintains a master DMF and produces market-specific variants — each of which requires a per-market split decision.</li>
        <li><strong>Letter of Access lifecycle.</strong> Letters expire, MAH-product mappings change, manufacturing sites get added or retired. Maintaining the active-letters tracker across markets and MAHs is a structured but high-volume operational task.</li>
        <li><strong>RFI cycles on the restricted part.</strong> SFDA RFIs on the restricted part go directly back to the API manufacturer — but the response timeline is bound to the MAH's submission clock, so coordination across organisations is the rate-limiting step.</li>
      </ul>

      <p>
        For a finished-product MAH, the equivalent pain points sit on the other side of the relationship:
      </p>

      <ul>
        <li><strong>Open-part section 3.2.S authoring.</strong> Receiving the open part from the API manufacturer and integrating it into the eCTD pack — formatting alignment, cross-references, consistency with the rest of Module 3.</li>
        <li><strong>Letter of Access verification.</strong> Confirming that the Letter is current, addresses the right product, and lists every manufacturing site referenced in the dossier.</li>
        <li><strong>RFI coordination.</strong> When SFDA RFIs arrive, classifying which apply to the MAH-controlled sections vs the DMF-controlled sections and routing accordingly.</li>
      </ul>

      <p>
        The structural pattern — high volume, mostly procedural, with a smaller technical-judgment layer — makes DMF and LoA management a strong candidate for purpose-built automation. Generic regulatory document tools rarely understand the open/restricted split or the per-MAH lifecycle mechanics.
      </p>

      <h2>Benefits of automating DMF and Letter of Access workflows</h2>

      <p>
        Four measurable benefits when DMF/LoA work is automated with agents purpose-built for the workflow:
      </p>

      <ol>
        <li><strong>Per-MAH variant generation.</strong> A master DMF + a Letter of Access template generate market-specific and MAH-specific variants automatically, with cross-document consistency checks.</li>
        <li><strong>Letter of Access tracker.</strong> Active letters, expiration dates, MAH-product mappings, manufacturing-site coverage, signature status — structured retention rather than spreadsheet drift.</li>
        <li><strong>Open/restricted split assistance.</strong> An agent that takes the master DMF and the target market and proposes the open/restricted split with citations to the relevant ICH M4Q section, surfacing borderline decisions for senior review.</li>
        <li><strong>RFI routing.</strong> When SFDA RFIs arrive, automatic classification into MAH-controlled vs DMF-controlled sections speeds the response cycle for both parties.</li>
      </ol>

      <p>
        Every automation step retains an audit trail — Letter status, restricted-part submissions, version history. SFDA and other GCC inspections increasingly examine DMF lifecycle evidence, and structured retention turns inspection prep into a side-effect of the normal workflow.
      </p>

      <h2>How to choose a DMF/LoA automation partner</h2>

      <table>
        <thead>
          <tr>
            <th>Capability</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SFDA DMF specifics</strong></td>
            <td>Generic ICH-aligned tooling misses SFDA-specific submission mechanics (secure-link channel, MAH-anchored submission, no stand-alone DMFs).</td>
          </tr>
          <tr>
            <td><strong>Multi-jurisdiction support</strong></td>
            <td>API manufacturers typically supply markets beyond KSA. Tools that support EMA ASMF + FDA Type II + SFDA DMF reduce duplicated authoring work.</td>
          </tr>
          <tr>
            <td><strong>Letter of Access tracker</strong></td>
            <td>Active-letter management across MAH-product pairs is structured operational work, not document drafting. Tools that don't address this miss half the workload.</td>
          </tr>
          <tr>
            <td><strong>Open/restricted split logic</strong></td>
            <td>The split is a commercial decision, but the agent should propose the typical split with ICH M4Q section citations to anchor the conversation.</td>
          </tr>
          <tr>
            <td><strong>Audit trail by default</strong></td>
            <td>Every Letter, every restricted-part submission, every variant — versioned and retained. Inspection-ready as a default state.</td>
          </tr>
          <tr>
            <td><strong>Process-led scoping</strong></td>
            <td>API manufacturers' SOPs differ significantly between innovator API houses and high-volume generic API plants. Co-build with the team's existing workflow.</td>
          </tr>
        </tbody>
      </table>

      <BlogRelatedPosts
        slugs={[
          "sfda-ectd-submission-module-structure",
          "sfda-drug-registration-guide-saudi-arabia",
          "sfda-variations-type-ia-ib-ii-decision-guide",
        ]}
        heading="Related reading for API and CMC teams"
        subtitle="Adjacent topics if you're scoping the broader SFDA submission lifecycle."
      />

      <h2>ByteBeam and SFDA DMF / Letter of Access automation</h2>

      <p>
        ByteBeam ships single-purpose AI agents for SFDA document work — built around how the customer's team actually operates, not generic copilots. Three are already in production for <strong>Module 1.3 labelling</strong>:
      </p>

      <ul>
        <li><Link href="/sfda/spc-pil-generator"><strong>SmPC &amp; PIL Generator</strong></Link></li>
        <li><Link href="/sfda/spc-pil-arabic-translator"><strong>Arabic SmPC &amp; PIL Translator</strong></Link></li>
        <li><Link href="/sfda/dossier-gap-analysis"><strong>Dossier Gap Analysis</strong></Link></li>
      </ul>

      <p>
        DMF preparation, Letter of Access management, and per-MAH variant generation are workloads we're actively scoping with API-manufacturer customer teams. The right shape of a DMF agent depends on whether you're an innovator API house (low-volume, high-confidentiality), a generic API manufacturer (high-volume, multi-MAH), or a finished-product MAH (open-part consumer, RFI router) — and whether you submit primarily to SFDA, broader GCC, or globally. That's why we don't ship a generic DMF copilot; we scope each agent to fit the team's existing workflow.
      </p>

      <h2>The future of DMF and Letter of Access management</h2>

      <h3>Tighter GCC harmonisation pressure on DMFs</h3>

      <p>
        GCC harmonisation has primarily focused on finished-product registration pathways. DMFs and ASMFs are next on the harmonisation agenda — a single GCC-wide DMF that any GCC-bloc MAH can reference would dramatically reduce per-market overhead for API manufacturers. SFDA, as the most-developed GCC regulator, will likely lead any such initiative.
      </p>

      <h3>Electronic-only DMF submissions</h3>

      <p>
        The historical mix of email + secure-link + paper for the restricted-part submission is increasingly being consolidated into structured electronic-only channels. Expect SFDA's secure-link channel to evolve toward a fully electronic gateway aligned with the eSDR portal MAHs already use.
      </p>

      <h3>AI agents move from per-document drafting to portfolio-level lifecycle</h3>

      <p>
        The first generation of "AI for DMF" was about document drafting — generating section 3.2.S text from raw CMC inputs. The next generation is about <strong>portfolio-level lifecycle</strong>: an agent that knows your master DMF, all your active Letters of Access across all MAHs, every market-specific variant, and which RFIs are open against which products. The drafting layer becomes table stakes; the lifecycle layer becomes the differentiator.
      </p>

      <BlogDiscoveryCallCta
        topic="DMF"
        eyebrow="Bytebeam · DMF scoping call"
        headline="Scope your DMF and Letter of Access workflow — co-built around your team's process"
        body="Walk us through how your team currently prepares DMFs, manages Letters of Access across MAH-product pairs, and routes SFDA RFIs. In 30 minutes we'll map the document touchpoints we'd automate first, and what stays with the QPPV / RA lead."
        ctaLabel="Book a 30-min DMF scoping call"
        expectations={[
          "You walk us through your DMF preparation + Letter of Access lifecycle as it runs today",
          "We map the document touchpoints we'd automate first across your MAH-product pairs",
          "You leave with a written scoping summary — no commitment, no template demos",
        ]}
      />

      <h2>Conclusion</h2>

      <p>
        SFDA's DMF mechanism is procedurally specific (no stand-alone submissions, MAH-anchored, secure-channel restricted part) but conceptually aligned with EMA ASMF and FDA Type II. For API manufacturers, the operational pain isn't the science — it's the per-MAH duplication and Letter of Access lifecycle. For finished-product MAHs, it's the open-part integration and RFI routing. Both sides benefit from purpose-built automation that understands the open/restricted split, the per-MAH lifecycle, and the SFDA-specific procedural mechanics. Generic regulatory tools rarely do; specialised agents co-built around the team's workflow do.
      </p>

      <BlogRelatedTools
        eyebrow="Try the SFDA toolkit"
        heading="The 3 SFDA Module 1.3 agents we've already shipped"
        subtitle="Proof of pattern for the SFDA agents we co-build with in-house teams. Free first run on each, audit-trailed, DOCX out."
      />

      <hr />

      <h2>References</h2>

      <ol className="text-sm">
        <li id="ref1">
          <a
            href="https://www.fda.gov/drugs/forms-submission-requirements/drug-master-files-dmfs"
            target="_blank"
            rel="noopener noreferrer"
          >
            US FDA — Drug Master Files (DMFs) reference page
          </a>{" "}
          — comparator framework for DMF concept and types.
        </li>
        <li id="ref2">
          <a
            href="https://www.gmp-compliance.org/gmp-news/saudi-food-and-drug-authority-publishes-drug-master-file-guidance"
            target="_blank"
            rel="noopener noreferrer"
          >
            ECA Academy — Saudi FDA publishes Drug Master File Guidance
          </a>{" "}
          (industry summary of the SFDA DMF guidance and submission mechanics).
        </li>
        <li id="ref3">
          <a
            href="https://www.ema.europa.eu/en/active-substance-master-file-procedure-scientific-guideline"
            target="_blank"
            rel="noopener noreferrer"
          >
            EMA — Active Substance Master File procedure (scientific guideline
            page)
          </a>
          .
        </li>
        <li id="ref4">
          <a
            href="https://www.fda.gov/media/131861/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            US FDA — Drug Master Files Guidance for Industry (PDF)
          </a>
          .
        </li>
        <li id="ref5">
          <a
            href="https://www.ema.europa.eu/en/documents/report/final-guideline-active-substance-master-file-procedure-revision-4_en.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            EMA — Guideline on Active Substance Master File Procedure, Revision
            4 (PDF)
          </a>
          .
        </li>
        <li id="ref6">
          <a
            href="https://ictr.johnshopkins.edu/wp-content/uploads/2014/01/DMF_LOA_30SEP13.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Johns Hopkins ICTR — Drug Master File Letter of Authorization
            Guidance (PDF)
          </a>{" "}
          — academic-institutional reference for LoA structure.
        </li>
        <li id="ref7">
          <a
            href="https://www.sfda.gov.sa/sites/default/files/2025-08/Data-Human-Drugs-SubV4_0.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA — 002-REQ-DS Data Requirements for Human Drugs Submission v4.0
            (August 2025, PDF)
          </a>
          .
        </li>
        <li id="ref8">
          <a
            href="https://www.fda.gov/files/drugs/published/Completeness-Assessments-for-Type-II-API-DMFs-Under-GDUFA-Guidance-for-Industry.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            US FDA — Completeness Assessments for Type II API DMFs Under GDUFA
            Guidance for Industry
          </a>{" "}
          — adjacent reference for DMF completeness criteria.
        </li>
      </ol>

      <p className="text-sm text-muted-foreground mt-8">
        <em>
          Last updated: May 2026. SFDA DMF expectations evolve with each
          guidance revision. Verify the current SFDA DMF and submission
          requirements at{" "}
          <a
            href="https://sfda.gov.sa/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            sfda.gov.sa
          </a>{" "}
          before submission.
        </em>
      </p>
    </BlogLayout>
  );
}
