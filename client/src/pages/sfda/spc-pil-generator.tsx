import SfdaToolPage from "@/components/sfda/SfdaToolPage";
import { getSfdaTool } from "@/lib/sfda/tools";

export default function SfdaSpcPilGeneratorPage() {
  const tool = getSfdaTool("spc-pil-generator")!;
  return <SfdaToolPage tool={tool} />;
}
