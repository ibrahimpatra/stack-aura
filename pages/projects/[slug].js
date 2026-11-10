import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import ImageCarousel from '../../components/ui/ImageCarousel';
import ContactSection from '../../components/sections/ContactSection';
import TechPill from '../../components/ui/TechPill';
import { normImages, absUrl } from '../../lib/media';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SITE } from '../../lib/seo';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, Tag } from 'lucide-react';

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export default function ProjectPage({ project }) {
  useScrollReveal();

  if (!project) return (
    <div style={{ background: '#000129', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <p className="text-xl mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>Project not found</p>
        <Link href="/projects" style={{ color: '#DB333D' }}>← All Projects</Link>
      </div>
    </div>
  );

  const seo = pageSEO({
    title: `${project.title}${project.client ? ` — ${project.client}` : ''} | stackaura.cc`,
    description: project.excerpt || project.description?.slice(0, 160) || `${project.title} — a project by stackaura.cc.`,
    path: `/projects/${project.slug}`,
    extraKeywords: [
      project.client ? `${project.client} website` : '',
      project.client ? `${project.client} web development` : '',
      ...(project.tags || []),
      'web development case study', 'stackaura digital project',
    ].filter(Boolean),
    ogImage: project.images?.[0] ? absUrl(normImages(project.images)[0].src) : undefined,
  });

  // Rich structured data for the project — helps surface in search
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.excerpt || project.description,
    creator: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    ...(project.client && { contributor: { '@type': 'Organization', name: project.client } }),
    ...(project.liveUrl && { url: project.liveUrl }),
    ...(project.images?.length && { image: normImages(project.images).map((im) => ({ '@type': 'ImageObject', contentUrl: absUrl(im.src), url: absUrl(im.src), name: im.title || im.alt || project.title, caption: im.caption || im.alt || project.title, description: im.alt || project.title, creator: { '@type': 'Organization', name: SITE.name }, representativeOfPage: false })) }),
    keywords: (project.tags || []).join(', '),
  };

  return (
    <>
      <SEOHead {...seo} structuredData={structuredData} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
          {/* Back */}
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm mb-8 reveal"
            style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
            <ArrowLeft size={15} /> All Projects
          </Link>

          {/* Header */}
          <div className="mb-8 reveal delay-1">
            {project.client && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(219,51,61,0.1)', color: '#DB333D', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                  Client: {project.client}
                </span>
              </div>
            )}
            <h1 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,5vw,3rem)', color: '#F3F4FA', lineHeight: 1.15 }}>
              {project.title}
            </h1>
            {project.excerpt && (
              <p className="text-lg" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', lineHeight: 1.7 }}>
                {project.excerpt}
              </p>
            )}
          </div>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 reveal delay-2" style={{ borderBottom: '1px solid #DDE1EA' }}>
            {project.tags?.map((t) => <TechPill key={t} name={t} />)}
            {project.date && <span className="flex items-center gap-1 text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}><Calendar size={11} />{project.date}</span>}
            <div className="flex gap-3 ml-auto">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-4 py-2">
                  <ExternalLink size={13} /> Live Site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs px-4 py-2">
                  <Github size={13} /> Code
                </a>
              )}
            </div>
          </div>

          {/* Carousel */}
          {project.images?.length > 0 && (
            <div className="mb-12 reveal">
              <ImageCarousel images={project.images} title={project.title} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2">
              {project.description && (
                <div className="prose-custom mb-10 reveal" dangerouslySetInnerHTML={{ __html: project.description }} />
              )}

              {/* Features */}
              {project.features?.length > 0 && (
                <div className="mb-8 reveal delay-1">
                  <h2 className="font-bold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.3rem', color: '#F3F4FA' }}>Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: '#14172E', border: '1px solid #DDE1EA' }}>
                        <CheckCircle2 size={14} style={{ color: '#DB333D', flexShrink: 0, marginTop: 1 }} />
                        <span className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results?.length > 0 && (
                <div className="mb-8 reveal delay-2">
                  <h2 className="font-bold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.3rem', color: '#F3F4FA' }}>Results</h2>
                  <div className="space-y-3">
                    {project.results.map((r) => (
                      <div key={r} className="flex items-start gap-2.5 p-4 rounded-xl" style={{ background: 'rgba(219,51,61,0.05)', border: '1px solid rgba(219,51,61,0.15)' }}>
                        <CheckCircle2 size={15} style={{ color: '#DB333D', flexShrink: 0, marginTop: 1 }} />
                        <span className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="reveal-right">
              <div className="card p-6 mb-6" style={{ position: 'sticky', top: '100px' }}>
                <h3 className="font-bold mb-4 text-sm" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>Project Details</h3>
                <div className="space-y-3">
                  {project.client && (
                    <div>
                      <span className="text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>Client</span>
                      <p className="text-sm font-medium" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{project.client}</p>
                    </div>
                  )}
                  {project.date && (
                    <div>
                      <span className="text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>Completed</span>
                      <p className="text-sm font-medium" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{project.date}</p>
                    </div>
                  )}
                  {project.tags?.length > 0 && (
                    <div>
                      <span className="text-xs mb-2 block" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>Technologies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t) => <TechPill key={t} name={t} />)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="h-px my-5" style={{ background: '#2A2F57' }} />
                <Link href="/contact" className="btn-primary w-full justify-center">Build Something Similar</Link>
              </div>
            </div>
          </div>

          {/* Nav between projects */}
          <div className="mt-16 pt-8 flex items-center justify-between reveal" style={{ borderTop: '1px solid #DDE1EA' }}>
            <Link href="/projects" className="btn-ghost"><ArrowLeft size={15} /> All Projects</Link>
            <Link href="/contact" className="btn-primary">Start a Project</Link>
          </div>
        </div>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const { db } = await import('../../lib/firebase');
    if (!db) return { props: { project: null } };
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const q = query(collection(db, 'projects'), where('slug', '==', slug));
    const snap = await getDocs(q);
    if (snap.empty) return { props: { project: null } };
    const d = snap.docs[0];
    const data = d.data();
    const project = {
      id: d.id,
      title: data.title || '',
      slug: data.slug || slug,
      client: data.client || '',
      excerpt: data.excerpt || '',
      description: data.description || '',
      images: data.images || [],
      tags: data.tags || [],
      features: data.features || [],
      results: data.results || [],
      liveUrl: data.liveUrl || '',
      githubUrl: data.githubUrl || '',
      featured: data.featured || false,
      date: data.createdAt?.toDate?.()?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) || '',
    };
    return { props: { project } };
  } catch { return { props: { project: null } }; }
}
