"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@/components/google-map"), { ssr: false });

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const faqs = [
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "Yes, we offer vegetarian, vegan, and gluten-free options. Please inform us when making your reservation or speak with your server.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we have complimentary valet parking available. Street parking is also available nearby.",
  },
  {
    question: "Do you host private events?",
    answer:
      "Yes, we can accommodate private events and parties. Please contact us at least two weeks in advance to discuss your needs.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require 24 hours notice for cancellations. Late cancellations may be subject to a fee.",
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! We&apos;ll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          We&apos;d love to hear from you. Get in touch!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    placeholder="What's this about?"
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Your message..."
                    rows={6}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      123 Main Street<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:info@bellavita.com"
                      className="text-muted-foreground hover:text-primary"
                    >
                      info@bellavita.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-muted-foreground">
                      Mon-Thu: 5:00 PM - 10:00 PM<br />
                      Fri-Sat: 5:00 PM - 11:00 PM<br />
                      Sun: 4:00 PM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Map */}
      <div className="mb-20">
        <h2 className="text-3xl font-display font-bold mb-6 text-center">Find Us</h2>
        <div className="h-96 rounded-lg overflow-hidden">
          <GoogleMap />
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger value={`item-${index}`}>{faq.question}</AccordionTrigger>
              <AccordionContent value={`item-${index}`}>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

