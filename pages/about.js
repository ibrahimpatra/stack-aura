import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import ContactSection from '../components/sections/ContactSection';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';
import { CheckCircle2, Users, Globe, Zap, Award, Code2 } from 'lucide-react';

const VALUES = [
  { icon: <Code2 size={20} />, title: 'Clean Code, Always', desc: 'We write maintainable, documented code. No shortcuts. You own it all.', color: '#3B82F6' },
  { icon: <Zap size={20} />, title: 'Speed & Performance', desc: 'Every site we build scores 90+ on Lighthouse. Performance is a feature.', color: '#F59E0B' },
  { icon: <Globe size={20} />, title: 'SEO-First Approach', desc: 'Server-side rendering, structured data, and sitemaps built in from day one.', color: '#8B5CF6' },
  { icon: <Users size={20} />, title: 'Transparent Partnership', desc: 'Clear pricing, regular updates, and honest timelines. No surprises.', color: '#06B6D4' },
  { icon: <Award size={20} />, title: 'Quality Delivery', desc: 'We test thoroughly before launch. Every project gets our full attention.', color: '#10B981' },
  { icon: <Globe size={20} />, title: 'Global Reach', desc: 'Kuwait-based, but we serve clients across GCC and worldwide.', color: '#EF4444' },
];

const TEAM = [
  { name: 'Founder & Lead Developer', role: 'Full-Stack & Mobile', skills: ['Next.js', 'React Native', 'Firebase', 'SEO'], initials: 'SD' },
];

export default function About() {
  useScrollReveal();
  const seo = pageSEO({
    title: 'About Stackaura Digital | Web Development Agency Kuwait',
    description: 'Stackaura Digital is a professional web development agency based in Kuwait. We build custom websites, mobile apps, and SEO solutions for businesses worldwide. Learn about our team and approach.',
    path: '/about',
    extraKeywords: ['about stackaura digital', 'web development team kuwait', 'who we are', 'kuwait web agency'],
  });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#080C14', minHeight: '100vh' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 px-6 grid-bg" style={{ borderBottom: '1px solid #1A2236' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)', color: '#C4B5FD' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// about us</span>
            </div>
            <h1 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: '#E2E8F0', lineHeight: 1.1 }}>
              We Build Products<br /><span className="grad">That Actually Work.</span>
            </h1>
            <p className="text-lg leading-relaxed reveal delay-2" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif', maxWidth: 560, margin: '0 auto' }}>
              Stackaura Digital is a professional web development agency based in Kuwait, delivering custom websites, mobile apps, and SEO strategies for businesses worldwide.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#E2E8F0' }}>Our Story</h2>
              <p className="text-base mb-4 leading-relaxed reveal delay-1" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
                Stackaura Digital was founded with one goal: to build digital products that actually perform in the real world — not just look good in a demo.
              </p>
              <p className="text-base mb-4 leading-relaxed reveal delay-2" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
                Based in Kuwait, we've helped businesses across the GCC and beyond launch websites that rank on Google, mobile apps that users love, and SEO strategies that drive real organic growth.
              </p>
              <p className="text-base leading-relaxed reveal delay-3" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
                Every project we take on gets the same treatment: clean code, proper SEO setup, and a launch that's built to last. No shortcuts, no bloat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal-right">
              {[
                { v: '20+', l: 'Projects Delivered' },
                { v: '100%', l: 'Client Satisfaction' },
                { v: '3+', l: 'Years Experience' },
                { v: 'Global', l: 'Client Reach' },
              ].map((s) => (
                <div key={s.l} className="card p-6 text-center">
                  <div className="font-bold text-3xl grad mb-1" style={{ fontFamily: 'Syne,sans-serif' }}>{s.v}</div>
                  <div className="text-sm" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6" style={{ background: '#0D1220' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold mb-3 text-center reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#E2E8F0' }}>How We Work</h2>
            <p className="text-center mb-12 reveal delay-1" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>The principles behind every project we ship.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map((v, i) => (
                <div key={v.title} className={`card p-6 reveal delay-${(i % 3) + 1}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}15`, color: v.color }}>{v.icon}</div>
                  <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold mb-12 text-center reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#E2E8F0' }}>The Team</h2>
            <div className="flex justify-center">
              {TEAM.map((m) => (
                <div key={m.name} className="card p-8 text-center max-w-xs w-full reveal">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                    style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)', color: 'white', fontFamily: 'Syne,sans-serif' }}>
                    {m.initials}
                  </div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>{m.name}</h3>
                  <p className="text-sm mb-4" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>{m.role}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {m.skills.map((s) => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection full />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
