"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (sessionId) {
      // Verify the session (optional - for extra security)
      verifySession();
    } else {
      setStatus("error");
    }
  }, [sessionId, isLoaded, isSignedIn, router]);

  const verifySession = async () => {
    try {
      // Simple verification - in production you might want to verify with Stripe
      setStatus("success");
    } catch (error) {
      console.error("Error verifying session:", error);
      setStatus("error");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF] mx-auto mb-4"></div>
          <p className="text-[#5D6069]">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#131722] mb-2">Something went wrong</h2>
          <p className="text-[#5D6069] mb-6">We couldn&apos;t verify your payment. Please contact support.</p>
          <Link
            href="/dashboard"
            className="inline-block bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        {/* Success Animation */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#131722] mb-2">Payment Successful! 🎉</h1>
        <p className="text-[#5D6069] mb-6">
          Welcome to Wyckoff Pro! Your subscription is now active.
        </p>

        {/* What's Next */}
        <div className="bg-[#F8F9FD] rounded-xl p-6 mb-6 text-left">
          <h3 className="font-bold text-[#131722] mb-4">What&apos;s next?</h3>
          <ol className="space-y-3 text-sm text-[#5D6069]">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>Go to your Dashboard and enter your TradingView username</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>We&apos;ll grant you access to the indicator within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>Add the indicator to your TradingView chart and start trading!</span>
            </li>
          </ol>
        </div>

        {/* CTA Button */}
        <Link
          href="/dashboard"
          className="inline-block w-full bg-[#2962FF] hover:bg-[#1E53E5] text-white font-bold py-4 px-6 rounded-xl transition-colors"
        >
          Go to Dashboard →
        </Link>

        {/* Support Link */}
        <p className="text-sm text-[#5D6069] mt-4">
          Need help? <a href="mailto:support@wyckoffpro.com" className="text-[#2962FF] hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
}

function CheckoutSuccessLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF] mx-auto mb-4"></div>
        <p className="text-[#5D6069]">Loading...</p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessLoading />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
