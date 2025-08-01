export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  messageType?: 'technical' | 'shakespeare' | 'other' | null;
  metadata?: any;
  createdAt: Date;
}

export interface ChatConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
