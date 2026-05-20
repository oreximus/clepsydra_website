import { getAllPosts } from "@/lib/blog-server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Clepsydra Technologies",
  description: "Insights, tutorials, and stories from Clepsydra Technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="section-label justify-center">Our Blog</div>
          <h1 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
            Insights & Stories
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-[600px] mx-auto">
            Thoughts on software development, technology trends, and lessons from building digital products.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground text-lg">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="border border-[#E5EAF4] rounded-card overflow-hidden shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 bg-white h-full flex flex-col">
                  {post.coverImage && (
                    <div className="relative aspect-video overflow-hidden bg-surface-off">
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
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {post.tags.length > 0 && (
                        <>
                          <span className="text-muted-foreground">·</span>
                          <span className="font-body text-xs font-medium text-brand-blue">
                            {post.tags[0]}
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-brand-navy-deep mb-2 group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#E5EAF4]">
                      <span className="font-body text-xs text-muted-foreground">
                        By {post.author}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
