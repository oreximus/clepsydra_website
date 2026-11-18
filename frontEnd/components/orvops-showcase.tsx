"use client";

import { useState, useRef, useId, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Stethoscope,
  UtensilsCrossed,
  Hotel,
  Boxes,
  Check,
  Maximize2,
  Building2,
  ShieldCheck,
  Layers3,
  ExternalLink,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { InView } from "@/components/motion-primitives/in-view";
import { Spotlight } from "@/components/motion-primitives/spotlight";
import { Magnetic } from "@/components/motion-primitives/magnetic";

interface ProductScreen {
  label: string;
  src: string;
  alt: string;
  caption: string;
  phone?: boolean;
}

interface OrvopsProduct {
  slug: "hms" | "dabbik" | "hospitality" | "stocklink";
  name: string;
  shortName: string;
  vertical: string;
  category: string;
  status: "Live" | "Live reference" | "Early access";
  statusTone: "emerald" | "amber" | "blue";
  deploymentLabel: string;
  windowUrl: string;
  productPageUrl: string;
  liveUrl?: string;
  headline: string;
  summary: string;
  icon: typeof Stethoscope;
  metrics: { value: string; label: string }[];
  capabilities: string[];
  floatingMobileOverlay?: { src: string; alt: string };
  screens: ProductScreen[];
}

const ORVOPS_PRODUCTS: OrvopsProduct[] = [
  {
    slug: "hms",
    name: "ORVOPS HMS",
    shortName: "HMS",
    vertical: "Hospitals & Clinics",
    category: "Hospital Management ERP",
    status: "Live",
    statusTone: "emerald",
    deploymentLabel: "hms.orvops.com",
    windowUrl: "hms.orvops.com/dashboard",
    productPageUrl: "https://www.orvops.com/products/hms",
    liveUrl: "https://hms.orvops.com",
    headline: "Every patient, bed and bill. One record.",
    summary:
      "Multi-tenant hospital management from registration to discharge — OPD queues, IPD bed history, operation theatre, diagnostics, pharmacy, billing, TPA insurance, HR payroll, and offline sync.",
    icon: Stethoscope,
    metrics: [
      { value: "15", label: "Staff roles" },
      { value: "20+", label: "Core modules" },
      { value: "1", label: "Unified UHID" },
      { value: "100%", label: "Audited writes" },
    ],
    capabilities: [
      "OPD queues, IPD ward board & timestamped bed transfers",
      "Laboratory, pathology, radiology & blood bank worklists",
      "Auto-assembled billing, TPA insurance & GST receipts",
      "Offline-tolerant workflows with per-hospital DB isolation",
    ],
    screens: [
      {
        label: "Operations Dashboard",
        src: "/images/orvops/hms/dashboard.webp",
        alt: "ORVOPS HMS operations dashboard with appointments, bed occupancy and queues",
        caption:
          "One operations console for appointments, admissions, ward occupancy, and pending clinical decisions.",
      },
      {
        label: "Admissions & Beds",
        src: "/images/orvops/hms/admission.webp",
        alt: "ORVOPS HMS admission screen showing bed allocation and transfer history",
        caption:
          "Every bed allocation and ward transfer is an immutable timestamped row — never an overwritten field.",
      },
      {
        label: "Billing & Revenue",
        src: "/images/orvops/hms/billing.webp",
        alt: "ORVOPS HMS billing screen with collections, receivables and approvals",
        caption:
          "Bills assemble directly from pharmacy, diagnostics, and procedures with role-enforced approval limits.",
      },
      {
        label: "Unified Patient UHID",
        src: "/images/orvops/hms/patient-record.webp",
        alt: "ORVOPS HMS patient record with UHID and clinical timeline",
        caption:
          "One permanent UHID stitches OPD visits, IPD stays, lab reports, prescriptions, and payments together.",
      },
    ],
  },
  {
    slug: "dabbik",
    name: "Dabbik",
    shortName: "Dabbik",
    vertical: "Mess & Tiffin Kitchens",
    category: "Mess & Tiffin Management",
    status: "Live",
    statusTone: "emerald",
    deploymentLabel: "dabbik.com",
    windowUrl: "dabbik.com/console",
    productPageUrl: "https://www.orvops.com/products/dabbik",
    liveUrl: "https://dabbik.com",
    headline: "Run the mess. Not the spreadsheet.",
    summary:
      "The operating system and zero-commission marketplace for messes, canteens, and tiffin kitchens — QR attendance with 4-digit PIN fallback, member wallets, live kitchen displays, rider routes, and daily accounts.",
    icon: UtensilsCrossed,
    metrics: [
      { value: "0%", label: "Commission" },
      { value: "6", label: "Role views" },
      { value: "1", label: "Cross-kitchen PIN" },
      { value: "4-digit", label: "PIN fallback" },
    ],
    capabilities: [
      "Counter QR attendance with instant 4-digit PIN fallback",
      "Member app for quotas, wallets, menus, pause & receipts",
      "Bilingual Hindi/English live kitchen pass display",
      "Tiffin batch dispatch, rider route stops & UPI/cash ledger",
    ],
    floatingMobileOverlay: {
      src: "/images/orvops/dabbik/member-plans.webp",
      alt: "Dabbik member mobile app showing active meal plan and quota",
    },
    screens: [
      {
        label: "Owner Console",
        src: "/images/orvops/dabbik/admin-dashboard.webp",
        alt: "Dabbik owner dashboard showing thalis served, check-ins and collections",
        caption:
          "Live thali counts, counter check-ins, collections, expiring plans, and active service slots in one console.",
      },
      {
        label: "Public Directory",
        src: "/images/orvops/dabbik/business.webp",
        alt: "Dabbik for-business homepage and verified kitchen discovery",
        caption:
          "Verified kitchen discovery with attendance-backed reviews and direct member enquiries — zero broker cut.",
      },
      {
        label: "Member App",
        src: "/images/orvops/dabbik/member-plans.webp",
        alt: "Dabbik member app showing a 15-day lunch plan and remaining thalis",
        caption:
          "Members see remaining meals, live menus, attendance history, and receipts across every kitchen they join.",
        phone: true,
      },
      {
        label: "Kitchen Display",
        src: "/images/orvops/dabbik/kitchen-display.webp",
        alt: "Dabbik bilingual kitchen display showing live dish counts",
        caption:
          "Live dish tallies in Hindi and English directly at the kitchen pass so plates are never oversold.",
        phone: true,
      },
    ],
  },
  {
    slug: "hospitality",
    name: "ORVOPS Hospitality",
    shortName: "Hospitality",
    vertical: "Hotels & Resorts",
    category: "Hotel Management PMS",
    status: "Live reference",
    statusTone: "amber",
    deploymentLabel: "Ref: Hotel The Mumbai Resort",
    windowUrl: "hospitality.orvops.com/panel",
    productPageUrl: "https://www.orvops.com/products/hospitality",
    headline: "Bookings, rooms, bills and payroll. One panel.",
    summary:
      "End-to-end hotel and resort operations — direct room and banquet bookings, live housekeeping room board, printable room QR dining billed straight to the folio, GST invoicing, expenses, and staff payroll with PDF payslips.",
    icon: Hotel,
    metrics: [
      { value: "20", label: "Ref. rooms" },
      { value: "2", label: "Event halls" },
      { value: "236", label: "QR dishes" },
      { value: "1", label: "Unified folio" },
    ],
    capabilities: [
      "Direct room & banquet bookings unified into one guest folio",
      "Live room board with phone-driven housekeeping status",
      "Permanent room QR cards for passwordless stay & dining",
      "Built-in staff salary, PDF payslips, expenses & monthly P&L",
    ],
    screens: [
      {
        label: "Front Desk Dashboard",
        src: "/images/orvops/hospitality/panel-dashboard.webp",
        alt: "ORVOPS Hospitality front desk dashboard with arrivals and occupancy",
        caption:
          "Front desk opens on today's arrivals, departures, room occupancy, active tasks, and shift collections.",
      },
      {
        label: "Live Room Board",
        src: "/images/orvops/hospitality/panel-room-board.webp",
        alt: "ORVOPS Hospitality room board showing occupied, free and dirty rooms",
        caption:
          "Occupied, free, dirty, and blocked rooms on one live board updated straight from housekeeping phones.",
      },
      {
        label: "Printable Room QR",
        src: "/images/orvops/hospitality/panel-qr.webp",
        alt: "Printable room QR cards generated inside ORVOPS Hospitality",
        caption:
          "Permanent per-room QR cards let guests inspect their stay, order food to the kitchen, and view live folios.",
      },
      {
        label: "Payroll & Finance",
        src: "/images/orvops/hospitality/panel-finance-salary.webp",
        alt: "ORVOPS Hospitality monthly payroll and payslips management",
        caption:
          "Base salary, allowances, deductions, and downloadable PDF payslips reconciled beside hotel expenses.",
      },
    ],
  },
  {
    slug: "stocklink",
    name: "StockLink",
    shortName: "StockLink",
    vertical: "Inventory & Distribution",
    category: "Inventory & Supply ERP",
    status: "Early access",
    statusTone: "blue",
    deploymentLabel: "In pilot · Early access open",
    windowUrl: "stocklink.orvops.com/ledger",
    productPageUrl: "https://www.orvops.com/products/stocklink",
    headline: "Stock you can prove.",
    summary:
      "Multi-organisation inventory and distribution ERP built on an append-only movement ledger — batch cost & FEFO expiry queues, sourcing plans, regional hubs, QC workflows, serial traceability, and GST billing with PostgreSQL RLS.",
    icon: Boxes,
    metrics: [
      { value: "1", label: "Stock ledger" },
      { value: "0", label: "Overwrites" },
      { value: "RLS", label: "DB isolation" },
      { value: "3", label: "Network tiers" },
    ],
    capabilities: [
      "Immutable movement ledger — current stock is always provable",
      "Batch cost, FEFO picking, expiry alerts & QC quarantine gates",
      "Split sourcing across own warehouses & connected vendors",
      "PostgreSQL Row-Level Security isolation across hubs & orgs",
    ],
    screens: [
      {
        label: "Sourcing Plan",
        src: "/images/orvops/stocklink/sourcing.webp",
        alt: "StockLink sourcing plan splitting requests across own stock and vendors",
        caption:
          "Split one restock request across owned hubs and partner vendors without ever counting phantom stock.",
      },
      {
        label: "Restock Ledger",
        src: "/images/orvops/stocklink/request.webp",
        alt: "StockLink restock request tracking requested, dispatched and received quantities",
        caption:
          "Requested, approved, dispatched, received, damaged, and missing stay separate auditable facts on one line.",
      },
      {
        label: "QC & Expiry Gates",
        src: "/images/orvops/stocklink/qc.webp",
        alt: "StockLink quality control and batch expiry management screen",
        caption:
          "FEFO expiry buckets, quality control holds, and vendor claims operate as assigned workflows.",
      },
      {
        label: "Regional Hub",
        src: "/images/orvops/stocklink/hub.webp",
        alt: "StockLink regional hub dashboard with transfer queues",
        caption:
          "Each regional hub gets scoped stock visibility, transfer approvals, and WhatsApp dispatch actions.",
      },
    ],
  },
];

const STATUS_STYLES = {
  emerald: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  },
  amber: {
    dot: "bg-amber-500",
    pill: "bg-amber-50 text-amber-800 border-amber-200/80",
  },
  blue: {
    dot: "bg-brand-blue",
    pill: "bg-[#EEF6FD] text-brand-navy border-brand-sky/30",
  },
};

