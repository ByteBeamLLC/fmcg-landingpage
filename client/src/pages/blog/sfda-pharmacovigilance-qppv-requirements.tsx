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
      "SFDA Pharmacovigilance & QPPV Requirements: A Practical Guide for In-House Teams in 2026",
    description:
      "SFDA pharmacovigilance for in-house RA/PV teams: QPPV qualifications, PSSF, ICSR/PSUR/RMP cycles, and where automation actually helps in 2026.",
    image: "https://bytebeam.co/images/blog/sfda-pharmacovigilance-qppv.jpg",
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
        "https://bytebeam.co/blog/sfda-pharmacovigilance-qppv-requirements",
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
        name: "SFDA Pharmacovigilance & QPPV Requirements",
        item: "https://bytebeam.co/blog/sfda-pharmacovigilance-qppv-requirements",
      },
    ],
  },
];

export default function SfdaPharmacovigilanceQppvBlog() {
  return (
    <BlogLayout
      title="SFDA Pharmacovigilance & QPPV Requirements: A Practical Guide for In-House Teams in 2026"
      description="SFDA pharmacovigilance for in-house RA/PV teams: QPPV qualifications, PSSF, ICSR/PSUR/RMP cycles, and where automation actually helps in 2026."
      keywords="SFDA pharmacovigilance, QPPV Saudi Arabia, GVP guideline SFDA, pharmacovigilance Saudi requirements, PSSF SFDA, Saudi Vigilance, ICSR SFDA, PSUR SFDA, RMP SFDA, deputy QPPV Saudi"
      canonical="https://bytebeam.co/blog/sfda-pharmacovigilance-qppv-requirements"
      structuredData={structuredData}
      category="Regulatory"
      industry="Pharma"
      readTime="14 min"
      date={PUBLISHED}
      updated={UPDATED}
      author="Talal Bazerbachi"
    >
      <p className="text-xl leading-relaxed mb-8">
        For an in-house pharmacovigilance team, the workload after registration looks nothing like the workload before it. <strong>SFDA pharmacovigilance</strong> obligations are perpetual, multi-stream, and highly document-heavy: every adverse-event case, every PSUR cycle, every RMP version, every audit pull. Get the foundation right and a small team can run a large portfolio. Get it wrong and the same team chases compliance for years.
      </p>

      <p>
        This guide is written for Heads of RA, QPPVs, and PV Managers running PV inside the marketing-authorisation holder — not for consultancies. It covers what the SFDA Good Pharmacovigilance Practices (GVP) guideline actually requires, where the Saudi-national rules diverge from EU practice, and where document-heavy work is a candidate for automation versus where it shouldn't be.
      </p>

      <BlogKeyTakeaways
        points={[
          "The SFDA's Saudi Vigilance program (NPSC), established in 2009, is the primary recipient of all post-marketing safety data — every MAH must integrate with it.",
          "The local QPPV must be a Saudi national, full-time, residing in KSA, licensed by the Saudi Commission for Health Specialties (SCFHS); the deputy QPPV must also be a Saudi national.",
          "The Pharmacovigilance Sub-System File (PSSF) is the local KSA equivalent of the EU PSMF — its content and the QPPV's access to safety data must remain inside KSA.",
          "ICSR, PSUR/PBRER, and RMP cycles are the highest-recurring document workloads; ICH E2D, E2C(R2), and E2E define the structural expectations.",
          "Submission of Risk Minimisation Measures (RMMs) and proof of their efficacy is increasingly requested by SFDA — RMP is no longer a write-once document.",
        ]}
      />

      <h2>What is SFDA pharmacovigilance?</h2>

      <p>
        Pharmacovigilance under the Saudi Food and Drug Authority is governed by the <strong>Guideline on Good Pharmacovigilance Practices (GVP)</strong>, document reference <em>DS-G-008</em>, currently in version 3.x. The GVP is structured to mirror EMA GVP modules — covering quality systems, the pharmacovigilance system master file equivalent, signal management, RMPs, ICSRs, PSURs, additional monitoring, and post-authorisation safety studies — but with KSA-specific divergences that an EU-trained team often misses.<sup><a href="#ref1">[1]</a></sup>
      </p>

      <p>
        At the centre of the system is the <strong>Saudi Vigilance program</strong>, run by the National Pharmacovigilance and Drug Safety Center (NPSC). Saudi Vigilance was established in 2009 and serves as the receiving authority for all post-marketing safety data from MAHs operating in the Kingdom — adverse event reports, periodic reports, signals, and risk-management documentation.<sup><a href="#ref2">[2]</a></sup> Every marketing authorisation issued by SFDA is conditional on continued PV compliance against the GVP, and inspections against the GVP are now an established part of the SFDA inspection programme.<sup><a href="#ref3">[3]</a></sup>
      </p>

      <p>
        Two cross-cutting principles shape every other PV obligation:
      </p>

      <ol>
        <li><strong>Local responsibility cannot be delegated globally.</strong> A multinational MAH cannot run KSA pharmacovigilance entirely from a regional or global hub. The SFDA requires a local PV sub-system, a local QPPV, and a locally-resident system file.<sup><a href="#ref1">[1]</a></sup></li>
        <li><strong>Documentation must be inspection-ready.</strong> The GVP and SFDA inspection practice align on the principle that PV obligations are evidenced through documents — case files, PSSF, RMP, signal reports, audit logs. If it isn't written down with retained evidence, it didn't happen.</li>
      </ol>

      <h2>QPPV and the Saudi-national requirement</h2>

      <p>
        The single biggest divergence from the EU model: <strong>the QPPV — and the deputy QPPV — must be Saudi nationals</strong>. This is the rule that catches foreign MAHs entering KSA off-guard, because the EU equivalent has no nationality restriction.<sup><a href="#ref4">[4]</a></sup>
      </p>

      <p>The SFDA's GVP states the local QPPV must:<sup><a href="#ref1">[1]</a><sup><a href="#ref5">[5]</a></sup></sup></p>

      <ul>
        <li>Be a Saudi national residing in KSA on a full-time basis</li>
        <li>Hold a pharmacy or medicine qualification, licensed by the Saudi Commission for Health Specialties (SCFHS)</li>
        <li>Have demonstrable experience or access to expertise in medicine, pharmaceutical science, epidemiology, and biostatistics</li>
        <li>Be permanently and continuously available to SFDA — including for unannounced inspections</li>
        <li>Have authority over the local PV system, including signing off on the PSSF and acting as the single point of contact with Saudi Vigilance</li>
      </ul>

      <p>
        The same Saudi-national requirement applies to the <strong>deputy QPPV</strong>, who serves as the formal backup. The deputy must also reside in KSA. This is critical for inspection readiness: SFDA expects either the QPPV or the deputy to be reachable at any time.
      </p>

      <p>
        Outsourcing is permitted but constrained. The SFDA GVP allows partial or complete outsourcing of PV activities — including the QPPV role — to a local Saudi PV service provider, but the QPPV / LQPPV themselves must still be physically located in Saudi Arabia.<sup><a href="#ref4">[4]</a></sup> In practice, the choice for an MAH is typically: hire a Saudi pharmacist QPPV in-house, contract with a Saudi PV consultancy that supplies one, or partner with the local affiliate's existing PV staff.
      </p>

      <p>
        For in-house teams, <strong>continuity is the operational risk</strong>. A QPPV resignation creates an immediate gap — and the deputy is not always trained to step in fully. Maintaining tested handover documentation, role-and-responsibilities matrices, and an up-to-date PSSF section on QPPV scope is the difference between a 30-day rebuild and a regulatory finding.
      </p>

      <h2>Core PV obligations after registration</h2>

      <p>
        Once a product is registered, six PV streams run continuously. Each one consumes time differently, and each one has specific document deliverables that consume team capacity in predictable ways.
      </p>

      <h3>Individual Case Safety Reports (ICSRs)</h3>

      <p>
        ICSRs are the unit of safety reporting. Every credible adverse event observed in a Saudi patient — whether reported by a healthcare professional, a consumer, or pulled from literature — must be documented as an ICSR and submitted to Saudi Vigilance within prescribed timelines. <strong>ICH E2D</strong> defines the structural standard for post-approval safety data collection that the SFDA GVP follows: serious adverse reactions are reported on an expedited 15-calendar-day clock, while non-serious cases follow periodic reporting.<sup><a href="#ref6">[6]</a></sup>
      </p>

      <p>
        For an in-house team, the ICSR workload scales linearly with the marketed portfolio and with patient volume. Manual triage — duplicate detection, seriousness classification, causality assessment, MedDRA coding, narrative drafting — is where most PV operational time accumulates. Multinational MAHs often run global ICSR processing in their parent system, then have the Saudi QPPV review and submit locally; the SFDA expects local oversight of every Saudi case regardless of the global system.<sup><a href="#ref7">[7]</a></sup>
      </p>

      <h3>Periodic Safety Update Reports (PSUR / PBRER)</h3>

      <p>
        The PSUR is the cornerstone of periodic benefit-risk reporting. <strong>ICH E2C(R2)</strong> renamed and restructured the format as the Periodic Benefit-Risk Evaluation Report (PBRER) to shift emphasis from adverse-event tabulation to integrated benefit-risk assessment.<sup><a href="#ref8">[8]</a></sup> The SFDA GVP follows the E2C(R2) PBRER structure for periodic reports.
      </p>

      <p>
        PSUR cycles are predictable but expensive. A typical PSUR consumes 3–6 weeks of senior PV time per product per cycle. The bulk of that effort is mechanical: aggregating ICSRs, summarising trial data, pulling literature, regenerating signal evaluations, and formatting tables to ICH structure. The judgmental part — the integrated benefit-risk discussion — is a fraction of the actual time. This imbalance is what makes PSUR cycles a strong automation candidate.
      </p>

      <h3>Risk Management Plan (RMP) and Risk Minimisation Measures (RMMs)</h3>

      <p>
        The RMP is the strategic safety document for each product. <strong>ICH E2E</strong> defines the pharmacovigilance planning framework — the safety specification, pharmacovigilance plan, and risk minimisation activities.<sup><a href="#ref9">[9]</a></sup> The SFDA GVP requires an RMP for new authorisations and significant variations, and the document is expected to evolve over the product's lifecycle.
      </p>

      <p>
        Recent SFDA practice has put more weight on <strong>RMM efficacy evidence</strong>. SFDA increasingly requests proof that risk-minimisation measures (educational materials, controlled distribution, prescriber checklists) are actually being delivered and used, not just documented in the RMP.<sup><a href="#ref10">[10]</a></sup> This shifts the RMP from a write-once document to a living artefact with periodic updates and evidence packs.
      </p>

      <h3>Pharmacovigilance Sub-System File (PSSF)</h3>

      <p>
        The PSSF is the KSA-specific document that describes the MAH's local pharmacovigilance system — equivalent in spirit to the EU PSMF, but anchored in Saudi territory. The SFDA requires the PSSF content and QPPV-accessible safety data to remain inside KSA: multinational MAHs may keep their global database abroad, but the QPPV must have local access to Saudi case data, or alternatively maintain a local database in Saudi Arabia.<sup><a href="#ref11">[11]</a></sup>
      </p>

      <p>The PSSF must describe:</p>
      <ul>
        <li>The Saudi QPPV's qualifications, role, and reporting line</li>
        <li>Computerised systems and databases used at national level</li>
        <li>Procedures for collecting, processing, and reporting safety data — including timeframes, parties, flow diagrams, and any third parties involved</li>
        <li>Quality system documentation and training records</li>
        <li>Contingency arrangements for QPPV unavailability</li>
      </ul>

      <p>
        A frequently-missed compliance point: the PSSF is supposed to be <strong>kept current</strong>, not refreshed only at inspection. Each material change to the PV system (new product, new third party, new database, QPPV change) requires a PSSF update with version control.
      </p>

      <h3>Signal management and literature monitoring</h3>

      <p>
        Signal management is the proactive arm of PV — detecting emerging safety patterns from the cumulative case data and from external sources. Literature monitoring is the structured weekly/monthly search of medical literature for adverse-event mentions of marketed products. Both are time-intensive and both produce documentation that must be retained for inspection.<sup><a href="#ref12">[12]</a></sup>
      </p>

      <h3>Audit and inspection readiness</h3>

      <p>
        SFDA conducts both routine and triggered PV inspections. The inspection scope typically covers QPPV qualifications and continuity, PSSF accuracy versus actual practice, ICSR processing timelines, PSUR submission compliance, RMP/RMM execution, signal-management documentation, training records, and CAPA history.<sup><a href="#ref3">[3]</a></sup> Inspection readiness is not a one-week project; it is a continuous documentation discipline that the QPPV owns.
      </p>

      <BlogDiscoveryCallCta
        topic="PV"
        variant="inline"
        eyebrow="Bytebeam · Discovery call"
        headline="Map your PV workload — find the work that's a candidate for automation"
        body="If your team handles ICSR triage, PSUR drafting, RMP maintenance, or PSSF upkeep recurringly, walk us through it in a 30-minute call. We'll show you which document touchpoints we'd automate first, and what stays with the QPPV."
        ctaLabel="Book a 30-min PV scoping call"
        showProofOfPattern={false}
      />

      <h2>Why PV obligations eat senior team time</h2>

      <p>
        Across the in-house teams we work with, PV time consumption follows a consistent pattern. The judgmental work — causality assessment, integrated benefit-risk discussions, signal-strength evaluation — is a small fraction. The bulk is structured document work that scales with portfolio size:
      </p>

      <ul>
        <li><strong>ICSR triage</strong> grows linearly with marketed products and Saudi patient volume. Senior PV time spent on case-level review (not data entry, but actual review) is non-trivial — and goes up sharply when literature monitoring or social-media sources are added.</li>
        <li><strong>PSUR preparation</strong> consumes 3–6 weeks per product per cycle. Most of that is data aggregation and section drafting in the ICH E2C(R2) format. The benefit-risk synthesis at the end is fast in comparison.</li>
        <li><strong>RMP maintenance</strong> is no longer write-once. Variations, labelling changes, and SFDA RMM-efficacy requests trigger updates that ripple through prescriber materials and distribution evidence packs.<sup><a href="#ref10">[10]</a></sup></li>
        <li><strong>PSSF currency</strong> is a perpetual maintenance task. Most non-compliance findings here are version-control failures — the document doesn't reflect actual practice because the practice changed and the document didn't.</li>
        <li><strong>Inspection readiness</strong> means pulling evidence on demand. Without a structured retention system, inspection prep is a fire drill where the QPPV reconstructs months of activity from email threads and shared drives.</li>
      </ul>

      <p>
        The Arab pharmacovigilance literature consistently identifies <strong>capacity and resource constraints</strong> as one of the biggest barriers to PV maturity in the region — not lack of regulation but lack of bandwidth to operationalise it.<sup><a href="#ref7">[7]</a></sup> For a small in-house team with a growing portfolio, the work compounds faster than headcount can be justified.
      </p>

      <h2>Benefits of automating recurring PV document work</h2>

      <p>
        AI agents purpose-built for SFDA PV work do not replace the QPPV — they replace the structured drafting and aggregation work that scales with portfolio size. Four measurable benefits for an in-house team:
      </p>

      <ol>
        <li><strong>ICSR throughput.</strong> Case-level triage assistance — duplicate detection, seriousness classification, MedDRA term suggestions, narrative drafting from structured fields — frees senior reviewers for actual judgment calls.</li>
        <li><strong>Faster PSUR cycles.</strong> Aggregation of ICSRs, line listings, literature pulls, and section drafting in E2C(R2) format moves from weeks to days. The QPPV still owns the integrated benefit-risk discussion.</li>
        <li><strong>RMP version control + RMM evidence packs.</strong> Auto-generated diff reports against the previous RMP version. Structured retention of RMM delivery evidence (educational material distribution logs, prescriber acknowledgements) tied to the RMP version that triggered them.</li>
        <li><strong>PSSF auto-currency.</strong> Section-level updates triggered by changes elsewhere in the PV system (new product, new third party, QPPV change) — no more annual catch-up rewrites.</li>
      </ol>

      <p>
        The output stays editable. The QPPV signs off in normal review tools, then submits via Saudi Vigilance. Audit trails are retained automatically — inspection readiness becomes a side effect of doing the work, not a separate project.
      </p>

      <h2>How to choose an SFDA PV automation partner</h2>

      <p>
        The market for "AI for pharmacovigilance" is noisy. Most generic offerings are built around EU/US PV practice and miss the SFDA-specific points that define KSA compliance. When evaluating, look for:
      </p>

      <table>
        <thead>
          <tr>
            <th>Capability</th>
            <th>Why it matters for SFDA PV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SFDA GVP-aligned outputs</strong></td>
            <td>Generic ICH-style outputs miss KSA-specific structure. Verify with sample output before licensing.</td>
          </tr>
          <tr>
            <td><strong>Saudi-national QPPV workflow support</strong></td>
            <td>Tools that assume the QPPV is in EU/US miss the QPPV-resides-in-KSA control points (PSSF locality, sign-off authority).</td>
          </tr>
          <tr>
            <td><strong>ICH E2D, E2C(R2), E2E compliance</strong></td>
            <td>The structural standards are not optional. Outputs must follow the format SFDA expects.</td>
          </tr>
          <tr>
            <td><strong>Audit trail retention by default</strong></td>
            <td>SFDA inspections are evidence-driven. Every run retained, every change versioned.</td>
          </tr>
          <tr>
            <td><strong>Editable structured output</strong></td>
            <td>QPPV review happens in Word/Excel. Locked-PDF output is a non-starter.</td>
          </tr>
          <tr>
            <td><strong>Process-led scoping</strong></td>
            <td>Your team's SOPs are the ground truth, not a vendor's template. The right partner co-builds.</td>
          </tr>
          <tr>
            <td><strong>Free first-run preview</strong></td>
            <td>Verify output quality on your own data before any commercial conversation.</td>
          </tr>
        </tbody>
      </table>

      <p>
        The last two points separate SFDA-specialised partners from generic PV vendors. Generic vendors lead with template demos. Specialised partners ask to walk through your SOPs first.
      </p>

      <BlogRelatedPosts
        slugs={[
          "sfda-variations-type-ia-ib-ii-decision-guide",
          "sfda-drug-registration-guide-saudi-arabia",
          "no-code-document-automation-regulatory-teams-2026",
        ]}
        heading="Related reading for RA / PV teams"
        subtitle="Adjacent topics if you're scaling a Saudi PV operation."
      />

      <h2>ByteBeam and SFDA PV automation</h2>

      <p>
        The <Link href="/sfda">ByteBeam SFDA toolkit</Link> ships single-purpose AI agents for SFDA document work — built around how the customer's team actually operates, not a generic copilot. Three are already in production for SFDA <strong>Module 1.3 labelling</strong>:
      </p>

      <ul>
        <li><Link href="/sfda/spc-pil-generator"><strong>SmPC &amp; PIL Generator</strong></Link> — produces Module 1.3-aligned drafts from an originator pack</li>
        <li><Link href="/sfda/spc-pil-arabic-translator"><strong>Arabic SmPC &amp; PIL Translator</strong></Link> — regulator-recognised Arabic with RTL formatting</li>
        <li><Link href="/sfda/dossier-gap-analysis"><strong>Dossier Gap Analysis</strong></Link> — pre-submission completeness sweep against Module 1.3 + GCC labelling guidance</li>
      </ul>

      <p>
        Pharmacovigilance is the next workload we're scoping with customer teams. ICSR triage, PSUR drafting, RMP version control, and PSSF currency are all candidates — but the right shape of each agent depends on how your team's SOPs actually run today. That's why we don't ship a generic PV copilot. We scope the work with you, then build the agent for your process.
      </p>

      <h2>The future of PV in SFDA-regulated submissions</h2>

      <p>
        Three shifts are reshaping how PV teams operate inside the SFDA ecosystem:
      </p>

      <h3>Single-purpose agents over general copilots</h3>

      <p>
        The wave of "general AI for pharma" is giving way to agents scoped to specific PV tasks. ICSR triage, PSUR drafting, and signal documentation each have distinct quality bars and distinct data flows — they don't share an interface. Expect more purpose-built tooling and less generic copilot framing.
      </p>

      <h3>RMM evidence is becoming first-class</h3>

      <p>
        SFDA's increased attention on RMM efficacy evidence pushes the RMP from a strategy document toward an operational artefact with continuous evidence collection.<sup><a href="#ref10">[10]</a></sup> Expect tooling that treats RMM materials, distribution logs, and HCP acknowledgements as structured, versioned, queryable evidence — not unstructured PDFs in a shared drive.
      </p>

      <h3>Pre-emptive signal detection moves left</h3>

      <p>
        Aggregated case data + literature monitoring + post-marketing study data are deterministic enough that AI can surface candidate signals earlier. Final signal-strength evaluation remains with the QPPV, but the detection step is increasingly automated. Saudi Vigilance's data-sharing posture suggests the regulator is moving in the same direction.<sup><a href="#ref2">[2]</a></sup>
      </p>

      <h3>Saudi-national requirements aren't going away</h3>

      <p>
        Automation is not a substitute for the local QPPV. The Saudi-national rule reflects regulatory and Saudisation policy, not a technology gap. The right way to think about AI in SFDA PV is as <strong>QPPV leverage</strong>: the same QPPV runs a larger portfolio without the document workload scaling proportionally.
      </p>

      <BlogDiscoveryCallCta
        topic="PV"
        eyebrow="Bytebeam · PV scoping call"
        headline="Scope your PV automation with your team's process — not a generic template"
        body="Walk us through how your team currently handles ICSR triage, PSUR drafting, RMP maintenance, or PSSF upkeep. In 30 minutes we'll map the document touchpoints we'd automate first, and you leave with a written scoping summary you can take back to your QPPV / Head of RA."
        ctaLabel="Book a 30-min PV scoping call"
        expectations={[
          "You walk us through your PSUR / ICSR / RMP / PSSF workflow as it runs today",
          "We map the document touchpoints we'd automate first, and what stays with the QPPV",
          "You leave with a written scoping summary — no commitment, no template demos",
        ]}
      />

      <h2>Conclusion</h2>

      <p>
        SFDA pharmacovigilance is an inherently document-heavy discipline operating under Saudi-specific rules — the QPPV must be Saudi national, the PSSF must be locally accessible, RMM evidence is increasingly scrutinised, and inspection readiness is a continuous documentation discipline. For an in-house PV team, the strategic question is not <em>whether</em> to invest in PV infrastructure but <em>where to invest first</em>: the QPPV/deputy continuity, the PSSF, the ICSR/PSUR/RMP cycle, and the audit-readiness layer all compete for finite senior time.
      </p>

      <p>
        Automation is not a substitute for regulatory judgment, and it does not absolve the Saudi QPPV of accountability. What it does is change the ratio of structured document work to judgmental work — letting the same team run a much larger portfolio without proportionally scaling headcount. The right starting point is whatever recurring document workload is currently consuming the most senior time in your specific operation.
      </p>

      <BlogRelatedTools
        eyebrow="Try the SFDA toolkit"
        heading="The 3 SFDA tools we've already shipped"
        subtitle="Module 1.3 labelling agents — proof of pattern for the work we co-build with in-house teams. Free first run on each, audit-trailed, DOCX out."
      />

      <hr />

      <h2>References</h2>

      <ol className="text-sm">
        <li id="ref1">
          <a
            href="https://sfda.gov.sa/en/regulations/79225"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA — Guideline on Good Pharmacovigilance Practices (GVP), DS-G-008
          </a>{" "}
          (current version on the official SFDA regulations portal).
        </li>
        <li id="ref2">
          Alshammari T.M. et al.{" "}
          <a
            href="https://www.sciencedirect.com/science/article/pii/S131901641830001X"
            target="_blank"
            rel="noopener noreferrer"
          >
            Saudi Vigilance Program: Challenges and lessons learned
          </a>
          . Saudi Pharmaceutical Journal, ScienceDirect.
        </li>
        <li id="ref3">
          <a
            href="https://www.sfda.gov.sa/sites/default/files/2023-03/AnnualReport2022PVInspection.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA Pharmacovigilance Inspections Annual Report (Jan 1 – Dec 31,
            2022)
          </a>{" "}
          — official SFDA inspection findings.
        </li>
        <li id="ref4">
          Alshammari T.M. et al.{" "}
          <a
            href="https://link.springer.com/article/10.1007/s40264-019-00807-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pharmacovigilance Systems in Arab Countries: Overview of 22 Arab
            Countries
          </a>
          . Drug Safety, Springer Nature.
        </li>
        <li id="ref5">
          <a
            href="https://istitlaa.ncc.gov.sa/en/health/sfda/GVP/Pages/Article_001.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA GVP — Module I: Pharmacovigilance Systems and Their Quality
            System
          </a>{" "}
          (public consultation portal).
        </li>
        <li id="ref6">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/E2D_Guideline.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            E2D Post-Approval Safety Data Management
          </a>
          . International Council for Harmonisation, Step 4.
        </li>
        <li id="ref7">
          Alshammari T.M. et al. (Drug Safety, 2019).{" "}
          <a
            href="https://link.springer.com/article/10.1007/s40264-019-00807-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pharmacovigilance Systems in Arab Countries
          </a>
          {" "}— capacity and resource constraints in regional PV practice.
        </li>
        <li id="ref8">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/E2C_R2_Guideline.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            E2C(R2) Periodic Benefit-Risk Evaluation Report (PBRER)
          </a>
          . International Council for Harmonisation, Step 4.
        </li>
        <li id="ref9">
          ICH —{" "}
          <a
            href="https://database.ich.org/sites/default/files/E2E_Guideline.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            E2E Pharmacovigilance Planning
          </a>
          . International Council for Harmonisation, Step 4.
        </li>
        <li id="ref10">
          <a
            href="https://www.mavenrs.com/blog/SFDA-Pharmacovigilance-in-Saudi-Arabia-2025-Building-Modern-Compliant-and-Market-Ready-Drug-Safety-Systems"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA practice update on Risk Minimisation Measures (RMM) efficacy
            evidence
          </a>
          {" "}— industry analysis of recent SFDA expectations.
        </li>
        <li id="ref11">
          <a
            href="https://istitlaa.ncc.gov.sa/en/health/sfda/GVP/Pages/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            SFDA GVP — Pharmacovigilance Sub-System File (PSSF) requirements
          </a>{" "}
          (public consultation index).
        </li>
        <li id="ref12">
          <a
            href="https://www.moh.gov.sa/eServices/Licences/Documents/91.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            DS-G-008-V3.1 SFDA GVP Guideline — Signal management and literature
            monitoring (PDF)
          </a>
          .
        </li>
      </ol>

      <p className="text-sm text-muted-foreground mt-8">
        <em>
          Last updated: May 2026. Saudi Vigilance procedures and SFDA GVP
          interpretations evolve frequently — verify current expectations
          against the official SFDA regulations portal at{" "}
          <a
            href="https://sfda.gov.sa/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            sfda.gov.sa
          </a>{" "}
          before finalising submissions.
        </em>
      </p>
    </BlogLayout>
  );
}
