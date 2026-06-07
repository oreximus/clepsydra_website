"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Facebook,
  Linkedin,
  Instagram,
  Globe,
  ChevronRight,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const links = [
  {
    title: "Visit Our Website",
    description: "Learn more about our services and portfolio",
    url: "/",
    icon: Globe,
    external: false,
  },
  {
    title: "Project Proposal Form",
    description: "Submit your project requirements",
    url: "https://forms.gle/W1u3XJPJXBXhQVR78",
    icon: FileText,
    external: true,
  },
  {
    title: "WhatsApp Chat",
    description: "Quick chat for immediate assistance",
    url: "http://wa.me/916267665525",
    icon: MessageCircle,
    external: true,
  },
  {
    title: "Call Us",
    description: "+91 6267665525",
    url: "tel:+916267665525",
    icon: Phone,
    external: true,
  },
  {
    title: "Email Us",
    description: "clepsydratechnologies@gmail.com",
    url: "mailto:clepsydratechnologies@gmail.com",
    icon: Mail,
    external: true,
  },
];

const socialLinks = [
  {
    title: "Facebook",
    url: "https://www.facebook.com/clepsydratechnologies/",
    icon: Facebook,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/company/clepsydra-technologies/",
    icon: Linkedin,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/clepsydra_technologies",
    icon: Instagram,
  },
];

export function ClepsydraLinksClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-surface-off to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-sky/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-3xl pointer-events-none" />

      <header className="relative z-10">
        <div className="max-w-lg mx-auto flex h-14 items-center px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand-navy transition-colors font-body font-medium"
          >
            <ArrowLeft className="size-3.5" />
            Back to Website
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-lg mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-8 pb-10"
        >
          <div className="flex justify-center mb-6">
            <div className="size-20 rounded-full bg-white shadow-brand-md border border-[#E5EAF4] flex items-center justify-center">
              <Image
                src="/images/logo-icon-transparent.png"
                alt="Clepsydra Technologies"
                width={48}
                height={48}
                className="size-12"
                priority
              />
            </div>
          </div>
          <h1 className="font-heading text-xl font-bold text-brand-navy-deep mb-1">
            Clepsydra Technologies
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Timeless Precision, Modern Solutions
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3 mb-10"
        >
          {links.map((link, i) => {
            const Icon = link.icon;
            const shared = (
              <div className="group relative flex items-center gap-4 px-5 py-4 rounded-xl bg-white border border-[#E5EAF4] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <div className="size-11 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-sky/10 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:from-brand-blue group-hover:to-brand-sky group-hover:text-white transition-all duration-300">
                  <Icon className="size-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-heading text-sm font-semibold text-brand-navy-deep block">
                    {link.title}
                  </span>
                  <span className="font-body text-xs text-muted-foreground block truncate mt-0.5">
                    {link.description}
                  </span>
                </div>
                <ChevronRight className="size-4 text-brand-blue/60 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            );

            return (
              <motion.div key={i} variants={item}>
                {link.external ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {shared}
                  </a>
                ) : (
                  <Link href={link.url}>{shared}</Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 justify-center mb-5">
            <span className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-[#E5EAF4]" />
            <span className="font-body text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Follow Us
            </span>
            <span className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-[#E5EAF4]" />
          </div>
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-11 rounded-full bg-white border border-[#E5EAF4] flex items-center justify-center text-muted-foreground hover:text-brand-blue hover:border-brand-blue/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    title={social.title}
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-10 pt-6 border-t border-[#E5EAF4] font-body text-[11px] text-muted-foreground"
        >
          &copy; {new Date().getFullYear()} Clepsydra Technologies. All rights reserved.
        </motion.p>
      </main>
    </div>
  );
}
