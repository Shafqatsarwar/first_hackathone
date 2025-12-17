# Main API entry point for the Physical AI & Humanoid Robotics textbook
# This file initializes the FastAPI application and includes all routers

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from api.routers import chat, auth, personalization, i18n
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Physical AI & Humanoid Robotics Textbook API",
    description="Backend API for the AI-native textbook with RAG chatbot, authentication, personalization, and i18n",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, configure specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(personalization.router, prefix="/api/personalization", tags=["personalization"])
app.include_router(i18n.router, prefix="/api/i18n", tags=["i18n"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Physical AI & Humanoid Robotics Textbook API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "textbook-api"}

# Placeholder for the database setup
# Actual implementation would include database connection and models