"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Code,
  Smartphone,
  Zap,
  BarChart,
  Brain,
  Palette,
  Users,
  TestTube,
  Clock,
  Lightbulb,
  Layers,
  Rocket,
  Sparkles,
  Star,
  Quote,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { ServiceQueryModal } from "@/components/service-query-modal";
import { Navbar } from "@/components/navbar";
import dynamic from "next/dynamic";

const TechStackSection = dynamic(() => import("@/components/tech-stack"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-wrap justify-center gap-3">
      {["React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "Figma"].map((t) => (
        <span key={t} className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-navy bg-white border border-[#E5EAF4] rounded-pill px-4 py-2 shadow-brand-sm">
          {t}
        </span>
      ))}
    </div>
  ),
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Website Development",
    description: "Custom web applications and responsive websites built with modern technologies.",
    icon: <Code className="size-5" />,
  },
  {
    title: "Mobile App Development",
    description: "Native Android and iOS applications designed for optimal user experience.",
    icon: <Smartphone className="size-5" />,
  },
  {
    title: "Python Scripting & Automation",
    description: "Automated workflows and custom scripts to streamline your business processes.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Data Analytics",
    description: "Transform your data into actionable insights with advanced analytics solutions.",
    icon: <BarChart className="size-5" />,
  },
  {
    title: "AI Automation & Workflows",
    description: "Intelligent automation solutions to optimize your business operations.",
    icon: <Brain className="size-5" />,
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience and engagement.",
    icon: <Palette className="size-5" />,
  },
  {
    title: "Software Consultancy",
    description: "Expert guidance on software architecture, design patterns, and best practices.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Application Testing",
    description: "Comprehensive testing services including security audits and code quality assurance.",
    icon: <TestTube className="size-5" />,
  },
];

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your vision, goals, and requirements to map out a clear roadmap for success.",
    icon: <Lightbulb className="size-6" />,
  },
  {
    number: "02",
    title: "Design",
    description: "Our team crafts intuitive architectures and stunning interfaces tailored to your users.",
    icon: <Layers className="size-6" />,
  },
  {
    number: "03",
    title: "Develop",
    description: "We build your solution iteratively with clean code, regular updates, and complete transparency.",
    icon: <Code className="size-6" />,
  },
  {
    number: "04",
    title: "Deliver",
    description: "We launch, test, and support your product — ensuring it performs flawlessly at scale.",
    icon: <Rocket className="size-6" />,
  },
];

const testimonials = [
  {
    quote: "Clepsydra transformed our outdated systems into a modern, scalable platform. Their precision and communication throughout the process was exceptional.",
    author: "Sarah Johnson",
    role: "Project Manager, TechCorp",
    rating: 5,
  },
  {
    quote: "The AI automation solutions they built saved us over 30 hours of manual work per week. The ROI was immediate and the quality outstanding.",
    author: "Michael Chen",
    role: "CTO, GrowthLabs",
    rating: 5,
  },
  {
    quote: "From concept to deployment, Clepsydra delivered a polished mobile app that our users love. Their UI/UX expertise really sets them apart.",
    author: "Emily Rodriguez",
    role: "Founder, StartupX",
    rating: 5,
  },
];



const heroWords = [
  "Modern Software",
  "Scalable Systems",
  "Clean Code",
  "Digital Solutions",
  "Cloud-Native Apps",
  "Smart Automation",
  "Robust Platforms",
];

function AnimatedHeroText() {
  const [displayedText, setDisplayedText] = useState(heroWords[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % heroWords.length;
        setDisplayedText(heroWords[indexRef.current]);
        setIsTransitioning(false);
      }, 450);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex items-baseline">
      <span
        className={
          `inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-sky-light bg-[length:200%_100%] animate-gradient-shimmer transition-all duration-500 ease-out ` +
          (isTransitioning
            ? "opacity-0 -translate-y-3 blur-sm scale-[0.97]"
            : "opacity-100 translate-y-0 blur-0 scale-100")
        }
      >
        {displayedText}
      </span>
      <span className="inline-block w-[3px] h-[0.85em] bg-brand-sky-light ml-1 rounded-sm animate-cursor-blink align-middle" />
    </span>
  );
}

