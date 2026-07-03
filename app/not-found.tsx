"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 text-center space-y-6 relative overflow-hidden">
      
      {/* Decorative Grid Lines backdrop */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />

      {/* Flicker animation custom styles */}
      <style jsx global>{`
        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 4px #fff,
              0 0 10px #fff,
              0 0 20px #ff0066,
              0 0 40px #ff0066;
          }
          20%, 24%, 55% {
            opacity: 0.15;
            text-shadow: none;
          }
        }

        .neon-flickering-pink {
          color: #ff0066;
          animation: neon-flicker 3s infinite alternate;
        }

        @keyframes neon-flicker-blue {
          0%, 29%, 31%, 33%, 35%, 64%, 66%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 4px #fff,
              0 0 10px #fff,
              0 0 20px #0080ff,
              0 0 40px #0080ff;
          }
          30%, 34%, 65% {
            opacity: 0.2;
            text-shadow: none;
          }
        }

        .neon-flickering-blue {
          color: #0080ff;
          animation: neon-flicker-blue 4s infinite alternate;
        }
      `}</style>

      {/* Outage glow signage */}
      <div className="space-y-2 select-none">
        <h1 className="text-8xl sm:text-9xl font-black tracking-widest font-tilt-neon neon-flickering-pink">
          404
        </h1>
        <span className="font-pacifico text-2xl sm:text-3xl font-bold select-none block neon-flickering-blue mt-4">
          Out of glow
        </span>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-base font-bold text-white">Oops! Signage Not Found</h3>
        <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
          The page you are looking for has had a power outage or doesn&apos;t exist. Let&apos;s guide you back to our glowing catalog.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs pt-4">
        <Link 
          href="/" 
          className="flex-1 py-3 bg-linear-to-r from-neon-pink to-neon-blue rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-neon-pink/15"
        >
          <ArrowLeft className="h-4 w-4" /> Home Page
        </Link>
        <Link 
          href="/custom-builder" 
          className="flex-1 py-3 bg-neutral-900 border border-white/10 hover:border-white/20 text-xs font-semibold text-neutral-300 hover:text-white rounded-xl transition-all"
        >
          Neon Builder
        </Link>
      </div>

    </div>
  );
}
