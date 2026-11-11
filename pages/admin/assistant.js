import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import { ArrowLeft, Trash2, Phone, HelpCircle, BookOpen, Check } from 'lucide-react';

const fmt = (ts) => { try { return ts?.toDate?.().toLocaleString() || ''; } catch { return ''; } };

export default function AssistantAdmin() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [logs, setLogs] = useState([]);
  const [know, setKnow] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newQ, setNewQ] = useState(''); const [newA, setNewA] = useState('');

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  const load = useCallback(async () => {
    const { db } = await import('../../lib/firebase');
    const { collection, getDocs, query, orderBy, limit } = await import('firebase/firestore');
    const grab = async (name, ord = true) => (await getDocs(ord ? query(collection(db, name), orderBy('createdAt', 'desc'), limit(150)) : collection(db, name))).docs.map((d) => ({ id: d.id, ...d.data() }));
    setLeads(await grab('leads')); setLogs((await grab('chatLogs')).filter((l) => l.unsure && !l.resolved)); setKnow(await grab('knowledge'));
  }, []);
  useEffect(() => { if (user) load().catch(() => {}); }, [user, load]);

  const del = async (col, id) => { if (!confirm('Delete?')) return; const { db } = await import('../../lib/firebase'); const { doc, deleteDoc } = await import('firebase/firestore'); await deleteDoc(doc(db, col, id)); load(); };
  const teach = async (log) => {
    const a = (answers[log.id] || '').trim(); if (!a) return;
    const { db } = await import('../../lib/firebase'); const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection(db, 'knowledge'), { question: log.q, answer: a, createdAt: serverTimestamp() });
    await updateDoc(doc(db, 'chatLogs', log.id), { resolved: true }); load();
  };
  const dismiss = async (log) => { const { db } = await import('../../lib/firebase'); const { doc, updateDoc } = await import('firebase/firestore'); await updateDoc(doc(db, 'chatLogs', log.id), { resolved: true }); load(); };
  const addManual = async () => {
    if (!newQ.trim() || !newA.trim()) return;
    const { db } = await import('../../lib/firebase'); const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection(db, 'knowledge'), { question: newQ.trim(), answer: newA.trim(), createdAt: serverTimestamp() }); setNewQ(''); setNewA(''); load();
  };

  if (loading || !user) return null;
  const tabs = [['leads', 'Leads', Phone, leads.length], ['unanswered', 'Unanswered questions', HelpCircle, logs.length], ['teach', 'What it knows', BookOpen, know.length]];

  return (
    <>
      <Head><title>Assistant | stackaura.cc Admin</title><meta name="robots" content="noindex" /></Head>
      <div className="light-ui" dir="ltr" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#F0EFF2', borderBottom: '1px solid #DDE1EA' }}>
          <Link href="/admin" className="flex items-center gap-1.5" style={{ color: '#4B5563' }}><ArrowLeft size={16} /> Dashboard</Link>
          <span style={{ color: '#9CA3AF' }}>|</span><span className="font-semibold" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>AI Assistant</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="mb-6" style={{ color: '#4B5563' }}>The assistant answers from your services, projects and blog automatically. When it cannot answer, the question shows up here: write the answer once and it knows it forever.</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(([k, label, Icon, n]) => (
              <button key={k} onClick={() => setTab(k)} className="flex items-center gap-2 px-4 py-2.5 font-semibold" style={{ borderRadius: 6, border: `2px solid ${tab === k ? '#DB333D' : '#DDE1EA'}`, background: tab === k ? 'rgba(219,51,61,0.08)' : '#fff', color: tab === k ? '#B91C26' : '#374151' }}>
                <Icon size={18} /> {label} <span style={{ background: '#E5E7EE', borderRadius: 20, padding: '0 9px', fontSize: '0.9rem' }}>{n}</span>
              </button>
            ))}
          </div>

          {tab === 'leads' && (leads.length ? leads.map((l) => (
            <div key={l.id} className="card p-5 mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="font-bold" style={{ color: '#000129', fontSize: '1.1rem' }}>{l.name}</div>
                <a href={`https://wa.me/${String(l.phone).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#B91C26', fontWeight: 600 }}>{l.phone}</a>
                {l.message && <p className="mt-1" style={{ color: '#4B5563' }}>“{l.message}”</p>}
                <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>{fmt(l.createdAt)} · {l.locale} · {l.page}</div>
              </div>
              <button onClick={() => del('leads', l.id)} aria-label="Delete" style={{ color: '#9CA3AF' }}><Trash2 size={18} /></button>
            </div>
          )) : <p style={{ color: '#6B7280' }}>No leads yet. When a visitor leaves a number in the chat, it appears here.</p>)}

          {tab === 'unanswered' && (logs.length ? logs.map((l) => (
            <div key={l.id} className="card p-5 mb-4">
              <div className="font-semibold mb-1" style={{ color: '#000129' }}>Visitor asked: “{l.q}”</div>
              <div className="mb-3" style={{ color: '#6B7280', fontSize: '0.92rem' }}>{fmt(l.createdAt)} · {l.locale}</div>
              <textarea rows={3} className="input mb-3" placeholder="Write the right answer (it will be remembered)…" value={answers[l.id] || ''} onChange={(e) => setAnswers({ ...answers, [l.id]: e.target.value })} />
              <div className="flex gap-3">
                <button onClick={() => teach(l)} className="btn-primary" style={{ padding: '8px 18px', fontSize: '1rem' }}><Check size={16} /> Teach it</button>
                <button onClick={() => dismiss(l)} className="btn-ghost" style={{ padding: '8px 18px', fontSize: '1rem' }}>Ignore</button>
              </div>
            </div>
          )) : <p style={{ color: '#6B7280' }}>Nothing waiting. Every question was answered.</p>)}

          {tab === 'teach' && (<>
            <div className="card p-5 mb-6">
              <div className="font-bold mb-3" style={{ color: '#000129' }}>Teach it something new</div>
              <input className="input mb-3" placeholder="Question (e.g. Do you work on weekends?)" value={newQ} onChange={(e) => setNewQ(e.target.value)} />
              <textarea rows={3} className="input mb-3" placeholder="Answer" value={newA} onChange={(e) => setNewA(e.target.value)} />
              <button onClick={addManual} className="btn-primary" style={{ padding: '8px 20px', fontSize: '1rem' }}>Save</button>
            </div>
            {know.map((k) => (
              <div key={k.id} className="card p-5 mb-3 flex justify-between gap-4">
                <div><div className="font-semibold" style={{ color: '#000129' }}>Q: {k.question}</div><div style={{ color: '#374151' }}>A: {k.answer}</div></div>
                <button onClick={() => del('knowledge', k.id)} aria-label="Delete" style={{ color: '#9CA3AF' }}><Trash2 size={18} /></button>
              </div>
            ))}
          </>)}
        </div>
      </div>
    </>
  );
}
