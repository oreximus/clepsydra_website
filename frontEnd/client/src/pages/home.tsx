"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import {
  Code,
  Smartphone,
  Globe,
  Bot,
  Settings,
  BarChart3,
  Menu,
  X,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  Check,
  Star,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Award,
  MessageCircle,
  Send,
} from "lucide-react";
import logoPath from "@assets/logo_1752931976719.png";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "contact"];
      const navLinks = document.querySelectorAll("[data-nav-link]");

      let currentSection = "";

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href")?.substring(1);
        if (href === currentSection) {
          link.classList.add("text-primary-purple");
          link.classList.remove("text-neutral-600");
        } else {
          link.classList.remove("text-primary-purple");
          link.classList.add("text-neutral-600");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: Code,
      title: "Software Development",
      description:
        "Custom enterprise applications built with cutting-edge technologies to solve complex business challenges.",
      features: [
        "Enterprise Applications",
        "API Development",
        "System Integration",
      ],
      gradient: "from-purple-500 to-blue-600",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: [
        "Native iOS & Android",
        "Cross-platform Solutions",
        "App Store Optimization",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications optimized for performance and SEO.",
      features: [
        "Responsive Design",
        "E-commerce Solutions",
        "Performance Optimization",
      ],
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Bot,
      title: "AI & Automation",
      description:
        "Intelligent automation solutions powered by AI to streamline your business processes.",
      features: [
        "Process Automation",
        "AI Integration",
        "Workflow Optimization",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Settings,
      title: "DevOps & Cloud",
      description:
        "Scalable cloud infrastructure and DevOps practices for reliable software delivery.",
      features: [
        "CI/CD Pipelines",
        "Cloud Architecture",
        "Monitoring & Analytics",
      ],
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights with advanced analytics and visualization.",
      features: [
        "Business Intelligence",
        "Predictive Analytics",
        "Custom Dashboards",
      ],
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const stats = [
    { number: "100+", label: "Projects Completed", icon: Award },
    { number: "50+", label: "Happy Clients", icon: Users },
    { number: "5+", label: "Years Experience", icon: Star },
    { number: "24/7", label: "Support", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-effect z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src={logoPath || "/placeholder.svg"}
                alt="Clepsydra Technologies"
                className="h-8 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-neutral-800 leading-tight">
                  Clepsydra
                </span>
                <span className="text-xs font-medium text-neutral-600 leading-tight">
                  Technologies
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  data-nav-link
                  href="#home"
                  className="text-primary-purple hover:text-primary-purple/80 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  data-nav-link
                  href="#services"
                  className="text-neutral-600 hover:text-primary-purple px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  data-nav-link
                  href="#about"
                  className="text-neutral-600 hover:text-primary-purple px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  About
                </button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-primary text-white hover:shadow-glow transition-all duration-300"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-700"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg">
              <button
                onClick={() => scrollToSection("home")}
                className="text-primary-purple block px-3 py-2 rounded-lg text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-neutral-600 hover:text-primary-purple block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-neutral-600 hover:text-primary-purple block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-neutral-600 hover:text-primary-purple block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-purple-50 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center animate-fade-in-up">
              <div className="p-4 bg-white rounded-2xl shadow-lg shadow-purple-100">
                <img
                  src={logoPath || "/placeholder.svg"}
                  alt="Clepsydra Technologies"
                  className="h-16 w-auto"
                />
              </div>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-800 mb-6 leading-tight animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Innovative Software Solutions for Tomorrow
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              We craft innovative software solutions that transform businesses
              and drive growth in the digital age.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                onClick={() => scrollToSection("services")}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                Explore Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-purple-200 text-neutral-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                size="lg"
              >
                Get Started
                <MessageCircle className="ml-2" size={20} />
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-3">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-neutral-400" size={24} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
              <Zap className="text-white" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to accelerate your
              business growth and digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-0 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="text-white" size={28} />
                    </div>

                    <h3 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-primary-purple transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-neutral-600"
                        >
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="text-green-600" size={12} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                <Users className="text-white" size={32} />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
                About Clepsydra Technologies
              </h2>

              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We are a forward-thinking technology company dedicated to
                delivering innovative software solutions that empower businesses
                to thrive in the digital landscape. Our expertise spans across
                multiple domains, ensuring comprehensive support for your
                technological needs.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-6 bg-gradient-secondary rounded-2xl"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-3">
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <div className="text-2xl font-bold text-neutral-800 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                Start Your Project
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Professional software development team"
                  className="rounded-2xl shadow-2xl w-full"
                />

                <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-current"
                          size={16}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-neutral-800">
                      5.0 Rating
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-gradient-primary text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm opacity-90">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
              <MessageCircle className="text-white" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
              Ready to transform your ideas into reality? Let's discuss your
              project and explore how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-2xl shadow-lg h-fit border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Mail className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-800">
                          Email
                        </div>
                        <div className="text-neutral-600 text-sm">
                          clepsydratechnologies@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Phone className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-800">
                          Phone
                        </div>
                        <div className="text-neutral-600 text-sm">
                          +91 9039545880
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Clock className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-800">
                          Business Hours
                        </div>
                        <div className="text-neutral-600 text-sm">
                          Mon - Fri: 9:00 AM - 6:00 PM
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-neutral-100">
                    <h4 className="font-semibold text-neutral-800 mb-4">
                      Follow Us
                    </h4>
                    <div className="flex space-x-3">
                      {[Linkedin, Twitter, Github, Instagram].map(
                        (Icon, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className="w-10 h-10 bg-neutral-100 rounded-xl hover:bg-gradient-primary hover:text-white transition-all duration-300"
                          >
                            <Icon size={18} />
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white rounded-2xl shadow-lg border-0">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-neutral-700">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="h-12 px-4 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                                  placeholder="Enter your first name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-neutral-700">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="h-12 px-4 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                                  placeholder="Enter your last name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-neutral-700">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                className="h-12 px-4 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                                placeholder="Enter your email address"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-neutral-700">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                {...field}
                                className="h-12 px-4 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                                placeholder="Enter your phone number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-neutral-700">
                              Service Interested In
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 px-4 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="software-development">
                                  Software Development
                                </SelectItem>
                                <SelectItem value="mobile-development">
                                  Mobile App Development
                                </SelectItem>
                                <SelectItem value="web-development">
                                  Web Development
                                </SelectItem>
                                <SelectItem value="ai-automation">
                                  AI & Automation
                                </SelectItem>
                                <SelectItem value="devops-cloud">
                                  DevOps & Cloud
                                </SelectItem>
                                <SelectItem value="data-analytics">
                                  Data Analytics
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-neutral-700">
                              Project Details
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={5}
                                placeholder="Tell us about your project requirements..."
                                className="px-4 py-3 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow transform hover:scale-[1.02] transition-all duration-300"
                        size="lg"
                      >
                        {contactMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2" size={20} />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={logoPath || "/placeholder.svg"}
                  alt="Clepsydra Technologies"
                  className="h-8 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white leading-tight">
                    Clepsydra
                  </span>
                  <span className="text-sm font-medium text-neutral-400 leading-tight">
                    Technologies
                  </span>
                </div>
              </div>
              <p className="text-neutral-400 mb-6 max-w-md leading-relaxed">
                Transforming businesses through innovative technology solutions.
                Your trusted partner for software development, mobile apps, and
                digital transformation.
              </p>
              <div className="flex space-x-4">
                {[Linkedin, Twitter, Github, Instagram].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 bg-neutral-800 rounded-xl hover:bg-gradient-primary transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3 text-neutral-400">
                {[
                  "Software Development",
                  "Mobile Development",
                  "Web Development",
                  "AI & Automation",
                  "DevOps & Cloud",
                  "Data Analytics",
                ].map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4 text-neutral-400">
                <li className="flex items-center">
                  <Mail
                    className="text-primary-purple mr-3 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm">
                    clepsydratechnologies@gmail.com
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone
                    className="text-primary-purple mr-3 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm">+91 9039545880</span>
                </li>
                <li className="flex items-center">
                  <Clock
                    className="text-primary-purple mr-3 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm">Mon - Fri: 9AM - 6PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
            <p className="text-neutral-400">
              © 2024 Clepsydra Technologies. All rights reserved. | Built with
              ❤️ by our team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
