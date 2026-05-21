import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { updateUserName, updateUserPassword } from "@/lib/db";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, currentPassword, newPassword } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  await updateUserName(Number(session.user.id), name);

  if (currentPassword && newPassword) {
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 },
      );
    }
    const hashed = await bcrypt.hash(newPassword, 12);
    await updateUserPassword(Number(session.user.id), hashed);
  }

  return NextResponse.json({ message: "Profile updated" });
}
