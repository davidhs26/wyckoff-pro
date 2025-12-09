import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BillingPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  // TODO: Get subscription details from Clerk Billing or Stripe
  const subscription = null; // Placeholder
  const hasActiveSubscription = false;

  return (
    <div className="min-h-screen bg-[#F8F9FD] py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#5D6069] hover:text-[#131722] transition-colors mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-[#131722]">Billing</h1>
          <p className="text-[#5D6069]">
            Manage your subscription and payment methods
          </p>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 mb-6 shadow-sm">
          <h2 className="font-bold text-[#131722] mb-4">Current Plan</h2>

          {hasActiveSubscription ? (
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
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
                </div>
                <div>
                  <p className="font-bold text-green-800">Wyckoff Pro</p>
                  <p className="text-sm text-green-600">$29.99/month</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                ACTIVE
              </span>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-yellow-800">No Active Plan</p>
                  <p className="text-sm text-yellow-600">
                    You don&apos;t have an active subscription
                  </p>
                </div>
                <Link
                  href="/#pricing"
                  className="bg-[#2962FF] hover:bg-[#1E53E5] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 mb-6 shadow-sm">
          <h2 className="font-bold text-[#131722] mb-4">Payment Method</h2>

          {hasActiveSubscription ? (
            <div className="flex items-center justify-between p-4 border border-[#E0E3EB] rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-[#131722]">•••• •••• •••• 4242</p>
                  <p className="text-sm text-[#5D6069]">Expires 12/2025</p>
                </div>
              </div>
              <button className="text-[#2962FF] hover:text-[#1E53E5] font-medium text-sm">
                Change
              </button>
            </div>
          ) : (
            <p className="text-[#5D6069]">
              No payment method configured. One will be added when you subscribe.
            </p>
          )}
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 shadow-sm">
          <h2 className="font-bold text-[#131722] mb-4">Billing History</h2>

          {hasActiveSubscription ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-[#F8F9FD] rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                  </div>
                  <div>
                    <p className="font-medium text-[#131722]">Wyckoff Pro - Monthly</p>
                    <p className="text-xs text-[#5D6069]">Dec 1, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#131722]">$29.99</p>
                  <button className="text-[#2962FF] hover:text-[#1E53E5] text-xs font-medium">
                    View invoice
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-[#5D6069] text-center py-8">
              No billing history
            </p>
          )}
        </div>

        {/* Cancel Subscription */}
        {hasActiveSubscription && (
          <div className="mt-8 text-center">
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Cancel Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

