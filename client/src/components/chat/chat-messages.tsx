import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/types/chat";
import MessageBubble from "@/components/chat/message-bubble";
import TypingIndicator from "@/components/chat/typing-indicator";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
}

export default function ChatMessages({ messages, isLoading, isTyping }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4 py-6 custom-scrollbar" ref={scrollRef}>
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.length === 0 ? (
          // Welcome Message
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Bot className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to WhyBot</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Describe any problem and I'll guide you to build an AI application that solves it! 
              For technical problems, I'll provide AI development guides. For everything else, 
              I'll respond in the style of Shakespeare and other famous characters.
            </p>
          </div>
        ) : (
          // Messages
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}
