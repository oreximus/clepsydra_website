import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import { getPostBySlug, updatePost } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, title, excerpt, content, tags, coverImage, published } =
    await request.json();

  if (!slug || !title || !content) {
    return NextResponse.json(
      { error: "slug, title, and content are required" },
      { status: 400 },
    );
  }

  const existing = await getPostBySlug(slug);
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if ((existing as any).user_id !== Number(session.user.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let coverFilename = coverImage || "";
  if (coverImage && coverImage.startsWith("data:")) {
    try {
      const publicDir = path.join(process.cwd(), "public/content/blog", slug);
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      const base64 = coverImage.split(",")[1];
      fs.writeFileSync(path.join(publicDir, "cover.jpg"), Buffer.from(base64, "base64"));
      coverFilename = "cover.jpg";
    } catch {
      coverFilename = coverImage;
    }
  }

  await updatePost(
    slug,
    title,
    excerpt || "",
    content,
    JSON.stringify(tags || []),
    coverFilename,
    published ? 1 : 0,
  );

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  try {
    const mdDir = path.join(process.cwd(), "content/blog", slug);
    if (!fs.existsSync(mdDir)) fs.mkdirSync(mdDir, { recursive: true });
    const frontmatter = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"`,
      `date: "${new Date().toISOString()}"`,
      `author: "${(session.user.name || "").replace(/"/g, '\\"')}"`,
      `tags: ${JSON.stringify(tags || [])}`,
      ...(coverFilename ? [`coverImage: "${coverFilename}"`] : []),
      "---",
      "",
    ].join("\n");
    fs.writeFileSync(path.join(mdDir, "index.md"), frontmatter + content);
  } catch {
    // filesystem write skipped (read-only on Vercel, blog reads from DB)
  }

  return NextResponse.json({ message: "Post updated", slug });
}
