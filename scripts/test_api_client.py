from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

print('GET / ->', client.get('/').json())
print('GET /health ->', client.get('/health').json())
print('GET /api/chat/health ->', client.get('/api/chat/health').json())
