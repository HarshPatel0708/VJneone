"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Star,
  Quote,
  Flame,
  ArrowUpRight,
  Upload,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  CheckCircle,
  Play,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Tags,
  EyeOff,
  Wallet,
  Award,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import mock data
import products from "@/data/products.json";
import blogs from "@/data/blogs.json";
import faqs from "@/data/faq.json";
import testimonials from "@/data/testimonials.json";
import { useConfig } from "@/hooks/useConfig";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import canvasConfetti from "canvas-confetti";

export default function HomePage() {
  const { formatPrice } = useConfig();
  const { toggleItem, hasItem } = useWishlist();
  const { addItem } = useCart();

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Best Sellers active category state
  const [activeTab, setActiveTab] = useState<string>("All Sellers");

  // Promo Slider Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // About expand state
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const heroSlides = [
    {
      id: "metal-signs",
      title: "METAL SIGNS",
      subtitle: "Durable Metal, Endless Creativity",
      bgClass: "from-neutral-100 via-neutral-50 to-neutral-200",
      primaryBtn: "EXPLORE MORE",
      link: "/shop?category=Metal%20Signs",
      badge: "10% OFF — CODE: METAL10"
    },
    {
      id: "beer-bar",
      title: "BEER & BAR NEON SIGNS",
      subtitle: "Illuminated Party Vibes",
      bgClass: "from-blue-950 via-[#06193d] to-indigo-950",
      primaryBtn: "ORDER NOW",
      link: "/shop?category=Bar%20Collection",
      badge: "BAR COLLECTION"
    },
    {
      id: "light-box",
      title: "ULTRA THIN LIGHT BOX",
      subtitle: "ENLIGHTEN YOUR IMAGINATION",
      bgClass: "from-neutral-900 via-neutral-950 to-neutral-900",
      primaryBtn: "CREATE YOUR OWN",
      link: "/custom-builder",
      badge: "STUDIO & STOREFRONT"
    },
    {
      id: "smith-neon",
      title: "The Smith's",
      subtitle: "EXPLORE OUR PERSONALIZED NEON SIGNS",
      bgClass: "from-emerald-950 via-[#0a3a20] to-emerald-900",
      primaryBtn: "PERSONALIZE NOW",
      link: "/custom-builder",
      badge: "CUSTOM MAKER"
    }
  ];

  // Slider navigation helpers
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir * 150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: -dir * 150,
      opacity: 0
    })
  };

  // Rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, heroSlides.length]);

  // Brand logos for marquee
  const brandLogos = [
    { name: "Nike", text: "NIKE" },
    { name: "Pepsi", text: "PEPSI" },
    { name: "Google", text: "GOOGLE" },
    { name: "Amazon", text: "AMAZON" },
    { name: "Starbucks", text: "STARBUCKS" },
    { name: "Adidas", text: "ADIDAS" },
    { name: "Red Bull", text: "RED BULL" },
    { name: "Coca Cola", text: "COCA COLA" }
  ];

  // Category circles data
  const categories = [
    { name: "Wedding Signs", link: "/shop?category=Wedding%20Collection", emoji: "💍", tag: "Hot" },
    { name: "Business Signs", link: "/shop?category=Business%20Signs", emoji: "💼", tag: "Popular" },
    { name: "Home Decor", link: "/shop?category=Home%20Decor", emoji: "🏡", tag: "New" },
    { name: "Acrylic Signs", link: "/shop?category=Acrylic%20Signs", emoji: "💎", tag: "Stunning" },
    { name: "Channel Letters", link: "/shop?category=Channel%20Letters", emoji: "🔠", tag: "Luxury" },
    { name: "Metal Signs", link: "/shop?category=Metal%20Signs", emoji: "⚡", tag: "Premium" }
  ];

  // Filter products by active tab
  const getFilteredProducts = () => {
    if (activeTab === "All Sellers") return products.slice(0, 4);
    return products.filter(p => p.category === activeTab).slice(0, 4);
  };

  const handleQuickAdd = (product: any) => {
    addItem({
      id: `${product.id}-${product.colors[0].name.replace(/\s+/g, "")}-${product.sizes[0].name.replace(/\s+/g, "")}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0].name,
      size: product.sizes[0].name,
      backboard: "Cut To Shape (Outline)",
      usage: "indoor"
    });
    
    // Confetti pop!
    canvasConfetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="w-full bg-white text-neutral-800 relative overflow-hidden">
      
      {/* 1. HERO SLIDER CAROUSEL */}
      <section className="relative w-full min-h-[460px] md:min-h-[500px] flex items-center justify-center overflow-hidden border-b border-neutral-100 bg-neutral-50/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgClass} py-12 px-6 flex items-center justify-center`}
          >
            {/* Slide 1: Metal Signs */}
            {heroSlides[currentSlide].id === "metal-signs" && (
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-neutral-800">
                <div className="space-y-5 text-center lg:text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/80 border border-neutral-250 text-[10px] font-black text-neutral-600 tracking-wider uppercase">
                    {heroSlides[currentSlide].badge}
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black text-neutral-900 leading-none tracking-tight">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm font-bold text-neutral-700 max-w-md mx-auto lg:mx-0">
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-neutral-800" /> Custom Logo/ Artwork</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-neutral-800" /> Personalized Monograms</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-neutral-800" /> Metal Letters & Numbers</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-neutral-800" /> Wall Art & Decor</div>
                  </div>

                  <div className="pt-3 flex justify-center lg:justify-start">
                    <Link href={heroSlides[currentSlide].link} className="px-8 py-3 bg-[#230b14] hover:bg-neutral-900 rounded-lg text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2 shadow-lg transition-transform hover:scale-103 cursor-pointer">
                      {heroSlides[currentSlide].primaryBtn} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right side items preview */}
                <div className="hidden lg:flex items-center justify-center gap-6 relative">
                  <div className="text-7xl font-black tracking-tighter text-neutral-800 border-4 border-neutral-800 p-4 rounded-2xl rotate-[-6deg] bg-white shadow-xl select-none">
                    CN
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="border-2 border-neutral-800 bg-white p-3 rounded-full flex items-center justify-center w-22 h-22 shadow-xl rotate-[6deg] select-none">
                      <span className="text-[10px] font-black text-neutral-800 text-center leading-tight">🐔<br/>HEN HOUSE</span>
                    </div>
                    <div className="bg-[#230b14] text-white py-1.5 px-4 rounded-lg text-center text-xs font-extrabold shadow-md">
                      10% OFF
                    </div>
                  </div>

                  {/* Stamp badge */}
                  <div className="absolute -top-6 right-8 bg-white border-2 border-neutral-800 rounded-full w-20 h-20 flex items-center justify-center flex-col rotate-[15deg] shadow-lg">
                    <span className="text-[8px] font-black tracking-widest text-neutral-400">BEST</span>
                    <span className="text-xs font-black text-neutral-800 leading-none">PRICE</span>
                    <span className="text-[7px] font-black text-neutral-500">GUARANTEED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Beer & Bar Neon Signs */}
            {heroSlides[currentSlide].id === "beer-bar" && (
              <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-white text-center justify-center relative px-6">
                
                {/* Collage Left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-15 lg:opacity-100 hidden md:flex flex-col gap-5 text-left select-none">
                  <span className="font-pacifico text-2xl neon-text-pink rotate-[-10deg]">Bar 🍹</span>
                  <span className="font-dosis text-3xl font-black border border-amber-400 text-amber-300 py-1 px-4 rounded-lg neon-shadow-blue">BEER 🍻</span>
                  <span className="font-tilt-neon text-lg font-bold text-cyan-400">OKTOBERFEST</span>
                </div>

                {/* Collage Right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 lg:opacity-100 hidden md:flex flex-col gap-5 text-right select-none">
                  <span className="font-pacifico text-2xl neon-text-blue rotate-[10deg]">Pub 🍷</span>
                  <span className="font-dosis text-3xl font-black border border-pink-500 text-pink-400 py-1 px-4 rounded-lg neon-shadow-pink">BAR 🥂</span>
                  <span className="font-tilt-neon text-lg font-bold text-yellow-400">DRINKS 🍺</span>
                </div>

                {/* Center Content */}
                <div className="space-y-5 max-w-xl z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-[10px] font-bold text-blue-300 tracking-wider uppercase">
                    {heroSlides[currentSlide].badge}
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                    BEER & BAR <br/>
                    <span className="neon-text-pink text-5xl sm:text-7xl font-tilt-neon">NEON SIGNS</span>
                  </h2>
                  <p className="text-xs text-neutral-300 max-w-xs sm:max-w-md mx-auto leading-relaxed">
                    Light up your bar counter, home lounge, or tavern setup with low-voltage safety neon art signs.
                  </p>
                  <div className="pt-3 flex justify-center">
                    <Link href={heroSlides[currentSlide].link} className="px-8 py-3 bg-white hover:bg-neutral-100 text-neutral-900 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg transition-transform hover:scale-103 cursor-pointer">
                      {heroSlides[currentSlide].primaryBtn} <ArrowRight className="h-4 w-4 text-neutral-900" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: Ultra Thin Light Box */}
            {heroSlides[currentSlide].id === "light-box" && (
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-white">
                <div className="space-y-5 text-center lg:text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-neutral-300 tracking-wider uppercase">
                    {heroSlides[currentSlide].badge}
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
                    ULTRA THIN <br/>
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">LIGHT BOX</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-widest">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
                    Elevate your business signage or bedroom design with customizable animated light boxes. High-definition anime prints and corporate displays.
                  </p>
                  <div className="pt-3 flex justify-center lg:justify-start">
                    <Link href={heroSlides[currentSlide].link} className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg transition-transform hover:scale-103 cursor-pointer">
                      {heroSlides[currentSlide].primaryBtn} <ArrowRight className="h-4 w-4 text-neutral-950" />
                    </Link>
                  </div>
                </div>

                {/* Right side anime mockup */}
                <div className="hidden lg:flex items-center justify-center relative">
                  <div className="relative border-4 border-neutral-700 bg-neutral-950 p-4 rounded-2xl w-[240px] h-[310px] shadow-2xl flex flex-col justify-between overflow-hidden select-none">
                    <div className="absolute inset-0 bg-radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 60%)" />
                    <div className="border border-neutral-800 bg-neutral-900 rounded-lg p-2.5 text-center shadow-md">
                      <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase">🎙️ PODCAST</span>
                    </div>
                    {/* Anime drawing mockup */}
                    <div className="h-40 w-full bg-neutral-900 rounded-lg flex items-center justify-center relative border border-neutral-850 overflow-hidden">
                      <span className="font-pacifico text-3xl neon-text-blue animate-pulse">VJ</span>
                      <span className="absolute bottom-2 right-2 text-[7px] text-neutral-500">ANIME EDITION</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4: Moss Wall Script */}
            {heroSlides[currentSlide].id === "smith-neon" && (
              <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-white text-center relative py-6">
                <div className="absolute left-[8%] top-[10%] opacity-20 hidden md:block text-2xl select-none">🌿</div>
                <div className="absolute right-[8%] bottom-[10%] opacity-20 hidden md:block text-2xl select-none">🌱</div>

                <div className="space-y-5 max-w-xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/20 text-[10px] font-bold text-emerald-300 tracking-wider uppercase">
                    {heroSlides[currentSlide].badge}
                  </span>
                  
                  {/* Elegant Script Cursive Name */}
                  <h2 className="font-sacramento text-6xl sm:text-8xl text-white neon-text-white rotate-[-2deg] py-3 leading-none select-none">
                    {heroSlides[currentSlide].title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm font-bold text-neutral-200 tracking-widest uppercase">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  
                  <p className="text-xs text-neutral-300 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                    Personalized handwriting neon lettering mounted on premium foliage event backdrop walls.
                  </p>
                  
                  <div className="pt-3 flex justify-center">
                    <Link href={heroSlides[currentSlide].link} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg transition-transform hover:scale-103 cursor-pointer border border-emerald-450/30">
                      {heroSlides[currentSlide].primaryBtn} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/70 hover:bg-white text-neutral-800 border border-neutral-200/80 shadow-md hover:scale-105 transition-all cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/70 hover:bg-white text-neutral-800 border border-neutral-200/80 shadow-md hover:scale-105 transition-all cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 flex gap-2.5 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === i ? "w-8 bg-neutral-800" : "w-2.5 bg-neutral-350"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. TRUST/FEATURE BADGES STRIP */}
      <section className="w-full bg-[#fcfcfc] py-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section title */}
          <h3 className="text-center text-xs sm:text-sm font-black text-[#f44b7d] tracking-widest uppercase mb-8">
            #1 Custom LED Neon Brand | Fast Shipping Worldwide
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {/* Price Match Guarantee */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-rose-50/70 border border-rose-100/50 text-[#f44b7d] flex items-center justify-center w-12 h-12 shadow-xs">
                <Tags className="h-5 w-5 text-[#f44b7d]" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800 leading-snug">Price Match<br/>Guarantee</h4>
            </div>

            {/* UL Listed Sign Makers */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-rose-50/70 border border-rose-100/50 text-[#f44b7d] flex items-center justify-center w-12 h-12 shadow-xs">
                <ShieldCheck className="h-5 w-5 text-[#f44b7d]" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800 leading-snug">UL Listed<br/>Sign Makers</h4>
            </div>

            {/* No Hidden Charges */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-rose-50/70 border border-rose-100/50 text-[#f44b7d] flex items-center justify-center w-12 h-12 shadow-xs">
                <EyeOff className="h-5 w-5 text-[#f44b7d]" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800 leading-snug">No Hidden<br/>Charges</h4>
            </div>

            {/* BUY Now, PAY Later */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-rose-50/70 border border-rose-100/50 text-[#f44b7d] flex items-center justify-center w-12 h-12 shadow-xs">
                <Wallet className="h-5 w-5 text-[#f44b7d]" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800 leading-snug">BUY Now,<br/>PAY Later</h4>
            </div>

            {/* 3-Year Warranty* */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-rose-50/70 border border-rose-100/50 text-[#f44b7d] flex items-center justify-center w-12 h-12 shadow-xs">
                <Award className="h-5 w-5 text-[#f44b7d]" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800 leading-snug">3-Year<br/>Warranty*</h4>
            </div>

            {/* Unlimited Revisions */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-rose-50/70 border border-rose-100/50 text-[#f44b7d] flex items-center justify-center w-12 h-12 shadow-xs">
                <RefreshCw className="h-5 w-5 text-[#f44b7d]" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800 leading-snug">Unlimited<br/>Revisions</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY VISUAL GRID: WHAT WILL YOU CREATE? */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#8b1c7c] mb-10 tracking-tight uppercase">What Will You Create?</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
          {/* Card 1: LED Text Neon */}
          <div className="flex flex-col items-center group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-neutral-100">
              <Image 
                src="/led_text_neon.png" 
                alt="LED Text Neon" 
                fill 
                sizes="(max-w-7xl) 16vw, 150px"
                className="object-cover transition-transform duration-550 group-hover:scale-105" 
              />
            </div>
            <Link href="/custom-builder" className="w-full mt-4 py-2.5 rounded-full bg-[#f44b7d] hover:bg-neutral-900 text-white text-[10px] sm:text-xs font-extrabold uppercase text-center transition-colors shadow-sm tracking-wider cursor-pointer">
              LED Text Neon
            </Link>
          </div>

          {/* Card 2: Custom LED Logo */}
          <div className="flex flex-col items-center group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-neutral-100">
              <Image 
                src="/custom_led_logo.png" 
                alt="Custom LED Logo" 
                fill 
                sizes="(max-w-7xl) 16vw, 150px"
                className="object-cover transition-transform duration-550 group-hover:scale-105" 
              />
            </div>
            <Link href="/upload-design" className="w-full mt-4 py-2.5 rounded-full bg-[#f44b7d] hover:bg-neutral-900 text-white text-[10px] sm:text-xs font-extrabold uppercase text-center transition-colors shadow-sm tracking-wider cursor-pointer">
              Custom LED Logo
            </Link>
          </div>

          {/* Card 3: Ultra-Thin Lightbox */}
          <div className="flex flex-col items-center group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-neutral-100">
              <Image 
                src="/ultra_thin_lightbox.png" 
                alt="Ultra-Thin Lightbox" 
                fill 
                sizes="(max-w-7xl) 16vw, 150px"
                className="object-cover transition-transform duration-550 group-hover:scale-105" 
              />
            </div>
            <Link href="/shop?category=Light%20Box" className="w-full mt-4 py-2.5 rounded-full bg-[#f44b7d] hover:bg-neutral-900 text-white text-[10px] sm:text-xs font-extrabold uppercase text-center transition-colors shadow-sm tracking-wider cursor-pointer">
              Ultra-Thin Lightbox
            </Link>
          </div>

          {/* Card 4: Layered Acrylic Signs */}
          <div className="flex flex-col items-center group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-neutral-100">
              <Image 
                src="/layered_acrylic_signs.png" 
                alt="Layered Acrylic Signs" 
                fill 
                sizes="(max-w-7xl) 16vw, 150px"
                className="object-cover transition-transform duration-550 group-hover:scale-105" 
              />
            </div>
            <Link href="/shop?category=Acrylic%20Signs" className="w-full mt-4 py-2.5 rounded-full bg-[#f44b7d] hover:bg-neutral-900 text-white text-[10px] sm:text-xs font-extrabold uppercase text-center transition-colors shadow-sm tracking-wider cursor-pointer">
              Layered Acrylic Signs
            </Link>
          </div>

          {/* Card 5: Metal Letters/Logo */}
          <div className="flex flex-col items-center group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-neutral-100">
              <Image 
                src="/metal_letters_logo.png" 
                alt="Metal Letters/Logo" 
                fill 
                sizes="(max-w-7xl) 16vw, 150px"
                className="object-cover transition-transform duration-550 group-hover:scale-105" 
              />
            </div>
            <Link href="/shop?category=Metal%20Signs" className="w-full mt-4 py-2.5 rounded-full bg-[#f44b7d] hover:bg-neutral-900 text-white text-[10px] sm:text-xs font-extrabold uppercase text-center transition-colors shadow-sm tracking-wider cursor-pointer">
              Metal Letters/Logo
            </Link>
          </div>

          {/* Card 6: Channel Letter/Box */}
          <div className="flex flex-col items-center group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-neutral-100">
              <Image 
                src="/channel_letter_box.png" 
                alt="Channel Letter/Box" 
                fill 
                sizes="(max-w-7xl) 16vw, 150px"
                className="object-cover transition-transform duration-550 group-hover:scale-105" 
              />
            </div>
            <Link href="/shop?category=Channel%20Letters" className="w-full mt-4 py-2.5 rounded-full bg-[#f44b7d] hover:bg-neutral-900 text-white text-[10px] sm:text-xs font-extrabold uppercase text-center transition-colors shadow-sm tracking-wider cursor-pointer">
              Channel Letter/Box
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BRAND LOGO MARQUEE TICKER */}
      <section className="w-full py-8 border-y border-neutral-100 bg-neutral-50/50 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex gap-16 whitespace-nowrap animate-marquee select-none justify-around">
          {brandLogos.concat(brandLogos).map((logo, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-neutral-400 font-bold text-xs tracking-widest hover:text-neutral-700 transition-colors">
              <Sparkles className="h-3.5 w-3.5 text-neon-blue/40" />
              <span>{logo.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEST SELLERS GRID WITH CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">Our Best Sellers</h2>
            <p className="text-xs text-neutral-500 font-medium mt-1">Illumination masterpieces our customers love most</p>
          </div>
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2">
            {["All Sellers", "Wedding Collection", "Home Decor", "Business Signs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab 
                    ? "bg-neutral-900 text-white shadow-sm" 
                    : "bg-neutral-50 text-neutral-500 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {tab === "All Sellers" ? "All Sellers" : tab.replace(" Collection", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredProducts().map((product) => {
            const hasWishlist = hasItem(product.id);
            return (
              <div 
                key={product.id} 
                className="group relative rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Sale and Discount Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-neon-pink text-white text-[9px] font-extrabold uppercase">
                    Sale
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-neon-blue text-white text-[9px] font-extrabold uppercase">
                    -15%
                  </span>
                </div>

                {/* Wishlist toggle */}
                <button 
                  onClick={() => toggleItem(product.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs border border-neutral-200 text-neutral-400 hover:text-neon-pink transition-colors cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart className={`h-4 w-4 ${hasWishlist ? "fill-neon-pink text-neon-pink" : ""}`} />
                </button>

                {/* Main Product graphic preview */}
                <Link href={`/shop/${product.slug}`} className="block relative aspect-square bg-neutral-950 rounded-xl overflow-hidden mb-4 border border-neutral-100">
                  <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,0,102,0.1) 0%, transparent 70%) group-hover:bg-radial-gradient(circle, rgba(255,0,102,0.18) 0%, transparent 70%) transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center select-none">
                    <span className="text-xl sm:text-2xl font-pacifico neon-text-pink leading-tight transition-transform duration-300 group-hover:scale-105">
                      {product.name}
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">{product.category}</span>
                  <Link href={`/shop/${product.slug}`}>
                    <h4 className="text-sm font-bold text-neutral-800 hover:text-neon-blue transition-colors line-clamp-1">{product.name}</h4>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-semibold">({product.reviewCount} reviews)</span>
                  </div>

                  {/* Pricing and Action CTAs */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-neutral-400 line-through">{formatPrice(product.price * 1.15)}</span>
                      <span className="text-sm font-black text-neutral-900">{formatPrice(product.price)}</span>
                    </div>
                    
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => handleQuickAdd(product)}
                        className="p-2 rounded-lg bg-neutral-100 hover:bg-neon-blue hover:text-white text-neutral-700 transition-all cursor-pointer flex items-center justify-center"
                        title="Quick Add to Cart"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                      <Link 
                        href={`/shop/${product.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[10px] font-bold text-white transition-all flex items-center justify-center cursor-pointer"
                      >
                        Customize
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 6. OFFLINE EXPERIENCE CENTER / SHOWROOM SHOWCASE */}
      <section className="w-full bg-neutral-50 py-16 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Showroom Details & mock map embed */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-neon-pink/5 to-neon-blue/5 border border-neutral-200 text-xs font-bold text-neutral-600">
              <MapPin className="h-3.5 w-3.5 text-neon-blue animate-bounce" /> 
              <span>VJneon Flagship Showroom</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 leading-tight">
              Visit Our Experience Center & Showroom
            </h2>
            
            <p className="text-xs text-neutral-600 leading-relaxed max-w-lg">
              Want to see our custom LED craftsmanship in person? Experience the dynamic ambient lighting, view all 12 neon color options, test remote controllers, and browse our acrylic cutout designs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-neutral-700 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200">
                <MapPin className="h-4 w-4 text-neon-pink flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-neutral-800">NYC Headquarters</h5>
                  <p className="text-[10px] text-neutral-500 mt-0.5">382 Broadway, New York, NY</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200">
                <Phone className="h-4 w-4 text-neon-blue flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-neutral-800">Book Design Audits</h5>
                  <p className="text-[10px] text-neon-500 mt-0.5">+1 (800) 555-NEON</p>
                </div>
              </div>
            </div>

            {/* Mock Maps embed widget */}
            <div className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-neutral-200 shadow-xs bg-neutral-200">
              <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="h-8 w-8 text-neon-pink mb-2 animate-bounce" />
                <span className="text-xs font-bold text-neutral-800">New York Showroom Map Location</span>
                <span className="text-[10px] text-neutral-500 mt-0.5">Interactive GPS direction mapping widget</span>
              </div>
            </div>
          </div>

          {/* Showroom visual gallery preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[180px] sm:h-[220px] rounded-2xl bg-neutral-950 border border-neutral-200 overflow-hidden flex items-center justify-center shadow-md group/show">
              <div className="absolute inset-0 bg-radial-gradient(circle, rgba(0,128,255,0.15) 0%, transparent 60%)" />
              <span className="font-pacifico text-2xl neon-text-blue transition-transform group-hover/show:scale-110">Open Late</span>
              <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs rounded-md text-[8px] font-bold text-white uppercase">
                Showroom Lobby
              </div>
            </div>
            
            <div className="relative h-[180px] sm:h-[220px] rounded-2xl bg-neutral-950 border border-neutral-200 overflow-hidden flex items-center justify-center shadow-md group/show">
              <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,0,102,0.15) 0%, transparent 60%)" />
              <span className="font-pacifico text-2xl neon-text-pink transition-transform group-hover/show:scale-110">Cheers 🥂</span>
              <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs rounded-md text-[8px] font-bold text-white uppercase">
                Wedding Backboard
              </div>
            </div>

            <div className="col-span-2 relative h-[140px] rounded-2xl bg-linear-to-r from-neon-pink/10 to-neon-blue/10 border border-neutral-200 p-6 flex flex-col justify-between overflow-hidden">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-800">Showroom Exclusive discounts</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">Book a consultation call in NYC to receive **15% off coupon** and complimentary dimmer upgrades.</p>
              </div>
              <Link href="/contact" className="text-xs font-bold text-neon-blue hover:underline flex items-center gap-1">
                Schedule Consultation Call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE VJNEON GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">Why Choose VJneon?</h2>
          <p className="text-xs text-neutral-500 font-medium mt-1">We construct the highest-grade illuminated art on the market</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-neon-pink/10 border border-neon-pink/20 text-neon-pink w-fit">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-neutral-800">Ultra-High Density Flex-LED</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We pack 120 premium LEDs per meter to ensure smooth, uniform illumination with absolutely zero dark gaps or dot-spots.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-neon-blue w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-neutral-800">Insured Damage Protection</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every package is shipped with 100% replacement insurance. If Courier damages it in transit, we manufacture and ship a new sign free.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-600 w-fit">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-neutral-800">Dimmer & Controller Included</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              No extra charges for dimming. Every sign includes a remote controller that lets you adjust brightness from 10% to 100%.
            </p>
          </div>
        </div>
      </section>

      {/* 8. YOUR IMAGINATION USER WALL GALLERY */}
      <section className="w-full bg-neutral-50 py-16 border-y border-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">Your Imagination, Our Creation</h2>
          <p className="text-xs text-neutral-500 font-medium mt-1">Real installations lighting up storefronts, weddings, and homes</p>
        </div>

        {/* Gallery grid of mock signs */}
        <div className="flex gap-6 justify-center flex-wrap px-6">
          <div className="relative w-[220px] h-[280px] rounded-2xl bg-neutral-950 border border-neutral-200 overflow-hidden flex items-center justify-center group/gal">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,0,102,0.15) 0%, transparent 60%)" />
            <span className="font-pacifico text-xl neon-text-pink transition-transform group-hover/gal:scale-105">Sweet Dreams</span>
            <div className="absolute bottom-3 left-3 right-3 text-[10px] text-neutral-400 font-bold bg-black/60 py-1 px-2 rounded-md text-center">
              Bedroom Neon Sign
            </div>
          </div>

          <div className="relative w-[220px] h-[280px] rounded-2xl bg-neutral-950 border border-neutral-200 overflow-hidden flex items-center justify-center group/gal">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(0,128,255,0.15) 0%, transparent 60%)" />
            <span className="font-pacifico text-xl neon-text-blue transition-transform group-hover/gal:scale-105">The Office</span>
            <div className="absolute bottom-3 left-3 right-3 text-[10px] text-neutral-400 font-bold bg-black/60 py-1 px-2 rounded-md text-center">
              Workspace Corporate logo
            </div>
          </div>

          <div className="relative w-[220px] h-[280px] rounded-2xl bg-neutral-950 border border-neutral-200 overflow-hidden flex items-center justify-center group/gal">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,183,0,0.15) 0%, transparent 60%)" />
            <span className="font-pacifico text-xl text-amber-400 neon-text-pink transition-transform group-hover/gal:scale-105">Better Together</span>
            <div className="absolute bottom-3 left-3 right-3 text-[10px] text-neutral-400 font-bold bg-black/60 py-1 px-2 rounded-md text-center">
              Wedding Reception Backdrop
            </div>
          </div>

          <div className="relative w-[220px] h-[280px] rounded-2xl bg-neutral-950 border border-neutral-200 overflow-hidden flex items-center justify-center group/gal">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(0,128,255,0.15) 0%, transparent 60%)" />
            <span className="font-pacifico text-xl neon-text-blue transition-transform group-hover/gal:scale-105">Good Vibes Only</span>
            <div className="absolute bottom-3 left-3 right-3 text-[10px] text-neutral-400 font-bold bg-black/60 py-1 px-2 rounded-md text-center">
              Home Office Studio
            </div>
          </div>
        </div>
      </section>

      {/* 9. HAPPY CUSTOMER STATS & RATING STRIP */}
      <section className="w-full bg-linear-to-r from-neon-pink to-neon-blue text-white py-12 text-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-black">55,000+</h3>
            <p className="text-xs uppercase tracking-wider font-bold text-white/80">Happy Customers Worldwide</p>
          </div>
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-white/20 py-6 md:py-0">
            <h3 className="text-3xl sm:text-5xl font-black">4.9/5</h3>
            <div className="flex text-amber-400 justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs uppercase tracking-wider font-bold text-white/80">Customer Satisfaction Score</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-black">100%</h3>
            <p className="text-xs uppercase tracking-wider font-bold text-white/80">Insured Delivery Guarantee</p>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SLIDER */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">What Our Clients Say</h2>
          <p className="text-xs text-neutral-500 font-medium mt-1">Verified reviews detailing our glow, shipping, and support quality</p>
        </div>

        {/* Detailed feedback cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((review, idx) => (
            <div key={review.id} className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-neutral-200 absolute right-6 top-6 -z-10" />
                
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  &quot;{review.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-neutral-200/60 pt-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-neon-pink/20 to-neon-blue/20 flex items-center justify-center text-xs font-bold text-neutral-700">
                  {review.avatar}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                    {review.name}
                    <span className="text-[9px] px-1.5 py-0.2 bg-green-100 text-green-700 rounded-full scale-90">Verified</span>
                  </h5>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. RECENT BLOG FEED GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">Latest From VJneon Blog</h2>
            <p className="text-xs text-neutral-500 font-medium mt-1">Illumination design advice, wedding inspirations, and retail guides</p>
          </div>
          <Link href="/blog" className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white rounded-full transition-colors flex items-center gap-1 cursor-pointer">
            Browse All Articles <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <article key={post.slug} className="group flex flex-col justify-between space-y-4 rounded-2xl border border-neutral-200 p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Mock thumbnail artwork */}
                <div className="aspect-video w-full rounded-xl bg-neutral-900 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-gradient(circle, rgba(0,128,255,0.1) 0%, transparent 60%)" />
                  <span className="font-pacifico text-lg neon-text-blue transition-transform group-hover:scale-105">{post.title.split(" ")[0]}</span>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingTime}</span>
                </div>

                <h4 className="text-sm font-bold text-neutral-800 group-hover:text-neon-pink transition-colors">
                  {post.title}
                </h4>
                
                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-neon-blue group-hover:underline flex items-center gap-1 pt-2">
                Read Full Article <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 12. FAQ ACCORDION PANEL */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-neutral-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">Frequently Asked Questions</h2>
          <p className="text-xs text-neutral-500 font-medium mt-1">Quick answers to manufacturing time, dimensions, and wall mounting</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-xs sm:text-sm text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-neutral-500" /> : <ChevronDown className="h-4.5 w-4.5 text-neutral-500" />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-neutral-100 bg-neutral-50/50"
                    >
                      <div className="px-6 py-4 text-xs text-neutral-500 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. ABOUT VJNEON SUMMARY SEGMENT */}
      <section className="w-full py-16 bg-neutral-50/50 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h3 className="text-lg uppercase tracking-wider font-extrabold text-neutral-400">About VJneon</h3>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
            Handcrafting Premium illuminated Art Worldwide
          </h2>
          
          <div className="text-xs text-neutral-600 leading-relaxed max-w-2xl mx-auto space-y-4 font-medium">
            <p>
              Founded with the goal of creating safer, cleaner, and energy-efficient alternatives to traditional mercury glass neons, VJneon specializes in state-of-the-art flexible LED signage. We utilize premium low-voltage DC adaptors, high-grade acrylic backplates, and dense 120-LEDs/m flex tubes to provide silent, child-safe, and durable ambient illumination.
            </p>
            
            <AnimatePresence>
              {isAboutExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <p>
                    Every sign is manufactured by certified solder technicians who inspect each joint, wire alignment, and backing trim under 12-hour burn tests. We cater to major corporate storefronts, wedding planners, residential decorators, and brand agencies globally.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-800 font-bold text-center pt-2">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200">
                      <div className="text-base text-neon-pink">12,700+</div>
                      <div className="text-[9px] text-neutral-400 uppercase mt-0.5">Signs Completed</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-neutral-200">
                      <div className="text-base text-neon-blue">21,500+</div>
                      <div className="text-[9px] text-neutral-400 uppercase mt-0.5">Custom Mockups</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-neutral-200">
                      <div className="text-base text-neutral-800">30+</div>
                      <div className="text-[9px] text-neutral-400 uppercase mt-0.5">Global Planners</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-neutral-200">
                      <div className="text-base text-green-600">5-Star</div>
                      <div className="text-[9px] text-neutral-400 uppercase mt-0.5">Average Rating</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="px-5 py-2.5 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            <span>{isAboutExpanded ? "Read Less" : "Read More About Us"}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isAboutExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </section>

      {/* 14. JOIN VJNEON CLUB (Newsletter Footer banner) */}
      <section className="w-full bg-neutral-100 py-16 border-t border-neutral-200">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-xs font-bold text-neon-pink">
            <Flame className="h-4 w-4 text-neon-pink animate-pulse" /> 
            <span>VJneon VIP Club</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl font-black text-neutral-900">
            Join VJneon Club & Get 10% OFF
          </h2>
          
          <p className="text-xs text-neutral-500 leading-relaxed font-medium">
            Be the first to hear about flash discounts, seasonal collections, custom font rollouts, and design inspiration guides.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              canvasConfetti({
                particleCount: 80,
                spread: 70
              });
              alert("Welcome to VJneon Club! Check your inbox for your 10% coupon code.");
            }} 
            className="flex gap-2 max-w-sm mx-auto"
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 outline-hidden focus:border-neon-pink transition-colors"
            />
            <button 
              type="submit"
              className="px-5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-bold text-white transition-opacity cursor-pointer flex items-center justify-center"
            >
              Join
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
