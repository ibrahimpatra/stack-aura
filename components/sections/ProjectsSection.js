import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import BrandImage from '../ui/BrandImage';
import TechPill from '../ui/TechPill';
import { normImage, imgAlt } from '../../lib/media';

// Only shown when there is at least one project (added from the admin) — never an empty "coming soon" block.
export default function ProjectsSection({ projects = [] }) {
  const display = projects.slice(0, 4);
  if (!display.length) return null;
  return (
    <section id="projects" className="py-24 px-6 relative z-10" style={{ background: '#14172E' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div className="reveal">
            <div className="section-label mb-4">Our work</div>
            <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: '#F3F4FA', letterSpacing: '-0.02em' }}>Websites we have built</h2>
          </div>
          <Link href="/projects" className="flex items-center gap-2 font-semibold reveal" style={{ color: '#FF5A63', fontSize: '1.1rem' }}>See all our work <ArrowRight size={18} /></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {display.map((p, i) => {
            const cover = normImage(p.images?.[0]);
            return (
              <Link href={`/projects/${p.slug}`} key={p.id || p.slug} className={`card block overflow-hidden reveal delay-${(i % 2) + 1}`}>
                <BrandImage src={cover?.src} alt={imgAlt(cover, `${p.title}${p.client ? ' – ' + p.client : ''} website by stackaura.cc`)} width={1280} height={720} rounded={0} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      {p.client && <span className="block mb-1" style={{ color: '#8D93B5', fontSize: '0.98rem' }}>Client: <span style={{ color: '#FF5A63' }}>{p.client}</span></span>}
                      <h3 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA', fontSize: '1.4rem' }}>{p.title}</h3>
                    </div>
                    <ArrowUpRight size={22} style={{ color: '#FF5A63', flexShrink: 0 }} />
                  </div>
                  <p className="mb-4" style={{ color: '#C3C7DB', fontSize: '1.08rem' }}>{p.excerpt || p.description?.replace(/<[^>]+>/g, '').slice(0, 130)}</p>
                  <div className="flex flex-wrap gap-2">{(p.tags || []).slice(0, 4).map((t) => <TechPill key={t} name={t} />)}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
