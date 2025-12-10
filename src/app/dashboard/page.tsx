"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SupportTickets } from "@/components";

interface Subscription {
  id: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd: string | null;
}

function DashboardContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [tradingViewUsername, setTradingViewUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [redirectingToCheckout, setRedirectingToCheckout] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isSignedIn) {
      fetchSubscription();
      // Load saved TradingView username from user metadata
      const savedUsername = user?.unsafeMetadata?.tradingViewUsername as string;
      if (savedUsername) {
        setTradingViewUsername(savedUsername);
      }
    }
  }, [isSignedIn, user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/stripe/subscription");
      if (response.ok) {
        const data = await response.json();
        if (data.hasSubscription) {
          setSubscription(data.subscription);
        } else {
          // No subscription - check if this is a completely new user
          const success = searchParams.get("success");
          if (!success && data.isNewUser) {
            // Only redirect to checkout for NEW users (never subscribed before)
            redirectToCheckout();
          }
          // If isNewUser is false, user had subscription before - show dashboard with expired message
        }
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const redirectToCheckout = () => {
    setRedirectingToCheckout(true);
    // Redirect to embedded checkout page
    router.push("/checkout");
  };

  const handleSaveUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tradingViewUsername: tradingViewUsername,
        },
      });
      
      // Notify admin about the new TradingView username
      await fetch("/api/notify-tradingview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tradingViewUsername }),
      });
      
      alert("✅ Username saved successfully! We'll grant you access to the indicator shortly.");
    } catch (error) {
      console.error("Error saving username:", error);
      alert("Error saving");
    } finally {
      setSaving(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error opening billing portal:", error);
    }
  };

  if (!isLoaded || loading || redirectingToCheckout) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF] mx-auto mb-4"></div>
          {redirectingToCheckout && (
            <p className="text-[#5D6069]">Redirecting to checkout...</p>
          )}
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <Link href="/sign-in" className="text-[#2962FF] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const hasSubscription = !!subscription;
  const periodEndDate = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd)
    : null;

  return (
    <div className="min-h-screen bg-[#F8F9FD] py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-[#E0E3EB] p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.firstName}`}
              alt=""
              className="w-16 h-16 rounded-full border-2 border-[#E0E3EB]"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#131722]">
                Hello, {user?.firstName || "Trader"}!
              </h1>
              <p className="text-[#5D6069]">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>

          {/* Subscription Status */}
          <div className={`p-4 rounded-xl ${hasSubscription ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {hasSubscription ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-green-800">
                        Subscription {subscription?.cancelAtPeriodEnd ? "Active (Cancels soon)" : "Active"}
                      </p>
                      <p className="text-sm text-green-600">
                        Wyckoff Pro - $29.99/mo
                        {periodEndDate && (
                          <span className="ml-2">
                            • {subscription?.cancelAtPeriodEnd ? "Ends" : "Renews"}: {periodEndDate.toLocaleDateString("en-US")}
                          </span>
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-yellow-800">No Active Subscription</p>
                      <p className="text-sm text-yellow-600">Activate your subscription to access the indicator</p>
                    </div>
                  </>
                )}
              </div>
              {!hasSubscription && (
                <Link
                  href="/#pricing"
                  className="bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
                >
                  Activate Now
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* TradingView Username Form */}
        <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 shadow-sm mb-8">
          <h3 className="font-bold text-[#131722] mb-2">Configure TradingView Username</h3>
          <p className="text-sm text-[#5D6069] mb-4">
            Enter your TradingView username so we can grant you access to the indicator.
          </p>
          <form onSubmit={handleSaveUsername} className="flex gap-3">
            <input
              type="text"
              value={tradingViewUsername}
              onChange={(e) => setTradingViewUsername(e.target.value)}
              placeholder="your_tradingview_username"
              className="flex-1 px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/20"
            />
            <button
              type="submit"
              disabled={saving || !tradingViewUsername}
              className="bg-[#131722] hover:bg-[#2A2E39] disabled:bg-gray-300 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
          <p className="text-xs text-[#5D6069] mt-3">
            💡 You can find your username in your TradingView profile (example: tradingview.com/u/your_username)
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Access Indicator */}
          <div className={`bg-white rounded-2xl border border-[#E0E3EB] p-6 shadow-sm ${!hasSubscription && "opacity-60"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#2962FF]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#2962FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#131722]">Wyckoff Pro Indicator</h3>
                <p className="text-sm text-[#5D6069]">Open in TradingView</p>
              </div>
            </div>
            {hasSubscription ? (
              <a
                href={process.env.NEXT_PUBLIC_TRADINGVIEW_SCRIPT_URL || "https://es.tradingview.com/script/"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#2962FF] hover:bg-[#1E53E5] text-white text-center font-semibold py-3 rounded-xl transition-colors"
              >
                Open Indicator →
              </a>
            ) : (
              <button disabled className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 rounded-xl cursor-not-allowed">
                Subscription Required
              </button>
            )}
          </div>

          {/* Billing */}
          <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#131722]">Billing</h3>
                <p className="text-sm text-[#5D6069]">Manage your subscription</p>
              </div>
            </div>
            {hasSubscription ? (
              <button
                onClick={handleManageBilling}
                className="flex items-center justify-center gap-2 w-full bg-[#F0F3FA] hover:bg-[#E0E3EB] text-[#131722] font-semibold py-3 rounded-xl transition-colors"
              >
                Manage Billing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            ) : (
              <Link
                href="/#pricing"
                className="block w-full bg-[#F0F3FA] hover:bg-[#E0E3EB] text-[#131722] text-center font-semibold py-3 rounded-xl transition-colors"
              >
                View Plans
              </Link>
            )}
          </div>
        </div>

        {/* Support Tickets Section */}
        <SupportTickets />
      </div>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2962FF] mx-auto mb-4"></div>
        <p className="text-[#5D6069]">Loading dashboard...</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
