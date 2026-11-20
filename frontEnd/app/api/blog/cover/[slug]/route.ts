import { NextResponse } from "next/server";
import { getPublishedPostBySlug } from "@/lib/db";
import fs from "fs";
import path from "path";

const mimeByExt: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const row = await getPublishedPostBySlug(params.slug);
  if (!row || !row.cover_image) {
    return new Response(null, { status: 404 });
  }

  if (row.cover_image.startsWith("data:")) {
    const [header, base64] = row.cover_image.split(",");
    const contentType = header.replace("data:", "").replace(";base64", "");
    const buffer = Buffer.from(base64, "base64");
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  }

  if (row.cover_image.startsWith("http")) {
    return NextResponse.redirect(row.cover_image);
  }

  const safeName = path.basename(row.cover_image);
  const candidates = [
    path.join(process.cwd(), "public", "content", "blog", params.slug, safeName),
    path.join(process.cwd(), "content", "blog", params.slug, safeName),
  ];

  for (const filePath of candidates) {
    try {
      if (!fs.existsSync(filePath)) continue;
      const buffer = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeByExt[ext] || "application/octet-stream";
      return new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    } catch {
      // try next candidate
    }
  }

  return new Response(null, { status: 404 });
}
