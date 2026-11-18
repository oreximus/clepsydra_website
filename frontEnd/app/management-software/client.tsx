"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Check,
  ExternalLink,
  Hotel,
  Boxes,
  Stethoscope,
  UtensilsCrossed,
  Cloud,
  ShieldCheck,
  Headphones,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { OrvopsShowcase } from "@/components/orvops-showcase";
import { ServiceQueryModal } from "@/components/service-query-modal";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/motion-primitives/in-view";

const suiteQuickList = [
  {
    name: "ORVOPS HMS",
    vertical: "Hospital Management ERP",
    status: "Live",
    dot: "bg-emerald-400",
    href: "https://www.orvops.com/products/hms",
    domain: "orvops.com/products/hms",
  },
  {
    name: "Dabbik",
    vertical: "Mess & Tiffin Management",
    status: "Live",
    dot: "bg-emerald-400",
    href: "https://www.orvops.com/products/dabbik",
    domain: "orvops.com/products/dabbik",
  },
  {
    name: "ORVOPS Hospitality",
    vertical: "Hotel Management PMS",
    status: "Live reference",
    dot: "bg-amber-400",
    href: "https://www.orvops.com/products/hospitality",
    domain: "orvops.com/products/hospitality",
  },
  {
    name: "StockLink",
    vertical: "Inventory & Supply ERP",
    status: "Early access",
    dot: "bg-brand-sky-light",
    href: "https://www.orvops.com/products/stocklink",
    domain: "orvops.com/products/stocklink",
  },
];

const verticals = [
  {
    name: "ORVOPS HMS",
    industry: "Hospitals, Nursing Homes & Multi-Specialty Clinics",
    icon: Stethoscope,
    status: "Live · hms.orvops.com",
    statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    productUrl: "https://www.orvops.com/products/hms",
    liveUrl: "https://hms.orvops.com",
    deployment: "Managed cloud or on-premise · Multi-tenant isolation",
    modules: [
      "Registration, UHID & ABHA linkage",
      "OPD queues, doctor schedules & prescriptions",
      "IPD admissions, ward board & bed transfer history",
      "Lab, pathology, radiology & blood bank worklists",
      "Pharmacy FEFO dispensing, TPA insurance & GST billing",
      "Staff HR, shift rosters, payroll & offline sync",
    ],
  },
  {
    name: "Dabbik",
    industry: "Messes, Canteens & Tiffin Kitchens",
    icon: UtensilsCrossed,
    status: "Live · dabbik.com",
    statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    productUrl: "https://www.orvops.com/products/dabbik",
    liveUrl: "https://dabbik.com",
    deployment: "Cloud SaaS · Web + Android member & rider workflows",
    modules: [
      "Counter QR attendance with instant 4-digit PIN fallback",
      "Member app for meal quotas, wallets, menus & pause/leave",
      "Bilingual Hindi/English live kitchen display",
      "Tiffin batch dispatch, rider routes & delivery proof",
      "UPI/cash collections, expenses, dues & receipts ledger",
      "Zero-commission public discovery directory & verified reviews",
    ],
  },
  {
    name: "ORVOPS Hospitality",
    industry: "Independent Hotels, Resorts & Banquet Properties",
    icon: Hotel,
    status: "Live reference · Hotel The Mumbai Resort",
    statusClass: "bg-amber-50 text-amber-800 border-amber-200/80",
    productUrl: "https://www.orvops.com/products/hospitality",
    deployment: "Per-property or hotel group deployment",
    modules: [
      "Direct website room & banquet hall booking calendar",
      "Live room board with phone-based housekeeping states",
      "Permanent room QR cards for guest stay & dining orders",
      "Unified booking folio for nights, food, payments & GST",
      "Monthly staff payroll, PDF payslips & expense tracking",
      "Editable hotel website CMS with contrast-safe theming",
    ],
  },
  {
    name: "StockLink",
    industry: "Wholesalers, Distributors & Multi-Location Retail",
    icon: Boxes,
    status: "Pilot · Early access open",
    statusClass: "bg-[#EEF6FD] text-brand-navy border-brand-sky/30",
    productUrl: "https://www.orvops.com/products/stocklink",
    deployment: "Multi-organisation SaaS · PostgreSQL RLS isolation",
    modules: [
      "Append-only stock movement ledger (zero silent overwrites)",
      "Batch cost, FEFO expiry queues & serial traceability",
      "Split sourcing across own warehouses & partner vendors",
      "Regional hubs, bins & approved inter-location transfers",
      "Quality control quarantine gates, damage & vendor claims",
      "GST billing, receivables & WhatsApp dispatch actions",
    ],
  },
];

