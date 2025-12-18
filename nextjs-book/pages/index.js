import Link from 'next/link'

export default function Home() {
  return (
    <main style={{padding:32,fontFamily:'Inter,Arial'}}>
      <h1>Physical AI Textbook</h1>
      <p>This is the Next.js front-end for the book. Use the Chatbot page to ask questions.</p>
      <ul>
        <li><Link href="/chatbot">OpenAI Chatbot (RAG)</Link></li>
        <li><a href="/book/book.txt" target="_blank" rel="noreferrer">Download book (txt)</a> — run `scripts/export_book.py` and copy build/book to `nextjs-book/public/book`</li>
      </ul>
    </main>
  )
}
