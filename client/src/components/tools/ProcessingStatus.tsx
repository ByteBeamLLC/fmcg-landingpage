import { motion } from "framer-motion";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessingState = "idle" | "processing" | "completed" | "error";

interface ProcessingStatusProps {
  status: ProcessingState;
  progress?: number; // 0-100
  message?: string;
  className?: string;
}

export default function ProcessingStatus({
  status,
  progress = 0,
  message,
  className,
}: ProcessingStatusProps) {
  if (status === "idle") return null;

  const statusConfig = {
    processing: {
      icon: Loader2,
      iconClass: "text-primary animate-spin",
      bgClass: "bg-primary/10 border-primary/20",
      defaultMessage: "Processing your file...",
    },
    completed: {
      icon: CheckCircle,
      iconClass: "text-green-600",
      bgClass: "bg-green-50 border-green-200",
      defaultMessage: "Processing complete!",
    },
    error: {
      icon: XCircle,
      iconClass: "text-destructive",
      bgClass: "bg-destructive/10 border-destructive/20",
      defaultMessage: "An error occurred. Please try again.",
    },
    idle: {
      icon: AlertCircle,
      iconClass: "text-muted-foreground",
      bgClass: "bg-muted border-muted",
      defaultMessage: "",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "rounded-xl p-4 border",
        config.bgClass,
        className
      )}
    >
      <div className="flex items-center gap-3">
        <IconComponent className={cn("size-5", config.iconClass)} />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {message || config.defaultMessage}
          </p>
          {status === "processing" && progress > 0 && (
            <div className="mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(progress)}% complete
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
