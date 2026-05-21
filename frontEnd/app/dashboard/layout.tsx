import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardAuthGuard } from "@/components/dashboard/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <div className="flex min-h-screen bg-surface-off">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </DashboardAuthGuard>
  );
}
