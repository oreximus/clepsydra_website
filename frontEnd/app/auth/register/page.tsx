"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-surface-off flex items-center justify-center px-6">
        <Card className="w-full max-w-md border-[#E5EAF4] shadow-brand-md rounded-card bg-white">
          <CardContent className="p-8 text-center">
            <CheckCircle className="size-12 text-green-500 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-bold text-brand-navy-deep mb-2">
              Account Created!
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Redirecting you to login...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-off flex items-center justify-center px-6">
      <Card className="w-full max-w-md border-[#E5EAF4] shadow-brand-md rounded-card bg-white">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-brand-navy-deep mb-2">
              Create Account
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Register to start writing blog articles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-brand-navy-deep block mb-1.5">
                Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-body"
              />
            </div>
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
                minLength={6}
                className="font-body"
              />
              <p className="font-body text-xs text-muted-foreground mt-1">
                At least 6 characters
              </p>
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
              Create Account
            </Button>
          </form>

          <p className="font-body text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-brand-blue font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
