import { AuthSessionProvider } from "@/components/session-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
