"""
Chat router for the Physical AI & Humanoid Robotics textbook
Handles RAG chatbot functionality
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
import os
from pathlib import Path
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

router = APIRouter()

# Request model for chat
class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None

# Response model for chat
class ChatResponse(BaseModel):
    response: str
    sources: Optional[list] = []
    book_placeholder: Optional[str] = None

class ModuleInfo(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    path: str


def _load_book_placeholder() -> Optional[str]:
    """Return a short snippet of the exported book text for mock/demo use."""
    root = Path(__file__).resolve().parents[1]
    book_path = root.parent / "book.txt"
    if not book_path.exists():
        return None
    text = book_path.read_text(encoding="utf-8").strip()
    if not text:
        return None
    return text[:800]  # first 800 chars as placeholder

@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    """
    Process a chat query using RAG (Retrieval Augmented Generation)
    """
    # Safe testing mode to avoid external API/token usage
    if os.getenv("MOCK_MODE", "false").lower() in ("1", "true", "yes"):
        placeholder = _load_book_placeholder()
        mock_message = f"(mock) Received: {request.message}"
        sources = []
        if placeholder:
            mock_message += " (includes textbook placeholder content)"
            sources.append({"source": "book.txt", "snippet": placeholder[:200]})
        return ChatResponse(response=mock_message, sources=sources)
    try:
        # Lazy-import optional RAG dependencies (allows health checks without full stack)
        try:
            from qdrant_client import QdrantClient
            try:
                from langchain.chat_models.openai import ChatOpenAI
            except Exception:
                from langchain.chat_models import ChatOpenAI
            from langchain.chains import RetrievalQA
            from langchain.vectorstores import Qdrant
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"RAG dependencies not available: {e}")

        # Initialize OpenAI client (used by LangChain/OpenAI wrappers)
        openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        # Initialize Qdrant client for vector store
        qdrant_client = QdrantClient(
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY")
        )

        # Set up vector store for RAG
        vector_store = Qdrant(
            client=qdrant_client,
            collection_name="textbook_content",
            embeddings=None  # In practice, initialize with embedding model
        )

        # Set up the LLM
        llm = ChatOpenAI(
            openai_api_key=os.getenv("OPENAI_API_KEY"),
            model_name="gpt-3.5-turbo"
        )

        # Set up the QA chain with retrieval
        qa = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=vector_store.as_retriever()
        )

        # Process the query
        result = qa({"query": request.message})

        # Return the response
        return ChatResponse(
            response=result["result"],
            sources=[]  # In practice, return the source documents
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat query: {str(e)}")

@router.get("/health")
async def chat_health():
    """
    Health check for the chat service
    """
    return {"status": "healthy", "service": "chatbot-api"}
