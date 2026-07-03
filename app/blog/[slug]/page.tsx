"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User, Clock, ArrowLeft, Bookmark } from "lucide-react";
import blogs from "@/data/blogs.json";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = use(params);

  // Find post
  const post = blogs.find((b) => b.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-8">
      
      {/* Blog Schema structured JSON-LD data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": [
              `https://vjneon.com${post.coverImage}`
            ],
            "datePublished": post.date,
            "author": [{
              "@type": "Person",
              "name": post.author,
              "url": "https://vjneon.com/about"
            }]
          }),
        }}
      />

      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/blog" className="hover:text-white">Blog</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400 truncate">{post.title}</span>
      </div>

      {/* Back button */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors font-bold uppercase tracking-wider cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>

      {/* Main post layout container */}
      <article className="space-y-6">
        
        {/* Title & metadata */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold text-neon-pink px-2.5 py-1 rounded bg-neon-pink/10 border border-neon-pink/20 inline-block">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-semibold border-y border-white/5 py-4">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-neon-blue" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-neutral-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-neutral-500" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Large decorative cover area */}
        <div className="w-full aspect-[16/9] rounded-3xl bg-[#09090b] border border-white/5 flex items-center justify-center relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />
          <Bookmark className="h-16 w-16 text-neutral-800" />
        </div>

        {/* Article content HTML */}
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-invert prose-xs max-w-none text-neutral-300 space-y-4 leading-relaxed font-semibold
            prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-2
            prose-h3:text-base prose-h3:border-l-2 prose-h3:border-neon-blue prose-h3:pl-3
            prose-p:text-xs prose-p:text-neutral-400
            prose-strong:text-white
            prose-table:w-full prose-table:text-xs prose-table:border-collapse prose-table:my-4
            prose-th:bg-neutral-900 prose-th:p-2.5 prose-th:border prose-th:border-white/10
            prose-td:p-2.5 prose-td:border prose-td:border-white/10"
        />

        {/* Tags footer */}
        <div className="border-t border-white/5 pt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-bold text-neutral-400 bg-neutral-900 border border-white/5 px-2.5 py-1 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>

      </article>

    </div>
  );
}
