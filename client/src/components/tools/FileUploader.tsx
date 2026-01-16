import { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Upload, X, FileText, Image, File } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  file: File;
  preview?: string;
}

interface FileUploaderProps {
  accept?: Accept;
  maxSize?: number; // in bytes
  multiple?: boolean;
  maxFiles?: number;
  onFilesSelected: (files: File[]) => void;
  className?: string;
  description?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (file: File) => {
  if (file.type.startsWith("image/")) return Image;
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) return FileText;
  return File;
};

export default function FileUploader({
  accept,
  maxSize = 25 * 1024 * 1024, // 25MB default
  multiple = false,
  maxFiles = 10,
  onFilesSelected,
  className,
  description,
}: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File too large. Maximum size is ${formatFileSize(maxSize)}`);
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Invalid file type. Please upload a supported file format.");
        } else {
          setError("File could not be uploaded. Please try again.");
        }
        return;
      }

      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      const updatedFiles = multiple ? [...files, ...newFiles].slice(0, maxFiles) : newFiles;
      setFiles(updatedFiles);
      onFilesSelected(updatedFiles.map((f) => f.file));
    },
    [files, maxSize, multiple, maxFiles, onFilesSelected]
  );

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles.map((f) => f.file));
  };

  const clearAll = () => {
    files.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
    onFilesSelected([]);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    maxFiles,
  });

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer",
          "hover:border-primary hover:bg-primary/5",
          isDragActive
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-muted-foreground/25 bg-muted/30",
          error && "border-destructive bg-destructive/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <motion.div
            animate={{ scale: isDragActive ? 1.1 : 1 }}
            className={cn(
              "p-4 rounded-full",
              isDragActive ? "bg-primary/20" : "bg-muted"
            )}
          >
            <Upload
              className={cn(
                "size-8",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )}
            />
          </motion.div>
          <div>
            <p className="text-lg font-medium text-foreground">
              {isDragActive ? "Drop your files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse from your device
            </p>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Maximum file size: {formatFileSize(maxSize)}
            {multiple && ` | Up to ${maxFiles} files`}
          </p>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                {files.length} file{files.length > 1 ? "s" : ""} selected
              </p>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear all
              </Button>
            </div>
            <div className="space-y-2">
              {files.map((uploadedFile, index) => {
                const IconComponent = getFileIcon(uploadedFile.file);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    {uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview}
                        alt={uploadedFile.file.name}
                        className="size-10 rounded object-cover"
                      />
                    ) : (
                      <div className="size-10 rounded bg-muted flex items-center justify-center">
                        <IconComponent className="size-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => removeFile(index)}
                    >
                      <X className="size-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { formatFileSize };
