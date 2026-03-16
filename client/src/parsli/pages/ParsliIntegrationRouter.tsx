import { useParams } from "wouter";
import { INTEGRATION_REGISTRY } from "../data/integrations";
import ParsliIntegrationPage from "../templates/ParsliIntegrationPage";
import NotFound from "@/pages/not-found";

export default function ParsliIntegrationRouter() {
  const { slug } = useParams<{ slug: string }>();
  const data = INTEGRATION_REGISTRY[slug || ""];

  if (!data) return <NotFound />;
  return <ParsliIntegrationPage data={data} />;
}
