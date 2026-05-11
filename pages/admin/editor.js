import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { Save, ArrowLeft, Eye, Image } from 'lucide-react';

function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

const TAGS = [
  { label: 'Web Dev', color: '#DB333D' },
  { label: 'SEO', color: '#8B5CF6' },
  { label: 'Mobile', color: '#06B6D4' },
  { label: 'Backend', color: '#10B981' },
  { label: 'Business', color: '#F59E0B' },
  { label: 'Design', color: '#EF4444' },
];

export default function BlogEditor() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    tag: 'Web Dev', tagColor: '#DB333D', readTime: '5 min read', coverImage: '',
  });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      try {
        const { db } = await import('../../lib/firebase');
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'posts', id));
        if (snap.exists()) setForm({ ...form, ...snap.data() });
      } catch {}
    })();
  }, [id, user]);

  const up = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const handleTitle = (v) => setForm((f) => ({ ...f, title: v, slug: f.slug || slugify(v) }));

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    try {
      const data = new FormData(); data.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: 'POST', body: data });
      const json = await res.json();
      if (json.data?.url) up('coverImage')(json.data.url);
    } catch { alert('Upload failed.'); }
    setImgUploading(false);
  };

  const save = async () => {
    if (!form.title || !form.slug) return alert('Title and slug required.');
    setSaving(true);
    try {
      const { db } = await import('../../lib/firebase');
      const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      const payload = { ...form, updatedAt: serverTimestamp() };
      if (id) {
        await updateDoc(doc(db, 'posts', id), payload);
        setMessage('Post updated!');
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'posts'), payload);
        setMessage('Post published!');
        setTimeout(() => router.push('/admin'), 1500);
      }
    } catch (err) { alert('Save failed: ' + err.message); }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading || !user) return null;

  return (
    <>
      <Head><title>{id ? 'Edit Post' : 'New Post'} | Stackaura Admin</title><meta name="robots" content="noindex" /></Head>
      <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-50" style={{ background: '#F0EFF2', borderBottom: '1px solid #1A2236' }}>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5 text-xs" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>
              <ArrowLeft size={13} /> Dashboard
            </Link>
            <span style={{ color: '#DDE1EA' }}>|</span>
            <span className="text-xs font-medium" style={{ color: '#4B5563', fontFamily: 'Syne,sans-serif' }}>{id ? 'Edit Post' : 'New Post'}</span>
          </div>
          <div className="flex items-center gap-3">
            {message && <span className="text-xs" style={{ color: '#10B981', fontFamily: 'DM Sans,sans-serif' }}>{message}</span>}
            <button onClick={() => setPreview(!preview)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: '#DDE1EA', color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>
              <Eye size={13} /> {preview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={save} disabled={saving} className="btn-primary text-xs px-4 py-2" style={{ opacity: saving ? 0.7 : 1 }}>
              <Save size={13} /> {saving ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {preview ? (
            <div className="prose-custom">
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#000129', fontWeight: 700, marginBottom: '1rem' }}>{form.title || 'Untitled'}</h1>
              <p style={{ color: '#6B7280', marginBottom: '2rem', fontFamily: 'DM Sans,sans-serif' }}>{form.excerpt}</p>
              {form.coverImage && <img src={form.coverImage} alt="" className="rounded-xl mb-8 w-full" />}
              <div dangerouslySetInnerHTML={{ __html: form.content }} />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Title */}
              <input type="text" placeholder="Post title..."
                value={form.title} onChange={(e) => handleTitle(e.target.value)}
                className="w-full text-3xl font-bold bg-transparent outline-none border-0"
                style={{ color: '#000129', fontFamily: 'Syne,sans-serif', caretColor: '#DB333D' }} />

              {/* Slug */}
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'JetBrains Mono,monospace' }}>slug:</span>
                <input type="text" value={form.slug} onChange={(e) => up('slug')(slugify(e.target.value))}
                  className="flex-1 text-xs bg-transparent outline-none"
                  style={{ color: '#DB333D', fontFamily: 'JetBrains Mono,monospace' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tags */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Tag</label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <button key={t.label} onClick={() => setForm({ ...form, tag: t.label, tagColor: t.color })}
                        className="text-xs px-2 py-1 rounded-md transition-all"
                        style={{ background: form.tag === t.label ? `${t.color}20` : '#DDE1EA', color: form.tag === t.label ? t.color : '#6B7280', border: `1px solid ${form.tag === t.label ? t.color + '40' : 'transparent'}`, fontFamily: 'DM Sans,sans-serif' }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Read time */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Read Time</label>
                  <input type="text" placeholder="5 min read" value={form.readTime}
                    onChange={(e) => up('readTime')(e.target.value)} className="input" />
                </div>

                {/* Cover image */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Cover Image</label>
                  <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-xs"
                    style={{ background: '#F0EFF2', border: '1px solid #1A2236', color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>
                    <Image size={13} />
                    {imgUploading ? 'Uploading...' : form.coverImage ? 'Change Image' : 'Upload Cover'}
                    <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
                  </label>
                  {form.coverImage && <img src={form.coverImage} alt="" className="mt-2 rounded-lg w-full h-16 object-cover" />}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Excerpt (used for SEO + card preview)</label>
                <textarea rows={2} placeholder="Short summary of this post..." value={form.excerpt}
                  onChange={(e) => up('excerpt')(e.target.value)} className="input resize-none" />
              </div>

              <div className="h-px" style={{ background: '#DDE1EA' }} />

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Content (HTML)</label>
                  <span className="text-xs" style={{ color: '#DDE1EA', fontFamily: 'JetBrains Mono,monospace' }}>html</span>
                </div>
                <textarea rows={22} value={form.content} onChange={(e) => up('content')(e.target.value)}
                  placeholder={'<h2>Introduction</h2>\n<p>Your article content here...</p>\n\n<h2>Section 2</h2>\n<p>More content...</p>'}
                  className="input resize-y"
                  style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '0.8rem', lineHeight: 1.7 }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
