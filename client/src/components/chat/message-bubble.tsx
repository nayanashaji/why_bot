import { ChatMessage } from "@/types/chat";
import { Copy, Heart, TheaterIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { extractCodeBlocks } from "@/lib/messageUtils";
import Logo from "@/components/ui/logo";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { toast } = useToast();

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };



  if (message.role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-2xl">
          <div className="bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-2xl rounded-tr-md px-6 py-4 shadow-lg border border-white/10">
            <p className="leading-relaxed whitespace-pre-wrap text-white/95">{message.content}</p>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-xs text-slate-500">{formatTime(message.createdAt)}</span>
          </div>
        </div>
      </div>
    );
  }

  const contentParts = extractCodeBlocks(message.content);
  const isShakespeare = message.messageType === 'shakespeare';
  const isTechnical = message.messageType === 'technical';
  const character = message.metadata?.character;

  return (
    <div className="flex items-start space-x-4 animate-slide-up">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isShakespeare 
          ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
          : 'bg-gradient-to-r from-primary-500 to-violet-500'
      }`}>
        {isShakespeare ? (
          <TheaterIcon className="text-white text-sm" />
        ) : (
          <Logo size="sm" className="w-6 h-6" />
        )}
      </div>
      
      <div className="flex-1 max-w-2xl">
        <div className={`rounded-2xl rounded-tl-md px-6 py-4 shadow-lg border backdrop-blur-sm ${
          isShakespeare 
            ? 'bg-gradient-to-r from-amber-50/90 to-orange-50/90 border-amber-200' 
            : 'bg-white/90 border-slate-200'
        }`}>
          {/* Message Type Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              isTechnical 
                ? 'text-primary-600 bg-primary-50'
                : isShakespeare 
                ? 'text-amber-700 bg-amber-100'
                : 'text-slate-600 bg-slate-100'
            }`}>
              {isTechnical ? 'AI Development Guide' : character || 'Assistant'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(message.content)}
              className={`h-8 w-8 p-0 ${
                isShakespeare 
                  ? 'text-amber-600 hover:text-amber-800' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {isShakespeare ? <Heart className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            {contentParts.map((part, index) => {
              if (part.type === 'code') {
                return (
                  <div key={index} className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-emerald-400 text-sm font-medium capitalize">
                        {part.language}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(part.content)}
                        className="text-slate-400 hover:text-white text-sm h-6 px-2"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-sm text-slate-300 overflow-x-auto">
                      <code>{part.content}</code>
                    </pre>
                  </div>
                );
              } else {
                const text = part.content.trim();
                if (!text) return null;
                
                return (
                  <div key={index} className={`${
                    isShakespeare ? 'text-slate-800 leading-relaxed italic text-lg' : 'text-slate-700'
                  }`}>
                    {text.split('\n').map((line, lineIndex) => {
                      if (line.startsWith('•') || line.match(/^\d+\./)) {
                        return (
                          <div key={lineIndex} className="flex items-start space-x-2 my-2">
                            <span className="text-emerald-500 mt-1 font-bold">•</span>
                            <span>{line.replace(/^[•\d\.]\s*/, '')}</span>
                          </div>
                        );
                      }
                      return <p key={lineIndex} className="mb-2">{line}</p>;
                    })}
                  </div>
                );
              }
            })}
            
            {/* Character Attribution for Shakespeare */}
            {isShakespeare && character && (
              <div className="mt-4 text-right">
                <cite className="text-amber-700 font-medium">
                  — {character} (as interpreted by WhyBot)
                </cite>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-start mt-2">
          <span className="text-xs text-slate-500">{formatTime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
