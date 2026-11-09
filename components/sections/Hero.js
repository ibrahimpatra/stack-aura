import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Search } from 'lucide-react';

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
      {/* Soft red glow top-right */}
      <div className="absolute pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(219,51,61,0.06),transparent 70%)', top: '-10%', right: '-10%' }} />
      {/* Soft navy glow bottom-left */}
      <div className="absolute pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(0,1,41,0.04),transparent 70%)', bottom: '-5%', left: '-5%' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Floating service badges */}
        <div className="flex justify-center gap-4 mb-8 reveal">
          {[
            { icon: <Code2 size={14} />, label: 'Web Dev', bg: 'rgba(219,51,61,0.08)', border: 'rgba(219,51,61,0.2)', color: '#DB333D' },
            { icon: <Smartphone size={14} />, label: 'Mobile', bg: 'rgba(0,1,41,0.06)', border: 'rgba(0,1,41,0.15)', color: '#000129' },
            { icon: <Search size={14} />, label: 'SEO', bg: 'rgba(219,51,61,0.08)', border: 'rgba(219,51,61,0.2)', color: '#DB333D' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontFamily: 'DM Sans,sans-serif', fontWeight: 500 }}>
              {s.icon} {s.label}
            </div>
          ))}
        </div>

        <h1 className="font-bold mb-6 reveal delay-1"
          style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.8rem,7vw,5.5rem)', lineHeight: 1.1, color: '#000129' }}>
          Build Your Website.<br />
          <span className="grad-red">Grow Your Business.</span>
        </h1>

        <p className="text-lg mb-3 reveal delay-2" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif', maxWidth: 560, margin: '0 auto 1.5rem' }}>
          Professional web development, mobile apps, and SEO services. Custom development for businesses in Kuwait and worldwide.
        </p>

        <p className="text-sm mb-10 reveal delay-2" style={{ color: '#D1D5DB', fontFamily: 'DM Sans,sans-serif', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Stackaura Digital offers custom website development, professional web development services, mobile app development, SEO optimisation, and digital marketing — helping businesses rank on Google and grow online.
        </p>

        <div className="flex flex-wrap gap-4 justify-center reveal delay-3">
          <Link href="/contact" className="btn-primary">Start Your Project <ArrowRight size={16} /></Link>
          <Link href="/projects" className="btn-ghost">View Our Work</Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-16 reveal delay-4">
          {[
            { v: '20+', l: 'Projects Delivered' },
            { v: '100%', l: 'Client Satisfaction' },
            { v: 'Kuwait', l: 'Based, Global Reach' },
            { v: 'SSR', l: 'SEO-First Build' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-bold text-2xl" style={{ fontFamily: 'Syne,sans-serif', color: '#DB333D' }}>{s.v}</div>
              <div className="text-xs mt-1" style={{ color: '#9CA3AF', fontFamily: 'DM Sans,sans-serif' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ opacity: 0.3 }}>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom,transparent,#DB333D)' }} />
      </div>
    </section>
  );
}
