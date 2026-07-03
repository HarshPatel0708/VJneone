"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Star, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ShoppingBag,
  RotateCcw,
  Heart,
  HelpCircle,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import products from "@/data/products.json";
import { useConfig } from "@/hooks/useConfig";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import canvasConfetti from "canvas-confetti";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const { formatPrice } = useConfig();
  const addItem = useCart((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlist();

  // Find product
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  // Variant and configurations states
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "Warm White", hex: "#FFDFB0" });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || { name: "Standard", priceModifier: 0 });
  const [outdoorUpgrade, setOutdoorUpgrade] = useState(false);
  const [dimmerUpgrade, setDimmerUpgrade] = useState(false);
  const [hangingChain, setHangingChain] = useState(false);
  const [plugType, setPlugType] = useState("us");
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs");

  const isWishlisted = hasItem(product.id);

  // Live Price calculation
  const getCalculatedPrice = () => {
    let price = product.price;
    price += selectedSize.priceModifier;
    if (outdoorUpgrade) price += 60;
    if (dimmerUpgrade) price += 25;
    return price;
  };

  const totalPrice = getCalculatedPrice();

  const handleAddToCart = () => {
    const cartId = `${product.id}-${selectedColor.name.replace(/\s/g, "")}-${selectedSize.name.split(" ")[0]}`;
    
    const accessories = [];
    if (dimmerUpgrade) accessories.push("Remote & Dimmer Controller");
    if (outdoorUpgrade) accessories.push("IP67 Outdoor Weatherproofing");
    if (hangingChain) accessories.push("Ceiling Hanging Chain");
    accessories.push(`Power Plug: ${plugType.toUpperCase()}`);

    addItem({
      id: cartId,
      productId: product.id,
      name: product.name,
      price: totalPrice,
      image: product.image,
      color: selectedColor.name,
      size: selectedSize.name,
      accessories,
      isCustom: false
    });

    // Confetti burst
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      colors: [selectedColor.hex, "#0080ff", "#ffffff"]
    });
  };

  // Find 3 related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Fallback related products if category has no other products
  const fallbackRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-12">
      
      {/* Product JSON-LD structured schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": [
              `https://vjneon.com/images/products/${product.image}.jpg`
            ],
            "description": product.description,
            "sku": product.id,
            "brand": {
              "@type": "Brand",
              "name": "VJneon"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://vjneon.com/shop/${product.slug}`,
              "priceCurrency": "USD",
              "price": product.price,
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount
            }
          }),
        }}
      />

      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-white">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400 truncate">{product.name}</span>
      </div>

      {/* Main product configuration view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Color Glow Visual Showcase (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="w-full aspect-square rounded-3xl bg-[#09090b] border border-white/5 relative overflow-hidden flex items-center justify-center">
            {/* Ambient neon backglow reflection */}
            <div 
              style={{
                background: `radial-gradient(circle, ${selectedColor.hex} 0%, transparent 65%)`,
                opacity: 0.45
              }}
              className="absolute inset-0 pointer-events-none transition-all duration-300"
            />
            {/* Dark wood/brick simulator layout */}
            <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Glowing sign text */}
            <div className="text-center z-10 select-none">
              <span
                style={{
                  color: selectedColor.hex,
                  textShadow: `0 0 5px #fff, 0 0 15px ${selectedColor.hex}, 0 0 35px ${selectedColor.hex}`
                }}
                className="font-pacifico text-4xl sm:text-6xl font-bold select-none block tracking-wide"
              >
                {product.name.replace("Sign", "").replace("LED", "").replace("Glow", "")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Configurations Panel (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header information */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-neon-blue tracking-wider block">VJ Preset Collection</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
            
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 font-semibold text-neutral-400 text-xs">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span className="text-white font-bold">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>
              <span className="text-neutral-700">•</span>
              <span className="text-xs text-neon-blue font-bold">In Stock (Ships in 7 days)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-400 leading-relaxed font-semibold">
            {product.description}
          </p>

          <div className="border-t border-white/5 pt-4 space-y-5">
            
            {/* Color selectors */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Glow Color: {selectedColor.name}</label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ borderColor: selectedColor.name === color.name ? color.hex : "rgba(255,255,255,0.05)" }}
                      className="p-1 rounded-full border bg-neutral-900 cursor-pointer hover:scale-110 transition-transform"
                      title={color.name}
                    >
                      <span style={{ backgroundColor: color.hex }} className="w-5.5 h-5.5 rounded-full block" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selectors */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Sign Dimension Size</label>
                <div className="space-y-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center cursor-pointer transition-all ${
                        selectedSize.name === size.name 
                          ? "bg-neon-blue/15 border-neon-blue text-white font-bold" 
                          : "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="text-xs">{size.name}</span>
                      <span className="text-xs text-neutral-400">
                        {size.priceModifier === 0 ? "Included" : `+${formatPrice(size.priceModifier)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Accessory checkboxes */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Customization Upgrades</label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setOutdoorUpgrade(!outdoorUpgrade)}
                  className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center cursor-pointer transition-all ${
                    outdoorUpgrade ? "bg-neon-pink/15 border-neon-pink/35 text-white" : "bg-neutral-900 border-white/5 text-neutral-400"
                  }`}
                >
                  <span className="text-xs">☔ Outdoor Weatherproof IP67 Upgrade</span>
                  <span className="text-xs font-bold text-neon-pink">+$60</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDimmerUpgrade(!dimmerUpgrade)}
                  className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center cursor-pointer transition-all ${
                    dimmerUpgrade ? "bg-neon-blue/15 border-neon-blue/35 text-white" : "bg-neutral-900 border-white/5 text-neutral-400"
                  }`}
                >
                  <span className="text-xs">🔘 Remote Controller & Dimmer Kit</span>
                  <span className="text-xs font-bold text-neon-blue">+$25</span>
                </button>
              </div>
            </div>

            {/* Power plug selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">AC Power Outlet Plug</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "us", name: "US / CA" },
                  { id: "uk", name: "UK" },
                  { id: "eu", name: "EU" },
                  { id: "au", name: "AU / NZ" }
                ].map((plug) => (
                  <button
                    key={plug.id}
                    onClick={() => setPlugType(plug.id)}
                    className={`py-2 rounded-xl text-center text-xs font-bold cursor-pointer transition-all ${
                      plugType === plug.id 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {plug.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing calculations, Add to cart actions */}
          <div className="border-t border-white/5 pt-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Delivery Estimate</span>
                <span className="text-xs text-neutral-300 font-semibold">Standard Shipping (Free over $250)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Configured Price</span>
                <span className="text-xl sm:text-2xl font-black text-white">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-2xl bg-linear-to-r from-neon-pink to-neon-blue text-sm font-bold text-white hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-neon-pink/15 flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="h-4.5 w-4.5" /> Add To Shopping Cart
              </button>

              <button
                onClick={() => toggleItem(product.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isWishlisted 
                    ? "bg-neon-pink/20 border-neon-pink/30 text-neon-pink" 
                    : "bg-neutral-900 border-white/10 text-neutral-400 hover:text-white"
                }`}
                title="Add to Wishlist"
              >
                <Heart className="h-5 w-5" fill={isWishlisted ? "#ff0066" : "none"} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs segment: Specifications vs Reviews */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex gap-6 border-b border-white/5">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "specs" ? "border-neon-blue text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "reviews" ? "border-neon-blue text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {activeTab === "specs" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#09090b] border border-white/5 rounded-3xl p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Product Overview</h3>
              <ul className="space-y-2.5 text-xs text-neutral-400 leading-relaxed font-semibold">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue flex-shrink-0 mt-1.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Full Details</h3>
              <div className="divide-y divide-white/5 text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2.5">
                    <span className="text-neutral-500 font-bold uppercase tracking-wider">{key}</span>
                    <span className="text-white font-semibold">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Reviews display list */}
            {[
              { author: "Michael C.", date: "July 2, 2026", rating: 5, comment: "Stunning product. Very well packaged and shipped. Hanging standoffs make the glass float off the wall. The glow color matches their website preview perfectly." },
              { author: "Evelyn K.", date: "June 28, 2026", rating: 5, comment: "I am amazed by the quality of this sign. It doesn't get hot at all and the dimmer remote works great. It's the highlight of my gaming desk." }
            ].map((rev, i) => (
              <div key={i} className="bg-[#09090b] border border-white/5 p-6 rounded-2xl space-y-3.5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                    <span className="text-[10px] text-neutral-500 font-semibold">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, r) => (
                      <Star key={r} className="h-3.5 w-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-semibold">{rev.comment}</p>
                <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-bold pt-1.5">
                  <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    <ThumbsUp className="h-3.5 w-3.5" /> Helpful (4)
                  </button>
                  <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    <MessageSquare className="h-3.5 w-3.5" /> Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related preset products slider (fallbackRelated) */}
      <div className="space-y-8 pt-6">
        <h3 className="text-lg font-black text-white">Recommended Sign Designs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {fallbackRelated.map((rel) => (
            <div 
              key={rel.id}
              className="group relative rounded-2xl bg-[#09090b] border border-white/5 overflow-hidden flex flex-col justify-between aspect-[3/4] hover:border-white/10 transition-all hover:scale-[1.01]"
            >
              <div className="w-full aspect-square bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />
                
                <span 
                  style={{
                    color: rel.colors[0]?.hex || "#ffffff",
                    textShadow: `0 0 5px #fff, 0 0 15px ${rel.colors[0]?.hex || "#0080ff"}`
                  }}
                  className="font-pacifico text-2xl font-bold select-none group-hover:scale-105 transition-transform"
                >
                  {rel.name.replace("Sign", "").replace("LED", "").replace("Glow", "")}
                </span>

                <span className="absolute bottom-4 left-4 px-2 py-0.5 rounded-md bg-black/60 border border-white/5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  {rel.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Link href={`/shop/${rel.slug}`} className="text-xs font-bold text-white hover:text-neon-blue transition-colors truncate">
                      {rel.name}
                    </Link>
                    <div className="flex items-center gap-1 font-semibold text-neutral-400 text-[10px] flex-shrink-0">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>{rel.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-sm font-black text-white">{formatPrice(rel.price)}</span>
                  <Link 
                    href={`/shop/${rel.slug}`} 
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/20 text-[10px] font-bold text-neutral-200"
                  >
                    Configure
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
