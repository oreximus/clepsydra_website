"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlogEditor } from "@/components/blog-editor";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { slugify } from "@/lib/blog";
import {
  Sparkles,
  Loader2,
  ImageIcon,
  ArrowLeft,
  PenLine,
  Check,
} from "lucide-react";
import Link from "next/link";

function NewPostInner() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "write";

  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<{
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
  } | null>(null);
  const [coverImage, setCoverImage] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function generateArticle() {
    if (!topic.trim()) return;
    setGenerating(true);
    setError("");
    setArticle(null);
    setCoverImage("");
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setArticle(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function generateCover() {
    if (!article) return;
    setGeneratingImage(true);
    try {
      const res = await fetch("/api/blog/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: article.title,
          excerpt: article.excerpt,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setCoverImage(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGeneratingImage(false);
    }
  }

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
      const slug = slugify(data.title);
      const effectiveCover = data.coverImage || coverImage;

      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          tags: data.tags,
          coverImage: effectiveCover,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      await fetch("/api/blog/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          tags: data.tags,
          published: data.published ? 1 : 0,
        }),
      });

      setSaved(true);
      setTimeout(() => router.push(`/dashboard`), 1500);
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
              Post Published!
            </h2>
            <p className="font-body text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "generate" && !article) {
    return (
      <div className="p-8 max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-brand-navy mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-navy-deep mb-6">
          Generate Article with AI
        </h1>

        <Card className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                placeholder="Enter a blog topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateArticle()}
                className="flex-1 font-body"
              />
              <Button
                onClick={generateArticle}
                disabled={generating || !topic.trim()}
                className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110"
              >
                {generating ? (
                  <Loader2 className="size-4 animate-spin mr-2" />
                ) : (
                  <Sparkles className="size-4 mr-2" />
                )}
                Generate
              </Button>
            </div>
            {error && (
              <p className="font-body text-sm text-red-500 mt-3">{error}</p>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="font-body text-sm text-muted-foreground mb-3">
            Or write it manually
          </p>
          <Link href="/dashboard/blog/new?mode=write">
            <Button
              variant="outline"
              className="rounded-button font-heading font-semibold"
            >
              <PenLine className="size-4 mr-2" />
              Write Manually
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (mode === "generate" && article) {
    return (
      <div className="p-8 max-w-4xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-brand-navy mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold text-brand-navy-deep">
            Review Generated Article
          </h1>
          {!coverImage && (
            <Button
              onClick={generateCover}
              disabled={generatingImage}
              variant="outline"
              className="rounded-button font-heading font-semibold"
            >
              {generatingImage ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <ImageIcon className="size-4 mr-2" />
              )}
              Generate Cover
            </Button>
          )}
        </div>

        {coverImage && (
          <div className="relative aspect-video rounded-card overflow-hidden mb-6 max-w-2xl shadow-brand-sm">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-card">
          <p className="font-body text-sm text-amber-800">
            You can edit the generated content below before publishing.
          </p>
        </div>

        <BlogEditor
          initialTitle={article.title}
          initialContent={article.content}
          initialExcerpt={article.excerpt}
          initialTags={article.tags}
          initialCoverImage={coverImage}
          onSave={handleSave}
          saving={saving}
        />
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
        Write New Post
      </h1>

      <div className="mb-6">
        <Link href="/dashboard/blog/new?mode=generate">
          <Button
            variant="outline"
            className="rounded-button font-heading font-semibold"
          >
            <Sparkles className="size-4 mr-2" />
            Or generate with AI
          </Button>
        </Link>
      </div>

      <BlogEditor onSave={handleSave} saving={saving} />
      {error && (
        <p className="font-body text-sm text-red-500 mt-3">{error}</p>
      )}
    </div>
  );
}

export default function NewPostPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="size-6 animate-spin text-brand-blue" />
        </div>
      }
    >
      <NewPostInner />
    </Suspense>
  );
}
