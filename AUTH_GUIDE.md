# 🔐 User Authentication Guide

Complete guide for implementing and using user authentication in the Physical AI & Humanoid Robotics API.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Available Auth Endpoints](#available-auth-endpoints)
3. [Authentication Features](#authentication-features)
4. [Quick Start - Using Auth](#quick-start---using-auth)
5. [API Endpoint Reference](#api-endpoint-reference)
6. [Integration Examples](#integration-examples)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The authentication system provides secure user management with background information collection. It enables:

- **User Registration** - Sign up with email and password
- **User Login** - Authenticate and get access tokens
- **User Profiles** - Store user preferences and background information
- **Personalization** - Customize content based on user experience level
- **Session Management** - Secure token-based authentication

---

## 🔑 Available Auth Endpoints

### 1. **Register New User** `POST /api/auth/register`

**Purpose:** Create a new user account with background information

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "johndoe",
  "background_software": "intermediate",
  "background_hardware": "advanced",
  "experience_level": "intermediate"
}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "username": "johndoe",
  "background_software": "intermediate",
  "background_hardware": "advanced",
  "experience_level": "intermediate"
}
```

**Status Codes:**
- `200` - User created successfully
- `400` - Invalid input data
- `500` - Server error

---

### 2. **Login User** `POST /api/auth/login`

**Purpose:** Authenticate user and receive access token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Status Codes:**
- `200` - Login successful
- `401` - Invalid credentials
- `500` - Server error

---

### 3. **Get Current User** `GET /api/auth/me`

**Purpose:** Retrieve authenticated user's profile information

**Headers Required:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "username": "johndoe",
  "background_software": "intermediate",
  "background_hardware": "advanced",
  "experience_level": "intermediate"
}
```

**Status Codes:**
- `200` - User profile retrieved
- `401` - Unauthorized (missing/invalid token)
- `404` - User not found

---

### 4. **Logout User** `POST /api/auth/logout`

**Purpose:** End user session and invalidate token

**Headers Required:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

**Status Codes:**
- `200` - Logout successful
- `401` - Unauthorized

---

### 5. **Update User Profile** `PUT /api/auth/profile`

**Purpose:** Update user background information and preferences

**Headers Required:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "username": "johndoe_updated",
  "background_software": "advanced",
  "background_hardware": "advanced",
  "experience_level": "advanced"
}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "username": "johndoe_updated",
  "background_software": "advanced",
  "background_hardware": "advanced",
  "experience_level": "advanced"
}
```

**Status Codes:**
- `200` - Profile updated
- `401` - Unauthorized
- `400` - Invalid data

---

## 🎓 Authentication Features

### Background Information Levels

The system collects user experience across different domains:

#### **Software Experience**
- `beginner` - Less than 1 year of programming
- `intermediate` - 1-5 years of programming
- `advanced` - 5+ years of programming expertise

#### **Hardware/Robotics Experience**
- `beginner` - No hands-on robotics experience
- `intermediate` - Some robotics projects or coursework
- `advanced` - Professional robotics development experience

#### **Overall Experience Level**
- `beginner` - New to Physical AI and robotics
- `intermediate` - Some familiarity with concepts
- `advanced` - Strong foundation in relevant areas

### Use Cases

**Beginners** get:
- Simplified explanations
- More foundational concepts
- Step-by-step tutorials
- Visual aids and diagrams

**Intermediate Users** get:
- Balanced technical depth
- Practical examples
- Code walkthroughs

**Advanced Users** get:
- In-depth technical details
- Research papers
- Advanced algorithms
- Performance optimization tips

---

## 🚀 Quick Start - Using Auth

### Step 1: Register a New User

```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "MySecurePass123!",
    "username": "robotics_student",
    "background_software": "beginner",
    "background_hardware": "beginner",
    "experience_level": "beginner"
  }'
```

**Expected Response:**
```json
{
  "id": "user_12345",
  "email": "student@university.edu",
  "username": "robotics_student",
  "background_software": "beginner",
  "background_hardware": "beginner",
  "experience_level": "beginner"
}
```

### Step 2: Login to Get Access Token

```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "MySecurePass123!"
  }'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Save this token!** You'll use it for authenticated requests.

### Step 3: Access Protected Resources

Use the token in your requests:

```bash
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Step 4: Make Authenticated API Calls

Include the token when calling other protected endpoints:

```bash
curl -X POST "http://localhost:8000/api/chat/agent-query" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "query": "What is Physical AI?"
  }'
```

---

## 📡 API Endpoint Reference

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|---------------|---------|
| POST | `/api/auth/register` | ❌ No | Create new user account |
| POST | `/api/auth/login` | ❌ No | Authenticate and get token |
| GET | `/api/auth/me` | ✅ Yes | Get current user profile |
| POST | `/api/auth/logout` | ✅ Yes | End user session |
| PUT | `/api/auth/profile` | ✅ Yes | Update user profile |
| GET | `/api/auth/health` | ❌ No | Check auth service status |

---

## 💻 Integration Examples

### Python - Using Requests Library

```python
import requests

API_BASE = "http://localhost:8000"

# 1. Register
register_data = {
    "email": "user@example.com",
    "password": "Password123!",
    "username": "pythondev",
    "background_software": "intermediate",
    "background_hardware": "beginner",
    "experience_level": "intermediate"
}

resp = requests.post(f"{API_BASE}/api/auth/register", json=register_data)
print("Registration:", resp.json())

# 2. Login
login_data = {
    "email": "user@example.com",
    "password": "Password123!"
}

resp = requests.post(f"{API_BASE}/api/auth/login", json=login_data)
token = resp.json()["access_token"]
print("Token:", token)

