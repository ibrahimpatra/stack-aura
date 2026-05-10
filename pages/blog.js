import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO } from '../lib/seo';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  useScrollReveal();

  const seo = pageSEO({
    title: 'Blog | Web Development, SEO & Tech Tips | Stackaura Digital',
    description: 'Articles on web development, mobile apps, SEO optimisation, and digital marketing from the Stackaura Digital team. Kuwait-based, worldwide expertise.',
    path: '/blog',
    extraKeywords: ['web development blog kuwait', 'seo tips', 'next.js tutorials', 'mobile app tips'],
  });

  useEffect(() => {
    (async () => {
      try {
        const { db } = await import('../lib/firebase');
        if (!db) { setLoading(false); return; }
        const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
        const snap = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
    p.tag?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#080C14', minHeight: '100vh' }}>
        <Navbar />
        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #1A2236' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.15)', color: '#6EE7B7' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// blog</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#E2E8F0', lineHeight: 1.1 }}>
              Articles & Insights
            </h1>
            <p className="text-lg mb-8 reveal delay-2" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
              Web development, SEO, mobile, and building products that scale.
            </p>
            <div className="relative max-w-md mx-auto reveal delay-3">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#374151' }} />
              <input type="text" placeholder="Search articles..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10 w-full" />
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-16">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-7 h-7 border-2 rounded-full animate-spin mx-auto mb-3" style={{ borderColor: '#1A2236', borderTopColor: '#3B82F6' }} />
              <p style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>Loading...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>{search ? 'No articles match your search.' : 'No articles yet. Check back soon!'}</p>
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.id}
                  className={`card block p-6 reveal delay-${(i % 3) + 1}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {post.tag && (
                          <span className="text-xs px-2 py-1 rounded-md font-medium"
                            style={{ background: `${post.tagColor || '#3B82F6'}15`, color: post.tagColor || '#3B82F6', fontFamily: 'DM Sans,sans-serif' }}>
                            {post.tag}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>
                          <Calendar size={11} /> {formatDate(post.createdAt)}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>
                            <Clock size={11} /> {post.readTime}
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0', fontSize: '1.1rem' }}>{post.title}</h2>
                      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>{post.excerpt}</p>
                    </div>
                    <ArrowRight size={16} style={{ color: '#374151', flexShrink: 0 }} className="mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
