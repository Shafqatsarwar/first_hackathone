"""
Chat router for the Physical AI & Humanoid Robotics textbook
Handles RAG chatbot functionality and agent-based chatbot with file/web search
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import os
from pathlib import Path
from dotenv import load_dotenv
import openai
import asyncio

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


ROOT_DIR = Path(__file__).resolve().parents[2]
MODULES_ROOT = ROOT_DIR / "modules"


def _collect_module_metadata() -> List[ModuleInfo]:
    entries: List[ModuleInfo] = []
    if not MODULES_ROOT.exists():
        return entries
    for module_dir in sorted(MODULES_ROOT.iterdir()):
        if not module_dir.is_dir():
            continue
        label = module_dir.name
        description = ""
        category_file = module_dir / "_category_.json"
        if category_file.exists():
            try:
                payload = json.loads(category_file.read_text(encoding="utf-8"))
                label = payload.get("label", label)
            except Exception:  # keep fallback label
                pass

        # Use first markdown file as description snippet
        for md in sorted(module_dir.glob("*.md")):
            text = md.read_text(encoding="utf-8")
            parts = text.split("---")
            rest = parts[-1] if len(parts) >= 3 else text
            for line in rest.splitlines():
                if line.strip():
                    description = line.strip()
                    break
            if description:
                break

        entries.append(
            ModuleInfo(
                id=module_dir.name,
                title=label,
                description=description,
                path=f"/docs/{module_dir.name}",
            )
        )
    return entries


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
    mock_mode_value = os.getenv("MOCK_MODE", "false")
    is_mock_enabled = mock_mode_value.lower() in ("1", "true", "yes")
    print(f"[/query] MOCK_MODE={mock_mode_value}, enabled={is_mock_enabled}")
    
    if is_mock_enabled:
        placeholder = _load_book_placeholder()
        mock_message = f"(mock) Received: {request.message}"
        sources = []
        if placeholder:
            mock_message += " (includes textbook placeholder content)"
            sources.append({"source": "book.txt", "snippet": placeholder[:200]})
        print(f"[/query] Returning mock response")
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


@router.get("/modules", response_model=List[ModuleInfo])
async def list_modules():
    """
    Return available module metadata for UI/RAG tooling.
    """
    return _collect_module_metadata()


@router.post("/agent-query")
async def agent_chat_query(request: ChatRequest):
    """
    Process a chat query using OpenAI API directly (simplified agent).
    """
    # Respect MOCK_MODE to avoid external calls during local/dev testing
    mock_mode_value = os.getenv("MOCK_MODE", "false")
    is_mock_enabled = mock_mode_value.lower() in ("1", "true", "yes")
    print(f"[/agent-query] MOCK_MODE={mock_mode_value}, enabled={is_mock_enabled}")
    
    if is_mock_enabled:
        placeholder = _load_book_placeholder()
        mock_message = f"(mock-agent) Received: {request.message}"
        if placeholder:
            mock_message += " (includes textbook placeholder content)"
        print(f"[/agent-query] Returning mock response")
        return {
            "response": mock_message,
            "sources": [],
            "reasoning": None,
            "user_id": request.user_id
        }
    try:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
        
        # Use OpenAI client directly
        client = openai.OpenAI(api_key=api_key)
        
        # Simple system prompt for the chatbot
        system_prompt = """You are a helpful AI assistant for the Physical AI & Humanoid Robotics Textbook. 
        Provide clear, concise answers about Physical AI, ROS 2, simulation, Isaac Sim, VLA, and robotics topics.
        When possible, reference the textbook content. Be educational and supportive."""
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        # Extract the response
        answer = response.choices[0].message.content
        
        return {
            "response": answer,
            "sources": [],
            "reasoning": None,
            "user_id": request.user_id
        }
        
    except openai.APIError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"OpenAI API error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error processing agent query: {str(e)}"
        )


@router.get("/health")
async def chat_health():
    """
    Health check for the chat service
    """
    return {"status": "healthy", "service": "chatbot-api"}
