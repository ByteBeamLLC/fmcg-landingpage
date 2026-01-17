import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/components/theme-provider";
import Home from "@/pages/home";
import Platform from "@/pages/platform";
import About from "@/pages/about";
import CaseStudy from "@/pages/case-study";
import NotFound from "@/pages/not-found";
import FMCGIndustry from "@/pages/industries/fmcg";
import PharmaIndustry from "@/pages/industries/pharma";
import FinanceIndustry from "@/pages/industries/finance";
import LegalIndustry from "@/pages/industries/legal";
import InsuranceIndustry from "@/pages/industries/insurance";
import OperationsIndustry from "@/pages/industries/operations";
import UAEFoodLabelLocalization from "@/pages/solutions/uae-food-label-localization";
import SaudiPharmaGapAnalysis from "@/pages/solutions/saudi-pharma-gap-analysis";

// Tools pages - lazy loaded for better performance
const ToolsDirectory = lazy(() => import("@/pages/tools/index"));
const ImageToText = lazy(() => import("@/pages/tools/image-to-text"));
const PDFMerger = lazy(() => import("@/pages/tools/pdf-merger"));
const PDFCompressor = lazy(() => import("@/pages/tools/pdf-compressor"));
const PDFSplitter = lazy(() => import("@/pages/tools/pdf-splitter"));
const PDFToText = lazy(() => import("@/pages/tools/pdf-to-text"));
const ImageToPDF = lazy(() => import("@/pages/tools/image-to-pdf"));
const ImageCompressor = lazy(() => import("@/pages/tools/image-compressor"));
const ScreenshotToText = lazy(() => import("@/pages/tools/screenshot-to-text"));
const PhotoToText = lazy(() => import("@/pages/tools/photo-to-text"));
const HandwritingToText = lazy(() => import("@/pages/tools/handwriting-to-text"));
const PDFRotate = lazy(() => import("@/pages/tools/pdf-rotate"));
const PDFPageRemover = lazy(() => import("@/pages/tools/pdf-page-remover"));
const ImageResizer = lazy(() => import("@/pages/tools/image-resizer"));
const ImageConverter = lazy(() => import("@/pages/tools/image-converter"));
const HeicToJpg = lazy(() => import("@/pages/tools/heic-to-jpg"));
const WebpConverter = lazy(() => import("@/pages/tools/webp-converter"));
const CsvToExcel = lazy(() => import("@/pages/tools/csv-to-excel"));
const ExcelToCsv = lazy(() => import("@/pages/tools/excel-to-csv"));
const JsonToExcel = lazy(() => import("@/pages/tools/json-to-excel"));
const ExcelToJson = lazy(() => import("@/pages/tools/excel-to-json"));
const QRCodeGenerator = lazy(() => import("@/pages/tools/qr-code-generator"));
const QRCodeReader = lazy(() => import("@/pages/tools/qr-code-reader"));

// AI-Powered Document Tools - Tier 1
const InvoiceParser = lazy(() => import("@/pages/tools/invoice-parser"));
const ReceiptScanner = lazy(() => import("@/pages/tools/receipt-scanner"));
const ResumeParser = lazy(() => import("@/pages/tools/resume-parser"));
const PDFChat = lazy(() => import("@/pages/tools/pdf-chat"));
const AISummarizer = lazy(() => import("@/pages/tools/ai-summarizer"));
const ContractAnalyzer = lazy(() => import("@/pages/tools/contract-analyzer"));

// AI-Powered Document Tools - Tier 2
const BankStatementParser = lazy(() => import("@/pages/tools/bank-statement-parser"));
const PolicyAnalyzer = lazy(() => import("@/pages/tools/policy-analyzer"));
const ContractClauseFinder = lazy(() => import("@/pages/tools/contract-clause-finder"));
const LegalSummarizer = lazy(() => import("@/pages/tools/legal-summarizer"));

// Document Generators - Tier 3
const NDAGenerator = lazy(() => import("@/pages/tools/nda-generator"));
const LeaseGenerator = lazy(() => import("@/pages/tools/lease-generator"));
const W2Generator = lazy(() => import("@/pages/tools/w2-generator"));
const Form1099Generator = lazy(() => import("@/pages/tools/1099-generator"));

// Client-Side Extraction Tools - Tier 4
const PDFTableExtractor = lazy(() => import("@/pages/tools/pdf-table-extractor"));
const PDFRedactor = lazy(() => import("@/pages/tools/pdf-redactor"));

// Advanced AI Comparison Tools - Tier 5
const ContractCompare = lazy(() => import("@/pages/tools/contract-compare"));
const DocumentCompare = lazy(() => import("@/pages/tools/document-compare"));

// Search Tools
const FileSearch = lazy(() => import("@/pages/tools/file-search"));

// Blog pages - lazy loaded for better performance
const BlogIndex = lazy(() => import("@/pages/blog/index"));
const UAEFoodLabelingBlog = lazy(() => import("@/pages/blog/uae-food-labeling-requirements-2026"));
const SFDADrugRegistrationBlog = lazy(() => import("@/pages/blog/sfda-drug-registration-guide-saudi-arabia"));
const MontajiPortalBlog = lazy(() => import("@/pages/blog/dubai-municipality-montaji-food-registration"));
const GCCDocumentComplianceBlog = lazy(() => import("@/pages/blog/gcc-document-compliance-automation-2026"));
const NoCodeDocumentAutomationBlog = lazy(() => import("@/pages/blog/no-code-document-automation-regulatory-teams-2026"));
const IDPBusinessGuideBlog = lazy(() => import("@/pages/blog/intelligent-document-processing-business-guide-2026"));
const InvoiceProcessingBlog = lazy(() => import("@/pages/blog/automating-invoice-processing-2026"));

