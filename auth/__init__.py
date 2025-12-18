"""
Authentication system for the Physical AI & Humanoid Robotics textbook
Uses Better-Auth for user management and collects background information
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration for Better-Auth would go here
BETTER_AUTH_URL = os.getenv("BETTER_AUTH_URL")
BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")

# Initialize Better-Auth (this is a placeholder - actual implementation would follow Better-Auth docs)
def initialize_auth():
    """
    Initialize the authentication system with Better-Auth
    """
    print("Auth system initialized")
    # In a real implementation, this would configure Better-Auth
    pass

# Function to collect user background information
def collect_user_background():
    """
    Collect background information from users during registration
    Questions about software/hardware experience as required by hackathon
    """
    background_questions = [
        "What is your software development background?",
        "What is your hardware/robotics experience?",
        "What is your experience level? (Beginner/Intermediate/Advanced)"
    ]
    return background_questions