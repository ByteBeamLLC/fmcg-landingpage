import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "Tell me about ByteBeam",
  "How does pricing work?",
  "Request a demo",
  "Compliance requirements"
];

const botResponses: Record<string, string> = {
  "tell me about bytebeam": "ByteBeam is an AI-powered platform that automates FMCG label compliance and localization for products entering GCC markets. We've processed 10,000+ products and helped companies achieve 70% faster processing times. Would you like to schedule a demo?",
  "how does pricing work?": "Our pricing is customized based on your volume and specific needs. Typically, we offer packages for small (1-100 SKUs/month), medium (100-500 SKUs/month), and enterprise (500+ SKUs/month) scale operations. Would you like to discuss your requirements with our team?",
  "request a demo": "Great! I'd love to connect you with our team. You can book a demo directly using the calendar on this page, or fill out the contact form below. Which would you prefer?",
  "compliance requirements": "We cover all GCC compliance requirements including nutritional labeling, ingredient lists, allergen declarations, Halal certification detection, and bilingual Arabic-English labeling. Which specific category are you interested in? (Food & Beverage, Cosmetics, or General FMCG)",
  "default": "Thanks for your message! Our team typically responds within a few hours. In the meantime, you can schedule a demo or explore our case studies. Is there anything specific I can help you with?"
};

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm the ByteBeam assistant. How can I help you learn about our AI compliance platform?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const getBotResponse = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== "default" && normalizedInput.includes(key.replace(/ /g, ""))) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          size="lg"
          className={`rounded-full w-16 h-16 shadow-2xl ${
            isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-toggle-chat"
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border-2 border-border"
            data-testid="chat-window"
          >
            {/* Header */}
            <div className="gradient-overlay text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ByteBeam Assistant</h3>
                  <p className="text-sm text-white/80">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10" data-testid="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-white border-2 border-border text-foreground"
                    }`}
                    data-testid={`chat-message-${message.sender}`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground text-center">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-3 py-2 rounded-full transition-colors"
                        data-testid={`quick-reply-${index}`}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-2 border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  data-testid="button-send-message"
                >
                  <Send size={20} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Our team typically responds within a few hours
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
