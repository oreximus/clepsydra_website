export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  coverImage: string;
  content: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export interface DbPostRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  cover_image: string;
  created_at: string;
  author_name: string;
}

export function rowToBlogPost(row: DbPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    date: row.created_at,
    author: row.author_name || "Clepsydra Technologies",
    tags: parseTags(row.tags),
    coverImage: row.cover_image?.startsWith("data:")
      ? `/api/blog/cover/${row.slug}`
      : row.cover_image?.startsWith("http")
        ? row.cover_image
        : row.cover_image
          ? `/content/blog/${row.slug}/${row.cover_image}`
          : "",
    content: row.content,
  };
}
