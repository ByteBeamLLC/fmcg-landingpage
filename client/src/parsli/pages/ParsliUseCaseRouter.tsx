import { useParams } from "wouter";
import { USE_CASE_REGISTRY } from "../data/use-cases";
import ParsliUseCasePage from "../templates/ParsliUseCasePage";
import NotFound from "@/pages/not-found";

export default function ParsliUseCaseRouter() {
  const { slug } = useParams<{ slug: string }>();
  const data = USE_CASE_REGISTRY[slug || ""];

  if (!data) return <NotFound />;
  return <ParsliUseCasePage data={data} />;
}
