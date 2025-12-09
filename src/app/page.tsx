import {
  HeroSection,
  FeaturesSection,
  PricingSection,
  TooltipDemoSection,
  WyckoffBioSection,
  TradingViewSection,
  TestimonialsSection,
  VSASection,
} from "@/components";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />


      {/* Gradient Separator */}
      <div className="h-24 bg-gradient-to-b from-white via-[#F8F9FD] to-white relative z-20"></div>
      
      <TooltipDemoSection />
      
      {/* Comparison Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#131722]">
              The Unfair Advantage
            </h2>
            <p className="text-lg text-[#5D6069]">
              Why keep losing money with lagging indicators when you can read
              institutional intent?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Way */}
            <div className="p-8 rounded-3xl border border-red-100 bg-red-50/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-900">
                  Conventional Trading
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "RSI and MACD with delay (lagging indicators)",
                  "Trapped in liquidity traps",
                  "Emotional entries and FOMO",
                  "No market structure context",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#5D6069]">
                    <svg
                      className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wyckoff Way */}
            <div className="p-8 rounded-3xl border border-[#2962FF] bg-[#E8EFFD] shadow-xl shadow-blue-900/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#2962FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#2962FF] flex items-center justify-center text-white">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#131722]">
                  Wyckoff Method
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Real-time institutional footprint reading",
                  "Precise entries on Tests and Type 3 Springs",
                  "Automatic Bull/Bear Trap detection",
                  "Structure-based target (TP) calculation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#131722]"
                  >
                    <svg
                      className="w-5 h-5 text-[#2962FF] mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" strokeWidth="2" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Transition: White to Light Gray */}
      <div className="h-24 bg-gradient-to-b from-white to-[#F8F9FD] relative z-20"></div>

      {/* Wyckoff Philosophy Section */}
      <section
        id="philosophy"
        className="bg-[#F8F9FD] py-24"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-[42px] font-bold mb-6 text-[#131722] leading-tight tracking-tight">
              The 3 Fundamental Laws
            </h2>
            <p className="text-lg text-[#5D6069] mb-8 leading-relaxed">
              The Wyckoff methodology is not just an indicator, it&apos;s a complete
              market logic based on immutable principles that have worked for
              over 100 years.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#E8EFFD] flex items-center justify-center group-hover:bg-[#2962FF] transition-colors shrink-0">
                  <span className="font-bold text-[#2962FF] group-hover:text-white text-sm">
                    1
                  </span>
                </div>
                <div>
                  <span className="block text-[#131722] font-bold text-lg mb-1">
                    Law of Supply and Demand
                  </span>
                  <span className="text-[#5D6069]">
                    When demand exceeds supply, prices rise. When supply exceeds
                    demand, prices fall. Volume is the key.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#E8EFFD] flex items-center justify-center group-hover:bg-[#2962FF] transition-colors shrink-0">
                  <span className="font-bold text-[#2962FF] group-hover:text-white text-sm">
                    2
                  </span>
                </div>
                <div>
                  <span className="block text-[#131722] font-bold text-lg mb-1">
                    Law of Cause and Effect
                  </span>
                  <span className="text-[#5D6069]">
                    For a significant effect (trend change), there must be a
                    cause (accumulation or distribution). Greater cause = greater
                    effect.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#E8EFFD] flex items-center justify-center group-hover:bg-[#2962FF] transition-colors shrink-0">
                  <span className="font-bold text-[#2962FF] group-hover:text-white text-sm">
                    3
                  </span>
                </div>
                <div>
                  <span className="block text-[#131722] font-bold text-lg mb-1">
                    Law of Effort vs Result
                  </span>
                  <span className="text-[#5D6069]">
                    If there is a lot of effort (volume) but little result
                    (price movement), it&apos;s a sign of divergence and possible
                    change.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 bg-white rounded-[24px] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] p-10 flex items-center justify-center border border-[#E0E3EB] relative overflow-hidden">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#131722"
                  strokeWidth="1.5"
                >
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#131722] mb-4">
                The Composite Man
              </h3>
              <p className="text-[#5D6069] italic mb-6">
                &quot;...all market fluctuations should be studied as if they
                were the result of one man&apos;s operations. Let us call him the
                Composite Man, who, in theory, sits behind the scenes and
                manipulates the stocks...&quot;
              </p>
              <div className="text-sm font-bold text-[#2962FF]">
                - Richard D. Wyckoff
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Transition: #F8F9FD to White */}
      <div className="h-24 bg-gradient-to-b from-[#F8F9FD] to-white relative z-20"></div>

      <WyckoffBioSection />
      
      <VSASection />

      <div className="bg-[#131722]" data-theme="dark">
        <TradingViewSection />
        <TestimonialsSection />
        <PricingSection />
      </div>
      
      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#F8F9FD]">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#131722]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Does it work on all markets and timeframes?",
                a: "Yes, the Wyckoff methodology is universal. It works on Cryptocurrencies (BTC, ETH, altcoins), Forex pairs, Stocks (NYSE, NASDAQ), Futures (ES, NQ, CL), and Commodities. The only requirement is sufficient volume for reliable analysis. For timeframes, it adapts from 1-minute scalping to weekly swing trading—though 15M, 1H, and 4H typically offer the best signal-to-noise ratio for institutional footprint detection.",
              },
              {
                q: "Do I need a TradingView Pro account?",
                a: "Not at all—our indicator works flawlessly on free TradingView accounts. However, a Pro or Premium subscription unlocks benefits: unlimited server-side alerts (vs 1 on free), more concurrent indicators, and no ads. If you plan to trade multiple assets with automated alerts for Springs, UTADs, or Phase transitions, Pro is recommended.",
              },
              {
                q: "Does the indicator repaint? Can I trust historical signals?",
                a: "We take repainting very seriously. All confirmed events (SC, AR, Spring, UTAD, SOS, SOW) are locked at candle close and never change. Trading Range boundaries adjust dynamically during live price action to maintain accurate support/resistance levels, but once Phase C confirmation occurs (Spring or UTAD), the structure becomes permanent. Historical signals shown on the chart are exactly what you would have seen in real-time.",
              },
              {
                q: "I am a beginner with no Wyckoff experience. Is this for me?",
                a: "Absolutely—and you're in the best position to learn correctly from the start. The indicator acts as a real-time tutor: when you see 'Spring' appear, you're witnessing institutional absorption in action. Each label (SC, AR, ST, Spring, SOS) comes with educational tooltips explaining what's happening and why. Most users report understanding Wyckoff phases within their first week of active use. We also include video tutorials covering each event type.",
              },
              {
                q: "What is the difference between Wyckoff and VSA?",
                a: "Think of Wyckoff as the GPS (showing the overall route: accumulation, markup, distribution, markdown) and VSA as the dashboard gauges (showing real-time engine status: effort vs. result, no demand, stopping volume). Wyckoff identifies WHAT phase the market is in; VSA confirms WHETHER specific candles validate or invalidate that thesis. Our system integrates both: Wyckoff structures the macro view while VSA provides micro-level confirmation for precise entries.",
              },
              {
                q: "How does this compare to other Wyckoff indicators on TradingView?",
                a: "Most alternatives either: (1) only detect basic Springs without Phase context, (2) use oversimplified rules that generate false signals, or (3) require manual drawing of trading ranges. Wyckoff Pro automatically detects complete accumulation/distribution schematics with all five phases (A→E), validates events using VSA confluence, and provides dynamic TP targets based on cause-and-effect projections. It's the only indicator that thinks like an institutional analyst.",
              },
              {
                q: "Can I use this with my current trading strategy?",
                a: "Yes—Wyckoff Pro enhances any strategy by adding institutional context. Trend followers can wait for Phase E breakouts with confirmation. Mean-reversion traders can focus on Phase C reversals (Springs/UTADs). Scalpers can use VSA signals for micro-entries within confirmed structures. The indicator provides context, not rigid rules, so it adapts to your style rather than forcing you to change.",
              },
              {
                q: "What if I am not satisfied with the indicator?",
                a: "We want you to trade with absolute confidence. If you encounter any issues—whether technical questions, strategy doubts, or feature requests—our support team responds within 24 hours via Discord or email. We're committed to your success and will work with you to ensure the indicator meets your trading needs.",
              },
              {
                q: "Will I receive future updates and new features?",
                a: "Every plan includes automatic updates pushed directly to TradingView—no manual reinstallation needed. We continuously improve detection algorithms, add new VSA patterns, and enhance visualizations based on user feedback. The Lifetime plan guarantees access to all future features permanently, including major version upgrades that may be charged separately for monthly subscribers.",
              },
              {
                q: "How do the alerts work?",
                a: "You can set alerts for any event: Spring detection, UTAD confirmation, Phase transitions, SOS/SOW signals, and more. Alerts trigger via TradingView's system (popup, email, webhook, or mobile push) so you never miss a setup—even when away from your desk. Webhook integration enables automated trading through platforms like 3Commas, Alertatron, or custom bots.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-[#E0E3EB] overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-[#131722] list-none hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <span className="transition-transform group-open:rotate-180">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[#5D6069] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F8F9FD] py-24 relative z-20">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#131722]">
            Ready to Master the Market Cycle?
          </h2>
          <p className="text-xl text-[#5D6069] mb-10">
            Join the traders who stopped guessing and started reading the
            market professionally.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-[#2962FF] hover:bg-[#1E53E5] text-white text-lg px-12 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/25"
          >
            Get Started Now →
          </a>
        </div>
      </section>
    </>
  );
}
