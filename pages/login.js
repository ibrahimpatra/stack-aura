import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const { auth } = await import('../lib/firebase');
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push('/admin');
    } catch { setError('Invalid credentials.'); }
    setLoading(false);
  };

  return (
    <>
      <Head><title>Admin Login | Stackaura Digital</title><meta name="robots" content="noindex" /></Head>
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#080C14' }}>
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)' }}>
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne,sans-serif' }}>S</span>
            </div>
            <span className="font-bold text-white" style={{ fontFamily: 'Syne,sans-serif' }}>Stackaura Digital</span>
          </div>
          <div className="card p-8">
            <h1 className="font-bold text-xl mb-6 text-center" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Admin Login</h1>
            {error && <div className="mb-4 p-3 rounded-xl text-sm text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5', fontFamily: 'DM Sans,sans-serif' }}>{error}</div>}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Email</label>
                <input type="email" required className="input" placeholder="admin@..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="relative">
                <label className="text-xs mb-1.5 block" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>Password</label>
                <input type={show ? 'text' : 'password'} required className="input pr-10" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 bottom-3" style={{ color: '#475569' }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
                <LogIn size={15} /> {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
