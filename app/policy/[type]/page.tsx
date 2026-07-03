"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Scale, FileText } from "lucide-react";

interface PolicyPageProps {
  params: Promise<{ type: string }>;
}

const policyData: Record<string, { title: string; desc: string; content: string[] }> = {
  warranty: {
    title: "Warranty & Gurantee Policy",
    desc: "We stand behind the robust craftsmanship of our hand-assembled LED neon signs.",
    content: [
      "VJneon offers a 2-Year Manufacturer Warranty on all indoor signs covering electrical modules, LED diodes, dimmers, and power adapters.",
      "Outdoor weatherproofed signs (IP67 upgrade) include a 1-Year Warranty.",
      "If your sign malfunctions or has component breakdowns within the warranty period, we will manufacture and ship replacement parts or a complete new sign free of charge.",
      "Warranty exclusions: damage caused by improper installation, accidental drops, or water exposure on non-weatherproofed signs."
    ]
  },
  shipping: {
    title: "Shipping & Global Delivery",
    desc: "How we pack and deliver your neon signs safely door-to-door.",
    content: [
      "We offer Free Insured Global Delivery on all orders totaling over $250. Orders under $250 incur a flat $25 shipping charge.",
      "Standard turnaround time is 7 to 10 business days, including fabrication time, continuous quality inspection, and express shipping.",
      "Rush order priority shipping is available at checkout for an additional charge, guaranteeing delivery in 4 to 6 business days.",
      "Every package is fully insured. If FedEx, DHL, or UPS damages your sign during shipping, we will manufacture and ship a replacement sign free of charge."
    ]
  },
  refund: {
    title: "Refunds & Returns Policy",
    desc: "Policies regarding order cancellations, changes, and damage replacements.",
    content: [
      "Since every custom sign and preset variant is made-to-order, we do not accept standard returns or exchanges for change of mind.",
      "Order changes or cancellations are permitted within 24 hours of placing the order. After 24 hours, materials are cut, and fabrication starts, meaning orders cannot be canceled.",
      "If your sign arrives damaged or with factory defects, email support@vjneon.com with photos of the sign and packaging within 7 days of delivery. We will immediately expedite a free replacement sign."
    ]
  },
  terms: {
    title: "Terms of Service",
    desc: "The rules and agreements for shopping at VJneon.",
    content: [
      "By placing an order on vjneon.com, you agree to provide accurate, complete billing, shipping, and credit card details.",
      "Prices are calculated in real time using selected sizes and accessories. We reserve the right to correct pricing errors before shipping.",
      "All intellectual property, website design scripts, Custom Neon Builder source files, and brand assets remain the exclusive property of VJneon.",
      "Any disputes regarding custom signs or custom designs will be governed by the laws of California, United States."
    ]
  },
  privacy: {
    title: "Privacy & Data Safety",
    desc: "How we collect, store, and protect your personal information.",
    content: [
      "We collect personal credentials (name, email, shipping address, card details) solely to process and ship your orders.",
      "We do not store complete credit card details on our servers. Transactions are processed securely via SSL encrypted stripe-compliant payment integrations.",
      "We collect analytics data (page views, builder configurations) to optimize website performance and user experience.",
      "We will never sell or distribute your personal details to third-party marketing companies."
    ]
  }
};

export default function PolicyDetailPage({ params }: PolicyPageProps) {
  const { type } = use(params);
  const data = policyData[type.toLowerCase()];

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">Policies</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400 capitalize">{type}</span>
      </div>

      {/* Header */}
      <div className="space-y-3 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/10 text-xs font-semibold text-neutral-400">
          {type === "terms" || type === "privacy" ? <Scale className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
          <span>Official Document</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black">{data.title}</h1>
        <p className="text-xs md:text-sm text-neutral-500 font-medium leading-relaxed">{data.desc}</p>
      </div>

      {/* Content clauses */}
      <div className="bg-[#09090b] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        {data.content.map((clause, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/10 text-neutral-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 select-none">
              {index + 1}
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-semibold">
              {clause}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
