import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, ShieldCheck, Flame, Heart, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About VJneon® | Hand-Crafted Luxury LED Signs",
  description: "Learn about the VJneon story. We design and hand-assemble premium, low-voltage, energy-efficient LED neon signs for global storefronts, weddings, and premium home interiors.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-12">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">About Us</span>
      </div>

      <div className="space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-xs font-semibold text-neon-blue">
          <Sparkles className="h-3.5 w-3.5" /> Hand-Crafted Illumination
        </div>
        <h1 className="text-3xl md:text-5xl font-black">Our Signage Story</h1>
        <p className="text-xs md:text-sm text-neutral-500 font-medium leading-relaxed">
          VJneon was founded on a simple premise: traditional gas-filled glass neon is beautiful but fragile, expensive, and unsafe. We set out to engineer a premium alternative.
        </p>
      </div>

      {/* Corporate profile narrative block */}
      <div className="bg-[#09090b] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6 leading-relaxed text-xs sm:text-sm text-neutral-400 font-medium">
        <p>
          Established in 2024, VJneon has grown into a leading international brand for custom LED neon signage. In our local Los Angeles laboratory, our skilled team of designers, engineers, and assembly technicians hand-craft every sign to order.
        </p>
        <p>
          We utilize flexible, high-density silicone sleeves packed with premium LED light-emitting diodes, mounted on durable, high-impact cast acrylic backing plates. This creates a rich, continuous glow with no dark spots or high-voltage transformers.
        </p>
      </div>

      {/* Brand pillars / values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3.5">
          <div className="inline-flex p-3 rounded-xl bg-neon-pink/10 border border-neon-pink/20 text-neon-pink">
            <Flame className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Vibrant Artistry</h3>
          <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
            Bespoke cursive planning, dynamic light-balancing, and rich neon hues created by digital artist engineers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3.5">
          <div className="inline-flex p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-neon-blue">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Extreme Safety</h3>
          <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
            Low-voltage 12V DC transformers. Cool to touch, shatterproof materials safe for kids&apos; bedrooms.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3.5">
          <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300">
            <Wrench className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Hand-Crafted</h3>
          <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
            Each sign is cut, aligned, soldered, and glow-tested manually in our workshop for quality assurance.
          </p>
        </div>
      </div>

    </div>
  );
}
