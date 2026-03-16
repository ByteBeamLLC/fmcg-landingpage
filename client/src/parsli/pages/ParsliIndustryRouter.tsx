import { useParams } from "wouter";
import { INDUSTRY_REGISTRY } from "../data/industries";
import ParsliIndustryPage from "../templates/ParsliIndustryPage";
import NotFound from "@/pages/not-found";

export default function ParsliIndustryRouter() {
  const { slug } = useParams<{ slug: string }>();
  const data = INDUSTRY_REGISTRY[slug || ""];

  if (!data) return <NotFound />;
  return <ParsliIndustryPage data={data} />;
}
