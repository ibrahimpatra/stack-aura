import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import BrandImage from '../ui/BrandImage';
import TechPill from '../ui/TechPill';
import { normImage, imgAlt } from '../../lib/media';
import { useT, loc } from '../../lib/i18n';

// Only shown when there is at least one project (added from the admin) — never an empty "coming soon" block.
export default function ProjectsSection({ projects = [] }) {
  const { t, locale } = useT();
  const display = projects.slice(0, 4);
  if (!display.length) return null;
  return (
    <section id="projects" className="py-24 px-6 relative z-10" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div className="reveal">
            <div className="section-label mb-4">{t('projects.label')}</div>
            <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('projects.title')}</h2>
          </div>
          <Link href="/projects" className="flex items-center gap-2 font-semibold reveal" style={{ color: 'var(--red-hi)', fontSize: '1.1rem' }}>{t('projects.all')} <ArrowRight size={18} className="flip-rtl" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {display.map((p, i) => {
            const cover = normImage(p.images?.[0]);
            const title = loc(p, 'title', locale);
            const ex = loc(p, 'excerpt', locale) || (loc(p, 'description', locale) || '').replace(/<[^>]+>/g, '').slice(0, 130);
            return (
              <Link href={`/projects/${p.slug}`} key={p.id || p.slug} className={`card block overflow-hidden reveal delay-${(i % 2) + 1}`}>
                <BrandImage src={cover?.src} alt={imgAlt(cover, `${title}${p.client ? ' – ' + p.client : ''} | stackaura.cc`)} width={1280} height={720} rounded={0} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      {p.client && <span className="block mb-1" style={{ color: 'var(--mute)', fontSize: '0.98rem' }}>{t('common.clientLabel')}: <span style={{ color: 'var(--red-hi)' }}>{p.client}</span></span>}
                      <h3 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.4rem' }}>{title}</h3>
                    </div>
                    <ArrowUpRight size={22} className="flip-rtl" style={{ color: 'var(--red-hi)', flexShrink: 0 }} />
                  </div>
                  <p className="mb-4" style={{ color: 'var(--body)', fontSize: '1.08rem' }}>{ex}</p>
                  <div className="flex flex-wrap gap-2">{(p.tags || []).slice(0, 4).map((tg) => <TechPill key={tg} name={tg} />)}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
