import type React from "react";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalFooter } from "@/components/conditional-footer";
import { AuthSessionProvider } from "@/components/session-provider";
import { OrganizationJsonLd } from "@/components/json-ld";
import { NavigationProgress } from "@/components/navigation-progress";

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

const baseUrl = "https://clepsydratechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Clepsydra Technologies — Software Services & ORVOPS ERP Suite",
    template: "%s — Clepsydra Technologies",
  },
  description:
    "Clepsydra Technologies builds custom software for web, mobile, and AI automation — and owns ORVOPS, our ERP & management software suite for hospitals, mess kitchens, hotels, and inventory teams.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-icon-transparent.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Clepsydra Technologies — Timeless Precision, Modern Solutions",
    description:
      "Clepsydra Technologies delivers timeless precision through modern software solutions for web, mobile, AI automation, data analytics, and more.",
    url: baseUrl,
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clepsydra Technologies — Timeless Precision, Modern Solutions",
    description:
      "Clepsydra Technologies delivers timeless precision through modern software solutions for web, mobile, AI automation, data analytics, and more.",
  },
  other: {
    "google-site-verification": "google768f7fabe972629d",
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
        <NavigationProgress />
        <OrganizationJsonLd />
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
