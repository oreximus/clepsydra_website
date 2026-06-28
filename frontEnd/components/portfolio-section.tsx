"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, ArrowRight, ShoppingCart, BarChart, Briefcase, Award, Palette, Codepen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface PortfolioProject {
  title: string;
  tagline: string;
  description: string;
  url: string;
  screenshots: string[];
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
    screenshots: ["/images/tailsinfo_web1.png"],
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
    screenshots: ["/images/trikal_security_web.png"],
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
    screenshots: ["/images/gulshankhalkho-web1.png"],
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Responsive Design"],
    gradient: "from-rose-700 via-pink-600 to-purple-500",
    accent: "#BE185D",
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

function ScreenshotPreview({ project }: { project: PortfolioProject }) {
  return (
    <div className="relative w-full bg-[#F1F5F9] overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image
          src={project.screenshots[0]}
          alt={`${project.title} screenshot`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F1F5F9] to-transparent pointer-events-none" />
    </div>
  );
}

function LiveProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="rounded-xl overflow-hidden bg-white shadow-brand-md border border-[#E5EAF4] hover:shadow-xl transition-shadow duration-300">
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

        {/* Screenshot preview */}
        <ScreenshotPreview project={project} />

        {/* Info bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-bold text-brand-navy-deep">{project.title}</h3>
            <p className="font-body text-xs text-brand-blue font-medium mt-0.5">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="font-body text-[10px] font-medium text-brand-navy bg-[#EEF6FD] px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="rounded-button font-heading font-semibold bg-brand-navy-deep text-white hover:bg-brand-navy ml-1">
                <ExternalLink className="size-3.5 mr-1" />
                Live Site
              </Button>
            </a>
          </div>
        </div>
      </div>
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
  return (
    <section className="py-20 md:py-24 bg-surface-off relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sky/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-3xl pointer-events-none" />

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
            Screenshots of real websites delivered for real clients. Click through to explore each live site.
          </p>
        </motion.div>

        <div className="space-y-10 mb-16">
          {liveProjects.map((project, i) => (
            <LiveProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <a href="/portfolio">
            <Button className="rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 h-12 px-8 text-base">
              View Full Portfolio
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
