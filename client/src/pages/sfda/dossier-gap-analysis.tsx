import SfdaToolPage from "@/components/sfda/SfdaToolPage";
import { getSfdaTool } from "@/lib/sfda/tools";

export default function SfdaDossierGapAnalysisPage() {
  const tool = getSfdaTool("dossier-gap-analysis")!;
  return <SfdaToolPage tool={tool} />;
}
