export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { question } = req.body || {}
  if (!question) return res.status(400).json({ error: 'missing question' })

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        max_tokens: 800
      })
    })

    const j = await r.json()
    const answer = j?.choices?.[0]?.message?.content || null
    return res.json({ answer, raw: j })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
