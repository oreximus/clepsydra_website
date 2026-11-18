import type { Metadata } from "next";
import LandingPageClient from "@/components/landing-page-client";

export const metadata: Metadata = {
  title: "Clepsydra Technologies — Software Services & ERP Management Software",
  description:
    "Clepsydra Technologies is a software services and custom software company. We build tailored products and platforms — including ORVOPS, our own ERP & management software suite for hospitals, mess kitchens, hotels and inventory teams.",
  openGraph: {
    title: "Clepsydra Technologies — Software Services & ERP Management Software",
    description:
      "Custom software services and products by Clepsydra Technologies, including ORVOPS — our own ERP & management software suite for hospitals, mess kitchens, hotels and inventory.",
    url: "https://clepsydratechnologies.com",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clepsydra Technologies — Software Services & ERP Management Software",
    description:
      "Custom software services and products by Clepsydra Technologies, including ORVOPS — our own ERP & management software suite.",
  },
};

export default function Page() {
  return <LandingPageClient />;
}
