"""RAG Chatbot package for the Physical AI textbook.

This module exposes a small initializer and uses `env_utils.load_env` to
centralize environment loading and validation. Keep secrets out of the
repository by using `.env` (see `.env.example`).
"""
from .env_utils import load_env

# Define the minimum required environment variables for the chatbot to run.
_REQUIRED = [
    "OPENAI_API_KEY",
]

# Optional environment variables used if present
_OPTIONAL = [
    "QDRANT_API_KEY",
    "QDRANT_URL",
    "OPENAI_ASSISTANT_ID",
    "OPENAI_VECTOR_STORE_ID",
]


def get_config():
    """Load and return validated configuration for the chatbot.

    Raises ValueError if any required variables are missing.
    """
    return load_env(required=_REQUIRED, optional=_OPTIONAL)


def initialize_chatbot():
    """Initialize the RAG chatbot with loaded configuration.

    This function currently validates env vars and returns the config dict.
    Later it will create OpenAI/VectorStore clients using those values.
    """
    cfg = get_config()
    print("Chatbot initialized with keys:", ", ".join(sorted(cfg.keys())))
    return cfg


def process_query(user_query, user_context=None):
    """Stub: process a user query using the RAG pipeline.

    Real implementation should:
    1. Retrieve relevant docs from vector DB (Qdrant or OpenAI vector store).
    2. Build a prompt / context and call OpenAI Assistant API.
    3. Return response with citation metadata.
    """
    raise NotImplementedError("RAG query processing is not implemented yet")