# 3. Get User Profile
headers = {"Authorization": f"Bearer {token}"}
resp = requests.get(f"{API_BASE}/api/auth/me", headers=headers)
print("Profile:", resp.json())

# 4. Make Authenticated Chat Request
chat_data = {"query": "Tell me about ROS 2"}
resp = requests.post(
    f"{API_BASE}/api/chat/agent-query",
    json=chat_data,
    headers=headers
)
print("Chat Response:", resp.json())
```

### JavaScript/Node.js - Using Fetch API

```javascript
const API_BASE = "http://localhost:8000";

// 1. Register
async function registerUser() {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "user@example.com",
      password: "Password123!",
      username: "jsdev",
      background_software: "intermediate",
      background_hardware: "beginner",
      experience_level: "intermediate"
    })
  });
  
  const user = await response.json();
  console.log("User registered:", user);
  return user;
}

// 2. Login
async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  const { access_token } = await response.json();
  localStorage.setItem("auth_token", access_token);
  console.log("Logged in successfully");
  return access_token;
}

// 3. Get User Profile
async function getUserProfile(token) {
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  const profile = await response.json();
  console.log("User profile:", profile);
  return profile;
}

// 4. Make Authenticated Request
async function askChatbot(question, token) {
  const response = await fetch(`${API_BASE}/api/chat/agent-query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ query: question })
  });
  
  const result = await response.json();
  console.log("Chat response:", result);
  return result;
}

// Usage
async function main() {
  // Register and login
  await registerUser();
  const token = await loginUser("user@example.com", "Password123!");
  
  // Get profile and chat
  await getUserProfile(token);
  await askChatbot("What is Physical AI?", token);
}

main();
```

### React - Using Custom Hook

```javascript
import { useState, useEffect } from 'react';

// Custom hook for authentication
function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (email, password, username, background) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, password, username,
          background_software: background.software,
          background_hardware: background.hardware,
          experience_level: background.level
        })
      });
      
      const userData = await response.json();
      setUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const { access_token } = await response.json();
      setToken(access_token);
      localStorage.setItem("auth_token", access_token);
      setError(null);
      return access_token;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    if (!token) return null;
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      const userData = await response.json();
      setUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      setToken(null);
      setUser(null);
      localStorage.removeItem("auth_token");
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { user, token, loading, error, register, login, getProfile, logout };
}

// Usage in component
export function LoginComponent() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect to dashboard
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
```

---

## ✅ Best Practices

### 1. **Secure Password Requirements**
- Minimum 8 characters
- Include uppercase and lowercase letters
- Include numbers and special characters
- Never store plaintext passwords

```python
# Example validation (implement in your register endpoint)
import re

def is_strong_password(password):
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"[0-9]", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True
```

### 2. **Token Management**
- Store tokens securely (HttpOnly cookies or secure storage)
- Set token expiration times (e.g., 1 hour)
- Implement refresh token mechanism
- Revoke tokens on logout

```javascript
// Store token securely
function storeToken(token) {
  // Browser
  localStorage.setItem("auth_token", token);
  
  // Or use secure cookie for better security
  document.cookie = `auth_token=${token}; Secure; HttpOnly; SameSite=Strict`;
}
```

### 3. **HTTPS Only**
- Always use HTTPS in production
- Never send tokens over unencrypted connections
- Set secure cookie flags

### 4. **Rate Limiting**
- Limit login attempts (prevent brute force)
- Implement CAPTCHA after failed attempts

```python
# Example: rate limiting with Redis
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/login")
@limiter.limit("5/minute")  # Max 5 login attempts per minute
async def login_user(request: UserLoginRequest):
    # Login logic
    pass
```

### 5. **User Background Privacy**
- Only collect necessary information
- Allow users to update preferences
- Don't sell or share data without consent
- GDPR compliance for EU users

---

## 🔧 Troubleshooting

### Issue: "Invalid credentials" on login

**Cause:** Wrong email or password

**Solution:**
- Check email and password are correct
- Verify user exists with `/api/auth/health`
- Try password reset (if implemented)

---

### Issue: "Unauthorized" when accessing protected endpoints

**Cause:** Missing or invalid token

**Solution:**
```javascript
// Make sure token is in Authorization header
headers: {
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

---

### Issue: Token expires while using the app

**Cause:** Long user sessions exceed token lifetime

**Solution:** Implement refresh token flow

```python
@router.post("/refresh")
async def refresh_token(refresh_token: str):
    """Get new access token using refresh token"""
    try:
        # Verify refresh token
        # Generate new access token
        new_token = generate_access_token(user_id)
        return {"access_token": new_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
```

---

### Issue: CORS errors when calling from frontend

**Cause:** Cross-origin requests not allowed

**Solution:** Add CORS middleware to FastAPI

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### Issue: "Email already exists"

**Cause:** User tried to register with existing email

**Solution:**
- Provide "Forgot Password" option
- Suggest password reset
- Check email is unique before registration

```python
@router.post("/register")
async def register_user(request: UserRegisterRequest):
    # Check if email already exists
    existing_user = await db.find_user_by_email(request.email)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered. Try logging in or resetting password."
        )
    # Continue with registration
```

---

## 🔗 Related Documentation

- [Main Developer Guide](./GUIDE.md)
- [User Guide](./USER_GUIDE.md)
- [API Endpoints](./GUIDE.md#-api-endpoints)
- [Chatbot Integration](./CHATBOT_ENABLE.md)

---

## 📞 Support

For authentication issues:
1. Check this guide's troubleshooting section
2. Review API endpoint reference
3. Check server logs: `uvicorn api.main:app --reload`
4. Verify `.env` has required auth configuration

