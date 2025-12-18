import os
from typing import Dict, List, Optional
from dotenv import load_dotenv


def load_env(required: Optional[List[str]] = None, optional: Optional[List[str]] = None) -> Dict[str, str]:
    """
    Load environment variables from a .env file and validate required keys.

    - required: list of env var names that must be present (will raise ValueError if missing)
    - optional: list of env var names to include if present

    Returns a dict of found environment variables.
    """
    # Load .env from repository root if present
    load_dotenv()

    required = required or []
    optional = optional or []

    config: Dict[str, str] = {}

    missing = []
    for key in required:
        val = os.getenv(key)
        if val is None or val == "":
            missing.append(key)
        else:
            config[key] = val

    for key in optional:
        val = os.getenv(key)
        if val is not None and val != "":
            config[key] = val

    if missing:
        raise ValueError(f"Missing required environment variables: {', '.join(missing)}")

    return config
