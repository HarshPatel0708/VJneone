"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { 
  CheckCircle, 
  ChevronRight, 
  CreditCard, 
  Lock, 
  ShoppingBag, 
  Sparkles, 
  Truck 
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useConfig } from "@/hooks/useConfig";
import canvasConfetti from "canvas-confetti";

// Checkout validation schema using Zod
const checkoutSchema = zod.object({
  email: zod.string().email("Enter a valid email address"),
  firstName: zod.string().min(2, "First name is too short"),
  lastName: zod.string().min(2, "Last name is too short"),
  address: zod.string().min(5, "Enter your full street address"),
  city: zod.string().min(2, "City is too short"),
  zipCode: zod.string().min(3, "Enter a valid zip/postal code"),
  cardNumber: zod.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardExpiry: zod.string().regex(/^(0[1-9]|1[0-2])\/?([2-9][0-9])$/, "Use MM/YY format"),
  cardCvv: zod.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});

type CheckoutFormData = zod.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { formatPrice } = useConfig();
  const { items, clearCart, getTotals } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const totals = getTotals();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cardNumber: "4111222233334444",
      cardExpiry: "12/28",
      cardCvv: "123"
    }
  });

  const onSubmit = (data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      const orderId = `VJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedOrderId(orderId);
      setIsProcessing(false);
      setOrderSuccess(true);
      clearCart();

      // Confetti burst
      canvasConfetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 2000);
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-neutral-900 border border-white/10 text-neutral-400">
          <ShoppingBag className="h-8 w-8 text-neutral-500" />
        </div>
        <h2 className="text-xl font-bold text-white">No active items to checkout</h2>
        <p className="text-xs text-neutral-500">Add products to your cart before proceeding.</p>
        <Link href="/shop" className="px-6 py-2.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white inline-block">
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/cart" className="hover:text-white">Cart</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">Checkout Checkout</span>
      </div>

      {orderSuccess ? (
        // Order success layout
        <div className="max-w-2xl mx-auto rounded-3xl glass-effect p-10 border border-neon-blue/20 text-center space-y-8 relative overflow-hidden">
          {/* Back glows */}
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-neon-pink/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-neon-blue/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex p-4 rounded-full bg-neon-blue/20 text-neon-blue shadow-neon-blue animate-bounce">
            <CheckCircle className="h-12 w-12" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Payment Confirmed!</h2>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Order ID: {createdOrderId}</p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed pt-2">
              Thank you for shopping with VJneon. Your order has been placed in our manufacturing pipeline. We will email you your invoice and digital layout sheet shortly.
            </p>
          </div>

          {/* Call to action to tracking order */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 max-w-sm mx-auto space-y-3">
            <div className="text-xs text-neutral-400 font-semibold flex items-center justify-center gap-1.5">
              <Truck className="h-4 w-4 text-neon-blue" /> Live Order Tracking Available
            </div>
            <Link 
              href={`/track-order?id=${createdOrderId}`}
              className="w-full py-2.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white block hover:opacity-90 transition-opacity"
            >
              Track Order Status
            </Link>
          </div>

          <div className="pt-4 border-t border-white/5 text-[10px] text-neutral-500 font-semibold">
            Standard Delivery: 7-10 Business Days • Support: help@vjneon.com
          </div>
        </div>
      ) : (
        // Standard Checkout layout
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checkout Form (8 columns) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Shipping info segment */}
              <div className="glass-effect p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
                  <span>1.</span> Shipping Credentials
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="alex@company.com" 
                      {...register("email")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                    {errors.email && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">First Name</label>
                      <input 
                        type="text" 
                        placeholder="Alex" 
                        {...register("firstName")}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                      />
                      {errors.firstName && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Mercer" 
                        {...register("lastName")}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                      />
                      {errors.lastName && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Street Address</label>
                    <input 
                      type="text" 
                      placeholder="128 Neon Glow Lane, Suite 400" 
                      {...register("address")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                    {errors.address && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">City</label>
                      <input 
                        type="text" 
                        placeholder="Los Angeles" 
                        {...register("city")}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                      />
                      {errors.city && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Zip / Postal Code</label>
                      <input 
                        type="text" 
                        placeholder="90001" 
                        {...register("zipCode")}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                      />
                      {errors.zipCode && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.zipCode.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Card details */}
              <div className="glass-effect p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
                  <span>2.</span> Simulated Payment
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4 text-neon-blue" /> Card Number (Simulated)
                    </label>
                    <input 
                      type="text" 
                      maxLength={16}
                      placeholder="4111222233334444" 
                      {...register("cardNumber")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors font-mono"
                    />
                    {errors.cardNumber && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.cardNumber.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Expiry Date (MM/YY)</label>
                      <input 
                        type="text" 
                        placeholder="12/28" 
                        {...register("cardExpiry")}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors font-mono"
                      />
                      {errors.cardExpiry && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.cardExpiry.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">CVV (3 Digits)</label>
                      <input 
                        type="password" 
                        maxLength={3}
                        placeholder="123" 
                        {...register("cardCvv")}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors font-mono"
                      />
                      {errors.cardCvv && <p className="text-[10px] text-neon-pink font-semibold pl-1">{errors.cardCvv.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-[10px] text-neutral-500 font-bold justify-center">
                  <Lock className="h-3.5 w-3.5 text-neon-blue animate-pulse" /> SSL Encrypted Simulated Transaction
                </div>
              </div>

              {/* Checkout Submit CTA */}
              <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 bg-linear-to-r from-neon-pink to-neon-blue rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-neon-pink/15 ${
                  isProcessing ? "opacity-60 cursor-wait" : ""
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4.5 w-4.5" /> Place Simulated Order ({formatPrice(totals.total)})
                  </span>
                )}
              </button>

            </form>
          </div>

          {/* Checkout Order Details (4 columns) */}
          <div className="lg:col-span-4 bg-[#09090b] border border-white/5 p-6 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
              Items Recap
            </h3>

            {/* List items */}
            <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-2 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs py-3 first:pt-0">
                  <div className="space-y-0.5 max-w-[70%]">
                    <span className="text-white font-bold block truncate">{item.name}</span>
                    <span className="text-[10px] text-neutral-500 font-semibold">Qty: {item.quantity} • {item.color} • {item.size}</span>
                  </div>
                  <span className="text-white font-black">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Order totals */}
            <div className="border-t border-white/5 pt-4 space-y-2 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-white font-bold">
                  {totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span className="text-white font-bold">{formatPrice(totals.tax)}</span>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between items-end text-sm">
                <span className="font-bold text-white">Grand Total</span>
                <span className="text-base font-black text-neon-blue">{formatPrice(totals.total)}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
