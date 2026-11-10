import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import BrandImage from '../../components/ui/BrandImage';
import TechPill from '../../components/ui/TechPill';
import { normImage, imgAlt } from '../../lib/media';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO } from '../../lib/seo';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Projects({ projects, projectClients }) {
  useScrollReveal();
  const [filter, setFilter] = useState('All');

  const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags || []))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => (p.tags || []).includes(filter));

  const seo = pageSEO({
    title: 'Our Projects | Web Development Portfolio Kuwait',
    description: `stackaura.cc's project portfolio — custom websites, mobile apps, and SEO results for clients in Kuwait and worldwide. See our work.`,
    path: '/projects',
    extraKeywords: ['web development portfolio', 'kuwait web projects', 'website portfolio', 'our work'],
    projectClients,
  });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />

        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #DDE1EA' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'IBM Plex Sans,sans-serif' }}>Our work</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#F3F4FA', lineHeight: 1.1 }}>
              Projects We've Built
            </h1>
            <p className="text-lg reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', maxWidth: 500, margin: '0 auto' }}>
              Real products, real clients, measurable results.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Filter tags */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10 reveal">
              {allTags.slice(0, 10).map((tag) => (
                <button key={tag} onClick={() => setFilter(tag)}
                  className="px-4 py-2 rounded-xl text-sm transition-all"
                  style={{
                    background: filter === tag ? 'rgba(219,51,61,0.15)' : '#F0EFF2',
                    border: `1px solid ${filter === tag ? '#DB333D' : '#2A2F57'}`,
                    color: filter === tag ? '#DB333D' : '#C3C7DB',
                    fontFamily: 'IBM Plex Sans,sans-serif',
                  }}>
                  {tag}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-2" style={{ color: '#8D93B5', fontFamily: 'Syne,sans-serif' }}>No projects yet.</p>
              <p style={{ color: '#C3C7DB', fontSize: '1.15rem', marginBottom: 20 }}>Our new projects are being added right now. Meanwhile, tell us about yours.</p><Link href="/contact" className="btn-primary">Get a Free Quote</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <Link href={`/projects/${p.slug}`} key={p.id}
                  className={`card block overflow-hidden reveal delay-${(i % 3) + 1}`}>
                  <BrandImage src={normImage(p.images?.[0])?.src} alt={imgAlt(normImage(p.images?.[0]), `${p.title}${p.client ? ' – ' + p.client : ''} website by stackaura.cc`)} width={1280} height={720} rounded={0} />
                  <div className="p-5">
                    {p.client && <span className="text-xs block mb-1" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>Client: <span style={{ color: '#DB333D' }}>{p.client}</span></span>}
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA', fontSize: '1rem' }}>{p.title}</h2>
                      <ArrowUpRight size={15} style={{ color: '#8D93B5', flexShrink: 0 }} />
                    </div>
                    <p className="text-xs mb-3 leading-relaxed" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                      {(p.excerpt || p.description || '').slice(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(p.tags || []).slice(0, 4).map((t) => <TechPill key={t} name={t} />)}
                    </div>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs mt-3 transition-colors"
                        style={{ color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}
                        onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={11} /> Visit Live Site
                      </a>
                    )}
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
  let projects = [], projectClients = [];
  try {
    const { db } = await import('../../lib/firebase');
    if (db) {
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
      const snap = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
      projects = snap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, title: data.title || '', slug: data.slug || d.id, client: data.client || '', excerpt: data.excerpt || '', description: data.description || '', images: data.images || [], tags: data.tags || [], liveUrl: data.liveUrl || '', featured: data.featured || false };
      });
      projectClients = projects.map((p) => p.client).filter(Boolean);
    }
  } catch {}
  return { props: { projects, projectClients } };
}
