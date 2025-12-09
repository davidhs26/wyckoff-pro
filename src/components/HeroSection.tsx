"use client";

import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="indicator"
      className="px-4 lg:px-6 pt-16 pb-24 md:pt-24 md:pb-32 max-w-[1400px] mx-auto text-center relative overflow-hidden"
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none z-0" />
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none z-0 opacity-60" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="inline-block mb-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm text-[#2962FF] text-sm font-semibold tracking-wide uppercase">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2962FF]"></span>
            </span>
            Now in Beta
          </span>
        </div>

        <h1 className="text-5xl md:text-[80px] font-bold tracking-[-0.03em] leading-[1.1] mb-6 text-[#131722] animate-fade-in-up">
          Wyckoff&apos;s Legacy
          <br />
          <span className="text-[#2962FF]">Automated</span>
        </h1>
        <p className="text-xl md:text-[22px] text-[#5D6069] max-w-[800px] mx-auto mb-10 font-normal leading-relaxed animate-fade-in-up delay-100">
          Detect accumulations, distributions, and institutional money footprints
          with the most advanced Volume Spread Analysis (VSA) indicator.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 animate-fade-in-up delay-200 relative z-10">
          <SignedOut>
            <SignUpButton mode="modal" forceRedirectUrl="/subscribe">
              <button className="bg-[#131722] text-white text-[17px] px-8 py-[14px] rounded-full font-semibold hover:bg-[#2A2E39] transition-colors shadow-lg shadow-black/10">
                Start Free Trial
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-[#089981] text-white text-[17px] px-8 py-[14px] rounded-full font-semibold hover:bg-[#07806a] transition-colors shadow-lg shadow-green-500/20"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          <button className="bg-white text-[#131722] border border-[#E0E3EB] text-[17px] px-8 py-[14px] rounded-full font-semibold hover:bg-[#F0F3FA] hover:border-[#B2B5BE] transition-all">
            Watch Tutorial
          </button>
        </div>

        {/* Hero Chart Image */}
        <div className="mt-16 mx-auto max-w-[1100px] animate-fade-in-up delay-300 relative">
          {/* Outer glow effect - animated */}
          <div className="absolute -inset-3 rounded-[24px] opacity-60 blur-xl rotating-glow"></div>
          
          {/* Container with rotating gradient border */}
          <div className="relative p-[4px] rounded-[16px] rotating-border shadow-[0_0_40px_rgba(41,98,255,0.3),0_0_80px_rgba(123,104,238,0.2)]">
            {/* Image container */}
            <div className="relative rounded-[14px] overflow-hidden bg-[#131722]">
              <Image
                src="https://i.ibb.co/PZ31rt0k/GTLB-2025-12-08-12-50-29.png"
                alt="Wyckoff Pro Indicator - Trading Range Analysis"
                width={1100}
                height={619}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
