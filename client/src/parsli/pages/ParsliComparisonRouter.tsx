import { useParams } from "wouter";
import { COMPARISON_REGISTRY } from "../data/comparisons";
import ParsliComparisonPage from "../templates/ParsliComparisonPage";
import NotFound from "@/pages/not-found";

export default function ParsliComparisonRouter() {
  const { slug } = useParams<{ slug: string }>();
  const data = COMPARISON_REGISTRY[slug || ""];

  if (!data) return <NotFound />;
  return <ParsliComparisonPage data={data} />;
}
