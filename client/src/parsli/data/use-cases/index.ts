import type { UseCasePageData } from "../types";

import { invoiceParsingData } from "./invoice-parsing";
import { receiptParsingData } from "./receipt-parsing";
import { emailToSpreadsheetData } from "./email-to-spreadsheet";
import { leadCaptureData } from "./lead-capture";
import { orderProcessingData } from "./order-processing";
import { resumeParsingData } from "./resume-parsing";
import { realEstateDocsData } from "./real-estate-docs";
import { logisticsShippingData } from "./logistics-shipping";
import { bankStatementsData } from "./bank-statements";
import { contractExtractionData } from "./contract-extraction";

export const USE_CASE_REGISTRY: Record<string, UseCasePageData> = {
  "invoice-parsing": invoiceParsingData,
  "receipt-parsing": receiptParsingData,
  "email-to-spreadsheet": emailToSpreadsheetData,
  "lead-capture": leadCaptureData,
  "order-processing": orderProcessingData,
  "resume-parsing": resumeParsingData,
  "real-estate-docs": realEstateDocsData,
  "logistics-shipping": logisticsShippingData,
  "bank-statements": bankStatementsData,
  "contract-extraction": contractExtractionData,
};

export const USE_CASE_SLUGS = Object.keys(USE_CASE_REGISTRY);
