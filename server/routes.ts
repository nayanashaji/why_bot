import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { generateChatResponse } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get conversations for current user (simplified - no auth for demo)
  app.get("/api/conversations", async (req, res) => {
    try {
      // For demo purposes, using a default user
      const conversations = await storage.getConversationsByUserId("demo-user");
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get messages for a conversation
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getMessagesByConversationId(id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Create a new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse({
        ...req.body,
        userId: "demo-user" // For demo purposes
      });
      
      const conversation = await storage.createConversation(validatedData);
      res.json(conversation);
    } catch (error) {
      res.status(400).json({ error: "Invalid conversation data" });
    }
  });

  // Send a message and get AI response
  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: "Message content is required" });
      }

      // Create user message
      const userMessage = await storage.createMessage({
        conversationId: id,
        role: "user",
        content: content,
        messageType: null,
        metadata: null
      });

      // Generate AI response
      const aiResponse = await generateChatResponse(content);
      
      // Create AI message
      const aiMessage = await storage.createMessage({
        conversationId: id,
        role: "assistant",
        content: aiResponse.content,
        messageType: aiResponse.messageType,
        metadata: aiResponse.metadata
      });

      // Update conversation timestamp
      await storage.updateConversation(id, { updatedAt: new Date() });

      res.json({
        userMessage,
        aiMessage
      });
    } catch (error) {
      console.error('Error in message creation:', error);
      res.status(500).json({ error: (error as Error).message || "Failed to process message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
