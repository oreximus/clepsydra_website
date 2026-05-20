"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, ImageIcon, Send, Check } from "lucide-react";
import { slugify } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export default function AdminBlogPage() {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [article, setArticle] = useState<{
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
  } | null>(null);
  const [coverImage, setCoverImage] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [error, setError] = useState("");

  async function generateArticle() {
    if (!topic.trim()) return;
    setGenerating(true);
    setError("");
    setArticle(null);
    setCoverImage("");
    setPublishedUrl("");

    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setArticle(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function generateCoverImage() {
    if (!article) return;
    setGeneratingImage(true);
    setError("");

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
      if (!res.ok) throw new Error(data.error || "Failed to generate image");
      setCoverImage(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGeneratingImage(false);
    }
  }

  async function publishArticle() {
    if (!article) return;
    setPublishing(true);
    setError("");

    try {
      const slug = slugify(article.title);
      const res = await fetch("/api/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          coverImage,
          author: "Clepsydra Technologies",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to publish");
      setPublishedUrl(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-off">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="section-label">Admin</div>
          <h1 className="font-heading text-[2rem] font-bold text-brand-navy-deep mt-2">
            Blog Article Generator
          </h1>
          <p className="font-body text-muted-foreground mt-2">
            Enter a topic to generate, preview, and publish a blog article.
          </p>
        </div>

        <Card className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white mb-8">
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
                className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 transition-all"
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

        {article && (
          <>
            <Card className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-xl font-semibold text-brand-navy-deep">
                    {article.title}
                  </h2>
                  <div className="flex gap-2">
                    {!coverImage && (
                      <Button
                        onClick={generateCoverImage}
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
                    <Button
                      onClick={publishArticle}
                      disabled={publishing}
                      className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 transition-all"
                    >
                      {publishing ? (
                        <Loader2 className="size-4 animate-spin mr-2" />
                      ) : (
                        <Send className="size-4 mr-2" />
                      )}
                      Publish
                    </Button>
                  </div>
                </div>

                {coverImage && (
                  <div className="relative aspect-video rounded-card overflow-hidden mb-6 max-w-2xl shadow-brand-sm">
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-body text-xs text-muted-foreground">
                    {article.excerpt}
                  </span>
                </div>

                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs font-medium text-brand-blue bg-[#EEF6FD] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border border-[#E5EAF4] rounded-card p-6 max-h-[600px] overflow-y-auto">
                  <MarkdownRenderer content={article.content} />
                </div>
              </CardContent>
            </Card>

            {publishedUrl && (
              <Card className="border-green-200 shadow-brand-sm rounded-card bg-green-50 mb-8">
                <CardContent className="p-6 flex items-center gap-3">
                  <Check className="size-5 text-green-600" />
                  <span className="font-body text-green-800">
                    Article published successfully!{" "}
                    <a
                      href={publishedUrl}
                      className="text-brand-blue font-medium hover:underline"
                    >
                      View article →
                    </a>
                  </span>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
