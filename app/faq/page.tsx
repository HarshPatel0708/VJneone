"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faqs from "@/data/faq.json";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-8">
      
      {/* FAQ Schema JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }),
        }}
      />

      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">FAQs</span>
      </div>

      <div className="text-center md:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-xs font-semibold text-neon-blue">
          <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
        </div>
        <h1 className="text-3xl md:text-5xl font-black">Common Inquiries</h1>
        <p className="text-xs md:text-sm text-neutral-500 font-medium leading-relaxed">
          Need details about custom sign mounting standoffs, production turnarounds, outdoor waterproofing, or warranty replacements? Browse categories below.
        </p>
      </div>

      {/* Accordions list */}
      <div className="space-y-4 pt-4">
        {faqs.map((faq) => {
          const isOpen = activeFaq === faq.id;
          return (
            <div 
              key={faq.id}
              className="rounded-2xl border border-white/5 bg-[#09090b] overflow-hidden hover:border-white/10 transition-colors"
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white cursor-pointer select-none"
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown className={`h-4.5 w-4.5 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-white/5 bg-black/40"
                  >
                    <p className="p-5 text-xs text-neutral-400 leading-relaxed font-semibold">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
