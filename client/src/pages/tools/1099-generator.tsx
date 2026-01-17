import { useState, useCallback } from "react";
import { FileText, Download, AlertCircle, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToolLayout,
  ProcessingStatus,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const FAQS = [
  {
    question: "What is a 1099-NEC form?",
    answer:
      "Form 1099-NEC reports payments of $600 or more made to independent contractors, freelancers, and other non-employees for services performed during the tax year.",
  },
  {
    question: "When do I need to send 1099 forms?",
    answer:
      "1099-NEC forms must be sent to recipients by January 31st and filed with the IRS by January 31st (paper) or March 31st (electronic).",
  },
  {
    question: "Is this an official IRS 1099?",
    answer:
      "No. This generates a 1099-NEC style document for reference purposes. Official 1099s must be filed through IRS-approved methods.",
  },
  {
    question: "What's the difference between 1099-NEC and 1099-MISC?",
    answer:
      "1099-NEC is for non-employee compensation (contractor payments). 1099-MISC is for other types of income like rents, royalties, and prizes.",
  },
  {
    question: "Do I need a 1099 for payments under $600?",
    answer:
      "Generally, you only need to issue a 1099-NEC for payments of $600 or more to a single payee in a tax year. Consult a tax professional for specifics.",
  },
  {
    question: "Is my data stored?",
    answer:
      "No. All processing happens locally in your browser. Sensitive information like TIN/SSN is never sent to any server.",
  },
];

const RELATED_TOOLS = [
  {
    title: "W-2 Form Generator",
    description: "Generate W-2 wage statements",
    href: "/tools/w2-generator",
    icon: FileText,
    category: "Document Generators",
  },
  {
    title: "Invoice Parser",
    description: "Extract data from invoices",
    href: "/tools/invoice-parser",
    icon: FileText,
    category: "AI Document Processing",
    isAIPowered: true,
  },
];

interface Form1099Data {
  taxYear: string;
  formType: "NEC" | "MISC";
  payerTIN: string;
  payerName: string;
  payerAddress: string;
  payerCity: string;
  payerState: string;
  payerZip: string;
  payerPhone: string;
  recipientTIN: string;
  recipientName: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  accountNumber: string;
  // 1099-NEC boxes
  nonemployeeCompensation: string;
  payerDirectSales: boolean;
  federalTaxWithheld: string;
  stateTaxWithheld: string;
  statePayerNumber: string;
  stateIncome: string;
  // 1099-MISC boxes
  rents: string;
  royalties: string;
  otherIncome: string;
  fishingBoatProceeds: string;
  medicalPayments: string;
  substitutePayments: string;
  cropInsurance: string;
  grossProceeds: string;
  section409A: string;
  goldenParachute: string;
  nonqualifiedDeferred: string;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX",
  "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

export default function Form1099Generator() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<Form1099Data>({
    taxYear: (currentYear - 1).toString(),
    formType: "NEC",
    payerTIN: "",
    payerName: "",
    payerAddress: "",
    payerCity: "",
    payerState: "CA",
    payerZip: "",
    payerPhone: "",
    recipientTIN: "",
    recipientName: "",
    recipientAddress: "",
    recipientCity: "",
    recipientState: "CA",
    recipientZip: "",
    accountNumber: "",
    nonemployeeCompensation: "",
    payerDirectSales: false,
    federalTaxWithheld: "",
    stateTaxWithheld: "",
    statePayerNumber: "",
    stateIncome: "",
    rents: "",
    royalties: "",
    otherIncome: "",
    fishingBoatProceeds: "",
    medicalPayments: "",
    substitutePayments: "",
    cropInsurance: "",
    grossProceeds: "",
    section409A: "",
    goldenParachute: "",
    nonqualifiedDeferred: "",
  });

  const updateField = (field: keyof Form1099Data, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatTIN = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  };

  const formatCurrency = (value: string): string => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return "";
    return num.toFixed(2);
  };

  const validateForm = (): boolean => {
    if (!formData.payerName.trim()) {
      setError("Payer name is required");
      return false;
    }
    if (!formData.recipientName.trim()) {
      setError("Recipient name is required");
      return false;
    }
    if (formData.formType === "NEC" && !formData.nonemployeeCompensation) {
      setError("Non-employee compensation amount is required");
      return false;
    }
    setError(null);
    return true;
  };

  const generatePDF = useCallback(async () => {
    if (!validateForm()) return;

    setStatus("processing");

    try {
      const pdfDoc = await PDFDocument.create();
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const page = pdfDoc.addPage([612, 792]);
      const { width, height } = page.getSize();

      const drawBox = (x: number, y: number, w: number, h: number, label: string, value: string, boxNum?: string) => {
        page.drawRectangle({
          x,
          y: height - y - h,
          width: w,
          height: h,
          borderColor: rgb(0, 0, 0),
          borderWidth: 0.5,
        });

        if (boxNum) {
          page.drawText(boxNum, {
            x: x + 2,
            y: height - y - 10,
            size: 6,
            font: helveticaBold,
            color: rgb(0, 0, 0),
          });
        }

        page.drawText(label, {
          x: x + (boxNum ? 12 : 2),
          y: height - y - 10,
          size: 5,
          font: helvetica,
          color: rgb(0.3, 0.3, 0.3),
        });

        if (value) {
          page.drawText(value, {
            x: x + 4,
            y: height - y - h + 6,
            size: 9,
            font: helvetica,
            color: rgb(0, 0, 0),
          });
        }
      };

      // Title
      const title = `Form 1099-${formData.formType} - ${formData.taxYear}`;
      page.drawText(title, {
        x: 50,
        y: height - 50,
        size: 14,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      const subtitle = formData.formType === "NEC"
        ? "Nonemployee Compensation"
        : "Miscellaneous Income";
      page.drawText(subtitle, {
        x: 50,
        y: height - 68,
        size: 10,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText("DRAFT - FOR REFERENCE ONLY - NOT FOR TAX FILING", {
        x: 50,
        y: height - 85,
        size: 10,
        font: helveticaBold,
        color: rgb(0.8, 0, 0),
      });

      const startY = 110;
      const colWidth = 270;
      const rowHeight = 45;
      const margin = 50;

      // Payer Info
      drawBox(margin, startY, colWidth, rowHeight, "PAYER'S TIN", formData.payerTIN);
      drawBox(margin + colWidth, startY, colWidth, rowHeight, "RECIPIENT'S TIN", formData.recipientTIN);

      drawBox(margin, startY + rowHeight, colWidth, rowHeight * 1.5, "PAYER'S name, address, city, state, ZIP",
        `${formData.payerName}\n${formData.payerAddress}\n${formData.payerCity}, ${formData.payerState} ${formData.payerZip}`);

      if (formData.formType === "NEC") {
        drawBox(margin + colWidth, startY + rowHeight, colWidth, rowHeight, "1 Nonemployee compensation",
          formatCurrency(formData.nonemployeeCompensation), "1");
        drawBox(margin + colWidth, startY + rowHeight * 2, colWidth / 2, rowHeight / 2, "2 Payer direct sales",
          formData.payerDirectSales ? "X" : "", "2");
        drawBox(margin + colWidth + colWidth / 2, startY + rowHeight * 2, colWidth / 2, rowHeight / 2, "",
          "", "");
      } else {
        drawBox(margin + colWidth, startY + rowHeight, colWidth / 2, rowHeight, "1 Rents",
          formatCurrency(formData.rents), "1");
        drawBox(margin + colWidth + colWidth / 2, startY + rowHeight, colWidth / 2, rowHeight, "2 Royalties",
          formatCurrency(formData.royalties), "2");
      }

      // Recipient Info
      drawBox(margin, startY + rowHeight * 2.5, colWidth, rowHeight * 1.5, "RECIPIENT'S name, address, city, state, ZIP",
        `${formData.recipientName}\n${formData.recipientAddress}\n${formData.recipientCity}, ${formData.recipientState} ${formData.recipientZip}`);

      if (formData.formType === "NEC") {
        drawBox(margin + colWidth, startY + rowHeight * 2.5, colWidth, rowHeight, "4 Federal income tax withheld",
          formatCurrency(formData.federalTaxWithheld), "4");
      } else {
        drawBox(margin + colWidth, startY + rowHeight * 2.5, colWidth / 2, rowHeight, "3 Other income",
          formatCurrency(formData.otherIncome), "3");
        drawBox(margin + colWidth + colWidth / 2, startY + rowHeight * 2.5, colWidth / 2, rowHeight, "4 Federal tax withheld",
          formatCurrency(formData.federalTaxWithheld), "4");
      }

      // Account Number
      drawBox(margin, startY + rowHeight * 4, colWidth, rowHeight, "Account number (see instructions)",
        formData.accountNumber);

      if (formData.formType === "MISC") {
        drawBox(margin + colWidth, startY + rowHeight * 3.5, colWidth / 2, rowHeight, "5 Fishing boat proceeds",
          formatCurrency(formData.fishingBoatProceeds), "5");
        drawBox(margin + colWidth + colWidth / 2, startY + rowHeight * 3.5, colWidth / 2, rowHeight, "6 Medical payments",
          formatCurrency(formData.medicalPayments), "6");
      }

      // State Section
      const stateY = startY + rowHeight * 5;
      drawBox(margin, stateY, 100, rowHeight, "State/Payer's state no.", `${formData.recipientState} / ${formData.statePayerNumber}`, "5/6");
      drawBox(margin + 100, stateY, 170, rowHeight, "State income", formatCurrency(formData.stateIncome), "7");
      drawBox(margin + 270, stateY, 270, rowHeight, "State tax withheld", formatCurrency(formData.stateTaxWithheld), "");

      // Footer
      page.drawText("This document is for informational purposes only. Not valid for tax filing.", {
        x: 50,
        y: 50,
        size: 8,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `1099-${formData.formType}-${formData.taxYear}-${formData.recipientName.replace(/\s+/g, "_")}.pdf`);

      setStatus("completed");
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try again.");
      setStatus("error");
    }
  }, [formData]);

  return (
    <ToolLayout
      title="1099 Form Generator - Create 1099-NEC/MISC Template Free"
      description="Generate 1099-NEC and 1099-MISC form templates. Create practice 1099 forms for contractors. Free 1099 generator tool."
      category="Document Generators"
      keywords="1099 generator, 1099-NEC, 1099-MISC, contractor tax form, freelancer 1099, create 1099"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This creates reference documents only. Not for official tax filing. Use IRS-approved methods for actual 1099 filing.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="formType">Form Type</Label>
                  <Select
                    value={formData.formType}
                    onValueChange={(value) => updateField("formType", value as "NEC" | "MISC")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEC">1099-NEC (Non-Employee)</SelectItem>
                      <SelectItem value="MISC">1099-MISC (Miscellaneous)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taxYear">Tax Year</Label>
                  <Select
                    value={formData.taxYear}
                    onValueChange={(value) => updateField("taxYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Payer Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Payer Information (Your Business)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="payerTIN">TIN/EIN *</Label>
                    <Input
                      id="payerTIN"
                      value={formData.payerTIN}
                      onChange={(e) => updateField("payerTIN", formatTIN(e.target.value))}
                      placeholder="12-3456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payerPhone">Phone</Label>
                    <Input
                      id="payerPhone"
                      value={formData.payerPhone}
                      onChange={(e) => updateField("payerPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="payerName">Business Name *</Label>
                    <Input
                      id="payerName"
                      value={formData.payerName}
                      onChange={(e) => updateField("payerName", e.target.value)}
                      placeholder="Your Company, LLC"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="payerAddress">Address</Label>
                    <Input
                      id="payerAddress"
                      value={formData.payerAddress}
                      onChange={(e) => updateField("payerAddress", e.target.value)}
                      placeholder="123 Business Ave"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payerCity">City</Label>
                    <Input
                      id="payerCity"
                      value={formData.payerCity}
                      onChange={(e) => updateField("payerCity", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="payerState">State</Label>
                      <Select
                        value={formData.payerState}
                        onValueChange={(value) => updateField("payerState", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="payerZip">ZIP</Label>
                      <Input
                        id="payerZip"
                        value={formData.payerZip}
                        onChange={(e) => updateField("payerZip", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Recipient Information (Contractor)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="recipientTIN">TIN/SSN</Label>
                    <Input
                      id="recipientTIN"
                      value={formData.recipientTIN}
                      onChange={(e) => updateField("recipientTIN", formatTIN(e.target.value))}
                      placeholder="123-45-6789 or 12-3456789"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="recipientName">Name *</Label>
                    <Input
                      id="recipientName"
                      value={formData.recipientName}
                      onChange={(e) => updateField("recipientName", e.target.value)}
                      placeholder="Contractor Name or Business"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="recipientAddress">Address</Label>
                    <Input
                      id="recipientAddress"
                      value={formData.recipientAddress}
                      onChange={(e) => updateField("recipientAddress", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientCity">City</Label>
                    <Input
                      id="recipientCity"
                      value={formData.recipientCity}
                      onChange={(e) => updateField("recipientCity", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="recipientState">State</Label>
                      <Select
                        value={formData.recipientState}
                        onValueChange={(value) => updateField("recipientState", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="recipientZip">ZIP</Label>
                      <Input
                        id="recipientZip"
                        value={formData.recipientZip}
                        onChange={(e) => updateField("recipientZip", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="accountNumber">Account Number (Optional)</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => updateField("accountNumber", e.target.value)}
                      placeholder="For your records"
                    />
                  </div>
                </div>
              </div>

              {/* Income Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="size-4" />
                  {formData.formType === "NEC" ? "Compensation" : "Income"}
                </h4>

                {formData.formType === "NEC" ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="nonemployeeCompensation">Box 1: Nonemployee Compensation *</Label>
                      <Input
                        id="nonemployeeCompensation"
                        type="number"
                        step="0.01"
                        value={formData.nonemployeeCompensation}
                        onChange={(e) => updateField("nonemployeeCompensation", e.target.value)}
                        placeholder="5000.00"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="payerDirectSales"
                        checked={formData.payerDirectSales}
                        onCheckedChange={(checked) => updateField("payerDirectSales", checked)}
                      />
                      <Label htmlFor="payerDirectSales">Box 2: Payer made direct sales of $5,000+</Label>
                    </div>
                    <div>
                      <Label htmlFor="federalTaxWithheld">Box 4: Federal Tax Withheld</Label>
                      <Input
                        id="federalTaxWithheld"
                        type="number"
                        step="0.01"
                        value={formData.federalTaxWithheld}
                        onChange={(e) => updateField("federalTaxWithheld", e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="rents">Box 1: Rents</Label>
                      <Input
                        id="rents"
                        type="number"
                        step="0.01"
                        value={formData.rents}
                        onChange={(e) => updateField("rents", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="royalties">Box 2: Royalties</Label>
                      <Input
                        id="royalties"
                        type="number"
                        step="0.01"
                        value={formData.royalties}
                        onChange={(e) => updateField("royalties", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherIncome">Box 3: Other Income</Label>
                      <Input
                        id="otherIncome"
                        type="number"
                        step="0.01"
                        value={formData.otherIncome}
                        onChange={(e) => updateField("otherIncome", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="federalTaxWithheld">Box 4: Federal Tax</Label>
                      <Input
                        id="federalTaxWithheld"
                        type="number"
                        step="0.01"
                        value={formData.federalTaxWithheld}
                        onChange={(e) => updateField("federalTaxWithheld", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* State Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">State Tax Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="stateIncome">State Income</Label>
                    <Input
                      id="stateIncome"
                      type="number"
                      step="0.01"
                      value={formData.stateIncome}
                      onChange={(e) => updateField("stateIncome", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateTaxWithheld">State Tax Withheld</Label>
                    <Input
                      id="stateTaxWithheld"
                      type="number"
                      step="0.01"
                      value={formData.stateTaxWithheld}
                      onChange={(e) => updateField("stateTaxWithheld", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={generatePDF}
                disabled={status === "processing"}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 size-4" />
                {status === "processing" ? "Generating..." : `Generate 1099-${formData.formType} PDF`}
              </Button>
            </CardContent>
          </Card>

          {status !== "idle" && (
            <ProcessingStatus
              status={status}
              message={status === "processing" ? "Generating PDF..." : "PDF generated successfully!"}
            />
          )}
        </div>

        <div className="space-y-4">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                <FileText className="size-4" />
                1099-{formData.formType} Preview
              </h3>

              <div className="p-4 bg-muted/50 rounded-lg space-y-3 text-sm font-mono">
                <div className="text-center font-bold text-red-600 text-xs">
                  DRAFT - FOR REFERENCE ONLY
                </div>
                <div className="text-center font-bold">
                  Form 1099-{formData.formType} - {formData.taxYear}
                </div>
                <div className="text-center text-xs text-muted-foreground">
                  {formData.formType === "NEC" ? "Nonemployee Compensation" : "Miscellaneous Income"}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">PAYER'S TIN</p>
                    <p>{formData.payerTIN || "XX-XXXXXXX"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">RECIPIENT'S TIN</p>
                    <p>{formData.recipientTIN || "XXX-XX-XXXX"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">PAYER</p>
                    <p className="text-xs">{formData.payerName || "[Payer Name]"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">RECIPIENT</p>
                    <p className="text-xs">{formData.recipientName || "[Recipient Name]"}</p>
                  </div>
                </div>

                {formData.formType === "NEC" ? (
                  <div className="border-t pt-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">1. Nonemployee Compensation</p>
                        <p className="font-bold text-lg">
                          ${formData.nonemployeeCompensation
                            ? parseFloat(formData.nonemployeeCompensation).toLocaleString()
                            : "0.00"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">4. Federal Tax Withheld</p>
                        <p>
                          ${formData.federalTaxWithheld
                            ? parseFloat(formData.federalTaxWithheld).toLocaleString()
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">1. Rents</p>
                        <p>${formData.rents ? parseFloat(formData.rents).toLocaleString() : "0.00"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">2. Royalties</p>
                        <p>${formData.royalties ? parseFloat(formData.royalties).toLocaleString() : "0.00"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">3. Other</p>
                        <p>${formData.otherIncome ? parseFloat(formData.otherIncome).toLocaleString() : "0.00"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="1099 Form Generator" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
