import { useEffect, useState, useCallback, useRef } from 'react';

type DemoType = 'invoice' | 'contract' | 'banking' | 'kyc' | 'medical';

interface DemoConfig {
  icon: string;
  title: string;
  subtitle: string;
  headers: string[];
  data: Record<string, any>[];
  processingText: string;
  completeText: string;
}

const demoConfigs: Record<DemoType, DemoConfig> = {
  invoice: {
    icon: '📄',
    title: 'Invoice Extraction & Validation',
    subtitle: 'Automatically extract vendor details, amounts, and validate against purchase orders',
    headers: ['Invoice File', 'Vendor', 'Invoice #', 'Date', 'Amount', 'PO Match', 'Status'],
    processingText: 'Processing 6 invoices...',
    completeText: 'Processed 6 invoices — 4 validated, 2 require review',
    data: [
      { file: 'INV-2024-0847.pdf', size: '245 KB', vendor: 'Acme Corp', invoiceNo: 'INV-847293', date: '2024-01-15', amount: '$12,450.00', poMatch: { value: 'PO-2024-112', color: 'green' }, status: { text: 'Validated', type: 'success' } },
      { file: 'supplier_invoice_jan.pdf', size: '180 KB', vendor: 'TechSupply Inc', invoiceNo: 'TS-20240156', date: '2024-01-18', amount: '$8,920.50', poMatch: { value: 'PO-2024-098', color: 'green' }, status: { text: 'Validated', type: 'success' } },
      { file: 'vendor_bill_003.pdf', size: '312 KB', vendor: 'Global Materials', invoiceNo: 'GM-2024-003', date: '2024-01-20', amount: '$45,200.00', poMatch: { value: 'Mismatch', color: 'yellow' }, status: { text: 'Review Required', type: 'warning' } },
      { file: 'services_q1.pdf', size: '156 KB', vendor: 'CloudServ Pro', invoiceNo: 'CSP-1847', date: '2024-01-22', amount: '$3,299.00', poMatch: { value: 'PO-2024-145', color: 'green' }, status: { text: 'Validated', type: 'success' } },
      { file: 'equipment_lease.pdf', size: '428 KB', vendor: 'EquipLease Ltd', invoiceNo: 'EL-2024-0089', date: '2024-01-25', amount: '$18,750.00', poMatch: { value: 'Not Found', color: 'red' }, status: { text: 'No PO Found', type: 'error' } },
      { file: 'maintenance_feb.pdf', size: '198 KB', vendor: 'FacilityPro', invoiceNo: 'FP-28471', date: '2024-01-28', amount: '$5,600.00', poMatch: { value: 'PO-2024-167', color: 'green' }, status: { text: 'Validated', type: 'success' } },
    ],
  },
  contract: {
    icon: '📋',
    title: 'Contract Clause Extraction & Review',
    subtitle: 'Extract key clauses, identify risks, and compare against templates',
    headers: ['Contract', 'Counterparty', 'Type', 'Term', 'Key Clauses', 'Risk Level'],
    processingText: 'Analyzing 5 contracts...',
    completeText: 'Analyzed 5 contracts — 1 high risk flagged for review',
    data: [
      { file: 'MSA_TechVentures_2024.docx', size: '1.2 MB', party: 'TechVentures Inc', type: 'Master Service Agreement', term: '36 months', clauses: ['liability', 'indemnity', 'term'], risk: { level: 'medium', pct: 45 } },
      { file: 'NDA_Confidential.pdf', size: '320 KB', party: 'Innovate Labs', type: 'Non-Disclosure Agreement', term: '24 months', clauses: ['confidentiality', 'term'], risk: { level: 'low', pct: 15 } },
      { file: 'vendor_agreement_v2.docx', size: '890 KB', party: 'SupplyChain Corp', type: 'Vendor Agreement', term: '12 months', clauses: ['payment', 'liability', 'indemnity'], risk: { level: 'high', pct: 78 } },
      { file: 'license_software.pdf', size: '456 KB', party: 'SoftwareCo', type: 'Software License', term: '12 months', clauses: ['payment', 'term'], risk: { level: 'low', pct: 22 } },
      { file: 'consulting_engagement.docx', size: '678 KB', party: 'ConsultPro', type: 'Consulting Agreement', term: '6 months', clauses: ['confidentiality', 'indemnity', 'payment'], risk: { level: 'medium', pct: 52 } },
    ],
  },
  banking: {
    icon: '🏦',
    title: 'Bank Statement Reconciliation',
    subtitle: 'Match transactions, identify discrepancies, flag anomalies',
    headers: ['Files', 'Account', 'Period', 'Transactions', 'Matched', 'Discrepancies', 'Status'],
    processingText: 'Reconciling 5 statements...',
    completeText: 'Reconciled 5 statements — 1,707 transactions matched',
    data: [
      { files: ['statement_jan.pdf', 'ledger_jan.xlsx'], account: '****4829', period: 'Jan 2024', transactions: 247, matched: 245, discrepancies: '$1,240.00', status: { text: 'Minor Issues', type: 'warning' } },
      { files: ['chase_feb.pdf', 'gl_feb.xlsx'], account: '****7721', period: 'Feb 2024', transactions: 312, matched: 312, discrepancies: '$0.00', status: { text: 'Reconciled', type: 'success' } },
      { files: ['boa_march.pdf', 'accounting_mar.xlsx'], account: '****3356', period: 'Mar 2024', transactions: 189, matched: 186, discrepancies: '$8,450.00', status: { text: 'Discrepancies', type: 'error' } },
      { files: ['wells_q1.pdf', 'books_q1.xlsx'], account: '****9012', period: 'Q1 2024', transactions: 756, matched: 754, discrepancies: '$320.00', status: { text: 'Reconciled', type: 'success' } },
      { files: ['citi_april.pdf', 'erp_apr.xlsx'], account: '****5567', period: 'Apr 2024', transactions: 203, matched: 203, discrepancies: '$0.00', status: { text: 'Reconciled', type: 'success' } },
    ],
  },
  kyc: {
    icon: '🪪',
    title: 'KYC Document Verification',
    subtitle: 'Extract identity details, verify documents, check compliance',
    headers: ['Documents', 'Full Name', 'ID Number', 'DOB', 'Address Match', 'Verification'],
    processingText: 'Verifying 5 applications...',
    completeText: 'Verified 5 applications — 3 passed, 1 review, 1 failed',
    data: [
      { files: ['passport_scan.jpg', 'utility_bill.pdf'], name: 'John Anderson', idNo: 'P847291056', dob: '1985-03-22', addressMatch: { value: 'Exact Match', color: 'green' }, status: { text: 'Verified', type: 'success' } },
      { files: ['drivers_license.jpg', 'bank_statement.pdf'], name: 'Sarah Mitchell', idNo: 'D192847563', dob: '1990-07-14', addressMatch: { value: 'Exact Match', color: 'green' }, status: { text: 'Verified', type: 'success' } },
      { files: ['national_id.jpg', 'tax_return.pdf'], name: 'Michael Chen', idNo: 'N928374651', dob: '1978-11-30', addressMatch: { value: 'Partial Match', color: 'yellow' }, status: { text: 'Manual Review', type: 'warning' } },
      { files: ['passport_uk.jpg', 'lease_agreement.pdf'], name: 'Emma Williams', idNo: 'P562839471', dob: '1992-05-08', addressMatch: { value: 'Exact Match', color: 'green' }, status: { text: 'Verified', type: 'success' } },
      { files: ['id_card.jpg', 'phone_bill.pdf'], name: 'David Kumar', idNo: 'I748293615', dob: '1988-09-17', addressMatch: { value: 'Not Found', color: 'red' }, status: { text: 'Failed', type: 'error' } },
    ],
  },
  medical: {
    icon: '🏥',
    title: 'Medical Records Processing',
    subtitle: 'Extract patient data, diagnoses, medications, and coding',
    headers: ['Record File', 'Patient ID', 'Diagnosis', 'ICD-10 Code', 'Medications', 'Review Status'],
    processingText: 'Processing 5 records...',
    completeText: 'Processed 5 records — 4 coded, 1 needs review',
    data: [
      { file: 'patient_record_8471.pdf', size: '1.8 MB', patientId: 'PT-847192', diagnosis: 'Type 2 Diabetes Mellitus', icd10: 'E11.9', medications: ['Metformin', 'Lisinopril'], status: { text: 'Coded', type: 'success' } },
      { file: 'discharge_summary.pdf', size: '2.1 MB', patientId: 'PT-293847', diagnosis: 'Acute Myocardial Infarction', icd10: 'I21.9', medications: ['Aspirin', 'Clopidogrel', 'Atorvastatin'], status: { text: 'Coded', type: 'success' } },
      { file: 'clinical_notes_feb.pdf', size: '890 KB', patientId: 'PT-182736', diagnosis: 'Major Depressive Disorder', icd10: 'F32.1', medications: ['Sertraline'], status: { text: 'Review Needed', type: 'warning' } },
      { file: 'lab_results_0234.pdf', size: '456 KB', patientId: 'PT-564738', diagnosis: 'Hypothyroidism', icd10: 'E03.9', medications: ['Levothyroxine'], status: { text: 'Coded', type: 'success' } },
      { file: 'imaging_report.pdf', size: '3.2 MB', patientId: 'PT-928374', diagnosis: 'Lumbar Disc Herniation', icd10: 'M51.16', medications: ['Ibuprofen', 'Cyclobenzaprine'], status: { text: 'Coded', type: 'success' } },
    ],
  },
};

