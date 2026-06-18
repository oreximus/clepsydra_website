"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Clock, ArrowRight, Loader2 } from "lucide-react";

interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  coverImage: string;
  content: string;
}

function readingTime(text: string): string {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / wpm));
  return `${min} min read`;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function BlogCardGrid({ posts }: { posts: PostData[] }) {
  const router = useRouter();
  const featured = posts[0];
  const rest = posts.slice(1);
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);

  useEffect(() => {
    const slugs = posts.map((p) => p.slug);
    const idle = requestIdleCallback || ((cb: any) => setTimeout(cb, 200));
    idle(() => {
      slugs.forEach((slug) => {
        router.prefetch(`/blog/${slug}`);
      });
    });
  }, [posts, router]);

  const handleNavigate = useCallback(
    (slug: string) => (e: React.MouseEvent) => {
      if (e.ctrlKey || e.metaKey || e.button !== 0) return;
      e.preventDefault();
      setNavigatingSlug(slug);
      setTimeout(() => {
        router.push(`/blog/${slug}`);
      }, 80);
    },
    [router],
  );

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-muted-foreground text-lg">
          No articles yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {featured && (
        <motion.div variants={featuredVariants}>
          <a
            href={`/blog/${featured.slug}`}
            onClick={handleNavigate(featured.slug)}
            className="group block mb-12 active:scale-[0.98] transition-transform duration-75 relative"
          >
            <article className="grid md:grid-cols-5 gap-8 bg-surface-off rounded-2xl overflow-hidden border border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md transition-all duration-200">
              {featured.coverImage && (
                <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              )}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <span className="font-body text-xs font-semibold text-brand-blue uppercase tracking-wider mb-3">
                  Featured Article
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy-deep mb-3 group-hover:text-brand-blue transition-colors leading-[1.15]">
                  {featured.title}
                </h2>
                <p className="font-body text-[#374151] leading-relaxed mb-4 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {readingTime(featured.content)}
                  </span>
                  <span>·</span>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>
            {navigatingSlug === featured.slug && (
              <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="size-8 text-brand-blue animate-spin" />
                  <span className="font-body text-xs text-muted-foreground">Opening...</span>
                </div>
              </div>
            )}
          </a>
        </motion.div>
      )}

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
        variants={containerVariants}
      >
        {rest.map((post) => (
          <motion.div key={post.slug} variants={cardVariants} className="relative">
            <a
              href={`/blog/${post.slug}`}
              onClick={handleNavigate(post.slug)}
              className="group block active:scale-[0.97] transition-transform duration-75"
            >
              <article className="border border-[#E5EAF4] rounded-xl overflow-hidden shadow-brand-sm hover:shadow-brand-md hover:-translate-y-1 transition-all duration-200 bg-white h-full flex flex-col">
                {post.coverImage && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-off">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-body text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" />
                      {readingTime(post.content)}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg font-bold text-brand-navy-deep mb-2 group-hover:text-brand-blue transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-[#374151] leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E5EAF4] flex items-center justify-between">
                    <span className="font-body text-xs text-muted-foreground">
                      {post.author}
                    </span>
                    <span className="font-body text-xs font-medium text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Read more
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </article>
            </a>
            {navigatingSlug === post.slug && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="size-8 text-brand-blue animate-spin" />
                  <span className="font-body text-xs text-muted-foreground">Opening...</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
