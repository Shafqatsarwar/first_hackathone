"""RAG initialization: OpenAI client + Qdrant client helper

Provides `initialize_rag()` which loads validated environment variables
and returns a lightweight `RAGSystem` object with `openai` and `qdrant`
client handles. The function performs a minimal health check to confirm
connectivity where possible.

Usage:
    from chatbot.rag import initialize_rag
    rag = initialize_rag()
    print(rag.health())

Note: this module keeps initialization minimal; actual RAG pipeline
components (indexing, retrieval wrappers, prompt templates) should be
implemented separately using the returned clients.
"""
from typing import Optional, Dict, Any

from .env_utils import load_env


class RAGSystem:
    def __init__(self, openai_module, qdrant_client: Optional[Any] = None):
        self.openai = openai_module
        self.qdrant = qdrant_client

    def health(self) -> Dict[str, Any]:
        """Return a small health report for the initialized clients."""
        report: Dict[str, Any] = {}
        # OpenAI key check
        report["openai_key_set"] = bool(getattr(self.openai, "api_key", None))

        # Qdrant connectivity check (if configured)
        if self.qdrant is None:
            report["qdrant"] = "not_configured"
        else:
            try:
                # get_collections is cheap and indicates server reachability
                cols = self.qdrant.get_collections()
                report["qdrant"] = {"collections": cols}
            except Exception as e:
                report["qdrant"] = {"error": str(e)}

        return report


def initialize_rag(required: Optional[list] = None, optional: Optional[list] = None) -> RAGSystem:
    """Load env, create OpenAI and Qdrant clients, return RAGSystem.

    - required: list of env var names that must be present (defaults to ['OPENAI_API_KEY'])
    - optional: list of optional env var names (defaults include QDRANT settings)
    """
    required = required or ["OPENAI_API_KEY"]
    optional = optional or ["QDRANT_API_KEY", "QDRANT_URL"]

    cfg = load_env(required=required, optional=optional)

    # Initialize OpenAI client (openai package)
    try:
        import openai
    except Exception as e:
        raise RuntimeError("OpenAI package is required for RAG initialization") from e

    openai.api_key = cfg.get("OPENAI_API_KEY")

    # Initialize Qdrant client if configured
    qdrant_client = None
    qdrant_url = cfg.get("QDRANT_URL")
    qdrant_api_key = cfg.get("QDRANT_API_KEY")
    if qdrant_url:
        try:
            from qdrant_client import QdrantClient

            qdrant_client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
        except Exception as e:
            # Fail fast with informative message
            raise RuntimeError("Failed to initialize Qdrant client") from e

    return RAGSystem(openai_module=openai, qdrant_client=qdrant_client)
