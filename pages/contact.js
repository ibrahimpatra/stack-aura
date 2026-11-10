import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import SiteImage from '../components/ui/SiteImage';
import ContactSection from '../components/sections/ContactSection';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';
import { Clock, MessageCircle, Mail } from 'lucide-react';

export default function Contact() {
  useScrollReveal();
  const seo = pageSEO({
    title: 'Contact stackaura.cc | Get a Free Quote',
    description: 'Contact stackaura.cc for professional web development, mobile app development, and SEO services. Get a free quote for your project. Based in Kuwait, available worldwide.',
    path: '/contact',
    extraKeywords: ['contact web developer kuwait', 'get a quote web development', 'hire web developer kuwait', 'free quote website'],
  });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />

        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #DDE1EA' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'IBM Plex Sans,sans-serif' }}>Contact us</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#F3F4FA', lineHeight: 1.1 }}>
              Let’s Talk About Your Project
            </h1>
            <p className="text-lg reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', maxWidth: 500, margin: '0 auto' }}>
              Tell us what you need. We reply within 24 hours with a clear plan and price.
            </p>
          </div>
        </section>

        {/* Quick info cards */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <SiteImage id="contact" rounded={24} style={{ marginBottom: 28 }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { icon: <Clock size={24} />, title: '24hr Response', desc: 'We reply to all inquiries within one business day.', color: '#DB333D' },
              { icon: <MessageCircle size={24} />, title: 'WhatsApp Available', desc: 'Prefer to chat? Reach us directly on WhatsApp.', color: '#DB333D' },
              { icon: <Mail size={24} />, title: 'Free First Chat', desc: 'Your first call is free. We listen and suggest the best plan.', color: '#F3F4FA' },
            ].map((c, i) => (
              <div key={c.title} className={`card p-5 reveal delay-${i + 1}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${c.color}15`, color: c.color }}>{c.icon}</div>
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>{c.title}</h3>
                <p className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <ContactSection full />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
