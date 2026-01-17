import { useState, useCallback, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  FileText,
  AlertCircle,
  Bot,
  User,
  Trash2,
  Zap,
  Shield,
  Lock,
  BookOpen,
  Globe,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Users,
  Scale,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  ToolFAQ,
  RelatedTools,
  HowItWorks,
  Features,
  UseCases,
  WhatYouGet,
  TechnicalInfo,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";
import { chatWithDocument, type ChatMessage } from "@/lib/tools/openrouter";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Your PDF",
    description: "Drop your PDF document. The AI extracts and reads all the content automatically.",
  },
  {
    title: "Ask Questions",
    description: "Type questions in natural language about anything in the document.",
  },
  {
    title: "Get Instant Answers",
    description: "AI responds with accurate answers based on your document's content.",
  },
  {
    title: "Have a Conversation",
    description: "Ask follow-up questions. The AI remembers context from your conversation.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Answers",
    description: "Get answers in seconds instead of scrolling through pages to find information.",
  },
  {
    icon: MessageCircle,
    title: "Natural Conversation",
    description: "Ask questions in plain English. The AI understands context and follow-ups.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "PDF text extraction happens in your browser. We never store your documents.",
  },
  {
    icon: BookOpen,
    title: "Any PDF Content",
    description: "Contracts, reports, manuals, research papers, articles—ask about any text-based PDF.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Chat about documents in English, Spanish, French, German, and more.",
  },
  {
    icon: Shield,
    title: "Accurate Responses",
    description: "AI answers are grounded in your document, not hallucinated from general knowledge.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Business Professionals",
    description: "Quickly find key points in contracts, proposals, and reports without reading everything.",
  },
  {
    icon: GraduationCap,
    title: "Students & Researchers",
    description: "Ask questions about research papers, textbooks, and academic articles for faster learning.",
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    description: "Chat with contracts and legal documents to find specific clauses and terms quickly.",
  },
  {
    icon: Users,
    title: "Teams & Collaboration",
    description: "Get quick answers from meeting notes, documentation, and shared resources.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Instant answers from your PDF content",
  "Natural language question interface",
  "Context-aware follow-up questions",
  "Conversation history during session",
  "Suggested questions to get started",
  "Support for long documents (20MB+)",
  "Multi-language document support",
  "Clear chat history option",
  "Mobile-friendly chat interface",
  "No document storage—privacy protected",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "PDF Chat uses advanced large language models (LLMs) combined with retrieval-augmented generation (RAG). Your PDF text is extracted locally using PDF.js, then sent to our AI only when you ask questions. The AI grounds all answers in your document content, reducing hallucinations and ensuring accuracy.",
  technologies: ["GPT-4 / Claude AI", "PDF.js", "RAG Architecture", "Context-Window Optimization", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does PDF Chat work?",
    answer:
      "Upload your PDF document, and our AI extracts and reads the content. Then you can ask questions in natural language, and the AI answers based specifically on your document's content—not general knowledge.",
  },
  {
    question: "What types of PDFs work best?",
    answer:
      "Text-based PDFs work best: contracts, reports, articles, manuals, research papers, and documentation. Scanned documents or image-heavy PDFs may have reduced accuracy since text extraction is needed first.",
  },
  {
    question: "Is my PDF data secure and private?",
    answer:
      "Yes. Text extraction happens locally in your browser—your file never leaves your device. The extracted text is sent to our AI only when you ask questions, over an encrypted connection. We don't store your documents.",
  },
  {
    question: "What questions can I ask about my PDF?",
    answer:
      "Ask anything about the document: summaries, specific details, explanations, definitions, comparisons, or clarifications. The AI understands context and can answer follow-up questions based on your conversation.",
  },
  {
    question: "Can I ask follow-up questions?",
    answer:
      "Yes! The AI remembers your conversation context. Ask follow-up questions like 'Can you explain that more?' or 'What about the payment terms mentioned earlier?' without repeating context.",
  },
  {
    question: "What's the maximum PDF size supported?",
    answer:
      "You can upload PDFs up to 20MB. For very long documents, the AI prioritizes the most relevant sections when answering questions. Most business documents, contracts, and reports work well.",
  },
  {
    question: "Is there a limit on questions?",
    answer:
      "Free users can ask up to 10 questions per hour across all AI tools. For unlimited access, team features, and batch processing, explore ByteBeam's document automation platform.",
  },
  {
    question: "Can I chat with multiple PDFs?",
    answer:
      "Currently, you can chat with one PDF at a time. Upload a new PDF to start a fresh conversation with different content. Multi-document chat is available on the enterprise platform.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "AI Document Summarizer",
    description: "Get quick summaries of documents",
    href: "/tools/ai-summarizer",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "AI File Search",
    description: "Search across multiple documents",
    href: "/tools/file-search",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "Contract Analyzer",
    description: "Analyze contracts with AI",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Legal Summarizer",
    description: "Summarize legal documents",
    href: "/tools/legal-summarizer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "Image to Text",
    description: "OCR for images",
    href: "/tools/image-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function PDFChat() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [documentText, setDocumentText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setMessages([]);
      setDocumentText("");
      setError(null);
      setStatus("processing");

      try {
        const text = await extractTextFromPDF(file);
        setDocumentText(text);
        setStatus("completed");

        // Add welcome message
        setMessages([
          {
            role: "assistant",
            content: `I've loaded your document "${file.name}" (${Math.round(text.length / 1000)}K characters). What would you like to know about it?`,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        console.error("PDF extraction error:", err);
        setError("Failed to extract text from PDF. Please try another file.");
        setStatus("error");
      }
    } else {
      setSelectedFile(null);
      setDocumentText("");
      setMessages([]);
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !documentText || isAsking) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsAsking(true);
    setError(null);

    try {
      // Build conversation history for context
      const conversationHistory: ChatMessage[] = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await chatWithDocument({
        documentText,
        question: userMessage.content,
        conversationHistory,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err instanceof Error ? err.message : "Failed to get response");

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  }, [inputMessage, documentText, messages, isAsking]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Chat cleared. What would you like to know about "${selectedFile?.name}"?`,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ToolLayout
      title="Chat with PDF - AI PDF Q&A"
      description="Chat with your PDF documents using AI. Ask questions, get summaries, find specific information. Free PDF Q&A tool for contracts, reports, manuals, and research papers."
      category="Search, Chat & Summarization"
      keywords="chat with PDF, ask PDF questions, PDF AI, talk to PDF, PDF Q&A, document chat, free PDF chat, PDF chatbot, AI PDF reader, ask questions about PDF"
      isAIPowered={true}
      toolContext="pdf-chat"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                }}
                maxSize={20 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload PDF document (max 20MB)"
              />

              {status === "processing" && (
                <ProcessingStatus
                  status="processing"
                  message="Extracting text from PDF..."
                />
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {documentText && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-primary" />
                      <span className="text-sm font-medium">{selectedFile?.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(documentText.length / 1000)}K chars
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {documentText && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2">Suggested Questions</h3>
                <div className="space-y-2">
                  {[
                    "What is this document about?",
                    "What are the key points?",
                    "Summarize the main findings",
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => setInputMessage(suggestion)}
                      disabled={isAsking}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="size-4" />
                Chat with PDF
              </h3>
              {messages.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-muted-foreground"
                >
                  <Trash2 className="size-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <ScrollArea className="flex-1 p-4">
              {!documentText ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a PDF to start chatting</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="size-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.role === "user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User className="size-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isAsking && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="size-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                          <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={documentText ? "Ask a question about your PDF..." : "Upload a PDF first"}
                  disabled={!documentText || isAsking}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!documentText || !inputMessage.trim() || isAsking}
                  size="icon"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How PDF Chat Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="PDF Chat Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses PDF Chat?"
        subtitle="From business professionals reviewing contracts to students researching papers, AI-powered document Q&A saves hours of reading."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What You Get with PDF Chat"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Advanced AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="PDF Chat" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
