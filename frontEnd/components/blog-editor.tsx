"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bold,
  Italic,
  Heading2,
  List,
  Link,
  Code,
  Image,
  Video,
  Quote,
  SeparatorHorizontal,
  Eye,
  Edit3,
  Loader2,
  Globe,
  FileEdit,
} from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface Props {
  initialTitle?: string;
  initialContent?: string;
  initialExcerpt?: string;
  initialTags?: string[];
  initialCoverImage?: string;
  initialPublished?: boolean;
  onSave: (data: {
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    coverImage: string;
    published: boolean;
  }) => Promise<void>;
  saving?: boolean;
}

export function BlogEditor({
  initialTitle = "",
  initialContent = "",
  initialExcerpt = "",
  initialTags = [],
  initialCoverImage = "",
  initialPublished = false,
  onSave,
  saving = false,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [tagsStr, setTagsStr] = useState(initialTags.join(", "));
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [preview, setPreview] = useState(false);
  const [published, setPublished] = useState(initialPublished);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insert = useCallback((before: string, after = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${before}${selected}${after}`;
    setContent(
      content.substring(0, start) + replacement + content.substring(end),
    );
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + before.length + selected.length + after.length;
    }, 0);
  }, [content]);

  const toolbar = [
    {
      icon: Bold,
      action: () => insert("**", "**"),
      label: "Bold",
    },
    {
      icon: Italic,
      action: () => insert("*", "*"),
      label: "Italic",
    },
    {
      icon: Heading2,
      action: () => insert("## ", ""),
      label: "Heading",
    },
    {
      icon: List,
      action: () => insert("- ", ""),
      label: "List",
    },
    {
      icon: Link,
      action: () => insert("[", "](url)"),
      label: "Link",
    },
    {
      icon: Code,
      action: () => insert("```\n", "\n```"),
      label: "Code",
    },
    {
      icon: Image,
      action: () => insert("![](", ")"),
      label: "Image",
    },
    {
      icon: Video,
      action: () => {
        const url = prompt("Video URL (YouTube embed):");
        if (url) setContent((c) => `${c}\n<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>\n`);
      },
      label: "Video",
    },
    {
      icon: Quote,
      action: () => insert("> ", ""),
      label: "Quote",
    },
    {
      icon: SeparatorHorizontal,
      action: () => insert("\n---\n", ""),
      label: "Separator",
    },
  ];

  async function handleSave(publish: boolean) {
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setPublished(publish);
    await onSave({ title, content, excerpt, tags, coverImage, published: publish });
  }

  function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="font-heading text-xl font-bold border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
      />

      <div className="flex items-center gap-3">
        <Button
          variant={preview ? "outline" : "default"}
          size="sm"
          onClick={() => setPreview(false)}
          className="rounded-button"
        >
          <Edit3 className="size-3.5 mr-1.5" />
          Edit
        </Button>
        <Button
          variant={preview ? "default" : "outline"}
          size="sm"
          onClick={() => setPreview(true)}
          className="rounded-button"
        >
          <Eye className="size-3.5 mr-1.5" />
          Preview
        </Button>
      </div>

      {preview ? (
        <div className="min-h-[400px] border border-[#E5EAF4] rounded-card p-6 bg-white">
          <MarkdownRenderer content={content} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-1 p-1.5 border border-[#E5EAF4] rounded-t-card bg-[#F7F9FC]">
            {toolbar.map((t) => (
              <button
                key={t.label}
                onClick={t.action}
                title={t.label}
                className="p-1.5 rounded hover:bg-white hover:shadow-brand-sm transition-all text-[#374151] hover:text-brand-navy"
              >
                <t.icon className="size-4" />
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article in markdown..."
            className="w-full min-h-[400px] p-4 font-body text-sm leading-relaxed border-x border-b border-[#E5EAF4] rounded-b-card outline-none resize-y focus:border-brand-blue/30 transition-colors"
          />
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm font-medium text-brand-navy-deep block mb-1.5">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary for the blog listing..."
            rows={3}
            className="w-full p-3 font-body text-sm border border-[#E5EAF4] rounded-card outline-none resize-none focus:border-brand-blue/30 transition-colors"
          />
        </div>
        <div>
          <label className="font-body text-sm font-medium text-brand-navy-deep block mb-1.5">
            Tags (comma separated)
          </label>
          <Input
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="e.g. Next.js, React, TypeScript"
          />

          <label className="font-body text-sm font-medium text-brand-navy-deep block mt-4 mb-1.5">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="font-body text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-button file:border-0 file:text-sm file:font-heading file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-colors"
          />
          {coverImage && (
            <div className="mt-2 relative aspect-video rounded-card overflow-hidden border border-[#E5EAF4] max-w-xs">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#E5EAF4]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 font-body text-xs font-medium px-2.5 py-1 rounded-full ${
              published
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
            }`}
          >
            {published ? (
              <Globe className="size-3" />
            ) : (
              <FileEdit className="size-3" />
            )}
            {published ? "Published" : "Draft"}
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => handleSave(false)}
            disabled={saving || !title.trim() || !content.trim()}
            variant="outline"
            className="rounded-button font-heading font-semibold"
          >
            {saving && <Loader2 className="size-4 animate-spin mr-2" />}
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={saving || !title.trim() || !content.trim()}
            className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110"
          >
            {saving && <Loader2 className="size-4 animate-spin mr-2" />}
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
