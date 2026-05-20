import { getPostBySlug, getAllPosts } from "@/lib/blog-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { MarkdownRenderer } from "@/components/markdown-renderer";

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

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-brand-navy transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {post.coverImage && (
          <div className="relative aspect-video rounded-card overflow-hidden mb-10 shadow-brand-md">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <span className="font-body text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="font-body text-sm text-muted-foreground">
            By {post.author}
          </span>
        </div>

        <h1 className="font-heading text-[2.2rem] md:text-[3rem] font-bold text-brand-navy-deep leading-[1.15] mb-6">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs font-medium text-brand-blue bg-[#EEF6FD] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose-custom">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
}
