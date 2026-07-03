import type { Metadata } from "next";
import { 
  Outfit, 
  Pacifico, 
  Caveat, 
  Sacramento, 
  Yellowtail, 
  Tilt_Neon, 
  Dosis 
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Configure premium fonts
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  weight: "400",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  weight: "400",
  subsets: ["latin"],
});

const tiltNeon = Tilt_Neon({
  variable: "--font-tilt-neon",
  subsets: ["latin"],
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VJneon® | Premium Custom LED Neon Signs & Signage",
  description: "Design your own custom LED neon sign online with our interactive Neon Builder. High-end storefront channel letters, wedding neon backdrops, and luxury home decor signs.",
  keywords: ["custom neon signs", "LED signs", "neon builder", "wedding backdrop", "storefront signs", "channel letters", "acrylic signage", "light box"],
  authors: [{ name: "VJneon" }],
  metadataBase: new URL("https://vjneon.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VJneon® | Premium Custom LED Neon Signs & Signage",
    description: "Design your own custom LED neon sign online with our interactive Neon Builder. High-end storefront channel letters, wedding neon backdrops, and luxury home decor signs.",
    url: "https://vjneon.com",
    siteName: "VJneon",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "VJneon Premium LED Signage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VJneon® | Premium Custom LED Neon Signs & Signage",
    description: "Design your own custom LED neon sign online. Handcrafted luxury LED signage with a 2-Year warranty.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${pacifico.variable} ${caveat.variable} ${sacramento.variable} ${yellowtail.variable} ${tiltNeon.variable} ${dosis.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f5f5f7]">
        {/* Organisation JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VJneon",
              "url": "https://vjneon.com",
              "logo": "https://vjneon.com/logo.png",
              "sameAs": [
                "https://instagram.com/vjneon",
                "https://facebook.com/vjneon"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-NEON-GLOW",
                "contactType": "Customer Service",
                "email": "support@vjneon.com",
                "areaServed": "US",
                "availableLanguage": "en"
              }
            }),
          }}
        />
        <Header />
        {/* Main Content Area with padding top to account for sticky nav bar */}
        <main className="flex-1 pt-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
