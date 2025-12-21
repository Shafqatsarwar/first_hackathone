# Developer Guide

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### 1. Clone and Setup

```powershell
# Clone the repository
git clone https://github.com/Shafqatsarwar/first_hackathone.git
cd first_hackathone
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies (for Docusaurus)
cd docusaurus
npm install
cd ..
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Required for development
MOCK_MODE=true

# Optional - Add only if you want real AI responses
OPENAI_API_KEY=sk-your-key-here

# Optional - For vector storage
QDRANT_URL=http://127.0.0.1:6333
QDRANT_API_KEY=your-qdrant-key

# Optional - For database
NEON_DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require
```

**Important**: Keep `MOCK_MODE=true` during development to avoid API costs!

### 3. Run the Application

#### Start the FastAPI Backend

```powershell
# From project root
.venv\Scripts\python.exe -m uvicorn api.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

#### Start the Docusaurus Frontend

```powershell
# In a new terminal
cd docusaurus
npm start
```

The website will open at `http://localhost:3000`

## Project Structure

```
first_hackathone/
├── api/                    # FastAPI backend
│   ├── main.py            # API entry point
│   ├── routers/           # API endpoints
│   │   ├── chat.py        # Chatbot endpoints
│   │   ├── auth.py        # Authentication
│   │   ├── i18n.py        # Internationalization
│   │   └── personalization.py
│   └── models/            # Data models
├── chatbot/               # Chatbot implementation
│   ├── agent.py           # OpenAI agent
│   ├── rag.py             # RAG implementation
│   ├── ChatbotWidget.jsx  # React component
│   └── chatbot_widget.html # Standalone HTML
├── docusaurus/            # Frontend website
│   ├── docs/              # Documentation content
│   ├── src/               # React components
│   └── static/            # Static assets
├── scripts/               # Utility scripts
├── auth/                  # Authentication logic
├── personalization/       # User personalization
├── i18n/                  # Internationalization
├── .env                   # Environment variables (DO NOT COMMIT)
├── requirements.txt       # Python dependencies
└── README.md              # Public documentation
```

## Development Workflow

### Testing the Chatbot

#### Test with MOCK_MODE (No API calls)

```powershell
# Test the query endpoint
Invoke-RestMethod -Uri 'http://localhost:8000/api/chat/query' `
  -Method Post `
  -ContentType 'application/json' `
  -Body '{"message":"What is ROS 2?"}'

# Test the agent endpoint
Invoke-RestMethod -Uri 'http://localhost:8000/api/chat/agent-query' `
  -Method Post `
  -ContentType 'application/json' `
  -Body '{"message":"Explain physical AI"}'
```

Expected response with MOCK_MODE=true:
```json
{
  "response": "(mock) Received: What is ROS 2?",
  "sources": []
}
```

#### Test with Real AI (MOCK_MODE=false)

1. Set `MOCK_MODE=false` in `.env`
2. Add your `OPENAI_API_KEY`
3. Restart the API server
4. Test the same endpoints

### Running Tests

```powershell
# Test dependencies
python test_dependencies.py

# Test chatbot agent
python test_agent_chatbot.py
```

### Building for Production

#### Build Docusaurus

```powershell
cd docusaurus
npm run build
```

The static files will be in `docusaurus/build/`

#### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MOCK_MODE=true` (or `false` for production)
   - `OPENAI_API_KEY=your-key`
4. Deploy!

## API Endpoints

### Chat Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat/query` | POST | RAG-based chat query |
| `/api/chat/agent-query` | POST | Agent-based chat (OpenAI) |
| `/api/chat/modules` | GET | List available modules |
| `/api/chat/health` | GET | Health check |

### Auth Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/profile` | GET | Get user profile |

### I18n Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/i18n/translate` | POST | Translate text |
| `/api/i18n/languages` | GET | List supported languages |

## Environment Variables Reference

### Required
- `MOCK_MODE` - Set to `true` for development, `false` for production

### Optional
- `OPENAI_API_KEY` - OpenAI API key for AI responses
- `OPENAI_ORG_ID` - OpenAI organization ID
- `OPENAI_PROJECT_ID` - OpenAI project ID
- `OPENAI_ASSISTANT_ID` - OpenAI assistant ID
- `OPENAI_VECTOR_STORE_ID` - Vector store ID
- `QDRANT_URL` - Qdrant vector database URL
- `QDRANT_API_KEY` - Qdrant API key
- `NEON_DATABASE_URL` - Neon Postgres connection string
- `BETTER_AUTH_URL` - Better Auth service URL
- `BETTER_AUTH_SECRET` - Better Auth secret
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_TRANSLATE_API_KEY` - Google Translate API key

## Troubleshooting

### MOCK_MODE Not Working

See `MOCK_MODE_TROUBLESHOOTING.md` for detailed troubleshooting steps.

Quick check:
```powershell
# Verify .env file
Get-Content .env | Select-String "MOCK_MODE"

# Should show: MOCK_MODE=true
```

### API Server Won't Start

```powershell
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill the process if needed
taskkill /PID <process_id> /F
```

### Docusaurus Build Fails

```powershell
# Clear cache and reinstall
cd docusaurus
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Python Dependencies Issues

```powershell
# Reinstall all dependencies
pip install --force-reinstall -r requirements.txt
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly with MOCK_MODE=true
4. Submit a pull request

## Security Notes

- **Never commit `.env` file** - It's in `.gitignore`
- **Rotate API keys** if accidentally exposed
- **Use MOCK_MODE=true** during development
- **Review code** before deploying to production

## Useful Commands

```powershell
# Start API server
.venv\Scripts\python.exe -m uvicorn api.main:app --reload --port 8000

# Start Docusaurus dev server
cd docusaurus && npm start

# Build Docusaurus for production
cd docusaurus && npm run build

# Run Python tests
python test_agent_chatbot.py

# Check Python dependencies
python test_dependencies.py

# Format Python code (if you have black installed)
black api/ chatbot/ scripts/

# Verify .env is gitignored
git check-ignore -v .env
```

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docusaurus Documentation](https://docusaurus.io/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)

## Support

For issues and questions:
- Check `MOCK_MODE_TROUBLESHOOTING.md`
- Review `docusaurus/docs/` for detailed documentation
- Open an issue on GitHub
