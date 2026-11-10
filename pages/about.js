import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import SiteImage from '../components/ui/SiteImage';
import ContactSection from '../components/sections/ContactSection';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';
import { CheckCircle2, Users, Globe, Zap, Award, Code2 } from 'lucide-react';

const VALUES = [
  { icon: <Code2 size={26} />, title: 'Clean, Honest Work', desc: 'We build things properly, with no shortcuts. And you own everything we make for you.', color: '#DB333D' },
  { icon: <Zap size={26} />, title: 'Fast Websites', desc: 'Your website opens quickly on any phone or computer. Fast sites keep visitors and rank better on Google.', color: '#DB333D' },
  { icon: <Globe size={26} />, title: 'Ready for Google', desc: 'We set up everything Google needs to find and show your website, right from the start.', color: '#DB333D' },
  { icon: <Users size={26} />, title: 'Clear Communication', desc: 'Clear prices, regular updates and honest timelines. No surprises.', color: '#DB333D' },
  { icon: <Award size={26} />, title: 'Quality You Can Trust', desc: 'We test everything carefully before launch, and every project gets our full attention.', color: '#DB333D' },
  { icon: <Globe size={26} />, title: 'Kuwait & Worldwide', desc: 'We are based in Kuwait and work with clients across the Gulf and around the world.', color: '#DB333D' },
];

const TEAM = [
  { name: 'Founder & Lead Developer', role: 'Websites, Mobile Apps & Google Ranking', skills: ['Websites', 'Mobile Apps', 'SEO'], initials: 'SD' },
];

export default function About() {
  useScrollReveal();
  const seo = pageSEO({
    title: 'About stackaura.cc | Web Development Agency Kuwait',
    description: 'stackaura.cc is a professional web development agency based in Kuwait. We build custom websites, mobile apps, and SEO solutions for businesses worldwide. Learn about our team and approach.',
    path: '/about',
    extraKeywords: ['about stackaura digital', 'web development team kuwait', 'who we are', 'kuwait web agency'],
  });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 px-6 grid-bg" style={{ borderBottom: '1px solid #DDE1EA' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'IBM Plex Sans,sans-serif' }}>About us</span>
            </div>
            <h1 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: '#F3F4FA', lineHeight: 1.1 }}>
              We Build Websites<br /><span className="grad">That Actually Work.</span>
            </h1>
            <p className="text-lg leading-relaxed reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', maxWidth: 560, margin: '0 auto' }}>
              stackaura.cc is a web development company in Kuwait. We build websites and mobile apps, and help businesses get found on Google.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#F3F4FA' }}>Our Story</h2>
              <p className="text-base mb-4 leading-relaxed reveal delay-1" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                stackaura.cc started with one simple goal: build websites and apps that really help businesses, not ones that only look good in a presentation.
              </p>
              <p className="text-base mb-4 leading-relaxed reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                We are based in Kuwait and have helped businesses in the Gulf and beyond launch websites that show up on Google and mobile apps that customers enjoy using.
              </p>
              <p className="text-base leading-relaxed reveal delay-3" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                Every project gets the same care: clean work, Google-ready setup, and a launch that lasts. No shortcuts.
              </p>
            </div>

            <div className="reveal-right">
              <SiteImage id="about-team" rounded={20} style={{ marginBottom: 20 }} />
              <div className="grid grid-cols-2 gap-4">
              {[
                { v: '20+', l: 'Projects Delivered' },
                { v: '100%', l: 'Client Satisfaction' },
                { v: '3+', l: 'Years of Experience' },
                { v: 'Global', l: 'Client Reach' },
              ].map((s) => (
                <div key={s.l} className="card p-6 text-center">
                  <div className="font-bold text-3xl grad mb-1" style={{ fontFamily: 'Syne,sans-serif' }}>{s.v}</div>
                  <div className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{s.l}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where we are */}
        <section className="px-6 pb-4"><div className="max-w-7xl mx-auto"><SiteImage id="kuwait" rounded={24} /></div></section>

        {/* Values */}
        <section className="py-20 px-6" style={{ background: '#14172E' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold mb-3 text-center reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#F3F4FA' }}>What We Believe In</h2>
            <p className="text-center mb-12 reveal delay-1" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>The simple rules behind every project we do.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map((v, i) => (
                <div key={v.title} className={`card p-6 reveal delay-${(i % 3) + 1}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}15`, color: v.color }}>{v.icon}</div>
                  <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold mb-12 text-center reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#F3F4FA' }}>The Team</h2>
            <div className="flex justify-center">
              {TEAM.map((m) => (
                <div key={m.name} className="card p-8 text-center max-w-xs w-full reveal">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                    style={{ background: 'linear-gradient(135deg,#DB333D,#c2282f)', color: 'white', fontFamily: 'Syne,sans-serif' }}>
                    {m.initials}
                  </div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>{m.name}</h3>
                  <p className="text-sm mb-4" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{m.role}</p>
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
