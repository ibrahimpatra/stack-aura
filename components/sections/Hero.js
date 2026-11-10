import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Smartphone, Search, MessageCircle } from 'lucide-react';
import SiteImage from '../ui/SiteImage';
import { SITE } from '../../lib/seo';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.25 + 0.05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(219,51,61,${p.o})`; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach((b) => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,1,41,${0.05 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }));
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg" style={{ background: '#FFFFFF' }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(219,51,61,0.06),transparent 70%)', top: '-10%', right: '-10%' }} />
      <div className="absolute pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(0,1,41,0.04),transparent 70%)', bottom: '-5%', left: '-5%' }} />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-32 pb-16">
        {/* What we do — in 3 simple words */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 reveal">
          {[
            { icon: <Globe size={20} />, label: 'Websites', bg: 'rgba(219,51,61,0.08)', border: 'rgba(219,51,61,0.25)', color: '#B91C26' },
            { icon: <Smartphone size={20} />, label: 'Mobile Apps', bg: 'rgba(0,1,41,0.06)', border: 'rgba(0,1,41,0.2)', color: '#000129' },
            { icon: <Search size={20} />, label: 'Found on Google', bg: 'rgba(219,51,61,0.08)', border: 'rgba(219,51,61,0.25)', color: '#B91C26' },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color, fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '1.05rem' }}>
              {b.icon} {b.label}
            </div>
          ))}
        </div>

        <h1 className="font-bold mb-6 reveal delay-1"
          style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.3rem,5.6vw,4.4rem)', lineHeight: 1.1, color: '#000129' }}>
          We Build Websites &amp; Apps<br />
          <span className="grad-red">That Bring You Customers.</span>
        </h1>

        <p className="mb-10 reveal delay-2" style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif', fontSize: '1.4rem', lineHeight: 1.6, maxWidth: 720, margin: '0 auto 2.5rem' }}>
          Stackaura Digital is a web design and development company in Kuwait. We make your website, build your mobile app, and help people find your business on Google.
        </p>

        <div className="flex flex-wrap gap-4 justify-center reveal delay-3">
          <Link href="/contact" className="btn-primary">Get a Free Quote <ArrowRight size={20} /></Link>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> Chat on WhatsApp</a>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 reveal delay-4">
          {[
            { v: '20+', l: 'Projects finished' },
            { v: '100%', l: 'Happy clients' },
            { v: '2–4 weeks', l: 'Typical time to launch' },
            { v: 'Kuwait', l: 'Based here, serving worldwide' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: '#DB333D', fontSize: '1.9rem' }}>{s.v}</div>
              <div className="mt-1" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif', fontSize: '1.02rem' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* SEO hero image (appears once the file is added to /public/images) */}
        <div className="mt-14 reveal delay-5 max-w-4xl mx-auto">
          <SiteImage id="hero" eager rounded={24} style={{ boxShadow: '0 24px 70px rgba(0,1,41,0.15)' }} />
        </div>
      </div>
    </section>
  );
}
