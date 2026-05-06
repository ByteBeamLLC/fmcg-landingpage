import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Upload,
  X,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  CalendarClock,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  BOOK_DEMO_URL,
  DEFAULT_FREE_USES,
  type SfdaToolInput,
} from "@/lib/sfda/tools";

interface UploadedFile {
  inputId: string;
  file: File;
}

type DemoState = "idle" | "processing" | "done" | "blocked" | "error";

interface SfdaToolDemoProps {
  toolSlug: string;
  toolName: string;
  ctaLabel: string;
  inputs: SfdaToolInput[];
  outputLabel: string;
  outputFormat: string;
  freeUses?: number;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatAccept(accept: string): string {
  return accept
    .split(",")
    .map((s) => s.trim().replace(/^\./, "").toUpperCase())
    .join(" · ");
}

function getStorageKey(slug: string): string {
  return `bytebeam_sfda_demo_used_${slug}`;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve(base64);
      } else {
        reject(new Error("Unexpected reader result"));
      }
    };
    reader.onerror = () => reject(reader.error || new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function endpointForSlug(slug: string): string {
  // Maps registry slug → server route
  return `/api/tools/sfda/${slug}`;
}

export default function SfdaToolDemo({
  toolSlug,
  toolName,
  ctaLabel,
  inputs,
  outputLabel,
  outputFormat,
  freeUses = DEFAULT_FREE_USES,
}: SfdaToolDemoProps) {
  const [state, setState] = useState<DemoState>("idle");
  const [files, setFiles] = useState<Record<string, UploadedFile>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [resultMarkdown, setResultMarkdown] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(getStorageKey(toolSlug));
      const count = raw ? parseInt(raw, 10) : 0;
      setUsageCount(count);
      if (count >= freeUses) {
        setState("blocked");
      }
    } catch {
      // localStorage unavailable
    }
  }, [toolSlug, freeUses]);

  const handleFile = useCallback((input: SfdaToolInput, file: File) => {
    if (file.size > input.maxSize) {
      setErrors((prev) => ({
        ...prev,
        [input.id]: `File exceeds ${Math.round(input.maxSize / (1024 * 1024))} MB limit.`,
      }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[input.id];
      return next;
    });
    setFiles((prev) => ({
      ...prev,
      [input.id]: { inputId: input.id, file },
    }));
  }, []);

  const removeFile = useCallback((inputId: string) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[inputId];
      return next;
    });
  }, []);

  const requiredInputs = inputs.filter((i) => i.required);
  const allRequiredUploaded = requiredInputs.every((i) => files[i.id]);
  const uploadedCount = Object.keys(files).length;

  const handleSubmit = useCallback(async () => {
    if (!allRequiredUploaded || state === "processing") return;
    setState("processing");
    setErrorMessage("");
    setResultMarkdown("");

    try {
      // Encode every uploaded file (required + optional) as base64
      const payload = await Promise.all(
        Object.values(files).map(async (uf) => ({
          inputId: uf.inputId,
          fileName: uf.file.name,
          mimeType: uf.file.type || "application/octet-stream",
          base64: await fileToBase64(uf.file),
        }))
      );

      const resp = await fetch(endpointForSlug(toolSlug), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: payload }),
      });

      if (!resp.ok) {
        let msg = `Request failed (${resp.status})`;
        try {
          const data = await resp.json();
          if (data?.error) msg = data.error;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      const data = await resp.json();
      const md = typeof data?.markdown === "string" ? data.markdown : "";
      if (!md) throw new Error("Empty response from AI service.");

      setResultMarkdown(md);
      try {
        const next = usageCount + 1;
        localStorage.setItem(getStorageKey(toolSlug), String(next));
        setUsageCount(next);
      } catch {
        // ignore
      }
      setState("done");
    } catch (err) {
      console.error("SFDA tool error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setState("error");
    }
  }, [allRequiredUploaded, files, state, toolSlug, usageCount]);

  const handleResetForRetry = useCallback(() => {
    setFiles({});
    setErrors({});
    setResultMarkdown("");
    setErrorMessage("");
    setState(usageCount >= freeUses ? "blocked" : "idle");
  }, [usageCount, freeUses]);

  const handleCopy = useCallback(async () => {
    if (!resultMarkdown) return;
    try {
      await navigator.clipboard.writeText(resultMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }, [resultMarkdown]);

  const handleDownload = useCallback(() => {
    if (!resultMarkdown) return;
    const blob = new Blob([resultMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolSlug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [resultMarkdown, toolSlug]);

  // ─── Blocked ───
  if (state === "blocked") {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
              <CalendarClock className="size-7" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Free run used
            </p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              You've already tried {toolName}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Free preview is one run per tool. Want to run on your full
              portfolio, integrate with your QMS, and discuss licensing for
              your team? Walk through your output with us in a 30-min call.
            </p>
            <Button size="lg" asChild>
              <a href={BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                <CalendarClock className="size-4 mr-2" />
                Book a 30-min demo
                <ArrowRight className="size-4 ml-2" />
              </a>
            </Button>
            <p className="mt-4 text-[11px] text-muted-foreground">
              Sales-led license · Per-team pricing discussed on the call
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ─── Done — show real output ───
  if (state === "done") {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-5 border-b">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Preview ready
                </p>
                <h3 className="text-base font-semibold">{toolName} — output</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                <Download className="size-4" />
                .md
              </Button>
            </div>
          </div>

          <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h2:mt-8 prose-h3:mt-6 prose-p:leading-relaxed prose-li:my-1 prose-hr:my-6 prose-strong:text-foreground bg-muted/30 rounded-lg p-5 sm:p-6 max-h-[600px] overflow-auto border">
            <ReactMarkdown>{resultMarkdown}</ReactMarkdown>
          </div>

          <div className="mt-6 rounded-xl border bg-primary/5 p-5">
            <h4 className="font-semibold text-sm mb-1.5 inline-flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary" />
              Want this on your full portfolio?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              The free preview runs the simplified pipeline on one document.
              The full version integrates the SFDA Module 1.3 template + GCC
              Guidance v3.1, returns editable {outputFormat}, and runs across
              your portfolio with QMS integration. Walk through your output
              with our team and license for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="default" asChild>
                <a href={BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  <CalendarClock className="size-4 mr-2" />
                  Book a 30-min walkthrough
                  <ArrowRight className="size-4 ml-2" />
                </a>
              </Button>
              <Button size="default" variant="outline" onClick={handleResetForRetry}>
                Done
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              {Math.max(0, freeUses - usageCount)} free run
              {freeUses - usageCount === 1 ? "" : "s"} remaining
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ─── Idle / Processing / Error — file upload UI ───
  const isProcessing = state === "processing";
  const isError = state === "error";

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Try it free · {freeUses} run included
            </p>
            <h3 className="text-lg font-semibold mt-0.5">{toolName}</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
            Output: {outputFormat}
          </span>
        </div>

        {isError && errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <fieldset disabled={isProcessing} className="space-y-4">
          {inputs.map((input) => {
            const uploaded = files[input.id];
            const error = errors[input.id];
            const isDragOver = dragOverId === input.id;

            return (
              <div key={input.id}>
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-sm font-medium">{input.label}</label>
                  {!input.required && (
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {input.description}
                </p>

                {uploaded ? (
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {uploaded.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploaded.file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() => removeFile(input.id)}
                      aria-label={`Remove ${input.label}`}
                      disabled={isProcessing}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-6 transition-colors cursor-pointer",
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-muted/30",
                      isProcessing && "opacity-60 pointer-events-none"
                    )}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverId(input.id);
                    }}
                    onDragLeave={() => setDragOverId(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverId(null);
                      const file = e.dataTransfer.files[0];
                      if (file) handleFile(input, file);
                    }}
                    onClick={() => fileRefs.current[input.id]?.click()}
                  >
                    <Upload className="size-6 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or{" "}
                      <span className="text-primary font-medium">browse</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatAccept(input.accept)} · Max{" "}
                      {Math.round(input.maxSize / (1024 * 1024))} MB
                    </p>
                    <input
                      ref={(el) => {
                        fileRefs.current[input.id] = el;
                      }}
                      type="file"
                      accept={input.accept}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(input, file);
                        e.target.value = "";
                      }}
                    />
                  </div>
                )}

                {error && (
                  <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </fieldset>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 border-t pt-5">
          <div className="flex-1 text-xs text-muted-foreground">
            {isProcessing ? (
              <span className="inline-flex items-center gap-1.5 text-primary">
                <Loader2 className="size-3.5 animate-spin" />
                Running on your documents — typically 30–90 seconds…
              </span>
            ) : allRequiredUploaded ? (
              <span className="inline-flex items-center gap-1.5 text-primary">
                <CheckCircle2 className="size-3.5" />
                {uploadedCount} of {inputs.length} files ready
              </span>
            ) : (
              <span>
                {uploadedCount} of {requiredInputs.length} required uploaded
              </span>
            )}
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={!allRequiredUploaded || isProcessing}
            onClick={handleSubmit}
          >
            {isProcessing ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Sparkles className="size-4 mr-2" />
                {ctaLabel}
                <ArrowRight className="size-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground text-center">
          Files processed in your workspace, not stored externally · One free
          run per tool
        </p>
      </CardContent>
    </Card>
  );
}
