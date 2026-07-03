"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  Star,
  Quote,
  Flame,
  UploadCloud,
  PenTool,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import mock data directly
import products from "@/data/products.json";
import blogs from "@/data/blogs.json";
import faqs from "@/data/faq.json";
import testimonials from "@/data/testimonials.json";
import { useConfig } from "@/hooks/useConfig";
import { useWishlist } from "@/hooks/useWishlist";

export default function HomePage() {
  const { formatPrice } = useConfig();
  const { toggleItem, hasItem } = useWishlist();

  // Mini-Builder Experience Center state
  const [expText, setExpText] = useState("Vibe");
  const [expColor, setExpColor] = useState({ hex: "#ff0066", name: "VJ Pink", glow: "rgba(255, 0, 102, 0.8)" });
  const [expBackdrop, setExpBackdrop] = useState("bedroom"); // bar, wedding, bedroom
  
  // FAQ active state
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Parallax / cursor movement tracking (simple simulation)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full bg-[#030303] text-white relative overflow-hidden">
      
      {/* BACKGROUND DECORATIONS (Floating ambient lights) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-3xl -z-10" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[20%] left-10 w-[400px] h-[400px] bg-neon-pink/3 rounded-full blur-3xl -z-10" />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Decorative Grid Lines backdrop */}
        <div className="absolute inset-0 bg-grid-lines pointer-events-none -z-20 opacity-40" />

        {/* Left Column: Bold headings, calls to action (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-neon-pink/10 to-neon-blue/10 border border-white/10 text-xs font-semibold text-neutral-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-neon-pink animate-spin" style={{ animationDuration: '4s' }} /> 
            <span>Premium LED Signage Art</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]"
          >
            Glow Up Your Brand With <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-neon-pink via-white to-neon-blue bg-clip-text text-transparent filter drop-shadow-sm">
              Custom Neon Art
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed font-medium"
          >
            Luxury design meets safe, energy-efficient illumination. Create bespoke signature signage for your wedding backdrop, corporate workspace, storefront, or bedroom using our advanced live builder.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md"
          >
            <Link 
              href="/custom-builder" 
              className="px-8 py-4 rounded-2xl bg-linear-to-r from-neon-pink to-neon-blue text-sm font-bold text-white text-center hover:scale-[1.02] transition-all shadow-lg shadow-neon-pink/10 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Custom Neon Builder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/shop" 
              className="px-8 py-4 rounded-2xl bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-sm font-semibold text-neutral-300 text-center hover:text-white transition-colors cursor-pointer"
            >
              Browse Shop Catalog
            </Link>
          </motion.div>

          {/* Statistics small layout */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 max-w-lg"
          >
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">50k+</div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Hours Lifespan</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-neon-blue">2-Year</div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Full Warranty</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-neon-pink">12-Hour</div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Design Mockup</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Parallax Glowing Neon Frame Showcase (5 Columns) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div 
            style={{ 
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: "transform 0.1s ease-out" 
            }}
            className="w-full aspect-square max-w-[380px] rounded-3xl bg-[#09090b] border border-white/10 p-8 shadow-2xl relative flex items-center justify-center overflow-hidden"
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

            {/* Glowing sign display */}
            <div className="text-center space-y-4">
              <span className="font-sacramento text-4xl sm:text-5xl text-neon-pink font-bold block select-none" style={{ textShadow: "0 0 10px #ff0066, 0 0 20px #ff0066" }}>
                vj neon
              </span>
              <span className="font-tilt-neon text-2xl sm:text-3xl text-neon-blue font-bold block select-none uppercase tracking-widest" style={{ textShadow: "0 0 10px #0080ff, 0 0 20px #0080ff" }}>
                Glow
              </span>
            </div>

            {/* Dynamic floating circles decoration */}
            <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-neon-pink/15 blur-md animate-float" />
            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-neon-blue/15 blur-md animate-float" style={{ animationDelay: '2s' }} />
          </motion.div>
        </div>
      </section>

      {/* 2. CREATIVE CORNER CTA (CUSTOM vs UPLOAD) */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Custom Builder Promo Card */}
        <div className="relative rounded-3xl bg-neutral-900/40 border border-white/5 p-8 overflow-hidden group hover:border-neon-blue/30 transition-colors">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-blue/20 transition-colors" />
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-neon-blue/10 border border-neon-blue/20 text-neon-blue">
              <PenTool className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Custom Neon Builder</h3>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Type your own quotes, choose from 15+ fonts, select a custom glow color, and visually preview the sign against multiple walls instantly.
            </p>
            <Link 
              href="/custom-builder" 
              className="inline-flex items-center gap-1 text-xs font-bold text-neon-blue hover:underline pt-2 cursor-pointer"
            >
              Start Designing Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Logo Art Upload Promo Card */}
        <div className="relative rounded-3xl bg-neutral-900/40 border border-white/5 p-8 overflow-hidden group hover:border-neon-pink/30 transition-colors">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-pink/20 transition-colors" />
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-neon-pink/10 border border-neon-pink/20 text-neon-pink">
              <UploadCloud className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Upload Brand Artwork</h3>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Do you have a complex logo, custom graphic, or signature file? Drag and drop your file, and get a free mockup from our designers.
            </p>
            <Link 
              href="/upload-design" 
              className="inline-flex items-center gap-1 text-xs font-bold text-neon-pink hover:underline pt-2 cursor-pointer"
            >
              Upload Your Logo File <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-black">Popular Preset Collections</h2>
          <p className="text-xs text-neutral-500 mt-2 font-medium">Browse our most popular pre-configured LED neon signage collections.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Wedding Collection", code: "Wedding%20Collection", desc: "Elegant handwriting and romantic script text", emoji: "💍", color: "neon-pink" },
            { name: "Business Signs", code: "Business%20Signs", desc: "Storefront branding, lobbies, and workspace accents", emoji: "💼", color: "neon-blue" },
            { name: "Home Decor", code: "Home%20Decor", desc: "Vibrant custom statements for bedrooms and living spaces", emoji: "🏡", color: "neon-pink" },
            { name: "Channel Letters", code: "Channel%20Letters", desc: "Commercial three-dimensional storefront facings", emoji: "🏢", color: "neon-blue" }
          ].map((cat) => (
            <Link 
              key={cat.name} 
              href={`/shop?category=${cat.code}`}
              className="group relative rounded-2xl bg-[#09090b] border border-white/5 p-6 hover:scale-[1.02] hover:border-white/10 transition-all flex flex-col justify-between aspect-square cursor-pointer"
            >
              {/* Backglow on hover */}
              <div className={`absolute inset-0 bg-radial-gradient from-${cat.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />

              <span className="text-4xl block select-none">{cat.emoji}</span>
              <div className="space-y-1 mt-6 relative z-10">
                <h3 className="text-base font-bold text-white group-hover:text-neon-blue transition-colors flex items-center gap-1">
                  {cat.name} <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. THE INTERACTIVE EXPERIENCE CENTER */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black">Experience Center</h2>
          <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
            Test how neon lights reflect against real-world background rooms dynamically before ordering. Type your vibe below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#09090c] border border-white/5 p-6 md:p-10 relative overflow-hidden">
          
          {/* Left Panel: Preview Room (7 Columns) */}
          <div className="lg:col-span-7 aspect-[4/3] rounded-2xl relative overflow-hidden border border-white/5 flex items-center justify-center">
            
            {/* Ambient reflection */}
            <div 
              style={{
                background: `radial-gradient(circle, ${expColor.glow} 0%, transparent 60%)`,
                opacity: 0.55
              }}
              className="absolute inset-0 pointer-events-none transition-all duration-300"
            />

            {/* Room Background simulators */}
            {expBackdrop === "bedroom" && (
              <div className="absolute inset-0 bg-[#121215] flex items-center justify-center">
                {/* CSS Headboard simulation */}
                <div className="absolute bottom-0 w-full h-[35%] bg-neutral-900 border-t border-white/5 flex justify-around p-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800" />
                  <div className="w-10 h-10 rounded-full bg-neutral-800" />
                </div>
                {/* CSS bed pillow simulation */}
                <div className="absolute bottom-[35%] w-[80%] h-8 bg-neutral-800 rounded-t-xl" />
              </div>
            )}

            {expBackdrop === "bar" && (
              <div className="absolute inset-0 bg-[#0a0a0c] flex items-center justify-center">
                {/* Bar shelving simulation */}
                <div className="absolute inset-x-0 top-[20%] h-0.5 bg-neutral-800" />
                <div className="absolute inset-x-0 top-[50%] h-0.5 bg-neutral-800" />
                <div className="absolute top-[8%] left-[20%] w-6 h-10 bg-amber-900/40 border border-amber-900/60 rounded-t-sm" />
                <div className="absolute top-[38%] right-[30%] w-8 h-12 bg-emerald-950/40 border border-emerald-900/60 rounded-t-sm" />
              </div>
            )}

            {expBackdrop === "wedding" && (
              <div className="absolute inset-0 bg-[#1a1414] flex items-center justify-center">
                {/* Floral wedding arch simulation */}
                <div className="absolute w-[70%] aspect-square rounded-full border-[8px] border-amber-900/20 top-6" />
                <div className="absolute top-12 left-1/4 w-8 h-8 rounded-full bg-[#180f12] border border-neutral-800" />
                <div className="absolute top-20 right-1/4 w-10 h-10 rounded-full bg-[#180f12] border border-neutral-800" />
              </div>
            )}

            {/* The Floating Neon Sign */}
            <div className="relative select-none text-center z-10">
              <span 
                style={{
                  color: expColor.hex,
                  textShadow: `0 0 5px #fff, 0 0 10px #fff, 0 0 25px ${expColor.hex}, 0 0 45px ${expColor.hex}`
                }}
                className="font-pacifico text-5xl md:text-7xl font-bold select-none block tracking-wide"
              >
                {expText || "Glow"}
              </span>
            </div>

            {/* Overlay shadows */}
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          </div>

          {/* Right Panel: Controls (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Input message */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Type Your Word</label>
              <input 
                type="text" 
                maxLength={12}
                value={expText}
                onChange={(e) => setExpText(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors font-semibold"
              />
            </div>

            {/* Color select row */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Choose Neon Glow</label>
              <div className="flex gap-2">
                {[
                  { name: "VJ Pink", hex: "#ff0066", glow: "rgba(255,0,102,0.8)" },
                  { name: "VJ Blue", hex: "#0080ff", glow: "rgba(0,128,255,0.8)" },
                  { name: "Golden Yellow", hex: "#ffb700", glow: "rgba(255,183,0,0.8)" }
                ].map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setExpColor(col)}
                    style={{ borderColor: expColor.name === col.name ? col.hex : "rgba(255,255,255,0.05)" }}
                    className="flex-1 py-2 rounded-xl bg-neutral-900 text-[10px] font-bold text-white border flex items-center justify-center gap-1.5 cursor-pointer hover:bg-neutral-800 transition-colors"
                  >
                    <span style={{ backgroundColor: col.hex }} className="w-2.5 h-2.5 rounded-full" />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Backdrop select row */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Select Room Backdrop</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "bedroom", label: "🏡 Bedroom" },
                  { id: "bar", label: "🍹 Bar Wall" },
                  { id: "wedding", label: "💍 Wedding Arch" }
                ].map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setExpBackdrop(room.id)}
                    className={`py-2 rounded-xl text-[10px] font-bold border transition-colors cursor-pointer ${
                      expBackdrop === room.id 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-neutral-900 border-white/5 text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-4">
              <p className="text-xs text-neutral-400 leading-relaxed font-semibold">
                * This is a quick demo. Enter our custom builder for full text sizes, letter spacing adjustments, 15+ cursive fonts, backboard outlines, and controller accessories.
              </p>
              <Link 
                href={`/custom-builder?text=${encodeURIComponent(expText)}&color=${encodeURIComponent(expColor.name)}`}
                className="w-full py-3 bg-linear-to-r from-neon-pink to-neon-blue rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
              >
                Go to Full Neon Builder <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FEATURED PRESET PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-black">Featured Preset Signs</h2>
            <p className="text-xs text-neutral-500 mt-2 font-medium">Bestselling LED neon signs hand-crafted by design experts.</p>
          </div>
          <Link href="/shop" className="text-xs font-bold text-neon-blue hover:underline flex items-center gap-1.5 cursor-pointer">
            Browse Full Shop Catalog <ChevronDown className="h-4 w-4 -rotate-90" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => {
            const isWishlisted = hasItem(product.id);
            return (
              <div 
                key={product.id}
                className="group relative rounded-2xl bg-[#09090b] border border-white/5 overflow-hidden flex flex-col justify-between aspect-[3/4] hover:border-white/10 transition-all hover:scale-[1.01]"
              >
                
                {/* Photo backdrop */}
                <div className="w-full aspect-square bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />
                  
                  {/* Decorative glowing neon representation */}
                  <span 
                    style={{
                      color: product.colors[0]?.hex || "#ffffff",
                      textShadow: `0 0 5px #fff, 0 0 15px ${product.colors[0]?.hex || "#0080ff"}`
                    }}
                    className="font-pacifico text-3xl font-bold select-none group-hover:scale-105 transition-transform duration-300"
                  >
                    {product.name.replace("Sign", "").replace("LED", "").replace("Glow", "")}
                  </span>

                  {/* Wishlist toggle button */}
                  <button 
                    onClick={() => toggleItem(product.id)}
                    className={`absolute top-4 right-4 p-2 rounded-lg border backdrop-blur-md cursor-pointer transition-colors ${
                      isWishlisted 
                        ? "bg-neon-pink/20 border-neon-pink/30 text-neon-pink" 
                        : "bg-black/40 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Star className="h-4 w-4" fill={isWishlisted ? "#ff0066" : "none"} />
                  </button>

                  {/* Category Badge */}
                  <span className="absolute bottom-4 left-4 px-2 py-0.5 rounded-md bg-black/60 border border-white/5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                {/* Details bottom pane */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Link href={`/shop/${product.slug}`} className="text-sm font-bold text-white hover:text-neon-blue transition-colors truncate">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-1 font-semibold text-neutral-400 text-xs flex-shrink-0">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-relaxed font-semibold line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Starts at</span>
                      <span className="text-base font-black text-white">{formatPrice(product.price)}</span>
                    </div>
                    
                    <Link 
                      href={`/shop/${product.slug}`} 
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 text-xs font-bold text-neutral-200 hover:text-white transition-all cursor-pointer"
                    >
                      Configure
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 6. TRUST & REVIEWS BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Why VJneon Trust banner (5 Columns) */}
        <div className="lg:col-span-5 rounded-3xl bg-linear-to-r from-neon-pink/5 to-neon-blue/5 border border-white/5 p-8 flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase font-bold text-neon-blue tracking-widest block">VJ Craftsmanship</span>
            <h2 className="text-2xl sm:text-3xl font-black">Why Brands Trust VJneon</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
              We engineer luxury LED signage with pixel-perfect laser cutting, certified energy-efficient electrical cores, and ultra-durable silicone housings. No hot spots, no glass fractures, just a flawless glow.
            </p>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-3 text-xs text-neutral-300 font-semibold">
              <ShieldCheck className="h-4.5 w-4.5 text-neon-pink" /> 2-Year comprehensive warranty sheet
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-300 font-semibold">
              <Truck className="h-4.5 w-4.5 text-neon-blue" /> Free global door-to-door delivery
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-300 font-semibold">
              <Clock className="h-4.5 w-4.5 text-neutral-400" /> Rush order dispatch within 4-6 business days
            </div>
          </div>
        </div>

        {/* Customer Testimonials Carousel grid (7 Columns) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-neon-pink/30 to-neon-blue/30 flex items-center justify-center text-xs font-bold text-white border border-white/10 select-none">
                  {test.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{test.name}</h4>
                  <span className="text-[10px] text-neutral-500 font-semibold block">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LATEST BLOG ARTICLES */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-black">Latest Signage Insights</h2>
            <p className="text-xs text-neutral-500 mt-2 font-medium">Read guides on business branding, wedding design tips, and neon trends.</p>
          </div>
          <Link href="/blog" className="text-xs font-bold text-neon-pink hover:underline flex items-center gap-1 cursor-pointer">
            Browse All Articles <ChevronDown className="h-4 w-4 -rotate-90" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl bg-[#09090b] border border-white/5 overflow-hidden hover:border-white/10 hover:scale-[1.01] transition-all flex flex-col justify-between aspect-[4/5] cursor-pointer"
            >
              {/* Cover card representation */}
              <div className="w-full aspect-[16/10] bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />
                <Bookmark className="h-10 w-10 text-neutral-700 group-hover:scale-110 transition-transform" />
                
                {/* Floating category flag */}
                <span className="absolute top-4 left-4 px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <span className="text-[10px] text-neutral-500 font-semibold">{post.date} • {post.readingTime}</span>
                  <h3 className="text-sm font-bold text-white group-hover:text-neon-pink transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-neutral-400 leading-relaxed font-semibold line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <span className="text-[10px] font-bold text-neon-pink group-hover:underline flex items-center gap-1 mt-2">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDIONS */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black">General Questions</h2>
          <p className="text-xs text-neutral-500 font-medium">Find quick answers to common queries about LED signs.</p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id}
                className="rounded-2xl border border-white/5 bg-[#09090b] overflow-hidden transition-colors hover:border-white/10"
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
      </section>

    </div>
  );
}
