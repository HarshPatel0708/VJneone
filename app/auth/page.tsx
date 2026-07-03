"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ChevronRight, Key, Mail, Lock, User, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

// Validation schemas
const loginSchema = zod.object({
  email: zod.string().email("Enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = zod.infer<typeof loginSchema>;
type RegisterFormData = zod.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">("login");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors, isSubmitting: isLoggingIn } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerReg, handleSubmit: handleRegSubmit, formState: { errors: regErrors, isSubmitting: isRegistering } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onLogin = (data: LoginFormData) => {
    // Simulate user login
    setTimeout(() => {
      setSuccessMsg("Welcome back! Login verified successfully.");
      setIsSuccess(true);
      
      canvasConfetti({
        particleCount: 50,
        spread: 40,
        colors: ["#0080ff", "#ffffff"]
      });

      setTimeout(() => {
        window.location.href = "/account";
      }, 1500);
    }, 1000);
  };

  const onRegister = (data: RegisterFormData) => {
    // Simulate registration
    setTimeout(() => {
      setSuccessMsg("Account created! Welcome to VJneon.");
      setIsSuccess(true);

      canvasConfetti({
        particleCount: 50,
        spread: 40,
        colors: ["#ff0066", "#ffffff"]
      });

      setTimeout(() => {
        window.location.href = "/account";
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-400">Account Auth</span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black">VJ Member Hub</h1>
        <p className="text-xs text-neutral-500">Track custom orders and manage your saved neon sign configurations.</p>
      </div>

      {isSuccess ? (
        <div className="rounded-3xl glass-effect p-8 border border-neon-blue/20 text-center space-y-4 py-16">
          <div className="inline-flex p-3 rounded-full bg-neon-blue/20 text-neon-blue shadow-neon-blue">
            <CheckCircle className="h-8 w-8 animate-bounce" />
          </div>
          <h3 className="text-lg font-bold text-white">Authentication Succeeded</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-semibold">
            {successMsg} Redirecting to your dashboard...
          </p>
        </div>
      ) : (
        <div className="glass-effect rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
          {/* Ambient light overlay */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-blue/10 rounded-full blur-2xl pointer-events-none" />

          {/* Form Tabs */}
          {activeTab !== "forgot" && (
            <div className="flex border-b border-white/5">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                  activeTab === "login" ? "border-neon-blue text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"
                }`}
              >
                Login Member
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                  activeTab === "register" ? "border-neon-pink text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"
                }`}
              >
                Register Account
              </button>
            </div>
          )}

          <div className="p-6 md:p-8">
            
            {/* LOGIN FORM */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="email" 
                      placeholder="e.g. member@vjneon.com"
                      {...registerLogin("email")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                  </div>
                  {loginErrors.email && <p className="text-[10px] text-neon-pink font-semibold pl-1">{loginErrors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Password</label>
                    <button 
                      type="button"
                      onClick={() => setActiveTab("forgot")}
                      className="text-[10px] text-neutral-500 hover:text-white"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      {...registerLogin("password")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                  </div>
                  {loginErrors.password && <p className="text-[10px] text-neon-pink font-semibold pl-1">{loginErrors.password.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-lg shadow-neon-pink/15 cursor-pointer mt-2"
                >
                  {isLoggingIn ? "Logging in..." : "Login Member"}
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {activeTab === "register" && (
              <form onSubmit={handleRegSubmit(onRegister)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="text" 
                      placeholder="Alex Mercer"
                      {...registerReg("name")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-neon-pink outline-hidden transition-colors"
                    />
                  </div>
                  {regErrors.name && <p className="text-[10px] text-neon-pink font-semibold pl-1">{regErrors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="email" 
                      placeholder="alex@company.com"
                      {...registerReg("email")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-neon-pink outline-hidden transition-colors"
                    />
                  </div>
                  {regErrors.email && <p className="text-[10px] text-neon-pink font-semibold pl-1">{regErrors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      {...registerReg("password")}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-neon-pink outline-hidden transition-colors"
                    />
                  </div>
                  {regErrors.password && <p className="text-[10px] text-neon-pink font-semibold pl-1">{regErrors.password.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-lg shadow-neon-pink/15 cursor-pointer mt-2"
                >
                  {isRegistering ? "Registering..." : "Create Free Account"}
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD FORM */}
            {activeTab === "forgot" && (
              <div className="space-y-6">
                <div className="space-y-1.5 text-center">
                  <h3 className="text-sm font-bold text-white">Reset Secure Password</h3>
                  <p className="text-[10px] text-neutral-500 leading-relaxed">
                    Submit your email address below. We will send you a reset link instructions.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="email" 
                      placeholder="alex@company.com"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveTab("login")}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsSuccess(true);
                      setSuccessMsg("Password reset email sent!");
                      setTimeout(() => {
                        setIsSuccess(false);
                        setActiveTab("login");
                      }, 2000);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-neon-blue text-xs font-bold text-white hover:opacity-90 cursor-pointer"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
