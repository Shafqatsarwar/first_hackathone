# Physical AI & Humanoid Robotics Textbook - Development Guide

## Project Setup and Environment Configuration

This guide will help you set up the development environment for the Physical AI & Humanoid Robotics textbook project. Follow these steps to get started.

## Required Environment Variables

Create a `.env` file in the project root with the following environment variables:

```env
# OpenAI API key for RAG chatbot functionality
OPENAI_API_KEY=your_openai_api_key_here

# OpenAI AgentKit (for ChatKit integration)
OPENAI_ORG_ID=your_openai_org_id
OPENAI_PROJECT_ID=your_openai_project_id
OPENAI_ASSISTANT_ID=your_assistant_id  # For the textbook chatbot
OPENAI_VECTOR_STORE_ID=your_vector_store_id  # For textbook content storage

# Qdrant Cloud configuration (alternative vector store)
QDRANT_API_KEY=your_qdrant_api_key_here
QDRANT_URL=your_qdrant_cluster_url_here

# Database configuration (Neon Serverless Postgres)
NEON_DATABASE_URL=postgresql://username:password@ep-xxxxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# Better-Auth configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_here

# JWT secrets
JWT_SECRET=your_jwt_secret_here

# Translation API key (optional - alternatives like Deep Translator don't require API key)
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
```

### How to Obtain Each Key:

1. **OPENAI_API_KEY**:
   - Go to https://platform.openai.com/api-keys
   - Create a new secret key and copy it

2. **OPENAI_ORG_ID and PROJECT_ID**:
   - Go to https://platform.openai.com/settings/organization
   - Find your Organization ID and Project ID

3. **OPENAI_ASSISTANT_ID and VECTOR_STORE_ID**:
   - Go to https://platform.openai.com/assistants
   - Create a new assistant and vector store for your textbook
   - Copy the assistant ID and vector store ID

4. **QDRANT_API_KEY and URL**:
   - Sign up at https://qdrant.tech/
   - Create a cloud cluster
   - Get the API key from the cluster dashboard
   - Use the provided cluster URL

5. **NEON_DATABASE_URL**:
   - Sign up at https://neon.tech/
   - Create a new project
   - Copy the connection string from the project dashboard

6. **BETTER_AUTH_SECRET**:
   - Generate a secure random string (at least 32 characters)
   - Use PowerShell command: `[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char](Get-Random -Min 33 -Max 126)})))` to generate

## Required Software Dependencies

### Windows Installation Instructions

#### 1. Install Node.js (for Docusaurus)
- Download from https://nodejs.org/
- Install Node.js v18 or higher
- Verify installation: `node --version` and `npm --version`

#### 2. Install Python 3.10+
- Download from https://www.python.org/downloads/
- Verify installation: `python --version` or `python3 --version` (depending on your system)

#### 3. Install Git
- Download from https://git-scm.com/
- This includes Git Bash which can be used as an alternative terminal

## Project Dependencies

### Backend Dependencies (Python - requirements.txt)
```txt
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
asyncpg==0.29.0
python-multipart==0.0.6
cryptography==41.0.8
passlib==1.7.4
python-jose[cryptography]==3.3.0
openai==1.3.5
langchain==0.0.339
langchain-openai==0.0.5
transformers==4.35.0
torch==2.0.1
torchvision==0.15.2
torchaudio==2.0.2
tensorflow==2.13.0
numpy==1.24.3
sentence-transformers==2.2.2
qdrant-client==1.7.0
googletrans==4.0.0rc1
deep-translator==1.9.0
pybullet==3.2.5
gymnasium==0.29.1
rclpy==3.0.0
openai-whisper==20231117
nav2-simple-commander==0.0.1
requests==2.31.0
tqdm==4.66.1
Pillow==10.0.0
pandas==2.0.3
matplotlib==3.7.2
jupyter==1.0.0
notebook==7.0.0
pydantic==2.5.0
python-dotenv==1.0.0
aiofiles==23.2.1
```

### Frontend Dependencies (Node.js - docusaurus/package.json)
```json
{
  "name": "physical-ai-textbook",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve",
    "write-translations": "docusaurus write-translations",
    "write-heading-ids": "docusaurus write-heading-ids"
  },
  "dependencies": {
    "@docusaurus/core": "3.1.0",
    "@docusaurus/plugin-content-docs": "^3.1.0",
    "@docusaurus/plugin-client-redirects": "^3.1.0",
    "@docusaurus/preset-classic": "3.1.0",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.0.0",
    "prism-react-renderer": "^2.3.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "3.1.0",
    "@docusaurus/types": "3.1.0"
  },
  "browserslist": {
    "production": [
      ">0.5%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 3 chrome version",
      "last 3 firefox version",
      "last 5 safari version"
    ]
  },
  "engines": {
    "node": ">=18.0"
  }
}
```

## Step-by-Step Setup Instructions

### 1. Clone and Initial Setup
```cmd
# Open Command Prompt or PowerShell
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Create virtual environment and install Python dependencies
python -m venv venv
# Activate virtual environment on Windows
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Set Up Environment Variables
```cmd
# Create .env file from example (if available)
copy .env.example .env  # if .env.example exists, otherwise create manually
# Edit the .env file with your actual keys as shown in the environment variables section
```

### 3. Set Up Docusaurus Frontend
```cmd
# Navigate to docusaurus directory
cd docusaurus

# Install Node.js dependencies
npm install
```

### 4. Run the Development Servers

#### For the backend API:
```cmd
cd api
uvicorn main:app --reload --port 8000
```

#### For the Docusaurus frontend:
```cmd
cd docusaurus
npm run start
```

## GitHub Repository Setup and Push Instructions

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
```

