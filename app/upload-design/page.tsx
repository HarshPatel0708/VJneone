"use client";

import React, { useState, useRef } from "react";
import { 
  Upload, 
  FileCode, 
  HelpCircle, 
  CheckCircle, 
  Sparkles, 
  X,
  FileCheck,
  AlertTriangle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

export default function UploadDesignPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Customization choices
  const [width, setWidth] = useState("100cm (40\")");
  const [usage, setUsage] = useState("indoor");
  const [colorType, setColorType] = useState("single");
  const [notes, setNotes] = useState("");
  
  // User credentials
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File size limit (50MB)
  const MAX_FILE_SIZE = 50 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = [".svg", ".png", ".pdf", ".ai", ".eps", ".psd", ".jpg", ".jpeg"];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    setErrorMsg("");
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setErrorMsg(`Invalid format. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`);
      return false;
    }
    
    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMsg("File is too large. Limit is 50MB.");
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !email) return;

    setFormSubmitted(true);
    
    // Confetti effect
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      colors: ["#ff0066", "#0080ff", "#ffffff"]
    });

    setTimeout(() => {
      setFormSubmitted(false);
      setFile(null);
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white py-10 px-6">
      
      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-xs font-semibold text-neon-pink">
          <Sparkles className="h-3.5 w-3.5" /> Logo & Art Designer Upload
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          Upload Your <span className="bg-linear-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Custom Logo Design</span>
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Do you have a custom business logo, drawing, signature, or vector art file? Upload it below, configure your requirements, and receive a free digital mockup and price quote within 12 hours.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Upload Sandbox (Left Panel: 7 Columns) */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full rounded-3xl glass-effect p-8 border border-neon-blue/30 text-center py-20 space-y-6"
              >
                <div className="inline-flex p-4 rounded-full bg-neon-blue/20 text-neon-blue shadow-neon-blue animate-bounce">
                  <CheckCircle className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-white">Upload Succeeded!</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Your files and configuration have been sent. Our team of design engineers will prepare your layout sheet and email you within 12 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                
                {/* Drag-and-drop container */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer relative overflow-hidden ${
                    dragActive 
                      ? "border-neon-blue bg-neon-blue/5 shadow-neon-blue/10 scale-98" 
                      : file 
                      ? "border-neon-pink bg-neon-pink/5" 
                      : "border-white/10 bg-neutral-900/40 hover:bg-neutral-900/60 hover:border-white/20"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple={false}
                    onChange={handleFileChange}
                    accept={ALLOWED_EXTENSIONS.join(",")}
                    className="hidden"
                  />

                  {/* Soft atmospheric gradient backdrop inside drag area */}
                  <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent pointer-events-none" />

                  {file ? (
                    <div className="space-y-4 relative z-10">
                      <div className="inline-flex p-3 rounded-full bg-neon-pink/20 text-neon-pink shadow-neon-pink">
                        <FileCheck className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white max-w-xs truncate mx-auto">{file.name}</p>
                        <p className="text-[10px] text-neutral-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 relative z-10">
                      <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 text-neutral-400 group-hover:scale-110 transition-transform">
                        <Upload className="h-8 w-8 text-neon-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Drag & drop your files here</p>
                        <p className="text-xs text-neutral-500 mt-1">or click to browse from folders</p>
                      </div>
                      <p className="text-[10px] text-neutral-600 font-semibold max-w-xs mx-auto">
                        Supports SVG, PNG, PDF, AI, EPS, PSD, JPG (Max 50MB)
                      </p>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-xs text-neon-pink bg-black border border-neon-pink/20 px-3 py-2 rounded-xl justify-center font-semibold">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>

                {/* AI Preview simulator message */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3.5">
                  <Info className="h-5 w-5 text-neon-blue flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-white">AI-Powered Vector Check</h5>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                      Our platform runs automated file checks on your vector graphics to inspect curves, alignment layers, and contour lines, ensuring the fastest production turnaround.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Configuration Form (Right Panel: 5 Columns) */}
        <div className="md:col-span-5">
          <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-3xl border border-white/5 space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
              Custom Requirements
            </h4>

            {/* Sizes selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Approximate Width</label>
              <select 
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-hidden cursor-pointer"
              >
                <option value='50cm (20")'>Small: 50cm (20&quot;)</option>
                <option value='75cm (30")'>Standard: 75cm (30&quot;)</option>
                <option value='100cm (40")'>Medium: 100cm (40&quot;)</option>
                <option value='125cm (50")'>Large: 125cm (50&quot;)</option>
                <option value='150cm (60")'>Grand: 150cm (60&quot;)</option>
              </select>
            </div>

            {/* Environmental Placement option */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sign Placement</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUsage("indoor")}
                  className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                    usage === "indoor" 
                      ? "bg-white/10 border-white/20 text-white" 
                      : "bg-neutral-900 border-white/5 text-neutral-500"
                  }`}
                >
                  Indoor Use
                </button>
                <button
                  type="button"
                  onClick={() => setUsage("outdoor")}
                  className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                    usage === "outdoor" 
                      ? "bg-neon-pink/10 border-neon-pink/30 text-white" 
                      : "bg-neutral-900 border-white/5 text-neutral-500"
                  }`}
                >
                  Outdoor IP67
                </button>
              </div>
            </div>

            {/* Color selection type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sign Glow Colors</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setColorType("single")}
                  className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                    colorType === "single" 
                      ? "bg-white/10 border-white/20 text-white" 
                      : "bg-neutral-900 border-white/5 text-neutral-500"
                  }`}
                >
                  Single Color
                </button>
                <button
                  type="button"
                  onClick={() => setColorType("multi")}
                  className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                    colorType === "multi" 
                      ? "bg-neon-blue/10 border-neon-blue/30 text-white" 
                      : "bg-neutral-900 border-white/5 text-neutral-500"
                  }`}
                >
                  Multi-Color / RGB
                </button>
              </div>
            </div>

            {/* Details text area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Instructions / Specifications</label>
              <textarea
                placeholder="Include custom backing shapes, color preferences, font requirements, or installation details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 outline-hidden h-20 resize-none"
              />
            </div>

            {/* User credentials */}
            <div className="border-t border-white/5 pt-4 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@millerdesign.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-neon-blue outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Submit Quote button */}
            <button
              type="submit"
              disabled={!file || !name || !email}
              className={`w-full py-3.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg flex items-center justify-center gap-1.5 ${
                file && name && email 
                  ? "bg-linear-to-r from-neon-pink to-neon-blue hover:opacity-95 hover:scale-[1.02] cursor-pointer shadow-neon-pink/15" 
                  : "bg-neutral-800 text-neutral-500 border border-white/5 cursor-not-allowed"
              }`}
            >
              🚀 Submit Design for Free Quote
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
