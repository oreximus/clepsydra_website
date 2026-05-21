"use client";

import Link from "next/link";
import Image from "next/image";
import {
  PhoneCall,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
} from "lucide-react";

const services = [
  { label: "Web Development", href: "/#services" },
  { label: "Mobile Apps", href: "/#services" },
  { label: "AI Automation", href: "/#services" },
  { label: "Data Analytics", href: "/#services" },
];

const company = [
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Explore", href: "/clepsydra_links" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/clepsydratechnologies/",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/clepsydra_technologies",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/clepsydra-technologies/",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="font-heading text-xs font-semibold tracking-[0.12em] text-brand-sky uppercase">
        {children}
      </h4>
      <div className="w-8 h-px bg-brand-sky opacity-40 mt-1.5" />
    </div>
  );
}

function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-1.5 font-body text-sm text-white/65 hover:text-white transition-all duration-200"
      >
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          {children}
        </span>
        <ChevronRight className="size-3 text-brand-sky opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-1 group-hover:ml-0" />
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer>
      {/* ===== ZONE 1: ACCENT BAR ===== */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #1A3A8A 0%, #4A9DE8 50%, #1A3A8A 100%)",
        }}
      />

      {/* ===== ZONE 2: MAIN BODY ===== */}
      <div className="bg-brand-navy-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 lg:gap-12">
            {/* --- COL 1: BRAND --- */}
            <div className="flex flex-col md:items-start md:text-left max-md:items-center max-md:text-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-icon-transparent.png"
                  alt="Clepsydra Technologies"
                  width={52}
                  height={52}
                  className="size-13"
                />
                <div>
                  <span className="font-heading font-bold text-white text-xl">
                    Clepsydra
                  </span>
                  <span className="font-heading font-bold text-brand-sky text-xl ml-1.5">
                    Technologies
                  </span>
                </div>
              </div>
              <p className="font-body text-sm text-white/55 italic mt-3">
                Timeless Precision, Modern Solutions
              </p>
              <p className="font-body text-sm text-white/50 leading-relaxed mt-4 max-w-xs max-md:mx-auto">
                We build software that works with the precision of a timepiece
                — delivering modern digital solutions for businesses ready to
                move forward.
              </p>
              <div className="flex items-center gap-2.5 mt-6 max-md:justify-center">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.backgroundColor = "rgba(74,157,232,0.25)";
                        el.style.borderColor = "rgba(74,157,232,0.5)";
                        el.style.color = "#4A9DE8";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.backgroundColor = "rgba(255,255,255,0.08)";
                        el.style.borderColor = "rgba(255,255,255,0.12)";
                        el.style.color = "rgba(255,255,255,0.7)";
                      }}
                    >
                      <Icon size={15} />
                      <span className="sr-only">{s.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* --- COL 2: SERVICES --- */}
            <div className="max-md:text-center">
              <ColumnHeader>Services</ColumnHeader>
              <ul className="space-y-3">
                {services.map((s) => (
                  <LinkItem key={s.label} href={s.href}>
                    {s.label}
                  </LinkItem>
                ))}
              </ul>
            </div>

            {/* --- COL 3: COMPANY --- */}
            <div className="max-md:text-center">
              <ColumnHeader>Company</ColumnHeader>
              <ul className="space-y-3">
                {company.map((c) => (
                  <LinkItem key={c.label} href={c.href}>
                    {c.label}
                  </LinkItem>
                ))}
              </ul>
            </div>

            {/* --- COL 4: CONTACT --- */}
            <div className="max-md:text-center">
              <ColumnHeader>Contact</ColumnHeader>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+916267665525"
                    className="flex items-start gap-3 font-body text-sm text-white/70 hover:text-white transition-colors duration-200 max-md:justify-center max-md:text-center"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 max-md:hidden"
                      style={{
                        backgroundColor: "rgba(74,157,232,0.15)",
                      }}
                    >
                      <PhoneCall size={15} className="text-brand-sky" />
                    </span>
                    <span className="pt-0.5">+91 6267665525</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:clepsydratechnologies@gmail.com"
                    className="flex items-start gap-3 font-body text-sm text-white/70 hover:text-white transition-colors duration-200 max-md:justify-center"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 max-md:hidden"
                      style={{
                        backgroundColor: "rgba(74,157,232,0.15)",
                      }}
                    >
                      <Mail size={15} className="text-brand-sky" />
                    </span>
                    <span className="pt-0.5 break-all">
                      clepsydratechnologies@gmail.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="http://wa.me/916267665525"
                    className="flex items-start gap-3 font-body text-sm text-white/70 hover:text-white transition-colors duration-200 max-md:justify-center"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 max-md:hidden"
                      style={{
                        backgroundColor: "rgba(34,197,94,0.15)",
                      }}
                    >
                      <MessageCircle size={15} className="text-[#4ADE80]" />
                    </span>
                    <span className="pt-0.5">Chat on WhatsApp</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ZONE 3: BOTTOM BAR ===== */}
      <div className="py-5 px-6 lg:px-8 bg-brand-navy-deep border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-white/45">
            &copy; {new Date().getFullYear()} Clepsydra Technologies. All
            rights reserved.
          </p>
          <div className="flex items-center gap-2 font-body text-xs text-white/45">
            <Link
              href="#"
              className="hover:text-white/75 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link
              href="#"
              className="hover:text-white/75 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
