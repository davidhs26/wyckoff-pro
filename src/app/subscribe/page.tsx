"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [status, setStatus] = useState("Checking subscription...");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkAndRedirect();
    } else if (isLoaded && !isSignedIn) {
      router.push("/sign-up");
    }
  }, [isLoaded, isSignedIn]);

  const checkAndRedirect = async () => {
    try {
      // Check if user already has subscription
      setStatus("Verifying your account...");
      const subResponse = await fetch("/api/stripe/subscription");
      
      if (subResponse.ok) {
        const subData = await subResponse.json();
        
        if (subData.hasSubscription) {
          // User already has subscription, go to dashboard
          setStatus("Subscription found! Redirecting to dashboard...");
          router.push("/dashboard");
          return;
        }
      }

      // No subscription, create checkout session
      setStatus("Preparing checkout...");
      const checkoutResponse = await fetch("/api/stripe/create-checkout", {
        method: "POST",
      });

      if (checkoutResponse.ok) {
        const checkoutData = await checkoutResponse.json();
        if (checkoutData.url) {
          setStatus("Redirecting to payment...");
          window.location.href = checkoutData.url;
          return;
        }
      }

      // If checkout fails, go to pricing page
      setStatus("Error creating checkout. Redirecting...");
      setTimeout(() => router.push("/#pricing"), 2000);
      
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error occurred. Redirecting...");
      setTimeout(() => router.push("/#pricing"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#131722] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2962FF] mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-white mb-2">Wyckoff Pro</h1>
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  );
}

