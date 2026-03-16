import type { DocumentTypePageData } from "../types";

import { invoicesData } from "./invoices";
import { receiptsData } from "./receipts";
import { emailsData } from "./emails";
import { pdfsData } from "./pdfs";
import { spreadsheetsData } from "./spreadsheets";
import { bankStatementsData } from "./bank-statements";
import { contractsData } from "./contracts";
import { formsData } from "./forms";

export const DOC_TYPE_REGISTRY: Record<string, DocumentTypePageData> = {
  invoices: invoicesData,
  receipts: receiptsData,
  emails: emailsData,
  pdfs: pdfsData,
  spreadsheets: spreadsheetsData,
  "bank-statements": bankStatementsData,
  contracts: contractsData,
  forms: formsData,
};

export const DOC_TYPE_SLUGS = Object.keys(DOC_TYPE_REGISTRY);
