"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: string;
  cover_image: string;
  published: number;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/blog/list")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .finally(() => setLoading(false));
  }, [status]);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this post permanently?")) return;
    setDeleting(slug);
    await fetch("/api/blog/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    setPosts((p) => p.filter((post) => post.slug !== slug));
    setDeleting(null);
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-navy-deep">
            My Posts
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {posts.length} {posts.length === 1 ? "post" : "posts"} total
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/blog/new?mode=generate">
            <Button className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110">
              <Sparkles className="size-4 mr-2" />
              AI Generate
            </Button>
          </Link>
          <Link href="/dashboard/blog/new?mode=write">
            <Button
              variant="outline"
              className="rounded-button font-heading font-semibold"
            >
              <PlusCircle className="size-4 mr-2" />
              Write Manually
            </Button>
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <Card className="border-dashed border-2 border-[#E5EAF4] shadow-none">
          <CardContent className="p-12 text-center">
            <FileText className="size-10 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-semibold text-brand-navy-deep mb-2">
              No posts yet
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Create your first blog post using AI or write it manually.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/blog/new?mode=generate">
                <Button className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110">
                  <Sparkles className="size-4 mr-2" />
                  Generate with AI
                </Button>
              </Link>
              <Link href="/dashboard/blog/new?mode=write">
                <Button
                  variant="outline"
                  className="rounded-button font-heading font-semibold"
                >
                  <PlusCircle className="size-4 mr-2" />
                  Write Manually
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          post.published
                            ? "bg-green-500"
                            : "bg-yellow-400"
                        }`}
                      />
                      <span className="font-body text-xs text-muted-foreground">
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="font-body text-xs text-muted-foreground">
                        {new Date(post.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <h2 className="font-heading text-lg font-semibold text-brand-navy-deep hover:text-brand-blue transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags !== "[]" && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {JSON.parse(post.tags).map(
                          (tag: string) =>
                            tag && (
                              <span
                                key={tag}
                                className="font-body text-[10px] font-medium text-brand-blue bg-[#EEF6FD] px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ),
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/dashboard/blog/edit/${post.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-button"
                      >
                        <Edit3 className="size-4" />
                      </Button>
                    </Link>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-button"
                      >
                        <ExternalLink className="size-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-button text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                    >
                      {deleting === post.slug ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
