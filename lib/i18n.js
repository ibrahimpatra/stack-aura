import { useRouter } from 'next/router';
import en from './lang/en';
import ar from './lang/ar';

export const LOCALES = ['en', 'ar'];
const DICT = { en, ar };

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

// const { t, locale, isAr } = useT();   t('hero.slides') → array/object/string for the current language
export function useT() {
  const { locale = 'en' } = useRouter();
  const dict = DICT[locale] || en;
  const t = (key) => { const v = get(dict, key); return v !== undefined ? v : get(en, key) ?? key; };
  return { t, locale, isAr: locale === 'ar', dict };
}

// For server code (getServerSideProps etc.)
export const getT = (locale = 'en') => (key) => { const d = DICT[locale] || en; const v = get(d, key); return v !== undefined ? v : get(en, key) ?? key; };

// Pick the Arabic version of a Firestore field when it exists:  loc(post, 'title', locale)  → post.title_ar || post.title
export const loc = (obj, field, locale) => (locale === 'ar' && obj?.[`${field}_ar`]) ? obj[`${field}_ar`] : obj?.[field];

// Path with the right language prefix (for manual links/canonicals)
export const withLocale = (path, locale) => (locale === 'ar' ? `/ar${path === '/' ? '' : path}` : path);
