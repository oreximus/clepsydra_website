"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogEditor } from "@/components/blog-editor";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { parseTags } from "@/lib/blog";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/blog/list")
      .then((r) => r.json())
      .then((data) => {
        const found = (data.posts || []).find(
          (p: any) => p.slug === params.slug,
        );
        if (found) setPost(found);
        else setError("Post not found");
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [status, params.slug]);

  async function handleSave(data: {
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    coverImage: string;
    published: boolean;
  }) {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/blog/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: params.slug,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          tags: data.tags,
          coverImage: data.coverImage,
          published: data.published ? 1 : 0,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }
      setSaved(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (saved) {
    return (
      <div className="p-8 max-w-3xl">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <Check className="size-10 text-green-500 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-bold text-brand-navy-deep mb-2">
              Post Updated!
            </h2>
            <p className="font-body text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-8">
        <p className="font-body text-red-500">{error || "Post not found"}</p>
        <Link
          href="/dashboard"
          className="font-body text-brand-blue hover:underline mt-2 inline-block"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-brand-navy mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      <h1 className="font-heading text-2xl font-bold text-brand-navy-deep mb-6">
        Edit Post
      </h1>

      <BlogEditor
        initialTitle={post.title}
        initialContent={post.content}
        initialExcerpt={post.excerpt}
        initialPublished={post.published === 1}
        initialTags={parseTags(post.tags)}
        initialCoverImage={
          post.cover_image
            ? post.cover_image.startsWith("http") ||
              post.cover_image.startsWith("data:")
              ? post.cover_image
              : `/content/blog/${post.slug}/${post.cover_image}`
            : ""
        }
        onSave={handleSave}
        saving={saving}
      />
      {error && (
        <p className="font-body text-sm text-red-500 mt-3">{error}</p>
      )}
    </div>
  );
}
