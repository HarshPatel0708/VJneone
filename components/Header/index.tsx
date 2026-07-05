"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Search, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Phone,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useConfig, countries } from "@/hooks/useConfig";

export default function Header() {
  const pathname = usePathname();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { country, currency, setCountry } = useConfig();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemsCount = wishlistItems.length;

  // Close overlays on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsConfigOpen(false);
    setIsAccountOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-xs w-full">
      
      {/* TIER 1: TOP ANNOUNCEMENT BAR (Mint Green Theme) */}
      <div className="w-full bg-[#e0fcf5] border-b border-[#c8f5ea] text-neutral-800 text-[10px] sm:text-[11px] font-semibold py-2 px-4 flex items-center justify-between">
        {/* Trustpilot review widget */}
        <div className="flex items-center gap-1 text-[#0f766e]">
          <span className="font-bold">Trustpilot 4.8</span>
          <div className="flex text-amber-500 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
            ))}
          </div>
        </div>

        {/* Dynamic center value points */}
        <div className="hidden md:flex items-center gap-8 text-neutral-600">
          <span>BUY Now, PAY Later</span>
          <span className="border-l border-neutral-300 h-3" />
          <span>We Deliver in 6-9 Days*</span>
          <span className="border-l border-neutral-300 h-3" />
          <span>3 Year Warranty</span>
        </div>

        {/* Right column: Phone contact */}
        <a href="tel:+18483168660" className="flex items-center gap-1.5 text-neutral-700 hover:text-neon-pink transition-colors">
          <div className="p-1 rounded-full bg-neon-pink text-white flex items-center justify-center scale-90">
            <Phone className="h-2.5 w-2.5 fill-white" />
          </div>
          <span className="text-[10px] font-bold">Call Us: +1 (848) 316-8660</span>
        </a>
      </div>

      {/* TIER 2: MIDDLE LOGO & SEARCH ROW (White Theme) */}
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-6">
        
        {/* Left: VJneon Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <Image 
            src="/logo.png" 
            alt="VJneon" 
            width={180} 
            height={55} 
            priority
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-102" 
          />
        </Link>

        {/* Center: Large Persistent Search Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
            }
          }}
          className="hidden md:flex items-center gap-2 border border-neutral-350 rounded-lg px-4 py-2.5 w-full max-w-xl bg-white shadow-xs focus-within:border-neon-blue transition-colors"
        >
          <Search className="h-4 w-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search for product..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs text-neutral-700 placeholder-neutral-400 outline-hidden w-full"
          />
          <button type="submit" className="hidden" />
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile search trigger */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-neutral-600 p-2 hover:bg-neutral-100 rounded-lg cursor-pointer"
            aria-label="Toggle mobile search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Country / Currency dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1 border border-neutral-200 px-3 py-2 rounded-lg bg-neutral-50 cursor-pointer"
            >
              <span>{country.name} | {currency.code} {currency.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <AnimatePresence>
              {isConfigOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white border border-neutral-200 p-2 shadow-2xl z-50"
                >
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCountry(c.code);
                        setIsConfigOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        country.code === c.code 
                          ? "bg-neon-blue/10 text-neon-blue font-semibold" 
                          : "hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-neutral-400 font-semibold">{c.currency}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* My Account Menu */}
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5 border border-neutral-200 px-3 py-2 rounded-lg bg-neutral-50 cursor-pointer"
            >
              <User className="h-4 w-4 text-neutral-500" />
              <span>My Account</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <AnimatePresence>
              {isAccountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white border border-neutral-200 p-2 shadow-2xl z-50 text-xs text-neutral-600"
                >
                  <Link href="/account" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900">Dashboard</Link>
                  <Link href="/account?tab=orders" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900">My Orders</Link>
                  <Link href="/account?tab=wishlist" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900">Wishlist ({wishlistItemsCount})</Link>
                  <Link href="/auth" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 hover:text-neutral-900 border-t border-neutral-100 mt-1 text-neon-pink font-semibold">Sign In / Register</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shopping Cart Icon */}
          <Link 
            href="/cart" 
            className="text-neutral-600 hover:text-neutral-900 transition-colors relative p-2 hover:bg-neutral-50 rounded-lg flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-neon-blue text-[9px] font-bold text-white shadow-neon-blue animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-600 p-2 hover:bg-neutral-50 rounded-lg lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* TIER 3: BOTTOM NAVIGATION BAR (Centered Pink Theme) */}
      <div className="hidden lg:block w-full bg-[#fdeef3] border-t border-b border-[#fbcddc] py-2.5">
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-10 text-xs font-black text-neutral-800 tracking-wider uppercase">
          <Link href="/custom-builder" className="hover:text-neon-pink transition-colors text-neon-pink flex items-center gap-1">
            Create Your Neon <Sparkles className="h-3.5 w-3.5 text-neon-pink" />
          </Link>
          <Link href="/upload-design" className="hover:text-neon-pink transition-colors text-neon-pink">
            Upload Your Design
          </Link>
          <Link href="/shop?category=Channel%20Letters" className="hover:text-neutral-900 transition-colors flex items-center gap-0.5">
            Channel Letters <ChevronDown className="h-3 w-3 text-neutral-400" />
          </Link>
          <Link href="/shop?category=Metal%20Signs" className="hover:text-neutral-900 transition-colors flex items-center gap-0.5">
            Metal Signs <ChevronDown className="h-3 w-3 text-neutral-400" />
          </Link>
          <Link href="/shop?category=Acrylic%20Signs" className="hover:text-neutral-900 transition-colors flex items-center gap-0.5">
            Acrylic Signs <ChevronDown className="h-3 w-3 text-neutral-400" />
          </Link>
          <Link href="/shop?category=Light%20Box" className="hover:text-neutral-900 transition-colors">
            Light Box Sign
          </Link>
          <Link href="/shop" className="hover:text-neutral-900 transition-colors flex items-center gap-0.5">
            Neon Signs <ChevronDown className="h-3 w-3 text-neutral-400" />
          </Link>
        </nav>
      </div>

      {/* Floating Search Overlay Bar (Mobile Only) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-neutral-200 px-6 py-4 bg-white shadow-lg overflow-hidden"
          >
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="flex items-center gap-3 w-full border border-neutral-200 bg-neutral-50 rounded-xl px-4 py-2"
            >
              <Search className="h-4 w-4 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search neon designs, wedding signs, collections..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm w-full outline-hidden text-neutral-800 placeholder-neutral-400"
                autoFocus
              />
              <button type="submit" className="px-3 py-1 rounded-md bg-neon-blue text-xs text-white font-semibold">
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 right-0 z-40 h-full w-full bg-white flex flex-col pt-32 px-8 pb-8 lg:hidden shadow-2xl border-l border-neutral-100"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-5 text-base font-semibold text-neutral-700 overflow-y-auto">
              <Link href="/" className="hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/custom-builder" className="text-neon-blue flex items-center gap-2 hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <Sparkles className="h-5 w-5 animate-pulse" /> Create Your Neon
              </Link>
              <Link href="/upload-design" className="text-neon-pink hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Upload Your Design</Link>
              
              <div className="border-t border-neutral-100 my-1" />
              <Link href="/shop?category=Channel%20Letters" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>🔠 Channel Letters</Link>
              <Link href="/shop?category=Metal%20Signs" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>⚡ Metal Signs</Link>
              <Link href="/shop?category=Acrylic%20Signs" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>💎 Acrylic Signs</Link>
              <Link href="/shop?category=Light%20Box" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>📦 Light Box Signs</Link>
              <Link href="/shop" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>✨ All Neon Signs</Link>
              
              <div className="border-t border-neutral-100 my-1" />
              <Link href="/blog" className="hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link href="/faq" className="hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
              <Link href="/contact" className="hover:text-neutral-950 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link href="/account" className="hover:text-neutral-950 transition-colors flex items-center gap-2 mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="h-5 w-5 text-neon-blue" /> My Account
              </Link>
            </div>

            {/* Mobile Footer Area */}
            <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400">Shipping Country</span>
                <div className="flex items-center gap-1.5 text-sm text-neutral-700">
                  <MapPin className="h-4 w-4 text-neon-blue" />
                  <span>{country.name} ({currency.code})</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCountry("US")} className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${country.code === "US" ? "bg-neon-blue/10 border-neon-blue text-neon-blue" : "border-neutral-200 text-neutral-500"}`}>US</button>
                <button onClick={() => setCountry("GB")} className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${country.code === "GB" ? "bg-neon-blue/10 border-neon-blue text-neon-blue" : "border-neutral-200 text-neutral-500"}`}>UK</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple internal helper StarIcon
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
