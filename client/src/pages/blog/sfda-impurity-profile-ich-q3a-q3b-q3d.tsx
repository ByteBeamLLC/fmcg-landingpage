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
      "Impurity Profile for SFDA Drug Submissions: ICH Q3A, Q3B, Q3D, and M7 in Practice",
    description:
      "How to build a defensible impurity profile for SFDA submissions. Reporting, identification, and qualification thresholds under ICH Q3A/B; elemental impurities under Q3D; mutagenic impurities under M7.",
    image: "https://bytebeam.co/images/blog/sfda-impurity-profile-ich-q3.jpg",
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
        "https://bytebeam.co/blog/sfda-impurity-profile-ich-q3a-q3b-q3d",
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
        name: "Impurity Profile for SFDA Submissions",
        item: "https://bytebeam.co/blog/sfda-impurity-profile-ich-q3a-q3b-q3d",
      },
    ],
  },
];

export default function SfdaImpurityProfileBlog() {
  return (
    <BlogLayout
      title="Impurity Profile for SFDA Drug Submissions: ICH Q3A, Q3B, Q3D, and M7 in Practice"
      description="How to build a defensible impurity profile for SFDA submissions. Reporting, identification, and qualification thresholds under ICH Q3A/B; elemental impurities under Q3D; mutagenic impurities under M7."
      keywords="ICH Q3A SFDA, ICH Q3B impurities, ICH Q3D elemental impurities, ICH M7 mutagenic impurities, impurity profile drug substance, qualification threshold ICH, nitrosamine impurities SFDA, NDSRI assessment"
      canonical="https://bytebeam.co/blog/sfda-impurity-profile-ich-q3a-q3b-q3d"
      structuredData={structuredData}
      category="Regulatory"
      industry="Pharma"
      readTime="14 min"
      date={PUBLISHED}
      updated={UPDATED}
      author="Talal Bazerbachi"
    >
      <p className="text-xl leading-relaxed mb-8">
        For any innovator or complex-generic submission to SFDA, the <strong>impurity profile</strong> is one of the most-scrutinised technical packages in the entire dossier. Module 3.2.S.3.2 (drug substance impurities), Module 3.2.P.5.5 (drug product degradation products), the Q3D elemental risk assessment, and the M7 mutagenic-impurity assessment together define what regulators see when they evaluate the chemistry of a new product. Get the thresholds right, the qualification logic correct, and the structural alerts addressed — and the review proceeds. Get them wrong and the RFI cycle is one of the most expensive in pharmaceutical regulatory affairs.
      </p>

      <p>
        This guide is written for in-house CMC and RA teams preparing impurity profiles for SFDA submissions. SFDA aligns with the ICH Q3 and M7 series, so the technical framework described here applies to GCC submissions broadly — but the procedural integration into the SFDA Module 3 expectations is the layer where regional specifics matter. We cover the Q3A/Q3B threshold logic, the Q3D risk-based elemental approach, the M7 mutagenic-impurity assessment including the nitrosamine layer, and where AI agents now meaningfully compress the impurity-profile compilation workload for in-house teams.
      </p>

      <BlogKeyTakeaways
        points={[
          "ICH Q3A (drug substance) and Q3B (drug product) define three threshold tiers — reporting, identification, qualification — calibrated against the maximum daily dose.",
          "ICH Q3D (R2) requires a risk-based elemental impurity assessment for 24 elements, with PDEs (Permitted Daily Exposures) calibrated by class and route of administration.",
          "ICH M7 (R2, 2023) is the primary framework for DNA-reactive mutagenic impurities — including the structural-alert classification, TTC-based limits, and the nitrosamine extension.",
          "For new drug substances, the impurity profile must justify limits, identify all impurities above the identification threshold, and qualify all impurities above the qualification threshold.",
          "M7(R3) and the formal ICH workstream on N-nitrosamines (adopted June 2024) signal that nitrosamine assessment is moving from regulator-by-regulator practice toward a unified ICH framework.",
        ]}
      />

      <h2>What is an impurity profile?</h2>

      <p>
        An impurity profile is the structured description of every impurity present in a drug substance or drug product, with its origin, structure, abundance, control strategy, and toxicological qualification. For SFDA submissions, the impurity profile is split across multiple Module 3 sections: drug substance impurities in 3.2.S.3.2, drug product degradation products in 3.2.P.5.5, elemental impurities under the ICH Q3D risk-based framework, and mutagenic impurities under ICH M7. Each section has its own technical framework, but they share the same purpose: demonstrate to the regulator that every impurity above the relevant threshold has been identified, quantified, controlled, and qualified at the proposed limit.<sup><a href="#ref1">[1]</a></sup>
      </p>

      <p>
        The frameworks SFDA expects are not SFDA-specific; they are the ICH Q3 series (Q3A, Q3B, Q3C for residual solvents, Q3D for elemental impurities) and the ICH M7 series for mutagenic impurities. SFDA aligns with these as a member of the GCC harmonisation framework and as a regulator that adopted ICH-aligned practice in line with its 2021 ICH membership.
      </p>

      <h2>ICH Q3A — Impurities in new drug substances</h2>

      <p>
        ICH Q3A(R2) defines the framework for impurities arising in active pharmaceutical ingredients during synthesis, isolation, or storage.<sup><a href="#ref2">[2]</a></sup> The guideline covers three categories: organic impurities (synthesis-derived), inorganic impurities (reagents, catalysts, heavy metals — though now largely superseded by Q3D for elementals), and residual solvents (covered by Q3C).
      </p>

      <p>
        The defining feature of Q3A is the <strong>three-threshold framework</strong>, calibrated against the maximum daily dose of the API:
      </p>

      <table>
        <thead>
          <tr>
            <th>Threshold</th>
            <th>What it requires</th>
            <th>Typical value (max daily dose ≤ 2 g/day)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Reporting threshold</strong></td>
            <td>Impurity must be reported in the analytical results above this level</td>
            <td>0.05% (lower for higher daily doses)</td>
          </tr>
          <tr>
            <td><strong>Identification threshold</strong></td>
            <td>Impurity must be structurally identified above this level</td>
            <td>0.10% or 1.0 mg/day intake (whichever is lower)</td>
          </tr>
          <tr>
            <td><strong>Qualification threshold</strong></td>
            <td>Impurity must be qualified — i.e. supported by toxicological data demonstrating safety at the proposed limit</td>
            <td>0.15% or 1.0 mg/day intake (whichever is lower)</td>
          </tr>
        </tbody>
      </table>

      <p>
        The thresholds tighten as daily dose increases. For an API with maximum daily dose &gt; 2 g/day, the qualification threshold drops to 0.05% — meaning impurities at much lower abundances must still be qualified.<sup><a href="#ref3">[3]</a></sup>
      </p>

      <p>
        For an in-house CMC team, the operational consequence is that the impurity profile compilation requires three parallel data streams: <strong>(1)</strong> analytical data from stability and batch testing showing actual impurity levels, <strong>(2)</strong> structural identification (typically by HPLC-MS, NMR, or reference comparison), and <strong>(3)</strong> qualification data — either literature, comparator data, or dedicated toxicology studies. Each impurity above the identification threshold needs all three; missing any one drives an RFI.
      </p>

      <h2>ICH Q3B — Degradation products in new drug products</h2>

      <p>
        ICH Q3B(R2) extends the same three-threshold framework to <strong>degradation products formed in the drug product</strong> during manufacturing or storage.<sup><a href="#ref4">[4]</a></sup> The thresholds are calibrated identically against the maximum daily dose.
      </p>

      <p>
        The practical distinction from Q3A: drug product degradation includes impurities that don't exist in the drug substance. Hydrolysis products from formulation excipients, oxidative degradants from the dosage form, photolytic products from packaging exposure — all require the same threshold-driven identification and qualification, but they sit in 3.2.P.5.5 (drug product specifications and analytical procedures justification) rather than 3.2.S.
      </p>

      <p>
        Stability studies under <strong>ICH Q1A(R2)</strong> are the primary data source for Q3B. The impurity profile section of the SFDA submission must show: which degradation products appear at long-term and accelerated conditions, at what levels relative to the threshold tiers, and what the proposed shelf-life specification limits are based on the data.
      </p>

      <BlogDiscoveryCallCta
        topic="impurity profile"
        variant="inline"
        eyebrow="Bytebeam · Discovery call"
        headline="Impurity profile compilation — automation candidates"
        body="If your CMC team prepares ICH Q3A/B/D and M7 impurity profiles for SFDA submissions recurringly, walk us through your current process. We'll identify where AI agents can compress the threshold-by-threshold compilation cycle and where the work stays with the senior CMC reviewer."
        ctaLabel="Book a 30-min impurity scoping call"
        showProofOfPattern={false}
      />

      <h2>ICH Q3D — Elemental impurities</h2>

      <p>
        Until ICH Q3D was finalised, "inorganic impurities" sat awkwardly inside Q3A — covered conceptually but not with the rigorous framework that the post-2018 understanding of elemental risk demanded. ICH Q3D(R2), Step 4 in 2022, supersedes that approach with a comprehensive risk-based framework for 24 elemental impurities.<sup><a href="#ref5">[5]</a></sup>
      </p>

      <p>The Q3D framework has four operating principles:</p>

      <ol>
        <li><strong>24 elements, three classes.</strong> Class 1 (As, Cd, Hg, Pb) are highest-toxicity elements that require evaluation for all sources. Class 2A (Co, Ni, V) require evaluation in all routes. Class 2B (Ag, Au, Ir, Os, Pd, Pt, Rh, Ru, Se, Tl) require evaluation only when intentionally added. Class 3 (Ba, Cr, Cu, Li, Mo, Sb, Sn) have low oral toxicity but need evaluation for parenteral and inhalation routes.</li>
        <li><strong>PDEs (Permitted Daily Exposures) by route.</strong> Oral, parenteral, and inhalation routes have different PDE values per element. The same element has different acceptable limits depending on how it enters the body.</li>
        <li><strong>Risk-based assessment, not blanket testing.</strong> The MAH evaluates the contribution of each potential elemental source — drug substance, excipients, manufacturing equipment, container-closure system — and only those sources contributing meaningfully to the total need controlled limits in the specification.</li>
        <li><strong>Control strategy must be documented.</strong> The elemental impurity risk assessment is itself a section of the dossier — typically in 3.2.P.5.6 or as a stand-alone Q3D risk assessment.</li>
      </ol>

      <p>
        The Q3D risk assessment is a <strong>document-heavy compilation task</strong>. The team gathers elemental data from every excipient supplier, every equipment material certificate, every container component, and assembles the per-element PDE-vs-actual analysis into the dossier section. For complex formulations with multiple excipients across multiple suppliers, this is exactly the structured-but-mechanical work that AI agents compress effectively when scoped to the specific data sources the team uses.
      </p>

      <h2>ICH M7 — Mutagenic impurities and the nitrosamine extension</h2>

      <p>
        ICH M7(R2), Step 4 in 2023, is the framework for assessing and controlling DNA-reactive (mutagenic) impurities — the highest-risk category, where the carcinogenic potential demands a separate analytical and toxicological treatment.<sup><a href="#ref6">[6]</a></sup>
      </p>

      <p>The M7 framework operates in five steps:</p>

      <ol>
        <li><strong>Identify potential impurities.</strong> Synthesis intermediates, byproducts, degradation products, reagents — the full list of compounds that could appear in the API or drug product.</li>
        <li><strong>Apply the (Q)SAR analysis.</strong> Two complementary in-silico approaches (one rule-based / expert-system, one statistical) screen each impurity for structural alerts indicating mutagenic potential.</li>
        <li><strong>Classify into 5 classes.</strong> Class 1 (known mutagenic carcinogen, including the cohort-of-concern), Class 2 (known mutagen, unknown carcinogenic potential), Class 3 (alerting structure, unrelated to API), Class 4 (alerting structure, related to API which is non-mutagenic), Class 5 (no alert or sufficient data to demonstrate non-mutagenicity).</li>
        <li><strong>Apply Acceptable Intake limits.</strong> For Class 1, 2, and 3 impurities, calculate the acceptable intake using either the TTC (Threshold of Toxicological Concern, 1.5 µg/day for chronic exposure) or compound-specific data where available.</li>
        <li><strong>Define control strategy.</strong> Where a potential mutagenic risk is identified, develop process and analytical controls ensuring impurity levels remain at or below the acceptable cancer-risk level.<sup><a href="#ref7">[7]</a></sup></li>
      </ol>

      <p>
        For an in-house team, M7 is a <strong>cross-disciplinary exercise</strong>: synthesis chemists list potential impurities, toxicologists or contract assessors run the (Q)SAR, regulatory writes the assessment for Module 3.2.S.3.2 (or a dedicated M7 assessment annex). The compilation overhead is significant.
      </p>

      <h3>The nitrosamine extension</h3>

      <p>
        The 2018–2020 nitrosamine crisis (sartans, ranitidine, metformin) drove a major change in regulator focus. ICH M7(R2) addresses nitrosamines but the comprehensive harmonised framework is still developing — the new ICH workstream on N-nitrosamines was formally adopted at the ICH meeting in Fukuoka in June 2024, and M7(R3) is expected to introduce a structurally-quantitative carcinogenic-potency approach for nitrosamines.<sup><a href="#ref8">[8]</a></sup>
      </p>

      <p>
        For SFDA submissions in 2026, this means: the nitrosamine assessment is currently a layered exercise drawing on EMA and FDA guidance for specific N-nitrosamine acceptable intakes (AI), the FDA NDSRI database for known nitrosamine drug substance-related impurities, and the M7 framework for novel nitrosamines. SFDA expects the assessment to be present and current; teams need to track the EMA / FDA AI updates because they are referenced in SFDA practice.
      </p>

      <h2>Why impurity profile compilation eats senior CMC time</h2>

      <p>
        Across the in-house teams we work with, impurity profile compilation has a particular operational shape:
      </p>

      <ul>
        <li><strong>Multi-source data aggregation.</strong> Q3D requires elemental data from every excipient supplier and equipment material. M7 requires synthesis-pathway analysis from R&amp;D plus (Q)SAR results from a third-party assessor. Q3A/B require analytical data from stability + batch testing. The team's role is mostly aggregation and structuring rather than novel science.</li>
        <li><strong>Per-product re-compilation.</strong> Each new product, each variation that changes the synthesis route, each new excipient triggers a re-compilation. The framework is the same; the data inputs change.</li>
        <li><strong>RFI vulnerability is high.</strong> Module 3.2.S.3.2 and the M7 assessment are among the most-RFI-generating dossier sections. Common RFIs: missing qualification for impurities just above the threshold; unjustified specification limits; incomplete elemental risk assessment; M7 (Q)SAR documented insufficiently.</li>
        <li><strong>The judgmental layer is small.</strong> Most of the time goes into structured compilation; the actual scientific judgment (do we accept this impurity at this level given this clinical context?) is a fraction of the total effort.</li>
      </ul>

      <p>
        This pattern — high-volume structured compilation with a smaller judgment layer — is exactly the shape that AI agents purpose-built for impurity-profile work compress effectively. Generic CMC writing tools rarely understand the threshold logic; specialised agents do.
      </p>

      <h2>Benefits of automating impurity profile compilation</h2>

      <ol>
        <li><strong>Threshold logic automation.</strong> Given the maximum daily dose and the analytical results, an agent calculates the applicable Q3A/B thresholds and flags impurities above each threshold tier — surfacing the ones that need identification or qualification rather than burying them in a spreadsheet.</li>
        <li><strong>Q3D risk assessment compilation.</strong> Excipient elemental data + equipment material data + container-closure data → structured per-element PDE-vs-actual analysis with the source-by-source breakdown ICH Q3D(R2) expects.</li>
        <li><strong>M7 assessment drafting.</strong> Synthesis impurity list + (Q)SAR output → drafted M7 assessment with class assignments, TTC-based or compound-specific limits, and the control-strategy section ready for senior review.</li>
        <li><strong>Nitrosamine tracking.</strong> Maintaining the current nitrosamine assessment against the moving target of EMA/FDA AI updates and the FDA NDSRI database — a monitoring task that compounds across portfolios.</li>
      </ol>

      <p>
        Output stays editable. The senior CMC reviewer signs off in normal Word/Excel review. The compilation work that used to take 4–8 weeks per submission moves into days; the judgmental sign-off stays where it belongs.
      </p>

      <h2>How to choose an impurity profile automation partner</h2>

      <table>
        <thead>
          <tr>
            <th>Capability</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ICH Q3A/B threshold-aware</strong></td>
            <td>Tools that don't automatically calibrate thresholds against maximum daily dose miss the entire point.</td>
          </tr>
          <tr>
            <td><strong>ICH Q3D source-by-source assessment</strong></td>
            <td>The agent should structure the elemental risk assessment around drug substance, excipients, equipment, and container-closure — the four mandatory source categories.</td>
          </tr>
          <tr>
            <td><strong>ICH M7 (Q)SAR integration</strong></td>
            <td>(Q)SAR output needs to flow into the M7 assessment without manual re-entry. Generic LLM tools without (Q)SAR integration miss the technical heart of M7.</td>
          </tr>
          <tr>
            <td><strong>Nitrosamine database tracking</strong></td>
            <td>EMA/FDA AI values and the NDSRI database update frequently. Tools that freeze on training data miss the most current limits.</td>
          </tr>
          <tr>
            <td><strong>SFDA Module 3 section mapping</strong></td>
            <td>Output must map to 3.2.S.3.2, 3.2.P.5.5, 3.2.P.5.6 — the dossier sections SFDA reads — not generic "impurity report" formats.</td>
          </tr>
          <tr>
            <td><strong>Audit trail by default</strong></td>
            <td>Every threshold calculation, every classification decision, every (Q)SAR result retained — inspection-ready as a side-effect.</td>
          </tr>
          <tr>
            <td><strong>Process-led scoping</strong></td>
            <td>Innovator workflows differ from generic workflows. Co-build with the team's existing CMC SOPs.</td>
          </tr>
        </tbody>
      </table>

      <BlogRelatedPosts
        slugs={[
          "sfda-drug-master-file-letter-of-access",
          "sfda-ectd-submission-module-structure",
          "sfda-drug-registration-guide-saudi-arabia",
        ]}
        heading="Related reading for CMC and RA teams"
        subtitle="Adjacent topics if you're scoping the broader Module 3 quality submission."
      />

      <h2>ByteBeam and SFDA impurity profile automation</h2>

      <p>
        ByteBeam ships single-purpose AI agents for SFDA document work — built around how the customer's team actually operates, not generic copilots. Three are already in production for <strong>Module 1.3 labelling</strong>:
      </p>

      <ul>
        <li><Link href="/sfda/spc-pil-generator"><strong>SmPC &amp; PIL Generator</strong></Link></li>
        <li><Link href="/sfda/spc-pil-arabic-translator"><strong>Arabic SmPC &amp; PIL Translator</strong></Link></li>
        <li><Link href="/sfda/dossier-gap-analysis"><strong>Dossier Gap Analysis</strong></Link></li>
      </ul>

      <p>
        Impurity profile compilation — Q3A/B threshold compilation, Q3D risk assessment, M7 assessment drafting, nitrosamine tracking — is one of the workloads we're actively scoping with customer CMC teams. The right shape of an impurity-profile agent depends on whether you're an innovator (small volume, long lead time per submission) or a generic manufacturer (high volume, similar synthetic chemistries), and on whether your team uses external (Q)SAR providers or maintains in-house software. That's why we don't ship a generic impurity copilot; we scope each agent to fit the team's existing workflow and data sources.
      </p>

      <h2>The future of impurity assessment in SFDA-regulated submissions</h2>

      <h3>M7(R3) and the formal nitrosamine workstream</h3>

      <p>
        The June 2024 ICH adoption of a formal N-nitrosamine workstream signals that the current patchwork of EMA / FDA / regulator-specific nitrosamine guidance is moving toward a unified ICH framework. M7(R3) is expected to incorporate a quantitative structure-based carcinogenic-potency approach.<sup><a href="#ref8">[8]</a></sup> Teams that have built nitrosamine assessment as a one-off response to specific cases will need to migrate to a structured framework over the next 1–2 years.
      </p>

      <h3>Risk-based controls deepen further</h3>

      <p>
        Q3D's risk-based approach (rather than blanket testing) is increasingly the regulatory default — and this philosophy is spreading into other impurity domains. Future revisions of Q3A/B are likely to deepen the risk-based qualification logic, allowing more leverage of comparator data and literature qualification for impurities at lower abundances.
      </p>

      <h3>(Q)SAR + AI combine in mutagenic-impurity assessment</h3>

      <p>
        The traditional (Q)SAR step in M7 has been a discrete software task. The next generation is hybrid: (Q)SAR + LLM-based literature search + chemistry-aware reasoning over the structural alert, all integrated into the dossier-assembly workflow. The assessment that took weeks becomes a structured document workflow with senior-CMC review at the judgment-critical points.
      </p>

      <h3>SFDA tracks ICH revisions in real time</h3>

      <p>
        SFDA's 2021 ICH membership and continued maturity-level work mean the regulator tracks ICH revisions promptly. For in-house teams, this means impurity-profile practice for SFDA submissions follows the global ICH state-of-art rather than a Saudi-specific divergence — which is good news for the broader applicability of any automation investment.
      </p>

      <BlogDiscoveryCallCta
        topic="impurity profile"
        eyebrow="Bytebeam · Impurity profile scoping call"
        headline="Scope your impurity profile compilation — co-built around your team's CMC process"
        body="Walk us through how your team currently compiles ICH Q3A/B/D and M7 impurity profiles for SFDA submissions. In 30 minutes we'll map the document touchpoints we'd automate first, and what stays with the senior CMC reviewer."
        ctaLabel="Book a 30-min impurity scoping call"
        expectations={[
          "You walk us through your impurity profile compilation workflow as it runs today",
          "We map the document touchpoints we'd automate first across Q3A/B/D and M7",
          "You leave with a written scoping summary — no commitment, no template demos",
        ]}
      />

      <h2>Conclusion</h2>

      <p>
        Impurity profile compilation is one of the highest-stakes technical packages in any SFDA submission. The frameworks are ICH-standard (Q3A, Q3B, Q3D, M7) and SFDA aligns with them; the operational pain is the structured compilation of multi-source data into the threshold-driven analyses regulators expect. For an in-house CMC team running multiple submissions per year, the compilation work is a strong candidate for purpose-built automation — but not for a generic copilot. The threshold logic is too specific, the (Q)SAR integration too technical, and the nitrosamine tracking too dynamic for a one-size-fits-all tool. Co-built agents that respect the team's existing data sources and SOPs are the right shape.
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
            href="https://onlinelibrary.wiley.com/doi/abs/10.1002/9781118971147.ch6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Impurities in New Drug Substances and New Drug Products
          </a>{" "}
          — peer-reviewed ICH Quality Guidelines reference (Wiley).
        </li>
        <li id="ref2">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/Q3A(R2)%20Guideline.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Q3A(R2) Impurities in New Drug Substances
          </a>{" "}
          (PDF, Step 4).
        </li>
        <li id="ref3">
          <a
            href="https://www.ema.europa.eu/en/ich-q3a-r2-impurities-new-drug-substances-scientific-guideline"
            target="_blank"
            rel="noopener noreferrer"
          >
            EMA — ICH Q3A(R2) scientific guideline page
          </a>
          .
        </li>
        <li id="ref4">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/Q3B(R2)%20Guideline.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Q3B(R2) Impurities in New Drug Products
          </a>{" "}
          (PDF, Step 4).
        </li>
        <li id="ref5">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/Q3D-R2_Guideline_Step4_2022_0308.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Q3D(R2) Guideline for Elemental Impurities
          </a>{" "}
          (PDF, Step 4, March 2022).
        </li>
        <li id="ref6">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/ICH_M7(R2)_Guideline_Step4_2023_0216_0.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            M7(R2) Assessment and Control of DNA Reactive (Mutagenic) Impurities
          </a>{" "}
          (PDF, Step 4, February 2023).
        </li>
        <li id="ref7">
          <a
            href="https://www.ema.europa.eu/en/ich-m7-assessment-control-dna-reactive-mutagenic-impurities-pharmaceuticals-limit-potential-carcinogenic-risk-scientific-guideline"
            target="_blank"
            rel="noopener noreferrer"
          >
            EMA — ICH M7 scientific guideline page
          </a>
          .
        </li>
        <li id="ref8">
          <a
            href="https://link.springer.com/article/10.1186/s41021-025-00349-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guidelines for the assessment and control of mutagenic impurities in
            pharmaceuticals
          </a>
          . Genes and Environment (Springer Nature, 2025) — peer-reviewed
          summary including the M7(R3) and ICH N-nitrosamine workstream.
        </li>
        <li id="ref9">
          <a
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12723853/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guidelines for the assessment and control of mutagenic impurities in
            pharmaceuticals (PMC)
          </a>{" "}
          — open-access version of the same Springer Nature analysis.
        </li>
      </ol>

      <p className="text-sm text-muted-foreground mt-8">
        <em>
          Last updated: May 2026. ICH guidelines and SFDA practice evolve over
          time — verify the current ICH guideline version on the{" "}
          <a
            href="https://www.ich.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICH website
          </a>{" "}
          and the current SFDA expectation against the official SFDA regulations
          portal at{" "}
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
