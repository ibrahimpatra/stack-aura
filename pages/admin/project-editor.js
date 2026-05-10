import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { Save, ArrowLeft, Plus, X, Image, Star } from 'lucide-react';

function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

const TAGS = ['Next.js', 'React', 'React Native', 'Firebase', 'Node.js', 'Tailwind', 'TypeScript', 'SEO', 'Stripe', 'PostgreSQL', 'Figma', 'iOS', 'Android', 'Expo', 'WordPress', 'Custom'];

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
  const [newImage, setNewImage] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newResult, setNewResult] = useState('');
  const [imgUploading, setImgUploading] = useState(false);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      try {
        const { db } = await import('../../lib/firebase');
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'projects', id));
        if (snap.exists()) setForm({ ...form, ...snap.data() });
      } catch {}
    })();
  }, [id, user]);

  const up = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitle = (v) => setForm((f) => ({ ...f, title: v, slug: f.slug || slugify(v) }));

  const addImage = () => {
    if (!newImage.trim()) return;
    setForm((f) => ({ ...f, images: [...f.images, newImage.trim()] }));
    setNewImage('');
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !process.env.NEXT_PUBLIC_IMGBB_KEY) { alert('Add NEXT_PUBLIC_IMGBB_KEY to env or paste image URL below.'); return; }
    setImgUploading(true);
    try {
      const data = new FormData(); data.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: 'POST', body: data });
      const json = await res.json();
      if (json.data?.url) setForm((f) => ({ ...f, images: [...f.images, json.data.url] }));
    } catch { alert('Upload failed.'); }
    setImgUploading(false);
  };

  const removeImage = (i) => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const toggleTag = (tag) => setForm((f) => ({
    ...f, tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
  }));

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
      <Head><title>{id ? 'Edit Project' : 'New Project'} | Stackaura Admin</title><meta name="robots" content="noindex" /></Head>
      <div style={{ background: '#080C14', minHeight: '100vh' }}>
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-50" style={{ background: '#0D1220', borderBottom: '1px solid #1A2236' }}>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5 text-xs" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>
              <ArrowLeft size={13} /> Dashboard
            </Link>
            <span style={{ color: '#1A2236' }}>|</span>
            <span className="text-xs font-medium" style={{ color: '#94A3B8', fontFamily: 'Syne,sans-serif' }}>{id ? 'Edit Project' : 'New Project'}</span>
          </div>
          <div className="flex items-center gap-3">
            {message && <span className="text-xs" style={{ color: '#10B981', fontFamily: 'DM Sans,sans-serif' }}>{message}</span>}
            <button onClick={save} disabled={saving} className="btn-primary text-xs px-4 py-2" style={{ opacity: saving ? 0.7 : 1 }}>
              <Save size={13} /> {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {/* Basic info */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-5" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Project Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Project Title *</label>
                <input className="input" placeholder="Kuwait India Driving School" value={form.title} onChange={(e) => handleTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Client / Company Name</label>
                <input className="input" placeholder="Kuwait India Driving School" value={form.client} onChange={(e) => up('client')(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>URL Slug</label>
                <input className="input" style={{ fontFamily: 'JetBrains Mono,monospace', color: '#3B82F6', fontSize: '0.8rem' }}
                  value={form.slug} onChange={(e) => up('slug')(slugify(e.target.value))} />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Display Order</label>
                <input type="number" className="input" value={form.order} onChange={(e) => up('order')(parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Short Excerpt (shown in cards)</label>
              <textarea rows={2} className="input resize-none" placeholder="Brief description for project cards and SEO..." value={form.excerpt} onChange={(e) => up('excerpt')(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Live URL</label>
                <input className="input" placeholder="https://example.com" value={form.liveUrl} onChange={(e) => up('liveUrl')(e.target.value)} />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>GitHub URL (optional)</label>
                <input className="input" placeholder="https://github.com/..." value={form.githubUrl} onChange={(e) => up('githubUrl')(e.target.value)} />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <button type="button" onClick={() => up('featured')(!form.featured)}
                className="w-5 h-5 rounded flex items-center justify-center transition-all"
                style={{ background: form.featured ? 'rgba(245,158,11,0.2)' : '#1A2236', border: `1px solid ${form.featured ? '#F59E0B' : '#1A2236'}` }}>
                {form.featured && <Star size={12} style={{ color: '#F59E0B' }} />}
              </button>
              <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>Feature on homepage</span>
            </label>
          </div>

          {/* Images */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Screenshots / Images</h2>
            <p className="text-xs mb-4" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Images appear in the carousel on the project page. Upload or paste URLs.</p>

            {/* Upload */}
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer mb-3 text-sm"
              style={{ background: '#0D1220', border: '1px solid #1A2236', color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>
              <Image size={14} /> {imgUploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
            </label>

            {/* Paste URL */}
            <div className="flex gap-2 mb-4">
              <input className="input flex-1" placeholder="Or paste image URL..." value={newImage} onChange={(e) => setNewImage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addImage()} />
              <button onClick={addImage} className="btn-primary px-4 py-2 text-xs"><Plus size={14} /></button>
            </div>

            {/* Image grid */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden" style={{ height: '100px' }}>
                    <img src={img} alt={`img ${i}`} className="w-full h-full object-cover" onError={(e) => { e.target.style.background = '#1A2236'; }} />
                    <button onClick={() => removeImage(i)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg"
                      style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}>
                      <X size={12} />
                    </button>
                    {i === 0 && <span className="absolute bottom-1.5 left-1.5 text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(59,130,246,0.9)', color: 'white', fontFamily: 'DM Sans,sans-serif' }}>Cover</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Full Description (HTML)</h2>
            <textarea rows={10} className="input resize-y" style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '0.8rem', lineHeight: 1.7 }}
              placeholder="<h2>About the Project</h2>&#10;<p>Describe what you built, the challenges, and the solution...</p>"
              value={form.description} onChange={(e) => up('description')(e.target.value)} />
          </div>

          {/* Tech tags */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button key={t} onClick={() => toggleTag(t)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{ background: form.tags.includes(t) ? 'rgba(59,130,246,0.15)' : '#1A2236', border: `1px solid ${form.tags.includes(t) ? '#3B82F6' : 'transparent'}`, color: form.tags.includes(t) ? '#3B82F6' : '#475569', fontFamily: 'DM Sans,sans-serif' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Key Features</h2>
            <div className="flex gap-2 mb-4">
              <input className="input flex-1" placeholder="e.g. SSR with Next.js for SEO" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFeature()} />
              <button onClick={addFeature} className="btn-primary px-4 py-2 text-xs"><Plus size={14} /></button>
            </div>
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 mb-2 px-3 py-2 rounded-xl" style={{ background: '#0D1220', border: '1px solid #1A2236' }}>
                <span className="flex-1 text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{f}</span>
                <button onClick={() => setForm((fm) => ({ ...fm, features: fm.features.filter((_, idx) => idx !== i) }))} style={{ color: '#374151' }}><X size={13} /></button>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="card p-6">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Results / Outcomes</h2>
            <div className="flex gap-2 mb-4">
              <input className="input flex-1" placeholder="e.g. Ranked on Google first page within 3 weeks" value={newResult} onChange={(e) => setNewResult(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addResult()} />
              <button onClick={addResult} className="btn-primary px-4 py-2 text-xs"><Plus size={14} /></button>
            </div>
            {form.results.map((r, i) => (
              <div key={i} className="flex items-center gap-2 mb-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <span className="flex-1 text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{r}</span>
                <button onClick={() => setForm((fm) => ({ ...fm, results: fm.results.filter((_, idx) => idx !== i) }))} style={{ color: '#374151' }}><X size={13} /></button>
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
