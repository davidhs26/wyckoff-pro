export function TooltipDemoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#131722]">
            More than just an indicator
          </h2>
          <p className="text-lg text-[#5D6069] max-w-3xl mx-auto">
            The Wyckoff Pro v1.5.1 script doesn&apos;t just paint labels. It runs
            complex supply and demand analysis on every candle to give you
            institutional context.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Tooltip Demo */}
          <div className="md:w-1/2 bg-[#131722] rounded-2xl p-8 shadow-2xl text-left font-mono text-sm relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#2962FF] blur-[80px] opacity-20 rounded-full"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-400 ml-auto text-xs">
                  TYPE 1 SPRING DETECTED
                </span>
              </div>

              <div className="text-white">
                <span className="text-[#2962FF]">                  
                </span>
                <br />
                <span className="text-[#089981]">
                  ✅ SUCCESSFUL SPRING - TRAP EXECUTED
                </span>
                <br />
                Broke support triggering stops.
                <br />
                Immediate recovery with strength.
              </div>

              <div className="text-gray-300">
                <span className="text-white font-bold">📊 METRICS</span>
                <br />• Volume:{" "}
                <span className="text-[#F23645]">ULTRA HIGH (3.45x)</span>
                <br />• Spread:{" "}
                <span className="text-[#F23645]">Wide (2.1x ATR)</span>
                <br />• Close: <span className="text-[#089981]">High</span>
              </div>

              <div className="text-gray-300">
                <span className="text-white font-bold">👔 STRONG HANDS:</span>
                <br />
                MASTERFUL PLAY. Pushed price down to trigger stops and create
                panic. Then bought massively.
              </div>

              <div className="text-gray-300">
                <span className="text-white font-bold">🔍 EVIDENCE:</span>
                <br />
                Volume 3.45x on breakout + recovery = aggressive absorption.
                Perfect trap.
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="md:w-1/2 space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#2962FF] shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131722] mb-2">
                  Smart Narrative Tooltips
                </h3>
                <p className="text-[#5D6069]">
                  Hover over any label. The script will explain <em>why</em>{" "}
                  that event appeared, who&apos;s in control (Strong vs Weak Hands),
                  and the signal quality based on volume.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#089981] shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131722] mb-2">
                  Quality Validation
                </h3>
                <p className="text-[#5D6069]">
                  Not all Springs are equal. The indicator classifies events by
                  success probability using 12 internal metrics, distinguishing
                  between <strong>Absorption Climax</strong> (good) and{" "}
                  <strong>Exhaustion</strong> (weak).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#F23645] shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#131722] mb-2">
                  Anti-Trap Logic
                </h3>
                <p className="text-[#5D6069]">
                  If an Accumulation structure fails and breaks support, the
                  indicator{" "}
                  <strong>detects the trap in real-time</strong> and
                  reclassifies the entire range as Distribution, protecting you
                  from trading on the wrong side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

