import Image from "next/image";

export function WyckoffBioSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        {/* Photo */}
        <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-8 overflow-hidden border-4 border-white shadow-lg relative">
          <Image
            src="https://i.ibb.co/0yn06HDx/Wyckoff-Quotes-1-768x432.png"
            alt="Richard D. Wyckoff"
            fill
            className="object-cover object-[center_15%]"
            unoptimized
          />
        </div>

        <h2 className="text-4xl font-bold mb-6 text-[#131722]">
          Who was Richard D. Wyckoff?
        </h2>
        <p className="text-xl text-[#5D6069] mb-8 leading-relaxed">
          Richard Demille Wyckoff (1873–1934) was a pioneer of the stock market
          in the early 20th century. He began as a stock runner at age 15 and
          eventually founded and edited &quot;The Magazine of Wall Street&quot;.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
          <div className="bg-[#F8F9FD] p-8 rounded-2xl">
            <h3 className="font-bold text-lg mb-3 text-[#131722]">His Mission</h3>
            <p className="text-[#5D6069]">
              Wyckoff dedicated his life to teaching the public the &quot;real rules
              of the game&quot;. He observed that large operators (Smart Money)
              followed predictable patterns of accumulation and distribution
              before major moves.
            </p>
          </div>
          <div className="bg-[#F8F9FD] p-8 rounded-2xl">
            <h3 className="font-bold text-lg mb-3 text-[#131722]">His Legacy</h3>
            <p className="text-[#5D6069]">
              He developed a technical analysis method based on market logic,
              not magical mathematical formulas. His focus on Price, Volume, and
              Time remains the foundation of modern VSA analysis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

