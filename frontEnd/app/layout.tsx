import type React from "react";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalFooter } from "@/components/conditional-footer";
import { AuthSessionProvider } from "@/components/session-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Clepsydra Technologies — Timeless Precision, Modern Solutions",
  description:
    "Clepsydra Technologies delivers timeless precision through modern software solutions.",
  icons: {
    icon: [
      { url: "/images/logo-icon-transparent.png", sizes: "any" },
    ],
    apple: [
      { url: "/images/logo-icon-transparent.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
          <ConditionalFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
