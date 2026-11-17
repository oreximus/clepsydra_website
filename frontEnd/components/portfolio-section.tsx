"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, ArrowRight, Eye, ShoppingCart, BarChart, Briefcase, Award, Palette, Codepen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LiveFrame, LivePreviewModal } from "@/components/live-preview-modal";

export interface PortfolioProject {
  title: string;
  tagline: string;
  description: string;
  url: string;
  /** Static image used when the site cannot be embedded (login-only or X-Frame-Options blocked) */
  screenshot?: string;
  tech: string[];
  gradient: string;
  accent: string;
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

const liveProjects: PortfolioProject[] = [
  {
    title: "TailsInfo",
    tagline: "Pet QR Digital Identity Platform",
    description:
      "A platform that gives every pet a unique QR-based digital identity. Helps reunite lost pets with their owners, maintain health records, and connect with a pet community — all through a simple QR scan.",
    url: "https://tailsinfo.com/",
    screenshot: "/images/portfolio/tailsinfo.jpg",
    tech: ["Next.js", "PostgreSQL", "QR Code API", "Tailwind CSS", "Cloud Hosting"],
    gradient: "from-amber-600 via-orange-500 to-rose-500",
    accent: "#D97706",
  },
  {
    title: "Trikal Security",
    tagline: "Comprehensive Security Solutions",
    description:
      "Professional security services website for a firm staffed by ex-NSG, ex-Special Forces, and ex-Military personnel. Serving banks, construction sites, and commercial establishments across India with ISO certified quality standards.",
    url: "https://www.trikalsecurity.com/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "SEO Optimized"],
    gradient: "from-slate-900 via-slate-800 to-slate-700",
    accent: "#0F172A",
  },
  {
    title: "Gulshan Khalkho Studio",
    tagline: "Photography Portfolio & Creative Studio",
    description:
      "A visually stunning photography portfolio website showcasing creative work with immersive galleries, smooth transitions, and a minimalist design that puts the imagery front and center.",
    url: "https://www.gulshankhalkho.studio/",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Responsive Design"],
    gradient: "from-rose-700 via-pink-600 to-purple-500",
    accent: "#BE185D",
  },
  {
    title: "Hotel The Mumbai Resort",
    tagline: "Hotel, Banquet Hall & Restaurant",
    description:
      "Website for Hotel The Mumbai Resort in Kolaras, Shivpuri (MP). AC rooms, a poolside deck, wedding and kitty-party banquet halls, and home-style dining — guests browse the property, read reviews and FAQs, and book directly over WhatsApp.",
    url: "https://hotelthemumbairesort.com/",
    tech: ["Next.js", "Tailwind CSS", "WhatsApp Booking", "Local SEO", "Responsive Design"],
    gradient: "from-stone-700 via-amber-600 to-orange-500",
    accent: "#B45309",
  },
  {
    title: "Dabbik",
    tagline: "Mess & Tiffin Marketplace + Kitchen Console",
    description:
      "A marketplace where students and professionals compare verified messes and doorstep tiffin services with live menus and honest prices — plus a console for kitchens covering QR attendance, member plans, tiffin delivery and accounts.",
    url: "https://dabbik.com/",
    screenshot: "/images/portfolio/dabbik.jpg",
    tech: ["Next.js", "PostgreSQL", "QR Attendance", "Tailwind CSS", "Role-based Access"],
    gradient: "from-lime-600 via-green-600 to-emerald-600",
    accent: "#16A34A",
  },
  {
    title: "Worm Cleaner",
    tagline: "Open-Source Mac & Windows Storage Cleaner",
    description:
      "A free, MIT-licensed desktop cleaner for macOS and Windows. Purges Xcode DerivedData, npm, Homebrew and Cargo caches, removes app leftovers, uninstalls apps completely and monitors CPU/RAM — native Swift and .NET, with no telemetry.",
    url: "https://worm.clepsydratechnologies.com/",
    screenshot: "/images/portfolio/worm.jpg",
    tech: ["Swift (macOS)", ".NET / C# (Windows)", "MIT Licensed", "No Telemetry"],
    gradient: "from-cyan-700 via-teal-600 to-emerald-500",
    accent: "#0891B2",
  },
  {
    title: "ORVOPS HMS",
    tagline: "Multi-Tenant Hospital Management System",
    description:
      "An enterprise hospital management system built by Clepsydra. Multi-tenant by design — one deployment serving multiple hospitals with isolated data — covering patient records, appointments, billing and role-based staff access behind a secure login.",
    url: "https://hms.orvops.com/",
    screenshot: "/images/portfolio/hms-orvops.jpg",
    tech: ["Next.js", "PostgreSQL", "Multi-Tenant Architecture", "Tailwind CSS", "Role-based Access"],
    gradient: "from-sky-800 via-blue-700 to-indigo-600",
    accent: "#1D4ED8",
  },
  {
    title: "Clepsydra ERP",
    tagline: "AI-Powered ERP & Lead Generation Platform",
    description:
      "Our own ERP and lead-generation platform: sales pipeline, operations and reporting in a single console, with AI assistance and secure role-based sign-in for the whole team.",
    url: "https://erp.clepsydratechnologies.com/",
    screenshot: "/images/portfolio/clepsydra-erp.jpg",
    tech: ["Next.js", "PostgreSQL", "AI-Assisted Workflows", "Tailwind CSS", "JWT Auth"],
    gradient: "from-violet-800 via-purple-700 to-fuchsia-600",
    accent: "#7C3AED",
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

function PreviewFrame({ project }: { project: PortfolioProject }) {
  if (project.screenshot) {
    return (
      <div className="relative w-full aspect-video bg-[#F1F5F9] overflow-hidden">
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
    );
  }

  return <LiveFrame url={project.url} title={project.title} />;
}

function LiveProjectCard({ project }: { project: PortfolioProject }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div>
      <div className="rounded-xl overflow-hidden bg-white shadow-brand-md border border-[#E5EAF4] hover:shadow-xl transition-shadow duration-300">
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          aria-label={`Open ${project.title} preview`}
          className="group/preview relative block w-full text-left cursor-pointer"
        >
          {/* Browser Chrome */}
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

        <div className="flex flex-col items-start gap-3 p-5">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-bold text-brand-navy-deep">{project.title}</h3>
            <p className="font-body text-xs text-brand-blue font-medium mt-0.5">{project.tagline}</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="font-body text-[10px] font-medium text-brand-navy bg-[#EEF6FD] px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPreviewOpen(true)}
              className="rounded-button font-heading font-semibold border-brand-navy-deep/20 text-brand-navy-deep hover:bg-brand-navy-deep hover:text-white ml-auto"
            >
              <Eye className="size-3.5 mr-1" />
              Preview
            </Button>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="rounded-button font-heading font-semibold bg-brand-navy-deep text-white hover:bg-brand-navy">
                <ExternalLink className="size-3.5 mr-1" />
                Live Site
              </Button>
            </a>
          </div>
        </div>
      </div>

      <LivePreviewModal project={project} open={previewOpen} onOpenChange={setPreviewOpen} />
    </div>
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

          <a href="/#contact">
            <Button
              variant="outline"
              className="rounded-button font-heading font-semibold w-full border-brand-navy-deep/20 text-brand-navy-deep hover:bg-brand-navy-deep hover:text-white"
            >
              <ArrowRight className="size-4 mr-1.5" />
              Get a Similar Website
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setMaxX(Math.max(0, track.scrollWidth - track.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Page scroll drives the strip sideways while the section is pinned, then the page moves on.
  useEffect(() => {
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!pin || !viewport || !track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const span = pin.offsetHeight - viewport.offsetHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / span)) : 0;
      track.style.transform = `translate3d(${-maxX * progress}px, 0, 0)`;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [maxX]);

  return (
    <section className="py-20 md:py-24 bg-surface-off relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sky/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="section-label">Our Portfolio</div>
          <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
            Websites We&apos;ve Built
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-[650px]">
            Websites and platforms delivered for real clients. Click any preview to open it larger, or head straight to the live site.
          </p>
          <a href="/portfolio" className="mt-6">
            <Button className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 h-12 px-8 text-base">
              View Full Portfolio
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </a>
        </motion.div>
      </div>

      <div ref={pinRef} className="relative" style={{ height: maxX ? `calc(100svh + ${maxX}px)` : "100svh" }}>
        <div ref={viewportRef} className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div ref={trackRef} role="region" aria-label="Client project previews" className="flex gap-6">
              {liveProjects.map((project) => (
                <div key={project.title} className="w-[85vw] max-w-[560px] shrink-0 sm:w-[560px]">
                  <LiveProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="section-label">What We Can Build</div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy-deep mt-4 mb-4">
            Services You Can Trust
          </h3>
          <p className="font-body text-lg text-muted-foreground max-w-[600px]">
            Browse design references on Awwwards, Behance, and Dribbble to see the quality and style we deliver.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {designCategories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
