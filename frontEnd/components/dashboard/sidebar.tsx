"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  LogOut,
  Newspaper,
  ExternalLink,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "My Posts", icon: LayoutDashboard },
  { href: "/dashboard/blog/new", label: "New Post", icon: PlusCircle },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E5EAF4] min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#E5EAF4]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Newspaper className="size-5 text-brand-blue" />
          <span className="font-heading font-bold text-brand-navy-deep text-lg">
            Dashboard
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-button font-body text-sm transition-colors ${
                isActive
                  ? "bg-brand-blue/10 text-brand-blue font-medium"
                  : "text-[#374151] hover:bg-[#F7F9FC]"
              }`}
            >
              <Icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E5EAF4] space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-button font-body text-sm text-[#374151] hover:bg-[#F7F9FC] transition-colors"
        >
          <Home className="size-4" />
          Back to Main Site
          <ExternalLink className="size-3 ml-auto text-muted-foreground" />
        </Link>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="outline"
          className="w-full rounded-button font-body text-sm justify-start"
        >
          <LogOut className="size-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
