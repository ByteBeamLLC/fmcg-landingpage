import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";

// Core pages
import ParsliLanding from "./pages/ParsliLanding";

// Lazy-load secondary pages
const ParsliPricingPage = lazy(() => import("./pages/ParsliPricingPage"));
const ParsliFeaturesPage = lazy(() => import("./pages/ParsliFeaturesPage"));
const ParsliHowItWorksPage = lazy(() => import("./pages/ParsliHowItWorksPage"));
const ParsliEmailParser = lazy(() => import("./pages/ParsliEmailParser"));
const ParsliPDFParser = lazy(() => import("./pages/ParsliPDFParser"));
const ParsliAPIOverview = lazy(() => import("./pages/ParsliAPIOverview"));
const ParsliSecurityPage = lazy(() => import("./pages/ParsliSecurityPage"));

// Dynamic template routers
const ParsliUseCaseRouter = lazy(() => import("./pages/ParsliUseCaseRouter"));
const ParsliIndustryRouter = lazy(() => import("./pages/ParsliIndustryRouter"));
const ParsliIntegrationRouter = lazy(() => import("./pages/ParsliIntegrationRouter"));
const ParsliComparisonRouter = lazy(() => import("./pages/ParsliComparisonRouter"));
const ParsliDocTypeRouter = lazy(() => import("./pages/ParsliDocTypeRouter"));

function ParsliLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-parsli-500" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
}

export default function ParsliApp() {
  return (
    <Suspense fallback={<ParsliLoading />}>
      <Switch>
        {/* Core pages */}
        <Route path="/parsli" component={ParsliLanding} />
        <Route path="/parsli/pricing" component={ParsliPricingPage} />
        <Route path="/parsli/features" component={ParsliFeaturesPage} />
        <Route path="/parsli/how-it-works" component={ParsliHowItWorksPage} />
        <Route path="/parsli/email-parser" component={ParsliEmailParser} />
        <Route path="/parsli/pdf-parser" component={ParsliPDFParser} />
        <Route path="/parsli/api" component={ParsliAPIOverview} />
        <Route path="/parsli/security" component={ParsliSecurityPage} />

        {/* Dynamic template routes */}
        <Route path="/parsli/use-case/:slug" component={ParsliUseCaseRouter} />
        <Route path="/parsli/industry/:slug" component={ParsliIndustryRouter} />
        <Route path="/parsli/integration/:slug" component={ParsliIntegrationRouter} />
        <Route path="/parsli/compare/:slug" component={ParsliComparisonRouter} />
        <Route path="/parsli/document/:slug" component={ParsliDocTypeRouter} />
      </Switch>
    </Suspense>
  );
}
