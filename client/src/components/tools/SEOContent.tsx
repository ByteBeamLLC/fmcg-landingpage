import { ReactNode } from "react";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * How It Works Section - 3-4 numbered steps
 */
interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  steps: Step[];
}

export function HowItWorks({ title = "How It Works", steps }: HowItWorksProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Features Section - Grid of features with icons
 */
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesProps {
  title?: string;
  features: Feature[];
}

export function Features({ title = "Features", features }: FeaturesProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-muted">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/**
 * Use Cases Section - Who uses this tool
 */
interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface UseCasesProps {
  title?: string;
  subtitle?: string;
  useCases: UseCase[];
}

export function UseCases({
  title = "Who Uses This Tool?",
  subtitle,
  useCases
}: UseCasesProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground mb-6">{subtitle}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {useCases.map((useCase, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <useCase.icon className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground">{useCase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * What You Get Section - Bullet list of outputs/benefits
 */
interface WhatYouGetProps {
  title?: string;
  items: string[];
}

export function WhatYouGet({ title = "What You Get", items }: WhatYouGetProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-500 shrink-0" />
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Technical Info Section - Shows underlying technology for credibility
 */
interface TechnicalInfoProps {
  title?: string;
  description: string;
  technologies?: string[];
}

export function TechnicalInfo({
  title = "How It Works Under the Hood",
  description,
  technologies
}: TechnicalInfoProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-background border rounded text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Supported Formats Section
 */
interface SupportedFormatsProps {
  title?: string;
  formats: { name: string; extensions: string[] }[];
}

export function SupportedFormats({
  title = "Supported File Formats",
  formats
}: SupportedFormatsProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {formats.map((format, index) => (
          <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
            <span className="font-medium text-foreground">{format.name}</span>
            <span className="text-xs text-muted-foreground">
              ({format.extensions.join(", ")})
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Alternative Methods Section - Shows you know the space
 */
interface AlternativeMethod {
  method: string;
  pros: string;
  cons: string;
}

interface AlternativeMethodsProps {
  title?: string;
  toolName: string;
  methods: AlternativeMethod[];
}

export function AlternativeMethods({
  title = "Alternative Methods",
  toolName,
  methods
}: AlternativeMethodsProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Besides {toolName}, here are other ways to accomplish this task:
      </p>
      <div className="space-y-3">
        {methods.map((method, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">{method.method}</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-green-600 font-medium">Pros: </span>
                <span className="text-muted-foreground">{method.pros}</span>
              </div>
              <div>
                <span className="text-red-600 font-medium">Cons: </span>
                <span className="text-muted-foreground">{method.cons}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