// Loading component for lazy-loaded routes
function ToolsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<ToolsLoading />}>
      <Switch>
        <Route path="/" component={Platform} />
        <Route path="/fmcg-label-compliance" component={FMCGIndustry} />
        <Route path="/about" component={About} />
        <Route path="/case-study/:id" component={CaseStudy} />
        <Route path="/industries/fmcg" component={FMCGIndustry} />
        <Route path="/industries/pharma" component={PharmaIndustry} />
        <Route path="/industries/finance" component={FinanceIndustry} />
        <Route path="/industries/legal" component={LegalIndustry} />
        <Route path="/industries/insurance" component={InsuranceIndustry} />
        <Route path="/industries/operations" component={OperationsIndustry} />
        <Route path="/solutions/uae-food-label-localization" component={UAEFoodLabelLocalization} />
        <Route path="/uae-food-label-localization" component={UAEFoodLabelLocalization} />
        <Route path="/food-label-localization-uae" component={UAEFoodLabelLocalization} />
        <Route path="/dubai-food-label-compliance" component={UAEFoodLabelLocalization} />
        <Route path="/solutions/saudi-pharma-gap-analysis" component={SaudiPharmaGapAnalysis} />
        <Route path="/sfda-dossier-gap-analysis" component={SaudiPharmaGapAnalysis} />
        <Route path="/saudi-pharma-registration" component={SaudiPharmaGapAnalysis} />
        <Route path="/sfda-drug-registration" component={SaudiPharmaGapAnalysis} />

        {/* Tools Routes */}
        <Route path="/tools" component={ToolsDirectory} />
        <Route path="/tools/image-to-text" component={ImageToText} />
        <Route path="/tools/pdf-merger" component={PDFMerger} />
        <Route path="/tools/pdf-compressor" component={PDFCompressor} />
        <Route path="/tools/pdf-splitter" component={PDFSplitter} />
        <Route path="/tools/pdf-to-text" component={PDFToText} />
        <Route path="/tools/image-to-pdf" component={ImageToPDF} />
        <Route path="/tools/image-compressor" component={ImageCompressor} />
        <Route path="/tools/screenshot-to-text" component={ScreenshotToText} />
        <Route path="/tools/photo-to-text" component={PhotoToText} />
        <Route path="/tools/handwriting-to-text" component={HandwritingToText} />
        <Route path="/tools/pdf-rotate" component={PDFRotate} />
        <Route path="/tools/pdf-page-remover" component={PDFPageRemover} />
        <Route path="/tools/image-resizer" component={ImageResizer} />
        <Route path="/tools/image-converter" component={ImageConverter} />
        <Route path="/tools/heic-to-jpg" component={HeicToJpg} />
        <Route path="/tools/webp-converter" component={WebpConverter} />
        <Route path="/tools/csv-to-excel" component={CsvToExcel} />
        <Route path="/tools/excel-to-csv" component={ExcelToCsv} />
        <Route path="/tools/json-to-excel" component={JsonToExcel} />
        <Route path="/tools/excel-to-json" component={ExcelToJson} />
        <Route path="/tools/qr-code-generator" component={QRCodeGenerator} />
        <Route path="/tools/qr-code-reader" component={QRCodeReader} />

        {/* AI-Powered Document Tools */}
        <Route path="/tools/invoice-parser" component={InvoiceParser} />
        <Route path="/tools/receipt-scanner" component={ReceiptScanner} />
        <Route path="/tools/resume-parser" component={ResumeParser} />
        <Route path="/tools/pdf-chat" component={PDFChat} />
        <Route path="/tools/ai-summarizer" component={AISummarizer} />
        <Route path="/tools/contract-analyzer" component={ContractAnalyzer} />
        <Route path="/tools/bank-statement-parser" component={BankStatementParser} />
        <Route path="/tools/policy-analyzer" component={PolicyAnalyzer} />
        <Route path="/tools/contract-clause-finder" component={ContractClauseFinder} />
        <Route path="/tools/legal-summarizer" component={LegalSummarizer} />

        {/* Document Generators */}
        <Route path="/tools/nda-generator" component={NDAGenerator} />
        <Route path="/tools/lease-generator" component={LeaseGenerator} />
        <Route path="/tools/w2-generator" component={W2Generator} />
        <Route path="/tools/1099-generator" component={Form1099Generator} />

        {/* PDF Tools */}
        <Route path="/tools/pdf-table-extractor" component={PDFTableExtractor} />
        <Route path="/tools/pdf-redactor" component={PDFRedactor} />

        {/* Document Comparison */}
        <Route path="/tools/contract-compare" component={ContractCompare} />
        <Route path="/tools/document-compare" component={DocumentCompare} />

        {/* Search Tools */}
        <Route path="/tools/file-search" component={FileSearch} />

        {/* Blog Routes */}
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/uae-food-labeling-requirements-2026" component={UAEFoodLabelingBlog} />
        <Route path="/blog/sfda-drug-registration-guide-saudi-arabia" component={SFDADrugRegistrationBlog} />
        <Route path="/blog/dubai-municipality-montaji-food-registration" component={MontajiPortalBlog} />
        <Route path="/blog/gcc-document-compliance-automation-2026" component={GCCDocumentComplianceBlog} />
        <Route path="/blog/no-code-document-automation-regulatory-teams-2026" component={NoCodeDocumentAutomationBlog} />
        <Route path="/blog/intelligent-document-processing-business-guide-2026" component={IDPBusinessGuideBlog} />
        <Route path="/blog/automating-invoice-processing-2026" component={InvoiceProcessingBlog} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
