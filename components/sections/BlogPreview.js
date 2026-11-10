import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import BrandImage from '../ui/BrandImage';

// Only shown when there are real articles — no sample posts.
export default function BlogPreview({ posts = [] }) {
  const display = posts.slice(0, 3);
  if (!display.length) return null;
  return (
    <section className="py-24 px-6 relative z-10" style={{ background: '#000129' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div className="reveal">
            <div className="section-label mb-4">From the blog</div>
            <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: '#F3F4FA', letterSpacing: '-0.02em' }}>Latest articles</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 font-semibold reveal" style={{ color: '#FF5A63', fontSize: '1.1rem' }}>All articles <ArrowRight size={18} /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {display.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className={`card block overflow-hidden reveal delay-${i + 1}`}>
              <BrandImage src={post.coverImage} alt={post.coverAlt || post.title} width={1200} height={630} rounded={0} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3" style={{ color: '#8D93B5', fontSize: '0.98rem' }}>
                  <span className="font-semibold" style={{ color: '#FF5A63' }}>{post.tag}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA', fontSize: '1.25rem' }}>{post.title}</h3>
                <p style={{ color: '#C3C7DB', fontSize: '1.05rem' }}>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
