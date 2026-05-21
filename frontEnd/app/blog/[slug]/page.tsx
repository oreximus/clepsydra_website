import { getPostBySlug, getAllPosts } from "@/lib/blog-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import type { Metadata } from "next";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Navbar } from "@/components/navbar";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — Clepsydra Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

function readingTime(text: string): string {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / wpm));
  return `${min} min read`;
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
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
