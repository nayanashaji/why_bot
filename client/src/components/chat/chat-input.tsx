import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Code, Bot, Brain, Drama } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickActions = [
    { icon: Code, text: "AI Website Builder", prompt: "I need help building a website. Guide me to create an AI that can help with web development." },
    { icon: Brain, text: "AI Data Analyzer", prompt: "I have data that needs analysis. Help me build an AI application to analyze it." },
    { icon: Bot, text: "AI Chatbot Creator", prompt: "I want to create a chatbot. Guide me through building an AI chatbot application." },
    { icon: Drama, text: "Ask Shakespeare", prompt: "What is the meaning of life?" },
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your problem and I'll guide you to build an AI solution..."
              className="min-h-12 max-h-32 resize-none border border-slate-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm"
              disabled={disabled || isLoading}
            />
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading || disabled}
              className="absolute right-2 bottom-2 w-8 h-8 p-0 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-black rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleQuickAction(action.prompt)}
                className="px-4 py-2 text-sm text-primary-600 bg-white/70 backdrop-blur-sm hover:bg-primary-50 rounded-full transition-all duration-200 border border-primary-100 shadow-sm hover:shadow-md"
                disabled={disabled || isLoading}
              >
                <IconComponent className="h-3 w-3 mr-2" />
                {action.text}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
