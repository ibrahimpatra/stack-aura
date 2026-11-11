import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { Save, ArrowLeft, Eye, Image, X } from 'lucide-react';
import TagPicker from '../../components/admin/TagPicker';
import ImageUploader from '../../components/admin/ImageUploader';
import { figureHtml } from '../../lib/media';

function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default function BlogEditor() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', title_ar: '', excerpt_ar: '', content_ar: '',
    tags: [], tag: '', tagColor: '#DB333D', readTime: '5 min read', coverImage: '', coverAlt: '',
  });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      try {
        const { db } = await import('../../lib/firebase');
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'posts', id));
        if (snap.exists()) { const d = snap.data(); setForm({ ...form, ...d, tags: d.tags?.length ? d.tags : (d.tag ? [d.tag] : []) }); }
      } catch {}
    })();
  }, [id, user]);

  const up = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const handleTitle = (v) => setForm((f) => ({ ...f, title: v, slug: f.slug || slugify(v) }));

  const contentRef = useRef(null);
  const [showInsert, setShowInsert] = useState(false);
  const insertIntoContent = (img) => {
    const el = contentRef.current; const html = figureHtml(img);
    const pos = el ? el.selectionStart : form.content.length;
    setForm((f) => ({ ...f, content: f.content.slice(0, pos) + html + f.content.slice(pos) }));
    setShowInsert(false);
  };

  const save = async () => {
    if (!form.title || !form.slug) return alert('Title and slug required.');
    setSaving(true);
    try {
      const { db } = await import('../../lib/firebase');
      const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      const payload = { ...form, tag: form.tags[0] || '', tagColor: '#DB333D', updatedAt: serverTimestamp() };
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
      <Head><title>{id ? 'Edit Post' : 'New Post'} | stackaura.cc Admin</title><meta name="robots" content="noindex" /></Head>
      <div className="light-ui" dir="ltr" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-50" style={{ background: '#F0EFF2', borderBottom: '1px solid #1A2236' }}>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5 text-xs" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              <ArrowLeft size={13} /> Dashboard
            </Link>
            <span style={{ color: '#DDE1EA' }}>|</span>
            <span className="text-xs font-medium" style={{ color: '#4B5563', fontFamily: 'Syne,sans-serif' }}>{id ? 'Edit Post' : 'New Post'}</span>
          </div>
          <div className="flex items-center gap-3">
            {message && <span className="text-xs" style={{ color: '#10B981', fontFamily: 'IBM Plex Sans,sans-serif' }}>{message}</span>}
            <button onClick={() => setPreview(!preview)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: '#DDE1EA', color: '#4B5563', fontFamily: 'IBM Plex Sans,sans-serif' }}>
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
              <p style={{ color: '#6B7280', marginBottom: '2rem', fontFamily: 'IBM Plex Sans,sans-serif' }}>{form.excerpt}</p>
              {form.coverImage && <img src={form.coverImage} alt={form.coverAlt} className="rounded-xl mb-8 w-full" />}
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
                <span className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'IBM Plex Mono,monospace' }}>slug:</span>
                <input type="text" value={form.slug} onChange={(e) => up('slug')(slugify(e.target.value))}
                  className="flex-1 text-xs bg-transparent outline-none"
                  style={{ color: '#DB333D', fontFamily: 'IBM Plex Mono,monospace' }} />
              </div>

              <div>
                <label className="mb-2 block font-semibold" style={{ color: '#374151', fontFamily: 'IBM Plex Sans,sans-serif' }}>Tags — pick as many as you like, or add your own with “Other / Custom”</label>
                <TagPicker kind="blogTags" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block font-semibold" style={{ color: '#374151', fontFamily: 'IBM Plex Sans,sans-serif' }}>Read Time</label>
                  <input type="text" placeholder="5 min read" value={form.readTime} onChange={(e) => up('readTime')(e.target.value)} className="input" />
                </div>
                <div>
                  <label className="mb-2 block font-semibold" style={{ color: '#374151', fontFamily: 'IBM Plex Sans,sans-serif' }}>Cover Image</label>
                  {form.coverImage ? (
                    <div>
                      <div className="relative">
                        <img src={form.coverImage} alt={form.coverAlt} className="rounded-lg w-full" style={{ maxHeight: 160, objectFit: 'cover' }} />
                        <button type="button" onClick={() => setForm((f) => ({ ...f, coverImage: '', coverAlt: '' }))} className="absolute top-2 right-2 p-1.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.95)', color: '#fff' }}><X size={14} /></button>
                      </div>
                      <input className="input mt-2" placeholder="Alt text (describe the picture)" value={form.coverAlt} onChange={(e) => up('coverAlt')(e.target.value)} />
                    </div>
                  ) : (
                    <ImageUploader defaultAlt={form.title ? `${form.title} – stackaura.cc blog` : ''} buttonLabel="Upload cover" onUploaded={(img) => setForm((f) => ({ ...f, coverImage: img.src, coverAlt: img.alt }))} />
                  )}
                </div>
              </div>

              {/* Arabic version */}
              <div className="p-5 rounded-xl" style={{ background: '#F3F4F8', border: '1px solid #DDE1EA' }}>
                <div className="font-bold mb-1" style={{ color: '#000129', fontFamily: 'Syne,sans-serif' }}>Arabic version (optional)</div>
                <p className="mb-4" style={{ color: '#6B7280', fontSize: '0.95rem' }}>Fill this in and the Arabic site (/ar) shows it. Leave empty and Arabic visitors see the English post.</p>
                <input className="input mb-3" dir="rtl" placeholder="العنوان" value={form.title_ar} onChange={(e) => up('title_ar')(e.target.value)} />
                <textarea rows={2} className="input resize-none mb-3" dir="rtl" placeholder="ملخص قصير" value={form.excerpt_ar} onChange={(e) => up('excerpt_ar')(e.target.value)} />
                <textarea rows={12} className="input" dir="rtl" placeholder="المحتوى (HTML)" value={form.content_ar} onChange={(e) => up('content_ar')(e.target.value)} style={{ fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.95rem' }} />
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Excerpt (used for SEO + card preview)</label>
                <textarea rows={2} placeholder="Short summary of this post..." value={form.excerpt}
                  onChange={(e) => up('excerpt')(e.target.value)} className="input resize-none" />
              </div>

              <div className="h-px" style={{ background: '#DDE1EA' }} />

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>Content (HTML)</label>
                  <button type="button" onClick={() => setShowInsert(!showInsert)} className="px-3 py-1.5 rounded-lg text-sm" style={{ background: '#E5E7EE', color: '#374151' }}>{showInsert ? 'Close' : '+ Add image to article'}</button>
                </div>
                {showInsert && <div className="mb-3"><ImageUploader defaultAlt={form.title} buttonLabel="Upload & insert at cursor" onUploaded={insertIntoContent} /></div>}
                <textarea ref={contentRef} rows={22} value={form.content} onChange={(e) => up('content')(e.target.value)}
                  placeholder={'<h2>Introduction</h2>\n<p>Your article content here...</p>\n\n<h2>Section 2</h2>\n<p>More content...</p>'}
                  className="input resize-y"
                  style={{ fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.8rem', lineHeight: 1.7 }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
