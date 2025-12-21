"""
Internationalization (i18n) router for the Physical AI & Humanoid Robotics textbook
Handles content translation, specifically Urdu translation
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
try:
    from googletrans import Translator
    _HAS_GOOGLETRANS = True
except Exception:
    Translator = None
    _HAS_GOOGLETRANS = False
from deep_translator import GoogleTranslator

# Load environment variables
load_dotenv()

router = APIRouter()

# Request model for translation
class TranslateContentRequest(BaseModel):
    content: str
    source_lang: str = "en"
    target_lang: str = "ur"  # Urdu as required by hackathon requirements
    content_id: Optional[str] = None

class TranslateContentResponse(BaseModel):
    original_content: str
    translated_content: str
    source_lang: str
    target_lang: str

@router.post("/translate", response_model=TranslateContentResponse)
async def translate_content(request: TranslateContentRequest):
    """
    Translate textbook content to Urdu or other languages
    """
    try:
        # In mock mode, avoid network calls and return an echo-style translation
        if os.getenv("MOCK_MODE", "false").lower() in ("1", "true", "yes"):
            translated = f"(mock-{request.target_lang}) {request.content}"
            return TranslateContentResponse(
                original_content=request.content,
                translated_content=translated,
                source_lang=request.source_lang,
                target_lang=request.target_lang
            )

        # Use Google Translate API if available, otherwise use deep_translator as fallback
        api_key = os.getenv("GOOGLE_TRANSLATE_API_KEY")
        
        if api_key:
            # Use Google Translate API with key via deep_translator
            translator = GoogleTranslator(source=request.source_lang, target=request.target_lang)
            translated = translator.translate(request.content)
        else:
            # Prefer googletrans library if available, otherwise use deep_translator fallback
            if _HAS_GOOGLETRANS and Translator is not None:
                translator = Translator()
                translated = translator.translate(request.content, dest=request.target_lang, src=request.source_lang).text
            else:
                translator = GoogleTranslator(source=request.source_lang, target=request.target_lang)
                translated = translator.translate(request.content)
        
        response = TranslateContentResponse(
            original_content=request.content,
            translated_content=translated,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error translating content: {str(e)}")

@router.get("/health")
async def i18n_health():
    """
    Health check for the i18n service
    """
    return {"status": "healthy", "service": "i18n-api"}
