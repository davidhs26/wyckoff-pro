const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Contextual VSA",
    description:
      'Not just measuring volume. Distinguishes between Absorption (institutional) and Exhaustion (lack of interest) by comparing each event to the average.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Spring Classification",
    description:
      "Automatically classifies Springs and UTADs into Type 1 (Terminal/Dangerous), Type 2 (Moderate), or Type 3 (Exhaustion/Direct Entry).",
  },
  {
    icon: (
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
    ),
    title: "Trap Detection",
    description:
      "Detects structural failures in real-time. If an Accumulation fails, the indicator automatically reclassifies the structure as Distribution (Bull Trap).",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
    title: "Dynamic Phases A-E",
    description:
      "Visualize the range evolution from Stopping (Phase A) to Trend (Phase E), adapting if price extends the cause.",
  },
  {
    icon: (
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
    ),
    title: "Narrative Tooltips",
    description:
      "Each label tells a story. Hover to see who has control (Strong Hands vs Weak Hands) and detailed technical evidence.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Target Projection",
    description:
      'Automatically calculates profit targets (Base, Minimum, Maximum) by projecting the "Cause" accumulated within the range.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 lg:px-6 py-24 max-w-[1200px] mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#131722] tracking-tight">
          Institutional Analysis Simplified
        </h2>
        <p className="text-xl text-[#5D6069] max-w-2xl leading-relaxed">
          Don&apos;t trade blind. Understand market structure, Smart Money
          intentions, and anticipate moves.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {features.map((feature, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="w-12 h-12 bg-[#F0F3FA] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2962FF] group-hover:text-white transition-all duration-300 text-[#131722]">
              {feature.icon}
            </div>
            <h3 className="text-[22px] font-bold mb-3 text-[#131722]">
              {feature.title}
            </h3>
            <p className="text-[#5D6069] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
