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
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { auth } = await import('../lib/firebase');
      if (!auth) {
        setError('Firebase is not configured. Please check your .env.local file.');
        setLoading(false);
        return;
      }
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const result = await signInWithEmailAndPassword(auth, form.email.trim(), form.password);
      if (result.user) {
        router.push('/admin');
      }
    } catch (err) {
      // Provide helpful error messages based on Firebase error codes
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Make sure you created this account in Firebase Auth → Email/Password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a few minutes and try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Check your internet connection.');
      } else if (err.code === 'auth/api-key-not-valid') {
        setError('Firebase API key is invalid. Check your .env.local configuration.');
      } else {
        setError(`Error: ${err.message || 'Unknown error. Check browser console.'}`);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Head><title>Admin Login | Stackaura Digital</title><meta name="robots" content="noindex" /></Head>
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#F0EFF2' }}>
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#DB333D' }}>
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne,sans-serif' }}>S</span>
            </div>
            <span className="font-bold" style={{ color: '#000129', fontFamily: 'Syne,sans-serif' }}>Stackaura Digital</span>
          </div>
          <div className="card p-8">
            <h1 className="font-bold text-xl mb-2 text-center" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>Admin Login</h1>
            <p className="text-xs text-center mb-6" style={{ color: '#9CA3AF', fontFamily: 'DM Sans,sans-serif' }}>
              Use the email & password you created in Firebase Auth
            </p>
            {error && (
              <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(219,51,61,0.06)', border: '1px solid rgba(219,51,61,0.2)', color: '#DB333D', fontFamily: 'DM Sans,sans-serif', lineHeight: 1.5 }}>
                {error}
              </div>
            )}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Email</label>
                <input type="email" required className="input" placeholder="admin@stackaura.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="relative">
                <label className="text-xs mb-1.5 block" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Password</label>
                <input type={show ? 'text' : 'password'} required className="input pr-10" placeholder="••••••••"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 bottom-3" style={{ color: '#9CA3AF' }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
                <LogIn size={15} /> {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <div className="mt-6 p-3 rounded-xl" style={{ background: '#F0EFF2', border: '1px solid #DDE1EA' }}>
              <p className="text-xs" style={{ color: '#6B7280', fontFamily: 'JetBrains Mono,monospace', lineHeight: 1.6 }}>
                Also set in .env.local:<br />
                NEXT_PUBLIC_ADMIN_EMAIL=your@email.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
