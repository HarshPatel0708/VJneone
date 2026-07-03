"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Star,
  Truck,
  Sparkles
} from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useConfig } from "@/hooks/useConfig";
import products from "@/data/products.json";

export default function AccountPage() {
  const { formatPrice } = useConfig();
  const { items: wishlistIds, toggleItem } = useWishlist();
  
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialTab = searchParams?.get("tab") || "orders";
  
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab with URL search parameter if modified
  useEffect(() => {
    if (searchParams) {
      setActiveTab(searchParams.get("tab") || "orders");
    }
  }, [searchParams]);

  // Load wishlist products
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Mock order histories
  const orders = [
    {
      id: "VJ-928473",
      date: "July 2, 2026",
      status: "In Fabrication",
      total: 364,
      items: "Happily Ever After Sign (Medium, VJ Pink)"
    },
    {
      id: "VJ-182736",
      date: "May 14, 2026",
      status: "Shipped & Delivered",
      total: 189,
      items: "Good Vibes Only Sign (Small, Electric Blue)"
    }
  ];

  const handleLogout = () => {
    // Redirect to login page
    window.location.href = "/auth";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">My Account</span>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#09090b] border border-white/5 p-6 rounded-3xl">
        <div className="flex items-center gap-4.5">
          <div className="w-14 h-14 rounded-full bg-linear-to-r from-neon-pink/30 to-neon-blue/30 border border-white/10 flex items-center justify-center text-xl font-bold text-white">
            AM
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
              Alex Mercer <span className="px-2 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-[9px] font-bold text-neon-blue">VIP Member</span>
            </h2>
            <p className="text-[10px] text-neutral-500 mt-0.5">Member since 2024 • alex@mercer.com</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="text-xs font-bold text-neutral-500 hover:text-neon-pink transition-colors flex items-center gap-1 cursor-pointer"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      {/* Grid: Navigation Sidebar (3 columns) & Display panel (9 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-[#09090b] border border-white/5 p-4 rounded-3xl space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "orders" 
                ? "bg-neon-blue/20 text-white" 
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ShoppingBag className="h-4 w-4" /> Active Sign Orders
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "wishlist" 
                ? "bg-neon-pink/20 text-white" 
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Heart className="h-4 w-4" /> Sign Wishlist ({wishlistIds.length})
          </button>

          <button
            onClick={() => setActiveTab("details")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "details" 
                ? "bg-white/10 text-white" 
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" /> Profile Credentials
          </button>
        </aside>

        {/* Tab display panels */}
        <section className="lg:col-span-9">
          
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
                Sign Fabrication History
              </h3>

              {orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="p-5 rounded-2xl bg-[#09090b] border border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">{ord.date}</span>
                    <h4 className="text-sm font-bold text-white font-mono">{ord.id}</h4>
                    <p className="text-xs text-neutral-400 font-semibold">{ord.items}</p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-3.5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                    <div className="text-left sm:text-right">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Price Total</span>
                      <span className="text-sm font-black text-white">{formatPrice(ord.total)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold border ${
                        ord.status === "In Fabrication" 
                          ? "bg-neon-pink/10 border-neon-pink/20 text-neon-pink" 
                          : "bg-neutral-900 border-neutral-800 text-neutral-400"
                      }`}>
                        {ord.status}
                      </span>
                      
                      <Link 
                        href={`/track-order?id=${ord.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-neutral-950 border border-white/10 hover:border-white/20 text-[10px] font-bold text-neutral-200"
                      >
                        Track Status
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
                Saved Signs Wishlist
              </h3>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 text-xs rounded-2xl bg-[#09090b] border border-white/5">
                  Your wishlist is empty. Browse preset catalog signs to add them.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistProducts.map((p) => (
                    <div 
                      key={p.id}
                      className="group relative rounded-2xl bg-[#09090b] border border-white/5 overflow-hidden flex flex-col justify-between aspect-[3/4] hover:border-white/10 transition-all hover:scale-[1.01]"
                    >
                      <div className="w-full aspect-square bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                        <span 
                          style={{
                            color: p.colors[0]?.hex || "#ffffff",
                            textShadow: `0 0 5px #fff, 0 0 15px ${p.colors[0]?.hex || "#0080ff"}`
                          }}
                          className="font-pacifico text-2xl font-bold select-none group-hover:scale-105 transition-transform"
                        >
                          {p.name.replace("Sign", "").replace("LED", "").replace("Glow", "")}
                        </span>

                        {/* Remove item button */}
                        <button
                          onClick={() => toggleItem(p.id)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 border border-white/10 text-neutral-400 hover:text-neon-pink transition-colors cursor-pointer"
                        >
                          <Heart className="h-4.5 w-4.5 text-neon-pink" fill="#ff0066" />
                        </button>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="flex justify-between items-center">
                          <Link href={`/shop/${p.slug}`} className="text-xs font-bold text-white hover:text-neon-blue transition-colors truncate">
                            {p.name}
                          </Link>
                          <div className="flex items-center gap-1 font-semibold text-neutral-400 text-[10px] flex-shrink-0">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span>{p.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <span className="text-sm font-black text-white">{formatPrice(p.price)}</span>
                          <Link 
                            href={`/shop/${p.slug}`} 
                            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/20 text-[10px] font-bold text-neutral-200"
                          >
                            Configure
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DETAILS TAB */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
                Profile Credentials
              </h3>

              <div className="p-6 rounded-2xl bg-[#09090b] border border-white/5 space-y-4 text-xs font-semibold text-neutral-400">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Full Name</span>
                    <span className="text-white text-sm">Alex Mercer</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Email Address</span>
                    <span className="text-white text-sm">alex@mercer.com</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Delivery Address</span>
                    <span className="text-white text-sm leading-relaxed">
                      128 Neon Glow Lane, Suite 400<br />
                      Los Angeles, CA 90001
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Membership Class</span>
                    <span className="text-neon-blue text-sm flex items-center gap-1 font-bold">
                      <Sparkles className="h-4 w-4 animate-pulse" /> VIP Customer Tier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

      </div>

    </div>
  );
}
