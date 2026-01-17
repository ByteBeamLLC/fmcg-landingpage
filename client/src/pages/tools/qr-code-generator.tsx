import { useState, useCallback, useRef, useEffect } from "react";
import { QrCode, Download, Link, Mail, Phone, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCode from "qrcode";
import {
  ToolLayout,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";

const FAQS = [
  {
    question: "How do I create a QR code?",
    answer:
      "Enter your content (URL, text, email, phone, or WiFi details) in the form, and a QR code will be generated instantly. Download it as a PNG image.",
  },
  {
    question: "Is this QR code generator free?",
    answer:
      "Yes! Generate unlimited QR codes for free. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "What types of QR codes can I create?",
    answer:
      "You can create QR codes for URLs, plain text, email addresses, phone numbers, and WiFi network credentials.",
  },
  {
    question: "What size are the generated QR codes?",
    answer:
      "QR codes are generated at 400x400 pixels by default, which is suitable for both digital use and printing up to 3-4 inches.",
  },
  {
    question: "Will the QR codes work forever?",
    answer:
      "Yes! The QR codes contain the data directly (static QR codes). They don't expire and don't require our service to work.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100% secure. All QR code generation happens in your browser. Your data never leaves your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "QR Code Reader",
    description: "Scan and decode QR codes",
    href: "/tools/qr-code-reader",
    icon: QrCode,
    category: "QR & Barcode",
  },
];

type QRType = "url" | "text" | "email" | "phone" | "wifi";

export default function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [phone, setPhone] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRContent = useCallback(() => {
    switch (qrType) {
      case "url":
      case "text":
        return content;
      case "email":
        return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
      case "phone":
        return `tel:${phone}`;
      case "wifi":
        return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
      default:
        return "";
    }
  }, [qrType, content, email, phone, wifi]);

  const generateQR = useCallback(async () => {
    const qrContent = generateQRContent();
    if (!qrContent.trim()) {
      setQrDataUrl(null);
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(qrContent, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("QR generation error:", error);
      setQrDataUrl(null);
    }
  }, [generateQRContent]);

  useEffect(() => {
    const timeout = setTimeout(generateQR, 300);
    return () => clearTimeout(timeout);
  }, [generateQR]);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrDataUrl;
    link.click();
  }, [qrDataUrl]);

  return (
    <ToolLayout
      title="QR Code Generator - Create QR Codes Free Online"
      description="Generate QR codes for free online. Create QR codes for URLs, text, email, phone, WiFi. No signup, instant download, works on any device."
      category="QR & Barcode"
      keywords="qr code generator, create qr code, qr code maker, free qr code generator, qr code online, generate qr code, make qr code"
      toolContext="qr-code-generator"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Tabs value={qrType} onValueChange={(v) => setQrType(v as QRType)}>
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="url" className="gap-1">
                    <Link className="size-3" />
                    <span className="hidden sm:inline">URL</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="gap-1">
                    <QrCode className="size-3" />
                    <span className="hidden sm:inline">Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="gap-1">
                    <Mail className="size-3" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="gap-1">
                    <Phone className="size-3" />
                    <span className="hidden sm:inline">Phone</span>
                  </TabsTrigger>
                  <TabsTrigger value="wifi" className="gap-1">
                    <Wifi className="size-3" />
                    <span className="hidden sm:inline">WiFi</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Website URL</Label>
                    <Input
                      placeholder="https://example.com"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Text Content</Label>
                    <Input
                      placeholder="Enter any text..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      placeholder="email@example.com"
                      value={email.to}
                      onChange={(e) => setEmail({ ...email, to: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject (optional)</Label>
                    <Input
                      placeholder="Email subject"
                      value={email.subject}
                      onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Body (optional)</Label>
                    <Input
                      placeholder="Email body"
                      value={email.body}
                      onChange={(e) => setEmail({ ...email, body: e.target.value })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="wifi" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Network Name (SSID)</Label>
                    <Input
                      placeholder="My WiFi Network"
                      value={wifi.ssid}
                      onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="WiFi password"
                      value={wifi.password}
                      onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Encryption</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={wifi.encryption}
                      onChange={(e) => setWifi({ ...wifi, encryption: e.target.value })}
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {qrDataUrl ? (
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img src={qrDataUrl} alt="QR Code" className="max-w-[280px]" />
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                  <Button onClick={handleDownload} size="lg" className="w-full max-w-xs">
                    <Download className="mr-2 size-4" />
                    Download QR Code
                  </Button>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="size-24 mx-auto mb-4 opacity-20" />
                  <p>Enter content to generate QR code</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="QR Code Generator" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
