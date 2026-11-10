import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import TechPill from '../../components/ui/TechPill';
import { absUrl } from '../../lib/media';
import { SITE } from '../../lib/seo';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO } from '../../lib/seo';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { useState } from 'react';

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPost({ post }) {
  const [copied, setCopied] = useState(false);
  useScrollReveal();

  if (!post) return (
    <div style={{ background: '#000129', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <p className="text-xl mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>Post not found</p>
        <Link href="/blog" style={{ color: '#DB333D' }}>← Back to Blog</Link>
      </div>
    </div>
  );

  const seo = pageSEO({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    extraKeywords: [...(post.tags || []), 'web development tips', 'stackaura digital blog'].filter(Boolean),
    ogImage: post.coverImage ? absUrl(post.coverImage) : undefined,
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE.url}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    ...(post.createdAt && { datePublished: post.createdAt }),
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    keywords: (post.tags || []).join(', '),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` } },
    ...(post.coverImage && { image: { '@type': 'ImageObject', contentUrl: absUrl(post.coverImage), url: absUrl(post.coverImage), caption: post.coverAlt || post.title, name: post.title } }),
  };

  const copy = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <>
      <SEOHead {...seo} structuredData={structuredData} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-8"
            style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
            <ArrowLeft size={15} /> All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            {(post.tags || []).map((t) => <TechPill key={t} name={t} plain />)}
            <span className="flex items-center gap-1 text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              <Calendar size={11} /> {formatDate(post.createdAt)}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1 text-xs" style={{ color: '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                <Clock size={11} /> {post.readTime}
              </span>
            )}
            <button onClick={copy} className="ml-auto flex items-center gap-1 text-xs"
              style={{ color: copied ? '#DB333D' : '#8D93B5', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              <Share2 size={11} /> {copied ? 'Copied!' : 'Share'}
            </button>
          </div>

          <h1 className="font-bold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#F3F4FA', lineHeight: 1.2 }}>
            {post.title}
          </h1>
          {post.excerpt && <p className="text-lg mb-6" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', lineHeight: 1.7 }}>{post.excerpt}</p>}

          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg,#3B82F6,transparent)' }} />

          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden mb-10" style={{ border: '1px solid #DDE1EA' }}>
              <img src={post.coverImage} alt={post.coverAlt || post.title} width={1200} height={630} fetchPriority="high" className="w-full object-cover" style={{ maxHeight: '400px' }} />
            </div>
          )}

          <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon.</p>' }} />

          <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #DDE1EA' }}>
            <Link href="/blog" className="btn-ghost text-sm px-4 py-2"><ArrowLeft size={14} /> All Articles</Link>
            <Link href="/contact" className="btn-primary text-sm px-4 py-2">Work With Us</Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { db } = await import('../../lib/firebase');
    if (!db) return { props: { post: null } };
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const snap = await getDocs(query(collection(db, 'posts'), where('slug', '==', params.slug)));
    if (snap.empty) return { props: { post: null } };
    const d = snap.docs[0]; const data = d.data();
    return { props: { post: { id: d.id, title: data.title || '', excerpt: data.excerpt || '', content: data.content || '', slug: data.slug || params.slug, tag: data.tag || '', tags: data.tags?.length ? data.tags : (data.tag ? [data.tag] : []), tagColor: data.tagColor || '#DB333D', coverAlt: data.coverAlt || '', updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null, readTime: data.readTime || '', coverImage: data.coverImage || null, createdAt: data.createdAt?.toDate?.()?.toISOString() || null } } };
  } catch { return { props: { post: null } }; }
}
