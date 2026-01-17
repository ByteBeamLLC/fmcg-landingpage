import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Database, Brain, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

// Column definitions showing the progression: Input → Extract → Cross-Reference → Reason → Act
const columns = [
  { id: "file", label: "Input File", type: "input", icon: FileText, color: "blue" },
  { id: "vendor", label: "Vendor", type: "extract", icon: null, color: "purple" },
  { id: "amount", label: "Invoice Amount", type: "extract", icon: null, color: "purple" },
  { id: "poMatch", label: "PO Match", type: "cross-reference", icon: Database, color: "amber" },
  { id: "variance", label: "Amount Variance", type: "cross-reference", icon: Database, color: "amber" },
  { id: "assessment", label: "AI Assessment", type: "reasoning", icon: Brain, color: "indigo" },
  { id: "action", label: "Recommendation", type: "action", icon: CheckCircle, color: "green" },
];

// Sample data showing real reasoning
const rows = [
  {
    file: "invoice_acme_jan.pdf",
    vendor: "Acme Corp",
    amount: "$12,450.00",
    poMatch: { value: "PO-2024-112", status: "matched" },
    variance: { value: "$0.00", percent: "0%", status: "ok" },
    assessment: "Amount matches PO exactly. Vendor is in approved list with good payment history. All line items correspond to PO.",
    action: { label: "Auto-Approve", status: "approve" }
  },
  {
    file: "supplier_q1.pdf",
    vendor: "TechSupply Inc",
    amount: "$8,920.50",
    poMatch: { value: "PO-2024-098", status: "matched" },
    variance: { value: "+$420.50", percent: "+5%", status: "warning" },
    assessment: "Invoice exceeds PO by 5%. Variance within 10% threshold. Additional charges appear to be documented shipping fees.",
    action: { label: "Auto-Approve", status: "approve" }
  },
  {
    file: "vendor_bill_003.pdf",
    vendor: "Global Materials",
    amount: "$45,200.00",
    poMatch: { value: "PO-2024-067", status: "matched" },
    variance: { value: "+$5,200", percent: "+13%", status: "error" },
    assessment: "Invoice exceeds PO by 13%, above 10% threshold. Vendor has 2 prior overcharge incidents in past 6 months. Requires verification.",
    action: { label: "Manager Review", status: "review" }
  },
  {
    file: "services_feb.pdf",
    vendor: "CloudServ Pro",
    amount: "$3,299.00",
    poMatch: { value: "PO-2024-145", status: "matched" },
    variance: { value: "$0.00", percent: "0%", status: "ok" },
    assessment: "Recurring monthly SaaS subscription. Amount matches contract terms. Payment schedule on track.",
    action: { label: "Auto-Approve", status: "approve" }
  },
  {
    file: "equipment_lease.pdf",
    vendor: "EquipLease Ltd",
    amount: "$18,750.00",
    poMatch: { value: "Not Found", status: "missing" },
    variance: { value: "N/A", percent: "", status: "error" },
    assessment: "No matching PO found in system. Vendor 'EquipLease Ltd' not in approved vendor master list. Invoice references contract #EL-2024 not on file.",
    action: { label: "Reject", status: "reject" }
  },
  {
    file: "maintenance_q1.pdf",
    vendor: "FacilityPro",
    amount: "$5,600.00",
    poMatch: { value: "PO-2024-167", status: "matched" },
    variance: { value: "-$400", percent: "-7%", status: "ok" },
    assessment: "Invoice is $400 below PO amount. Credit applied for service SLA miss in January. Documentation attached.",
    action: { label: "Auto-Approve", status: "approve" }
  },
];

const typeLabels: Record<string, string> = {
  "input": "Input",
  "extract": "Extract",
  "cross-reference": "Cross-Reference",
  "reasoning": "AI Reasoning",
  "action": "Action",
};

const typeColors: Record<string, string> = {
  "input": "bg-blue-500",
  "extract": "bg-purple-500",
  "cross-reference": "bg-amber-500",
  "reasoning": "bg-indigo-500",
  "action": "bg-green-500",
};

