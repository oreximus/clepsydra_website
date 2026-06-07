import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/session-provider";
import { DashboardAuthGuard } from "@/components/dashboard/auth-guard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <DashboardAuthGuard>{children}</DashboardAuthGuard>
    </AuthSessionProvider>
  );
}
