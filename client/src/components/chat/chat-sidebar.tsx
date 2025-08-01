import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatConversation } from "@/types/chat";
import { Bot, Plus, User, Settings, MoreHorizontal } from "lucide-react";

interface ChatSidebarProps {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (conversation: ChatConversation) => void;
  isCreatingConversation: boolean;
}

export default function ChatSidebar({
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
  isCreatingConversation,
}: ChatSidebarProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 24) {
      return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Yesterday';
    } else {
      return new Date(date).toLocaleDateString();
    }
  };

  return (
    <div className="w-full bg-white shadow-xl border-r border-slate-200 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-violet-500 rounded-xl flex items-center justify-center">
            <Bot className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">WhyBot</h1>
            <p className="text-xs text-slate-500">AI Problem Solver</p>
          </div>
        </div>
      </div>
      
      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          disabled={isCreatingConversation}
          className="w-full bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          <span className="font-medium">New Chat</span>
        </Button>
      </div>
      
      {/* Chat History */}
      <ScrollArea className="flex-1 px-4 custom-scrollbar">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                currentConversationId === conversation.id
                  ? 'bg-primary-50 border border-primary-200'
                  : 'hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {conversation.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatTime(conversation.updatedAt)}
                  </p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
          
          {conversations.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start a new chat to get started</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-200">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full flex items-center justify-center">
            <User className="text-white text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">Demo User</p>
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>
          <Settings className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}
