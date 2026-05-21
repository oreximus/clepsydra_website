import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Clock, ArrowRight } from "lucide-react";
import { getAllPublishedPosts } from "@/lib/db";
import { rowToBlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Clepsydra Technologies",
  description:
    "Insights, tutorials, and stories from Clepsydra Technologies on software development, technology trends, and digital product building.",
};

export const dynamic = "force-dynamic";

function readingTime(text: string): string {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / wpm));
  return `${min} min read`;
}

export default async function BlogPage() {
  const rows = await getAllPublishedPosts();
  const posts = rows.map(rowToBlogPost);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label justify-center">Our Blog</div>
            <h1 className="font-heading text-[2.5rem] md:text-[3.5rem] font-bold text-brand-navy-deep mt-4 mb-4 leading-[1.1]">
              Insights & Stories
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-[600px] mx-auto">
              Thoughts on software development, technology trends, and lessons
              from building digital products.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground text-lg">
                No articles yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block mb-12"
                >
                  <article className="grid md:grid-cols-5 gap-8 bg-surface-off rounded-2xl overflow-hidden border border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md transition-all duration-200">
                    {featured.coverImage && (
                      <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden">
                        <Image
                          src={featured.coverImage}
                          alt={featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                </Link>
              )}

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="border border-[#E5EAF4] rounded-xl overflow-hidden shadow-brand-sm hover:shadow-brand-md hover:-translate-y-1 transition-all duration-200 bg-white h-full flex flex-col">
                      {post.coverImage && (
                        <div className="relative aspect-[16/10] overflow-hidden bg-surface-off">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
