import type { ComparisonPageData } from "../types";

import { vsParseur } from "./vs-parseur";
import { vsDocparser } from "./vs-docparser";
import { vsMailparser } from "./vs-mailparser";
import { vsNanonets } from "./vs-nanonets";
import { vsRossum } from "./vs-rossum";
import { vsVeryfi } from "./vs-veryfi";

export const COMPARISON_REGISTRY: Record<string, ComparisonPageData> = {
  parseur: vsParseur,
  docparser: vsDocparser,
  mailparser: vsMailparser,
  nanonets: vsNanonets,
  rossum: vsRossum,
  veryfi: vsVeryfi,
};

export const COMPARISON_SLUGS = Object.keys(COMPARISON_REGISTRY);
