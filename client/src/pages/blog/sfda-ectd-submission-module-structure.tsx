import { Link } from "wouter";
import BlogLayout from "@/components/BlogLayout";
import BlogKeyTakeaways from "@/components/blog/BlogKeyTakeaways";
import BlogToolsBanner from "@/components/blog/BlogToolsBanner";
import BlogToolPromo from "@/components/blog/BlogToolPromo";
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
      "SFDA eCTD Submission Format: Module 1 Regional Requirements & Common RFIs in 2026",
    description:
      "How SFDA submissions actually work in eCTD: the GCC Module 1 specification, what each module contains, what triggers RFIs, and where in-house teams should focus automation.",
    image: "https://bytebeam.co/images/blog/sfda-ectd-modules.jpg",
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
        "https://bytebeam.co/blog/sfda-ectd-submission-module-structure",
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
        name: "SFDA eCTD Submission Format",
        item: "https://bytebeam.co/blog/sfda-ectd-submission-module-structure",
      },
    ],
  },
];

export default function SfdaEctdBlog() {
  return (
    <BlogLayout
      title="SFDA eCTD Submission Format: Module 1 Regional Requirements & Common RFIs in 2026"
      description="How SFDA submissions actually work in eCTD: the GCC Module 1 specification, what each module contains, what triggers RFIs, and where in-house teams should focus automation."
      keywords="SFDA eCTD, GCC Module 1 specification, eCTD modules, ICH M4 CTD, ICH M8 eCTD v4.0, SFDA Guidance for Submission v5.0, Module 1.3 SmPC PIL, eCTD format Saudi Arabia, GHC Electronic Gateway"
      canonical="https://bytebeam.co/blog/sfda-ectd-submission-module-structure"
      structuredData={structuredData}
      category="Regulatory"
      industry="Pharma"
      readTime="14 min"
      date={PUBLISHED}
      updated={UPDATED}
      author="Talal Bazerbachi"
    >
      <p className="text-xl leading-relaxed mb-8">
        Every SFDA pharmaceutical submission lives or dies on its <strong>eCTD pack</strong>. Get the structure right and the regulator's review focuses on the science. Get it wrong — wrong Module 1 form, wrong sequence number, wrong Module 1.3 labelling artefacts — and the validation phase alone can burn 30–60 days before a single scientific reviewer sees the dossier. For an in-house RA team running multiple submissions across the GCC, eCTD discipline is the difference between a 12-month and an 18-month time-to-market.
      </p>

      <p>
        This guide is written for in-house RA teams already familiar with the CTD concept — what we cover here is the SFDA-specific procedural layer: which <strong>GCC Module 1 specification</strong> applies, where the regional divergences sit inside Module 1, what Modules 2–5 must look like, the validation rules that catch teams out, and where the highest-leverage automation opportunities are inside the eCTD workflow.
      </p>

      <BlogKeyTakeaways
        points={[
          "SFDA accepts only eCTD submissions (since Feb 2019) and aligns Module 1 with the GCC Module 1 Specifications v1.5; Modules 2–5 follow ICH M4 CTD.",
          "Module 1 is region-specific and contains the highest concentration of SFDA-specific procedural artefacts — application form, cover letter, CPP, GCC-specific documents, Module 1.3 labelling.",
          "Module 1.3 (SmPC, PIL, labelling, packaging) is the single biggest source of avoidable RFIs in SFDA submissions.",
          "ICH M8 eCTD v4.0 introduces a FHIR-based architecture that will eventually replace the v3.2.2 XML backbone — track but don't act yet for SFDA-only submissions.",
          "Validation against the SFDA-approved eCTD publishing tools is mandatory; teams using non-approved tools fail at the door.",
        ]}
      />

      <h2>What is the eCTD format?</h2>

      <p>
        The Common Technical Document (CTD) is the ICH-harmonised structure for organising drug registration dossiers — five modules covering administrative information (Module 1), summaries (Module 2), quality (Module 3), non-clinical (Module 4), and clinical (Module 5). The CTD itself is platform-neutral; the <strong>eCTD</strong> is the electronic implementation of that structure: a specific folder hierarchy plus an XML backbone that allows regulators to validate, track, and version dossiers programmatically across a product's lifecycle.<sup><a href="#ref1">[1]</a></sup>
      </p>

      <p>
        SFDA mandated eCTD-only submissions for human medicines in February 2019, in line with the broader GCC harmonisation push.<sup><a href="#ref2">[2]</a></sup> All MAAs, variations, and renewals enter through the SFDA eSDR portal in eCTD format. Veterinary submissions retain the option of vNEES or paper CTD, but the human-pharmaceutical workstream is fully electronic.
      </p>

      <p>
        Two specifications govern the file: the <strong>ICH M8</strong> eCTD specification (currently v3.2.2 in production globally, with v4.0 progressing toward implementation) defines the technical backbone — folder structure, file naming, XML schema, lifecycle operations.<sup><a href="#ref3">[3]</a></sup> The <strong>GCC Module 1 Specifications v1.5</strong>, published by SFDA, defines the region-specific Module 1 hierarchy that all GCC countries (Saudi Arabia, Bahrain, Kuwait, Oman, Qatar, UAE, Yemen) share.<sup><a href="#ref4">[4]</a></sup> A submitter prepares one eCTD pack per GCC country, with Module 1 differing per country and Modules 2–5 typically shared.
      </p>

      <h2>The five modules — what each one contains</h2>

      <p>
        The ICH-harmonised structure is the same everywhere. What differs by region is Module 1.
      </p>

      <h3>Module 1 — Regional administrative and prescribing information</h3>

      <p>
        Module 1 is the SFDA-specific module. The GCC Module 1 Specifications v1.5 defines the exact hierarchy SFDA accepts: cover letter, application form (now a 2025-edition Arabic-English bilingual form with QPPV / legal-rep / manufacturer fields), Certificate of Pharmaceutical Product (CPP), patent declaration, authorisation letters, and the full <strong>Module 1.3 labelling pack</strong> — SmPC, PIL, and labelling/packaging in both English and Arabic.<sup><a href="#ref4">[4]</a></sup><sup><a href="#ref5">[5]</a></sup>
      </p>

      <p>
        Module 1 is also where the regulator's procedural metadata lives: sequence number, related-sequence references for variations, submission type, applicant identifiers, and country-specific documents (commercial registration, scientific office licence, agent appointment for foreign MAHs). Most validation failures at the SFDA gate come from Module 1 errors — wrong form version, missing CPP for a non-Schedule-X country, mismatched Arabic-English application-form fields.
      </p>

      <h3>Module 2 — Summaries</h3>

      <p>
        Module 2 contains the high-level summaries that bridge the technical modules: Quality Overall Summary (2.3), Non-Clinical Overview (2.4), Clinical Overview (2.5), Non-Clinical Written and Tabulated Summaries (2.6), Clinical Summary (2.7). These are author-driven narrative documents; SFDA expects them to be generated from electronic source documents — scanning is permitted only when unavoidable, with strict resolution and lossless-compression requirements.<sup><a href="#ref6">[6]</a></sup>
      </p>

      <h3>Module 3 — Quality (CMC)</h3>

      <p>
        Module 3 is the chemistry, manufacturing, and controls dossier. Drug substance sections (3.2.S) and drug product sections (3.2.P) are organised under the standardised ICH headings: General Information, Manufacture, Characterisation, Control, Stability. Most of an MAA's volume sits here — and most of the post-validation RFIs target API characterisation, stability data, and impurity profiling.
      </p>

      <h3>Module 4 — Non-clinical study reports</h3>

      <p>
        Module 4 contains the pharmacology and toxicology study reports. For generic applications, this module is typically slim (or supported by literature references in line with the SFDA biowaiver framework); for new chemical entities and biosimilars, it is substantial.
      </p>

      <h3>Module 5 — Clinical study reports</h3>

      <p>
        Module 5 contains the clinical efficacy and safety reports — biopharmaceutic studies, clinical pharmacology, efficacy studies, safety studies, post-marketing experience. Bioequivalence studies for generics live here. For verified / abridged-pathway submissions where the originator has been approved by USFDA or EMA, the SFDA workflow leverages this prior assessment to reduce the Module 5 review depth.<sup><a href="#ref7">[7]</a></sup>
      </p>

      <h2>The eCTD lifecycle — sequences, related sequences, and life-cycle operations</h2>

      <p>
        eCTD's defining feature isn't the folder structure — it's the <strong>lifecycle</strong>. Every submission for a product is a numbered sequence (0000 = original MAA, 0001 = first variation, and so on). Each sequence carries an XML backbone that declares which documents are new, replaced, appended, or deleted relative to the prior approved state. Reviewers can navigate a 5-year history of changes deterministically; the regulator's database treats the dossier as a versioned record rather than a document pile.<sup><a href="#ref3">[3]</a></sup>
      </p>

      <p>
        For an in-house team, the practical implications:
      </p>

      <ul>
        <li><strong>Sequence numbering must be continuous.</strong> Skipping or duplicating a sequence triggers a validation failure. Multi-team handovers are where this most often goes wrong.</li>
        <li><strong>Related-sequence references matter.</strong> A variation submission must reference the sequence that established the current state of the document being changed. Wrong related-sequence = invalid lifecycle = rejection at validation.</li>
        <li><strong>Document GUIDs are permanent.</strong> Once a document is referenced in the eCTD backbone with a specific GUID, that GUID identifies that document throughout the product's lifecycle. Re-using a GUID for a different document corrupts the lifecycle.</li>
        <li><strong>Only SFDA-approved publishing tools are accepted.</strong> Submissions published with non-validated tools fail at the eSDR gateway. The choice of publishing software is itself a procurement decision for the in-house team.</li>
      </ul>

      <h2>ICH M8 eCTD v4.0 — track, but don't act yet for SFDA-only submissions</h2>

      <p>
        The ICH M8 Expert Working Group has been progressing the next major version of the eCTD specification — <strong>eCTD v4.0</strong> — for several years. v4.0 replaces the XML DTD-based backbone of v3.2.2 with a HL7 FHIR-based architecture, decouples the table-of-contents hierarchy from the core standard (so new sections can be added more flexibly), and introduces controlled vocabulary code lists for region-specific extensions.<sup><a href="#ref3">[3]</a></sup>
      </p>

      <p>
        Globally, v4.0 implementation is staged — early-adopter regulators have published implementation packages, FDA has scheduled v4.0 acceptance, and EMA has published v4.0 guidance. SFDA is tracking the global rollout but has not announced a v4.0-only acceptance window. For SFDA-only submissions in 2026, v3.2.2 remains the operative specification. For multi-region submissions, plan for a v4.0 transition over the next 2–3 years and architect any in-house tooling to support both backbones.
      </p>

      <BlogToolsBanner
        headline="Module 1.3 labelling is the single biggest source of avoidable SFDA RFIs"
        subline="The SmPC, PIL, and Arabic translations carried inside every Module 1 are the most automatable layer of the entire eCTD pack — and the layer where bad output costs the most. Try the SFDA Module 1.3 toolkit free."
      />

      <h2>Module 1.3 — where most of the avoidable RFIs come from</h2>

      <p>
        Across published SFDA RFI patterns and the consultancies who track them, <strong>Module 1.3 (Labelling)</strong> consistently appears among the top three RFI generation areas — alongside Module 3 quality data and Module 5 clinical/bioequivalence data. The difference is that Module 3 and Module 5 RFIs usually reflect actual scientific gaps; Module 1.3 RFIs almost always reflect procedural and structural issues that a more disciplined authoring workflow would catch.
      </p>

      <p>The recurring categories:</p>

      <ul>
        <li><strong>SmPC structural drift from the QRD-derived layout adopted across GCC.</strong> Section ordering, section numbering, missing required sections — easy to fix, costly when missed.</li>
        <li><strong>English / Arabic content drift.</strong> The Arabic PIL must mirror the English source. Sections present in one and not the other, terminology mismatches, or untranslated headings trigger RFIs.</li>
        <li><strong>Generic translation that doesn't use SFDA-recognised regulatory phrasing.</strong> Calques and over-literal renderings get flagged. The SFDA expects a specific Arabic register.</li>
        <li><strong>Misalignment between SmPC, PIL, and the new product data sheet.</strong> Brand name, MAH, manufacturer, pack sizes, storage statements — internal inconsistencies are the easiest RFIs for SFDA to spot.</li>
        <li><strong>Missing or incorrect Module 1.3 metadata.</strong> File naming conventions, eCTD operation attribute mismatches.</li>
      </ul>

      <p>
        For an in-house team running multiple submissions per quarter, the labelling layer is the highest-frequency, lowest-judgment work in the entire eCTD pack — which makes it the single highest-leverage place to deploy AI agents.
      </p>

      <BlogToolPromo
        toolSlug="dossier-gap-analysis"
        eyebrow="Pre-submission QC for Module 1.3"
        hook="Catch SFDA labelling RFIs before they happen"
      />

      <p>
        ByteBeam ships three single-purpose AI agents for SFDA Module 1.3 work specifically:
      </p>

      <ul>
        <li><Link href="/sfda/spc-pil-generator"><strong>SmPC &amp; PIL Generator</strong></Link> — produces Module 1.3-aligned drafts from your originator pack, structured to the QRD-derived layout</li>
        <li><Link href="/sfda/spc-pil-arabic-translator"><strong>Arabic SmPC &amp; PIL Translator</strong></Link> — regulator-recognised Arabic with RTL formatting and SFDA-accepted terminology</li>
        <li><Link href="/sfda/dossier-gap-analysis"><strong>Dossier Gap Analysis</strong></Link> — pre-submission completeness sweep that catches the structural drift, English/Arabic mismatches, and metadata issues before they trigger RFIs</li>
      </ul>

      <p>
        Each runs free on your own document, so the team can verify output quality before any commercial conversation. The output is editable DOCX — your QPPV signs off in normal Word review.
      </p>

      <h2>Why the eCTD pack consumes so much in-house RA time</h2>

      <p>
        For most SFDA submissions, the eCTD pack assembly is where the team spends the bulk of the calendar — not the underlying scientific work. Three structural reasons:
      </p>

      <ul>
        <li><strong>Module 1 is procedurally dense.</strong> Application form (current 2025 edition, bilingual), CPP, Arabic translations, regional forms, sequence numbering, eSDR-specific metadata. Each item is small; together they consume time disproportionately.</li>
        <li><strong>Module 1.3 is the labelling-propagation layer.</strong> Every change to the SmPC ripples to the PIL, the Arabic translations, and the labelling/packaging. Variations propagate through this layer endlessly.</li>
        <li><strong>Modules 2–5 require Module-2 narrative authoring.</strong> The Quality / Non-Clinical / Clinical Overviews and Summaries are author-driven and consume senior RA / medical writing time.</li>
      </ul>

      <p>
        The good news: the highest-volume, lowest-judgment layer (Module 1.3 labelling) is precisely the layer where AI agents are now mature enough to ship to production — which is what we've already built. The harder layers (Module 2 narrative authoring, Module 3 CMC writing, Module 5 clinical study writing) are co-build territory: they require deep team involvement and per-customer scoping.
      </p>

      <h2>Choosing tools for the eCTD workflow</h2>

      <p>
        The eCTD tool stack typically includes three distinct categories — be precise about which problem each one solves:
      </p>

      <table>
        <thead>
          <tr>
            <th>Tool category</th>
            <th>What it solves</th>
            <th>What it doesn't</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>eCTD publishing software</strong></td>
            <td>Folder/backbone assembly, validation, sequence management, GUID tracking, regulator-portal export. SFDA accepts only validated tools.</td>
            <td>Doesn't author content. You still write the SmPC / Module 2 narrative / Module 3 CMC text.</td>
          </tr>
          <tr>
            <td><strong>SFDA Module 1.3 labelling agents</strong> (e.g. ByteBeam's 3 tools)</td>
            <td>Generates SmPC + PIL drafts, Arabic translation with regulatory phrasing, pre-submission gap analysis. Reduces the layer that drives the most avoidable RFIs.</td>
            <td>Doesn't replace eCTD publishing. Output is DOCX/structured content that still flows into the publishing tool.</td>
          </tr>
          <tr>
            <td><strong>Module 2/3 authoring assistants</strong> (co-built per customer)</td>
            <td>Module 2 narrative drafting from technical data. Module 3 CMC section authoring from existing dossier inputs.</td>
            <td>Generic offerings rarely fit specific dossier conventions. Co-build with the team is the right pattern here.</td>
          </tr>
        </tbody>
      </table>

      <BlogRelatedPosts
        slugs={[
          "sfda-drug-registration-guide-saudi-arabia",
          "sfda-variations-type-ia-ib-ii-decision-guide",
          "sfda-pharmacovigilance-qppv-requirements",
        ]}
        heading="Related reading for SFDA submission teams"
        subtitle="Adjacent topics if you're scoping the full submission lifecycle, not just initial registration."
      />

      <h2>The future of eCTD in SFDA</h2>

      <p>
        Three trends to track for in-house teams operating in the SFDA ecosystem.
      </p>

      <h3>eCTD v4.0 transition</h3>

      <p>
        The v3.2.2 to v4.0 transition will reach SFDA over the next 2–3 years following the global ICH M8 timeline.<sup><a href="#ref3">[3]</a></sup> The architectural shift to FHIR resources, the controlled vocabulary code lists, and the more-flexible TOC hierarchy are non-trivial — but the practical impact for in-house teams is largely absorbed by the eCTD publishing tool. The bigger long-term shift is that more flexible TOC hierarchies will let SFDA add region-specific sections without forcing a global ICH revision.
      </p>

      <h3>Tighter GCC harmonisation</h3>

      <p>
        The GCC Module 1 Specification has been stable at v1.5 for several years. Future revisions are likely to push further toward shared documents (CPPs, certificates) acceptable across more countries, reducing the per-country Module 1 divergence. The GCC Centralised Procedure already harmonises a slice of submissions; expect that slice to widen.
      </p>

      <h3>AI agents move from Module 1.3 to Module 2 narrative authoring</h3>

      <p>
        The Module 1.3 layer is where AI agents have already shipped — pattern-rich, structural, repeatable. The next frontier for in-house teams is Module 2 narrative authoring: Quality Overall Summary, Clinical Overview, Non-Clinical Overview. These are higher-judgment and harder to template, which is why we believe the right shape is co-build agents per customer, not generic copilots.
      </p>

      <BlogDiscoveryCallCta
        topic="eCTD"
        eyebrow="Bytebeam · eCTD scoping call"
        headline="Scope your eCTD authoring beyond Module 1.3 — co-built around your team's process"
        body="Module 1.3 labelling is already covered by our 3 production SFDA tools. The next leverage layer is Module 2 narrative authoring and Module 3 CMC drafting. In 30 minutes we'll walk through your team's eCTD workflow and identify what we'd build next."
        ctaLabel="Book a 30-min eCTD scoping call"
        expectations={[
          "You walk us through your eCTD authoring + publishing workflow as it runs today",
          "We identify which CTD sections are realistic AI-agent candidates for your team",
          "You leave with a written scoping summary — no commitment, no template demos",
        ]}
      />

      <h2>Conclusion</h2>

      <p>
        The eCTD format is the technical backbone of every SFDA submission, and the GCC Module 1 specification is the regional layer where most procedural failures happen. For in-house teams, the question isn't whether to invest in eCTD discipline — eSDR rejections at the validation gate guarantee the answer is yes — but where to invest first. <strong>Module 1.3 labelling</strong> is the most automatable layer of the entire pack, the most frequent source of avoidable RFIs, and the layer where AI agents are mature enough to ship today. Higher-judgment layers (Module 2 narrative, Module 3 CMC authoring) follow as co-build engagements once the labelling layer is stabilised.
      </p>

      <BlogRelatedTools
        eyebrow="Try the SFDA Module 1.3 toolkit"
        heading="The 3 SFDA Module 1.3 agents we've already shipped"
        subtitle="Each tool covers one step of the Module 1.3 labelling workflow. Free first run, audit-trailed, DOCX out."
      />

      <hr />

      <h2>References</h2>

      <ol className="text-sm">
        <li id="ref1">
          ICH —{" "}
          <a
            href="https://www.ich.org/page/ich-electronic-common-technical-document-ectd-v40"
            target="_blank"
            rel="noopener noreferrer"
          >
            Electronic Common Technical Document (eCTD) v4.0
          </a>{" "}
          (ICH M8 Expert Working Group reference page).
        </li>
        <li id="ref2">
          <a
            href="https://www.biomapas.com/ectd-implementation-across-mena-region-what-is-the-current-status/"
            target="_blank"
            rel="noopener noreferrer"
          >
            eCTD implementation across the MENA region — current status
          </a>{" "}
          — industry analysis covering SFDA's February 2019 mandatory eCTD
          adoption.
        </li>
        <li id="ref3">
          <a
            href="https://admin.ich.org/sites/default/files/inline-files/eCTDv4_0_SupportDocumentation_v1_4.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICH M8 — eCTD v4.0 Support Documentation v1.4
          </a>{" "}
          (Implementation Package, technical schema reference).
        </li>
        <li id="ref4">
          <a
            href="https://sfda.gov.sa/sites/default/files/2021-03/GCC%20Module%201%20Specifications_v1.5-EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA — GCC Module 1 Specifications v1.5
          </a>{" "}
          (official SFDA-published GCC regional specification).
        </li>
        <li id="ref5">
          <a
            href="https://www.sfda.gov.sa/sites/default/files/2022-10/GuidanceSubmissionV5.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA — DS-G-003 Guidance for Submission Version 5.0
          </a>{" "}
          (official SFDA submission guidance).
        </li>
        <li id="ref6">
          ICH —{" "}
          <a
            href="https://admin.ich.org/sites/default/files/inline-files/eCTD_Specification_v3_2_2_0.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            eCTD Specification v3.2.2
          </a>{" "}
          — currently operative ICH M8 specification.
        </li>
        <li id="ref7">
          <a
            href="https://www.sfda.gov.sa/sites/default/files/2025-10/VerificationAbridgedPathways3.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA — DS-G-020 Verification &amp; Abridged Pathways v3.0
          </a>{" "}
          (October 2025) — official SFDA expedited-pathway guidance.
        </li>
        <li id="ref8">
          <a
            href="https://www.freyrsolutions.com/blog/your-2025-guide-checklist-to-sfdas-new-ectd-module-1-rules"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA's 2025 eCTD Module 1 rules — guide and checklist
          </a>{" "}
          — industry analysis of recent Module 1 form updates.
        </li>
      </ol>

      <p className="text-sm text-muted-foreground mt-8">
        <em>
          Last updated: May 2026. SFDA submission guidance and the GCC Module 1
          Specifications evolve over time. Verify the current versions against
          the official SFDA regulations portal at{" "}
          <a
            href="https://sfda.gov.sa/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            sfda.gov.sa
          </a>{" "}
          before submitting.
        </em>
      </p>
    </BlogLayout>
  );
}
