import Image from "next/image";

export function TradingViewSection() {
  return (
    <section className="py-24 bg-[#131722] text-white">
      <div className="max-w-[1400px] mx-auto px-6 relative z-20">
        <div className="text-center mb-20">
          <p className="text-[#2962FF] font-semibold text-sm uppercase tracking-wider mb-4">
            Powered by TradingView
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The world&apos;s most powerful platform.
            <br />
            At your service.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Wyckoff Pro is not just an indicator. It&apos;s the key to unlock the
            entire TradingView ecosystem: ultra-precise alerts, global analysis,
            and instant execution.
          </p>
        </div>

        {/* Feature 1: Alerts */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2962FF]/20 text-[#2962FF] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Ultra-Precise Alerts
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Never miss a Spring.
              <br />
              Ever.
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our alerts run on TradingView&apos;s powerful servers. Fast, reliable,
              and available 24/7 even when your PC is off.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Pine Script Alerts",
                  desc: "Create alerts directly from Wyckoff Pro: Springs, UTADs, Volume Climax and more.",
                },
                {
                  title: "On any device",
                  desc: "Receive alerts via browser, email, mobile app, or webhooks for automation.",
                },
                {
                  title: "Watchlist alerts",
                  desc: "Monitor hundreds of symbols simultaneously with a single powerful alert.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1E222D] border border-gray-700 flex items-center justify-center text-[#089981] shrink-0">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#131722] via-transparent to-[#131722] z-10 pointer-events-none"></div>
            <div className="bg-[#131722] rounded-2xl border border-gray-800 relative overflow-hidden h-[380px] select-none shadow-2xl shadow-black/50">
              {/* Chart Line */}
              <svg
                className="absolute inset-0 w-full h-full text-[#089981] opacity-80"
                preserveAspectRatio="none"
                viewBox="0 0 400 200"
              >
                <path
                  d="M0 150 L50 160 L100 140 L150 155 L200 130 L250 145 L300 110 L350 40 L400 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <defs>
                  <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#089981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#089981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 150 L50 160 L100 140 L150 155 L200 130 L250 145 L300 110 L350 40 L400 100 V 200 H 0 Z"
                  fill="url(#fade)"
                  stroke="none"
                />
              </svg>

              {/* Alert Bubble */}
              <div className="absolute top-[15%] left-[6%] bg-[#1E222D] border border-gray-700 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 z-20 animate-scale-up">
                <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[#131722] text-[10px] font-bold">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <span className="text-xs font-medium">
                  Alert: AAPL Crossing 180.30
                </span>
              </div>

              {/* Alert List */}
              <div className="absolute bottom-[10%] left-[6%] z-30 flex flex-col gap-3 w-[240px]">
                <div className="bg-[#1E222D] border border-gray-700 rounded-lg p-3 shadow-lg transform transition-transform hover:scale-105">
                  <div className="text-white font-bold text-[13px] mb-1">
                    AAPL Crossing 180.30
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>AAPL, 1m</span>
                    <span className="text-[#089981]">● Active</span>
                    <span>Jun 4, 12:10</span>
                  </div>
                </div>
                <div className="bg-[#1E222D] border border-gray-700 rounded-lg p-3 shadow-lg opacity-80">
                  <div className="text-white font-bold text-[13px] mb-1">
                    TSLA Anchored VWAP
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <div className="w-4 h-4 bg-[#CC0000] rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                      T
                    </div>
                    <span>TSLA</span>
                    <span className="text-[#089981]">● Active</span>
                  </div>
                </div>
              </div>

              {/* Context Menu - Moved slightly up and styled better */}
              <div className="absolute bottom-[12%] right-[6%] bg-[#1E222D]/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl w-[180px] z-40 overflow-hidden animate-slide-up">
                <div className="p-1 space-y-0.5">
                  {[
                    "Restart as per filter",
                    "Stop as per filter",
                    "Remove all inactive",
                    "Remove as per filter",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[#2A2E39] cursor-pointer rounded text-gray-200 text-[12px] transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 p-2">
                  <div className="text-[10px] text-gray-500 font-bold px-2 mb-1.5 tracking-wider">
                    SHOW ALERTS
                  </div>
                  {[
                    { label: "All", active: true },
                    { label: "Active only", active: false },
                    { label: "Inactive only", active: false }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#2A2E39] rounded group"
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${item.active ? 'border-[#2962FF]' : 'border-gray-600'}`}>
                          {item.active && <div className="w-1.5 h-1.5 bg-[#2962FF] rounded-full"></div>}
                      </div>
                      <span className={`text-[12px] ${item.active ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Pine Screener */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 md:order-1">
            <div className="relative h-[380px] bg-[#1E222D] rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 overflow-hidden select-none font-sans text-sm">
              {/* Screener Header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-gray-800 bg-[#1E222D]">
                <div className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                  Pine Screener
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-[13px] text-gray-300 bg-[#131722] hover:bg-[#2A2E39] px-3 py-1.5 rounded border border-gray-700 cursor-pointer transition-colors">
                      <span className="italic font-serif text-blue-400">fx</span>
                      <span>Choose indicator</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 opacity-70">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-white bg-[#2962FF] hover:bg-[#1E53E5] px-4 py-1.5 rounded cursor-pointer transition-colors shadow-lg shadow-blue-500/20">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                         <circle cx="12" cy="12" r="10"/>
                         <path d="M12 6v6l4 2"/>
                      </svg>
                      Scan
                    </div>
                </div>
              </div>

              {/* Screener Body */}
              <div className="flex h-[calc(100%-56px)]">
                {/* Left Side: Tickers */}
                <div className="w-[40%] border-r border-gray-800 bg-[#1E222D] flex flex-col">
                    {/* Column Headers */}
                    <div className="flex items-center px-4 py-2 border-b border-gray-800 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        <span className="flex-1">Ticker</span>
                        <span>Change</span>
                    </div>
                    {/* List */}
                    <div className="flex-1 overflow-hidden pt-1">
                      {[
                        { symbol: "RACE", name: "Ferrari NV", logo: "https://logo.clearbit.com/ferrari.com", change: "+2.4%" },
                        { symbol: "MSFT", name: "Microsoft Corp", logo: "https://logo.clearbit.com/microsoft.com", change: "+1.2%" },
                        { symbol: "AAPL", name: "Apple Inc", logo: "https://logo.clearbit.com/apple.com", change: "-0.5%" },
                        { symbol: "TSLA", name: "Tesla Inc", logo: "https://logo.clearbit.com/tesla.com", change: "+4.1%" },
                        { symbol: "NVDA", name: "Nvidia Corp", logo: "https://logo.clearbit.com/nvidia.com", change: "+3.8%" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-[#2A2E39] cursor-pointer group transition-colors border-b border-gray-800/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 shadow-sm flex-shrink-0 border border-gray-200/10">
                              <Image 
                                src={item.logo} 
                                alt={item.name}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <div className="font-bold text-[13px] text-white leading-tight mb-0.5">{item.symbol}</div>
                              <div className="text-[10px] text-gray-500 group-hover:text-gray-400 font-medium uppercase tracking-wide">{item.name}</div>
                            </div>
                          </div>
                          <div className={`text-[12px] font-bold ${item.change.startsWith('+') ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                              {item.change}
                          </div>
                        </div>
                      ))}
                    </div>
                </div>

                {/* Right Side: Filters/Results */}
                <div className="w-[60%] relative bg-[#131722] p-4">
                   {/* Background Grid */}
                   <div className="absolute inset-0 opacity-20 pointer-events-none" 
                        style={{ backgroundImage: 'linear-gradient(#2A2E39 1px, transparent 1px), linear-gradient(90deg, #2A2E39 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                   </div>

                  {/* Floating Indicator Menu */}
                  <div className="absolute top-4 left-4 right-4 bg-[#1E222D] border border-gray-700 rounded-lg shadow-2xl z-20 animate-fade-in-up">
                    <div className="px-3 py-2 border-b border-gray-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Active Filters</span>
                        <span className="text-[11px] text-blue-400 cursor-pointer hover:text-blue-300">Reset all</span>
                    </div>
                    
                    <div className="p-1 space-y-0.5 max-h-[180px] overflow-y-auto custom-scrollbar">
                       {/* Selected Indicator */}
                      <div className="flex items-center justify-between px-3 py-2 bg-[#2A2E39] rounded text-[13px] text-white border-l-2 border-[#2962FF]">
                        <span>Wyckoff Pro Screener</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-[#2962FF] px-1.5 py-0.5 rounded text-white">NEW</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 cursor-pointer hover:text-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between px-3 py-2 hover:bg-[#2A2E39]/50 rounded text-[13px] text-gray-300 cursor-pointer">
                        <span>Relative Strength Index (14)</span>
                         <span className="text-gray-500 text-[11px]">&lt; 30</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 hover:bg-[#2A2E39]/50 rounded text-[13px] text-gray-300 cursor-pointer">
                        <span>Volume 24h</span>
                        <span className="text-gray-500 text-[11px]">&gt; 50K</span>
                      </div>
                    </div>
                  </div>

                  {/* Toast Notification */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1E222D] border border-[#089981]/50 rounded-lg p-3 shadow-xl flex items-center gap-3 animate-slide-up backdrop-blur-sm">
                    <div className="w-8 h-8 bg-[#089981]/10 rounded-full flex items-center justify-center text-[#089981] shrink-0 border border-[#089981]/20">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-white flex items-center gap-2">
                          Scan completed
                          <span className="text-[10px] font-normal text-gray-500 bg-[#2A2E39] px-1.5 rounded">0.4s</span>
                      </div>
                      <div className="text-[11px] text-gray-400 truncate">Found 14 matches in NASDAQ, NYSE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-[#089981]/20 text-[#089981] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Pine Screener
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Scan the market.
              <br />
              Find Wyckoff opportunities.
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Use the Pine Script screener to find assets that match Wyckoff
              patterns. Scan your watchlist or entire markets in seconds.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "+70", label: "Stock exchanges" },
                { value: "+70", label: "Crypto exchanges" },
                { value: "400+", label: "Filter fields" },
                { value: "1m-1M", label: "Timeframes" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#1E222D] p-4 rounded-xl border border-gray-800"
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 3: Brokers */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF9800]/20 text-[#FF9800] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
              Direct Execution
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              From analysis to execution.
              <br />
              Without leaving the chart.
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Connect with 100+ trusted brokers and trade directly from
              TradingView. Secure, fast, and reliable connection.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "⚡",
                  color: "blue",
                  title: "Direct server connection",
                  desc: "No delays or additional intermediaries",
                },
                {
                  icon: "📱",
                  color: "purple",
                  title: "Trade from any device",
                  desc: "Browser, desktop, tablet, or mobile",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-[#1E222D] rounded-xl border border-gray-800"
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-${item.color}-500/20 flex items-center justify-center text-lg`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-2xl shadow-black/50 w-full"
            >
              <source
                src="https://static.tradingview.com/static/bundles/made-to-trade.hvc1.aee8f640b23996488102.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
