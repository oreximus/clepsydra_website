import type { Metadata } from "next";
import ManagementSoftwareClient from "./client";

export const metadata: Metadata = {
  title: "Management Software & ERPs — ORVOPS",
  description:
    "Explore ORVOPS — Clepsydra Technologies' own ERP and management software suite for hospitals (ORVOPS HMS), mess & tiffin kitchens (Dabbik), hotels & resorts (ORVOPS Hospitality), and inventory distribution (StockLink).",
  openGraph: {
    title: "Management Software & ERPs — ORVOPS by Clepsydra Technologies",
    description:
      "Production ERP and management software owned and built by Clepsydra Technologies: ORVOPS HMS, Dabbik, ORVOPS Hospitality, and StockLink.",
    url: "https://clepsydratechnologies.com/management-software",
    siteName: "Clepsydra Technologies",
    type: "website",
    locale: "en_US",
  },
};

export default function ManagementSoftwarePage() {
  return <ManagementSoftwareClient />;
}
