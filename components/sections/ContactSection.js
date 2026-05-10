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
    <section id="contact" className="py-24 px-6" style={{ background: full ? '#080C14' : '#0D1220' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="section-label mb-4 reveal" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)', color: '#93C5FD' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// contact</span>
            </div>
            <h2 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#E2E8F0' }}>
              Let's Build Something <span className="grad-blue">Great.</span>
            </h2>
            <p className="text-base mb-8 leading-relaxed reveal delay-2" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
              Ready to start your project? Tell us what you need and we'll get back to you within 24 hours.
            </p>
            <div className="space-y-3 mb-8 reveal delay-3">
              {[
                { icon: <Mail size={16} />, l: 'Email', v: SITE.email, href: `mailto:${SITE.email}` },
                { icon: <MessageSquare size={16} />, l: 'WhatsApp', v: `+${SITE.whatsapp}`, href: `https://wa.me/${SITE.whatsapp}` },
                { icon: <Globe size={16} />, l: 'Based in', v: SITE.location },
              ].map((item) => (
                <a key={item.l} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors block"
                  style={{ background: '#080C14', border: '1px solid #1A2236' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1A2236'}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>{item.icon}</div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: '#374151', fontFamily: 'DM Sans,sans-serif' }}>{item.l}</div>
                    <div className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{item.v}</div>
                  </div>
                </a>
              ))}
            </div>
            {!full && (
              <Link href="/contact" className="btn-ghost reveal delay-4">
                Full Contact Page <ArrowRight size={15} />
              </Link>
            )}
          </div>

          <div className="reveal-right">
            <form onSubmit={send} className="card p-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Name *</label>
                  <input required className="input" placeholder="Your name" value={form.name} onChange={(e) => up('name')(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Email *</label>
                  <input required type="email" className="input" placeholder="you@email.com" value={form.email} onChange={(e) => up('email')(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Service</label>
                <select className="input" value={form.service} onChange={(e) => up('service')(e.target.value)} style={{ color: form.service ? '#E2E8F0' : '#374151' }}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.label}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Message *</label>
                <textarea required rows={4} className="input resize-none" placeholder="Tell us about your project..." value={form.message} onChange={(e) => up('message')(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={15} /> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
