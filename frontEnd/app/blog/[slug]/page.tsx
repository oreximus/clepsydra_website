import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { BlogArticleContent } from "@/components/blog-article-content";
import { getAllPublishedPosts, getPublishedPostBySlug, updatePostCover } from "@/lib/db";
import { rowToBlogPost } from "@/lib/blog";
import fs from "fs";
import path from "path";

interface Props {
  params: { slug: string };
}

export const revalidate = 86400;
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

async function ArticleContent({ slug }: { slug: string }) {
  const row = await getPublishedPostBySlug(slug);
  if (!row) notFound();
  if (row.cover_image && row.cover_image.startsWith("data:image/")) {
    try {
      const publicDir = path.join(process.cwd(), "public/content/blog", slug);
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      const base64 = row.cover_image.split(",")[1];
      fs.writeFileSync(path.join(publicDir, "cover.jpg"), Buffer.from(base64, "base64"));
      row.cover_image = "cover.jpg";
      try { await updatePostCover(slug, "cover.jpg"); } catch {}
    } catch {
    }
  }
  const post = rowToBlogPost(row);
  return <BlogArticleContent post={post} />;
}

function ArticleContentFallback() {
  return (
    <>
      <div className="mb-10">
        <div className="h-12 w-full bg-surface-muted rounded animate-pulse mb-3" />
        <div className="h-12 w-3/4 bg-surface-muted rounded animate-pulse mb-6" />
        <div className="flex flex-wrap items-center gap-5 mb-6">
          <div className="h-4 w-28 bg-surface-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-surface-muted rounded animate-pulse" />
          <div className="h-4 w-36 bg-surface-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="aspect-[2/1] bg-surface-muted rounded-xl animate-pulse mb-12" />

      <div className="space-y-4">
        <div className="h-4 w-full bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-surface-muted rounded animate-pulse" />
      </div>
    </>
  );
}

export default function BlogPostPage({ params }: Props) {
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

          <Suspense fallback={<ArticleContentFallback />}>
            <ArticleContent slug={params.slug} />
          </Suspense>
        </article>
      </main>

      <ScrollToTopButton />
    </div>
  );
}
