import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext({ user: null, loading: true });
const ADMIN = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@stackauradigital.com';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      try {
        const { auth } = await import('./firebase');
        if (!auth) { setLoading(false); return; }
        const { onAuthStateChanged } = await import('firebase/auth');
        unsub = onAuthStateChanged(auth, (u) => {
          setUser(u?.email === ADMIN ? u : null);
          setLoading(false);
        });
      } catch { setLoading(false); }
    })();
    return () => unsub();
  }, []);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
