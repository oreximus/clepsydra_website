import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  await deletePost(slug, Number(session.user.id));

  const mdDir = path.join(process.cwd(), "content/blog", slug);
  const publicDir = path.join(process.cwd(), "public/content/blog", slug);
  if (fs.existsSync(mdDir)) fs.rmSync(mdDir, { recursive: true, force: true });
  if (fs.existsSync(publicDir))
    fs.rmSync(publicDir, { recursive: true, force: true });

  return NextResponse.json({ message: "Post deleted" });
}