const demoOrder: DemoType[] = ['invoice', 'contract', 'banking', 'kyc', 'medical'];

// Light theme status styles
const statusStyles = {
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
};

// Light theme clause styles
const clauseStyles: Record<string, string> = {
  liability: 'bg-red-50 text-red-600 border-red-200',
  indemnity: 'bg-amber-50 text-amber-600 border-amber-200',
  term: 'bg-green-50 text-green-600 border-green-200',
  payment: 'bg-primary/10 text-primary border-primary/20',
  confidentiality: 'bg-indigo-50 text-indigo-600 border-indigo-200',
};

interface AutomationDemoProps {
  autoRotate?: boolean;
  rotateInterval?: number; // ms after animation completes before switching
  showSelector?: boolean;
}

export default function AutomationDemo({
  autoRotate = true,
  rotateInterval = 3000,
  showSelector = false,
}: AutomationDemoProps) {
  const [currentDemo, setCurrentDemo] = useState<DemoType>('invoice');
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [cellData, setCellData] = useState<Record<string, Record<number, boolean>>>({});
  const [isProcessing, setIsProcessing] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = demoConfigs[currentDemo];

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const runAnimation = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVisibleRows([]);
    setCellData({});
    setIsProcessing(true);

    // Show rows one by one
    for (let i = 0; i < config.data.length; i++) {
      if (!animationRef.current) return;
      await delay(80);
      setVisibleRows(prev => [...prev, i]);
    }

    await delay(400);

    // Fill in cells with random order per row
    for (let rowIdx = 0; rowIdx < config.data.length; rowIdx++) {
      if (!animationRef.current) return;
      const cellOrder = Array.from({ length: config.headers.length - 1 }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);

      for (const cellIdx of cellOrder) {
        if (!animationRef.current) return;
        await delay(randomDelay(100, 220));
        setCellData(prev => ({
          ...prev,
          [`${rowIdx}-${cellIdx}`]: { [cellIdx]: true },
        }));
      }
      await delay(randomDelay(120, 250));
    }

    setIsProcessing(false);
    setIsAnimating(false);
  }, [config.data.length, config.headers.length, isAnimating]);

  // Auto-rotate to next demo after animation completes
  useEffect(() => {
    if (!autoRotate || isProcessing || isAnimating) return;

    timeoutRef.current = setTimeout(() => {
      const currentIndex = demoOrder.indexOf(currentDemo);
      const nextIndex = (currentIndex + 1) % demoOrder.length;
      setCurrentDemo(demoOrder[nextIndex]);
    }, rotateInterval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoRotate, isProcessing, isAnimating, currentDemo, rotateInterval]);

  // Run animation when demo changes
  useEffect(() => {
    animationRef.current = true;
    runAnimation();

    return () => {
      animationRef.current = false;
    };
  }, [currentDemo]);

  const isCellVisible = (rowIdx: number, cellIdx: number) => {
    return cellData[`${rowIdx}-${cellIdx}`]?.[cellIdx] ?? false;
  };

  const renderCellContent = (row: Record<string, any>, cellIdx: number) => {
    const visible = isCellVisible(config.data.indexOf(row), cellIdx);

    if (!visible) {
      return (
        <div className="h-[18px] w-[70px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded" />
      );
    }

    if (currentDemo === 'invoice') {
      switch (cellIdx) {
        case 1: return <span className="transition-all duration-300 text-foreground">{row.vendor}</span>;
        case 2: return <span className="font-mono text-primary">{row.invoiceNo}</span>;
        case 3: return <span className="text-muted-foreground">{row.date}</span>;
        case 4: return <span className="font-mono font-medium text-foreground">{row.amount}</span>;
        case 5: return <span className={row.poMatch.color === 'green' ? 'text-green-600' : row.poMatch.color === 'yellow' ? 'text-amber-600' : 'text-red-600'}>{row.poMatch.value}</span>;
        case 6: return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[row.status.type as keyof typeof statusStyles]}`}>{row.status.text}</span>;
      }
    }

    if (currentDemo === 'contract') {
      switch (cellIdx) {
        case 1: return <span className="text-foreground">{row.party}</span>;
        case 2: return <span className="text-muted-foreground">{row.type}</span>;
        case 3: return <span className="text-foreground">{row.term}</span>;
        case 4: return (
          <div className="flex flex-wrap gap-1">
            {row.clauses.map((c: string) => (
              <span key={c} className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${clauseStyles[c] || 'bg-primary/10 text-primary border-primary/20'}`}>{c}</span>
            ))}
          </div>
        );
        case 5: return (
          <div className="flex items-center gap-2">
            <div className="w-[50px] h-1.5 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full rounded ${row.risk.level === 'low' ? 'bg-green-500' : row.risk.level === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${row.risk.pct}%` }}
              />
            </div>
            <span className={`text-xs capitalize font-medium ${row.risk.level === 'low' ? 'text-green-600' : row.risk.level === 'medium' ? 'text-amber-600' : 'text-red-600'}`}>
              {row.risk.level}
            </span>
          </div>
        );
      }
    }

    if (currentDemo === 'banking') {
      switch (cellIdx) {
        case 1: return <span className="font-mono text-primary">{row.account}</span>;
        case 2: return <span className="text-foreground">{row.period}</span>;
        case 3: return <span className="text-muted-foreground">{row.transactions}</span>;
        case 4: return <span className="text-green-600 font-medium">{row.matched}/{row.transactions}</span>;
        case 5: return <span className={`font-mono font-medium ${row.discrepancies === '$0.00' ? 'text-green-600' : parseFloat(row.discrepancies.replace(/[$,]/g, '')) > 5000 ? 'text-red-600' : 'text-amber-600'}`}>{row.discrepancies}</span>;
        case 6: return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[row.status.type as keyof typeof statusStyles]}`}>{row.status.text}</span>;
      }
    }

    if (currentDemo === 'kyc') {
      switch (cellIdx) {
        case 1: return <span className="font-medium text-foreground">{row.name}</span>;
        case 2: return <span className="font-mono text-primary">{row.idNo}</span>;
        case 3: return <span className="text-muted-foreground">{row.dob}</span>;
        case 4: return <span className={row.addressMatch.color === 'green' ? 'text-green-600' : row.addressMatch.color === 'yellow' ? 'text-amber-600' : 'text-red-600'}>{row.addressMatch.value}</span>;
        case 5: return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[row.status.type as keyof typeof statusStyles]}`}>{row.status.text}</span>;
      }
    }

    if (currentDemo === 'medical') {
      switch (cellIdx) {
        case 1: return <span className="font-mono text-primary">{row.patientId}</span>;
        case 2: return <span className="text-foreground">{row.diagnosis}</span>;
        case 3: return <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{row.icd10}</span>;
        case 4: return (
          <div className="flex flex-wrap gap-1">
            {row.medications.map((m: string) => (
              <span key={m} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">{m}</span>
            ))}
          </div>
        );
        case 5: return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[row.status.type as keyof typeof statusStyles]}`}>{row.status.text}</span>;
      }
    }

    return null;
  };

  const renderFileCell = (row: Record<string, any>) => {
    if ('files' in row && Array.isArray(row.files)) {
      return (
        <div className="flex gap-1.5 flex-wrap">
          {row.files.map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded text-[11px] text-foreground">
              <span>{f.endsWith('.pdf') || f.endsWith('.xlsx') ? '📄' : '🪪'}</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md flex items-center justify-center text-base bg-primary/10">
          {config.icon}
        </div>
        <div>
          <div className="font-medium text-foreground text-[13px]">{row.file}</div>
          <div className="text-xs text-muted-foreground">{row.size}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Demo selector tabs (optional) */}
      {showSelector && (
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {demoOrder.map((demo) => (
            <button
              key={demo}
              onClick={() => setCurrentDemo(demo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                currentDemo === demo
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              {demoConfigs[demo].icon} {demo.charAt(0).toUpperCase() + demo.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Demo card */}
      <div className="bg-white rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] bg-primary/10">
            {config.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{config.title}</h3>
            <p className="text-sm text-muted-foreground">{config.subtitle}</p>
          </div>
        </div>

        {/* Processing indicator */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-[13px] ${isProcessing ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-green-50 border border-green-200 text-green-700'}`}>
          {isProcessing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 rounded-full animate-spin border-primary/30 border-t-primary" />
              <span>{config.processingText}</span>
            </>
          ) : (
            <>
              <span className="text-green-600">✓</span>
              <span>{config.completeText}</span>
            </>
          )}
        </div>

        {/* Data table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {config.headers.map((header, i) => (
                  <th key={i} className="px-2 py-2.5 text-left text-sm font-medium text-foreground border-b border-border whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {config.data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`transition-all duration-400 border-b border-border last:border-0 hover:bg-gray-50 ${
                    visibleRows.includes(rowIdx) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                >
                  <td className="px-2 py-2 text-sm">
                    {renderFileCell(row)}
                  </td>
                  {config.headers.slice(1).map((_, cellIdx) => (
                    <td key={cellIdx} className="px-2 py-2 text-sm">
                      {renderCellContent(row, cellIdx + 1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {demoOrder.map((demo) => (
            <button
              key={demo}
              onClick={() => setCurrentDemo(demo)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentDemo === demo
                  ? 'bg-primary w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={demoConfigs[demo].title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
