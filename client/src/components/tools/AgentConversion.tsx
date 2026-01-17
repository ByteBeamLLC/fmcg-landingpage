import { Bot, Zap, Settings, Send, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentConversionProps {
  toolName: string;
  variant?: "inline" | "section";
}

/**
 * Agent conversion component - shows "What an agent adds" benefits
 * and CTAs to build an agent from this tool
 */
export function AgentConversion({ toolName, variant = "section" }: AgentConversionProps) {
  const agentBenefits = [
    {
      icon: Zap,
      title: "Runs automatically on new docs",
      description: "Watch folders, email attachments, or API uploads. No manual work.",
    },
    {
      icon: Settings,
      title: "Applies your playbook & rules",
      description: "Custom validation, extraction fields, approval workflows.",
    },
    {
      icon: Send,
      title: "Routes outputs to your systems",
      description: "Email, Slack, Google Drive, your CRM—wherever you need results.",
    },
  ];

  if (variant === "inline") {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Bot className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground mb-1">
              Need to run this on many documents?
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Turn this into an automated agent that processes documents 24/7.
            </p>
            <Link href="/about">
              <Button size="sm" variant="default">
                Build an Agent
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </Link>
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
              What an Agent Adds
            </h3>
            <p className="text-sm text-muted-foreground">
              Automate {toolName.toLowerCase()} at scale
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
          <Link href="/about" className="block">
            <Button className="w-full" size="lg">
              <Bot className="size-4 mr-2" />
              Start from This Agent Template
            </Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground">
            No code required. Deploy in minutes.
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
      <Link href="/about" className="flex-1">
        <Button variant="outline" className="w-full" size="lg">
          <Bot className="size-4 mr-2" />
          Turn This Into an Agent
        </Button>
      </Link>
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
