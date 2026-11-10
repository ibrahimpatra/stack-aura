import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import BrandImage from '../components/ui/BrandImage';
import TechPill from '../components/ui/TechPill';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO } from '../lib/seo';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog({ posts = [] }) {
  const loading = false;
  const [search, setSearch] = useState('');
  useScrollReveal();

  const seo = pageSEO({
    title: 'Blog | Web Development, SEO & Tech Tips | stackaura.cc',
    description: 'Articles on web development, mobile apps, SEO optimisation, and digital marketing from the stackaura.cc team. Kuwait-based, worldwide expertise.',
    path: '/blog',
    extraKeywords: ['web development blog kuwait', 'seo tips', 'next.js tutorials', 'mobile app tips'],
  });

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
    (p.tags || [p.tag]).some((t) => t?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />
        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #DDE1EA' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'IBM Plex Sans,sans-serif' }}>Blog</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#F3F4FA', lineHeight: 1.1 }}>
              Articles & Insights
            </h1>
            <p className="text-lg mb-8 reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              Web development, SEO, mobile, and building products that scale.
            </p>
            <div className="relative max-w-md mx-auto reveal delay-3">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8D93B5' }} />
              <input type="text" placeholder="Search articles..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10 w-full" />
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-16">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-7 h-7 border-2 rounded-full animate-spin mx-auto mb-3" style={{ borderColor: '#2A2F57', borderTopColor: '#DB333D' }} />
              <p style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>Loading...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>{search ? 'No articles match your search.' : 'No articles yet. Check back soon!'}</p>
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.id}
                  className={`card block p-6 reveal delay-${(i % 3) + 1}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="sm:w-56 flex-shrink-0"><BrandImage src={post.coverImage} alt={post.coverAlt || post.title} width={1200} height={630} rounded={4} compact /></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {(post.tags?.length ? post.tags : post.tag ? [post.tag] : []).map((t) => <TechPill key={t} name={t} plain />)}
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                          <Calendar size={11} /> {formatDate(post.createdAt)}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                            <Clock size={11} /> {post.readTime}
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA', fontSize: '1.1rem' }}>{post.title}</h2>
                      <p className="text-sm leading-relaxed" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{post.excerpt}</p>
                    </div>
                    <ArrowRight size={16} style={{ color: '#8D93B5', flexShrink: 0 }} className="mt-1" />
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

export async function getServerSideProps() {
  let posts = [];
  try {
    const { db } = await import('../lib/firebase');
    if (db) {
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
      const snap = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      posts = snap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, title: data.title || '', excerpt: data.excerpt || '', slug: data.slug || d.id, tag: data.tag || '', tags: data.tags || [], coverImage: data.coverImage || '', coverAlt: data.coverAlt || '', readTime: data.readTime || '', createdAt: data.createdAt?.toDate?.()?.toISOString() || null };
      });
    }
  } catch {}
  return { props: { posts } };
}