export function OrvopsShowcase({
  onRequestErp,
  showDedicatedPageLink = false,
  compactHeader = false,
}: {
  onRequestErp?: (productName: string) => void;
  showDedicatedPageLink?: boolean;
  compactHeader?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeProduct = ORVOPS_PRODUCTS[activeIndex];
  const activeScreen = activeProduct.screens[screenIndex] ?? activeProduct.screens[0];
  const statusStyle = STATUS_STYLES[activeProduct.statusTone];

  const selectProduct = (index: number, scrollToStage = false) => {
    setActiveIndex(index);
    setScreenIndex(0);
    const tabEl = tabRefs.current[index];
    if (tabEl) {
      tabEl.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
    if (scrollToStage && stageRef.current) {
      stageRef.current.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "nearest",
      });
    }
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % ORVOPS_PRODUCTS.length;
    else if (e.key === "ArrowLeft")
      nextIndex = (index - 1 + ORVOPS_PRODUCTS.length) % ORVOPS_PRODUCTS.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = ORVOPS_PRODUCTS.length - 1;

    if (nextIndex !== null) {
      e.preventDefault();
      selectProduct(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      id="orvops"
      className="relative scroll-mt-20 overflow-hidden bg-white py-20 md:py-28 border-t border-[#E5EAF4]"
    >
      {/* Subtle Clepsydra atmospheric radial tint (matches Clepsydra's white + ice-blue theme) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,rgba(74,157,232,0.10),transparent_72%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ===== LUMINOUS CO-BRANDED OWNERSHIP HEADER ===== */}
        {!compactHeader && (
          <InView className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#E5EAF4]">
            <div className="max-w-3xl">
              {/* Official ORVOPS Brand Lockup sitting naturally on Clepsydra white */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Image
                  src="/images/orvops/brand/logo-horizontal.png"
                  alt="ORVOPS — A Clepsydra Technologies Company"
                  width={230}
                  height={54}
                  className="h-9 sm:h-10 w-auto object-contain"
                />
                <span
                  aria-hidden="true"
                  className="hidden sm:inline-block h-6 w-px bg-[#D7E0F0]"
                />
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF6FD] border border-brand-sky/25 px-3.5 py-1.5 font-heading text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-navy">
                  <span className="size-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                  Owned &amp; Built by Clepsydra
                </span>
              </div>

              <h2 className="font-heading text-[2.25rem] sm:text-[2.75rem] lg:text-[3.15rem] font-bold tracking-[-0.03em] leading-[1.08] text-brand-navy-deep">
                Enterprise ERPs &amp; Management{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy via-brand-blue to-brand-sky">
                  Software Suite
                </span>
              </h2>

              <p className="mt-4 font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Beyond custom development,{" "}
                <span className="font-medium text-brand-navy-deep">
                  Clepsydra Technologies owns and operates ORVOPS
                </span>{" "}
                — our production suite of operations software running hospitals, mess kitchens,
                hotels, and multi-location inventory networks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {showDedicatedPageLink && (
                <Link href="/management-software">
                  <Button
                    variant="outline"
                    className="h-11 px-5 rounded-button border-[#D0D7E6] bg-white text-brand-navy-deep hover:bg-surface-off hover:border-brand-blue/40 font-heading font-semibold text-sm transition-all duration-200"
                  >
                    Management Software
                    <ArrowRight className="ml-1.5 size-4 text-brand-blue" />
                  </Button>
                </Link>
              )}
              <Magnetic intensity={0.12}>
                <a
                  href="https://www.orvops.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="group h-11 px-6 rounded-button bg-brand-gradient text-white font-heading font-semibold text-sm shadow-brand-md hover:brightness-110 transition-all duration-200 active:scale-[0.98]">
                    Visit orvops.com
                    <ArrowUpRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </a>
              </Magnetic>
              <a
                href="https://www.orvops.com/demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-11 px-5 rounded-button border-[#D0D7E6] bg-white text-brand-navy-deep hover:bg-brand-navy-deep hover:text-white font-heading font-semibold text-sm transition-all duration-200"
                >
                  <Calendar className="mr-1.5 size-4 text-brand-blue group-hover:text-white" />
                  Book Demo
                </Button>
              </a>
            </div>
          </InView>
        )}

        {/* ===== APPLE-STYLE LIGHT SEGMENTED PRODUCT SWITCHER (WAI-ARIA TABLIST) ===== */}
        <div ref={stageRef} className={compactHeader ? "scroll-mt-24" : "mt-10 scroll-mt-24"}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div
              role="tablist"
              aria-label="ORVOPS ERP and management software products"
              className="inline-flex w-full sm:w-auto items-stretch gap-1 overflow-x-auto rounded-2xl bg-[#F2F5FA] p-1.5 border border-[#E5EAF4] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {ORVOPS_PRODUCTS.map((product, index) => {
                const Icon = product.icon;
                const isSelected = index === activeIndex;
                const dotClass = STATUS_STYLES[product.statusTone].dot;

                return (
                  <button
                    key={product.slug}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${product.slug}`}
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => selectProduct(index)}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                    className={`relative flex-none min-w-[165px] sm:min-w-[185px] rounded-xl px-4 py-2.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
                      isSelected
                        ? "text-brand-navy-deep"
                        : "text-[#4B5563] hover:text-brand-navy-deep"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId={`${baseId}-active-pill`}
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 rounded-xl bg-white shadow-brand-sm ring-1 ring-[#0D1B3E]/[0.06]"
                        aria-hidden="true"
                      />
                    )}
                    {/* Non-color underline indicator preserved in Forced Colors Mode (WCAG 1.4.1) */}
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 bottom-0 border-b-2 border-brand-blue"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2.5">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                          isSelected
                            ? "bg-[#EEF6FD] text-brand-blue"
                            : "bg-white/70 text-[#6B7280]"
                        }`}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5">
                          <span className="font-heading text-sm font-semibold truncate">
                            {product.name}
                          </span>
                          <span
                            className={`size-1.5 rounded-full shrink-0 ${dotClass}`}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="block font-body text-[11px] text-muted-foreground truncate">
                          {product.vertical}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {compactHeader && (
              <div className="flex items-center gap-2 shrink-0">
                <Image
                  src="/images/orvops/brand/logo-horizontal.png"
                  alt="ORVOPS — A Clepsydra Technologies Company"
                  width={180}
                  height={42}
                  className="h-8 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* ===== LUMINOUS ARCHITECTURAL PRODUCT STAGE ===== */}
          <div
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${activeProduct.slug}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.slug}
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[24px] border border-[#E5EAF4] bg-white p-6 sm:p-8 lg:p-10 shadow-brand-lg overflow-hidden"
              >
                <Spotlight size={460} color="rgba(74, 157, 232, 0.11)" />

                <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* LEFT: Editorial Story, Hairline Metrics & Actions (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-[11px] font-semibold ${statusStyle.pill}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${statusStyle.dot}`}
                          aria-hidden="true"
                        />
                        {activeProduct.status}
                      </span>
                      <span className="font-body text-xs text-muted-foreground">
                        {activeProduct.deploymentLabel}
                      </span>
                    </div>

                    <p className="mt-5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                      {activeProduct.category}
                    </p>

                    <h3 className="mt-2 font-heading text-2xl sm:text-[2rem] font-bold tracking-[-0.025em] leading-[1.15] text-brand-navy-deep">
                      {activeProduct.headline}
                    </h3>

                    <p className="mt-3.5 font-body text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                      {activeProduct.summary}
                    </p>

                    {/* Clean Hairline Architectural Metrics Strip */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                      {activeProduct.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-xl border border-[#E5EAF4] bg-surface-off/80 px-4 py-3"
                        >
                          <div className="font-heading text-xl font-bold text-brand-navy-deep tabular-nums leading-none">
                            {metric.value}
                          </div>
                          <div className="mt-1 font-body text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Core Capabilities */}
                    <ul className="mt-6 space-y-2.5">
                      {activeProduct.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2.5 font-body text-sm text-[#374151] leading-snug"
                        >
                          <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#EEF6FD] text-brand-blue">
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Product Actions */}
                    <div className="mt-7 flex flex-wrap items-center gap-2.5">
                      <a
                        href={activeProduct.productPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="h-10 px-5 rounded-button bg-brand-gradient text-white font-heading text-xs sm:text-sm font-semibold shadow-brand-md hover:brightness-110 transition-all duration-200 active:scale-[0.98]">
                          Explore {activeProduct.shortName}
                          <ArrowUpRight className="ml-1.5 size-4" />
                        </Button>
                      </a>

                      {activeProduct.liveUrl && (
                        <a
                          href={activeProduct.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            className="h-10 px-4 rounded-button border-[#D0D7E6] text-brand-navy-deep hover:bg-surface-off font-heading text-xs sm:text-sm font-semibold"
                          >
                            Live App
                            <ExternalLink className="ml-1.5 size-3.5 text-brand-blue" />
                          </Button>
                        </a>
                      )}

                      {onRequestErp && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => onRequestErp(activeProduct.name)}
                          className="h-10 px-3.5 rounded-button text-brand-blue hover:text-brand-navy hover:bg-[#EEF6FD] font-heading text-xs sm:text-sm font-semibold"
                        >
                          Deploy for your team
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Luminous Apple-Style Product Frame Showcase (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl bg-gradient-to-br from-[#F4F7FC] via-[#EEF4FB] to-[#E6EFFA] p-3 sm:p-5 border border-[#E5EAF4]">
                      {/* Crisp Light macOS Browser Bezel */}
                      <div className="rounded-xl overflow-hidden border border-[#D8E2F0] bg-white shadow-[0_22px_50px_-20px_rgba(13,27,62,0.22)]">
                        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#F8FAFD] border-b border-[#E5EAF4]">
                          <div className="flex items-center gap-1.5">
                            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                            <span className="size-2.5 rounded-full bg-[#28C840]" />
                          </div>
                          <div className="flex-1 max-w-xs mx-auto">
                            <div className="flex items-center justify-center gap-1.5 rounded-md bg-white border border-[#E5EAF4] px-3 py-1 text-[11px] font-body text-muted-foreground truncate">
                              <span
                                className={`size-1.5 rounded-full shrink-0 ${statusStyle.dot}`}
                                aria-hidden="true"
                              />
                              <span className="truncate">{activeProduct.windowUrl}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setLightboxOpen(true)}
                            aria-label={`Inspect ${activeProduct.name} ${activeScreen.label} full screen`}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-heading font-semibold text-brand-navy hover:bg-[#EEF6FD] hover:text-brand-blue transition-colors"
                          >
                            <Maximize2 className="size-3.5" aria-hidden="true" />
                            <span className="hidden sm:inline">Expand</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setLightboxOpen(true)}
                          aria-label={`Open full-size screenshot of ${activeProduct.name} — ${activeScreen.label}`}
                          className="group relative block w-full aspect-[16/10] bg-[#F7F9FC] overflow-hidden text-left cursor-zoom-in"
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeScreen.src}
                              initial={prefersReduced ? false : { opacity: 0, scale: 1.01 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={prefersReduced ? undefined : { opacity: 0 }}
                              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                              className="relative size-full"
                            >
                              <Image
                                src={activeScreen.src}
                                alt={activeScreen.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 680px"
                                className={
                                  activeScreen.phone
                                    ? "object-contain p-4 bg-gradient-to-br from-[#F4F7FC] to-[#E6EFFA]"
                                    : "object-cover object-top"
                                }
                              />
                            </motion.div>
                          </AnimatePresence>

                          {/* Floating iPhone Bezel Overlay for Dabbik main console */}
                          {activeProduct.floatingMobileOverlay && screenIndex === 0 && (
                            <div className="hidden sm:block absolute bottom-3 right-3 w-[108px] md:w-[120px] rounded-[18px] border-[4px] border-brand-navy-deep bg-brand-navy-deep shadow-brand-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                              <Image
                                src={activeProduct.floatingMobileOverlay.src}
                                alt={activeProduct.floatingMobileOverlay.alt}
                                width={240}
                                height={520}
                                className="w-full h-auto"
                              />
                            </div>
                          )}

                          <span className="pointer-events-none absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-brand-navy-deep/90 backdrop-blur-sm px-3 py-1 font-heading text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="size-3" />
                            Inspect screen
                          </span>
                        </button>
                      </div>

                      {/* Screen Switcher Pills */}
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {activeProduct.screens.map((screen, idx) => {
                          const selected = idx === screenIndex;
                          return (
                            <button
                              key={screen.label}
                              type="button"
                              onClick={() => setScreenIndex(idx)}
                              aria-pressed={selected}
                              className={`rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-all duration-200 ${
                                selected
                                  ? "bg-brand-navy-deep text-white shadow-brand-sm"
                                  : "bg-white/85 text-[#4B5563] border border-[#DCE4F2] hover:bg-white hover:text-brand-navy-deep"
                              }`}
                            >
                              {screen.label}
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-3 font-body text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                        {activeScreen.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ===== ALL-FOUR PRODUCTS QUICK OVERVIEW (4 EQUAL WHITE CARDS) ===== */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ORVOPS_PRODUCTS.map((product, index) => {
            const isSelected = index === activeIndex;
            const Icon = product.icon;
            const tone = STATUS_STYLES[product.statusTone];

            return (
              <div
                key={product.slug}
                className={`group relative rounded-2xl border p-4 transition-all duration-200 bg-white ${
                  isSelected
                    ? "border-brand-blue/50 shadow-brand-md ring-1 ring-brand-blue/15"
                    : "border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => selectProduct(index, true)}
                    className="flex items-center gap-2.5 text-left min-w-0 focus-visible:outline-none focus-visible:underline"
                  >
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected
                          ? "bg-brand-blue text-white"
                          : "bg-[#EEF6FD] text-brand-blue"
                      }`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-sm font-semibold text-brand-navy-deep truncate">
                        {product.name}
                      </span>
                      <span className="block font-body text-[11px] text-muted-foreground truncate">
                        {product.vertical}
                      </span>
                    </span>
                  </button>
                  <a
                    href={product.productPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${product.name} on orvops.com`}
                    className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E5EAF4] text-muted-foreground hover:text-brand-blue hover:border-brand-blue/40 hover:bg-[#EEF6FD] transition-colors"
                  >
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => selectProduct(index, true)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E5EAF4] bg-[#F7F9FC]">
                    <Image
                      src={product.screens[0].src}
                      alt={product.screens[0].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-body text-[11px] text-muted-foreground">
                      <span className={`size-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
                      {product.status}
                    </span>
                    <span className="font-heading text-[11px] font-semibold text-brand-blue">
                      {isSelected ? "Active above" : "Inspect →"}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ===== OWNERSHIP & ENGINEERING GUARANTEE STRIP ===== */}
        <div className="mt-10 grid gap-5 md:grid-cols-3 pt-8 border-t border-[#E5EAF4]">
          {[
            {
              icon: Building2,
              title: "100% Owned by Clepsydra",
              body: "ORVOPS is Clepsydra Technologies' in-house software suite — built, maintained, and supported directly by our engineers.",
            },
            {
              icon: ShieldCheck,
              title: "Multi-Tenant & Audit-Ready",
              body: "Database-level tenant isolation, role permissions, GST invoicing, and audit trails engineered for daily production.",
            },
            {
              icon: Layers3,
              title: "Turnkey Suite or Custom ERP",
              body: "Deploy HMS, Dabbik, Hospitality, or StockLink out of the box — or have Clepsydra tailor modules for your operations.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="flex items-start gap-3.5 rounded-2xl border border-[#E5EAF4] bg-surface-off/70 p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF6FD] text-brand-blue">
                <pillar.icon className="size-4.5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-heading text-sm font-semibold text-brand-navy-deep">
                  {pillar.title}
                </h4>
                <p className="mt-1 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crisp Light Full-Size Screen Inspection Modal (matches LivePreviewModal) */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-6xl p-0 gap-0 overflow-hidden bg-white"
          aria-describedby={undefined}
        >
          <div className="flex items-center gap-3 px-5 py-3.5 pr-14 border-b border-[#E5EAF4]">
            <DialogTitle className="font-heading text-sm font-semibold text-brand-navy-deep truncate">
              {activeProduct.name} — {activeScreen.label}
            </DialogTitle>
            <a
              href={activeProduct.productPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex shrink-0 items-center gap-1.5 font-heading text-xs font-semibold text-brand-blue hover:text-brand-navy transition-colors"
            >
              View on orvops.com
              <ExternalLink className="size-3.5" />
            </a>
          </div>
          <div className="relative w-full aspect-[16/10] bg-[#F7F9FC]">
            <Image
              src={activeScreen.src}
              alt={activeScreen.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1152px"
              className={activeScreen.phone ? "object-contain p-6" : "object-contain"}
            />
          </div>
          <div className="px-5 py-3.5 border-t border-[#E5EAF4] bg-surface-off flex flex-wrap items-center justify-between gap-3">
            <p className="font-body text-xs sm:text-sm text-muted-foreground">
              {activeScreen.caption}
            </p>
            <div className="flex items-center gap-1.5">
              {activeProduct.screens.map((s, idx) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setScreenIndex(idx)}
                  className={`rounded-full px-3 py-1 font-heading text-[11px] font-semibold transition-colors ${
                    idx === screenIndex
                      ? "bg-brand-navy-deep text-white"
                      : "bg-white text-muted-foreground border border-[#E5EAF4] hover:text-brand-navy-deep"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
