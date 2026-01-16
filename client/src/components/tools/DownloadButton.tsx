import { useState } from "react";
import { Download, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  data: Blob | string | null;
  filename: string;
  mimeType?: string;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  children?: React.ReactNode;
}

export default function DownloadButton({
  data,
  filename,
  mimeType,
  disabled = false,
  className,
  variant = "default",
  size = "default",
  children,
}: DownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "success">("idle");

  const handleDownload = async () => {
    if (!data) return;

    setDownloadState("downloading");

    try {
      // Small delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      let blob: Blob;
      if (typeof data === "string") {
        blob = new Blob([data], { type: mimeType || "text/plain" });
      } else {
        blob = data;
      }

      saveAs(blob, filename);
      setDownloadState("success");

      // Reset after 2 seconds
      setTimeout(() => setDownloadState("idle"), 2000);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadState("idle");
    }
  };

  const isDisabled = disabled || !data || downloadState === "downloading";

  return (
    <Button
      onClick={handleDownload}
      disabled={isDisabled}
      variant={variant}
      size={size}
      className={cn(
        "relative min-w-[140px] transition-all",
        downloadState === "success" && "bg-green-600 hover:bg-green-700",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {downloadState === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Download className="size-4" />
            {children || "Download"}
          </motion.span>
        )}
        {downloadState === "downloading" && (
          <motion.span
            key="downloading"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="size-4 animate-spin" />
            Preparing...
          </motion.span>
        )}
        {downloadState === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Check className="size-4" />
            Downloaded!
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
