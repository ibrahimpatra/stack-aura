import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { SITE } from '../../lib/seo';
import { useT } from '../../lib/i18n';
import IMAGES from '../../lib/images.json';

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

function ArtAI() {
  return (
    <svg viewBox="0 0 480 380" className="w-full floaty" role="img" aria-label="An AI assistant chatting with a customer" style={{ '--r': '1deg' }}>
      <rect x="60" y="48" width="380" height="290" rx="10" fill="#DB333D" opacity="0.9" transform="translate(10 10)" />
      <rect x="50" y="38" width="380" height="290" rx="10" {...S} />
      <path d="M50 48 a10 10 0 0 1 10 -10 h360 a10 10 0 0 1 10 10 v34 h-380 z" fill="#14172E" />
      <circle cx="82" cy="60" r="12" fill="#DB333D" /><rect x="104" y="53" width="90" height="10" fill="#F3F4FA" /><rect x="104" y="68" width="56" height="6" fill="#8D93B5" />
      <rect x="76" y="104" width="190" height="44" rx="6" fill="#14172E" stroke="#3A4073" strokeWidth="2" /><rect x="92" y="118" width="150" height="8" fill="#C3C7DB" /><rect x="92" y="132" width="100" height="8" fill="#8D93B5" />
      <rect x="196" y="162" width="206" height="44" rx="6" fill="#DB333D" /><rect x="212" y="176" width="150" height="8" fill="#fff" /><rect x="212" y="190" width="110" height="8" fill="#fff" opacity=".7" />
      <rect x="76" y="220" width="230" height="58" rx="6" fill="#14172E" stroke="#3A4073" strokeWidth="2" /><rect x="92" y="234" width="190" height="8" fill="#C3C7DB" /><rect x="92" y="248" width="170" height="8" fill="#8D93B5" /><rect x="92" y="262" width="120" height="8" fill="#8D93B5" />
      <rect x="70" y="292" width="290" height="26" rx="13" fill="#00001A" stroke="#3A4073" strokeWidth="2" /><circle cx="338" cy="305" r="10" fill="#DB333D" />
      <path d="M418 66 l8 -22 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 z" fill="#fff" transform="translate(-6 -14) scale(.8)" />
      <circle cx="456" cy="140" r="7" fill="#DB333D" /><circle cx="34" cy="300" r="9" fill="none" stroke="#8D93B5" strokeWidth="3" />
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

const ARTS = [ArtBrowser, ArtPhone, ArtSearch, ArtAI, ArtShield];
const BG = ['hero-banner-1', 'hero-banner-2', 'hero-banner-3', 'hero-banner-4', 'hero-banner-5'];
const DELAY = 7000;

// Optional background banner per slide (your hero banner 1–5). Sits BEHIND everything with a dark overlay,
// so the text and illustration stay readable. If the file isn't there yet, nothing is shown.
function Banner({ id, active, eager, isAr }) {
  const img = IMAGES[id];
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth === 0) setFailed(true); }, []);
  if (!img || failed) return null;
  return (
    <img ref={ref} src={img.src} alt={isAr && img.alt_ar ? img.alt_ar : img.alt} title={isAr && img.title_ar ? img.title_ar : img.title}
      width={img.width} height={img.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full" aria-hidden={!active}
      style={{ objectFit: 'cover', opacity: active ? 1 : 0, transition: 'opacity 0.9s ease', zIndex: 0 }} />
  );
}

