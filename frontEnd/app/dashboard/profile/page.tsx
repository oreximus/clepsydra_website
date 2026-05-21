"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Check, User, Lock } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      update({ name });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-brand-navy-deep mb-8">
        Profile Settings
      </h1>

      <Card className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="size-5 text-brand-blue" />
            <h2 className="font-heading text-lg font-semibold text-brand-navy-deep">
              Account Info
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Logged in as <strong>{session?.user?.email}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-brand-navy-deep block mb-1.5">
                Display Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-body max-w-sm"
              />
            </div>

            <div className="pt-4 border-t border-[#E5EAF4]">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="size-5 text-brand-blue" />
                <h2 className="font-heading text-lg font-semibold text-brand-navy-deep">
                  Change Password
                </h2>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Leave blank to keep current password.
              </p>
              <div className="space-y-3 max-w-sm">
                <Input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="font-body"
                />
                <Input
                  type="password"
                  placeholder="New password (min 6 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="font-body"
                />
              </div>
            </div>

            {error && (
              <p className="font-body text-sm text-red-500">{error}</p>
            )}
            {success && (
              <p className="font-body text-sm text-green-600 flex items-center gap-1.5">
                <Check className="size-4" />
                Profile updated successfully
              </p>
            )}

            <Button
              type="submit"
              disabled={saving}
              className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110"
            >
              {saving && <Loader2 className="size-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
