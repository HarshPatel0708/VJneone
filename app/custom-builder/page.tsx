import React from "react";
import CustomNeonBuilder from "@/components/CustomNeonBuilder";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Your Own Custom LED Neon Sign | VJneon® Builder",
  description: "Use our interactive 3D LED Neon Sign Builder to design custom signs in real time. Choose from 20+ neon colors, 15+ premium cursive fonts, backboard options, dimmers, and calculate live pricing.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-xs font-semibold text-neon-blue">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Live Neon Sign Configurator
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          Create Your Own <span className="bg-linear-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Custom Neon Sign</span>
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Type your text, choose your favorite cursive font, select a vibrant neon glow color, and style your acrylic backboard options. Built by hand, shipped in 7-10 days.
        </p>
      </div>

      {/* Main Interactive Configurator App */}
      <CustomNeonBuilder />
    </div>
  );
}
