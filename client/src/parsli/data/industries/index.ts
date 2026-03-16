import type { IndustryPageData } from "../types";

import { financeData } from "./finance";
import { realEstateData } from "./real-estate";
import { logisticsData } from "./logistics";
import { healthcareData } from "./healthcare";
import { legalData } from "./legal";
import { ecommerceData } from "./ecommerce";
import { hrData } from "./hr";
import { insuranceData } from "./insurance";

export const INDUSTRY_REGISTRY: Record<string, IndustryPageData> = {
  finance: financeData,
  "real-estate": realEstateData,
  logistics: logisticsData,
  healthcare: healthcareData,
  legal: legalData,
  ecommerce: ecommerceData,
  hr: hrData,
  insurance: insuranceData,
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRY_REGISTRY);
