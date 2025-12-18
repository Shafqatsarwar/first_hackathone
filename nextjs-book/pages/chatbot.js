import {useState} from 'react'

export default function Chatbot(){
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask(e){
    e.preventDefault()
    setLoading(true)
    setAnswer('')
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: q})
    })
    const j = await res.json()
    setAnswer(j.answer || JSON.stringify(j.raw))
    setLoading(false)
  }

  return (
    <main style={{padding:24,fontFamily:'Inter,Arial'}}>
      <h1>Book Chatbot</h1>
      <form onSubmit={ask}>
        <textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about the book..." style={{width:'100%',height:120}} />
        <div style={{marginTop:8}}>
          <button type="submit" disabled={loading}>Ask</button>
        </div>
      </form>
      <section style={{marginTop:20}}>
        <h3>Answer</h3>
        {loading ? <p>Loading…</p> : <pre style={{whiteSpace:'pre-wrap'}}>{answer}</pre>}
      </section>
    </main>
  )
}
