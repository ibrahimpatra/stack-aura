import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle, Phone } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { SITE } from '../../lib/seo';

// Floating AI assistant. Talks to /api/chat. Keeps the conversation for the visit (sessionStorage).
export default function ChatWidget() {
  const { t, locale, isAr } = useT();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState({ show: false, name: '', phone: '', done: false, err: false });
  const endRef = useRef(null);

  useEffect(() => { try { const s = JSON.parse(sessionStorage.getItem('sa_chat') || '[]'); if (Array.isArray(s)) setMsgs(s); } catch {} }, []);
  useEffect(() => { try { sessionStorage.setItem('sa_chat', JSON.stringify(msgs.slice(-30))); } catch {} endRef.current?.scrollIntoView({ block: 'end' }); }, [msgs, open, busy]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const next = [...msgs, { role: 'user', content: q }];
    setMsgs(next); setInput(''); setBusy(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })), locale }) });
      const d = await r.json();
      if (!r.ok || !d.reply) throw new Error('x');
      setMsgs((m) => [...m, { role: 'assistant', content: d.reply, unsure: d.unsure }]);
      if (d.unsure) setLead((l) => ({ ...l, show: true }));
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: t('chat.error'), error: true }]);
    }
    setBusy(false);
  };

  const sendLead = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: lead.name, phone: lead.phone, locale, page: window.location.pathname, message: msgs.filter((m) => m.role === 'user').slice(-1)[0]?.content || '' }) });
      if (!r.ok) throw new Error('x');
      setLead((l) => ({ ...l, done: true, err: false }));
    } catch { setLead((l) => ({ ...l, err: true })); }
  };

  const all = msgs.length ? msgs : [{ role: 'assistant', content: t('chat.welcome') }];

  return (
    <>
      {open && (
        <div role="dialog" aria-label={t('chat.title')} className="fixed flex flex-col"
          style={{ zIndex: 90, insetInlineEnd: 16, bottom: 92, width: 'min(390px, calc(100vw - 32px))', height: 'min(580px, calc(100vh - 130px))', background: '#000129', border: '2px solid #2A2F57', borderRadius: 8, boxShadow: '8px 8px 0 #DB333D', overflow: 'hidden' }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#DB333D', color: '#fff' }}>
            <span className="flex items-center justify-center" style={{ width: 40, height: 40, background: '#00001A', borderRadius: 4 }}><Bot size={22} /></span>
            <div className="flex-1 min-w-0">
              <div className="font-bold" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.1rem', lineHeight: 1.2 }}>{t('chat.title')}</div>
              <div style={{ fontSize: '0.88rem', opacity: 0.9 }}>{t('chat.sub')}</div>
            </div>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2"><MessageCircle size={22} /></a>
            <button onClick={() => setOpen(false)} aria-label={t('chat.close')} className="p-2"><X size={22} /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite" style={{ background: '#05093A' }}>
            {all.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div style={{ maxWidth: '86%', padding: '10px 14px', borderRadius: 6, whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '1.02rem', background: m.role === 'user' ? '#DB333D' : '#14172E', color: m.role === 'user' ? '#fff' : '#E4E6F2', border: m.role === 'user' ? 'none' : '1px solid #2A2F57' }}>
                  {m.content}
                  {m.error && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-2 font-bold" style={{ color: '#FF5A63' }}><MessageCircle size={16} /> {t('chat.whatsapp')}</a>}
                </div>
              </div>
            ))}
            {!msgs.length && (
              <div className="flex flex-wrap gap-2 pt-1">
                {t('chat.chips').map((c) => <button key={c} onClick={() => send(c)} className="text-start" style={{ border: '1.5px solid #5B6290', color: '#E4E6F2', borderRadius: 4, padding: '8px 12px', fontSize: '0.98rem' }}>{c}</button>)}
              </div>
            )}
            {busy && <div style={{ color: '#8D93B5', fontSize: '0.95rem' }}>{t('chat.thinking')}</div>}

            {lead.show && (
              <form onSubmit={sendLead} className="light p-4 space-y-3" style={{ background: '#F2F3F8', borderRadius: 6 }}>
                {lead.done ? <p style={{ color: '#000129', fontWeight: 600 }}>{t('chat.leadThanks')}</p> : (<>
                  <div className="font-bold flex items-center gap-2" style={{ color: '#000129' }}><Phone size={17} style={{ color: '#DB333D' }} /> {t('chat.leadTitle')}</div>
                  <input required minLength={2} className="input" style={{ padding: '10px 12px', fontSize: '1rem' }} placeholder={t('chat.leadName')} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                  <input required dir="ltr" inputMode="tel" className="input" style={{ padding: '10px 12px', fontSize: '1rem' }} placeholder={t('chat.leadPhone')} value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
                  {lead.err && <p style={{ color: '#B91C1C', fontSize: '0.92rem' }}>{t('chat.error')}</p>}
                  <button className="btn-primary w-full" style={{ padding: '10px 16px', fontSize: '1rem' }}>{t('chat.leadSend')}</button>
                </>)}
              </form>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 p-3" style={{ background: '#00001A', borderTop: '1px solid #2A2F57' }}>
            <input className="input flex-1" style={{ padding: '11px 14px', fontSize: '1.02rem' }} placeholder={t('chat.placeholder')} value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} aria-label={t('chat.placeholder')} />
            <button type="submit" disabled={busy || !input.trim()} aria-label={t('chat.send')} className="flex items-center justify-center" style={{ width: 46, height: 46, background: '#DB333D', color: '#fff', borderRadius: 4, opacity: busy || !input.trim() ? 0.5 : 1 }}><Send size={20} className="flip-rtl" /></button>
          </form>
        </div>
      )}

      <button onClick={() => setOpen(!open)} aria-label={open ? t('chat.close') : t('chat.open')}
        className="fixed flex items-center gap-2 font-bold" style={{ zIndex: 90, insetInlineEnd: 16, bottom: 16, background: '#DB333D', color: '#fff', border: '2px solid #fff', borderRadius: 6, padding: '12px 18px', boxShadow: '4px 4px 0 #00001A', fontSize: '1.02rem' }}>
        {open ? <X size={22} /> : <Bot size={22} />}
        <span className="hidden sm:inline">{open ? t('chat.close') : t('chat.title')}</span>
      </button>
    </>
  );
}
