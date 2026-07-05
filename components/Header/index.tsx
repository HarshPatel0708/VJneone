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

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemsCount = wishlistItems.length;

  // Track scrolling to toggle dark glass styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close overlays on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMegaMenuOpen(false);
    setIsConfigOpen(false);
  }, [pathname]);

  const announcements = [
    "🔥 Summer Sale: 15% OFF Custom Neon Signs — Code: NEONGLOW",
    "🚚 Free Insured Global Delivery on Orders Above $250",
    "⚡ Insured Damage Replacement: Broken in transit? We replace it free!"
  ];

  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-linear-to-r from-neon-pink to-neon-blue text-white text-[11px] font-bold py-2.5 px-4 text-center relative z-50 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2"
          >
            <span>{announcements[announcementIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navigation Header */}
      <header 
        className={`fixed top-12 left-0 right-0 z-40 mx-auto w-[92%] max-w-7xl rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border border-neutral-200 shadow-md text-neutral-800" 
            : "bg-white/40 backdrop-blur-xs border border-white/20 text-neutral-800"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 md:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative">
            <Image 
              src="/logo.png" 
              alt="VJneon" 
              width={180} 
              height={55} 
              priority
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            {/* Soft pink and blue back-glow behind logo on hover */}
            <div className="absolute -inset-2 rounded-lg bg-linear-to-r from-neon-pink/10 to-neon-blue/10 opacity-0 blur-md group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </Link>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-neutral-600">
            <Link 
              href="/" 
              className={`hover:text-neutral-900 transition-colors ${pathname === "/" ? "text-neon-pink font-bold" : ""}`}
            >
              Home
            </Link>
            
            {/* Shop with Mega Menu trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 hover:text-neutral-900 transition-colors cursor-pointer py-4 ${
                  pathname.startsWith("/shop") ? "text-neon-pink font-bold" : ""
                }`}
              >
                Collections <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] rounded-3xl bg-white border border-neutral-200 p-7 grid grid-cols-3 gap-6 shadow-2xl mt-2 backdrop-blur-xl z-50 text-neutral-800"
                  >
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">Sign Collections</h4>
                      <ul className="space-y-2.5 text-sm font-medium text-neutral-600">
                        <li>
                          <Link href="/shop?category=Wedding%20Collection" className="hover:text-neon-pink transition-colors">Wedding Signs</Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Business%20Signs" className="hover:text-neon-blue transition-colors">Business Signage</Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Home%20Decor" className="hover:text-neon-pink transition-colors">Home Decor Signs</Link>
                        </li>
                        <li>
                          <Link href="/shop" className="text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-1 font-bold mt-4">
                            Browse All Presets <Sparkles className="h-3.5 w-3.5 text-neon-blue animate-pulse-slow" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">Custom Shop</h4>
                      <ul className="space-y-2.5 text-sm font-semibold">
                        <li>
                          <Link href="/custom-builder" className="hover:text-neon-blue transition-colors text-neon-blue flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '8s' }} /> Custom Neon Builder
                          </Link>
                        </li>
                        <li>
                          <Link href="/upload-design" className="hover:text-neon-pink transition-colors text-neon-pink">
                            🚀 Upload Your Logo Design
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Channel%20Letters" className="hover:text-neutral-900 text-neutral-600 transition-colors">3D Channel Letters</Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Light%20Box" className="hover:text-neutral-900 text-neutral-600 transition-colors">Projecting Light Boxes</Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Acrylic%20Signs" className="hover:text-neutral-900 text-neutral-600 transition-colors">Laser-Cut Acrylics</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 rounded-xl p-4 flex flex-col justify-between border border-neutral-200/60 relative overflow-hidden group/menu">
                      <div className="space-y-2 relative z-10">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neon-pink text-white">Interactive</span>
                        <h5 className="text-sm font-semibold text-neutral-800 mt-2">VJ Experience Center</h5>
                        <p className="text-xs text-neutral-500">Preview neon designs against 3D customizable rooms dynamically.</p>
                      </div>
                      <Link 
                        href="/custom-builder" 
                        className="text-xs font-bold text-neon-blue hover:underline mt-4 relative z-10 flex items-center gap-1"
                      >
                        Try Builder Now →
                      </Link>
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-neon-blue/10 rounded-full blur-xl group-hover/menu:bg-neon-blue/20 transition-colors duration-300" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/custom-builder" 
              className={`hover:text-neutral-900 transition-colors flex items-center gap-1 ${
                pathname === "/custom-builder" ? "text-neon-blue font-bold" : ""
              }`}
            >
              Neon Builder
            </Link>

            <Link 
              href="/upload-design" 
              className={`hover:text-neutral-900 transition-colors ${
                pathname === "/upload-design" ? "text-neon-pink font-bold" : ""
              }`}
            >
              Upload Design
            </Link>

            <Link 
              href="/blog" 
              className={`hover:text-neutral-900 transition-colors ${pathname === "/blog" ? "text-neon-pink font-bold" : ""}`}
            >
              Blog
            </Link>

            <Link 
              href="/faq" 
              className={`hover:text-neutral-900 transition-colors ${pathname === "/faq" ? "text-neon-pink font-bold" : ""}`}
            >
              FAQs
            </Link>

            <Link 
              href="/contact" 
              className={`hover:text-neutral-900 transition-colors ${pathname === "/contact" ? "text-neon-pink font-bold" : ""}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Bar (Search, Config, Wishlist, Cart, Account, Mobile Menu trigger) */}
          <div className="flex items-center gap-4">
            
            {/* Search Toggle button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-neutral-500 hover:text-neutral-900 transition-colors relative p-1.5 hover:bg-neutral-100 rounded-lg cursor-pointer"
              aria-label="Search site"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Country & Currency Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors border border-neutral-200 px-2.5 py-1.5 rounded-lg bg-neutral-50 cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-neon-blue" />
                <span>{country.code} ({currency.symbol})</span>
              </button>

              <AnimatePresence>
                {isConfigOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white border border-neutral-200 p-2 shadow-2xl z-50"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-neutral-400 border-b border-neutral-100 mb-1.5">
                      Select Country
                    </div>
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

            {/* Wishlist Link */}
            <Link 
              href="/account?tab=wishlist" 
              className="text-neutral-500 hover:text-neutral-900 transition-colors relative p-1.5 hover:bg-neutral-100 rounded-lg hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-neon-pink text-[9px] font-bold text-white shadow-neon-pink">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link 
              href="/cart" 
              className="text-neutral-500 hover:text-neutral-900 transition-colors relative p-1.5 hover:bg-neutral-100 rounded-lg"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-neon-blue text-[9px] font-bold text-white shadow-neon-blue animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Account Dashboard / Auth Link */}
            <Link 
              href="/account" 
              className="text-neutral-500 hover:text-neutral-900 transition-colors p-1.5 hover:bg-neutral-100 rounded-lg hidden sm:block"
              aria-label="Account dashboard"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile Menu trigger toggle button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-500 hover:text-neutral-900 transition-colors p-1.5 hover:bg-neutral-100 rounded-lg lg:hidden cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Floating Search Overlay Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-neutral-200 px-6 py-4 bg-white/95 backdrop-blur-md rounded-b-2xl overflow-hidden shadow-lg"
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="flex items-center gap-3 w-full max-w-xl mx-auto border border-neutral-200 bg-neutral-50 rounded-xl px-4 py-2"
              >
                <Search className="h-5 w-5 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search neon designs, wedding signs, collections..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full outline-hidden text-neutral-800 placeholder-neutral-400"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery("")}
                    className="text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button 
                  type="submit"
                  className="px-3 py-1 rounded-md bg-neon-blue text-xs text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 right-0 z-40 h-full w-full bg-white flex flex-col pt-24 px-8 pb-8 lg:hidden shadow-2xl border-l border-neutral-100"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-5 text-lg font-semibold text-neutral-700 overflow-y-auto">
              <Link 
                href="/" 
                className="hover:text-neutral-950 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/custom-builder" 
                className="text-neon-blue flex items-center gap-2 hover:text-neutral-950 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="h-5 w-5" /> Custom Neon Builder
              </Link>
              <Link 
                href="/upload-design" 
                className="text-neon-pink hover:text-neutral-950 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upload Design
              </Link>
              <div className="border-t border-neutral-100 my-1" />
              <Link 
                href="/shop?category=Wedding%20Collection" 
                className="text-sm hover:text-neutral-950 transition-colors text-neutral-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                💍 Wedding Signs
              </Link>
              <Link 
                href="/shop?category=Business%20Signs" 
                className="text-sm hover:text-neutral-950 transition-colors text-neutral-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                💼 Business Signs
              </Link>
              <Link 
                href="/shop?category=Home%20Decor" 
                className="text-sm hover:text-neutral-950 transition-colors text-neutral-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏡 Home Decor Signs
              </Link>
              <div className="border-t border-neutral-100 my-1" />
              <Link 
                href="/blog" 
                className="text-base hover:text-neutral-950 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/faq" 
                className="text-base hover:text-neutral-950 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                href="/contact" 
                className="text-base hover:text-neutral-950 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/account" 
                className="text-base hover:text-neutral-950 transition-colors flex items-center gap-2 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
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
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCountry(c.code)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md border transition-colors ${
                      country.code === c.code 
                        ? "bg-neon-blue/10 border-neon-blue text-neon-blue" 
                        : "border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
