"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

// Contact form schema
const contactSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Enter a valid email address"),
  subject: zod.string().min(3, "Subject must be at least 3 characters"),
  message: zod.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = zod.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    // Simulate sending email
    setTimeout(() => {
      setSubmitted(true);
      reset();

      // Mini confetti
      canvasConfetti({
        particleCount: 50,
        spread: 50,
        colors: ["#0080ff", "#ffffff"]
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">Contact Us</span>
      </div>

      <div className="text-center md:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-xs font-semibold text-neon-blue">
          <MessageSquare className="h-3.5 w-3.5" /> Support Channel
        </div>
        <h1 className="text-3xl md:text-5xl font-black">Get in Touch</h1>
        <p className="text-xs md:text-sm text-neutral-500 font-medium leading-relaxed">
          Do you need custom size quote advice, custom color matching, or shipment queries? Our team replies within 12 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Info contact cards (Left column: 5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 flex gap-4">
            <div className="p-3.5 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-neon-blue flex-shrink-0 self-start">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Channels</h4>
              <p className="text-sm font-semibold text-white mt-1">support@vjneon.com</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Average reply time is 8 hours.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 flex gap-4">
            <div className="p-3.5 rounded-xl bg-neon-pink/10 border border-neon-pink/20 text-neon-pink flex-shrink-0 self-start">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Global Hotline</h4>
              <p className="text-sm font-semibold text-white mt-1">+1 (800) NEON-GLOW</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Toll-free. Mon - Fri, 9 AM - 6 PM PST.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 flex gap-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex-shrink-0 self-start">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Showroom Laboratory</h4>
              <p className="text-xs font-semibold text-white mt-1 leading-relaxed">
                128 Glowing Signage Way, Suite 400<br />
                Los Angeles, CA 90001
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form (Right column: 7 Columns) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full rounded-3xl bg-[#09090b] border border-neon-blue/20 p-8 text-center py-20 space-y-4"
              >
                <div className="inline-flex p-3 rounded-full bg-neon-blue/20 text-neon-blue shadow-neon-blue">
                  <CheckCircle className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Thank you. Your message has been received by our helpdesk. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-neutral-900 border border-white/10 text-[10px] font-bold text-neutral-400 hover:text-white rounded-lg mt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass-effect p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="David Miller" 
                      {...register("name")}
                      disabled={isSubmitting}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                    {errors.name && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="david@company.com" 
                      {...register("email")}
                      disabled={isSubmitting}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                    {errors.email && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Subject Inquiry</label>
                  <input 
                    type="text" 
                    placeholder="Signage quotation for showroom" 
                    {...register("subject")}
                    disabled={isSubmitting}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                  />
                  {errors.subject && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.subject.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Message Description</label>
                  <textarea 
                    placeholder="Describe your request in detail. Mention custom fonts, dimensions, backing specifications, or wall mounting layouts..." 
                    {...register("message")}
                    disabled={isSubmitting}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden h-32 resize-none transition-colors"
                  />
                  {errors.message && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-lg shadow-neon-pink/15 cursor-pointer"
                >
                  <Send className="h-4 w-4" /> 
                  {isSubmitting ? "Dispatching..." : "Send Message Inquiry"}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
