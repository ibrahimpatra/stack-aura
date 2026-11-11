// AI assistant endpoint — powered by Google Gemini.
// Needs GEMINI_API_KEY (server-side only; never exposed to the browser). Optional: GEMINI_MODEL.
import { staticKnowledge, dynamicKnowledge, SYSTEM_RULES } from '../../lib/knowledge';

const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const BASE = process.env.GEMINI_API_BASE || 'https://generativelanguage.googleapis.com'; // (only changed for testing)
const hits = new Map(); // simple per-IP rate limit (resets when the server restarts)

function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 24;
}

async function logChat(entry) {
  try {
    const { db } = await import('../../lib/firebase');
    if (!db) return;
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection(db, 'chatLogs'), { ...entry, resolved: false, createdAt: serverTimestamp() });
  } catch {}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!KEY) return res.status(503).json({ error: 'not_configured' });
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
  if (limited(ip)) return res.status(429).json({ error: 'rate_limited' });

  const { messages = [], locale = 'en' } = req.body || {};
  const clean = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-10).map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.slice(0, 1200) }] }));
  while (clean.length && clean[0].role !== 'user') clean.shift();
  if (!clean.length || clean[clean.length - 1].role !== 'user') return res.status(400).json({ error: 'bad_request' });

  try {
    const knowledge = `${staticKnowledge()}${await dynamicKnowledge()}`;
    const system = `${SYSTEM_RULES}\nThe visitor's site language is: ${locale === 'ar' ? 'Arabic' : 'English'}.\n\nKNOWLEDGE:\n${knowledge}`;

    const generationConfig = { maxOutputTokens: 800, temperature: 0.5 };
    // Gemini 2.5 Flash "thinks" by default (slower + costs tokens). A support chat doesn't need it.
    if (/2\.5-flash/.test(MODEL)) generationConfig.thinkingConfig = { thinkingBudget: 0 };

    const r = await fetch(`${BASE}/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: clean, generationConfig }),
    });
    if (!r.ok) return res.status(502).json({ error: 'upstream' });
    const data = await r.json();
    let text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
    const unsure = /\[\[UNSURE\]\]/.test(text);
    text = text.replace(/\[\[UNSURE\]\]/g, '').trim();
    if (!text) return res.status(502).json({ error: 'empty' });

    const q = clean[clean.length - 1].parts[0].text.slice(0, 500);
    logChat({ q, a: text.slice(0, 2000), unsure, locale });
    return res.status(200).json({ reply: text, unsure });
  } catch {
    return res.status(502).json({ error: 'failed' });
  }
}
