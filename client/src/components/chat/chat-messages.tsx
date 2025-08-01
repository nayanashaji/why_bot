import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/types/chat";
import MessageBubble from "@/components/chat/message-bubble";
import TypingIndicator from "@/components/chat/typing-indicator";
import Logo from "@/components/ui/logo";
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
            <div className="mx-auto mb-6">
              <Logo size="lg" className="mx-auto" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Welcome to WhyBot
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed">
                🚀 Describe any problem and I'll guide you to build an AI application that solves it!
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-primary-600 font-semibold mb-2">Technical Problems</h3>
                  <p className="text-sm text-slate-600">Get AI development guides with code examples and architecture suggestions</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-amber-600 font-semibold mb-2">General Queries</h3>
                  <p className="text-sm text-slate-600">Receive responses in the style of Shakespeare and other famous characters</p>
                </div>
              </div>
            </div>
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
