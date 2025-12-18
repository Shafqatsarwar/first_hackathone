# Next.js Book — Physical AI Textbook

This is a minimal Next.js scaffold for the book site (user requested Next 15/16, pages router).

Quick start:

```bash
cd nextjs-book
npm ci
npm run dev
```

Env:
- Create a `.env.local` in `nextjs-book` with `OPENAI_API_KEY=sk-...` for the chatbot API route.

Notes:
- This scaffold uses the pages router and a simple server API at `/api/chat` which proxies queries to OpenAI.
- It intentionally avoids turbopack/turbo-specific features per request.
