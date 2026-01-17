import { useState, useCallback } from "react";
import { Home, Download, Shield, AlertCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    question: "What is a lease agreement?",
    answer:
      "A lease agreement is a legal contract between a landlord and tenant that outlines the terms and conditions for renting a property, including rent amount, duration, and responsibilities.",
  },
  {
    question: "Is this lease agreement legally binding?",
    answer:
      "This generator creates a standard lease template. State laws vary, so we recommend having the document reviewed by a local attorney or real estate professional.",
  },
  {
    question: "What information do I need?",
    answer:
      "You'll need landlord and tenant details, property address, rent amount, security deposit, lease duration, and any specific terms or rules for the property.",
  },
  {
    question: "Can I add custom clauses?",
    answer:
      "Yes! You can add pet policies, maintenance responsibilities, utilities, and additional terms. For complex situations, consult a lawyer.",
  },
  {
    question: "What lease term options are available?",
    answer:
      "You can generate month-to-month, 6-month, 1-year, or 2-year leases. The document includes standard provisions appropriate for each term.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All PDF generation happens locally in your browser. Your information is never sent to any server.",
  },
];

const RELATED_TOOLS = [
  {
    title: "NDA Generator",
    description: "Create non-disclosure agreements",
    href: "/tools/nda-generator",
    icon: FileText,
    category: "Document Generators",
  },
  {
    title: "Contract Analyzer",
    description: "Analyze contract terms",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "AI Document Processing",
    isAIPowered: true,
  },
];

interface LeaseFormData {
  landlordName: string;
  landlordAddress: string;
  landlordPhone: string;
  landlordEmail: string;
  tenantName: string;
  tenantCurrentAddress: string;
  tenantPhone: string;
  tenantEmail: string;
  propertyAddress: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  leaseStartDate: string;
  leaseTerm: string;
  monthlyRent: string;
  securityDeposit: string;
  rentDueDay: string;
  lateFee: string;
  governingState: string;
  petsAllowed: boolean;
  petDeposit: string;
  smokingAllowed: boolean;
  utilitiesIncluded: string[];
  additionalTerms: string;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

const UTILITIES = ["Water", "Electricity", "Gas", "Internet", "Cable TV", "Trash"];

export default function LeaseGenerator() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeaseFormData>({
    landlordName: "",
    landlordAddress: "",
    landlordPhone: "",
    landlordEmail: "",
    tenantName: "",
    tenantCurrentAddress: "",
    tenantPhone: "",
    tenantEmail: "",
    propertyAddress: "",
    propertyType: "apartment",
    bedrooms: "1",
    bathrooms: "1",
    leaseStartDate: new Date().toISOString().split("T")[0],
    leaseTerm: "12",
    monthlyRent: "",
    securityDeposit: "",
    rentDueDay: "1",
    lateFee: "50",
    governingState: "California",
    petsAllowed: false,
    petDeposit: "",
    smokingAllowed: false,
    utilitiesIncluded: [],
    additionalTerms: "",
  });

