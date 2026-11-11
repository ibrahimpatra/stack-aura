import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import PageHero from '../../components/ui/PageHero';
import BrandImage from '../../components/ui/BrandImage';
import TechPill from '../../components/ui/TechPill';
import { normImage, imgAlt } from '../../lib/media';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO } from '../../lib/seo';
import { useT, loc } from '../../lib/i18n';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Projects({ projects, projectClients }) {
  useScrollReveal();
  const { t, locale } = useT();
  const [filter, setFilter] = useState('__all');
  const allTags = [...new Set(projects.flatMap((p) => p.tags || []))];
  const filtered = filter === '__all' ? projects : projects.filter((p) => (p.tags || []).includes(filter));
  const seo = pageSEO({ title: t('meta.projects.title'), description: t('meta.projects.description'), locale, projectClients });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />
        <PageHero label={t('projects.label')} t1={t('projects.pageT1')} t2={t('projects.pageT2')} sub={t('projects.pageSub')} />

        <section className="light py-16 px-6" style={{ background: 'var(--bg)', minHeight: 360 }}>
          <div className="max-w-7xl mx-auto">
            {allTags.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-10 reveal">
                {['__all', ...allTags.slice(0, 10)].map((tag) => (
                  <button key={tag} onClick={() => setFilter(tag)} className="px-4 py-2 transition-all"
                    style={{ borderRadius: 4, background: filter === tag ? '#DB333D' : 'var(--card)', border: `2px solid ${filter === tag ? '#DB333D' : 'var(--line)'}`, color: filter === tag ? '#fff' : 'var(--ink2)', fontWeight: 600, fontSize: '1rem' }}>
                    {tag === '__all' ? t('projects.filterAll') : tag}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-16 reveal">
                <p className="font-extrabold mb-3" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.8rem' }}>{t('projects.emptyTitle')}</p>
                <p className="mb-7" style={{ color: 'var(--body)', fontSize: '1.2rem' }}>{t('projects.empty')}</p>
                <Link href="/contact" className="btn-primary">{t('common.quote')}</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((p, i) => {
                  const cover = normImage(p.images?.[0]); const title = loc(p, 'title', locale);
                  const ex = (loc(p, 'excerpt', locale) || loc(p, 'description', locale) || '').replace(/<[^>]+>/g, '').slice(0, 110);
                  return (
                    <Link href={`/projects/${p.slug}`} key={p.id} className={`card block overflow-hidden reveal delay-${(i % 3) + 1}`}>
                      <BrandImage src={cover?.src} alt={imgAlt(cover, `${title}${p.client ? ' – ' + p.client : ''} | stackaura.cc`)} width={1280} height={720} rounded={0} />
                      <div className="p-5">
                        {p.client && <span className="block mb-1" style={{ color: 'var(--mute)', fontSize: '0.95rem' }}>{t('common.clientLabel')}: <span style={{ color: 'var(--red-hi)' }}>{p.client}</span></span>}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.2rem' }}>{title}</h2>
                          <ArrowUpRight size={18} className="flip-rtl" style={{ color: 'var(--mute)', flexShrink: 0 }} />
                        </div>
                        <p className="mb-3" style={{ color: 'var(--body)', fontSize: '1.02rem' }}>{ex}{ex.length >= 110 ? '…' : ''}</p>
                        <div className="flex flex-wrap gap-1.5">{(p.tags || []).slice(0, 4).map((tg) => <TechPill key={tg} name={tg} />)}</div>
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mt-3 font-semibold" style={{ color: 'var(--red-hi)', fontSize: '0.98rem' }} onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /> {t('projects.visit')}</a>}
                      </div>
                    </Link>
                  );
                })}
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
  let projects = [], projectClients = [];
  try {
    const { db } = await import('../../lib/firebase');
    if (db) {
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
      const snap = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
      projects = snap.docs.map((d) => {
        const x = d.data();
        return { id: d.id, title: x.title || '', title_ar: x.title_ar || '', slug: x.slug || d.id, client: x.client || '', excerpt: x.excerpt || '', excerpt_ar: x.excerpt_ar || '', description: x.description || '', description_ar: x.description_ar || '', images: x.images || [], tags: x.tags || [], liveUrl: x.liveUrl || '' };
      });
      projectClients = projects.map((p) => p.client).filter(Boolean);
    }
  } catch {}
  return { props: { projects, projectClients } };
}
