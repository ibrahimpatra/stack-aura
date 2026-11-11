import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import Hero from '../components/sections/Hero';
import Ticker from '../components/sections/Ticker';
import TechMarquee from '../components/sections/TechMarquee';
import ServicesSection from '../components/sections/ServicesSection';
import PlansSection from '../components/sections/PlansSection';
import AreasSection from '../components/sections/AreasSection';
import FaqSection from '../components/sections/FaqSection';
import HowItWorks from '../components/sections/HowItWorks';
import ProjectsSection from '../components/sections/ProjectsSection';
import AboutSection from '../components/sections/AboutSection';
import BlogPreview from '../components/sections/BlogPreview';
import ContactSection from '../components/sections/ContactSection';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';
import { useT } from '../lib/i18n';

export default function Home({ projects, posts, projectClients, technologies }) {
  useScrollReveal();

  const { t, locale } = useT();
  const seo = pageSEO({ title: t('meta.home.title'), description: t('meta.home.description'), locale, projectClients,
    extraKeywords: t('services.items.web-development.keywords') });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: 'Stackaura',
    url: SITE.url,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${SITE.url}/#organization` },
  };

  return (
    <>
      <SEOHead {...seo} structuredData={structuredData} />
      <div style={{ background: '#000129' }}>
        <Navbar />
        <Hero />
        <Ticker />
        <AboutSection />
        <ServicesSection />
        <PlansSection />
        <HowItWorks />
        <TechMarquee technologies={technologies} />
        <AreasSection />
        <FaqSection />
        <ProjectsSection projects={projects} />
        <BlogPreview posts={posts} />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let projects = [], posts = [], projectClients = [], technologies = [];
  try {
    const { db } = await import('../lib/firebase');
    if (db) {
      const { collection, getDocs, orderBy, query, limit, where } = await import('firebase/firestore');

      // Technology library (feeds the logo strip)
      try { const { getTaxonomy } = await import('../lib/taxonomy'); technologies = await getTaxonomy('technologies'); } catch {}

      // Projects
      const pq = query(collection(db, 'projects'), where('featured', '==', true), orderBy('order', 'asc'), limit(4));
      const psnap = await getDocs(pq).catch(() => getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(4))));
      projects = psnap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, title: data.title || '', title_ar: data.title_ar || '', excerpt_ar: data.excerpt_ar || '', description_ar: data.description_ar || '', slug: data.slug || d.id, client: data.client || '', excerpt: data.excerpt || '', description: data.description || '', images: data.images || [], tags: data.tags || [], liveUrl: data.liveUrl || '', featured: data.featured || false };
      });
      projectClients = projects.map((p) => p.client).filter(Boolean);

      // Posts
      const bq = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
      const bsnap = await getDocs(bq);
      posts = bsnap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, title: data.title || '', title_ar: data.title_ar || '', excerpt_ar: data.excerpt_ar || '', description_ar: data.description_ar || '', excerpt: data.excerpt || '', slug: data.slug || d.id, tag: (data.tags && data.tags[0]) || data.tag || 'Article', tagColor: '#DB333D', coverImage: data.coverImage || '', coverAlt: data.coverAlt || '', readTime: data.readTime || '5 min', date: data.createdAt?.toDate?.()?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) || '' };
      });
    }
  } catch {}
  return { props: { projects, posts, projectClients, technologies } };
}