  const updateField = (field: keyof LeaseFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleUtility = (utility: string) => {
    setFormData((prev) => ({
      ...prev,
      utilitiesIncluded: prev.utilitiesIncluded.includes(utility)
        ? prev.utilitiesIncluded.filter((u) => u !== utility)
        : [...prev.utilitiesIncluded, utility],
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.landlordName.trim()) {
      setError("Landlord name is required");
      return false;
    }
    if (!formData.tenantName.trim()) {
      setError("Tenant name is required");
      return false;
    }
    if (!formData.propertyAddress.trim()) {
      setError("Property address is required");
      return false;
    }
    if (!formData.monthlyRent || parseFloat(formData.monthlyRent) <= 0) {
      setError("Valid monthly rent is required");
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
      const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      let page = pdfDoc.addPage([612, 792]);
      const { height } = page.getSize();
      const margin = 72;
      const lineHeight = 14;
      let y = height - margin;

      const drawText = (text: string, options: { bold?: boolean; size?: number; indent?: number } = {}) => {
        const font = options.bold ? timesRomanBold : timesRoman;
        const size = options.size || 11;
        const indent = options.indent || 0;

        const words = text.split(' ');
        let line = '';
        const maxWidth = 612 - margin * 2 - indent;

        for (const word of words) {
          const testLine = line + (line ? ' ' : '') + word;
          const textWidth = font.widthOfTextAtSize(testLine, size);

          if (textWidth > maxWidth && line) {
            page.drawText(line, {
              x: margin + indent,
              y,
              size,
              font,
              color: rgb(0, 0, 0),
            });
            y -= lineHeight;
            line = word;

            if (y < margin) {
              page = pdfDoc.addPage([612, 792]);
              y = height - margin;
            }
          } else {
            line = testLine;
          }
        }

        if (line) {
          page.drawText(line, {
            x: margin + indent,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
          });
          y -= lineHeight;
        }
      };

      const addSpace = (lines: number = 1) => {
        y -= lineHeight * lines;
        if (y < margin) {
          page = pdfDoc.addPage([612, 792]);
          y = height - margin;
        }
      };

      // Calculate lease end date
      const startDate = new Date(formData.leaseStartDate);
      const endDate = new Date(startDate);
      if (formData.leaseTerm === "0") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + parseInt(formData.leaseTerm));
      }
      const endDateStr = endDate.toISOString().split("T")[0];

      // Title
      const title = "RESIDENTIAL LEASE AGREEMENT";
      page.drawText(title, {
        x: 612 / 2 - timesRomanBold.widthOfTextAtSize(title, 14) / 2,
        y,
        size: 14,
        font: timesRomanBold,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight * 2;

      // Parties
      drawText("1. PARTIES", { bold: true });
      drawText(`This Residential Lease Agreement ("Lease") is entered into on ${formData.leaseStartDate} between:`, { indent: 20 });
      addSpace();
      drawText(`LANDLORD: ${formData.landlordName}`, { indent: 20 });
      if (formData.landlordAddress) drawText(`Address: ${formData.landlordAddress}`, { indent: 20 });
      if (formData.landlordPhone) drawText(`Phone: ${formData.landlordPhone}`, { indent: 20 });
      if (formData.landlordEmail) drawText(`Email: ${formData.landlordEmail}`, { indent: 20 });
      addSpace();
      drawText(`TENANT: ${formData.tenantName}`, { indent: 20 });
      if (formData.tenantPhone) drawText(`Phone: ${formData.tenantPhone}`, { indent: 20 });
      if (formData.tenantEmail) drawText(`Email: ${formData.tenantEmail}`, { indent: 20 });
      addSpace();

      // Property
      drawText("2. PREMISES", { bold: true });
      drawText(`Landlord agrees to rent to Tenant the property located at: ${formData.propertyAddress}`, { indent: 20 });
      drawText(`Property Type: ${formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1)} - ${formData.bedrooms} bedroom(s), ${formData.bathrooms} bathroom(s)`, { indent: 20 });
      addSpace();

      // Term
      drawText("3. TERM", { bold: true });
      if (formData.leaseTerm === "0") {
        drawText(`This is a month-to-month tenancy commencing on ${formData.leaseStartDate}. Either party may terminate with 30 days written notice.`, { indent: 20 });
      } else {
        drawText(`The lease term begins on ${formData.leaseStartDate} and ends on ${endDateStr} (${formData.leaseTerm} months).`, { indent: 20 });
      }
      addSpace();

      // Rent
      drawText("4. RENT", { bold: true });
      drawText(`Monthly rent: $${parseFloat(formData.monthlyRent).toLocaleString()}`, { indent: 20 });
      drawText(`Rent is due on the ${formData.rentDueDay}${formData.rentDueDay === "1" ? "st" : formData.rentDueDay === "2" ? "nd" : formData.rentDueDay === "3" ? "rd" : "th"} day of each month.`, { indent: 20 });
      drawText(`Late fee: $${formData.lateFee} if rent is not received within 5 days of due date.`, { indent: 20 });
      addSpace();

      // Security Deposit
      drawText("5. SECURITY DEPOSIT", { bold: true });
      const deposit = formData.securityDeposit || formData.monthlyRent;
      drawText(`Tenant shall pay a security deposit of $${parseFloat(deposit).toLocaleString()} prior to move-in.`, { indent: 20 });
      drawText(`The deposit will be returned within 30 days of move-out, less any deductions for damages or unpaid rent.`, { indent: 20 });
      addSpace();

      // Utilities
      drawText("6. UTILITIES", { bold: true });
      if (formData.utilitiesIncluded.length > 0) {
        drawText(`The following utilities are INCLUDED in rent: ${formData.utilitiesIncluded.join(", ")}.`, { indent: 20 });
        const notIncluded = UTILITIES.filter((u) => !formData.utilitiesIncluded.includes(u));
        if (notIncluded.length > 0) {
          drawText(`Tenant is responsible for: ${notIncluded.join(", ")}.`, { indent: 20 });
        }
      } else {
        drawText(`Tenant is responsible for all utilities including: ${UTILITIES.join(", ")}.`, { indent: 20 });
      }
      addSpace();

      // Pets
      drawText("7. PETS", { bold: true });
      if (formData.petsAllowed) {
        drawText(`Pets ARE allowed on the premises with prior written approval.`, { indent: 20 });
        if (formData.petDeposit) {
          drawText(`An additional pet deposit of $${formData.petDeposit} is required.`, { indent: 20 });
        }
      } else {
        drawText(`NO pets are allowed on the premises without prior written consent from Landlord.`, { indent: 20 });
      }
      addSpace();

      // Smoking
      drawText("8. SMOKING", { bold: true });
      drawText(formData.smokingAllowed
        ? `Smoking IS permitted in designated outdoor areas only.`
        : `This is a NON-SMOKING property. Smoking is prohibited inside the premises and common areas.`, { indent: 20 });
      addSpace();

      // Maintenance
      drawText("9. MAINTENANCE AND REPAIRS", { bold: true });
      drawText(`Tenant agrees to maintain the premises in clean and sanitary condition. Tenant shall promptly notify Landlord of any needed repairs. Landlord is responsible for maintaining the property in habitable condition.`, { indent: 20 });
      addSpace();

      // Entry
      drawText("10. RIGHT OF ENTRY", { bold: true });
      drawText(`Landlord may enter the premises with 24-hour notice for inspections, repairs, or showing to prospective tenants. Emergency entry is permitted without notice.`, { indent: 20 });
      addSpace();

      // Termination
      drawText("11. TERMINATION", { bold: true });
      drawText(`Either party may terminate this lease at the end of the term with 30 days written notice. Early termination by Tenant may result in forfeiture of security deposit and/or liability for remaining rent.`, { indent: 20 });
      addSpace();

      // Governing Law
      drawText("12. GOVERNING LAW", { bold: true });
      drawText(`This Lease shall be governed by the laws of the State of ${formData.governingState}.`, { indent: 20 });
      addSpace();

      // Additional Terms
      if (formData.additionalTerms.trim()) {
        drawText("13. ADDITIONAL TERMS", { bold: true });
        drawText(formData.additionalTerms, { indent: 20 });
        addSpace();
      }

      addSpace(2);

      // Signatures
      drawText("SIGNATURES", { bold: true });
      addSpace();
      drawText("By signing below, both parties agree to the terms of this Lease Agreement.");
      addSpace(2);

      drawText("LANDLORD:");
      addSpace();
      drawText("Signature: _________________________________    Date: _______________");
      addSpace();
      drawText(`Print Name: ${formData.landlordName}`);
      addSpace(2);

      drawText("TENANT:");
      addSpace();
      drawText("Signature: _________________________________    Date: _______________");
      addSpace();
      drawText(`Print Name: ${formData.tenantName}`);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `Lease-${formData.propertyAddress.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30)}.pdf`);

      setStatus("completed");
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try again.");
      setStatus("error");
    }
  }, [formData]);

  return (
    <ToolLayout
      title="Lease Agreement Generator - Create Rental Agreement Free"
      description="Generate professional residential lease agreements instantly. Customizable rental contracts with all standard terms. Free lease template generator."
      category="Document Generators"
      keywords="lease generator, rental agreement, lease template, free lease, rental contract, landlord lease, tenant agreement"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              {/* Landlord Info */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Home className="size-4" />
                  Landlord Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="landlordName">Full Name *</Label>
                    <Input
                      id="landlordName"
                      value={formData.landlordName}
                      onChange={(e) => updateField("landlordName", e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="landlordAddress">Address</Label>
                    <Input
                      id="landlordAddress"
                      value={formData.landlordAddress}
                      onChange={(e) => updateField("landlordAddress", e.target.value)}
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landlordPhone">Phone</Label>
                    <Input
                      id="landlordPhone"
                      value={formData.landlordPhone}
                      onChange={(e) => updateField("landlordPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landlordEmail">Email</Label>
                    <Input
                      id="landlordEmail"
                      type="email"
                      value={formData.landlordEmail}
                      onChange={(e) => updateField("landlordEmail", e.target.value)}
                      placeholder="landlord@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Tenant Info */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-3">Tenant Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="tenantName">Full Name *</Label>
                    <Input
                      id="tenantName"
                      value={formData.tenantName}
                      onChange={(e) => updateField("tenantName", e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantPhone">Phone</Label>
                    <Input
                      id="tenantPhone"
                      value={formData.tenantPhone}
                      onChange={(e) => updateField("tenantPhone", e.target.value)}
                      placeholder="(555) 987-6543"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantEmail">Email</Label>
                    <Input
                      id="tenantEmail"
                      type="email"
                      value={formData.tenantEmail}
                      onChange={(e) => updateField("tenantEmail", e.target.value)}
                      placeholder="tenant@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-3">Property Details</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="propertyAddress">Property Address *</Label>
                    <Input
                      id="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={(e) => updateField("propertyAddress", e.target.value)}
                      placeholder="456 Oak Ave, Apt 2B, City, State 67890"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="propertyType">Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => updateField("propertyType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select
                        value={formData.bedrooms}
                        onValueChange={(value) => updateField("bedrooms", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["Studio", "1", "2", "3", "4", "5+"].map((n) => (
                            <SelectItem key={n} value={n === "Studio" ? "0" : n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select
                        value={formData.bathrooms}
                        onValueChange={(value) => updateField("bathrooms", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "1.5", "2", "2.5", "3", "3+"].map((n) => (
                            <SelectItem key={n} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lease Terms */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-3">Lease Terms</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="leaseStartDate">Start Date</Label>
                    <Input
                      id="leaseStartDate"
                      type="date"
                      value={formData.leaseStartDate}
                      onChange={(e) => updateField("leaseStartDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="leaseTerm">Lease Term</Label>
                    <Select
                      value={formData.leaseTerm}
                      onValueChange={(value) => updateField("leaseTerm", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Month-to-Month</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">1 Year</SelectItem>
                        <SelectItem value="24">2 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="monthlyRent">Monthly Rent ($) *</Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={formData.monthlyRent}
                      onChange={(e) => updateField("monthlyRent", e.target.value)}
                      placeholder="1500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
                    <Input
                      id="securityDeposit"
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => updateField("securityDeposit", e.target.value)}
                      placeholder="Same as rent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rentDueDay">Rent Due Day</Label>
                    <Select
                      value={formData.rentDueDay}
                      onValueChange={(value) => updateField("rentDueDay", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 5, 10, 15].map((day) => (
                          <SelectItem key={day} value={day.toString()}>{day}st/th of month</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="governingState">State</Label>
                    <Select
                      value={formData.governingState}
                      onValueChange={(value) => updateField("governingState", value)}
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
                </div>
              </div>

              {/* Policies */}
              <div className="border-b pb-4">
                <h4 className="font-medium mb-3">Policies</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="petsAllowed"
                        checked={formData.petsAllowed}
                        onCheckedChange={(checked) => updateField("petsAllowed", checked)}
                      />
                      <Label htmlFor="petsAllowed">Pets Allowed</Label>
                    </div>
                    {formData.petsAllowed && (
                      <Input
                        type="number"
                        value={formData.petDeposit}
                        onChange={(e) => updateField("petDeposit", e.target.value)}
                        placeholder="Pet deposit ($)"
                        className="w-32"
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="smokingAllowed"
                      checked={formData.smokingAllowed}
                      onCheckedChange={(checked) => updateField("smokingAllowed", checked)}
                    />
                    <Label htmlFor="smokingAllowed">Smoking Allowed (outdoor areas)</Label>
                  </div>
                  <div>
                    <Label className="mb-2 block">Utilities Included in Rent</Label>
                    <div className="flex flex-wrap gap-2">
                      {UTILITIES.map((utility) => (
                        <div key={utility} className="flex items-center space-x-2">
                          <Checkbox
                            id={utility}
                            checked={formData.utilitiesIncluded.includes(utility)}
                            onCheckedChange={() => toggleUtility(utility)}
                          />
                          <Label htmlFor={utility} className="text-sm">{utility}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="additionalTerms">Additional Terms</Label>
                <Textarea
                  id="additionalTerms"
                  value={formData.additionalTerms}
                  onChange={(e) => updateField("additionalTerms", e.target.value)}
                  placeholder="Any additional rules, restrictions, or agreements..."
                  className="min-h-[60px]"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  This is a template. State laws vary - have a lawyer review for compliance.
                </AlertDescription>
              </Alert>

              <Button
                onClick={generatePDF}
                disabled={status === "processing"}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 size-4" />
                {status === "processing" ? "Generating..." : "Generate Lease PDF"}
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
                Lease Preview
              </h3>

              <div className="p-4 bg-muted/50 rounded-lg space-y-4 text-sm">
                <div className="text-center font-semibold">RESIDENTIAL LEASE AGREEMENT</div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Landlord</p>
                    <p className="font-medium">{formData.landlordName || "[Landlord Name]"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tenant</p>
                    <p className="font-medium">{formData.tenantName || "[Tenant Name]"}</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">Property</p>
                  <p className="font-medium">{formData.propertyAddress || "[Property Address]"}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.propertyType} • {formData.bedrooms} bed • {formData.bathrooms} bath
                  </p>
                </div>

                <div className="border-t pt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Rent</p>
                    <p className="font-medium text-lg">
                      ${formData.monthlyRent ? parseFloat(formData.monthlyRent).toLocaleString() : "0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Security Deposit</p>
                    <p className="font-medium">
                      ${(formData.securityDeposit || formData.monthlyRent)
                        ? parseFloat(formData.securityDeposit || formData.monthlyRent).toLocaleString()
                        : "0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lease Term</p>
                    <p className="font-medium">
                      {formData.leaseTerm === "0" ? "Month-to-Month" : `${formData.leaseTerm} months`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-medium">{formData.leaseStartDate}</p>
                  </div>
                </div>

                <div className="border-t pt-3 flex gap-4">
                  <span className={`text-xs ${formData.petsAllowed ? "text-green-600" : "text-red-600"}`}>
                    {formData.petsAllowed ? "✓ Pets OK" : "✗ No Pets"}
                  </span>
                  <span className={`text-xs ${formData.smokingAllowed ? "text-green-600" : "text-red-600"}`}>
                    {formData.smokingAllowed ? "✓ Smoking OK" : "✗ No Smoking"}
                  </span>
                </div>

                {formData.utilitiesIncluded.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground">Utilities Included</p>
                    <p className="text-xs">{formData.utilitiesIncluded.join(", ")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Lease Agreement Generator" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
