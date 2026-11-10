// Dynamic tag / technology library stored in Firestore: collection "taxonomy", docs "technologies" and "blogTags".
// Each doc looks like { items: ['Next.js', 'React', ...] }. New items you type in the admin are saved here
// and appear for every future project / post / service.
import { DEFAULT_TECH, DEFAULT_BLOG_TAGS, SERVICE_TECH_DEFAULTS } from './tech';

export const KINDS = {
  technologies: { defaults: DEFAULT_TECH, title: 'Technologies' },
  blogTags: { defaults: DEFAULT_BLOG_TAGS, title: 'Blog tags' },
};

export const cleanName = (s = '') => String(s).replace(/\s+/g, ' ').trim().slice(0, 40);

const uniq = (arr) => {
  const seen = new Set();
  return arr.filter((x) => { const k = x.toLowerCase(); if (!x || seen.has(k)) return false; seen.add(k); return true; });
};

export async function getTaxonomy(kind) {
  const defaults = KINDS[kind]?.defaults || [];
  try {
    const { db } = await import('./firebase');
    if (!db) return defaults;
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'taxonomy', kind));
    const items = snap.exists() ? snap.data().items : null;
    return Array.isArray(items) && items.length ? uniq(items.map(cleanName)) : defaults;
  } catch { return defaults; }
}

async function save(kind, items) {
  const { db } = await import('./firebase');
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  await setDoc(doc(db, 'taxonomy', kind), { items, updatedAt: serverTimestamp() }, { merge: true });
}

// Add a brand-new tag / technology to the library (kept for future use). Returns the updated list.
export async function addTaxonomyItem(kind, name) {
  const n = cleanName(name);
  if (!n) return getTaxonomy(kind);
  const current = await getTaxonomy(kind);
  const existing = current.find((x) => x.toLowerCase() === n.toLowerCase());
  if (existing) return current;
  const next = [...current, n];
  await save(kind, next);
  return next;
}

export async function removeTaxonomyItem(kind, name) {
  const current = await getTaxonomy(kind);
  const next = current.filter((x) => x.toLowerCase() !== String(name).toLowerCase());
  await save(kind, next);
  return next;
}

// Technologies shown as pills on each service page (doc "serviceTech/<slug>")
export async function getServiceTech(slug) {
  const defaults = SERVICE_TECH_DEFAULTS[slug] || [];
  try {
    const { db } = await import('./firebase');
    if (!db) return defaults;
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'serviceTech', slug));
    return snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : defaults;
  } catch { return defaults; }
}

export async function saveServiceTech(slug, items) {
  const { db } = await import('./firebase');
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  await setDoc(doc(db, 'serviceTech', slug), { items, updatedAt: serverTimestamp() });
}
