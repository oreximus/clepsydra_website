import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import type { Metadata } from "next";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Navbar } from "@/components/navbar";
import { getAllPublishedPosts, getPublishedPostBySlug } from "@/lib/db";
import { rowToBlogPost } from "@/lib/blog";
import { ArticleJsonLd } from "@/components/json-ld";

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await getAllPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const row = await getPublishedPostBySlug(params.slug);
  if (!row) return { title: "Not Found" };
  const post = rowToBlogPost(row);

  const url = `https://clepsydratechnologies.com/blog/${post.slug}`;

  return {
    title: `${post.title} — Clepsydra Blog`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

function readingTime(text: string): string {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / wpm));
  return `${min} min read`;
}

export default async function BlogPostPage({ params }: Props) {
  const row = await getPublishedPostBySlug(params.slug);
  if (!row) notFound();
  const post = rowToBlogPost(row);

  const postUrl = `https://clepsydratechnologies.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        image={post.coverImage || undefined}
        datePublished={post.date}
        author={post.author}
      />
      <Navbar />

      <main className="pt-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-brand-navy transition-colors mb-10 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <h1 className="font-heading text-[2rem] md:text-[3rem] font-bold text-brand-navy-deep leading-[1.1] mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground font-body mb-6">
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {readingTime(post.content)}
              </span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 font-body text-xs font-medium text-brand-blue bg-[#EEF6FD] px-3 py-1.5 rounded-full"
                  >
                    <Tag className="size-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.coverImage && (
            <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-12 shadow-brand-md">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          <div className="mt-16 pt-8 border-t border-[#E5EAF4]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-blue hover:text-brand-navy transition-colors group"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to all articles
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
