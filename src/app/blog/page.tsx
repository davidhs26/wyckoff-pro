export default function BlogPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-[#131722] mb-8">Wyckoff Pro Blog</h1>
      <div className="text-center py-12">
        <div className="inline-block p-6 bg-[#F8F9FD] rounded-full mb-6">
          <svg className="w-16 h-16 text-[#2962FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#131722] mb-4">Content Under Development</h2>
        <p className="text-[#5D6069] max-w-md mx-auto mb-8">
          We are writing in-depth articles on market analysis, trading psychology, and VSA case studies.
        </p>
        <a 
          href="/"
          className="inline-block bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold py-3 px-8 rounded-xl transition-all"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

