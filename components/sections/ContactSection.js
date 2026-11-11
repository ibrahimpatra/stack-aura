import { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { SITE, SERVICES } from '../../lib/seo';
import { useT } from '../../lib/i18n';

// Dark section with a LIGHT form card (strong contrast). `full` = used on the /contact page (no "more ways" button).
export default function ContactSection({ full = false }) {
  const { t, isAr } = useT();
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const up = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const send = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`${isAr ? 'هلا stackaura.cc!' : 'Hi stackaura.cc!'}\n\n${t('contact.name')}: ${form.name}\n${t('contact.emailField')}: ${form.email}\n${t('contact.service')}: ${form.service}\n\n${t('contact.message')}:\n${form.message}`);
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank');
  };

  const items = [
    { icon: <Mail size={20} />, l: t('contact.email'), v: SITE.email, href: `mailto:${SITE.email}`, ltr: true },
    { icon: <MessageSquare size={20} />, l: t('contact.whatsapp'), v: `+${SITE.whatsapp}`, href: `https://wa.me/${SITE.whatsapp}`, ltr: true },
    { icon: <Globe size={20} />, l: t('contact.basedIn'), v: t('contact.location') },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="section-label mb-4 reveal">{t('contact.label')}</div>
          <h2 className="font-extrabold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,4.2vw,3.2rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            {t('contact.t1')} <span style={{ color: '#DB333D' }}>{t('contact.t2')}</span>
          </h2>
          <p className="mb-8 reveal delay-2" style={{ color: 'var(--body)', fontSize: '1.2rem', lineHeight: 1.7 }}>{t('contact.text')}</p>
          <div className="space-y-3 mb-8 reveal delay-3">
            {items.map((item) => {
              const Tag = item.href ? 'a' : 'div';
              return (
                <Tag key={item.l} href={item.href} target={item.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 transition-all" style={{ background: 'var(--tint)', border: '1px solid var(--line)', borderRadius: 6 }}>
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(219,51,61,0.14)', color: '#FF5A63', borderRadius: 4 }}>{item.icon}</div>
                  <div>
                    <div style={{ color: 'var(--mute)', fontSize: '0.98rem' }}>{item.l}</div>
                    <div style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600 }} dir={item.ltr ? 'ltr' : undefined}>{item.v}</div>
                  </div>
                </Tag>
              );
            })}
          </div>
          {!full && <Link href="/contact" className="btn-primary reveal delay-4">{t('contact.more')} <ArrowRight size={18} className="flip-rtl" /></Link>}
        </div>

        <div className="reveal-right">
          <form onSubmit={send} className="light p-8 space-y-5" style={{ background: '#F2F3F8', border: '3px solid #F2F3F8', borderRadius: 6, boxShadow: '10px 10px 0 #DB333D' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-semibold" style={{ color: 'var(--ink)' }}>{t('contact.name')} *</label>
                <input required className="input" value={form.name} onChange={(e) => up('name')(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block font-semibold" style={{ color: 'var(--ink)' }}>{t('contact.emailField')} *</label>
                <input required type="email" dir="ltr" className="input" placeholder="you@email.com" value={form.email} onChange={(e) => up('email')(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block font-semibold" style={{ color: 'var(--ink)' }}>{t('contact.service')}</label>
              <select className="input" value={form.service} onChange={(e) => up('service')(e.target.value)}>
                <option value="">{t('contact.choose')}</option>
                {SERVICES.map((s) => { const l = t(`services.items.${s.slug}.label`); return <option key={s.slug} value={l}>{l}</option>; })}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block font-semibold" style={{ color: 'var(--ink)' }}>{t('contact.message')} *</label>
              <textarea required rows={4} className="input resize-none" placeholder={t('contact.placeholder')} value={form.message} onChange={(e) => up('message')(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full"><Send size={19} className="flip-rtl" /> {t('contact.send')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
