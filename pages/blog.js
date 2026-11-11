import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import BrandImage from '../components/ui/BrandImage';
import TechPill from '../components/ui/TechPill';
import PageHero from '../components/ui/PageHero';
import { useT, loc } from '../lib/i18n';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO } from '../lib/seo';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog({ posts = [] }) {
  const { t, locale } = useT();
  const [search, setSearch] = useState('');
  useScrollReveal();

  const seo = pageSEO({ title: t('meta.blog.title'), description: t('meta.blog.description'), locale });

  const filtered = posts.filter((p) =>
    (loc(p, 'title', locale) || '').toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
    (p.tags || [p.tag]).some((t) => t?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />
        <PageHero label={t('blog.label')} t1={t('blog.pageT1')} t2={t('blog.pageT2')} sub={t('blog.pageSub')}>
          <div className="relative max-w-md mx-auto mt-8 reveal delay-3">
            <Search size={18} className="absolute top-1/2 -translate-y-1/2" style={{ color: 'var(--mute)', insetInlineStart: 16 }} />
            <input type="text" placeholder={t('blog.search')} value={search} onChange={(e) => setSearch(e.target.value)} className="input w-full" style={{ paddingInlineStart: 44 }} />
          </div>
        </PageHero>

        <section className="light" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: 'var(--mute)', fontFamily: 'IBM Plex Sans,sans-serif' }}>{search ? '—' : t('blog.empty')}</p>
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.id}
                  className={`card block p-6 reveal delay-${(i % 3) + 1}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="sm:w-56 flex-shrink-0"><BrandImage src={post.coverImage} alt={post.coverAlt || loc(post, 'title', locale)} width={1200} height={630} rounded={4} compact /></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {(post.tags?.length ? post.tags : post.tag ? [post.tag] : []).map((t) => <TechPill key={t} name={t} plain />)}
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--mute)', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                          <Calendar size={11} /> {formatDate(post.createdAt)}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--mute)', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                            <Clock size={11} /> {post.readTime}
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.1rem' }}>{loc(post, 'title', locale)}</h2>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--body)', fontFamily: 'IBM Plex Sans,sans-serif' }}>{loc(post, 'excerpt', locale)}</p>
                    </div>
                    <ArrowRight size={16} className="flip-rtl" style={{ color: 'var(--mute)', flexShrink: 0 }} className="mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        </section>
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
        return { id: d.id, title: data.title || '', title_ar: data.title_ar || '', excerpt_ar: data.excerpt_ar || '', excerpt: data.excerpt || '', slug: data.slug || d.id, tag: data.tag || '', tags: data.tags || [], coverImage: data.coverImage || '', coverAlt: data.coverAlt || '', readTime: data.readTime || '', createdAt: data.createdAt?.toDate?.()?.toISOString() || null };
      });
    }
  } catch {}
  return { props: { posts } };
}
