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
    savings: 0,
    includesVSA: false,
    hasTrial: true,
    isLifetime: false,
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
    isLifetime: false,
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
    isLifetime: false,
  },
  "lifetime": {
    name: "Lifetime",
    description: "Permanent access with no recurring payments",
    monthlyPrice: 0,
    totalPrice: 997,
    period: "one-time",
    savings: 0,
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
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF]"></div>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-[#E0E3EB]">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#131722] mb-2">Configuration Error</h2>
          <p className="text-[#5D6069] mb-6">Payment system is not configured. Please contact support.</p>
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
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-[#E0E3EB]">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#131722] mb-2">Error</h2>
          <p className="text-[#5D6069] mb-6">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FD] via-white to-[#E8EFFD]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2962FF]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#089981]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-[#2962FF]">
              <rect x="4" y="16" width="4" height="12" rx="2" fill="currentColor" opacity="0.5"/>
              <rect x="10" y="12" width="4" height="16" rx="2" fill="currentColor" opacity="0.7"/>
              <rect x="16" y="8" width="4" height="20" rx="2" fill="currentColor" opacity="0.85"/>
              <rect x="22" y="4" width="4" height="24" rx="2" fill="currentColor"/>
            </svg>
            <span className="text-[#131722] font-bold text-xl group-hover:text-[#2962FF] transition-colors">Wyckoff Pro</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#131722] mb-3">
            Complete Your Subscription
          </h1>
          <p className="text-[#5D6069]">Secure payment powered by Stripe</p>
        </div>

        <div className="grid lg:grid-cols-7 gap-8">
          {/* Left Side - Plan Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Plan Card */}
            <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 shadow-lg shadow-black/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2962FF] to-[#1E53E5] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#131722] text-lg">Wyckoff Pro - {plan.name}</h3>
                  <p className="text-[#5D6069] text-sm">{plan.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                {plan.isLifetime ? (
                  <>
                    <span className="text-4xl font-bold text-[#131722]">${plan.totalPrice}</span>
                    <span className="text-[#5D6069]">one-time</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-[#131722]">${plan.monthlyPrice}</span>
                    <span className="text-[#5D6069]">/month</span>
                  </>
                )}
              </div>

              {!plan.isLifetime && (
                <p className="text-sm text-[#787B86] mb-2">
                  ${plan.totalPrice} billed every {plan.period}
                </p>
              )}

              {plan.savings > 0 && (
                <span className="inline-block mb-4 bg-[#089981]/10 text-[#089981] text-xs font-semibold px-2 py-1 rounded">
                  Save {plan.savings}%
                </span>
              )}

              {/* Trial info */}
              {hasTrial && !plan.isLifetime && (
                <div className="bg-[#2962FF]/5 border border-[#2962FF]/20 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#2962FF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#131722] text-sm">7-Day Free Trial</h4>
                      <p className="text-[#5D6069] text-xs mt-1">
                        You won&apos;t be charged today. Your card will only be charged after the 7-day trial ends.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-3 mb-6">
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
                    <div className="w-5 h-5 rounded-full bg-[#089981]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#5D6069] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E0E3EB]">
                <div className="flex items-center gap-2 text-[#5D6069] text-sm">
                  <svg className="w-4 h-4 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Cancel anytime, no questions asked</span>
                </div>
              </div>

              {/* Change plan */}
              <div className="mt-4 text-center">
                <Link href="/#pricing" className="text-[#2962FF] hover:underline text-sm">
                  ← Change plan
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#787B86]">
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#E0E3EB]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#E0E3EB]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                SSL Encrypted
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#E0E3EB]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                </svg>
                Powered by Stripe
              </div>
            </div>
          </div>

          {/* Right Side - Checkout Form */}
          <div className="lg:col-span-4 pb-8">
            <div className="bg-white rounded-2xl border border-[#E0E3EB] overflow-visible shadow-lg shadow-black/5 min-h-[700px] pb-6">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ 
                  fetchClientSecret,
                  onComplete: () => {
                    router.push("/checkout/success");
                  },
                }}
              >
                <EmbeddedCheckout className="min-h-[700px]" />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF] mx-auto mb-4"></div>
        <p className="text-[#5D6069]">Loading checkout...</p>
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
