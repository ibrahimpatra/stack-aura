import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext({ user: null, loading: true });

// ADMIN_EMAIL is optional — if set, only that email can log in.
// If not set, any authenticated Firebase user is treated as admin.
// This is safe because you control who is in Firebase Auth.
const ADMIN = process.env.NEXT_PUBLIC_ADMIN_EMAIL || null;

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
          if (!u) {
            setUser(null);
          } else if (!ADMIN || u.email === ADMIN) {
            // Allow if no ADMIN filter set, or email matches
            setUser(u);
          } else {
            // Wrong account logged in
            setUser(null);
          }
          setLoading(false);
        });
      } catch { setLoading(false); }
    })();
    return () => unsub();
  }, []);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
