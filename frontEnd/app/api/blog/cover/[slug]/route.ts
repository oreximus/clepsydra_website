import { NextResponse } from "next/server";
import { getPublishedPostBySlug } from "@/lib/db";

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

  if (
    row.cover_image.startsWith("http")
  ) {
    return NextResponse.redirect(row.cover_image);
  }

  return new Response(null, { status: 404 });
}
