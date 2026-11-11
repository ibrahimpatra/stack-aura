import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { PlusCircle, Edit3, Trash2, LogOut, FileText, Briefcase, Eye, Star } from 'lucide-react';

function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Admin() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('projects');
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { db } = await import('../../lib/firebase');
        if (!db) return;
        const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
        const [psnap, bsnap] = await Promise.all([
          getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc'))),
          getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc'))),
        ]);
        setProjects(psnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setPosts(bsnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {}
      setDataLoading(false);
    })();
  }, [user]);

  const deleteItem = async (col, id, setter, list) => {
    if (!confirm('Delete this item?')) return;
    try {
      const { db } = await import('../../lib/firebase');
      const { doc, deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, col, id));
      setter(list.filter((i) => i.id !== id));
    } catch { alert('Delete failed.'); }
  };

  const toggleFeatured = async (project) => {
    try {
      const { db } = await import('../../lib/firebase');
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'projects', project.id), { featured: !project.featured });
      setProjects(projects.map((p) => p.id === project.id ? { ...p, featured: !p.featured } : p));
    } catch {}
  };

  const logout = async () => {
    const { auth } = await import('../../lib/firebase');
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
    router.push('/');
  };

  if (loading) return <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="w-7 h-7 border-2 rounded-full animate-spin" style={{ borderColor: '#DDE1EA', borderTopColor: '#DB333D' }} /></div>;
  if (!user) return null;

  return (
    <>
      <Head><title>Admin | stackaura.cc</title><meta name="robots" content="noindex" /></Head>
      <div className="light-ui" dir="ltr" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: '#F0EFF2', borderBottom: '1px solid #1A2236' }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#DB333D,#c2282f)' }}>
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'Syne,sans-serif' }}>S</span>
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/assistant" className="text-xs font-semibold" style={{ color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}>AI Assistant</Link>
            <Link href="/admin/tags" className="text-xs font-semibold" style={{ color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}>Tags &amp; Technologies</Link>
            <Link href="/" className="text-xs" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>View Site</Link>
            <button onClick={logout} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: '#DDE1EA', color: '#4B5563', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Projects', value: projects.length, icon: <Briefcase size={16} />, color: '#DB333D' },
              { label: 'Featured', value: projects.filter((p) => p.featured).length, icon: <Star size={16} />, color: '#F59E0B' },
              { label: 'Blog Posts', value: posts.length, icon: <FileText size={16} />, color: '#8B5CF6' },
              { label: 'Published', value: posts.length, icon: <Eye size={16} />, color: '#10B981' },
            ].map((s) => (
              <div key={s.label} className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                  <span className="text-xs" style={{ color: '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>{s.label}</span>
                </div>
                <div className="font-bold text-2xl" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: 'projects', label: 'Projects', icon: <Briefcase size={14} /> },
              { key: 'posts', label: 'Blog Posts', icon: <FileText size={14} /> },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all"
                style={{ background: tab === t.key ? 'rgba(219,51,61,0.15)' : '#F0EFF2', border: `1px solid ${tab === t.key ? '#DB333D' : '#DDE1EA'}`, color: tab === t.key ? '#DB333D' : '#6B7280', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Projects table */}
          {tab === 'projects' && (
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1A2236' }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ background: '#F0EFF2', borderBottom: '1px solid #1A2236' }}>
                <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Projects</h2>
                <Link href="/admin/project-editor" className="flex items-center gap-1.5 btn-primary text-xs px-4 py-2">
                  <PlusCircle size={13} /> New Project
                </Link>
              </div>
              {dataLoading ? (
                <div className="text-center py-10" style={{ background: '#FFFFFF' }}>
                  <div className="w-6 h-6 border-2 rounded-full animate-spin mx-auto" style={{ borderColor: '#DDE1EA', borderTopColor: '#DB333D' }} />
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12" style={{ background: '#FFFFFF' }}>
                  <p style={{ color: '#9CA3AF', fontFamily: 'IBM Plex Sans,sans-serif' }}>No projects yet.</p>
                  <Link href="/admin/project-editor" className="mt-2 inline-block text-sm" style={{ color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}>Add your first project </Link>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF' }}>
                  {projects.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: '1px solid #0D1220' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#0A0F1A'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      {p.images?.[0] && (
                        <img src={p.images[0].src || p.images[0]} alt={p.title} className="w-12 h-8 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => { e.target.style.display = 'none'; }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate" style={{ color: '#000129', fontFamily: 'Syne,sans-serif' }}>{p.title}</div>
                        {p.client && <div className="text-xs" style={{ color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}>{p.client}</div>}
                        <div className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'IBM Plex Sans,sans-serif' }}>{formatDate(p.createdAt)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleFeatured(p)} className="p-2 rounded-lg" title="Toggle featured"
                          style={{ color: p.featured ? '#F59E0B' : '#9CA3AF' }}>
                          <Star size={14} fill={p.featured ? '#F59E0B' : 'none'} />
                        </button>
                        <Link href={`/projects/${p.slug}`} target="_blank" className="p-2 rounded-lg" style={{ color: '#6B7280' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#DDE1EA'; e.currentTarget.style.color = '#DB333D'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}>
                          <Eye size={14} />
                        </Link>
                        <Link href={`/admin/project-editor?id=${p.id}`} className="p-2 rounded-lg" style={{ color: '#6B7280' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#DDE1EA'; e.currentTarget.style.color = '#06B6D4'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}>
                          <Edit3 size={14} />
                        </Link>
                        <button onClick={() => deleteItem('projects', p.id, setProjects, projects)} className="p-2 rounded-lg" style={{ color: '#6B7280' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#EF4444'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Blog posts table */}
          {tab === 'posts' && (
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1A2236' }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ background: '#F0EFF2', borderBottom: '1px solid #1A2236' }}>
                <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Blog Posts</h2>
                <Link href="/admin/editor" className="flex items-center gap-1.5 btn-primary text-xs px-4 py-2">
                  <PlusCircle size={13} /> New Post
                </Link>
              </div>
              {dataLoading ? (
                <div className="text-center py-10" style={{ background: '#FFFFFF' }}>
                  <div className="w-6 h-6 border-2 rounded-full animate-spin mx-auto" style={{ borderColor: '#DDE1EA', borderTopColor: '#DB333D' }} />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12" style={{ background: '#FFFFFF' }}>
                  <p style={{ color: '#9CA3AF', fontFamily: 'IBM Plex Sans,sans-serif' }}>No posts yet.</p>
                  <Link href="/admin/editor" className="mt-2 inline-block text-sm" style={{ color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}>Write your first post </Link>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF' }}>
                  {posts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #0D1220' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#0A0F1A'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate" style={{ color: '#000129', fontFamily: 'Syne,sans-serif' }}>{p.title}</div>
                        <div className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'IBM Plex Sans,sans-serif' }}>{formatDate(p.createdAt)}</div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/blog/${p.slug}`} target="_blank" className="p-2 rounded-lg" style={{ color: '#6B7280' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#DB333D'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}>
                          <Eye size={14} />
                        </Link>
                        <Link href={`/admin/editor?id=${p.id}`} className="p-2 rounded-lg" style={{ color: '#6B7280' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#06B6D4'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}>
                          <Edit3 size={14} />
                        </Link>
                        <button onClick={() => deleteItem('posts', p.id, setPosts, posts)} className="p-2 rounded-lg" style={{ color: '#6B7280' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
