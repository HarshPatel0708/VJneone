"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Trash2, 
  ShoppingBag, 
  ChevronRight, 
  Plus, 
  Minus, 
  ArrowRight,
  Sparkles,
  Ticket,
  HelpCircle
} from "lucide-react";
import { useCart, CartItem } from "@/hooks/useCart";
import { useConfig } from "@/hooks/useConfig";

export default function CartPage() {
  const { formatPrice } = useConfig();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    promoCode, 
    discountPercent, 
    applyPromoCode, 
    removePromoCode,
    getTotals 
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const totals = getTotals();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) return;

    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try VJNEON20 or WELCOME10");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      
      {/* Page Header */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link> 
        <ChevronRight className="h-3 w-3" /> 
        <span className="text-neutral-400">Shopping Cart</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-black">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 rounded-3xl bg-neutral-900/30 border border-white/5 space-y-6">
          <div className="inline-flex p-4 rounded-full bg-neutral-900 border border-white/10 text-neutral-400">
            <ShoppingBag className="h-10 w-10 text-neutral-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Your Cart is Empty</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              Looks like you haven&apos;t added any glowing signage to your cart yet. Let&apos;s build one!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link 
              href="/custom-builder" 
              className="px-6 py-3 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white hover:opacity-90"
            >
              Custom Neon Builder
            </Link>
            <Link 
              href="/shop" 
              className="px-6 py-3 rounded-xl bg-neutral-900 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items list (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-[#09090b] border border-white/5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Item Info */}
                <div className="flex items-center gap-4.5">
                  <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center flex-shrink-0 select-none">
                    <span 
                      style={{ 
                        color: item.color === "VJ Pink" ? "#ff0066" : item.color === "VJ Blue" ? "#0080ff" : "#ffdfb0",
                        textShadow: `0 0 4px ${item.color === "VJ Pink" ? "#ff0066" : item.color === "VJ Blue" ? "#0080ff" : "#ffdfb0"}`
                      }}
                      className="font-pacifico text-xs font-black"
                    >
                      {item.isCustom ? "VJ" : item.name.substring(0, 3)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white leading-tight">{item.name}</h3>
                    
                    {/* Item specs metadata */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-neutral-500 font-semibold">
                      <span>Color: <b style={{ color: item.color === "VJ Pink" ? "#ff0066" : item.color === "VJ Blue" ? "#0080ff" : "#ffdfb0" }} className="text-white font-bold">{item.color}</b></span>
                      <span>Size: <b className="text-white font-bold">{item.size}</b></span>
                      {item.backboard && <span>Backboard: <b className="text-white font-bold">{item.backboard}</b></span>}
                      {item.usage && <span>Usage: <b className="text-white font-bold">{item.usage}</b></span>}
                    </div>

                    {item.accessories && item.accessories.length > 0 && (
                      <p className="text-[9px] text-neutral-600 leading-relaxed font-bold max-w-sm">
                        Accessories: {item.accessories.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity adjustments & pricing */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-white/5">
                  <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-xl px-2.5 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-neutral-500 hover:text-white p-1"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-xs font-bold text-white px-2.5 select-none">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-neutral-500 hover:text-white p-1"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right flex-shrink-0 min-w-24">
                    <span className="text-xs text-neutral-500 font-bold block">Subtotal</span>
                    <span className="text-sm font-black text-white">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-neutral-600 hover:text-neon-pink transition-colors rounded-lg hover:bg-neon-pink/10 border border-transparent cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Cart Summary Card (4 Columns) */}
          <div className="lg:col-span-4 bg-[#09090b] border border-white/5 p-6 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
              Order Summary
            </h3>

            {/* Price values breakdown */}
            <div className="space-y-3.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">{formatPrice(totals.subtotal)}</span>
              </div>
              
              {promoCode && (
                <div className="flex justify-between text-neon-blue font-semibold">
                  <span className="flex items-center gap-1">🎟️ Promo ({promoCode} -{discountPercent}%)</span>
                  <span>-{formatPrice(totals.discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white font-bold">
                  {totals.shipping === 0 ? (
                    <b className="text-neon-blue">FREE SHIPPING</b>
                  ) : (
                    formatPrice(totals.shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Simulated Sales Tax (8%)</span>
                <span className="text-white font-bold">{formatPrice(totals.tax)}</span>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between items-end text-sm">
                <span className="font-bold text-white">Estimated Total</span>
                <span className="text-xl font-black text-white">{formatPrice(totals.total)}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            {promoCode ? (
              <div className="bg-neon-blue/15 border border-neon-blue/30 rounded-xl p-3.5 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-neon-blue font-bold uppercase tracking-wider block">Active Coupon</span>
                  <span className="text-white font-bold font-mono">{promoCode} Applied</span>
                </div>
                <button 
                  onClick={removePromoCode}
                  className="text-neutral-500 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="text" 
                      placeholder="PROMO CODE" 
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:border-neon-blue outline-hidden uppercase font-mono"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-4 bg-neutral-900 border border-white/10 rounded-xl hover:border-white/20 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-neon-pink font-semibold pl-1">{promoError}</p>
                )}
              </form>
            )}

            {/* Checkout action buttons */}
            <div className="space-y-3 pt-2">
              <Link 
                href="/checkout"
                className="w-full py-4 bg-linear-to-r from-neon-pink to-neon-blue rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-neon-pink/10"
              >
                Proceed To Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link 
                href="/shop"
                className="w-full py-3 border border-white/10 hover:bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white text-center rounded-2xl block transition-colors cursor-pointer"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Info badge */}
            <div className="p-3.5 bg-neutral-900/60 rounded-2xl border border-white/5 flex items-start gap-3">
              <HelpCircle className="h-4.5 w-4.5 text-neutral-500 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-500 leading-relaxed font-semibold">
                * We manufacture customized orders inside our private lab within 2-4 days. Free delivery applies for totals over {formatPrice(250)}!
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
