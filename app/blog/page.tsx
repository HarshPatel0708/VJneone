"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Bookmark, Clock, Search, Sparkles } from "lucide-react";
import blogs from "@/data/blogs.json";

export default function BlogCatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Business Branding", "Wedding Inspo", "Tech & Safety"];

  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">VJ Blog</span>
      </div>

      <div className="text-center md:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-xs font-semibold text-neon-pink">
          <Sparkles className="h-3.5 w-3.5" /> LED Neon Insights & Guides
        </div>
        <h1 className="text-3xl md:text-5xl font-black">Latest Signage Stories</h1>
        <p className="text-xs md:text-sm text-neutral-500 max-w-xl font-medium leading-relaxed">
          Learn how custom signage can boost storefront sales, read font planning tips for wedding ceremonies, or check the technical safety of modern silicone tubes.
        </p>
      </div>

      {/* Categories & Search panel */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeCategory === cat 
                  ? "bg-white/10 text-white" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#09090b] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:border-neon-pink outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Grid articles */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 text-xs">
          No articles match your selection. Try changing categories or clearing search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl bg-[#09090b] border border-white/5 overflow-hidden hover:border-white/10 hover:scale-[1.01] transition-all flex flex-col justify-between aspect-[4/5] cursor-pointer"
            >
              {/* Cover visual representation */}
              <div className="w-full aspect-[16/10] bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />
                <Bookmark className="h-10 w-10 text-neutral-700 group-hover:scale-110 transition-transform" />
                
                {/* Category badge */}
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
      )}

    </div>
  );
}
