import { useParams } from "wouter";
import { DOC_TYPE_REGISTRY } from "../data/document-types";
import ParsliDocumentTypePage from "../templates/ParsliDocumentTypePage";
import NotFound from "@/pages/not-found";

export default function ParsliDocTypeRouter() {
  const { slug } = useParams<{ slug: string }>();
  const data = DOC_TYPE_REGISTRY[slug || ""];

  if (!data) return <NotFound />;
  return <ParsliDocumentTypePage data={data} />;
}