export default function Hero() {
  const { t, isAr } = useT();
  const slides = t('hero.slides');
  const n = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resume, setResume] = useState(0);
  const touchX = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    const tm = setTimeout(() => setI((p) => (p + 1) % n), DELAY);
    return () => clearTimeout(tm);
  }, [i, paused, resume, n]);

  const s = slides[i];
  const Art = ARTS[i];
  const go = (d) => setI((p) => (p + d + n) % n);
  const dirSign = isAr ? -1 : 1;

  return (
    <section className="relative overflow-hidden" style={{ background: '#000129', minHeight: '100vh' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setResume((r) => r + 1); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touchX.current ?? 0); if (Math.abs(dx) > 50) go(dx < 0 ? dirSign : -dirSign); setPaused(false); setResume((r) => r + 1); }}>
      {/* banner images (background only) */}
      {BG.slice(0, n).map((id, idx) => <Banner key={id} id={id} active={idx === i} eager={idx === 0} isAr={isAr} />)}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: `linear-gradient(${isAr ? 'to left' : 'to right'}, rgba(0,1,41,0.93) 0%, rgba(0,1,41,0.78) 48%, rgba(0,1,41,0.5) 100%)` }} />
      <div className="absolute inset-0 stripes pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute pointer-events-none" style={{ zIndex: 1, width: 720, height: 720, borderRadius: '50%', background: '#DB333D', opacity: 0.16, insetInlineEnd: '-12%', bottom: '-34%' }} />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" style={{ zIndex: 2, minHeight: '100vh', paddingTop: 120, paddingBottom: 130 }}>
        <div>
          <h1 className="flex items-center gap-3 mb-6" style={{ fontFamily: 'IBM Plex Sans,sans-serif', fontSize: '1rem', fontWeight: 600, letterSpacing: isAr ? 0 : '0.16em', textTransform: 'uppercase', color: '#C3C7DB' }}>
            <span className="ar" style={{ fontSize: '1.4rem', color: '#FF5A63', letterSpacing: 0, textTransform: 'none' }}>{isAr ? t('hero.hello') : 'مرحباً'}</span>
            {t('hero.eyebrow')}
          </h1>

          <div key={`${i}-${isAr}`} className="slide-in">
            <div className="mb-3 flex items-center gap-3" style={{ color: '#FF5A63', fontSize: '1.05rem' }}>
              <span className="mono-num">0{i + 1} / 0{n}</span><span style={{ width: 24, height: 2, background: '#FF5A63', display: 'inline-block' }} /><span>{s.kicker}</span>
            </div>
            <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4.8rem)', lineHeight: isAr ? 1.45 : 1.08, color: '#F3F4FA', letterSpacing: '-0.02em' }}>
              {s.l1}<br /><span className="scribble" style={{ color: '#DB333D' }}>{s.l2}</span>
            </h2>
            <p className="mt-6 mb-9" style={{ color: '#D5D8E8', fontSize: '1.3rem', lineHeight: 1.65, maxWidth: 540 }}>{s.text}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={s.href} className="btn-primary">{s.cta} <ArrowRight size={20} className="flip-rtl" /></Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> {t('hero.whatsapp')}</a>
            </div>
          </div>
        </div>

        <div key={`${i}-art`} className="slide-in hidden lg:block" style={{ animationDelay: '0.12s' }}><Art /></div>
      </div>

      <div className="absolute left-0 right-0" style={{ bottom: 86, zIndex: 3 }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <div className="flex gap-2 flex-1" style={{ maxWidth: 440 }}>
            {slides.map((sl, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`${idx + 1}: ${sl.kicker}`} className="flex-1 relative" style={{ height: 6, background: '#2A2F57' }}>
                <span key={idx === i ? `a${i}-${resume}` : `b${idx}`} className="absolute top-0 bottom-0"
                  style={{ insetInlineStart: 0, background: '#DB333D', width: idx < i ? '100%' : 0, ...(idx === i ? { width: 0, animation: `progress ${DELAY}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' } : {}) }} />
              </button>
            ))}
          </div>
          <button onClick={() => go(-1)} aria-label={t('hero.prev')} className="w-11 h-11 flex items-center justify-center" style={{ border: '2px solid #5B6290', color: '#F3F4FA', borderRadius: 4 }}><ArrowLeft size={20} className="flip-rtl" /></button>
          <button onClick={() => go(1)} aria-label={t('hero.next')} className="w-11 h-11 flex items-center justify-center" style={{ border: '2px solid #5B6290', color: '#F3F4FA', borderRadius: 4 }}><ArrowRight size={20} className="flip-rtl" /></button>
        </div>
      </div>
    </section>
  );
}
