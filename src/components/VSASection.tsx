import React from "react";

export function VSASection() {
  return (
    <section id="vsa" className="py-24 bg-white relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Left Column: Content */}
          <div className="lg:w-1/2">
            {/* Header */}
            <div className="mb-20">
              <div className="inline-block mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm text-[#2962FF] text-sm font-semibold tracking-wide uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2962FF]"></span>
                  </span>
                  New Indicator
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#131722] leading-tight">
                VSA Tom Williams <br />
                <span className="text-[#2962FF]">Contextualized</span>
              </h2>
              <p className="text-lg text-[#5D6069] leading-relaxed">
                Volume Spread Analysis (VSA) is powerful, but dangerous without context. 
                Our implementation follows the strict principles of Tom Williams, filtered 
                by the Wyckoff Structure phase.
              </p>
            </div>

            {/* Features List (Stacking Cards Effect) */}
            <div className="relative pb-24">
              {/* Feature 1 */}
              <div className="sticky top-32 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-12 z-10">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#131722] mb-2">
                      Signs of Weakness (SOW)
                    </h3>
                    <p className="text-[#5D6069] leading-relaxed">
                      Detects distribution patterns like <span className="font-semibold text-red-500">Upthrusts</span>,{" "}
                      <span className="font-semibold text-red-500">Buying Climaxes</span>, and{" "}
                      <span className="font-semibold text-red-500">No Demand</span> exactly when they matter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="sticky top-36 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-12 z-20">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#131722] mb-2">
                      Signs of Strength (SOS)
                    </h3>
                    <p className="text-[#5D6069] leading-relaxed">
                      Identifies accumulation footprint such as <span className="font-semibold text-green-500">Bag Holding</span>,{" "}
                      <span className="font-semibold text-green-500">Shakeouts</span>, and{" "}
                      <span className="font-semibold text-green-500">Test/No Supply</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="sticky top-40 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-0 z-30">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-[#2962FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#131722] mb-2">
                      Smart Tooltips & Alerts
                    </h3>
                    <p className="text-[#5D6069] leading-relaxed">
                      Don't just get a signal; learn <em>why</em>. Hover over any label to read a detailed breakdown of Volume, Spread, and Close Position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Representation (Tooltip) - Sticky */}
          <div className="hidden lg:flex lg:w-1/2 sticky top-32 self-start justify-center items-center perspective-1000" style={{ height: 'calc(100vh - 8rem)' }}>
            {/* Custom Tooltip Recreation */}
            <div className="relative z-10 w-[380px] bg-[#363A45] rounded-lg shadow-2xl overflow-hidden font-sans text-[#B2B5BE] text-sm border border-[#434651] transform rotate-1 transition-all duration-500 hover:rotate-0 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group">
              
              {/* Header */}
              <div className="p-4 border-b border-[#434651] group-hover:bg-[#434651]/30 transition-colors">
                <div className="flex items-center gap-2 text-white font-bold text-base mb-1">
                  <div className="w-3 h-3 rounded-full bg-[#089981] shadow-[0_0_8px_rgba(8,153,129,0.5)] animate-pulse"></div>
                  <span>DEMAND OVERCOMING SUPPLY</span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                
                {/* Confidence */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">📈</span>
                    <span className="font-bold text-white">CONFIDENCE: 97% 🔥 (VERY HIGH)</span>
                  </div>
                  <div className="text-xs pl-7">Priority: 4/10</div>
                </div>

                {/* Description */}
                <div className="text-white">
                  High volume, wide spread, high close. The demand overcomes supply.
                </div>

                {/* VSA Reading */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">📊</span>
                    <span className="font-bold text-white">VSA Reading:</span>
                  </div>
                  <ul className="pl-7 space-y-1">
                    <li>• Vol: <span className="text-white font-medium">HIGH (2.06x)</span></li>
                    <li>• Spread: <span className="text-white font-medium">WIDE (1.46x ATR)</span></li>
                    <li>• Close: <span className="text-white font-medium">VERY HIGH (93%)</span></li>
                  </ul>
                </div>

                {/* Context */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🏗️</span>
                    <span className="font-bold text-white">CONTEXT:</span>
                  </div>
                  <ul className="pl-7 space-y-1">
                    <li className="flex items-center gap-1">
                      <span>• Position:</span>
                      <span className="text-[#F23645]">▼</span>
                      <span className="text-white font-medium">NEW HISTORICAL LOW</span>
                    </li>
                    <li>• Background: <span className="text-white font-medium">— No clear trend</span></li>
                  </ul>
                </div>

                {/* Action */}
                <div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">💡</span>
                    <span className="font-bold text-white">Action: Genuine strength. Expect higher prices.</span>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Decorative elements behind - subtle glow only */}
            <div className="absolute -z-10 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
