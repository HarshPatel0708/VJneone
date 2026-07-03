"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Share2, 
  Download, 
  HelpCircle, 
  Maximize2, 
  Minimize2, 
  CloudSun,
  Shield,
  Layers,
  Wrench,
  ChevronRight,
  Info,
  CheckCircle,
  Copy,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useConfig } from "@/hooks/useConfig";
import canvasConfetti from "canvas-confetti";

// Neon colors definition
const neonColors = [
  { name: "VJ Pink", hex: "#ff0066", glow: "rgba(255, 0, 102, 0.8)" },
  { name: "VJ Blue", hex: "#0080ff", glow: "rgba(0, 128, 255, 0.8)" },
  { name: "Warm White", hex: "#ffdfb0", glow: "rgba(255, 223, 176, 0.8)" },
  { name: "Pure White", hex: "#ffffff", glow: "rgba(255, 255, 255, 0.8)" },
  { name: "Lemon Green", hex: "#39ff14", glow: "rgba(57, 255, 20, 0.8)" },
  { name: "Sunset Orange", hex: "#ff5e00", glow: "rgba(255, 94, 0, 0.8)" },
  { name: "Ruby Red", hex: "#ff0000", glow: "rgba(255, 0, 0, 0.8)" },
  { name: "Golden Yellow", hex: "#ffb700", glow: "rgba(255, 183, 0, 0.8)" },
  { name: "Electric Purple", hex: "#9d00ff", glow: "rgba(157, 0, 255, 0.8)" }
];

// Google fonts list mapping variables in CSS
const neonFonts = [
  { name: "Tilt Neon", class: "font-tilt-neon", style: "Standard Rounded" },
  { name: "Pacifico", class: "font-pacifico", style: "Cursive Script" },
  { name: "Caveat", class: "font-caveat", style: "Handwriting" },
  { name: "Sacramento", class: "font-sacramento", style: "Elegant Thin" },
  { name: "Yellowtail", class: "font-yellowtail", style: "Vintage Cursive" },
  { name: "Dosis", class: "font-dosis", style: "Modern Bold" }
];

// Background walls
const backdrops = [
  { 
    name: "Dark Drywall", 
    style: { backgroundColor: "#121214" } 
  },
  { 
    name: "Classic Brick", 
    style: { 
      backgroundColor: "#180c0c",
      backgroundImage: "radial-gradient(circle, transparent 20%, #180c0c 20%, #180c0c 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #180c0c 20%, #180c0c 80%, transparent 80%, transparent), linear-gradient(to right, #241414 2px, transparent 2px), linear-gradient(to bottom, #241414 2px, transparent 2px)",
      backgroundSize: "20px 20px, 20px 20px, 40px 20px, 40px 20px",
      backgroundPosition: "0 0, 20px 10px, 0 0, 0 0"
    } 
  },
  { 
    name: "Wood Plank", 
    style: { 
      backgroundImage: "repeating-linear-gradient(90deg, #1e130c 0px, #1e130c 38px, #120b07 38px, #120b07 40px)",
      backgroundColor: "#1e130c"
    } 
  },
  { 
    name: "Industrial Concrete", 
    style: { 
      backgroundColor: "#2e2e30",
      backgroundImage: "radial-gradient(#242426 1px, transparent 0), radial-gradient(#242426 1px, transparent 0)",
      backgroundSize: "8px 8px",
      backgroundPosition: "0 0, 4px 4px"
    } 
  }
];

