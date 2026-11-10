import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { SITE } from '../../lib/seo';

/* ───────── simple flat illustrations (drawn in code: no image downloads, always sharp) ───────── */
const S = { fill: '#0A0F45', stroke: '#3A4073', strokeWidth: 3 };

function ArtBrowser() {
  return (
    <svg viewBox="0 0 480 380" className="w-full floaty" style={{ '--r': '-2deg' }} role="img" aria-label="A website on a computer screen">
      <rect x="40" y="52" width="420" height="300" rx="8" fill="#DB333D" opacity="0.9" transform="translate(10 10)" />
      <rect x="30" y="40" width="420" height="300" rx="8" {...S} />
      <path d="M30 48 a8 8 0 0 1 8 -8 h404 a8 8 0 0 1 8 8 v30 h-420 z" fill="#14172E" />
      <circle cx="55" cy="59" r="6" fill="#DB333D" /><circle cx="76" cy="59" r="6" fill="#8D93B5" /><circle cx="97" cy="59" r="6" fill="#8D93B5" />
      <rect x="52" y="98" width="250" height="124" fill="#DB333D" />
      <rect x="70" y="118" width="160" height="16" fill="#fff" /><rect x="70" y="144" width="110" height="10" fill="#fff" opacity=".6" /><rect x="70" y="164" width="130" height="10" fill="#fff" opacity=".6" />
      <rect x="70" y="190" width="76" height="22" fill="#00001A" />
      <rect x="318" y="98" width="110" height="124" fill="#14172E" stroke="#3A4073" strokeWidth="2" />
      <circle cx="373" cy="140" r="22" fill="#2A2F57" /><rect x="338" y="176" width="70" height="8" fill="#3A4073" /><rect x="346" y="192" width="54" height="8" fill="#3A4073" />
      {[52, 189, 326].map((x) => (<g key={x}><rect x={x} y="240" width="102" height="86" fill="#14172E" stroke="#3A4073" strokeWidth="2" /><rect x={x + 12} y="254" width="50" height="8" fill="#8D93B5" /><rect x={x + 12} y="272" width="76" height="6" fill="#3A4073" /><rect x={x + 12} y="286" width="64" height="6" fill="#3A4073" /></g>))}
      <path d="M380 250 l0 34 l9 -8 l7 15 l8 -4 l-7 -15 l12 -1 z" fill="#fff" stroke="#00001A" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function ArtPhone() {
  return (
    <svg viewBox="0 0 480 380" className="w-full floaty" role="img" aria-label="Mobile apps on two phones" style={{ '--r': '2deg' }}>
      <g transform="rotate(-8 170 190)">
        <rect x="90" y="30" width="170" height="320" rx="26" fill="#0A0F45" stroke="#3A4073" strokeWidth="4" />
        <rect x="170" y="42" width="30" height="7" rx="3.5" fill="#3A4073" />
        <rect x="108" y="66" width="134" height="78" fill="#14172E" stroke="#3A4073" strokeWidth="2" />
        <rect x="120" y="80" width="70" height="10" fill="#fff" opacity=".85" /><rect x="120" y="100" width="100" height="7" fill="#8D93B5" /><rect x="120" y="116" width="80" height="7" fill="#8D93B5" />
        {[0, 1, 2].map((r) => [0, 1].map((c) => (<rect key={`${r}${c}`} x={108 + c * 70} y={160 + r * 56} width="64" height="46" fill={r === 0 && c === 1 ? '#DB333D' : '#14172E'} stroke="#3A4073" strokeWidth="2" />)))}
      </g>
      <g transform="rotate(7 330 210)">
        <rect x="250" y="62" width="170" height="320" rx="26" fill="#DB333D" stroke="#fff" strokeWidth="4" />
        <rect x="266" y="92" width="138" height="260" rx="14" fill="#00001A" />
        <circle cx="335" cy="150" r="30" fill="#DB333D" /><path d="M322 150 l9 10 l17 -20" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="290" y="204" width="90" height="10" fill="#fff" /><rect x="282" y="226" width="106" height="7" fill="#8D93B5" /><rect x="282" y="242" width="90" height="7" fill="#8D93B5" />
        <rect x="290" y="286" width="90" height="30" fill="#DB333D" />
      </g>
      <circle cx="60" cy="70" r="10" fill="#DB333D" /><circle cx="430" cy="40" r="7" fill="#8D93B5" /><circle cx="450" cy="330" r="12" fill="none" stroke="#DB333D" strokeWidth="3" />
    </svg>
  );
}

function ArtSearch() {
  return (
    <svg viewBox="0 0 480 380" className="w-full floaty" role="img" aria-label="A website ranking first in Google search results" style={{ '--r': '-1deg' }}>
      <rect x="36" y="46" width="420" height="58" rx="29" fill="#0A0F45" stroke="#3A4073" strokeWidth="3" />
      <circle cx="76" cy="75" r="13" fill="none" stroke="#fff" strokeWidth="4" /><path d="M86 85 l11 11" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <rect x="118" y="68" width="170" height="14" fill="#8D93B5" opacity=".6" />
      <g>
        <rect x="46" y="130" width="400" height="86" fill="#14172E" stroke="#DB333D" strokeWidth="4" />
        <rect x="66" y="152" width="44" height="44" fill="#DB333D" /><path d="M80 164 l10 -6 v36" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="128" y="152" width="200" height="14" fill="#fff" /><rect x="128" y="176" width="260" height="8" fill="#8D93B5" /><rect x="128" y="192" width="200" height="8" fill="#8D93B5" />
      </g>
      {[236, 308].map((y, i) => (<g key={y} opacity={0.75 - i * 0.2}><rect x="46" y={y} width="400" height="58" fill="#0A0F45" stroke="#3A4073" strokeWidth="2" /><rect x="66" y={y + 14} width="160" height="10" fill="#8D93B5" /><rect x="66" y={y + 34} width="260" height="7" fill="#3A4073" /></g>))}
      <path d="M392 340 l22 -26 l20 12 l24 -40" stroke="#DB333D" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M444 280 l10 14 l-18 3 z" fill="#DB333D" />
    </svg>
  );
}

function ArtShield() {
  return (
    <svg viewBox="0 0 480 380" className="w-full" role="img" aria-label="A shield protecting your website">
      <g className="floaty" style={{ '--r': '0deg', transformOrigin: '240px 190px' }}>
        <path d="M240 36 L382 92 V204 C382 276 318 326 240 352 C162 326 98 276 98 204 V92 Z" fill="#DB333D" transform="translate(10 10)" opacity=".9" />
        <path d="M240 36 L382 92 V204 C382 276 318 326 240 352 C162 326 98 276 98 204 V92 Z" fill="#0A0F45" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
        <path d="M180 196 l44 44 l82 -92" stroke="#fff" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M180 196 l44 44 l82 -92" stroke="#DB333D" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="60" cy="110" r="9" fill="#8D93B5" /><circle cx="430" cy="90" r="12" fill="none" stroke="#DB333D" strokeWidth="3" /><circle cx="420" cy="320" r="8" fill="#DB333D" /><circle cx="52" cy="300" r="12" fill="none" stroke="#8D93B5" strokeWidth="3" />
    </svg>
  );
}

const SLIDES = [
  { key: 'web', kicker: 'Websites', l1: 'Your business,', l2: 'online.', text: 'We design and build websites that look sharp, load fast and bring you customers.', cta: { label: 'See website services', href: '/services/web-development' }, Art: ArtBrowser },
  { key: 'app', kicker: 'Mobile apps', l1: 'Your app,', l2: 'in every pocket.', text: 'One app that works on iPhone and Android, made for your business.', cta: { label: 'See mobile app services', href: '/services/mobile-apps' }, Art: ArtPhone },
  { key: 'seo', kicker: 'Google ranking', l1: 'Get found', l2: 'on Google.', text: 'We help the customers who are searching for you find you first.', cta: { label: 'See Google ranking help', href: '/services/seo-optimisation' }, Art: ArtSearch },
  { key: 'care', kicker: 'Care & support', l1: 'We stay with you', l2: 'after launch.', text: 'Updates, security and quick fixes, so your website keeps working while you run your business.', cta: { label: 'See care & support', href: '/services/maintenance' }, Art: ArtShield },
];
const DELAY = 7000;

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resume, setResume] = useState(0);   // restarts the progress bar + timer together after a pause
  const touchX = useRef(null);
  const n = SLIDES.length;

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setI((p) => (p + 1) % n), DELAY);
    return () => clearTimeout(t);
  }, [i, paused, resume, n]);

  const s = SLIDES[i];
  const go = (d) => setI((p) => (p + d + n) % n);

  return (
    <section className="relative overflow-hidden" style={{ background: '#000129', minHeight: '100vh' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setResume((r) => r + 1); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touchX.current ?? 0); if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); setPaused(false); setResume((r) => r + 1); }}>
      {/* moving stripes + big red disc */}
      <div className="absolute inset-0 stripes pointer-events-none" />
      <div className="absolute pointer-events-none" style={{ width: 720, height: 720, borderRadius: '50%', background: '#DB333D', opacity: 0.16, right: '-12%', bottom: '-34%' }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ width: '42%', top: 0, bottom: 0, right: 0, background: 'linear-gradient(110deg, transparent 0, transparent 14%, #14172E 14.1%)', opacity: 0.85 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 130 }}>
        <div>
          <h1 className="flex items-center gap-3 mb-6" style={{ fontFamily: 'IBM Plex Sans,sans-serif', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C3C7DB' }}>
            <span className="ar" lang="ar" style={{ fontSize: '1.4rem', color: '#FF5A63', letterSpacing: 0, textTransform: 'none' }}>مرحباً</span>
            Web development company · Kuwait
          </h1>

          <div key={s.key} className="slide-in">
            <div className="mb-3" style={{ fontFamily: 'IBM Plex Mono,monospace', color: '#FF5A63', fontSize: '1.05rem' }}>
              0{i + 1} / 0{n} — {s.kicker}
            </div>
            <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.6rem,6.2vw,5rem)', lineHeight: 1.05, color: '#F3F4FA', letterSpacing: '-0.02em' }}>
              {s.l1}<br /><span className="scribble" style={{ color: '#DB333D' }}>{s.l2}</span>
            </h2>
            <p className="mt-6 mb-9" style={{ color: '#C3C7DB', fontSize: '1.3rem', lineHeight: 1.6, maxWidth: 520 }}>{s.text}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={s.cta.href} className="btn-primary">{s.cta.label} <ArrowRight size={20} /></Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> WhatsApp us</a>
            </div>
          </div>
        </div>

        <div key={`${s.key}-art`} className="slide-in hidden lg:block" style={{ animationDelay: '0.12s' }}>
          <s.Art />
        </div>
      </div>

      {/* controls: timeline + arrows */}
      <div className="absolute left-0 right-0 z-20" style={{ bottom: 86 }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <div className="flex gap-2 flex-1" style={{ maxWidth: 420 }}>
            {SLIDES.map((sl, idx) => (
              <button key={sl.key} onClick={() => setI(idx)} aria-label={`Show slide ${idx + 1}: ${sl.kicker}`} className="flex-1 relative" style={{ height: 6, background: '#2A2F57' }}>
                <span key={idx === i ? `a${i}-${resume}` : `b${idx}`} className="absolute left-0 top-0 bottom-0"
                  style={{ background: '#DB333D', width: idx < i ? '100%' : 0, ...(idx === i ? { width: 0, animation: `progress ${DELAY}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' } : {}) }} />
              </button>
            ))}
          </div>
          <button onClick={() => go(-1)} aria-label="Previous slide" className="w-11 h-11 flex items-center justify-center" style={{ border: '2px solid #5B6290', color: '#F3F4FA', borderRadius: 4 }}><ArrowLeft size={20} /></button>
          <button onClick={() => go(1)} aria-label="Next slide" className="w-11 h-11 flex items-center justify-center" style={{ border: '2px solid #5B6290', color: '#F3F4FA', borderRadius: 4 }}><ArrowRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
