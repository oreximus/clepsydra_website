"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ExternalLink,
  Eye,
  Globe,
  ArrowLeft,
  ChevronRight,
  Star,
  Clock,
  Users,
  ShoppingCart,
  BarChart,
  Briefcase,
  Award,
  Palette,
  Codepen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { LiveFrame, LivePreviewModal } from "@/components/live-preview-modal";

interface LiveProject {
  title: string;
  tagline: string;
  description: string;
  url: string;
  /** Static image used when the site cannot be embedded (login-only or X-Frame-Options blocked) */
  screenshot?: string;
  tech: string[];
  gradient: string;
  accent: string;
  features: string[];
  results?: string;
  timeline?: string;
  teamSize?: string;
}

interface DesignCategory {
  title: string;
  description: string;
  capabilities: string[];
  gradient: string;
  icon: React.ReactNode;
  showcaseLinks: { label: string; url: string; icon: React.ReactNode }[];
  previewImage?: string;
}

const liveProjects: LiveProject[] = [
  {
    title: "TailsInfo",
    tagline: "Pet QR Digital Identity Platform",
    description:
      "A modern platform that gives every pet a unique QR-based digital identity. Pet owners can create profiles with medical records, vaccination history, and contact details. When scanned, the QR code instantly displays the pet's information and owner contact — dramatically increasing the chances of reuniting lost pets with their families.",
    url: "https://tailsinfo.com/",
    tech: ["Next.js", "PostgreSQL", "QR Code Generation", "Tailwind CSS", "Cloud Hosting"],
    gradient: "from-amber-600 via-orange-500 to-rose-500",
    accent: "#D97706",
    features: [
      "Unique QR code generation for each pet profile",
      "Comprehensive pet health record management",
      "Lost pet alert system with geolocation",
      "Community feed for pet owners",
      "Shareable digital pet passport",
    ],
    results: "500+ pets registered in the first quarter with growing community engagement and partnerships with local veterinary clinics.",
    timeline: "5 weeks",
    teamSize: "3 developers",
  },
  {
    title: "Trikal Security",
    tagline: "Comprehensive Security Solutions",
    description:
      "A professional-grade website for a security firm staffed by ex-NSG, ex-Special Forces, and ex-Military personnel. The site communicates trust, authority, and ISO-certified quality standards across services including manned guarding, surveillance, and risk assessment for banks, construction sites, and commercial establishments across India.",
    url: "https://www.trikalsecurity.com/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "SEO Optimized"],
    gradient: "from-slate-900 via-slate-800 to-slate-700",
    accent: "#0F172A",
    features: [
      "Dynamic service showcase with filterable categories",
      "Client testimonial carousel with trust signals",
      "ISO certification badges and compliance documentation",
      "Mobile-first responsive design with fast loading",
      "Contact & inquiry form with automated routing",
    ],
    results: "40% increase in inquiry conversions within the first month, establishing a strong digital presence for a traditionally offline industry.",
    timeline: "3 weeks",
    teamSize: "2 developers",
  },
  {
    title: "Gulshan Khalkho Studio",
    tagline: "Photography Portfolio & Creative Studio",
    description:
      "A visually stunning photography portfolio website showcasing creative work with immersive galleries, smooth transitions, and a minimalist design that puts the imagery front and center. Built with modern web technologies for optimal performance and visual impact across all devices.",
    url: "https://www.gulshankhalkho.studio/",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Responsive Design", "SEO Optimized"],
    gradient: "from-rose-700 via-pink-600 to-purple-500",
    accent: "#BE185D",
    features: [
      "Immersive full-screen photo galleries with lightbox",
      "Smooth page transitions with framer-motion",
      "Category-based portfolio filtering",
      "Contact & booking inquiry form",
      "Mobile-first responsive design",
    ],
    results: "A beautiful digital presence that showcases creative work with the visual impact it deserves — driving client inquiries through an elegant, fast-loading portfolio.",
    timeline: "4 weeks",
    teamSize: "2 developers, 1 designer",
  },
  {
    title: "Hotel The Mumbai Resort",
    tagline: "Hotel, Banquet Hall & Restaurant",
    description:
      "Website for Hotel The Mumbai Resort in Kolaras, Shivpuri (MP). The property's AC rooms, poolside deck, wedding and kitty-party banquet halls, and home-style restaurant are presented with a full gallery, guest reviews and FAQs — with bookings handled directly over WhatsApp.",
    url: "https://hotelthemumbairesort.com/",
    tech: ["Next.js", "Tailwind CSS", "WhatsApp Booking", "Local SEO", "Responsive Design"],
    gradient: "from-stone-700 via-amber-600 to-orange-500",
    accent: "#B45309",
    features: [
      "Room and suite showcase with photo galleries",
      "Banquet, wedding and kitty-party hall pages",
      "Restaurant and home-style dining section",
      "One-tap WhatsApp booking enquiries",
      "Guest reviews and FAQ with structured data",
      "Local SEO for Shivpuri / Kolaras searches",
    ],
  },
  {
    title: "Dabbik",
    tagline: "Mess & Tiffin Marketplace + Kitchen Console",
    description:
      "A two-sided platform for daily food: students and professionals compare verified messes and doorstep tiffin services with live menus and honest prices, while kitchens get a console covering QR attendance, member plans, tiffin delivery and accounts in one place.",
    url: "https://dabbik.com/",
    screenshot: "/images/portfolio/dabbik.jpg",
    tech: ["Next.js", "PostgreSQL", "QR Attendance", "Tailwind CSS", "Role-based Access"],
    gradient: "from-lime-600 via-green-600 to-emerald-600",
    accent: "#16A34A",
    features: [
      "Verified mess and tiffin discovery",
      "Live menus and price comparison",
      "Kitchen console with QR attendance",
      "Member plans and subscription tracking",
      "Tiffin delivery and accounts management",
    ],
  },
  {
    title: "Worm Cleaner",
    tagline: "Open-Source Mac & Windows Storage Cleaner",
    description:
      "A free, MIT-licensed desktop cleaner for macOS and Windows. It purges Xcode DerivedData, npm, Homebrew and Cargo caches, removes app leftovers, uninstalls apps completely and monitors CPU/RAM — built native in Swift and .NET, with no telemetry and safe-by-default rules.",
    url: "https://worm.clepsydratechnologies.com/",
    screenshot: "/images/portfolio/worm.jpg",
    tech: ["Swift (macOS)", ".NET / C# (Windows)", "MIT Licensed", "No Telemetry"],
    gradient: "from-cyan-700 via-teal-600 to-emerald-500",
    accent: "#0891B2",
    features: [
      "Clears Xcode DerivedData and developer caches",
      "npm, Homebrew and Cargo cache cleanup",
      "Complete app uninstall with leftover removal",
      "Live CPU and RAM monitoring",
      "Native builds for macOS and Windows",
      "Open source under MIT, no telemetry",
    ],
  },
  {
    title: "ORVOPS HMS",
    tagline: "Hospital Management — ORVOPS ERP & Management Suite",
    description:
      "ORVOPS HMS is part of ORVOPS, Clepsydra Technologies' own ERP and management software suite. This multi-tenant hospital management system serves multiple hospitals from one deployment with isolated data — covering patient records, appointments, billing and role-based staff access behind a secure login.",
    url: "https://hms.orvops.com/",
    screenshot: "/images/portfolio/hms-orvops.jpg",
    tech: ["Next.js", "PostgreSQL", "Multi-Tenant Architecture", "Tailwind CSS", "Role-based Access"],
    gradient: "from-sky-800 via-blue-700 to-indigo-600",
    accent: "#1D4ED8",
    features: [
      "Part of ORVOPS, Clepsydra's ERP & management suite",
      "Multi-tenant isolation per hospital",
      "Patient registration and medical records",
      "Appointments and department scheduling",
      "Billing and invoicing workflows",
      "Role-based access for doctors, staff and admins",
      "Secure authentication with audit trails",
    ],
  },
  {
    title: "Clepsydra ERP",
    tagline: "AI-Powered ERP & Lead Generation Platform",
    description:
      "Our own ERP and lead-generation platform: sales pipeline, operations and reporting in a single console, with AI assistance and secure role-based sign-in — the internal system we run Clepsydra Technologies on.",
    url: "https://erp.clepsydratechnologies.com/",
    screenshot: "/images/portfolio/clepsydra-erp.jpg",
    tech: ["Next.js", "PostgreSQL", "AI-Assisted Workflows", "Tailwind CSS", "JWT Auth"],
    gradient: "from-violet-800 via-purple-700 to-fuchsia-600",
    accent: "#7C3AED",
    features: [
      "Lead capture and pipeline tracking",
      "AI-assisted content and outreach",
      "Operational dashboards and reporting",
      "Role-based access control",
      "Secure JWT authentication",
    ],
  },
];

