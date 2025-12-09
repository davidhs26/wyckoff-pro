import type { Metadata } from "next";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Navbar, GlobalCursorEffect } from "@/components";
import "./globals.css";

// Note: Link and Image are used in footer section

export const metadata: Metadata = {
  title: "Wyckoff Pro - Advanced Volume Spread Analysis Indicator | Detect Institutional Trading",
  description:
    "Master the Wyckoff Method with our advanced TradingView indicator. Detect accumulation and distribution phases, identify institutional money footprints through Volume Spread Analysis (VSA), and spot smart money moves before they happen. Professional-grade trading tools for serious traders.",
  keywords: [
    "wyckoff method",
    "wyckoff trading",
    "volume spread analysis",
    "vsa indicator",
    "tradingview indicator",
    "accumulation phase",
    "distribution phase",
    "institutional trading",
    "smart money",
    "richard wyckoff",
    "trading range",
    "spring pattern",
    "upthrust",
    "professional trading",
    "technical analysis",
    "volume analysis",
    "market structure",
    "price action",
  ],
  authors: [{ name: "TradeWyckoff" }],
  creator: "TradeWyckoff",
  publisher: "TradeWyckoff",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tradewyckoff.com",
  },
  openGraph: {
    title: "Wyckoff Pro - Detect Institutional Accumulation & Distribution",
    description:
      "The most advanced Wyckoff Method indicator for TradingView. Identify smart money moves, accumulation/distribution phases, and volume anomalies in real-time.",
    type: "website",
    locale: "en_US",
    siteName: "Wyckoff Pro",
    images: [
      {
        url: "https://i.ibb.co/jvrWFmKN/Trade-Wyckoff-1.png",
        width: 1200,
        height: 630,
        alt: "Wyckoff Pro - Advanced VSA Trading Indicator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyckoff Pro - Advanced Volume Spread Analysis Indicator",
    description:
      "Detect accumulation & distribution phases. Identify institutional trading patterns with our professional TradingView indicator.",
    images: ["https://i.ibb.co/jvrWFmKN/Trade-Wyckoff-1.png"],
    creator: "@TradingRWyckoff",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "G-7KB11FQVE7",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signUpForceRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      appearance={{
        variables: {
          colorPrimary: "#2962FF",
          colorText: "#131722",
          colorBackground: "#FFFFFF",
          colorInputBackground: "#F8F9FD",
          borderRadius: "12px",
        },
        elements: {
          formButtonPrimary:
            "bg-[#2962FF] hover:bg-[#1E53E5] rounded-full font-semibold",
          card: "shadow-xl rounded-2xl",
          headerTitle: "text-[#131722] font-bold",
          headerSubtitle: "text-[#5D6069]",
          socialButtonsBlockButton:
            "border-[#E0E3EB] hover:bg-[#F8F9FD] rounded-xl",
          formFieldInput: "rounded-xl border-[#E0E3EB] focus:border-[#2962FF]",
          footerActionLink: "text-[#2962FF] hover:text-[#1E53E5]",
        },
      }}
    >
      <html lang="en">
        <head>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-7KB11FQVE7"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7KB11FQVE7');
            `}
          </Script>
        </head>
        <body className="bg-white overflow-x-hidden">
          <GlobalCursorEffect>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-16">{children}</main>

            {/* Footer */}
            <footer className="bg-[#F8F9FD] pt-16 pb-12">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
              {/* Logo & Slogan */}
              <div className="col-span-2 lg:col-span-1">
                <Image
                  src="https://i.ibb.co/jvrWFmKN/Trade-Wyckoff-1.png"
                  alt="Wyckoff Pro"
                  width={140}
                  height={35}
                  className="h-7 w-auto mb-6"
                  unoptimized
                />
                <p className="text-[#131722] text-base mb-4 font-normal">
                  Analyze the past.
                  <br />
                  Predict the future.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/TradingRWyckoff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#131722] hover:text-[#2962FF] transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-bold text-[#131722] mb-4 text-base">
                  Indicator
                </h4>
                <ul className="space-y-3 text-[15px] text-[#131722]">
                  <li>
                    <Link href="/#features" className="hover:text-[#2962FF]">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/#pricing" className="hover:text-[#2962FF]">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutorials" className="hover:text-[#2962FF]">
                      Tutorials
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#131722] mb-4 text-base">
                  Resources
                </h4>
                <ul className="space-y-3 text-[15px] text-[#131722]">
                  <li>
                    <Link href="/tutorials" className="hover:text-[#2962FF]">
                      VSA Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-[#2962FF]">
                      Wyckoff Blog
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/TradingRWyckoff"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#2962FF]"
                    >
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#131722] mb-4 text-base">
                  Support
                </h4>
                <ul className="space-y-3 text-[15px] text-[#131722]">
                  <li>
                    <Link href="/contact" className="hover:text-[#2962FF]">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-[#2962FF]">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#131722] mb-4 text-base">
                  Legal
                </h4>
                <ul className="space-y-3 text-[15px] text-[#131722]">
                  <li>
                    <Link href="/terms" className="hover:text-[#2962FF]">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-[#2962FF]">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 border-t border-[#E0E3EB] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#5D6069]">
              <p>© 2025 Wyckoff Pro. All rights reserved.</p>
            </div>
          </footer>
          </GlobalCursorEffect>
        </body>
      </html>
    </ClerkProvider>
  );
}
