"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, CheckCircle, ArrowRight } from "lucide-react"

const subServices: Record<string, string[]> = {
  "Website Development": [
    "E-commerce Website",
    "Corporate / Business Website",
    "Landing Page",
    "Web Portal",
    "SaaS Platform",
    "Custom Web Application",
    "Other",
  ],
  "Mobile App Development": [
    "iOS App",
    "Android App",
    "Cross-Platform App (Flutter / React Native)",
    "App Maintenance & Support",
    "App UI/UX Redesign",
    "Other",
  ],
  "Python Scripting & Automation": [
    "Data Scraping",
    "Workflow Automation",
    "Custom Script Development",
    "API Integration",
    "Report Generation",
    "Other",
  ],
  "Data Analytics": [
    "Dashboard Development",
    "Data Visualization",
    "Business Intelligence",
    "Data Pipeline Engineering",
    "Analytics Consulting",
    "Other",
  ],
  "AI Automation & Workflows": [
    "Chatbot Development",
    "Business Process Automation",
    "AI Model Integration",
    "Document Processing",
    "Predictive Analytics",
    "Other",
  ],
  "UI/UX Design": [
    "Website Design",
    "Mobile App Design",
    "Design System / Component Library",
    "Prototyping & Wireframing",
    "UX Audit & User Research",
    "Other",
  ],
  "Software Consultancy": [
    "Architecture Review",
    "Technology Stack Selection",
    "Code Audit & Quality Review",
    "Digital Transformation Strategy",
    "MVP Planning & Roadmap",
    "Other",
  ],
  "Application Testing": [
    "Manual QA Testing",
    "Automated Testing",
    "Performance & Load Testing",
    "Security Audit",
    "Cross-Browser / Cross-Device Testing",
    "Other",
  ],
}

const fallbackOptions = ["General Inquiry", "Partnership", "Other"]

interface ServiceQueryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultService: string
}

export function ServiceQueryModal({ open, onOpenChange, defaultService }: ServiceQueryModalProps) {
  const options = subServices[defaultService] ?? fallbackOptions
  const defaultOption = options[0]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultOption,
    message: "",
  })

  // Reset sub-service to first option when modal opens with a different service
  useEffect(() => {
    if (open) {
      setFormData((prev) => ({
        ...prev,
        service: defaultOption,
        name: "",
        email: "",
        phone: "",
        message: "",
      }))
      setIsSuccess(false)
    }
  }, [defaultService, open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Service Inquiry: ${defaultService} - ${formData.service}`,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Inquiry sent!",
          description: "We'll get back to you within 24-48 hours.",
        })
      } else {
        throw new Error("Failed to send")
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: defaultOption,
      message: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleClose(); else onOpenChange(open) }}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0 rounded-card overflow-hidden bg-white">
        {/* Header gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-sky via-brand-blue to-brand-navy" />

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="size-16 rounded-full bg-brand-sky-light/20 flex items-center justify-center mb-4">
              <CheckCircle className="size-8 text-brand-navy" />
            </div>
            <DialogTitle className="font-heading text-xl font-semibold text-brand-navy-deep mb-2">
              Inquiry Sent!
            </DialogTitle>
            <p className="font-body text-muted-foreground text-sm mb-6 max-w-sm">
              Thank you for your interest in <span className="font-medium text-brand-navy">{formData.service}</span>. We&apos;ll reach out within 24&ndash;48 hours.
            </p>
            <Button variant="outline" onClick={handleClose} className="rounded-button">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="font-heading text-xl font-semibold text-brand-navy-deep">
                Get Started
              </DialogTitle>
              <DialogDescription className="font-body text-sm text-muted-foreground">
                Tell us about your project needs and we&apos;ll get back to you.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
              {/* Sub-service Select — options change based on which card was clicked */}
              <div>
                <label className="block font-heading text-sm font-medium text-brand-navy-deep mb-1.5">
                  What are you looking for? *
                </label>
                <Select value={formData.service} onValueChange={handleServiceChange} required>
                  <SelectTrigger className="w-full h-11 rounded-button border-[#D0D7E6] focus:ring-brand-blue/30">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-name" className="block font-heading text-sm font-medium text-brand-navy-deep mb-1.5">
                    Name *
                  </label>
                  <Input
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="h-11 rounded-button border-[#D0D7E6] focus:ring-brand-blue/30"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block font-heading text-sm font-medium text-brand-navy-deep mb-1.5">
                    Email *
                  </label>
                  <Input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="h-11 rounded-button border-[#D0D7E6] focus:ring-brand-blue/30"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="modal-phone" className="block font-heading text-sm font-medium text-brand-navy-deep mb-1.5">
                  Phone
                </label>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  className="h-11 rounded-button border-[#D0D7E6] focus:ring-brand-blue/30"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="modal-message" className="block font-heading text-sm font-medium text-brand-navy-deep mb-1.5">
                  Project Details *
                </label>
                <Textarea
                  id="modal-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  rows={4}
                  className="rounded-button border-[#D0D7E6] focus:ring-brand-blue/30 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
