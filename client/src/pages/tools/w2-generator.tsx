import { useState, useCallback } from "react";
import { FileText, Download, AlertCircle, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    question: "What is a W-2 form?",
    answer:
      "A W-2 is a tax form that employers must send to employees and the IRS each year, reporting annual wages and the amount of taxes withheld from paychecks.",
  },
  {
    question: "When do I need a W-2?",
    answer:
      "Employers must provide W-2 forms to employees by January 31st for the previous tax year. This tool helps create practice or draft W-2s.",
  },
  {
    question: "Is this an official IRS W-2?",
    answer:
      "No. This generates a W-2 style document for reference, planning, or practice purposes. Official W-2s must be filed through IRS-approved methods.",
  },
  {
    question: "What information do I need?",
    answer:
      "Employer EIN and address, employee SSN and address, wages, federal/state tax withheld, Social Security and Medicare wages/taxes.",
  },
  {
    question: "Can I file taxes with this W-2?",
    answer:
      "No. This is for informational purposes only. Use official W-2s from your employer for tax filing. Consult a tax professional for guidance.",
  },
  {
    question: "Is my data stored?",
    answer:
      "No. All processing happens locally in your browser. Sensitive information like SSN is never sent to any server.",
  },
];

const RELATED_TOOLS = [
  {
    title: "1099 Form Generator",
    description: "Generate 1099 contractor forms",
    href: "/tools/1099-generator",
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

interface W2FormData {
  taxYear: string;
  employerEIN: string;
  employerName: string;
  employerAddress: string;
  employerCity: string;
  employerState: string;
  employerZip: string;
  controlNumber: string;
  employeeSSN: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeAddress: string;
  employeeCity: string;
  employeeState: string;
  employeeZip: string;
  wages: string;
  federalTaxWithheld: string;
  socialSecurityWages: string;
  socialSecurityTax: string;
  medicareWages: string;
  medicareTax: string;
  socialSecurityTips: string;
  allocatedTips: string;
  dependentCareBenefits: string;
  nonqualifiedPlans: string;
  box12a: string;
  box12aCode: string;
  box12b: string;
  box12bCode: string;
  stateTaxWithheld: string;
  stateWages: string;
  localTax: string;
  localWages: string;
  localityName: string;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX",
  "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

const BOX12_CODES = [
  { code: "", label: "None" },
  { code: "A", label: "A - Uncollected SS tax on tips" },
  { code: "B", label: "B - Uncollected Medicare tax on tips" },
  { code: "C", label: "C - Taxable cost of group-term life insurance" },
  { code: "D", label: "D - 401(k) contributions" },
  { code: "E", label: "E - 403(b) contributions" },
  { code: "DD", label: "DD - Health coverage cost" },
  { code: "W", label: "W - HSA contributions" },
];

export default function W2Generator() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<W2FormData>({
    taxYear: (currentYear - 1).toString(),
    employerEIN: "",
    employerName: "",
    employerAddress: "",
    employerCity: "",
    employerState: "CA",
    employerZip: "",
    controlNumber: "",
    employeeSSN: "",
    employeeFirstName: "",
    employeeLastName: "",
    employeeAddress: "",
    employeeCity: "",
    employeeState: "CA",
    employeeZip: "",
    wages: "",
    federalTaxWithheld: "",
    socialSecurityWages: "",
    socialSecurityTax: "",
    medicareWages: "",
    medicareTax: "",
    socialSecurityTips: "",
    allocatedTips: "",
    dependentCareBenefits: "",
    nonqualifiedPlans: "",
    box12a: "",
    box12aCode: "",
    box12b: "",
    box12bCode: "",
    stateTaxWithheld: "",
    stateWages: "",
    localTax: "",
    localWages: "",
    localityName: "",
  });

  const updateField = (field: keyof W2FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatSSN = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  };

  const formatEIN = (value: string): string => {
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
    if (!formData.employerName.trim()) {
      setError("Employer name is required");
      return false;
    }
    if (!formData.employeeFirstName.trim() || !formData.employeeLastName.trim()) {
      setError("Employee name is required");
      return false;
    }
    if (!formData.wages) {
      setError("Wages amount is required");
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

      // Draw form boxes
      const drawBox = (x: number, y: number, w: number, h: number, label: string, value: string, boxNum?: string) => {
        page.drawRectangle({
          x,
          y: height - y - h,
          width: w,
          height: h,
          borderColor: rgb(0, 0, 0),
          borderWidth: 0.5,
        });

        // Box number
        if (boxNum) {
          page.drawText(boxNum, {
            x: x + 2,
            y: height - y - 10,
            size: 6,
            font: helveticaBold,
            color: rgb(0, 0, 0),
          });
        }

        // Label
        page.drawText(label, {
          x: x + (boxNum ? 14 : 2),
          y: height - y - 10,
          size: 6,
          font: helvetica,
          color: rgb(0.3, 0.3, 0.3),
        });

        // Value
        if (value) {
          page.drawText(value, {
            x: x + 4,
            y: height - y - h + 6,
            size: 10,
            font: helvetica,
            color: rgb(0, 0, 0),
          });
        }
      };

      // Title
      page.drawText(`Form W-2 Wage and Tax Statement ${formData.taxYear}`, {
        x: 50,
        y: height - 50,
        size: 14,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      page.drawText("DRAFT - FOR REFERENCE ONLY - NOT FOR TAX FILING", {
        x: 50,
        y: height - 70,
        size: 10,
        font: helveticaBold,
        color: rgb(0.8, 0, 0),
      });

      const startY = 100;
      const colWidth = 270;
      const rowHeight = 45;
      const margin = 50;

      // Row 1
      drawBox(margin, startY, colWidth, rowHeight, "Employer identification number (EIN)", formData.employerEIN, "a");
      drawBox(margin + colWidth, startY, colWidth, rowHeight, "Wages, tips, other compensation", formatCurrency(formData.wages), "1");

      // Row 2
      drawBox(margin, startY + rowHeight, colWidth, rowHeight, "Employer's name, address, and ZIP code",
        `${formData.employerName}\n${formData.employerAddress}\n${formData.employerCity}, ${formData.employerState} ${formData.employerZip}`, "b");
      drawBox(margin + colWidth, startY + rowHeight, colWidth, rowHeight, "Federal income tax withheld", formatCurrency(formData.federalTaxWithheld), "2");

      // Row 3
      drawBox(margin, startY + rowHeight * 2, colWidth / 2, rowHeight, "Control number", formData.controlNumber, "c");
      drawBox(margin + colWidth / 2, startY + rowHeight * 2, colWidth / 2, rowHeight, "", "", "");
      drawBox(margin + colWidth, startY + rowHeight * 2, colWidth, rowHeight, "Social security wages", formatCurrency(formData.socialSecurityWages), "3");

      // Row 4
      drawBox(margin, startY + rowHeight * 3, colWidth, rowHeight, "Employee's social security number", formData.employeeSSN, "d");
      drawBox(margin + colWidth, startY + rowHeight * 3, colWidth, rowHeight, "Social security tax withheld", formatCurrency(formData.socialSecurityTax), "4");

      // Row 5
      drawBox(margin, startY + rowHeight * 4, colWidth, rowHeight, "Employee's first name and initial, Last name",
        `${formData.employeeFirstName} ${formData.employeeLastName}`, "e");
      drawBox(margin + colWidth, startY + rowHeight * 4, colWidth, rowHeight, "Medicare wages and tips", formatCurrency(formData.medicareWages), "5");

      // Row 6
      drawBox(margin, startY + rowHeight * 5, colWidth, rowHeight, "Employee's address",
        `${formData.employeeAddress}\n${formData.employeeCity}, ${formData.employeeState} ${formData.employeeZip}`, "f");
      drawBox(margin + colWidth, startY + rowHeight * 5, colWidth, rowHeight, "Medicare tax withheld", formatCurrency(formData.medicareTax), "6");

      // Row 7
      drawBox(margin, startY + rowHeight * 6, colWidth / 2, rowHeight, "Social security tips", formatCurrency(formData.socialSecurityTips), "7");
      drawBox(margin + colWidth / 2, startY + rowHeight * 6, colWidth / 2, rowHeight, "Allocated tips", formatCurrency(formData.allocatedTips), "8");
      drawBox(margin + colWidth, startY + rowHeight * 6, colWidth / 2, rowHeight, "Dependent care benefits", formatCurrency(formData.dependentCareBenefits), "10");
      drawBox(margin + colWidth + colWidth / 2, startY + rowHeight * 6, colWidth / 2, rowHeight, "Nonqualified plans", formatCurrency(formData.nonqualifiedPlans), "11");

      // Row 8 - Box 12
      drawBox(margin, startY + rowHeight * 7, colWidth / 2, rowHeight, "See instructions for box 12",
        formData.box12aCode ? `${formData.box12aCode} - ${formatCurrency(formData.box12a)}` : "", "12a");
      drawBox(margin + colWidth / 2, startY + rowHeight * 7, colWidth / 2, rowHeight, "",
        formData.box12bCode ? `${formData.box12bCode} - ${formatCurrency(formData.box12b)}` : "", "12b");

      // State/Local section
      const stateY = startY + rowHeight * 8;
      drawBox(margin, stateY, 80, rowHeight, "State", formData.employeeState, "15");
      drawBox(margin + 80, stateY, 100, rowHeight, "State wages, tips, etc.", formatCurrency(formData.stateWages), "16");
      drawBox(margin + 180, stateY, 100, rowHeight, "State income tax", formatCurrency(formData.stateTaxWithheld), "17");
      drawBox(margin + 280, stateY, 100, rowHeight, "Local wages, tips, etc.", formatCurrency(formData.localWages), "18");
      drawBox(margin + 380, stateY, 80, rowHeight, "Local income tax", formatCurrency(formData.localTax), "19");
      drawBox(margin + 460, stateY, 80, rowHeight, "Locality name", formData.localityName, "20");

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
      saveAs(blob, `W2-${formData.taxYear}-${formData.employeeLastName}.pdf`);

      setStatus("completed");
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try again.");
      setStatus("error");
    }
  }, [formData]);

  return (
    <ToolLayout
      title="W-2 Form Generator - Create W-2 Template Free"
      description="Generate W-2 wage and tax statement templates. Create practice W-2 forms for reference. Free W-2 generator tool."
      category="Document Generators"
      keywords="W-2 generator, W2 form, wage statement, tax form generator, W-2 template, create W-2"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This tool creates reference documents only. Not for official tax filing. Use employer-issued W-2s for taxes.
                </AlertDescription>
              </Alert>

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

              {/* Employer Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Employer Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="employerEIN">EIN (XX-XXXXXXX)</Label>
                    <Input
                      id="employerEIN"
                      value={formData.employerEIN}
                      onChange={(e) => updateField("employerEIN", formatEIN(e.target.value))}
                      placeholder="12-3456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="controlNumber">Control Number</Label>
                    <Input
                      id="controlNumber"
                      value={formData.controlNumber}
                      onChange={(e) => updateField("controlNumber", e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="employerName">Employer Name *</Label>
                    <Input
                      id="employerName"
                      value={formData.employerName}
                      onChange={(e) => updateField("employerName", e.target.value)}
                      placeholder="Company Name, Inc."
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="employerAddress">Address</Label>
                    <Input
                      id="employerAddress"
                      value={formData.employerAddress}
                      onChange={(e) => updateField("employerAddress", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employerCity">City</Label>
                    <Input
                      id="employerCity"
                      value={formData.employerCity}
                      onChange={(e) => updateField("employerCity", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="employerState">State</Label>
                      <Select
                        value={formData.employerState}
                        onValueChange={(value) => updateField("employerState", value)}
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
                      <Label htmlFor="employerZip">ZIP</Label>
                      <Input
                        id="employerZip"
                        value={formData.employerZip}
                        onChange={(e) => updateField("employerZip", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Employee Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="employeeSSN">SSN (XXX-XX-XXXX)</Label>
                    <Input
                      id="employeeSSN"
                      value={formData.employeeSSN}
                      onChange={(e) => updateField("employeeSSN", formatSSN(e.target.value))}
                      placeholder="123-45-6789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeFirstName">First Name *</Label>
                    <Input
                      id="employeeFirstName"
                      value={formData.employeeFirstName}
                      onChange={(e) => updateField("employeeFirstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeLastName">Last Name *</Label>
                    <Input
                      id="employeeLastName"
                      value={formData.employeeLastName}
                      onChange={(e) => updateField("employeeLastName", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="employeeAddress">Address</Label>
                    <Input
                      id="employeeAddress"
                      value={formData.employeeAddress}
                      onChange={(e) => updateField("employeeAddress", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeCity">City</Label>
                    <Input
                      id="employeeCity"
                      value={formData.employeeCity}
                      onChange={(e) => updateField("employeeCity", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="employeeState">State</Label>
                      <Select
                        value={formData.employeeState}
                        onValueChange={(value) => updateField("employeeState", value)}
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
                      <Label htmlFor="employeeZip">ZIP</Label>
                      <Input
                        id="employeeZip"
                        value={formData.employeeZip}
                        onChange={(e) => updateField("employeeZip", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wages Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Wages and Taxes
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="wages">Box 1: Wages *</Label>
                    <Input
                      id="wages"
                      type="number"
                      step="0.01"
                      value={formData.wages}
                      onChange={(e) => updateField("wages", e.target.value)}
                      placeholder="50000.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="federalTaxWithheld">Box 2: Federal Tax</Label>
                    <Input
                      id="federalTaxWithheld"
                      type="number"
                      step="0.01"
                      value={formData.federalTaxWithheld}
                      onChange={(e) => updateField("federalTaxWithheld", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialSecurityWages">Box 3: SS Wages</Label>
                    <Input
                      id="socialSecurityWages"
                      type="number"
                      step="0.01"
                      value={formData.socialSecurityWages}
                      onChange={(e) => updateField("socialSecurityWages", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialSecurityTax">Box 4: SS Tax</Label>
                    <Input
                      id="socialSecurityTax"
                      type="number"
                      step="0.01"
                      value={formData.socialSecurityTax}
                      onChange={(e) => updateField("socialSecurityTax", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicareWages">Box 5: Medicare Wages</Label>
                    <Input
                      id="medicareWages"
                      type="number"
                      step="0.01"
                      value={formData.medicareWages}
                      onChange={(e) => updateField("medicareWages", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicareTax">Box 6: Medicare Tax</Label>
                    <Input
                      id="medicareTax"
                      type="number"
                      step="0.01"
                      value={formData.medicareTax}
                      onChange={(e) => updateField("medicareTax", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Box 12 */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Box 12 Codes</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="box12aCode">Code</Label>
                    <Select
                      value={formData.box12aCode}
                      onValueChange={(value) => updateField("box12aCode", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {BOX12_CODES.map((item) => (
                          <SelectItem key={item.code || "none"} value={item.code}>{item.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="box12a">Amount</Label>
                    <Input
                      id="box12a"
                      type="number"
                      step="0.01"
                      value={formData.box12a}
                      onChange={(e) => updateField("box12a", e.target.value)}
                      disabled={!formData.box12aCode}
                    />
                  </div>
                </div>
              </div>

              {/* State/Local */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">State/Local Taxes</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="stateWages">Box 16: State Wages</Label>
                    <Input
                      id="stateWages"
                      type="number"
                      step="0.01"
                      value={formData.stateWages}
                      onChange={(e) => updateField("stateWages", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateTaxWithheld">Box 17: State Tax</Label>
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
                {status === "processing" ? "Generating..." : "Generate W-2 PDF"}
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
                W-2 Preview
              </h3>

              <div className="p-4 bg-muted/50 rounded-lg space-y-3 text-sm font-mono">
                <div className="text-center font-bold text-red-600 text-xs">
                  DRAFT - FOR REFERENCE ONLY
                </div>
                <div className="text-center font-bold">
                  Form W-2 - {formData.taxYear}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">a. Employer EIN</p>
                    <p>{formData.employerEIN || "XX-XXXXXXX"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">1. Wages</p>
                    <p className="font-bold">${formData.wages ? parseFloat(formData.wages).toLocaleString() : "0.00"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">b. Employer</p>
                    <p className="text-xs">{formData.employerName || "[Employer Name]"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">2. Federal Tax</p>
                    <p>${formData.federalTaxWithheld ? parseFloat(formData.federalTaxWithheld).toLocaleString() : "0.00"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">d. Employee SSN</p>
                    <p>{formData.employeeSSN || "XXX-XX-XXXX"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">3. SS Wages</p>
                    <p>${formData.socialSecurityWages ? parseFloat(formData.socialSecurityWages).toLocaleString() : "0.00"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">e. Employee</p>
                    <p className="text-xs">
                      {formData.employeeFirstName || "[First]"} {formData.employeeLastName || "[Last]"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">4. SS Tax</p>
                    <p>${formData.socialSecurityTax ? parseFloat(formData.socialSecurityTax).toLocaleString() : "0.00"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="W-2 Generator" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
