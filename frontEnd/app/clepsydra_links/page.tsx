"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

export default function ClepsydraLinksPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const links = [
    {
      title: "Visit Our Website",
      description: "Learn more about our services and portfolio",
      url: "/",
      icon: <Globe className="size-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      external: false,
    },
    {
      title: "Project Proposal Form",
      description: "Submit your project requirements",
      url: "https://forms.gle/W1u3XJPJXBXhQVR78",
      icon: <FileText className="size-5" />,
      color: "bg-green-500 hover:bg-green-600",
      external: true,
    },
    {
      title: "WhatsApp Chat",
      description: "Quick chat for immediate assistance",
      url: "http://wa.me/916267665525",
      icon: <MessageCircle className="size-5" />,
      color: "bg-green-600 hover:bg-green-700",
      external: true,
    },
    {
      title: "Call Us",
      description: "+91 6267665525",
      url: "tel:+916267665525",
      icon: <Phone className="size-5" />,
      color: "bg-purple-500 hover:bg-purple-600",
      external: true,
    },
    {
      title: "Email Us",
      description: "clepsydratechnologies@gmail.com",
      url: "mailto:clepsydratechnologies@gmail.com",
      icon: <Mail className="size-5" />,
      color: "bg-red-500 hover:bg-red-600",
      external: true,
    },
  ]

  const socialLinks = [
    {
      title: "Facebook",
      description: "Follow us for updates and news",
      url: "https://www.facebook.com/clepsydratechnologies/",
      icon: <Facebook className="size-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "LinkedIn",
      description: "Connect with us professionally",
      url: "https://www.linkedin.com/company/clepsydra-technologies/",
      icon: <Linkedin className="size-5" />,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      title: "Instagram",
      description: "See our work and behind the scenes",
      url: "https://www.instagram.com/clepsydra_technologies",
      icon: <Instagram className="size-5" />,
      color: "bg-pink-500 hover:bg-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <svg className="size-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="size-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="container px-4 py-12 md:py-20 max-w-2xl mx-auto">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative mx-auto mb-6">
            <div className="size-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
              <div className="size-full rounded-full bg-background flex items-center justify-center">
                <Image
                  src="/images/clepsydra-logo-header.png"
                  alt="Clepsydra Technologies"
                  width={64}
                  height={64}
                  className="size-16"
                />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Clepsydra Technologies</h1>
          <p className="text-muted-foreground mb-4">Professional Software Development Solutions</p>
          <Badge variant="secondary" className="rounded-full px-4 py-1.5">
            Timeless Precision, Modern Solutions
          </Badge>
        </motion.div>

        {/* Main Links */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 mb-12">
          <h2 className="text-xl font-semibold mb-6 text-center">Get in Touch</h2>
          {links.map((link, i) => (
            <motion.div key={i} variants={item}>
              <Card className="overflow-hidden border-border/40 bg-gradient-to-r from-background to-muted/5 backdrop-blur transition-all hover:shadow-md hover:scale-[1.02]">
                <CardContent className="p-0">
                  {link.external ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-6 w-full text-left transition-colors hover:bg-muted/20"
                    >
                      <div
                        className={`size-12 rounded-full ${link.color} text-white flex items-center justify-center transition-colors`}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{link.title}</h3>
                        <p className="text-muted-foreground text-sm">{link.description}</p>
                      </div>
                      <ExternalLink className="size-5 text-muted-foreground" />
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      className="flex items-center gap-4 p-6 w-full text-left transition-colors hover:bg-muted/20"
                    >
                      <div
                        className={`size-12 rounded-full ${link.color} text-white flex items-center justify-center transition-colors`}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{link.title}</h3>
                        <p className="text-muted-foreground text-sm">{link.description}</p>
                      </div>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Links */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <h2 className="text-xl font-semibold mb-6 text-center">Follow Us</h2>
          {socialLinks.map((social, i) => (
            <motion.div key={i} variants={item}>
              <Card className="overflow-hidden border-border/40 bg-gradient-to-r from-background to-muted/5 backdrop-blur transition-all hover:shadow-md hover:scale-[1.02]">
                <CardContent className="p-0">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 w-full text-left transition-colors hover:bg-muted/20"
                  >
                    <div
                      className={`size-12 rounded-full ${social.color} text-white flex items-center justify-center transition-colors`}
                    >
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{social.title}</h3>
                      <p className="text-muted-foreground text-sm">{social.description}</p>
                    </div>
                    <ExternalLink className="size-5 text-muted-foreground" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12 pt-8 border-t border-border/40"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Clepsydra Technologies. All rights reserved.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
