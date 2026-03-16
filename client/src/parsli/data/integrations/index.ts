import type { IntegrationPageData } from "../types";

import { gmailData } from "./gmail";
import { outlookData } from "./outlook";
import { zapierData } from "./zapier";
import { makeData } from "./make";
import { googleSheetsData } from "./google-sheets";
import { excelData } from "./excel";
import { googleDriveData } from "./google-drive";
import { dropboxData } from "./dropbox";
import { slackData } from "./slack";
import { webhooksData } from "./webhooks";
import { restApiData } from "./rest-api";
import { powerAutomateData } from "./power-automate";

export const INTEGRATION_REGISTRY: Record<string, IntegrationPageData> = {
  [gmailData.slug]: gmailData,
  [outlookData.slug]: outlookData,
  [zapierData.slug]: zapierData,
  [makeData.slug]: makeData,
  [googleSheetsData.slug]: googleSheetsData,
  [excelData.slug]: excelData,
  [googleDriveData.slug]: googleDriveData,
  [dropboxData.slug]: dropboxData,
  [slackData.slug]: slackData,
  [webhooksData.slug]: webhooksData,
  [restApiData.slug]: restApiData,
  [powerAutomateData.slug]: powerAutomateData,
};

export const INTEGRATION_SLUGS = Object.keys(INTEGRATION_REGISTRY);
