// ByteBeam brand colors and styles
export const colors = {
  primary: "#2782FF",
  primaryDark: "#164DB3",
  accent: "#22C55E",
  dark: "#1a1a1a",
  white: "#ffffff",
  muted: "#f5f5f5",
  mutedForeground: "#6b7280",
  gradient: "linear-gradient(135deg, #2782FF 0%, #164DB3 100%)",

  // Column type colors (from scroll-simulation)
  input: "#3B82F6",      // blue-500
  extract: "#A855F7",    // purple-500
  crossRef: "#F59E0B",   // amber-500
  reasoning: "#6366F1",  // indigo-500
  action: "#22C55E",     // green-500

  // Status colors
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",

  // UI colors
  border: "#e5e7eb",
  cardBg: "#ffffff",
};

export const fonts = {
  display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif',
  mono: '"SF Mono", Menlo, Monaco, monospace',
};

// Column configuration for the demo
export const columnConfig = [
  { id: "file", label: "Input File", type: "input", color: colors.input },
  { id: "vendor", label: "Vendor", type: "extract", color: colors.extract },
  { id: "amount", label: "Amount", type: "extract", color: colors.extract },
  { id: "poMatch", label: "PO Match", type: "cross-reference", color: colors.crossRef },
  { id: "variance", label: "Variance", type: "cross-reference", color: colors.crossRef },
  { id: "assessment", label: "AI Assessment", type: "reasoning", color: colors.reasoning },
  { id: "action", label: "Recommendation", type: "action", color: colors.action },
];

// Demo data rows
export const demoRows = [
  {
    file: "invoice_acme.pdf",
    vendor: "Acme Corp",
    amount: "$12,450",
    poMatch: { value: "PO-2024-112", status: "matched" },
    variance: { value: "$0", status: "ok" },
    assessment: "Amount matches PO. Vendor approved.",
    action: { label: "Auto-Approve", status: "approve" }
  },
  {
    file: "supplier_q1.pdf",
    vendor: "TechSupply",
    amount: "$8,920",
    poMatch: { value: "PO-2024-098", status: "matched" },
    variance: { value: "+$420 (5%)", status: "warning" },
    assessment: "5% variance within threshold.",
    action: { label: "Auto-Approve", status: "approve" }
  },
  {
    file: "vendor_bill.pdf",
    vendor: "Global Mat.",
    amount: "$45,200",
    poMatch: { value: "PO-2024-067", status: "matched" },
    variance: { value: "+$5,200 (13%)", status: "error" },
    assessment: "13% exceeds threshold. Prior issues.",
    action: { label: "Review", status: "review" }
  },
  {
    file: "services_feb.pdf",
    vendor: "CloudServ",
    amount: "$3,299",
    poMatch: { value: "PO-2024-145", status: "matched" },
    variance: { value: "$0", status: "ok" },
    assessment: "Monthly SaaS. On schedule.",
    action: { label: "Auto-Approve", status: "approve" }
  },
  {
    file: "equipment.pdf",
    vendor: "EquipLease",
    amount: "$18,750",
    poMatch: { value: "Not Found", status: "missing" },
    variance: { value: "N/A", status: "error" },
    assessment: "No PO. Vendor not in master list.",
    action: { label: "Reject", status: "reject" }
  },
  {
    file: "maintenance.pdf",
    vendor: "FacilityPro",
    amount: "$5,600",
    poMatch: { value: "PO-2024-167", status: "matched" },
    variance: { value: "-$400 (-7%)", status: "ok" },
    assessment: "Credit for SLA miss applied.",
    action: { label: "Auto-Approve", status: "approve" }
  },
];

export const typeLabels: Record<string, string> = {
  "input": "Input",
  "extract": "Extract",
  "cross-reference": "Cross-Reference",
  "reasoning": "AI Reasoning",
  "action": "Action",
};
