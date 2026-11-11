// Saves a visitor's name + phone from the chat widget (Admin → Assistant → Leads).
const hits = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
  const now = Date.now(); const arr = (hits.get(ip) || []).filter((t) => now - t < 3600000); arr.push(now); hits.set(ip, arr);
  if (arr.length > 6) return res.status(429).json({ error: 'rate_limited' });

  const { name = '', phone = '', message = '', locale = 'en', page = '' } = req.body || {};
  const n = String(name).trim().slice(0, 80); const p = String(phone).trim().slice(0, 25);
  if (n.length < 2 || !/^[+0-9 ()-]{6,25}$/.test(p)) return res.status(400).json({ error: 'invalid' });
  try {
    const { db } = await import('../../lib/firebase');
    if (!db) return res.status(503).json({ error: 'no_db' });
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection(db, 'leads'), { name: n, phone: p, message: String(message).slice(0, 600), locale: locale === 'ar' ? 'ar' : 'en', page: String(page).slice(0, 120), createdAt: serverTimestamp() });
    return res.status(200).json({ ok: true });
  } catch { return res.status(502).json({ error: 'failed' }); }
}
