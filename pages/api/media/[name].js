// Serves uploaded images from YOUR domain:  https://stackaura.cc/media/<name>  →  Firebase Storage
// (see rewrites in next.config.js). Google then indexes the image under stackaura.cc with a keyword filename.
const BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const OK = /^[a-z0-9][a-z0-9-]{0,120}\.(webp|jpg|jpeg|png|gif|avif)$/;

export default async function handler(req, res) {
  const { name } = req.query;
  if (!BUCKET || typeof name !== 'string' || !OK.test(name)) return res.status(404).end('Not found');
  try {
    const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(`media/${name}`)}?alt=media`;
    const r = await fetch(url);
    if (!r.ok) return res.status(404).end('Not found');
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    res.setHeader('Content-Length', buf.length);
    res.status(200).send(buf);
  } catch { res.status(502).end('Bad gateway'); }
}
export const config = { api: { responseLimit: false } };
