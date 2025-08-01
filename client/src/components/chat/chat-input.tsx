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
    { icon: Code, text: "Code a website", prompt: "How do I code a website?" },
    { icon: Brain, text: "Build an AI model", prompt: "How do I build an AI model?" },
    { icon: Bot, text: "Analyze data", prompt: "How do I analyze data?" },
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
    <div className="bg-white border-t border-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask WhyBot anything..."
              className="min-h-12 max-h-32 resize-none border border-slate-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              disabled={disabled || isLoading}
            />
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading || disabled}
              className="absolute right-2 bottom-2 w-8 h-8 p-0 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleQuickAction(action.prompt)}
                className="px-3 py-1 text-sm text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors"
                disabled={disabled || isLoading}
              >
                <IconComponent className="h-3 w-3 mr-1" />
                {action.text}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