export default function ManagementSoftwareClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  const handleRequestErp = (productName?: string) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16 md:pt-[72px]">
        {/* ===== CLEPSYDRA SIGNATURE HERO (matches /portfolio & homepage visual language) ===== */}
        <section className="py-16 md:py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute -top-24 right-0 w-[520px] h-[520px] bg-brand-sky/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm text-white/65 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7"
              >
                <div className="section-label-light">
                  Owned by Clepsydra Technologies
                </div>

                <h1 className="font-heading text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold text-white mt-4 mb-5 leading-[1.08] tracking-[-0.03em]">
                  Management Software &amp; ERPs
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-sky-light">
                    Powered by ORVOPS
                  </span>
                </h1>

                <p className="font-body text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed mb-8">
                  ORVOPS is Clepsydra Technologies&apos; own operations and ERP software division —
                  four production management platforms engineered for hospitals, mess kitchens,
                  hotels, and multi-location inventory teams.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="https://www.orvops.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="rounded-button bg-white text-brand-navy hover:bg-brand-sky-light hover:text-white font-heading font-semibold h-12 px-7 text-sm sm:text-base shadow-brand-md transition-all duration-200">
                      Visit orvops.com
                      <ArrowUpRight className="ml-1.5 size-4" />
                    </Button>
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRequestErp("ORVOPS HMS")}
                    className="rounded-button border-white/25 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white h-12 px-7 text-sm sm:text-base font-heading font-semibold transition-all duration-200"
                  >
                    <Calendar className="mr-2 size-4 text-brand-sky-light" />
                    Request Deployment
                  </Button>
                </div>
              </motion.div>

              {/* Right Column: Clean Glass Suite Directory Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
              >
                <div className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md p-6 shadow-brand-xl">
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src="/images/orvops/brand/app-icon-dark.png"
                        alt="ORVOPS"
                        width={36}
                        height={36}
                        className="size-9 rounded-lg ring-1 ring-white/15"
                      />
                      <div>
                        <p className="font-heading text-sm font-bold text-white leading-tight">
                          ORVOPS Suite
                        </p>
                        <p className="font-body text-[11px] text-white/60">
                          A Clepsydra Technologies Company
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/10 border border-white/15 px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-brand-sky-light">
                      4 Platforms
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {suiteQuickList.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.11] px-3.5 py-2.5 transition-all duration-200"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${item.dot}`} aria-hidden="true" />
                            <span className="font-heading text-sm font-semibold text-white truncate">
                              {item.name}
                            </span>
                          </div>
                          <p className="font-body text-xs text-white/60 truncate mt-0.5 pl-3.5">
                            {item.vertical}
                          </p>
                        </div>
                        <ArrowUpRight className="size-4 text-white/50 group-hover:text-white shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== INTERACTIVE ORVOPS PRODUCT STUDIO (LUMINOUS CLEPSYDRA WHITE) ===== */}
        <OrvopsShowcase onRequestErp={handleRequestErp} compactHeader />

        {/* ===== INDUSTRY VERTICALS & MODULE MATRIX (2x2 SYMMETRIC GRID ON ICE SURFACE) ===== */}
        <section className="py-20 md:py-24 bg-surface-off border-t border-[#E5EAF4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <InView className="flex flex-col items-center text-center mb-14">
              <div className="section-label">Management Software Breakdown</div>
              <h2 className="font-heading text-[2.25rem] md:text-[2.85rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Built for Real Daily Operations
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[660px]">
                Every ORVOPS platform is owned, engineered, and supported directly by Clepsydra Technologies —
                ready to deploy out of the box or customize to your workflows.
              </p>
            </InView>

            <div className="grid gap-8 md:grid-cols-2">
              {verticals.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <InView key={v.name} delay={idx * 0.06} className="h-full">
                    <div className="h-full rounded-2xl border border-[#E5EAF4] bg-white p-7 shadow-brand-sm hover:shadow-brand-md transition-all duration-200 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="size-12 rounded-xl bg-[#EEF6FD] text-brand-blue flex items-center justify-center shrink-0">
                            <Icon className="size-5" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-heading text-xl font-bold text-brand-navy-deep">
                              {v.name}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground mt-0.5">
                              {v.industry}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 font-heading text-[11px] font-semibold ${v.statusClass}`}
                        >
                          {v.status}
                        </span>
                      </div>

                      <p className="font-body text-xs font-medium text-brand-navy bg-[#F7F9FC] border border-[#E5EAF4] rounded-lg px-3.5 py-2 mb-5">
                        {v.deployment}
                      </p>

                      <ul className="space-y-2.5 mb-7 flex-1">
                        {v.modules.map((mod) => (
                          <li
                            key={mod}
                            className="flex items-start gap-2.5 font-body text-sm text-[#374151]"
                          >
                            <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#EEF6FD] text-brand-blue">
                              <Check className="size-3" aria-hidden="true" />
                            </span>
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center gap-2.5 pt-5 border-t border-[#E5EAF4]">
                        <a
                          href={v.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="rounded-button bg-brand-gradient text-white hover:brightness-110 font-heading text-xs sm:text-sm font-semibold shadow-brand-sm">
                            View on ORVOPS
                            <ArrowUpRight className="ml-1.5 size-4" />
                          </Button>
                        </a>
                        {v.liveUrl && (
                          <a
                            href={v.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              className="rounded-button border-[#D0D7E6] text-brand-navy-deep hover:bg-surface-off font-heading text-xs sm:text-sm font-semibold"
                            >
                              Live App
                              <ExternalLink className="ml-1.5 size-3.5 text-brand-blue" />
                            </Button>
                          </a>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => handleRequestErp(v.name)}
                          className="rounded-button text-brand-blue hover:text-brand-navy hover:bg-[#EEF6FD] font-heading text-xs sm:text-sm font-semibold ml-auto"
                        >
                          Request Setup
                        </Button>
                      </div>
                    </div>
                  </InView>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== DEPLOYMENT & SUPPORT STANDARDS ===== */}
        <section className="py-16 md:py-20 bg-white border-t border-[#E5EAF4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Cloud,
                  title: "Cloud or On-Premise",
                  body: "Run on Clepsydra-managed cloud infrastructure with automated backups or deploy inside your own private server environment.",
                },
                {
                  icon: ShieldCheck,
                  title: "Database-Level Security",
                  body: "Strict tenant isolation, role-based access control, approval thresholds, and complete audit trails for financial and clinical actions.",
                },
                {
                  icon: Headphones,
                  title: "Direct Engineering Support",
                  body: "Work directly with the Clepsydra engineers who built ORVOPS — fast onboarding, data migration, and custom workflow extensions.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E5EAF4] bg-surface-off/60 p-6"
                >
                  <div className="size-11 rounded-xl bg-[#EEF6FD] text-brand-blue flex items-center justify-center mb-4">
                    <item.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-brand-navy-deep mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CUSTOM ERP / DEMO CTA ===== */}
        <section className="py-20 bg-hero-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-sky-light mb-5">
              <Building2 className="size-3.5" aria-hidden="true" />
              Turnkey ORVOPS or Custom ERP
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Need an ERP or Management System for Your Organization?
            </h2>
            <p className="font-body text-base md:text-lg text-white/75 mb-8 max-w-2xl mx-auto">
              Book a live walkthrough of ORVOPS HMS, Dabbik, Hospitality, or StockLink — or talk to Clepsydra
              about building a tailored management platform for your industry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                type="button"
                onClick={() => handleRequestErp("Custom ERP")}
                className="rounded-button bg-white text-brand-navy hover:bg-brand-sky-light hover:text-white font-heading font-semibold h-12 px-8 text-base shadow-brand-md"
              >
                Request ERP Deployment
              </Button>
              <a
                href="https://www.orvops.com/demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="rounded-button border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white font-heading font-semibold h-12 px-8 text-base w-full sm:w-auto"
                >
                  Book Demo on orvops.com
                  <ArrowUpRight className="ml-1.5 size-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ServiceQueryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultService="ERP & Management Software"
        defaultSubService={selectedProduct}
      />
    </div>
  );
}
