import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        description: "We'll get back to you soon.",
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
          link.classList.add("text-sage");
          link.classList.remove("text-gray-700");
        } else {
          link.classList.remove("text-sage");
          link.classList.add("text-gray-700");
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
        "Custom software solutions built with modern technologies to solve complex business challenges and streamline operations.",
      features: [
        "Enterprise Applications",
        "API Development",
        "System Integration",
      ],
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      icon: Smartphone,
      title: "Android App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences and drive engagement.",
      features: [
        "Native Android Apps",
        "Cross-platform Solutions",
        "App Store Optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Responsive, fast, and SEO-optimized websites that convert visitors into customers and grow your online presence.",
      features: [
        "Responsive Design",
        "E-commerce Solutions",
        "Performance Optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      icon: Bot,
      title: "Python Automation",
      description:
        "Intelligent automation solutions that eliminate repetitive tasks and optimize workflow efficiency across your organization.",
      features: [
        "Process Automation",
        "Data Processing Scripts",
        "Task Scheduling",
      ],
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      icon: Settings,
      title: "DevOps Services",
      description:
        "Streamlined deployment pipelines and infrastructure management for faster, more reliable software delivery.",
      features: [
        "CI/CD Pipelines",
        "Cloud Infrastructure",
        "Monitoring & Analytics",
      ],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights with advanced analytics and visualization solutions for informed decision-making.",
      features: [
        "Business Intelligence",
        "Predictive Analytics",
        "Custom Dashboards",
      ],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-cream/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={logoPath}
                alt="Clepsydra Technologies"
                className="h-10 w-auto mr-3"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-sage leading-tight">
                  Clepsydra
                </span>
                <span className="text-sm font-medium text-gray-600 leading-tight">
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
                  className="text-sage hover:text-sage/80 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  data-nav-link
                  href="#services"
                  className="text-gray-700 hover:text-sage px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  data-nav-link
                  href="#about"
                  className="text-gray-700 hover:text-sage px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-sage text-white hover:bg-sage/90"
                >
                  Contact
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-cream shadow-lg">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sage block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-sage block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-sage block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-sage block px-3 py-2 rounded-md text-base font-medium w-full text-left"
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(43, 100%, 98%) 0%, hsl(349, 100%, 93%) 50%, hsl(349, 100%, 90%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <img
                src={logoPath}
                alt="Clepsydra Technologies"
                className="h-24 w-auto filter drop-shadow-lg"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Innovative <span className="text-sage">Software</span>
              <br />
              Solutions for Tomorrow
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transforming ideas into powerful digital experiences with
              cutting-edge technology and creative excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("services")}
                className="bg-sage text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                size="lg"
              >
                Explore Services
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-sage text-sage px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage hover:text-white transition-all duration-300"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-sage text-2xl" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to accelerate your
              business growth and digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-light-pink/20"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage/80 rounded-xl flex items-center justify-center mb-6">
                      <IconComponent
                        className="text-white text-2xl"
                        size={24}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <ul className="text-sm text-gray-600 space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="text-sage mr-2" size={16} />
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
      <section
        id="about"
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, hsl(349, 100%, 93%) 0%, hsl(349, 100%, 90%) 50%, hsl(43, 100%, 98%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                About Clepsydra Technologies
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We are a forward-thinking technology company dedicated to
                delivering innovative software solutions that empower businesses
                to thrive in the digital landscape. Our expertise spans across
                multiple domains, ensuring comprehensive support for your
                technological needs.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage mb-2">50+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage mb-2">30+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage mb-2">15+</div>
                  <div className="text-gray-600">Technologies</div>
                </div>
              </div>

              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-sage text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage/90 transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                Start Your Project
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional software development team"
                className="rounded-2xl shadow-2xl w-full"
              />

              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400" fill="currentColor" />
                  <span className="font-semibold text-gray-800">
                    5.0 Rating
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-sage text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your ideas into reality? Let's discuss your
              project and explore how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-2xl shadow-lg h-fit">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                        <Mail className="text-sage text-lg" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Email</div>
                        <div className="text-gray-600">
                          clepsydratechnologies@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                        <Phone className="text-sage text-lg" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Phone</div>
                        <div className="text-gray-600">+91 9039545880</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                        <Clock className="text-sage text-lg" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          Business Hours
                        </div>
                        <div className="text-gray-600">
                          Mon - Fri: 9:00 AM - 6:00 PM
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Follow Us
                    </h4>
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 bg-sage/10 rounded-lg hover:bg-sage hover:text-white"
                      >
                        <Linkedin className="text-sage hover:text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 bg-sage/10 rounded-lg hover:bg-sage hover:text-white"
                      >
                        <Twitter className="text-sage hover:text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 bg-sage/10 rounded-lg hover:bg-sage hover:text-white"
                      >
                        <Github className="text-sage hover:text-white" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white rounded-2xl shadow-lg">
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
                              <FormLabel className="block text-sm font-semibold text-gray-700 mb-2">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
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
                              <FormLabel className="block text-sm font-semibold text-gray-700 mb-2">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
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
                            <FormLabel className="block text-sm font-semibold text-gray-700 mb-2">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
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
                            <FormLabel className="block text-sm font-semibold text-gray-700 mb-2">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                {...field}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
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
                            <FormLabel className="block text-sm font-semibold text-gray-700 mb-2">
                              Service Interested In
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:border-transparent transition-all">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="software-development">
                                  Software Development
                                </SelectItem>
                                <SelectItem value="android-development">
                                  Android App Development
                                </SelectItem>
                                <SelectItem value="web-development">
                                  Website Development
                                </SelectItem>
                                <SelectItem value="python-automation">
                                  Python Automation
                                </SelectItem>
                                <SelectItem value="devops">
                                  DevOps Services
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
                            <FormLabel className="block text-sm font-semibold text-gray-700 mb-2">
                              Project Details
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={5}
                                placeholder="Tell us about your project requirements..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:border-transparent transition-all resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full bg-sage text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage/90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
                        size="lg"
                      >
                        {contactMutation.isPending
                          ? "Sending..."
                          : "Send Message"}
                        <Mail className="ml-2" size={20} />
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
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src={logoPath}
                  alt="Clepsydra Technologies"
                  className="h-8 w-auto mr-3"
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-sage leading-tight">
                    Clepsydra
                  </span>
                  <span className="text-base font-medium text-gray-300 leading-tight">
                    Technologies
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming businesses through innovative technology solutions.
                Your trusted partner for software development, mobile apps, and
                digital transformation.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-sage/20 rounded-lg hover:bg-sage"
                >
                  <Linkedin />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-sage/20 rounded-lg hover:bg-sage"
                >
                  <Twitter />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-sage/20 rounded-lg hover:bg-sage"
                >
                  <Github />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-sage/20 rounded-lg hover:bg-sage"
                >
                  <Instagram />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-sage transition-colors"
                  >
                    Software Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-sage transition-colors"
                  >
                    Android Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-sage transition-colors"
                  >
                    Web Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-sage transition-colors"
                  >
                    Python Automation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-sage transition-colors"
                  >
                    DevOps Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-sage transition-colors"
                  >
                    Data Analytics
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="text-sage mr-2" size={16} />
                  <span>clepsydratechnologies@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-sage mr-2" size={16} />
                  <span>+91 9039545880</span>
                </li>
                <li className="flex items-center">
                  <Clock className="text-sage mr-2" size={16} />
                  <span>Mon - Fri: 9AM - 6PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Clepsydra Technologies. All rights reserved. | Built with
              ❤️ by our team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