const designCategories: DesignCategory[] = [
  {
    title: "E-Commerce & Retail",
    description:
      "Full-featured online stores with product catalogs, inventory management, secure payment gateways, and admin dashboards. Built for scale and conversion.",
    capabilities: [
      "Product catalog with search & filtering",
      "Cart, checkout & multiple payment gateways",
      "Order management & inventory tracking",
      "Customer accounts & wishlists",
      "Admin dashboard with sales analytics",
    ],
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    icon: <ShoppingCart className="size-5" />,
    previewImage: "/images/cat-ecommerce.jpg",
    showcaseLinks: [
      { label: "Awwwards — E-Commerce", url: "https://www.awwwards.com/websites/ecommerce/", icon: <Award className="size-3.5" /> },
      { label: "Behance — E-Commerce UI", url: "https://www.behance.net/search/projects/ecommerce%20web%20design", icon: <Palette className="size-3.5" /> },
    ],
  },
  {
    title: "SaaS & Data Dashboards",
    description:
      "Web applications with real-time data visualization, user management, subscription billing, and role-based access. Perfect for platforms and internal tools.",
    capabilities: [
      "User authentication & role-based access",
      "Real-time data visualization & charts",
      "Subscription & billing integration",
      "API development & third-party integrations",
      "Admin panels with analytics",
    ],
    gradient: "from-violet-700 via-purple-600 to-indigo-500",
    icon: <BarChart className="size-5" />,
    previewImage: "/images/cat-saas.jpg",
    showcaseLinks: [
      { label: "Awwwards — SaaS", url: "https://www.awwwards.com/websites/saas/", icon: <Award className="size-3.5" /> },
      { label: "Dribbble — Dashboard UI", url: "https://dribbble.com/search/saas-dashboard", icon: <Codepen className="size-3.5" /> },
    ],
  },
  {
    title: "Brand & Corporate Websites",
    description:
      "Professional company websites with modern design, content management, lead capture forms, and SEO optimization. Tailored to your brand identity.",
    capabilities: [
      "Custom design aligned with brand identity",
      "Content management & blog integration",
      "Lead generation forms & CRM integration",
      "SEO optimization & analytics",
      "Multilingual & accessibility support",
    ],
    gradient: "from-blue-700 via-sky-600 to-cyan-500",
    icon: <Briefcase className="size-5" />,
    previewImage: "/images/cat-corporate.jpg",
    showcaseLinks: [
      { label: "Awwwards — Corporate", url: "https://www.awwwards.com/websites/corporate/", icon: <Award className="size-3.5" /> },
      { label: "Behance — Brand Sites", url: "https://www.behance.net/search/projects/corporate%20website", icon: <Palette className="size-3.5" /> },
    ],
  },
];

