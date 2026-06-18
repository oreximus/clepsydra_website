import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public/content/blog");

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug, title, excerpt, content, coverImage, author, tags } =
      await request.json();

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "slug, title, and content are required" },
        { status: 400 },
      );
    }

    const postDir = path.join(BLOG_DIR, slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    let coverFilename = "";
    if (coverImage) {
      try {
        let buffer: Buffer | null = null;

        if (coverImage.startsWith("data:")) {
          const base64 = coverImage.split(",")[1];
          buffer = Buffer.from(base64, "base64");
        } else if (coverImage.startsWith("http")) {
          const imgRes = await fetch(coverImage);
          if (imgRes.ok) {
            buffer = Buffer.from(await imgRes.arrayBuffer());
          }
        }

        if (buffer) {
          coverFilename = "cover.jpg";
          const publicPostDir = path.join(PUBLIC_DIR, slug);
          if (!fs.existsSync(publicPostDir)) {
            fs.mkdirSync(publicPostDir, { recursive: true });
          }
          fs.writeFileSync(path.join(publicPostDir, coverFilename), buffer);
        }
      } catch (err) {
        console.error("Failed to save cover image:", err);
      }
    }

    // Properly serialize tags array into YAML
    const normalizedTags: string[] = Array.isArray(tags) ? tags : [];
    const tagsYaml =
      normalizedTags.length > 0
        ? `[${normalizedTags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(", ")}]`
        : "[]";

    const frontmatter = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"`,
      `date: "${new Date().toISOString()}"`,
      `author: "${(author || "Clepsydra Technologies").replace(/"/g, '\\"')}"`,
      `tags: ${tagsYaml}`,
      ...(coverFilename ? [`coverImage: "${coverFilename}"`] : []),
      "---",
      "",
    ].join("\n");

    fs.writeFileSync(path.join(postDir, "index.md"), frontmatter + content);

    return NextResponse.json({
      message: "Article published successfully",
      slug,
      url: `/blog/${slug}`,
    });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Failed to publish article" },
      { status: 500 },
    );
  }
}
