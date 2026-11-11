import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { ArrowLeft, X, Save } from 'lucide-react';
import TagPicker from '../../components/admin/TagPicker';
import { SERVICES } from '../../lib/seo';
import { getTaxonomy, addTaxonomyItem, removeTaxonomyItem, getServiceTech, saveServiceTech, KINDS } from '../../lib/taxonomy';
import { techLogo } from '../../lib/tech';

function Library({ kind, withLogos }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => { getTaxonomy(kind).then(setItems); }, [kind]);
  const add = async () => { if (!text.trim()) return; setItems(await addTaxonomyItem(kind, text)); setText(''); };
  const remove = async (n) => { if (confirm(`Remove “${n}” from the library? (Projects that already use it keep it.)`)) setItems(await removeTaxonomyItem(kind, n)); };
  return (
    <div className="card p-6">
      <h2 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: '#000129', fontSize: '1.3rem' }}>{KINDS[kind].title} library</h2>
      <p className="mb-4" style={{ color: '#4B5563', fontSize: '1rem' }}>Everything here shows up as a choice in the editors{withLogos ? ' and as a logo in the home-page technology strip' : ''}.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((n) => (
          <span key={n} className="inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-lg" style={{ background: '#E5E7EE', color: '#1F2937', fontSize: '1rem' }}>
            {withLogos && techLogo(n) && <img src={techLogo(n)} alt="" width={16} height={16} style={{ filter: 'brightness(0.35)' }} />}
            {n}
            <button onClick={() => remove(n)} aria-label={`Remove ${n}`} className="p-1 rounded" style={{ color: '#9CA3AF' }}><X size={14} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="input" style={{ maxWidth: 320 }} placeholder="Add a new one…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button onClick={add} className="btn-primary" style={{ padding: '10px 22px' }}>Add</button>
      </div>
      {withLogos && <p className="mt-3" style={{ color: '#6B7280', fontSize: '0.95rem' }}>Logo for a new technology: save its SVG as <code>public/tech/&lt;name-in-lowercase&gt;.svg</code> (e.g. <code>laravel.svg</code>). Without a file, a neat letter badge is shown instead.</p>}
    </div>
  );
}

export default function TagsAdmin() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [svc, setSvc] = useState({});
  const [saved, setSaved] = useState('');

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);
  useEffect(() => {
    if (!user) return;
    (async () => {
      const entries = await Promise.all(SERVICES.map(async (s) => [s.slug, await getServiceTech(s.slug)]));
      setSvc(Object.fromEntries(entries));
    })();
  }, [user]);

  const saveSvc = async (slug) => {
    try { await saveServiceTech(slug, svc[slug] || []); setSaved(slug); setTimeout(() => setSaved(''), 2500); } catch (e) { alert('Save failed: ' + e.message); }
  };

  if (loading || !user) return null;
  return (
    <>
      <Head><title>Tags & Technologies | stackaura.cc Admin</title><meta name="robots" content="noindex" /></Head>
      <div className="light-ui" dir="ltr" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#F0EFF2', borderBottom: '1px solid #DDE1EA' }}>
          <Link href="/admin" className="flex items-center gap-1.5" style={{ color: '#4B5563', fontSize: '1rem' }}><ArrowLeft size={16} /> Dashboard</Link>
          <span style={{ color: '#9CA3AF' }}>|</span>
          <span className="font-semibold" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Tags &amp; Technologies</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <Library kind="technologies" withLogos />
          <Library kind="blogTags" />

          <div className="card p-6">
            <h2 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: '#000129', fontSize: '1.3rem' }}>Technologies shown on each service page</h2>
            <p className="mb-5" style={{ color: '#4B5563', fontSize: '1rem' }}>These appear as pills (with logos) on the service page. Need a new one? Use “Other / Custom”.</p>
            <div className="space-y-6">
              {SERVICES.map((s) => (
                <div key={s.slug} className="pb-6" style={{ borderBottom: '1px solid #E5E7EE' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: '#000129', fontSize: '1.1rem' }}>{s.label}</h3>
                    <button onClick={() => saveSvc(s.slug)} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.95rem' }}><Save size={16} /> {saved === s.slug ? 'Saved' : 'Save'}</button>
                  </div>
                  <TagPicker kind="technologies" showLogos value={svc[s.slug] || []} onChange={(v) => setSvc((o) => ({ ...o, [s.slug]: v }))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
