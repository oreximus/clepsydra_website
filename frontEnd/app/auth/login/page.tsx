"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "CredentialsSignin") {
      setError("Invalid email or password");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl") || "/dashboard";

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
  }

  return (
    <div className="min-h-screen bg-surface-off flex items-center justify-center px-6">
      <Card className="w-full max-w-md border-[#E5EAF4] shadow-brand-md rounded-card bg-white">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-brand-navy-deep mb-2">
              Welcome Back
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Sign in to manage your blog
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-brand-navy-deep block mb-1.5">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-body"
              />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-brand-navy-deep block mb-1.5">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="font-body"
              />
            </div>

            {error && (
              <p className="font-body text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 transition-all"
            >
              {loading && <Loader2 className="size-4 animate-spin mr-2" />}
              Sign In
            </Button>
          </form>

          <p className="font-body text-sm text-muted-foreground text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-brand-blue font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
