import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../lib/AuthContext';
import ChatWidget from '../components/ui/ChatWidget';
import '../styles/globals.css';

const PRIVATE = /^\/(admin|login)/;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const locale = router.locale || 'en';

  // keep <html lang dir> right after client-side language switches
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
      {!PRIVATE.test(router.pathname) && <ChatWidget />}
    </AuthProvider>
  );
}
