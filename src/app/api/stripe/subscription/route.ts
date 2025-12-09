import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ hasSubscription: false, isNewUser: true, error: "Stripe not configured" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });

    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ hasSubscription: false, isNewUser: true });
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ hasSubscription: false, isNewUser: true });
    }

    // Find customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      // No Stripe customer = completely new user, never subscribed
      return NextResponse.json({ hasSubscription: false, isNewUser: true });
    }

    // User exists in Stripe = was a subscriber at some point
    const customerId = customers.data[0].id;

    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      // Also check for trialing subscriptions
      const trialingSubs = await stripe.subscriptions.list({
        customer: customerId,
        status: "trialing",
        limit: 1,
      });

      if (trialingSubs.data.length === 0) {
        // User was a subscriber before but subscription expired
        return NextResponse.json({ hasSubscription: false, isNewUser: false });
      }

      const subscription = trialingSubs.data[0];
      return NextResponse.json({
        hasSubscription: true,
        subscription: {
          id: subscription.id,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        },
      });
    }

    const subscription = subscriptions.data[0];

    return NextResponse.json({
      hasSubscription: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
      },
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    // On error, don't redirect to checkout, let user see dashboard
    return NextResponse.json({ hasSubscription: false, isNewUser: false });
  }
}
