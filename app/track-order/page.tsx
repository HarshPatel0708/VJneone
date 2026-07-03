"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ChevronRight, 
  Search, 
  Truck, 
  CheckCircle, 
  Clock, 
  Hammer, 
  Activity, 
  Gift, 
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [activeTracking, setActiveTracking] = useState<string | null>(null);

  // Sync state with url parameter
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      setOrderId(idParam);
      setActiveTracking(idParam);
    }
  }, [searchParams]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setActiveTracking(orderId.trim());
    }
  };

  // Mock tracking steps definition
  const steps = [
    {
      id: 1,
      title: "Order Confirmed & Placed",
      desc: "Your design configuration has been logged in our workshop database. Materials are prepared.",
      icon: CheckCircle,
      status: "completed",
      date: "July 3, 2026 - 10:24 AM"
    },
    {
      id: 2,
      title: "Digital Proof Inspection",
      desc: "Design engineers checked vector layouts, spacing curves, and LED channel alignment.",
      icon: Activity,
      status: "completed",
      date: "July 3, 2026 - 11:45 AM"
    },
    {
      id: 3,
      title: "Hand-Crafting & Soldering",
      desc: "Our assembly team is hand-soldering your silicone LED neon tubes to the precision-cut acrylic base.",
      icon: Hammer,
      status: "current",
      date: "In Progress"
    },
    {
      id: 4,
      title: "12-Hour Continuous Quality Test",
      desc: "Your finished sign is mounted for 12 hours of continuous glow testing to audit thermal indexes and adapters.",
      icon: Clock,
      status: "pending",
      date: "Pending"
    },
    {
      id: 5,
      title: "Dispatched via DHL / FedEx",
      desc: "Your package is boxed in custom thick double-layered foam casing and dispatched with global shipping insurance.",
      icon: Truck,
      status: "pending",
      date: "Pending"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">Order Tracking</span>
      </div>

      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black">Track Sign Status</h1>
        <p className="text-xs text-neutral-500 font-medium">Follow your custom sign from the soldering table to your front door.</p>
      </div>

      {/* Tracking search panel */}
      <form onSubmit={handleTrackSubmit} className="glass-effect p-6 rounded-3xl border border-white/5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Enter Order / Tracking ID</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                required
                placeholder="e.g. VJ-192834"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-500 focus:border-neon-blue outline-hidden transition-colors font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Truck className="h-4 w-4" /> Track Sign Status
            </button>
          </div>
        </div>
      </form>

      {/* Live tracking timeline results */}
      {activeTracking ? (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-2xl bg-[#09090b] border border-white/5">
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Active Sign Tracking</span>
              <span className="text-sm font-black text-white font-mono">{activeTracking}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Status</span>
              <span className="text-xs font-bold text-neon-blue flex items-center sm:justify-end gap-1">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Soldering Signage Assembly
              </span>
            </div>
          </div>

          {/* Timeline block */}
          <div className="bg-[#09090b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden">
            {/* Timeline line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-neutral-800" />

            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex gap-6 items-start relative z-10 group">
                  
                  {/* Step status node */}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${
                      step.status === "completed"
                        ? "bg-neon-blue/20 border-neon-blue text-neon-blue shadow-neon-blue"
                        : step.status === "current"
                        ? "bg-neon-pink/20 border-neon-pink text-neon-pink shadow-neon-pink animate-pulse"
                        : "bg-neutral-900 border-neutral-800 text-neutral-600"
                    }`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>

                  {/* Step details content */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className={`text-sm font-bold ${
                        step.status === "completed" ? "text-white" : step.status === "current" ? "text-neon-pink" : "text-neutral-500"
                      }`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{step.date}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-semibold max-w-xl">
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="text-center py-16 rounded-3xl bg-neutral-900/20 border border-white/5 text-neutral-500 text-xs">
          Please submit a valid order ID above to view live fabrication status.
        </div>
      )}

    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider animate-pulse">Loading Tracker...</p>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
