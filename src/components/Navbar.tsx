"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Function to check dark sections
    const checkDarkSections = () => {
      const navbarHeight = 64;
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let isInDarkSection = false;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
          isInDarkSection = true;
        }
      });

      setIsDark(isInDarkSection);
    };

    // Small delay to ensure DOM is ready after navigation
    const timeoutId = setTimeout(() => {
      checkDarkSections();
    }, 50);

    // Sections with dark backgrounds
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if any dark section is intersecting with the navbar area
        const navbarHeight = 64; // 16 * 4 = 64px (h-16)
        
        let isInDarkSection = false;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            // Check if the section is at the top of the viewport (under the navbar)
            if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
              isInDarkSection = true;
            }
          }
        });

        // Also check manually for all dark sections
        darkSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
            isInDarkSection = true;
          }
        });

        setIsDark(isInDarkSection);
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: "-64px 0px 0px 0px",
      }
    );

    darkSections.forEach((section) => observer.observe(section));

    // Also listen to scroll for more responsive updates
    const handleScroll = () => {
      checkDarkSections();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkDarkSections(); // Check initial state

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]); // Re-run when pathname changes

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 lg:px-6 transition-all duration-300 ${
        isDark
          ? "bg-[#131722]/95 backdrop-blur-sm"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mr-8">
          <Image
            src="https://i.ibb.co/HZQ4rPn/Trade-Wyckoff-2.png"
            alt="Wyckoff Pro"
            width={160}
            height={40}
            className={`h-8 w-auto ${isDark ? 'brightness-0 invert' : ''}`}
            unoptimized
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 h-full ml-8">
          <Link
            href="/#indicator"
            className={`text-[15px] font-semibold tracking-tight transition-colors group relative ${
              isDark ? "text-white hover:text-white" : "text-[#131722] hover:text-[#131722]"
            }`}
          >
            Indicator
            <div className="absolute top-full left-0 w-full h-0.5 bg-[#2962FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          <Link
            href="/#philosophy"
            className={`text-[15px] font-semibold tracking-tight transition-colors group relative ${
              isDark ? "text-white hover:text-white" : "text-[#131722] hover:text-[#131722]"
            }`}
          >
            Wyckoff Philosophy
            <div className="absolute top-full left-0 w-full h-0.5 bg-[#2962FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          <Link
            href="/#vsa"
            className={`text-[15px] font-semibold tracking-tight transition-colors group relative ${
              isDark ? "text-white hover:text-white" : "text-[#131722] hover:text-[#131722]"
            }`}
          >
            VSA
            <div className="absolute top-full left-0 w-full h-0.5 bg-[#2962FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          <Link
            href="/#pricing"
            className={`text-[15px] font-semibold tracking-tight transition-colors group relative ${
              isDark ? "text-white hover:text-white" : "text-[#131722] hover:text-[#131722]"
            }`}
          >
            Pricing
            <div className="absolute top-full left-0 w-full h-0.5 bg-[#2962FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          <Link
            href="/coming-soon"
            target="_blank"
            className="relative flex items-center gap-1.5 text-[15px] font-semibold tracking-tight transition-all group"
          >
            <span className="relative">
              <span className={`${isDark ? "text-[#FF6B35]" : "text-[#FF6B35]"} group-hover:text-[#FF8C5A]`}>
                Coming Soon!
              </span>
              <span className="absolute -top-1 -right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]"></span>
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Auth Actions */}
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <button
              className={`text-[15px] font-medium px-4 py-2 transition-colors hidden sm:block ${
                isDark ? "text-white hover:text-[#2962FF]" : "text-[#131722] hover:text-[#2962FF]"
              }`}
            >
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-[#2962FF] hover:bg-[#1E53E5] text-white text-[15px] font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm">
              Start Free
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Link
            href="/dashboard"
            className={`text-[15px] font-medium px-4 py-2 transition-colors hidden sm:block ${
              isDark ? "text-white hover:text-[#2962FF]" : "text-[#131722] hover:text-[#2962FF]"
            }`}
          >
            Dashboard
          </Link>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
                userButtonPopoverCard: "shadow-xl rounded-xl",
                userButtonPopoverActionButton: "hover:bg-[#F8F9FD]",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}
