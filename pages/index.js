import { useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import Hero from '../components/sections/Hero';
import TechMarquee from '../components/sections/TechMarquee';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import AboutSection from '../components/sections/AboutSection';
import BlogPreview from '../components/sections/BlogPreview';
import ContactSection from '../components/sections/ContactSection';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';

export default function Home({ projects, posts, projectClients }) {
  useScrollReveal();

  const seo = pageSEO({
    title: 'Stackaura Digital | Professional Web Development Agency Kuwait',
    description: `${SITE.name} — Professional web development, custom website development, mobile app development, and SEO optimisation. Based in Kuwait, serving clients worldwide. Build your website with experts.`,
    path: '/',
    extraKeywords: ['build your website', 'professional web development', 'custom web development', 'website development company', 'hire web developer'],
    projectClients,
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: { '@type': 'SearchAction', target: `${SITE.url}/projects?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
  };

  return (
    <>
      <SEOHead {...seo} structuredData={structuredData} />
      <div style={{ background: '#FFFFFF' }}>
        <Navbar />
        <Hero />
        <TechMarquee />
        <ServicesSection />
        <ProjectsSection projects={projects} />
        <AboutSection />
        <BlogPreview posts={posts} />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let projects = [], posts = [], projectClients = [];
  try {
    const { db } = await import('../lib/firebase');
    if (db) {
      const { collection, getDocs, orderBy, query, limit, where } = await import('firebase/firestore');

      // Projects
      const pq = query(collection(db, 'projects'), where('featured', '==', true), orderBy('order', 'asc'), limit(4));
      const psnap = await getDocs(pq).catch(() => getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(4))));
      projects = psnap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, title: data.title || '', slug: data.slug || d.id, client: data.client || '', excerpt: data.excerpt || '', description: data.description || '', images: data.images || [], tags: data.tags || [], liveUrl: data.liveUrl || '', featured: data.featured || false };
      });
      projectClients = projects.map((p) => p.client).filter(Boolean);

      // Posts
      const bq = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
      const bsnap = await getDocs(bq);
      posts = bsnap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, title: data.title || '', excerpt: data.excerpt || '', slug: data.slug || d.id, tag: data.tag || 'Tech', tagColor: data.tagColor || '#3B82F6', readTime: data.readTime || '5 min', date: data.createdAt?.toDate?.()?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) || '' };
      });
    }
  } catch {}
  return { props: { projects, posts, projectClients } };
}
