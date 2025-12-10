"use client";

import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const testimonials = [
  {
    stars: 5,
    quote:
      '"I used to see charts and see chaos. Now with the Wyckoff indicator I see clear structures. The automatic Phase C labeling is simply magic."',
    name: "Carlos M.",
    role: "Futures Trader",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    stars: 5,
    quote:
      '"The VSA alerts have saved me from countless losing trades. Detecting lack of demand at highs is brutally effective."',
    name: "Ana P.",
    role: "Crypto Analyst",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    stars: 5,
    quote:
      '"I\'ve been doing this for 5 years and this script is the only thing I keep clean on my chart. Accumulation structures are visible from miles away."',
    name: "David R.",
    role: "Stock Trader",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#131722] text-white py-32">
      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Loved by <br />
          <span className="text-[#2962FF]">Institutional Traders</span>
        </h2>
        <p className="text-xl text-[#B2B5BE] mb-16 max-w-2xl mx-auto">
          Join the traders who have stopped guessing and started reading the
          market professionally.
        </p>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 text-left relative z-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1E222D] p-6 rounded-2xl border border-[#2A2E39] hover:border-[#2962FF] transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-[#FFD700]">
                {Array(testimonial.stars)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>

              {/* Quote */}
              <p className="text-[#E0E3EB] mb-4 leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-xs text-[#B2B5BE]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-8">
          Ready to master the Market Cycle?
        </h3>

        <SignedOut>
          <SignUpButton mode="modal">
            <button className="bg-white text-[#131722] text-lg px-12 py-5 rounded-full font-bold hover:bg-[#F0F3FA] transition-all transform hover:scale-105 shadow-2xl shadow-white/10">
              Get Wyckoff Indicator →
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-[#131722] text-lg px-12 py-5 rounded-full font-bold hover:bg-[#F0F3FA] transition-all transform hover:scale-105 shadow-2xl shadow-white/10"
          >
            Go to Dashboard →
          </Link>
        </SignedIn>
      </div>
    </section>
  );
}