function PreviewFrame({ project }: { project: LiveProject }) {
  if (project.screenshot) {
    return (
      <div className="relative w-full aspect-video bg-[#F1F5F9] overflow-hidden">
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return <LiveFrame url={project.url} title={project.title} />;
}

function LiveProjectDetail({ project, index }: { project: LiveProject; index: number }) {
  const isReversed = index % 2 === 1;
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col lg:flex-row gap-10 ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Preview */}
      <div className="flex-1 min-w-0">
        <div className="rounded-xl overflow-hidden bg-white shadow-brand-md border border-[#E5EAF4] hover:shadow-xl transition-shadow duration-300">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            aria-label={`Open ${project.title} preview`}
            className="group/preview relative block w-full text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F1F5F9] border-b border-[#E5EAF4]">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex items-center justify-center min-w-0">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-[#E5EAF4] max-w-[90%]">
                  <Globe className="size-3 text-muted-foreground shrink-0" />
                  <span className="font-body text-xs text-muted-foreground truncate">
                    {project.url.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </div>
            </div>
            <PreviewFrame project={project} />
            <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-brand-navy-deep/90 px-3 py-1.5 font-heading text-xs font-semibold text-white opacity-0 group-hover/preview:opacity-100 transition-opacity">
              <Eye className="size-3.5" />
              Open preview
            </span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy-deep mb-1">
          {project.title}
        </h3>
        <p className="font-body text-sm text-brand-blue font-medium mb-4">
          {project.tagline}
        </p>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>

        {(project.timeline || project.teamSize) && (
          <div className="flex flex-wrap gap-4 mb-6">
            {project.timeline && (
              <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <Clock className="size-4 text-brand-sky" />
                {project.timeline}
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <Users className="size-4 text-brand-sky" />
                {project.teamSize}
              </div>
            )}
          </div>
        )}

        <div className="mb-6">
          <h4 className="font-heading text-sm font-semibold text-brand-navy-deep mb-3 flex items-center gap-2">
            <Star className="size-4 text-brand-sky" />
            Key Features
          </h4>
          <ul className="space-y-2">
            {project.features.map((f) => (
              <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                <ChevronRight className="size-4 text-brand-sky shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {project.results && (
          <div className="mb-6 p-4 bg-[#EEF6FD] rounded-lg border border-brand-sky/20">
            <p className="font-body text-sm text-brand-navy leading-relaxed">
              <span className="font-semibold">Impact: </span>
              {project.results}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="font-body text-[11px] font-medium text-brand-navy bg-[#EEF6FD] px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => setPreviewOpen(true)}
            className="rounded-button font-heading font-semibold border-brand-navy-deep/20 text-brand-navy-deep hover:bg-brand-navy-deep hover:text-white"
          >
            <Eye className="size-4 mr-2" />
            Preview
          </Button>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-button bg-brand-navy-deep text-white font-heading font-semibold hover:bg-brand-navy">
              <ExternalLink className="size-4 mr-2" />
              Visit Live Site
            </Button>
          </a>
        </div>
      </div>

      <LivePreviewModal project={project} open={previewOpen} onOpenChange={setPreviewOpen} />
    </motion.div>
  );
}

function CategoryCard({ category, index }: { category: DesignCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="rounded-xl overflow-hidden bg-white shadow-brand-sm border border-[#E5EAF4] hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
        <div className={`bg-gradient-to-br ${category.gradient} px-6 py-8 flex items-center gap-4`}>
          <div className="size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
            {category.icon}
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">{category.title}</h3>
            <p className="font-body text-sm text-white/70">Design & Development</p>
          </div>
        </div>

        {category.previewImage && (
          <div className="relative aspect-[16/9] bg-[#FAFAFA] border-b border-[#E5EAF4] overflow-hidden">
            <Image
              src={category.previewImage}
              alt={`${category.title} example`}
              fill
              className="object-contain p-1"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
            {category.description}
          </p>
          <div className="space-y-2 mb-6 flex-1">
            {category.capabilities.map((c) => (
              <div key={c} className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-brand-sky mt-2 shrink-0" />
                <span className="font-body text-sm text-brand-navy">{c}</span>
              </div>
            ))}
          </div>

          {/* Showcase reference links */}
          <div className="mb-5 pt-4 border-t border-[#E5EAF4]">
            <p className="font-body text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
              Design References
            </p>
            <div className="flex flex-col gap-1.5">
              {category.showcaseLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-xs text-brand-blue hover:text-brand-navy transition-colors"
                >
                  {link.icon}
                  {link.label}
                  <ExternalLink className="size-3 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <Link href="/#contact">
            <Button
              variant="outline"
              className="rounded-button font-heading font-semibold w-full border-brand-navy-deep/20 text-brand-navy-deep hover:bg-brand-navy-deep hover:text-white"
            >
              Get a Similar Website
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioPageClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="section-label-light">
                Our Portfolio
              </div>
              <h1 className="font-heading text-[2.5rem] md:text-[3.5rem] font-bold text-white mt-4 mb-4 leading-[1.1]">
                Websites & Platforms
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-sky-light">
                  We&apos;ve Built
                </span>
              </h1>
              <p className="font-body text-lg text-white/70 max-w-[600px]">
                Websites and platforms we&apos;ve designed and delivered. Click any preview to open it larger, or head straight to the live site.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Live Projects */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">Delivered Projects</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Live Websites
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                Click any preview to open it larger, then explore the features, tech stack and results.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-20">
              {liveProjects.map((project, i) => (
                <LiveProjectDetail key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Design Categories */}
        <section className="py-16 md:py-20 bg-surface-off">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">What We Can Build</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Solutions We Specialize In
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                Browse design references on Awwwards, Behance, and Dribbble to explore the quality and style we deliver.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {designCategories.map((category, i) => (
                <CategoryCard key={category.title} category={category} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy-deep mb-4">
                Want a Website Like These?
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px] mx-auto mb-8">
                Let&apos;s build something great together. Share your vision and we&apos;ll turn it into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact">
                  <Button className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 h-12 px-8 text-base">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="rounded-button font-heading font-semibold h-12 px-8 text-base"
                  >
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
