import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "./blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const mdPath = path.join(BLOG_DIR, entry.name, "index.md");
      if (fs.existsSync(mdPath)) {
        const post = readPost(entry.name);
        if (post) posts.push(post);
      }
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  return readPost(slug);
}

function readPost(slug: string): BlogPost | null {
  const mdPath = path.join(BLOG_DIR, slug, "index.md");
  if (!fs.existsSync(mdPath)) return null;

  const raw = fs.readFileSync(mdPath, "utf-8");
  const { data, content } = matter(raw);

  const coverImage = data.coverImage
    ? data.coverImage.startsWith("http")
      ? data.coverImage
      : `/content/blog/${slug}/${data.coverImage}`
    : "";

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "Clepsydra Technologies",
    tags: data.tags || [],
    coverImage,
    content,
  };
}
