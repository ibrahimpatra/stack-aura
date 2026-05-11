import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

export default function BlogPreview({ posts = [] }) {
  const mock = [
    { id: '1', title: 'Why Next.js is the Best Choice for Business Websites in 2025', excerpt: 'SSR, SEO, speed — Next.js ticks every box for professional web development.', slug: 'why-nextjs-best-2025', date: 'May 2025', readTime: '5 min', tag: 'Web Dev', tagColor: '#DB333D' },
    { id: '2', title: "How We Got a Kuwait Business on Google's First Page in 3 Weeks", excerpt: 'A real case study on technical SEO, structured data, and the steps that got results fast.', slug: 'kuwait-seo-case-study', date: 'April 2025', readTime: '7 min', tag: 'SEO', tagColor: '#000129' },
    { id: '3', title: 'Firebase vs Supabase: Which Backend for Your Next Project?', excerpt: "We've used both extensively. Here's an honest breakdown for 2025.", slug: 'firebase-vs-supabase', date: 'March 2025', readTime: '6 min', tag: 'Backend', tagColor: '#DB333D' },
  ];
  const display = posts.length > 0 ? posts.slice(0, 3) : mock;

  return (
    <section className="py-24 px-6" style={{ background: '#F0EFF2' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div className="reveal">
            <div className="section-label mb-4" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// blog</span>
            </div>
            <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#000129' }}>Latest Articles</h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-1.5 text-sm reveal" style={{ color: '#DB333D', fontFamily: 'DM Sans,sans-serif' }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.id}
              className={`card p-6 block reveal delay-${i + 1}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2 py-1 rounded-md font-medium"
                  style={{ background: `${post.tagColor}10`, color: post.tagColor, fontFamily: 'DM Sans,sans-serif', border: `1px solid ${post.tagColor}20` }}>
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: '#9CA3AF', fontFamily: 'DM Sans,sans-serif' }}>
                  <Clock size={11} /> {post.readTime}
                </span>
              </div>
              <h3 className="font-bold mb-2 leading-snug text-base" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>{post.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>{post.excerpt}</p>
              <span className="flex items-center gap-1 text-xs" style={{ color: '#9CA3AF', fontFamily: 'DM Sans,sans-serif' }}>
                <Calendar size={11} /> {post.date}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
