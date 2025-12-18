#!/usr/bin/env python3
"""
Script to test if all required dependencies from requirements.txt can be imported
"""

import sys
import subprocess

def test_package_imports():
    """Test if packages can be imported"""
    
    # List of packages that should be imported (matches trimmed requirements)
    packages_to_test = [
        # Web framework
        "fastapi",
        "uvicorn",
        
        # Database
        "sqlalchemy",
        "asyncpg",
        
        # Authentication
        "python_multipart",
        "cryptography",
        "passlib",
        "jose",
        
        # AI / RAG
        "openai",
        "langchain",
        "qdrant_client",
        "numpy",
        
        # Translation
        "deep_translator",
        
        # Robotics (lightweight tools)
        # pybullet and gymnasium are optional for environments without simulation; keep as optional checks
        "pybullet",
        "gymnasium",
        
        # Utilities
        "requests",
        "tqdm",
        "PIL",  # Pillow
        "pandas",
        "matplotlib",
        "jupyter",
        "notebook",
        "pydantic",
        "dotenv",
        "aiofiles"
    ]
    
    failed_imports = []
    
    for package in packages_to_test:
        try:
            __import__(package)
            print(f"[OK] Successfully imported {package}")
        except ImportError as e:
            print(f"[ERROR] Failed to import {package}: {e}")
            failed_imports.append((package, str(e)))
        except Exception as e:
            print(f"[ERROR] Error importing {package}: {e}")
            failed_imports.append((package, str(e)))

    return failed_imports

def install_missing_packages():
    """Install missing packages from requirements.txt"""
    print("\nInstalling packages from requirements.txt...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("[OK] Successfully installed packages from requirements.txt")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Failed to install packages: {e}")
        return False


if __name__ == "__main__":
    print("Testing package dependencies...\n")

    # First, test current imports
    failed_imports = test_package_imports()

    if failed_imports:
        print(f"\nFound {len(failed_imports)} packages that failed to import.")
        print("Attempting to install missing packages...\n")

        # Try to install the packages
        success = install_missing_packages()

        if success:
            print("\nRe-testing package dependencies after installation...\n")
            failed_imports_after = test_package_imports()

            if failed_imports_after:
                print(f"\nStill have {len(failed_imports_after)} packages failing to import after installation.")
            else:
                print("\n[OK] All packages successfully imported after installation!")
        else:
            print("Could not install packages. Please manually install missing dependencies.")
    else:
        print("\n[OK] All packages successfully imported!")