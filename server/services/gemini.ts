import { GoogleGenAI } from "@google/genai";

// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ChatResponse {
  content: string;
  messageType: 'technical' | 'shakespeare' | 'other';
  metadata?: any;
}

export async function generateChatResponse(userMessage: string): Promise<ChatResponse> {
  try {
    // First, classify if the message is technical or not
    const classificationResponse = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: `You are a classifier that determines if a user's question is technical (programming, coding, software development, AI/ML, data science, algorithms, etc.) or non-technical. 
        Respond with JSON in this format: { "isTechnical": boolean, "confidence": number }
        confidence should be between 0 and 1.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            isTechnical: { type: "boolean" },
            confidence: { type: "number" },
          },
          required: ["isTechnical", "confidence"],
        },
      },
      contents: userMessage,
    });

    const rawJson = classificationResponse.text;
    const classification = rawJson ? JSON.parse(rawJson) : { isTechnical: false, confidence: 0.5 };

    if (classification.isTechnical && classification.confidence > 0.6) {
      // Generate guide for creating an AI application to solve the problem
      const technicalResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `You are WhyBot, an AI development guide. Instead of directly solving technical problems, you guide users to create their own AI applications that will solve the problem. 

          When users ask technical questions, provide:
          1. A breakdown of what type of AI application they should build
          2. Step-by-step development guide with code examples
          3. Recommended AI models, APIs, and frameworks to use
          4. Architecture suggestions for their AI solution
          5. Implementation guidelines for building the AI app
          
          Always frame your response as "Here's how to build an AI that will solve this problem for you" rather than directly answering their question.
          
          Format your response as a comprehensive guide to building an AI solution with code examples and architectural guidance.`
        },
        contents: userMessage,
      });

      return {
        content: technicalResponse.text || "I apologize, but I couldn't generate a technical response.",
        messageType: 'technical',
        metadata: { language: 'mixed', classification: classification }
      };
    } else {
      // Generate Shakespearean or famous character response
      const characters = [
        "William Shakespeare",
        "Oscar Wilde", 
        "Mark Twain",
        "Winston Churchill",
        "Albert Einstein",
        "Maya Angelou"
      ];
      
      const selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
      
      const characterResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `You are WhyBot responding as ${selectedCharacter}. Answer the user's question in the distinctive voice, style, and wisdom of ${selectedCharacter}. 
          Capture their unique way of speaking, their philosophy, and their personality. Make it authentic to how they would actually respond.
          Keep responses thoughtful and engaging, typically 2-4 sentences unless the question requires more depth.`
        },
        contents: userMessage,
      });

      return {
        content: characterResponse.text || "Verily, I find myself at a loss for words, good sir or madam.",
        messageType: selectedCharacter.toLowerCase().includes('shakespeare') ? 'shakespeare' : 'other',
        metadata: { character: selectedCharacter, classification: classification }
      };
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error("I apologize, but I'm having trouble processing your request right now. Please try again.");
  }
}