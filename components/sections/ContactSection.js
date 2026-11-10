import { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { SITE, SERVICES } from '../../lib/seo';

export default function ContactSection({ full = false }) {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const up = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const send = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi Stackaura Digital!\n\nName: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`);
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6" style={{ background: full ? '#FFFFFF' : '#000129' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="section-label mb-4 reveal" style={full ? { background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' } : { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
              <span style={{ fontFamily: 'DM Sans,sans-serif' }}>Contact</span>
            </div>
            <h2 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: full ? '#000129' : '#FFFFFF' }}>
              Ready to Start? <span style={{ color: '#DB333D' }}>Contact Us.</span>
            </h2>
            <p className="text-base mb-8 leading-relaxed reveal delay-2" style={{ color: full ? '#4B5563' : '#C9CEE8', fontFamily: 'DM Sans,sans-serif' }}>
              Tell us what you need. We reply within 24 hours. You can also write to us directly on WhatsApp.
            </p>
            <div className="space-y-3 mb-8 reveal delay-3">
              {[
                { icon: <Mail size={20} />, l: 'Email', v: SITE.email, href: `mailto:${SITE.email}` },
                { icon: <MessageSquare size={20} />, l: 'WhatsApp', v: `+${SITE.whatsapp}`, href: `https://wa.me/${SITE.whatsapp}` },
                { icon: <Globe size={20} />, l: 'Based in', v: SITE.location },
              ].map((item) => (
                <a key={item.l} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl transition-all block"
                  style={{ background: full ? '#F0EFF2' : 'rgba(255,255,255,0.05)', border: `1px solid ${full ? '#DDE1EA' : 'rgba(255,255,255,0.08)'}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#DB333D'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = full ? '#DDE1EA' : 'rgba(255,255,255,0.08)'; }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(219,51,61,0.1)', color: '#DB333D' }}>{item.icon}</div>
                  <div>
                    <div className="mb-0.5 text-sm" style={{ color: full ? '#6B7280' : '#B4BAD6', fontFamily: 'DM Sans,sans-serif' }}>{item.l}</div>
                    <div className="text-sm" style={{ color: full ? '#000129' : '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>{item.v}</div>
                  </div>
                </a>
              ))}
            </div>
            {!full && (
              <Link href="/contact" className="btn-primary reveal delay-4">
                More Ways to Contact Us <ArrowRight size={15} />
              </Link>
            )}
          </div>

          <div className="reveal-right">
            <form onSubmit={send} className="p-7 space-y-4 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #DDE1EA', boxShadow: '0 4px 40px rgba(0,1,41,0.08)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-semibold" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>Name *</label>
                  <input required className="input" placeholder="Your name" value={form.name} onChange={(e) => up('name')(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>Email *</label>
                  <input required type="email" className="input" placeholder="you@email.com" value={form.email} onChange={(e) => up('email')(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-semibold" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>Service</label>
                <select className="input" value={form.service} onChange={(e) => up('service')(e.target.value)}>
                  <option value="">Choose a service</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.label}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-semibold" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>Message *</label>
                <textarea required rows={4} className="input resize-none" placeholder="Tell us about your project in a few words..." value={form.message} onChange={(e) => up('message')(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={19} /> Send Message on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