### 2. Create a GitHub Repository
- Go to https://github.com
- Click "New repository"
- Give it a name (e.g., "physical-ai-textbook")
- Set visibility (public/private as per your preference)
- **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 3. Link Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/physical-ai-textbook.git
```

### 4. Important: Protect Sensitive Information
Before committing, ensure sensitive information is not included:

```bash
# Create or update .gitignore to include:
echo ".env" >> .gitignore
echo "venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "dist/" >> .gitignore
echo "build/" >> .gitignore
```

### 5. Commit and Push
```bash
git add .
git commit -m "Initial commit: Physical AI & Humanoid Robotics textbook setup"

# Push to main branch
git branch -M main
git push -u origin main
```

## Project Structure Overview

```
physical-ai-textbook/
├── api/                    # FastAPI backend
│   ├── main.py            # Main application entry point
│   ├── routers/           # API route definitions
│   └── models/            # Database models
├── auth/                  # Authentication system
├── chatbot/               # RAG chatbot implementation
├── docusaurus/            # Docusaurus frontend (textbook content)
│   ├── docs/             # Textbook content organized by modules
│   ├── src/              # Custom React components
│   ├── static/           # Static assets
│   ├── docusaurus.config.js
│   └── sidebars.js
├── i18n/                 # Internationalization (Urdu translation)
├── personalization/      # Content personalization features
├── modules/              # Course module content
├── docs/                 # Additional project documentation
├── history/              # Prompt history records
├── .specify/             # Spec-Kit Plus configuration
├── .qwen/                # Qwen configuration
├── .env                  # Environment variables (NOT in Git)
├── .gitignore            # Git ignore rules
├── GUIDE.md              # This guide
├── QWEN.md               # Qwen rules
├── README.md             # Project overview
├── requirements.txt      # Python dependencies
└── LICENSE               # License information (if applicable)
```

## Important Configuration Files

### 1. docusaurus.config.js - Main Docusaurus Configuration
This file configures the entire frontend application, including:
- Site metadata and SEO
- Navigation structure
- Plugin configurations
- Internationalization settings

### 2. sidebars.js - Navigation Structure
Defines the navigation structure for the textbook content across all modules

### 3. api/main.py - Backend API Entry Point
The main FastAPI application that serves:
- Authentication endpoints
- RAG chatbot functionality
- Personalization services
- Translation services

## Development Workflow

### Adding New Content
1. Add new markdown files to `docusaurus/docs/` or appropriate module directories
2. Update `docusaurus/sidebars.js` to include the new content in navigation
3. Test changes with `npm run start`

### Adding New API Endpoints
1. Create new router in `api/routers/`
2. Import and include in `api/main.py`
3. Test with the backend server running

### Testing the Full Application
```bash
# Terminal 1: Start the backend
cd api
uvicorn main:app --reload --port 8000

# Terminal 2: Start the frontend
cd docusaurus
npm run start
```

## Deployment Instructions (for GitHub Pages)

### Prerequisites
- The repository must be public for free GitHub Pages hosting
- Ensure all environment variables are configured properly for production

### Deployment Steps
1. Build the Docusaurus site:
```bash
cd docusaurus
npm run build
```

2. Deploy to GitHub Pages using GitHub Actions:
   - Create `.github/workflows/deploy.yml` with deployment configuration
   - Push changes to trigger the deployment

## OpenAI ChatKit Integration

The textbook includes an OpenAI ChatKit integration that allows users to ask questions about the content. This uses OpenAI's Assistant API with a vector store containing the textbook content.

### Setting up OpenAI Assistant and Vector Store

1. Create your textbook content in the `docusaurus/docs/` directory
2. Convert content to formats suitable for vector storage (text, PDF, etc.)
3. Upload content to OpenAI's vector store:
   - Go to https://platform.openai.com/storage
   - Create a new vector store
   - Upload your textbook content files
4. Create an assistant:
   - Go to https://platform.openai.com/assistants
   - Create a new assistant
   - Attach the vector store to this assistant
   - Note both the assistant ID and vector store ID for your .env file

### Content Preparation for Vector Storage

For best performance with OpenAI's vector store:

1. Convert content to plain text or PDF format
2. Structure content in a way that makes sense for retrieval (chapters/sections as separate files)
3. Ensure text formatting is clean and consistent
4. Include relevant metadata in filenames (e.g., "module1-ros2-introduction.txt")

### Demo Video Preparation (90 seconds)

To prepare your demo video showcasing the textbook and chatbot:

1. Record the Docusaurus frontend showing the textbook content
2. Demonstrate the authentication and personalization features
3. Show the Urdu translation functionality
4. Demonstrate the chatbot answering textbook-related questions
5. Highlight the subagent features
6. Keep total time under 90 seconds

## GitHub Repository Setup and Push Instructions

### 1. Initialize Git Repository (if not already done)
```cmd
git init
git add .
```

### 2. Create a GitHub Repository
- Go to https://github.com
- Click "New repository"
- Give it a name (e.g., "physical-ai-textbook")
- Set visibility (public/private as per your preference)
- **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 3. Link Local Repository to GitHub
```cmd
git remote add origin https://github.com/YOUR_USERNAME/physical-ai-textbook.git
```

### 4. Important: Protect Sensitive Information
Before committing, ensure sensitive information is not included:

```cmd
# Check your .gitignore includes:
# .env
# venv/
# __pycache__/
# *.pyc
# node_modules/
# .DS_Store
# dist/
# build/
```

### 5. Commit and Push
```cmd
git add .
git commit -m "Initial commit: Physical AI & Humanoid Robotics textbook setup"

# Push to main branch
git branch -M main
git push -u origin main
```

This setup ensures your Physical AI & Humanoid Robotics textbook is properly configured to meet all hackathon requirements with the RAG chatbot, authentication, personalization, and translation features.