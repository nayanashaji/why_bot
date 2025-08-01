import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessage, ChatConversation } from "@/types/chat";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Chat() {
  const { id: conversationId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId || null);
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  // Fetch conversations
  const { data: conversations = [] } = useQuery<ChatConversation[]>({
    queryKey: ["/api/conversations"],
  });

  // Fetch messages for current conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/conversations", currentConversationId, "messages"],
    enabled: !!currentConversationId,
  });

  // Create new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await apiRequest("POST", "/api/conversations", { title });
      return response.json();
    },
    onSuccess: (newConversation) => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
      setCurrentConversationId(newConversation.id);
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ conversationId, content }: { conversationId: string; content: string }) => {
      const response = await apiRequest("POST", `/api/conversations/${conversationId}/messages`, { content });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations", currentConversationId, "messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  const handleNewChat = () => {
    const title = `New Chat ${new Date().toLocaleTimeString()}`;
    createConversationMutation.mutate(title);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversationId) {
      // Create new conversation first
      const title = content.length > 50 ? content.substring(0, 50) + "..." : content;
      const newConversation = await createConversationMutation.mutateAsync(title);
      await sendMessageMutation.mutateAsync({ conversationId: newConversation.id, content });
    } else {
      await sendMessageMutation.mutateAsync({ conversationId: currentConversationId, content });
    }
  };

  const handleSelectConversation = (conversation: ChatConversation) => {
    setCurrentConversationId(conversation.id);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (conversationId && conversationId !== currentConversationId) {
      setCurrentConversationId(conversationId);
    }
  }, [conversationId]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className={`w-64 flex-shrink-0 hidden md:flex ${sidebarOpen ? 'flex' : 'hidden'} md:flex`}>
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          isCreatingConversation={createConversationMutation.isPending}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full">
            <ChatSidebar
              conversations={conversations}
              currentConversationId={currentConversationId}
              onNewChat={handleNewChat}
              onSelectConversation={handleSelectConversation}
              isCreatingConversation={createConversationMutation.isPending}
            />
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-slate-800">WhyBot</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              disabled={createConversationMutation.isPending}
            >
              <span className="text-lg">+</span>
            </Button>
          </div>
        )}

        {/* Messages */}
        <ChatMessages 
          messages={messages}
          isLoading={messagesLoading}
          isTyping={sendMessageMutation.isPending}
        />

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={sendMessageMutation.isPending}
          disabled={!currentConversationId && !createConversationMutation.isPending}
        />
      </div>
    </div>
  );
}
