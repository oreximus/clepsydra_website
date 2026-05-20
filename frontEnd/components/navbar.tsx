"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/quote-modal";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
  { href: "/clepsydra_links", label: "Explore" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-brand-sm"
          : "bg-white/80 backdrop-blur-md border-b border-[#E5EAF4]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 md:h-[72px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/images/logo-icon-transparent.png"
            alt="Clepsydra Technologies"
            width={40}
            height={40}
            priority
            className="size-9 md:size-10"
          />
          <span className="font-heading font-bold text-brand-navy-deep text-lg md:text-xl leading-none">
            Clepsydra
            <span className="hidden sm:inline font-normal text-brand-blue ml-1.5">
              Technologies
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-medium text-[#374151] hover:text-[#1A3A8A] transition-all duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#1A3A8A] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={() => setQuoteOpen(true)}
            className="rounded-button bg-brand-gradient text-white font-heading font-semibold px-5 py-2.5 shadow-brand-md hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
          >
            Request a Quote
            <ArrowRight className="ml-1.5 size-4" />
          </Button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0D1B3E]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-[#E5EAF4] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-base font-medium text-[#374151] hover:text-[#1A3A8A] py-3 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => { setQuoteOpen(true); setMobileMenuOpen(false); }}
                className="mt-2 rounded-button bg-brand-gradient text-white font-heading font-semibold w-full shadow-brand-md hover:brightness-110 transition-all duration-200"
              >
                Request a Quote
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </header>
  );
}
