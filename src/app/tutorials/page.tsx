export default function TutorialsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-[#131722] mb-8">Tutorials and Guides</h1>
      <div className="prose prose-lg text-[#5D6069] space-y-6">
        <p className="text-xl">
          We are preparing a complete library of resources to help you master the Wyckoff method and VSA.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl border border-[#E0E3EB] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-[#2962FF] rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-[#131722] mb-2">Installation Guide</h3>
            <p className="text-sm">Learn how to set up the indicators on your TradingView chart step by step.</p>
            <span className="inline-block mt-4 text-sm font-bold text-[#2962FF]">Coming Soon</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0E3EB] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-[#089981] rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-[#131722] mb-2">Trading Strategies</h3>
            <p className="text-sm">How to trade Springs, UTADs, and Tests with high probability.</p>
            <span className="inline-block mt-4 text-sm font-bold text-[#2962FF]">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

