// SEO-friendly image handling.
//  • compresses every upload to WebP (fast pages = better Google ranking)
//  • names the file from the alt text, e.g. "kuwait-india-driving-school-website-kuwait-x7k2.webp"
//  • uploads to Firebase Storage and serves it from YOUR domain at https://stackaura.cc/media/<name>
//  • falls back to ImgBB only if Storage fails
//  • records alt / title / caption so pages, structured data and the image sitemap can use them
import { SITE } from './seo';

export const normImage = (x) => {
  if (!x) return null;
  if (typeof x === 'string') return { src: x, alt: '', title: '', caption: '' };
  return { alt: '', title: '', caption: '', ...x, src: x.src || x.url || '' };
};
export const normImages = (arr) => (Array.isArray(arr) ? arr.map(normImage).filter((i) => i && i.src) : []);
export const absUrl = (src = '') => (src.startsWith('/') ? `${SITE.url}${src}` : src);
export const imgAlt = (img, fallback = '') => (img?.alt || fallback || '').trim();

export const seoName = (text = '') =>
  String(text).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 70) || 'image';

const rand = () => Math.random().toString(36).slice(2, 6);

async function toWebp(file, maxW = 1600, quality = 0.82) {
  if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) return { blob: file, width: 0, height: 0, ext: (file.name.split('.').pop() || 'png').toLowerCase() };
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxW / bmp.width);
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(bmp, 0, 0, w, h);
  const blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', quality));
  return { blob: blob || file, width: w, height: h, ext: blob ? 'webp' : 'png' };
}

export async function uploadImageSEO(file, { alt = '', title = '', caption = '' } = {}) {
  const { blob, width, height, ext } = await toWebp(file);
  const name = `${seoName(alt || title || file.name.replace(/\.[^.]+$/, ''))}-${rand()}.${ext}`;
  let src = '';

  try {
    const { storage } = await import('./firebase');
    if (!storage) throw new Error('no storage');
    const { ref, uploadBytes } = await import('firebase/storage');
    await uploadBytes(ref(storage, `media/${name}`), blob, {
      contentType: blob.type || 'image/webp',
      cacheControl: 'public, max-age=31536000, immutable',
    });
    src = `/media/${name}`;
  } catch (e) {
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) throw new Error('Image upload failed: Firebase Storage is not enabled yet (and no ImgBB key set). See README → "Image hosting".');
    const data = new FormData(); data.append('image', blob, name);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: 'POST', body: data });
    const json = await res.json();
    if (!json.data?.url) throw new Error('Image upload failed.');
    src = json.data.url;
  }

  const img = { src, alt, title: title || alt, caption, width, height };
  try { // keep a searchable media library
    const { db } = await import('./firebase');
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    if (db) await setDoc(doc(db, 'media', name.replace(/\.[^.]+$/, '')), { ...img, name, createdAt: serverTimestamp() });
  } catch {}
  return img;
}

// HTML to paste inside blog content: responsive, lazy, with alt text + caption (what Google Images likes)
export const figureHtml = (img) =>
  `<figure>\n  <img src="${img.src}" alt="${(img.alt || '').replace(/"/g, '&quot;')}" title="${(img.title || img.alt || '').replace(/"/g, '&quot;')}"${img.width ? ` width="${img.width}" height="${img.height}"` : ''} loading="lazy" />\n${img.caption ? `  <figcaption>${img.caption}</figcaption>\n` : ''}</figure>\n`;
