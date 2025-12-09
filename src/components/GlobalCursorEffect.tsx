"use client";

import { useRef, useEffect, useState } from "react";

interface GlobalCursorEffectProps {
  children: React.ReactNode;
}

export function GlobalCursorEffect({ children }: GlobalCursorEffectProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;
    
    // Target position (mouse pointer)
    let targetX = -100;
    let targetY = -100;
    
    // Current position (ball)
    let currentX = -100;
    let currentY = -100;

    const updatePosition = () => {
      // Linear interpolation (Lerp) for smooth following delay
      // Factor 0.3 makes it faster/tighter as requested
      const ease = 0.3;
      
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (cursor) {
        // Rounding to 2 decimal places avoids subpixel jitter issues in some browsers
        const x = Math.round(currentX * 100) / 100;
        const y = Math.round(currentY * 100) / 100;
        
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      
      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
      
      // Check if cursor is over a dark-themed element
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor) {
        const darkElement = elementUnderCursor.closest('[data-theme="dark"]');
        setIsDarkTheme(!!darkElement);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    
    // Start animation loop
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Custom Cursor - adapts to dark/light theme */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-colors duration-200 ${
          isDarkTheme ? 'bg-white' : 'bg-black'
        }`}
        style={{
          // Initial position off-screen
          transform: 'translate3d(-100px, -100px, 0)',
          // Center the ball on the cursor tip (12px size -> -6px offset)
          marginLeft: '-6px',
          marginTop: '-6px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, background-color 0.2s ease',
        }}
      />
      {children}
    </div>
  );
}
