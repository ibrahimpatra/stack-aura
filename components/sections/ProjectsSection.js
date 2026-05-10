import Link from 'next/link';
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection({ projects = [] }) {
  const display = projects.slice(0, 4);

  if (!display.length) return (
    <section id="projects" className="py-24 px-6" style={{ background: '#0D1220' }}>
      <div className="max-w-7xl mx-auto text-center">
        <p style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>Projects coming soon. Add them from the admin panel.</p>
      </div>
    </section>
  );

  return (
    <section id="projects" className="py-24 px-6" style={{ background: '#0D1220' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div className="reveal">
            <div className="section-label mb-4" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.15)', color: '#67E8F9' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// projects</span>
            </div>
            <h2 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#E2E8F0' }}>
              Our Work
            </h2>
            <p className="text-base" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
              Real projects, real results, real clients.
            </p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-1.5 text-sm reveal" style={{ color: '#3B82F6', fontFamily: 'DM Sans,sans-serif' }}>
            All Projects <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {display.map((p, i) => (
            <Link href={`/projects/${p.slug}`} key={p.id || p.slug}
              className={`card block overflow-hidden reveal delay-${i + 1}`}>
              {/* Cover image */}
              {p.images?.[0] && (
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <img src={p.images[0]} alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 50%,#0D1220)' }} />
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-2 rounded-lg flex items-center gap-1 text-xs"
                      style={{ background: 'rgba(8,12,20,0.85)', color: '#E2E8F0', fontFamily: 'DM Sans,sans-serif' }}
                      onClick={(e) => e.stopPropagation()}>
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {p.client && (
                      <span className="text-xs mb-1 block" style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>
                        Client: <span style={{ color: '#3B82F6' }}>{p.client}</span>
                      </span>
                    )}
                    <h3 className="font-bold text-lg" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>{p.title}</h3>
                  </div>
                  <ArrowUpRight size={16} style={{ color: '#374151', flexShrink: 0 }} className="mt-1" />
                </div>

                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
                  {p.excerpt || p.description?.slice(0, 120)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {(p.tags || []).slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/projects" className="text-sm" style={{ color: '#3B82F6' }}>All Projects →</Link>
        </div>
      </div>
    </section>
  );
}
