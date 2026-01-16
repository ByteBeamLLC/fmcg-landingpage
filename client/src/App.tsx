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
