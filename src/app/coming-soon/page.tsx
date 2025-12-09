"use client";

import Link from "next/link";
import { useState } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (Mailchimp, Resend, etc.)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white overflow-hidden relative" data-theme="dark">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2962FF]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF6B35]/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link href="/" className="flex items-center gap-2 group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-gray-400 group-hover:text-white transition-colors font-medium">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B35]"></span>
          </span>
          <span className="text-sm text-gray-400">In Development</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-12 pb-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full px-4 py-2 mb-8">
            <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-[#FF6B35]">Coming Q1 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#2962FF] via-[#7C3AED] to-[#FF6B35] bg-clip-text text-transparent">
              Automated Trading
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Your Wyckoff and VSA signals, validated by AI, automatically executed on Interactive Brokers. 
            <span className="text-white font-medium"> Zero manual intervention.</span>
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="relative mb-24">
          <div className="grid md:grid-cols-4 gap-4 lg:gap-6">
            {/* Step 1: TradingView */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-[#1a1f2e] to-[#0f1318] border border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#2962FF]/50 hover:shadow-lg hover:shadow-[#2962FF]/10">
                <div className="w-14 h-14 bg-[#2962FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#2962FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-xs text-[#2962FF] font-semibold uppercase tracking-wider mb-2">Step 1</div>
                <h3 className="text-lg font-bold text-white mb-2">Signal Detection</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  VSA indicator detects a high-quality setup and sends webhook with full context: phase, event type, OHLCV data.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </div>
            </div>

            {/* Step 2: Webhook */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-[#1a1f2e] to-[#0f1318] border border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#7C3AED]/50 hover:shadow-lg hover:shadow-[#7C3AED]/10">
                <div className="w-14 h-14 bg-[#7C3AED]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-xs text-[#7C3AED] font-semibold uppercase tracking-wider mb-2">Step 2</div>
                <h3 className="text-lg font-bold text-white mb-2">Webhook Received</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Cloud Run endpoint captures the signal instantly. All Wyckoff events and VSA patterns included.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </div>
            </div>

            {/* Step 3: AI Validation */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-[#1a1f2e] to-[#0f1318] border border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-lg hover:shadow-[#FF6B35]/10">
                <div className="w-14 h-14 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-xs text-[#FF6B35] font-semibold uppercase tracking-wider mb-2">Step 3</div>
                <h3 className="text-lg font-bold text-white mb-2">AI Validation</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Advanced AI analyzes signal quality, filters low-probability setups, and calculates optimal position sizing.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </div>
            </div>

            {/* Step 4: IBKR */}
            <div className="relative group">
              <div className="bg-gradient-to-b from-[#1a1f2e] to-[#0f1318] border border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#089981]/50 hover:shadow-lg hover:shadow-[#089981]/10">
                <div className="w-14 h-14 bg-[#089981]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs text-[#089981] font-semibold uppercase tracking-wider mb-2">Step 4</div>
                <h3 className="text-lg font-bold text-white mb-2">Auto Execution</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Validated signals are automatically placed on Interactive Brokers with proper SL/TP levels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="bg-[#1a1f2e]/50 border border-gray-800/50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#2962FF]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#2962FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2">Risk Management</h4>
            <p className="text-sm text-gray-400">AI calculates optimal position size based on account equity, volatility, and signal confidence.</p>
          </div>

          <div className="bg-[#1a1f2e]/50 border border-gray-800/50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2">Visual Confirmation</h4>
            <p className="text-sm text-gray-400">AI accesses your chart via shared URL for visual pattern confirmation before execution.</p>
          </div>

          <div className="bg-[#1a1f2e]/50 border border-gray-800/50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2">Full Audit Trail</h4>
            <p className="text-sm text-gray-400">Complete logging of every signal, AI decision, and order execution for transparency.</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Be the First to Know</h2>
          <p className="text-gray-400 mb-8">
            Get early access and exclusive updates when we launch. No spam, just major milestones.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-[#1a1f2e] border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#2962FF] focus:ring-1 focus:ring-[#2962FF] transition-all"
              />
              <button
                type="submit"
                className="bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="bg-[#089981]/10 border border-[#089981]/30 rounded-xl p-6 flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#089981] font-medium">You&apos;re on the list! We&apos;ll notify you at launch.</span>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to receive product updates. Unsubscribe anytime.
          </p>
        </div>
      </main>

    </div>
  );
}

