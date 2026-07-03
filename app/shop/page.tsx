"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  X, 
  Sparkles, 
  ChevronRight,
  ArrowUpDown
} from "lucide-react";
import products from "@/data/products.json";
import { useConfig } from "@/hooks/useConfig";
import { useWishlist } from "@/hooks/useWishlist";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const { formatPrice } = useConfig();
  const { toggleItem, hasItem } = useWishlist();

  // URL Query Parameters
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  // State managers
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState("popular");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync category state when query parameters change
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  // Sync search state when query parameters change
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Categories list
  const categories = [
    "Wedding Collection",
    "Business Signs",
    "Home Decor",
    "Channel Letters",
    "Light Box",
    "Acrylic Signs"
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory 
      ? product.category === selectedCategory 
      : true;

    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // Popular
  });

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSortOption("popular");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      
      {/* Page header */}
      <div className="space-y-3">
        <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Home</Link> 
          <ChevronRight className="h-3 w-3" /> 
          <span className="text-neutral-400">Shop Catalog</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black">All Preset Designs</h1>
        <p className="text-xs md:text-sm text-neutral-500 max-w-xl font-medium">
          Choose from our bestselling signs or filter by collections. Add a dimmer, select custom sizes, and pick your favorite glow.
        </p>
      </div>

      {/* Grid: Filters Panel (3 columns) & Grid Showcase (9 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FILTERS PANEL (Desktop sidebar: 3 columns) */}
        <aside className="hidden lg:block lg:col-span-3 bg-[#09090b] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <SlidersHorizontal className="h-4.5 w-4.5 text-neon-blue" /> Filters
            </h3>
            {(selectedCategory || searchQuery) && (
              <button 
                onClick={clearAllFilters}
                className="text-[10px] font-bold text-neon-pink hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Search Keywords</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white outline-hidden focus:border-neon-blue transition-colors placeholder-neutral-500"
              />
            </div>
          </div>

          {/* Categories select list */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Categories</label>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategory("")}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-colors font-semibold ${
                  selectedCategory === "" 
                    ? "bg-white/10 text-white" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                All Collections
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-colors font-semibold ${
                    selectedCategory === cat 
                      ? "bg-neon-blue/20 text-white" 
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS CATALOG GRID (9 columns) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Top toolbar (sorting, mobile filters toggle, product count) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#09090b] border border-white/5 px-6 py-4 rounded-2xl">
            <div className="text-xs text-neutral-500 font-semibold">
              Showing <span className="text-white font-bold">{sortedProducts.length}</span> preset designs
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              {/* Mobile Filter toggle */}
              <button 
                onClick={() => setShowFiltersMobile(true)}
                className="lg:hidden px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-neutral-500" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-hidden cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-neutral-900/30 border border-white/5 space-y-4">
              <span className="text-4xl block select-none">🔍</span>
              <h3 className="text-lg font-bold text-white">No Designs Found</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                We couldn&apos;t find any preset signs matching your search. Try clearing filters or create a custom sign.
              </p>
              <button 
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const isWishlisted = hasItem(product.id);
                return (
                  <div 
                    key={product.id}
                    className="group relative rounded-2xl bg-[#09090b] border border-white/5 overflow-hidden flex flex-col justify-between aspect-[3/4] hover:border-white/10 transition-all hover:scale-[1.01]"
                  >
                    
                    {/* Visual box */}
                    <div className="w-full aspect-square bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                      <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />
                      
                      {/* Neon glow text simulation */}
                      <span 
                        style={{
                          color: product.colors[0]?.hex || "#ffffff",
                          textShadow: `0 0 5px #fff, 0 0 15px ${product.colors[0]?.hex || "#ff0066"}`
                        }}
                        className="font-pacifico text-3xl font-bold select-none group-hover:scale-105 transition-transform duration-300"
                      >
                        {product.name.replace("Sign", "").replace("LED", "").replace("Glow", "")}
                      </span>

                      {/* Wishlist toggle */}
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

                    {/* Description Details */}
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
          )}
        </section>

      </div>

      {/* MOBILE FILTERS SIDE DRAWER MODAL */}
      <AnimatePresence>
        {showFiltersMobile && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs" 
            />

            {/* Sidebar content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-80 h-full bg-neutral-950 border-l border-white/10 p-6 flex flex-col gap-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <h3 className="text-base font-bold text-white">Filters</h3>
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="p-1 hover:bg-white/5 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search keywords */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Search Keywords</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white outline-hidden focus:border-neon-blue placeholder-neutral-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Collections</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setShowFiltersMobile(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors font-semibold ${
                      selectedCategory === "" ? "bg-white/10 text-white" : "text-neutral-400"
                    }`}
                  >
                    All Collections
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFiltersMobile(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors font-semibold ${
                        selectedCategory === cat ? "bg-neon-blue/20 text-white" : "text-neutral-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear button */}
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    clearAllFilters();
                    setShowFiltersMobile(false);
                  }}
                  className="w-full py-3 bg-neon-pink/15 border border-neon-pink/30 text-neon-pink text-xs font-bold rounded-xl mt-4 cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider animate-pulse">Loading Catalog...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
