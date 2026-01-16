import { Switch, Route } from "wouter";
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

function Router() {
  return (
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
      <Route component={NotFound} />
    </Switch>
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
