import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { BlogCardGrid } from "@/components/blog-card-grid";
import { getAllPublishedPosts } from "@/lib/db";
import { rowToBlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Clepsydra Technologies",
  description:
    "Insights, tutorials, and stories from Clepsydra Technologies on software development, technology trends, and digital product building.",
  openGraph: {
    title: "Blog — Clepsydra Technologies",
    description:
      "Insights, tutorials, and stories from Clepsydra Technologies on software development, technology trends, and digital product building.",
    url: "https://clepsydratechnologies.com/blog",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://clepsydratechnologies.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Clepsydra Technologies",
    description:
      "Insights, tutorials, and stories from Clepsydra Technologies on software development, technology trends, and digital product building.",
  },
};

export const dynamic = "force-dynamic";

async function PostList() {
  const rows = await getAllPublishedPosts();
  const posts = rows.map(rowToBlogPost);
  return <BlogCardGrid posts={posts} />;
}

export default function BlogPage() {
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

          <Suspense fallback={null}>
            <PostList />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
