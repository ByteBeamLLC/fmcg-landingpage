import { Bot, Zap, Settings, Send, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentConversionProps {
  toolName: string;
  variant?: "inline" | "section";
}

/**
 * Agent conversion component - shows benefits of ByteBeam Agent Builder
 * and CTAs to book a demo
 */
export function AgentConversion({ toolName, variant = "section" }: AgentConversionProps) {
  const agentBenefits = [
    {
      icon: Zap,
      title: "Build with tables, not code",
      description: "Define extraction rules, validation logic, and routing using an Excel-like interface.",
    },
    {
      icon: Settings,
      title: "Automate at scale",
      description: "Process thousands of documents automatically. Watch folders, emails, or APIs.",
    },
    {
      icon: Send,
      title: "Connect to your systems",
      description: "Route outputs to email, Slack, Google Drive, ERP, or any system via API.",
    },
  ];

  if (variant === "inline") {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Bot className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground mb-1">
              Need to process hundreds of documents?
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              ByteBeam Agent Builder: Build AI agents using tables—no code required.
            </p>
            <Button
              size="sm"
              variant="default"
              onClick={() => window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank")}
            >
              Book a Demo
              <ArrowRight className="size-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              ByteBeam Agent Builder
            </h3>
            <p className="text-sm text-muted-foreground">
              Build a {toolName.toLowerCase()} agent—no code required
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {agentBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-1.5 bg-primary/10 rounded shrink-0">
                <benefit.icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {benefit.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Button
            className="w-full"
            size="lg"
            onClick={() => window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank")}
          >
            <Bot className="size-4 mr-2" />
            Book a Demo
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            See how SMEs build AI agents using tables.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact CTA buttons for above-the-fold placement
 */
interface AgentCTAButtonsProps {
  onRunOnce?: () => void;
  isProcessing?: boolean;
}

export function AgentCTAButtons({ onRunOnce, isProcessing }: AgentCTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        className="flex-1"
        size="lg"
        onClick={() => window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank")}
      >
        <Bot className="size-4 mr-2" />
        Build as an Agent
      </Button>
      {onRunOnce && (
        <Button
          onClick={onRunOnce}
          disabled={isProcessing}
          className="flex-1"
          size="lg"
        >
          {isProcessing ? "Processing..." : "Run Once (Free)"}
        </Button>
      )}
    </div>
  );
}
