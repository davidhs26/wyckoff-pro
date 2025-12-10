"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Load Stripe
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Plan configurations (must match PricingSection and API)
const PLANS = {
  "3-months": {
    name: "3 Months",
    description: "Wyckoff Structure indicator only",
    monthlyPrice: 79,
    totalPrice: 237,
    period: "3 months",
    includesVSA: false,
    hasTrial: true,
  },
  "6-months": {
    name: "6 Months",
    description: "Full access: Wyckoff + VSA indicators",
    monthlyPrice: 65,
    totalPrice: 390,
    period: "6 months",
    savings: 18,
    includesVSA: true,
    hasTrial: true,
  },
  "12-months": {
    name: "12 Months",
    description: "Maximum savings for committed traders",
    monthlyPrice: 49,
    totalPrice: 588,
    period: "year",
    savings: 38,
    includesVSA: true,
    hasTrial: true,
  },
  "lifetime": {
    name: "Lifetime",
    description: "Permanent access with no recurring payments",
    totalPrice: 997,
    period: "one-time",
    includesVSA: true,
    hasTrial: false,
    isLifetime: true,
  },
};

type PlanId = keyof typeof PLANS;

function CheckoutContent() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  
  // Get plan from URL or default to 6-months
  const planId = (searchParams.get("plan") || "6-months") as PlanId;
  const plan = PLANS[planId] || PLANS["6-months"];
  const hasTrial = searchParams.get("trial") === "true" || plan.hasTrial;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          planId,
          trial: hasTrial && !plan.isLifetime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      return data.clientSecret;
    } catch (err) {
      console.error("Error:", err);
      setError("Error loading checkout. Please try again.");
      throw err;
    }
  }, [planId, hasTrial, plan.isLifetime]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF]"></div>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
        <div className="bg-[#1E222D] p-8 rounded-2xl text-center max-w-md border border-gray-800">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Configuration Error</h2>
          <p className="text-gray-400 mb-6">Payment system is not configured. Please contact support.</p>
          <Link
            href="/"
            className="inline-block bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
        <div className="bg-[#1E222D] p-8 rounded-2xl text-center max-w-md border border-gray-800">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E11]">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#0B0E11]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 32 32" className="text-[#2962FF]">
              <rect x="4" y="16" width="4" height="12" rx="2" fill="currentColor" opacity="0.5"/>
              <rect x="10" y="12" width="4" height="16" rx="2" fill="currentColor" opacity="0.7"/>
              <rect x="16" y="8" width="4" height="20" rx="2" fill="currentColor" opacity="0.85"/>
              <rect x="22" y="4" width="4" height="24" rx="2" fill="currentColor"/>
            </svg>
            <span className="text-white font-bold text-lg group-hover:text-[#2962FF] transition-colors">Wyckoff Pro</span>
          </Link>
          
          {/* Trust indicators in header */}
          <div className="hidden md:flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encrypted
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Plan Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Card */}
            <div className="bg-[#1E222D] rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2962FF] to-[#1E53E5] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Wyckoff Pro - {plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
              </div>

              {/* Price display */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                {plan.isLifetime ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">${plan.totalPrice}</span>
                      <span className="text-gray-400">one-time</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Permanent access, no recurring payments</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">${plan.monthlyPrice}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ${plan.totalPrice} billed every {plan.period}
                    </p>
                    {plan.savings && (
                      <span className="inline-block mt-2 bg-[#089981]/20 text-[#089981] text-xs font-semibold px-2 py-1 rounded">
                        Save {plan.savings}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Trial info - VERY IMPORTANT */}
              {hasTrial && !plan.isLifetime && (
                <div className="bg-[#2962FF]/10 border border-[#2962FF]/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2962FF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">7-Day Free Trial</h4>
                      <p className="text-gray-400 text-xs mt-1">
                        You won&apos;t be charged today. Your card will only be charged after the 7-day trial period ends. Cancel anytime before to avoid charges.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">What&apos;s included:</p>
                {[
                  "Wyckoff Structure Indicator",
                  plan.includesVSA && "VSA Tom Williams Indicator",
                  "Spring & UTAD Detection",
                  "A-E Phases Visualization",
                  "Contextual Tooltips",
                  "TradingView Alerts",
                  "Automatic Updates",
                  "Discord Support",
                ].filter(Boolean).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#089981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Cancel policy */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Cancel anytime, no questions asked</span>
                </div>
              </div>
            </div>

            {/* Change plan link */}
            <div className="text-center">
              <Link href="/#pricing" className="text-[#2962FF] hover:underline text-sm">
                ← Change plan
              </Link>
            </div>
          </div>

          {/* Right Side - Stripe Checkout */}
          <div className="lg:col-span-3">
            <div className="stripe-checkout-wrapper">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ 
                  fetchClientSecret,
                  onComplete: () => {
                    router.push("/checkout/success");
                  },
                }}
              >
                <EmbeddedCheckout className="stripe-embedded-checkout" />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF] mx-auto mb-4"></div>
        <p className="text-gray-400">Loading checkout...</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
