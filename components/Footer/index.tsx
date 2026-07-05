"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Truck,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { useConfig } from "@/hooks/useConfig";

// Newsletter Form validation schema
const newsletterSchema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
});

type NewsletterFormData = zod.infer<typeof newsletterSchema>;

export default function Footer() {
  const { formatPrice } = useConfig();
  const [subscribed, setSubscribed] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormData) => {
    // Simulate API registration
    setTimeout(() => {
      setSubscribed(true);
      reset();
    }, 1000);
  };

  return (
    <footer className="w-full bg-neutral-50 border-t border-neutral-200 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-pink/5 rounded-full blur-3xl -z-10" />

      {/* Trust Badges Banner */}
      <div className="border-b border-neutral-200 py-8 bg-neutral-100/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-neon-pink/10 border border-neon-pink/20">
              <ShieldCheck className="h-6 w-6 text-neon-pink" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-800">3-Year Complete Warranty</h4>
              <p className="text-xs text-neutral-500 mt-0.5">We cover all electrical and LED components completely.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-center md:justify-start border-y md:border-y-0 md:border-x border-neutral-200 py-6 md:py-0 md:px-6">
            <div className="p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20">
              <Truck className="h-6 w-6 text-neon-blue" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-800">Free Insured Global Delivery</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Free standard shipping globally on orders above {formatPrice(250)}.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-neutral-200/50 border border-neutral-200">
              <RotateCcw className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-800">100% Damage Replacement</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Broken in transit? We will manufacture and ship a new sign free.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Info & Newsletter */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="inline-block">
            <Image 
              src="/logo.png" 
              alt="VJneon" 
              width={190} 
              height={60} 
              className="h-12 w-auto object-contain" 
            />
          </Link>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
            VJneon is a premium global designer of custom LED neon signs. We craft high-end storefront illumination, wedding backdrops, and home decor utilizing safe, low-voltage, and energy-efficient materials.
          </p>

          {/* Newsletter Signup */}
          <div className="space-y-3 max-w-sm">
            <h4 className="text-xs uppercase tracking-wider text-neutral-800 font-bold flex items-center gap-1.5">
              Subscribe to Glow Newsletter <Sparkles className="h-3.5 w-3.5 text-neon-blue" />
            </h4>
            
            {subscribed ? (
              <div className="bg-neon-blue/10 border border-neon-blue/20 rounded-xl p-4 text-xs text-neutral-700">
                🎉 Thanks for subscribing! Check your inbox for <b>10% discount code</b> on your next order.
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex gap-2 relative">
                  <div className="relative w-full">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      {...register("email")}
                      disabled={isSubmitting}
                      className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder-neutral-400 outline-hidden focus:border-neon-blue transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 bg-linear-to-r from-neon-pink to-neon-blue rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer text-white"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {errors.email && (
                  <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.email.message}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Column 1: Shop */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-800 font-bold mb-4">Shop Signage</h4>
          <ul className="space-y-2 text-xs text-neutral-500 font-semibold">
            <li>
              <Link href="/custom-builder" className="text-neon-blue hover:text-neutral-900 transition-colors font-bold">Custom Neon Builder</Link>
            </li>
            <li>
              <Link href="/upload-design" className="text-neon-pink hover:text-neutral-900 transition-colors font-bold">Upload Logo Design</Link>
            </li>
            <li>
              <Link href="/shop?category=Wedding%20Collection" className="hover:text-neutral-900 transition-colors">Wedding Collection</Link>
            </li>
            <li>
              <Link href="/shop?category=Business%20Signs" className="hover:text-neutral-900 transition-colors">Business Signs</Link>
            </li>
            <li>
              <Link href="/shop?category=Home%20Decor" className="hover:text-neutral-900 transition-colors">Home Decor</Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Products */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-800 font-bold mb-4">Sign Types</h4>
          <ul className="space-y-2 text-xs text-neutral-500 font-semibold">
            <li>
              <Link href="/shop?category=Channel%20Letters" className="hover:text-neutral-900 transition-colors">Channel Letters</Link>
            </li>
            <li>
              <Link href="/shop?category=Light%20Box" className="hover:text-neutral-900 transition-colors">Light Boxes</Link>
            </li>
            <li>
              <Link href="/shop?category=Acrylic%20Signs" className="hover:text-neutral-900 transition-colors">Acrylic Signs</Link>
            </li>
            <li>
              <Link href="/shop?category=Metal%20Signs" className="hover:text-neutral-900 transition-colors">Metal Signs</Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-neutral-900 transition-colors text-neon-blue font-bold">Track Your Order</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Information & Policies */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-800 font-bold mb-4">Information</h4>
          <ul className="space-y-2 text-xs text-neutral-500 font-semibold">
            <li>
              <Link href="/about" className="hover:text-neutral-900 transition-colors">About VJneon</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-neutral-900 transition-colors">Frequently Asked Questions</Link>
            </li>
            <li>
              <Link href="/policy/warranty" className="hover:text-neutral-900 transition-colors">Warranty Policy</Link>
            </li>
            <li>
              <Link href="/policy/shipping" className="hover:text-neutral-900 transition-colors">Shipping & Delivery</Link>
            </li>
            <li>
              <Link href="/policy/refund" className="hover:text-neutral-900 transition-colors">Refund & Returns</Link>
            </li>
            <li>
              <Link href="/policy/terms" className="hover:text-neutral-900 transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link href="/policy/privacy" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom (Copyright and Socials) */}
      <div className="border-t border-neutral-200 py-8 bg-neutral-100/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-500 font-medium">
            © {new Date().getFullYear()} VJneon. All rights reserved. Premium LED signage crafted worldwide.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:text-neon-pink hover:border-neon-pink/30 hover:scale-110 transition-all cursor-pointer" aria-label="Instagram">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:text-neon-blue hover:border-neon-blue/30 hover:scale-110 transition-all cursor-pointer" aria-label="Facebook">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-800 hover:scale-110 transition-all cursor-pointer" aria-label="Twitter">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:text-neon-pink hover:border-neon-pink/30 hover:scale-110 transition-all cursor-pointer" aria-label="Youtube">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
