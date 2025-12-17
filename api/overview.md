# Backend API for Physical AI Textbook

## Overview

The backend API provides services for the RAG chatbot, authentication, personalization, and internationalization features. Built with FastAPI, it serves as the central hub for all dynamic functionality in the textbook.

## Architecture

The API is built using FastAPI for high performance and excellent documentation capabilities. It connects to:
- Neon Serverless Postgres database for user data and content metadata
- Qdrant Cloud for vector storage for the RAG system
- Better-Auth for authentication handling

## Core Services

### 1. Chatbot Service
- Content indexing and retrieval
- Question answering using RAG
- Context-aware responses based on selected text
- Conversation history management

### 2. Authentication Service
- User registration with background information
- User login and session management
- Profile management and updates

### 3. Personalization Service
- User profile-based content adaptation
- Difficulty and content adjustment
- Personalization preference management

### 4. Internationalization Service
- Content translation between English and Urdu
- Technical term translation mapping
- Language preference management

## API Endpoints

### Chatbot Endpoints
- `POST /api/chat/completion`: Process user questions and return RAG responses
- `POST /api/chat/context`: Process questions about selected text
- `POST /api/chat/index`: Index content for retrieval
- `GET /api/chat/models`: Get available models for chat

### Auth Endpoints
- `POST /api/auth/signup`: User registration with background questions
- `POST /api/auth/signin`: User authentication
- `POST /api/auth/signout`: Session termination
- `GET /api/auth/me`: Get current user info
- `PUT /api/auth/profile`: Update user profile and background

### Personalization Endpoints
- `GET /api/personalization/profile`: Get user's personalization profile
- `PUT /api/personalization/profile`: Update personalization settings
- `POST /api/personalization/adjust`: Get content adjusted for user profile
- `GET /api/personalization/defaults`: Get default personalization settings

### I18n Endpoints
- `GET /api/i18n/languages`: Get available languages
- `POST /api/i18n/translate`: Translate content between languages
- `GET /api/i18n/terminology`: Get technical term translations
- `GET /api/i18n/user-preference`: Get user's language preference
- `PUT /api/i18n/user-preference`: Update user's language preference

## Database Schema

### Users Table
- `id`: UUID primary key
- `email`: User's email
- `name`: User's name
- `software_experience`: Enum (beginner, intermediate, advanced)
- `robotics_experience`: Enum (none, basic, intermediate, advanced)
- `hardware_access`: Enum (none, simulation, workstation, complete_lab)
- `education_level`: Enum (high_school, undergraduate, graduate, professional)
- `interests`: Array of text (Physical AI topics)
- `personalization_enabled`: Boolean
- `preferred_language`: String (default 'en')
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Content Table
- `id`: UUID primary key
- `title`: Content title
- `slug`: URL-friendly identifier
- `module`: Module identifier
- `content_type`: Enum (text, code, exercise, etc.)
- `difficulty`: Enum (beginner, intermediate, advanced)
- `technical_terms`: Array of text (important terms in content)
- `vector_id`: String (ID in vector database)

## Deployment

The API will be deployed with the textbook to provide all interactive features. It's designed to be lightweight and efficient for seamless integration with the Docusaurus frontend.

## Security

- All endpoints requiring authentication use JWT tokens
- Rate limiting to prevent abuse
- Input validation and sanitization
- Secure database connections with SSL
- Content filtering for the chatbot responses