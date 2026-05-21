import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import { initPostsTable, createPost } from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, title, excerpt, content, tags, coverImage } =
    await request.json();

  if (!slug || !title || !content) {
    return NextResponse.json(
      { error: "slug, title, and content are required" },
      { status: 400 },
    );
  }

  await initPostsTable();
  await createPost(
    Number(session.user.id),
    slug,
    title,
    excerpt || "",
    content,
    JSON.stringify(tags || []),
    coverImage || "",
  );

  return NextResponse.json({ message: "Post created", slug }, { status: 201 });
}