export default function LandingPageClient() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero_section_vid.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/90 via-brand-navy-deep/70 to-brand-navy-deep/80" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
          <Image
            src="/images/logo-icon-transparent.png"
            alt=""
            width={400}
            height={400}
            className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden lg:block"
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full animate-fade-in-up">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-heading font-semibold tracking-wider animate-glow-pulse">
                <Clock className="size-3.5 text-brand-sky" />
                Timeless Precision, Modern Solutions
              </div>
              <h1 className="font-heading text-[44px] md:text-[72px] font-bold text-white leading-[1.1] mb-6">
                Precision Engineering for{" "}
                <br className="sm:hidden" />
                <AnimatedHeroText />
              </h1>
              <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
                We turn complex ideas into elegant, scalable solutions. From web and mobile to AI automation —
                Clepsydra delivers with timeless precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="group rounded-button bg-white text-brand-navy font-heading font-semibold h-12 px-8 text-base shadow-brand-md hover:bg-brand-sky-light hover:text-white transition-all duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-button border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/15 h-12 px-8 text-base font-heading font-semibold transition-all duration-300"
                >
                  View Our Work
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-white/50 font-body">
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-brand-sky" />
                  Free consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-brand-sky" />
                  Custom solutions
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-brand-sky" />
                  Expert support
                </span>
              </div>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce-subtle">
            <ChevronDown className="size-6" />
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section className="bg-white border-y border-[#E5EAF4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "8+", label: "Core Services" },
                { value: "20+", label: "Projects Delivered" },
                { value: "5+", label: "Tech Stacks" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading text-3xl md:text-4xl font-bold text-brand-navy-deep mb-1">{stat.value}</div>
                  <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES SECTION ===== */}
        <section id="services" className="py-20 md:py-24 bg-surface-off">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">Our Services</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Comprehensive Development Solutions
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                We offer a full range of software development services to help your business thrive in the digital landscape.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  onClick={() => {
                    setSelectedService(service.title);
                    setModalOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Card className="h-full border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 rounded-card bg-white group">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-[10px] bg-[#EEF6FD] flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all duration-200">
                        {service.icon}
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-brand-navy-deep mb-2">
                        {service.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed flex-1">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== PROCESS SECTION ===== */}
        <section className="py-20 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-sky/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">How We Work</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                From Idea to Impact
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                Our proven process ensures every project is delivered on time, on budget, and beyond expectations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-sky/50 via-brand-blue to-brand-sky/50" />
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="size-24 rounded-full bg-white border-2 border-brand-blue/20 flex items-center justify-center mb-5 relative z-10 shadow-brand-sm">
                    <div className="size-16 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="font-heading text-xs font-semibold tracking-[0.15em] text-brand-blue uppercase mb-2">{step.number}</div>
                  <h3 className="font-heading text-lg font-semibold text-brand-navy-deep mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-[260px]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT + TECH STACK SECTION ===== */}
        <section id="about" className="py-20 md:py-24 bg-surface-off">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">About Us</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Who We Are
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[700px]">
                We are a team of passionate engineers, designers, and problem-solvers dedicated to building software
                that makes a real difference for businesses like yours.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-14">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-[#E5EAF4] shadow-brand-sm rounded-card bg-white">
                  <CardContent className="p-8">
                    <h3 className="font-heading text-xl font-semibold text-brand-navy-deep mb-3 flex items-center gap-2">
                      <Sparkles className="size-5 text-brand-blue" />
                      Our Vision
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      Building tomorrow&apos;s software today. We turn complex ideas into elegant solutions that scale with your business.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full border-[#E5EAF4] shadow-brand-sm rounded-card bg-white">
                  <CardContent className="p-8">
                    <h3 className="font-heading text-xl font-semibold text-brand-navy-deep mb-3 flex items-center gap-2">
                      <Star className="size-5 text-brand-blue" />
                      Our Values
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      Innovation, Quality, Customer Satisfaction, Integrity, and Teamwork — these principles guide every project we undertake.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-label justify-center mb-6">Technologies</div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy-deep text-center mb-8">
                Tools & Technologies We Work With
              </h3>
              <TechStackSection />
            </motion.div>
          </div>
        </section>

        {/* ===== TEAM SECTION ===== */}
        <section className="py-20 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-sky/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">Our Team</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Meet the Founders
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                The visionaries behind Clepsydra Technologies, driving innovation with precision and passion.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* Naman Namdev */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 rounded-card bg-white group">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="size-32 rounded-full overflow-hidden ring-4 ring-brand-blue/10 group-hover:ring-brand-blue/25 transition-all duration-300">
                        <Image
                          src="/images/team/namans_pic.jpg"
                          alt="Naman Namdev"
                          width={256}
                          height={256}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-brand-navy-deep mb-1">
                      Naman Namdev
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-2 h-px bg-brand-blue/40" />
                      <span className="font-body text-xs font-medium text-brand-blue tracking-wider uppercase">
                        CEO &amp; Co-Founder
                      </span>
                      <span className="inline-block w-2 h-px bg-brand-blue/40" />
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
                      Leading the vision and strategy behind Clepsydra, ensuring every solution reflects precision, quality, and client success.
                    </p>
                    <Link
                      href="https://www.linkedin.com/in/namannamdeo/"
                      className="inline-flex items-center gap-2 font-body text-sm text-brand-navy hover:text-brand-blue transition-colors duration-200"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Connect on LinkedIn
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Anubhav Singh Parte */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Card className="border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 rounded-card bg-white group">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="size-32 rounded-full overflow-hidden ring-4 ring-brand-blue/10 group-hover:ring-brand-blue/25 transition-all duration-300">
                        <Image
                          src="/images/team/anubhavs_pic.jpg"
                          alt="Anubhav Singh Parte"
                          width={256}
                          height={256}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-brand-navy-deep mb-1">
                      Anubhav Singh Parte
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-2 h-px bg-brand-blue/40" />
                      <span className="font-body text-xs font-medium text-brand-blue tracking-wider uppercase">
                        CTO &amp; Co-Founder
                      </span>
                      <span className="inline-block w-2 h-px bg-brand-blue/40" />
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
                      Architecting the technology backbone of Clepsydra, driving innovation in software development and engineering excellence.
                    </p>
                    <Link
                      href="https://www.linkedin.com/in/anubhav-singh-parte-b65244190/"
                      className="inline-flex items-center gap-2 font-body text-sm text-brand-navy hover:text-brand-blue transition-colors duration-200"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Connect on LinkedIn
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS SECTION ===== */}
        <section className="py-20 md:py-24 bg-surface-off relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-sky/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">Testimonials</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                What Our Clients Say
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card className="h-full border-[#E5EAF4] shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 rounded-card bg-white">
                    <CardContent className="p-8 flex flex-col h-full">
                      <Quote className="size-8 text-brand-sky/30 mb-4" />
                      <p className="font-body text-muted-foreground leading-relaxed mb-6 flex-1">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="size-4 fill-brand-sky text-brand-sky" />
                        ))}
                      </div>
                      <div className="pt-4 border-t border-[#E5EAF4]">
                        <p className="font-heading font-semibold text-brand-navy-deep text-sm">{t.author}</p>
                        <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-20 md:py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute -top-24 -left-24 size-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-64 bg-white/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Workflow?
              </h2>
              <p className="font-body text-lg text-white/80 max-w-[700px] mb-8">
                Join us and experience the perfect blend of timeless precision and modern technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="rounded-button bg-white text-brand-navy font-heading font-semibold h-12 px-8 text-base shadow-brand-md hover:bg-brand-sky-light hover:text-white transition-all duration-200">
                  Start Your Project
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-button border-white text-white bg-transparent hover:bg-white/10 h-12 px-8 text-base font-heading font-semibold"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="font-body text-sm text-white/60 mt-6">
                Free consultation. Custom solutions. Expert support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section id="contact" className="py-20 md:py-24 bg-surface-off relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-14"
            >
              <div className="section-label">Contact Us</div>
              <h2 className="font-heading text-[2.5rem] md:text-[3rem] font-bold text-brand-navy-deep mt-4 mb-4">
                Get in Touch
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-[600px]">
                Ready to start your project? Fill out the form below and we&apos;ll get back to you within 24-48 hours.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ContactForm />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <Card className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white">
                  <CardContent className="p-8">
                    <h3 className="font-heading text-xl font-semibold text-brand-navy-deep mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-[10px] bg-[#EEF6FD] flex items-center justify-center text-brand-blue flex-shrink-0">
                          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-heading text-sm font-medium text-brand-navy-deep">Email</p>
                          <Link href="mailto:clepsydratechnologies@gmail.com" className="font-body text-muted-foreground hover:text-brand-navy transition-colors text-sm">
                            clepsydratechnologies@gmail.com
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-[10px] bg-[#EEF6FD] flex items-center justify-center text-brand-blue flex-shrink-0">
                          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-heading text-sm font-medium text-brand-navy-deep">Phone</p>
                          <p className="font-body text-muted-foreground text-sm">+91 6267665525</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-[10px] bg-[#EEF6FD] flex items-center justify-center text-brand-blue flex-shrink-0">
                          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-heading text-sm font-medium text-brand-navy-deep">WhatsApp</p>
                          <Link href="http://wa.me/916267665525" className="font-body text-muted-foreground hover:text-brand-navy transition-colors text-sm">
                            Chat with us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#E5EAF4] shadow-brand-sm rounded-card bg-white">
                  <CardContent className="p-8">
                    <h3 className="font-heading text-xl font-semibold text-brand-navy-deep mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <Link
                        href="https://forms.gle/W1u3XJPJXBXhQVR78"
                        className="flex items-center gap-3 font-body text-muted-foreground hover:text-brand-navy transition-colors text-sm group"
                      >
                        <span className="size-2 rounded-full bg-brand-sky group-hover:bg-brand-navy transition-colors" />
                        Project Proposal Form
                      </Link>
                      <Link
                        href="/clepsydra_links"
                        className="flex items-center gap-3 font-body text-muted-foreground hover:text-brand-navy transition-colors text-sm group"
                      >
                        <span className="size-2 rounded-full bg-brand-sky group-hover:bg-brand-navy transition-colors" />
                        All Social Links
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <ServiceQueryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultService={selectedService ?? "Website Development"}
      />
    </div>
  );
}