export default function CustomNeonBuilder() {
  const { formatPrice } = useConfig();
  const addItem = useCart((state) => state.addItem);

  // Builder configurations state
  const [activeTab, setActiveTab] = useState<"design" | "dimensions" | "accessories">("design");
  const [text, setText] = useState("VJ neon");
  const [selectedFont, setSelectedFont] = useState(neonFonts[0]);
  const [selectedColor, setSelectedColor] = useState(neonColors[0]);
  const [glowIntensity, setGlowIntensity] = useState(70);
  const [letterSpacing, setLetterSpacing] = useState(2); // in px
  const [curvature, setCurvature] = useState(0); // curved text slider (-50 to 50)
  const [backdrop, setBackdrop] = useState(backdrops[0]);
  
  // Dimensions options
  const [widthCm, setWidthCm] = useState(80); // width slider
  const [backboardShape, setBackboardShape] = useState<"outline" | "board" | "raceway">("outline");
  const [usageType, setUsageType] = useState<"indoor" | "outdoor">("indoor");

  // Accessories options
  const [dimmerType, setDimmerType] = useState<"none" | "remote" | "smart">("remote");
  const [hangingKit, setHangingKit] = useState<"wall" | "ceiling">("wall");
  const [plugType, setPlugType] = useState<"us" | "uk" | "eu" | "au">("us");

  // Modal / Feedback states
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Quote form state
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  // Price Calculation Logic
  const calculatePrice = () => {
    let price = 120; // Base Price

    // Cost per letter (ignoring spaces)
    const letterCount = text.replace(/\s/g, "").length;
    price += letterCount * 12;

    // Size modifier
    price += (widthCm - 50) * 2.2;

    // Backboard Shape
    if (backboardShape === "board") price += 35;
    if (backboardShape === "raceway") price += 50;

    // Outdoor upgrade
    if (usageType === "outdoor") price += 60;

    // Dimmers
    if (dimmerType === "remote") price += 25;
    if (dimmerType === "smart") price += 45;

    return Math.round(price);
  };

  const totalPrice = calculatePrice();

  // Load URL parameters on mount if shared
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get("text");
      if (textParam) setText(decodeURIComponent(textParam));

      const fontParam = params.get("font");
      if (fontParam) {
        const found = neonFonts.find((f) => f.name.toLowerCase() === fontParam.toLowerCase());
        if (found) setSelectedFont(found);
      }

      const colorParam = params.get("color");
      if (colorParam) {
        const found = neonColors.find((c) => c.name.toLowerCase() === colorParam.toLowerCase());
        if (found) setSelectedColor(found);
      }

      const sizeParam = params.get("size");
      if (sizeParam) setWidthCm(Number(sizeParam));
    }
  }, []);

  // Generate share link
  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("text", encodeURIComponent(text));
    url.searchParams.set("font", selectedFont.name);
    url.searchParams.set("color", selectedColor.name);
    url.searchParams.set("size", widthCm.toString());
    
    navigator.clipboard.writeText(url.toString()).then(() => {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 3000);
    });
  };

  // Add Custom Design to Cart
  const handleAddToCart = () => {
    const cartId = `custom-${Date.now()}`;
    const descColor = selectedColor.name;
    const descFont = selectedFont.name;
    const descSize = `${widthCm}cm (${Math.round(widthCm * 0.4)} inches)`;
    const descBackboard = backboardShape === "outline" ? "Cut-to-shape" : backboardShape === "board" ? "Acrylic Stand Board" : "Raceway Mount";
    
    const accessories = [];
    if (dimmerType === "remote") accessories.push("Remote & Dimmer Controller");
    if (dimmerType === "smart") accessories.push("Wifi Smart Controller");
    if (hangingKit === "ceiling") accessories.push("Ceiling Suspension Kit");
    accessories.push(`Power Plug: ${plugType.toUpperCase()}`);

    addItem({
      id: cartId,
      productId: "custom-neon",
      name: `Custom Neon Sign: "${text.substring(0, 15)}${text.length > 15 ? "..." : ""}"`,
      price: totalPrice,
      image: "custom-neon",
      color: descColor,
      size: descSize,
      backboard: descBackboard,
      usage: usageType === "indoor" ? "Indoor" : "IP67 Outdoor Waterproof",
      accessories,
      isCustom: true,
      customText: text,
      customFont: descFont
    });

    // Fireworks confetti!
    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quoteEmail) return;
    
    // Simulate quote submit
    setQuoteSuccess(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSuccess(false);
      setQuoteName("");
      setQuoteEmail("");
      setQuoteNotes("");
    }, 2500);
  };

  // Dynamic SVG curved text path logic
  // Path width is 500. Center point is Q 250 (150 - curvature)
  const getCurvePath = () => {
    const yVal = 150 - curvature;
    return `M 20 150 Q 250 ${yVal} 480 150`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT COLUMN: Visual Preview Sandbox (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-36">
        
        {/* The Wall Preview Stage */}
        <div 
          ref={previewRef}
          style={backdrop.style}
          className="w-full aspect-[4/3] rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/10 transition-all duration-500 shadow-inner group"
        >
          {/* Neon light reflection layer */}
          <div 
            style={{
              background: `radial-gradient(circle, ${selectedColor.glow} 0%, transparent 65%)`,
              opacity: glowIntensity / 100 * 0.45
            }}
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          />

          {/* Wall overlay shadow */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />

          {/* Sizing guides labels */}
          <div className="absolute left-6 bottom-6 flex items-center gap-1.5 text-xs text-white/50 bg-black/60 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <span>Size: {widthCm}cm ({Math.round(widthCm * 0.4)}&quot;)</span>
          </div>

          <div className="absolute right-6 bottom-6 flex items-center gap-1.5 text-xs text-white/50 bg-black/60 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <span>Usage: {usageType === "indoor" ? "🏡 Indoor" : "☔ Outdoor IP67"}</span>
          </div>

          {/* Realistic Backboard Outline visualization */}
          <div 
            className={`absolute max-w-[85%] max-h-[75%] flex items-center justify-center p-8 transition-all duration-300 ${
              backboardShape === "board" 
                ? "bg-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xs" 
                : backboardShape === "raceway"
                ? "bg-neutral-800/80 border-t border-neutral-700 w-[90%] h-8 rounded-full shadow-lg"
                : ""
            }`}
          >
            {/* Live Text rendering */}
            <div className="relative select-none text-center">
              {curvature === 0 ? (
                // Flat layout
                <div 
                  style={{
                    color: selectedColor.hex,
                    textShadow: `
                      0 0 5px #fff,
                      0 0 10px #fff,
                      0 0 ${20 * (glowIntensity/100)}px ${selectedColor.hex},
                      0 0 ${40 * (glowIntensity/100)}px ${selectedColor.hex},
                      0 0 ${75 * (glowIntensity/100)}px ${selectedColor.hex}
                    `,
                    letterSpacing: `${letterSpacing}px`,
                    fontSize: `${Math.min(5.5, 30 / (text.length || 1))}rem`,
                    lineHeight: 1.15
                  }}
                  className={`${selectedFont.class} whitespace-pre-wrap font-bold select-none leading-none`}
                >
                  {text || "Enter Text"}
                </div>
              ) : (
                // Curved Layout using SVG TextPath
                <svg width="450" height="280" viewBox="0 0 500 300" className="mx-auto select-none pointer-events-none overflow-visible">
                  <defs>
                    <path id="neonCurvePath" d={getCurvePath()} fill="transparent" />
                  </defs>
                  <text fill={selectedColor.hex} textAnchor="middle" className={`${selectedFont.class} font-bold select-none`}>
                    <textPath 
                      href="#neonCurvePath" 
                      startOffset="50%"
                      style={{
                        letterSpacing: `${letterSpacing}px`,
                        fontSize: `${Math.min(3.5, 20 / (text.length || 1))}rem`,
                        filter: `drop-shadow(0 0 3px #fff) drop-shadow(0 0 ${8 * (glowIntensity/100)}px ${selectedColor.hex}) drop-shadow(0 0 ${20 * (glowIntensity/100)}px ${selectedColor.hex})`
                      }}
                    >
                      {text || "Enter Text"}
                    </textPath>
                  </text>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Backdrop Wall Selector row */}
        <div className="grid grid-cols-4 gap-3">
          {backdrops.map((wall) => (
            <button
              key={wall.name}
              onClick={() => setBackdrop(wall)}
              className={`p-2 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer truncate ${
                backdrop.name === wall.name 
                  ? "bg-white/10 border-white/30 text-white" 
                  : "bg-neutral-900/60 border-white/5 text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {wall.name}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Control Panel (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Step Tabs Navigation */}
        <div className="flex border-b border-white/5">
          {(["design", "dimensions", "accessories"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-sm font-semibold capitalize border-b-2 transition-colors cursor-pointer ${
                activeTab === tab 
                  ? "border-neon-blue text-white" 
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: DESIGN STYLES */}
        {activeTab === "design" && (
          <div className="space-y-6">
            
            {/* Input Text Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Your Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter custom neon text"
                maxLength={45}
                className="w-full bg-neutral-900 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-neon-blue outline-hidden resize-none h-24 transition-colors"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-semibold px-1">
                <span>Use Enter for new lines</span>
                <span>{text.length}/45 chars</span>
              </div>
            </div>

            {/* Font Selector List */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Font Styles</label>
              <div className="grid grid-cols-2 gap-3.5">
                {neonFonts.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => setSelectedFont(font)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      selectedFont.name === font.name 
                        ? "bg-neon-blue/10 border-neon-blue text-white" 
                        : "bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{font.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{font.style}</div>
                    <div className={`absolute right-3.5 bottom-3.5 w-1.5 h-1.5 rounded-full bg-neon-blue opacity-0 transition-opacity ${
                      selectedFont.name === font.name ? "opacity-100" : "group-hover:opacity-40"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Neon Colors Row */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Neon Colors</label>
              <div className="grid grid-cols-3 gap-2">
                {neonColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedColor.name === color.name 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-neutral-900/40 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span 
                      style={{ 
                        backgroundColor: color.hex,
                        boxShadow: `0 0 8px ${color.hex}`
                      }} 
                      className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0" 
                    />
                    <span className="text-xs font-semibold truncate">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Letter spacing & Curvature sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Letter Spacing ({letterSpacing}px)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full accent-neon-blue h-1 bg-neutral-900 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Curvature ({curvature})</label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={curvature}
                  onChange={(e) => setCurvature(Number(e.target.value))}
                  className="w-full accent-neon-pink h-1 bg-neutral-900 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Glow Intensity */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Glow Intensity ({glowIntensity}%)</label>
              <input
                type="range"
                min="30"
                max="100"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(Number(e.target.value))}
                className="w-full accent-neon-blue h-1 bg-neutral-900 rounded-lg cursor-pointer"
              />
            </div>

          </div>
        )}

        {/* TAB 2: DIMENSIONS & BASE */}
        {activeTab === "dimensions" && (
          <div className="space-y-6">
            
            {/* Width Size Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Sign Width (cm)</label>
                <span className="text-sm font-bold text-neon-blue">{widthCm} cm / {Math.round(widthCm * 0.4)}&quot;</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={widthCm}
                onChange={(e) => setWidthCm(Number(e.target.value))}
                className="w-full accent-neon-blue h-1.5 bg-neutral-900 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-neutral-400 leading-relaxed font-semibold">
                * Height is automatically calculated based on font proportions to prevent distortion. Recommended for {text.length} characters.
              </p>
            </div>

            {/* Backboard Acrylic Shapes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Backboard Shape</label>
              <div className="space-y-2">
                {[
                  { id: "outline", name: "Cut To Shape (Outline)", desc: "Contours around neon letters. Most popular and minimal.", price: "+$0" },
                  { id: "board", name: "Full Acrylic Board (Board)", desc: "Stiff solid transparent backboard. Best for stand mount.", price: "+$35" },
                  { id: "raceway", name: "Wall Raceway Base", desc: "Rigid metal return channel. For commercial storefronts.", price: "+$50" }
                ].map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setBackboardShape(shape.id as any)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-4 cursor-pointer transition-all ${
                      backboardShape === shape.id 
                        ? "bg-neon-blue/10 border-neon-blue text-white" 
                        : "bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{shape.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-1">{shape.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-neon-blue">{shape.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Indoor / Outdoor waterproof switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Environmental Usage</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUsageType("indoor")}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                    usageType === "indoor" 
                      ? "bg-white/10 border-white/20 text-white" 
                      : "bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <div className="text-xs font-bold">🏡 Indoor Use</div>
                  <div className="text-[9px] text-neutral-500 mt-1">Standard backing</div>
                </button>

                <button
                  onClick={() => setUsageType("outdoor")}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                    usageType === "outdoor" 
                      ? "bg-neon-pink/10 border-neon-pink/30 text-white" 
                      : "bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <div className="text-xs font-bold">☔ Outdoor Upgrade</div>
                  <div className="text-[9px] text-neutral-500 mt-1">IP67 Waterproof (+$60)</div>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CONTROLLERS & KITS */}
        {activeTab === "accessories" && (
          <div className="space-y-6">
            
            {/* Dimmer remote controls */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Controller & Dimming</label>
              <div className="space-y-2.5">
                {[
                  { id: "none", name: "Standard Power Adapter Only", desc: "Simple plug and glow. No intensity adjustments.", price: "+$0" },
                  { id: "remote", name: "Glow Remote & Dimmer Kit", desc: "Includes RF remote with dimming (10%-100%) and flash modes.", price: "+$25" },
                  { id: "smart", name: "Smart Wifi App Controller", desc: "Control via Alexa, Google Assistant, or smartphone app.", price: "+$45" }
                ].map((dim) => (
                  <button
                    key={dim.id}
                    onClick={() => setDimmerType(dim.id as any)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-4 cursor-pointer transition-all ${
                      dimmerType === dim.id 
                        ? "bg-neon-blue/10 border-neon-blue text-white" 
                        : "bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{dim.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-1">{dim.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-neon-blue">{dim.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mounting accessories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Mounting Options</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setHangingKit("wall")}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    hangingKit === "wall" 
                      ? "bg-white/10 border-white/20 text-white" 
                      : "bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <div className="text-xs font-bold">🔘 Wall Mount Kit</div>
                  <div className="text-[9px] text-neutral-500 mt-1">Chrome standoffs (Included)</div>
                </button>

                <button
                  onClick={() => setHangingKit("ceiling")}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    hangingKit === "ceiling" 
                      ? "bg-white/10 border-white/20 text-white" 
                      : "bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <div className="text-xs font-bold">⛓️ Suspension Wire</div>
                  <div className="text-[9px] text-neutral-500 mt-1">Steel hanging chain (Included)</div>
                </button>
              </div>
            </div>

            {/* Power Plugs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">AC Power Adapter Plug</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "us", name: "US / CA" },
                  { id: "uk", name: "UK" },
                  { id: "eu", name: "EU" },
                  { id: "au", name: "AU / NZ" }
                ].map((plug) => (
                  <button
                    key={plug.id}
                    onClick={() => setPlugType(plug.id as any)}
                    className={`py-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                      plugType === plug.id 
                        ? "bg-neon-blue/15 border-neon-blue text-white" 
                        : "bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {plug.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* BOTTOM SECTION: Total Price, Checkout Actions */}
        <div className="border-t border-white/5 pt-6 mt-2 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">Estimated Delivery: 7-10 Days</div>
              <div className="text-xs text-neutral-400 font-semibold mt-0.5">Free Insured Global Shipping</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-neutral-500 font-bold">Total Price</div>
              <div className="text-2xl font-black text-white">{formatPrice(totalPrice)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="py-3.5 rounded-2xl bg-linear-to-r from-neon-pink to-neon-blue text-sm font-bold text-white hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer shadow-lg shadow-neon-pink/15 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-4.5 w-4.5 animate-pulse" /> Add To Cart
            </button>

            {/* Request Quotation button */}
            <button
              onClick={() => setShowQuoteModal(true)}
              className="py-3.5 rounded-2xl bg-neutral-900 border border-white/10 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>

          {/* Share / Save options */}
          <div className="flex justify-center gap-6 text-xs text-neutral-500 font-semibold pt-1">
            <button 
              onClick={handleShare}
              className="hover:text-neon-blue transition-colors flex items-center gap-1.5 cursor-pointer relative"
            >
              <Share2 className="h-4 w-4" /> Share Design
              {showShareTooltip && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 border border-white/10 px-2 py-1 rounded-md text-[10px] text-white whitespace-nowrap shadow-xl">
                  Link copied!
                </span>
              )}
            </button>

            <button 
              onClick={() => {
                // Mock preview SVG download
                const svgElement = document.querySelector("svg");
                if (svgElement) {
                  const svgData = new XMLSerializer().serializeToString(svgElement);
                  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                  const svgUrl = URL.createObjectURL(svgBlob);
                  const downloadLink = document.createElement("a");
                  downloadLink.href = svgUrl;
                  downloadLink.download = "vjneon-custom-design.svg";
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                } else {
                  alert("Please write curved text or standard text to download preview!");
                }
              }}
              className="hover:text-neon-pink transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download SVG
            </button>
          </div>
        </div>

      </div>

      {/* CUSTOM QUOTE DIALOG MODAL */}
      <AnimatePresence>
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuoteModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs" 
            />

            {/* Content panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl glass-effect p-8 shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Corner Glow decoration */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-neon-blue/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Request Custom Quote
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Submit your custom configuration to our design engineers.</p>
                </div>
                <button 
                  onClick={() => setShowQuoteModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-neutral-500 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {quoteSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-neon-blue/20 text-neon-blue shadow-neon-blue mb-2 animate-bounce">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Quote Request Received!</h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                    Our team is preparing your custom 3D mockup and price quotation sheet. We will email you at <b>{quoteEmail}</b> within 12 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestQuote} className="space-y-4">
                  {/* Summary of Configuration */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-neutral-400 space-y-1.5">
                    <div className="flex justify-between"><span className="font-bold">Text:</span> <span className="text-white font-mono">{text}</span></div>
                    <div className="flex justify-between"><span>Font Style:</span> <span className="text-white font-semibold">{selectedFont.name}</span></div>
                    <div className="flex justify-between"><span>Neon Color:</span> <span className="text-white font-semibold" style={{ color: selectedColor.hex }}>{selectedColor.name}</span></div>
                    <div className="flex justify-between"><span>Size Width:</span> <span className="text-white font-semibold">{widthCm}cm</span></div>
                    <div className="flex justify-between"><span>Weather Upgrade:</span> <span className="text-white font-semibold">{usageType === "indoor" ? "Indoor" : "IP67 Outdoor Waterproof"}</span></div>
                    <div className="flex justify-between"><span>Estimated Quote Value:</span> <span className="text-white font-bold text-neon-blue">{formatPrice(totalPrice)}</span></div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="David Miller" 
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-neon-blue outline-hidden transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="david@company.com" 
                      value={quoteEmail}
                      onChange={(e) => setQuoteEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-neon-blue outline-hidden transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Design Notes / Instructions</label>
                    <textarea 
                      placeholder="Add any specific backboard requests, custom dimensions, or wall placement notes..." 
                      value={quoteNotes}
                      onChange={(e) => setQuoteNotes(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-neon-blue outline-hidden transition-colors h-20 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-linear-to-r from-neon-pink to-neon-blue text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-neon-pink/15"
                  >
                    Submit Quotation Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
