import SfdaToolPage from "@/components/sfda/SfdaToolPage";
import { getSfdaTool } from "@/lib/sfda/tools";

export default function SfdaArabicTranslatorPage() {
  const tool = getSfdaTool("spc-pil-arabic-translator")!;
  return <SfdaToolPage tool={tool} />;
}
