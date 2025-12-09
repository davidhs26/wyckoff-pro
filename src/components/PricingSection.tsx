"use client";

import { SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

// Features for Wyckoff-only plan (3 months)
const wyckoffOnlyFeatures = [
  "Wyckoff Structure Indicator",
  "Spring & UTAD Detection",
  "A-E Phases Visualization",
  "Contextual Tooltips",
  "Automatic Updates",
  "Discord Support",
];

// Full features including VSA (6+ months)
const fullFeatures = [
  "Wyckoff Structure Indicator",
  "VSA Tom Williams Indicator",
  "Spring & UTAD Detection",
  "A-E Phases Visualization",
  "Contextual Tooltips",
  "TradingView Alerts",
  "Automatic Updates",
  "Discord Support",
];

const plans = [
  {
    id: "3-months",
    name: "3 Months",
    description: "Wyckoff Structure indicator only",
    monthlyPrice: 79,
    totalPrice: 237,
    savings: null,
    popular: false,
    includesVSA: false,
    features: wyckoffOnlyFeatures,
  },
  {
    id: "6-months",
    name: "6 Months",
    description: "Full access: Wyckoff + VSA indicators",
    monthlyPrice: 65,
    totalPrice: 390,
    savings: 18,
    popular: true,
    includesVSA: true,
    features: fullFeatures,
  },
  {
    id: "12-months",
    name: "12 Months",
    description: "Maximum savings for committed traders",
    monthlyPrice: 49,
    totalPrice: 588,
    savings: 38,
    popular: false,
    includesVSA: true,
    features: fullFeatures,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    description: "Permanent access with no recurring payments",
    monthlyPrice: null,
    totalPrice: 997,
    savings: null,
    popular: false,
    isLifetime: true,
    includesVSA: true,
    features: [
      ...fullFeatures,
      "No recurring payments",
      "Lifetime updates",
      "Smart Alerts (coming soon)",
    ],
  },
];

export function PricingSection() {
  const { isSignedIn } = useUser();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      checkSubscription();
    }
  }, [isSignedIn]);

  const checkSubscription = async () => {
    try {
      const response = await fetch("/api/stripe/subscription");
      if (response.ok) {
        const data = await response.json();
        setHasActiveSubscription(data.hasSubscription || false);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  const handleSubscribe = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating payment session");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing payment");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#131722] text-white">
      <div className="max-w-[1300px] mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#2962FF] font-semibold text-sm uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose your plan and start trading
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            VSA indicator and alerts included from 6-month plan. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards - Vimeo style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-20" data-no-cursor-effect>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#1E222D] rounded-2xl border-2 p-6 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? "border-[#2962FF] shadow-lg shadow-blue-500/20"
                  : "border-gray-800 hover:border-gray-700"
              }`}
            >
              {/* Popular badge - 6 Months */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2962FF] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Recommended
                  </span>
                </div>
              )}

              {/* Savings badge - 12 Months (even if not popular) */}
              {plan.savings && plan.id === "12-months" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#089981] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Save {plan.savings}%
                  </span>
                </div>
              )}

              {/* Savings badge for others (standard logic) */}
              {plan.savings && !plan.popular && plan.id !== "12-months" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#089981] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Save {plan.savings}%
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="pt-2 mb-4">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-5">
                {plan.isLifetime ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">${plan.totalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">One-time payment</p>
                    <p className="text-xs text-orange-400 mt-2 font-medium">
                      Valid only while the indicator is in beta phase.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">${plan.monthlyPrice}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ${plan.totalPrice} total
                    </p>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <div className="mb-5">
                <SignedOut>
                  <SignUpButton mode="modal" forceRedirectUrl={`/subscribe?plan=${plan.id}`}>
                    <button 
                      className={`w-full font-semibold py-3 px-4 rounded-xl transition-all ${
                        plan.popular
                          ? "bg-[#2962FF] hover:bg-[#1E53E5] text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                    >
                      Get Started
                    </button>
                  </SignUpButton>
                  {!plan.isLifetime && (
                    <SignUpButton mode="modal" forceRedirectUrl={`/subscribe?plan=${plan.id}&trial=true`}>
                      <button className="w-full mt-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Or start your 7-day free trial
                      </button>
                    </SignUpButton>
                  )}
                </SignedOut>

                <SignedIn>
                  {hasActiveSubscription ? (
                    <Link
                      href="/dashboard"
                      className={`block w-full text-center font-semibold py-3 px-4 rounded-xl transition-all ${
                        plan.popular
                          ? "bg-[#089981] hover:bg-[#07806a] text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={loadingPlan === plan.id}
                        className={`w-full font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 ${
                          plan.popular
                            ? "bg-[#2962FF] hover:bg-[#1E53E5] text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                      >
                        {loadingPlan === plan.id ? "Processing..." : "Subscribe"}
                      </button>
                      {!plan.isLifetime && (
                        <button
                          onClick={() => handleSubscribe(plan.id)}
                          className="w-full mt-3 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                          Start 7-day free trial
                        </button>
                      )}
                    </>
                  )}
                </SignedIn>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 my-4"></div>

              {/* Features list */}
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Includes:</p>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-[#089981] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Savings badge for popular plan - REMOVED (moved to top of 12 month plan) */}
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payment with Stripe
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Satisfaction guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel anytime
          </div>
        </div>

        {/* FAQ link */}
        <p className="text-center text-gray-500 mt-8">
          Have questions?{" "}
          <Link href="#faq" className="text-[#2962FF] hover:underline">
            View FAQ
          </Link>
        </p>
      </div>
    </section>
  );
}
