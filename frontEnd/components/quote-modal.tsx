"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function QuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-0 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 mt-0 sm:mt-12 w-full sm:max-w-lg max-h-dvh sm:max-h-[calc(100dvh-6rem)] overflow-y-auto bg-white sm:rounded-2xl shadow-2xl border border-[#E5EAF4]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5EAF4] rounded-t-none sm:rounded-t-2xl">
              <div>
                <h2 className="font-heading text-lg font-semibold text-brand-navy-deep">
                  Request a Quote
                </h2>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Tell us about your project
                </p>
              </div>
              <button
                onClick={onClose}
                className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-brand-navy-deep hover:bg-surface-muted transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center text-center px-6 py-16">
                <div className="size-14 rounded-full bg-brand-sky-light/20 flex items-center justify-center mb-4">
                  <CheckCircle className="size-7 text-brand-navy" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brand-navy-deep mb-2">
                  Quote Request Sent!
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within
                  24-48 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="rounded-button"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-xs font-medium text-brand-navy-deep mb-1.5">
                      Name *
                    </label>
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-xs font-medium text-brand-navy-deep mb-1.5">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-xs font-medium text-brand-navy-deep mb-1.5">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-xs font-medium text-brand-navy-deep mb-1.5">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project type, consultation, etc."
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-heading text-xs font-medium text-brand-navy-deep mb-1.5">
                    Project Requirements *
                  </label>
                  <Textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, budget, and any specific requirements..."
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-button bg-brand-gradient text-white font-heading font-semibold shadow-brand-md hover:brightness-110 h-11"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
