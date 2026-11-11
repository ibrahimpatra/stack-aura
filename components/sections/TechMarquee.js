import { useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { techLogo, DEFAULT_TECH } from '../../lib/tech';
import { useT } from '../../lib/i18n';

// Technology logo strip. Moves by itself, and visitors can DRAG it (mouse or finger) or use the trackpad/wheel.
// The list comes from the technologies you add in the admin panel (Admin → Tags & Technologies).
const SPEED = 90; // px per second

function Item({ name }) {
  const logo = techLogo(name);
  return (
    <div className="flex items-center gap-3 flex-shrink-0 select-none"
      style={{ background: '#14172E', border: '1px solid #343A6A', borderRadius: 6, padding: '14px 24px', minWidth: 170 }}>
      {logo
        ? <img src={logo} alt="" width={36} height={36} draggable={false} style={{ width: 36, height: 36, objectFit: 'contain' }} />
        : <span className="flex items-center justify-center font-bold" style={{ width: 36, height: 36, borderRadius: 6, background: '#DB333D', color: '#fff', fontFamily: 'Syne,sans-serif' }}>{name.charAt(0).toUpperCase()}</span>}
      <span style={{ color: '#F3F4FA', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );
}

export default function TechMarquee({ technologies }) {
  const { t } = useT();
  const list = useMemo(() => {
    const base = (technologies?.length ? technologies : DEFAULT_TECH).filter((t) => t.toLowerCase() !== 'seo');
    let out = [...base];
    while (out.length < 18) out = [...out, ...base];   // make sure the strip is always long enough
    return out;
  }, [technologies]);

  const viewport = useRef(null);
  const track = useRef(null);
  const st = useRef({ x: 0, v: 0, drag: false, lastX: 0, lastT: 0, hover: false, raf: 0 });

  useEffect(() => {
    const s = st.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let last = performance.now();

    const apply = () => {
      const el = track.current; if (!el) return;
      const half = el.scrollWidth / 2;
      if (half > 0) { while (s.x <= -half) s.x += half; while (s.x > 0) s.x -= half; }
      el.style.transform = `translate3d(${s.x}px,0,0)`;
    };
    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (!s.drag) {
        const auto = reduce || s.hover ? 0 : -SPEED;
        s.v += (auto - s.v) * Math.min(1, dt * 3);   // glide back to the auto speed after a flick
        s.x += s.v * dt;
      }
      apply();
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, [list]);

  const down = (e) => { const s = st.current; s.drag = true; s.lastX = e.clientX; s.lastT = performance.now(); s.v = 0; viewport.current.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    const s = st.current; if (!s.drag) return;
    const now = performance.now(); const dx = e.clientX - s.lastX; const dt = Math.max(1, now - s.lastT) / 1000;
    s.x += dx; s.v = dx / dt; s.lastX = e.clientX; s.lastT = now;
  };
  const up = () => { st.current.drag = false; };
  const wheel = (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { st.current.x -= e.deltaX; e.preventDefault?.(); } };

  return (
    <section className="light py-14 relative z-10" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }} aria-label={t('tech.label')}>
      <div className="max-w-7xl mx-auto px-6 mb-7 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="section-label mb-3">{t('tech.label')}</div>
          <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.7rem,3.4vw,2.4rem)', color: 'var(--ink)' }}>{t('tech.title')}</h2>
        </div>
        <span className="flex items-center gap-1" style={{ color: 'var(--mute)', fontSize: '1rem' }}><ChevronLeft size={18} /> {t('tech.hint')} <ChevronRight size={18} /></span>
      </div>
      <div ref={viewport} dir="ltr" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={(e) => { up(); st.current.hover = false; }}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') st.current.hover = true; }} onWheel={wheel}
        style={{ overflow: 'hidden', cursor: 'grab', touchAction: 'pan-y', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
        <div ref={track} className="flex gap-4" style={{ width: 'max-content', willChange: 'transform' }}>
          {[...list, ...list].map((n, i) => <Item key={`${n}-${i}`} name={n} />)}
        </div>
      </div>
    </section>
  );
}
