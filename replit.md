# WhyBot - AI Problem Solver

## Overview

WhyBot is a full-stack chat application that provides intelligent responses based on the type of user query. The application features a dual-mode AI assistant that delivers technical solutions with code examples for programming-related questions, and responds in the style of Shakespeare or other famous characters for general inquiries. Built with a modern React frontend and Express.js backend, the application provides a seamless chat experience with conversation management and real-time messaging.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful endpoints for conversations and messages with proper HTTP status codes
- **Development**: Hot reload with Vite middleware integration for seamless development experience

### Database Schema
- **Users**: Basic user management with username/password authentication structure
- **Conversations**: Thread-based chat sessions linked to users with timestamps
- **Messages**: Individual chat messages with role distinction (user/assistant), message types, and metadata storage
- **ORM**: Drizzle ORM configured for PostgreSQL with schema validation using Zod

### AI Integration
- **Provider**: OpenAI GPT-4o model for natural language processing
- **Classification System**: Automatic detection of technical vs. non-technical queries using confidence scoring
- **Dual Response Modes**: 
  - Technical mode provides code examples, implementation guidelines, and best practices
  - Character mode responds in Shakespeare or other famous character styles
- **Message Typing**: Categorization of responses (technical, shakespeare, other) with metadata storage

### Chat Features
- **Real-time Messaging**: Instant message exchange with typing indicators
- **Conversation Management**: Create, view, and manage multiple chat sessions
- **Quick Actions**: Predefined prompts for common technical and creative queries
- **Message Formatting**: Code syntax highlighting and proper text formatting
- **Copy Functionality**: Easy copying of messages and code blocks to clipboard

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for frontend framework and state management
- **UI Components**: Radix UI primitives with shadcn/ui for accessible component library
- **Styling**: Tailwind CSS, class-variance-authority, clsx for utility-first styling approach

### Backend Services
- **Database**: Neon Database (PostgreSQL) for production data persistence
- **ORM**: Drizzle ORM with PostgreSQL adapter for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL-backed session storage

### AI and External APIs
- **OpenAI**: GPT-4o model access for intelligent response generation
- **API Communication**: Native fetch API for HTTP requests between frontend and backend

### Development and Build Tools
- **TypeScript**: Full TypeScript support across frontend, backend, and shared schemas
- **Vite**: Development server and build tool with React plugin
- **ESBuild**: Backend bundling for production deployment
- **Development**: Replit-specific plugins for enhanced development experience in Replit environment

### Utility Libraries
- **Date Handling**: date-fns for date formatting and manipulation
- **Form Management**: React Hook Form with Hookform resolvers for form validation
- **Schema Validation**: Zod for runtime type checking and validation
- **Icons**: Lucide React for consistent iconography throughout the application