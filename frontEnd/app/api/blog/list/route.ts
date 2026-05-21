import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  initPostsTable,
  getPostsByUserId,
  getPostBySlug,
  createPost,
} from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await initPostsTable();

  const blogDir = path.join(process.cwd(), "content/blog");
  if (fs.existsSync(blogDir)) {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const mdPath = path.join(blogDir, entry.name, "index.md");
      if (!fs.existsSync(mdPath)) continue;

      const existing = await getPostBySlug(entry.name);
      if (existing) continue;

      const raw = fs.readFileSync(mdPath, "utf-8");
      const { data, content } = matter(raw);
      await createPost(
        Number(session.user.id),
        entry.name,
        data.title || entry.name,
        data.excerpt || "",
        content,
        JSON.stringify(data.tags || []),
        data.coverImage || "",
      );
    }
  }

  const posts = await getPostsByUserId(Number(session.user.id));

  return NextResponse.json({ posts });
}
