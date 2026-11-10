import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { Save, ArrowLeft, Plus, X, Star } from 'lucide-react';
import TagPicker from '../../components/admin/TagPicker';
import ImageUploader from '../../components/admin/ImageUploader';
import { normImages } from '../../lib/media';

function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default function ProjectEditor() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: '', slug: '', client: '', excerpt: '', description: '',
    images: [], tags: [], features: [], results: [],
    liveUrl: '', githubUrl: '', featured: false, order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newResult, setNewResult] = useState('');

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      try {
        const { db } = await import('../../lib/firebase');
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'projects', id));
        if (snap.exists()) { const d = snap.data(); setForm({ ...form, ...d, images: normImages(d.images) }); }
      } catch {}
    })();
  }, [id, user]);

  const up = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitle = (v) => setForm((f) => ({ ...f, title: v, slug: f.slug || slugify(v) }));

  const addImage = (img) => setForm((f) => ({ ...f, images: [...f.images, img] }));
  const setImgField = (i, k, v) => setForm((f) => ({ ...f, images: f.images.map((im, idx) => (idx === i ? { ...im, [k]: v } : im)) }));

  const removeImage = (i) => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const addFeature = () => { if (!newFeature.trim()) return; setForm((f) => ({ ...f, features: [...f.features, newFeature.trim()] })); setNewFeature(''); };
  const addResult = () => { if (!newResult.trim()) return; setForm((f) => ({ ...f, results: [...f.results, newResult.trim()] })); setNewResult(''); };

  const save = async () => {
    if (!form.title || !form.slug) return alert('Title and slug required.');
    setSaving(true);
    try {
      const { db } = await import('../../lib/firebase');
      const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      const payload = { ...form, updatedAt: serverTimestamp() };
      if (id) {
        await updateDoc(doc(db, 'projects', id), payload);
        setMessage('Project updated!');
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'projects'), payload);
        setMessage('Project saved!');
        setTimeout(() => router.push('/admin'), 1500);
      }
    } catch (err) { alert('Save failed: ' + err.message); }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading || !user) return null;

  return (
    <>
      <Head><title>{id ? 'Edit Project' : 'New Project'} | stackaura.cc Admin</title><meta name="robots" content="noindex" /></Head>
      <div className="light-ui" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-50" style={{ background: '#F0EFF2', borderBottom: '1px solid #1A2236' }}>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5 text-xs" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              <ArrowLeft size={13} /> Dashboard
            </Link>
            <span style={{ color: '#DDE1EA' }}>|</span>
            <span className="text-xs font-medium" style={{ color: '#4B5563', fontFamily: 'Syne,sans-serif' }}>{id ? 'Edit Project' : 'New Project'}</span>
          </div>
          <div className="flex items-center gap-3">
            {message && <span className="text-xs" style={{ color: '#10B981', fontFamily: 'IBM Plex Sans,sans-serif' }}>{message}</span>}
            <button onClick={save} disabled={saving} className="btn-primary text-xs px-4 py-2" style={{ opacity: saving ? 0.7 : 1 }}>
              <Save size={13} /> {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {/* Basic info */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-5" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Project Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Project Title *</label>
                <input className="input" placeholder="Kuwait India Driving School" value={form.title} onChange={(e) => handleTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Client / Company Name</label>
                <input className="input" placeholder="Kuwait India Driving School" value={form.client} onChange={(e) => up('client')(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>URL Slug</label>
                <input className="input" style={{ fontFamily: 'IBM Plex Mono,monospace', color: '#DB333D', fontSize: '0.8rem' }}
                  value={form.slug} onChange={(e) => up('slug')(slugify(e.target.value))} />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Display Order</label>
                <input type="number" className="input" value={form.order} onChange={(e) => up('order')(parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Short Excerpt (shown in cards)</label>
              <textarea rows={2} className="input resize-none" placeholder="Brief description for project cards and SEO..." value={form.excerpt} onChange={(e) => up('excerpt')(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Live URL</label>
                <input className="input" placeholder="https://example.com" value={form.liveUrl} onChange={(e) => up('liveUrl')(e.target.value)} />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>GitHub URL (optional)</label>
                <input className="input" placeholder="https://github.com/..." value={form.githubUrl} onChange={(e) => up('githubUrl')(e.target.value)} />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <button type="button" onClick={() => up('featured')(!form.featured)}
                className="w-5 h-5 rounded flex items-center justify-center transition-all"
                style={{ background: form.featured ? 'rgba(245,158,11,0.2)' : '#DDE1EA', border: `1px solid ${form.featured ? '#F59E0B' : '#DDE1EA'}` }}>
                {form.featured && <Star size={12} style={{ color: '#F59E0B' }} />}
              </button>
              <span className="text-sm" style={{ color: '#4B5563', fontFamily: 'IBM Plex Sans,sans-serif' }}>Feature on homepage</span>
            </label>
          </div>

          {/* Images */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Screenshots / Images</h2>
            <p className="text-xs mb-4" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>The first image is the cover. Each image gets alt text and a keyword file name so it can appear in Google Images.</p>

            <ImageUploader allowUrl defaultAlt={form.title ? `${form.title}${form.client ? ' – ' + form.client : ''} website screenshot` : ''} onUploaded={addImage} />

            {form.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {form.images.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid #DDE1EA', background: '#fff' }}>
                    <div className="relative" style={{ height: 130 }}>
                      <img src={img.src} alt={img.alt || `img ${i}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.95)', color: 'white' }}><X size={14} /></button>
                      {i === 0 && <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(219,51,61,0.95)', color: 'white' }}>Cover</span>}
                    </div>
                    <div className="p-3">
                      <input className="input" style={{ padding: '8px 10px', fontSize: '0.95rem' }} placeholder="Alt text (what is in the picture)" value={img.alt || ''} onChange={(e) => setImgField(i, 'alt', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Full Description (HTML)</h2>
            <textarea rows={10} className="input resize-y" style={{ fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.8rem', lineHeight: 1.7 }}
              placeholder="<h2>About the Project</h2>&#10;<p>Describe what you built, the challenges, and the solution...</p>"
              value={form.description} onChange={(e) => up('description')(e.target.value)} />
          </div>

          {/* Tech tags */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Technologies Used</h2>
            <p className="text-xs mb-4" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Pick from your list. Missing one? Press “Other / Custom”, type it, and it is saved for all future projects.</p>
            <TagPicker kind="technologies" showLogos value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />
          </div>

          {/* Features */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Key Features</h2>
            <div className="flex gap-2 mb-4">
              <input className="input flex-1" placeholder="e.g. SSR with Next.js for SEO" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFeature()} />
              <button onClick={addFeature} className="btn-primary px-4 py-2 text-xs"><Plus size={14} /></button>
            </div>
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 mb-2 px-3 py-2 rounded-xl" style={{ background: '#F0EFF2', border: '1px solid #1A2236' }}>
                <span className="flex-1 text-sm" style={{ color: '#4B5563', fontFamily: 'IBM Plex Sans,sans-serif' }}>{f}</span>
                <button onClick={() => setForm((fm) => ({ ...fm, features: fm.features.filter((_, idx) => idx !== i) }))} style={{ color: '#9CA3AF' }}><X size={13} /></button>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Results / Outcomes</h2>
            <div className="flex gap-2 mb-4">
              <input className="input flex-1" placeholder="e.g. Ranked on Google first page within 3 weeks" value={newResult} onChange={(e) => setNewResult(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addResult()} />
              <button onClick={addResult} className="btn-primary px-4 py-2 text-xs"><Plus size={14} /></button>
            </div>
            {form.results.map((r, i) => (
              <div key={i} className="flex items-center gap-2 mb-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <span className="flex-1 text-sm" style={{ color: '#4B5563', fontFamily: 'IBM Plex Sans,sans-serif' }}>{r}</span>
                <button onClick={() => setForm((fm) => ({ ...fm, results: fm.results.filter((_, idx) => idx !== i) }))} style={{ color: '#9CA3AF' }}><X size={13} /></button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pb-10">
            <Link href="/admin" className="btn-ghost">Cancel</Link>
            <button onClick={save} disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
              <Save size={15} /> {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
