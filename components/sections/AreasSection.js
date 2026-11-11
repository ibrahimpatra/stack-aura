import { MapPin, Globe } from 'lucide-react';
import { useT } from '../../lib/i18n';

// Red band. Local SEO: names every governorate people search for.
export default function AreasSection() {
  const { t } = useT();
  return (
    <section id="areas" className="py-20 px-6 relative z-10 overflow-hidden" style={{ background: '#DB333D' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(0,0,41,0.10) 0 2px, transparent 2px 38px)' }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="reveal">
          <div className="font-bold mb-4 flex items-center gap-3" style={{ color: '#00001A', letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.95rem' }}>
            <span style={{ width: 36, height: 3, background: '#00001A', display: 'inline-block' }} /> {t('areas.label')}
          </div>
          <h2 className="font-extrabold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,4.2vw,3.2rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>{t('areas.t1')} <span style={{ color: '#00001A' }}>{t('areas.t2')}</span></h2>
          <p className="mb-8 max-w-2xl" style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>{t('areas.text')}</p>
        </div>
        <div className="flex flex-wrap gap-3 reveal delay-1">
          {t('areas.list').map((a) => (
            <span key={a} className="flex items-center gap-2" style={{ background: '#00001A', color: '#fff', padding: '12px 20px', borderRadius: 4, fontWeight: 600, fontSize: '1.1rem', boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>
              <MapPin size={18} style={{ color: '#FF5A63' }} /> {a}
            </span>
          ))}
          <span className="flex items-center gap-2" style={{ border: '2px dashed #fff', color: '#fff', padding: '10px 20px', borderRadius: 4, fontWeight: 600, fontSize: '1.1rem' }}>
            <Globe size={18} /> {t('areas.remote')}
          </span>
        </div>
      </div>
    </section>
  );
}