export default function ScrollSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [filledCells, setFilledCells] = useState<Set<string>>(new Set());
  const [animationStarted, setAnimationStarted] = useState(false);

  // Scroll milestones
  const milestones = {
    showGrid: 0,
    showInputColumn: 8,
    showExtractColumns: 18,
    showCrossRefColumns: 38,
    showReasoningColumn: 55,
    showActionColumn: 68,
    showRows: 78,
    startCellFill: 88,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollStart = rect.top;
      const scrollEnd = rect.bottom - viewportHeight;
      const totalScrollDistance = containerHeight - viewportHeight;

      if (scrollStart <= 0 && scrollEnd >= 0) {
        setIsSticky(true);
        const progress = Math.min(100, Math.max(0, (-scrollStart / totalScrollDistance) * 100));
        setScrollProgress(progress);
      } else if (scrollStart > 0) {
        setIsSticky(false);
        setScrollProgress(0);
      } else {
        setIsSticky(false);
        setScrollProgress(100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger cell filling animation
  useEffect(() => {
    if (scrollProgress >= milestones.startCellFill && !animationStarted) {
      setAnimationStarted(true);
      runCellFillAnimation();
    }
  }, [scrollProgress, animationStarted]);

  const runCellFillAnimation = async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
      // Fill columns 1-6 (skip file column which is always visible)
      const colOrder = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);

      for (const colIdx of colOrder) {
        await delay(randomDelay(60, 140));
        setFilledCells(prev => new Set([...prev, `${rowIdx}-${colIdx}`]));
      }
      await delay(randomDelay(80, 160));
    }
  };

  // Calculate visible columns based on scroll
  const getVisibleColumns = () => {
    if (scrollProgress < milestones.showInputColumn) return 0;
    if (scrollProgress < milestones.showExtractColumns) return 1;
    if (scrollProgress < milestones.showCrossRefColumns) {
      const progress = (scrollProgress - milestones.showExtractColumns) / (milestones.showCrossRefColumns - milestones.showExtractColumns);
      return 1 + Math.min(2, Math.floor(progress * 2) + 1);
    }
    if (scrollProgress < milestones.showReasoningColumn) {
      const progress = (scrollProgress - milestones.showCrossRefColumns) / (milestones.showReasoningColumn - milestones.showCrossRefColumns);
      return 3 + Math.min(2, Math.floor(progress * 2) + 1);
    }
    if (scrollProgress < milestones.showActionColumn) return 6;
    return columns.length;
  };

  const getVisibleRows = () => {
    if (scrollProgress < milestones.showRows) return 0;
    const rowProgress = (scrollProgress - milestones.showRows) / (milestones.startCellFill - milestones.showRows);
    return Math.min(rows.length, Math.floor(rowProgress * rows.length) + 1);
  };

  const visibleColumns = getVisibleColumns();
  const visibleRows = getVisibleRows();

  const renderCellContent = (row: typeof rows[0], colIdx: number, rowIdx: number) => {
    const col = columns[colIdx];
    const cellKey = `${rowIdx}-${colIdx}`;
    const isFilled = filledCells.has(cellKey);

    // File column always shows
    if (colIdx === 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-foreground">{row.file}</span>
        </div>
      );
    }

    // Show skeleton if not filled yet
    if (!isFilled && scrollProgress >= milestones.startCellFill) {
      return (
        <div className={`h-4 ${colIdx === 5 ? 'w-full' : 'w-20'} bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded`} />
      );
    }

    if (!isFilled) {
      return <span className="text-gray-300">—</span>;
    }

    // Render based on column type
    switch (col.id) {
      case "vendor":
        return <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-foreground font-medium">{row.vendor}</motion.span>;

      case "amount":
        return <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono font-semibold text-foreground">{row.amount}</motion.span>;

      case "poMatch":
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
            {row.poMatch.status === "matched" ? (
              <span className="text-green-600 font-mono text-sm">{row.poMatch.value}</span>
            ) : (
              <span className="text-red-600 text-sm">{row.poMatch.value}</span>
            )}
          </motion.div>
        );

      case "variance":
        const varianceColor = row.variance.status === "ok" ? "text-green-600" : row.variance.status === "warning" ? "text-amber-600" : "text-red-600";
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-mono text-sm ${varianceColor}`}>
            {row.variance.value} {row.variance.percent && <span className="text-xs">({row.variance.percent})</span>}
          </motion.div>
        );

      case "assessment":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground leading-relaxed max-w-[280px]"
          >
            {row.assessment}
          </motion.div>
        );

      case "action":
        const actionStyles = {
          approve: "bg-green-50 text-green-700 border-green-200",
          review: "bg-amber-50 text-amber-700 border-amber-200",
          reject: "bg-red-50 text-red-700 border-red-200",
        };
        const actionIcons = {
          approve: <CheckCircle className="w-3 h-3" />,
          review: <AlertTriangle className="w-3 h-3" />,
          reject: <XCircle className="w-3 h-3" />,
        };
        return (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${actionStyles[row.action.status as keyof typeof actionStyles]}`}
          >
            {actionIcons[row.action.status as keyof typeof actionIcons]}
            {row.action.label}
          </motion.span>
        );

      default:
        return null;
    }
  };

  // Get current stage for description
  const getCurrentStage = () => {
    if (scrollProgress < milestones.showInputColumn) return { stage: "start", title: "Start by adding fields", desc: "Tell the agent what to extract and what to do" };
    if (scrollProgress < milestones.showExtractColumns) return { stage: "input", title: "Define your inputs", desc: "Upload invoices, contracts, or any documents" };
    if (scrollProgress < milestones.showCrossRefColumns) return { stage: "extract", title: "Extract key data", desc: "Pull vendor names, amounts, dates automatically" };
    if (scrollProgress < milestones.showReasoningColumn) return { stage: "crossref", title: "Cross-reference internal data", desc: "Compare against POs, vendor lists, contracts" };
    if (scrollProgress < milestones.showActionColumn) return { stage: "reason", title: "AI reasons over the data", desc: "Flags issues, explains variances, applies your rules" };
    if (scrollProgress < milestones.showRows) return { stage: "action", title: "Recommend actions", desc: "Auto-approve, route for review, or reject with reasoning" };
    return { stage: "process", title: "Process at scale", desc: "Your SME logic, applied consistently across thousands of documents" };
  };

  const currentStage = getCurrentStage();

  // Check if animation is complete (scrolled past the section)
  const isComplete = scrollProgress >= 100 || (animationStarted && filledCells.size >= rows.length * 6);

  return (
    <section id="how-it-works" className="relative bg-muted" ref={containerRef} style={{ height: "350vh" }}>
      <div className={`${isSticky ? "sticky top-0" : isComplete ? "absolute bottom-0 left-0 right-0" : ""} h-screen flex flex-col justify-center py-16`}>
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-8">
            <motion.h2
              key={currentStage.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              {currentStage.title}
            </motion.h2>
            <motion.p
              key={currentStage.desc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {currentStage.desc}
            </motion.p>
          </div>

          {/* Column type legend */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {["input", "extract", "cross-reference", "reasoning", "action"].map((type) => {
              const isActive = columns.slice(0, visibleColumns).some(c => c.type === type);
              return (
                <div
                  key={type}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive ? `${typeColors[type]} text-white` : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-gray-400"}`} />
                  {typeLabels[type]}
                </div>
              );
            })}
          </div>

          {/* Spreadsheet */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-sm font-medium text-foreground">Invoice Processing Agent</span>
                </div>
                {visibleRows > 0 && (
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-primary/10 text-primary rounded">
                    {visibleRows} files loaded
                  </span>
                )}
              </div>

              {/* Grid */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {columns.slice(0, visibleColumns).map((col, idx) => (
                        <motion.th
                          key={col.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.03 }}
                          className="px-4 py-3 text-left text-sm font-medium text-foreground whitespace-nowrap"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${typeColors[col.type]}`} />
                            {col.label}
                          </div>
                        </motion.th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, visibleRows).map((row, rowIdx) => (
                      <motion.tr
                        key={rowIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: rowIdx * 0.04 }}
                        className="border-b border-gray-50 last:border-0"
                      >
                        {columns.slice(0, visibleColumns).map((col, colIdx) => (
                          <td key={col.id} className="px-4 py-3 text-sm align-top">
                            {renderCellContent(row, colIdx, rowIdx)}
                          </td>
                        ))}
                      </motion.tr>
                    ))}

                    {/* Empty state */}
                    {visibleRows === 0 && visibleColumns > 0 && (
                      <tr>
                        <td colSpan={visibleColumns} className="px-4 py-16 text-center">
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <FileText className="w-10 h-10 text-gray-300" />
                            <span className="font-medium">Drop files to process</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Empty grid state */}
                {visibleColumns === 0 && (
                  <div className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Brain className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-lg font-medium text-foreground">Start by adding fields</span>
                      <span className="text-sm">Tell the agent what to extract and what to do</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
