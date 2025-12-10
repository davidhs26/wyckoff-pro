import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Plan configurations - same as create-checkout
const PLANS = {
  "3-months": {
    name: "Wyckoff Pro - 3 Months",
    description: "Access to Wyckoff Structure + VSA Tom Williams for 3 months",
    priceId: process.env.STRIPE_PRICE_3_MONTHS,
    unitAmount: 23700, // $237 total ($79/month x 3)
    interval: "month" as const,
    intervalCount: 3,
    mode: "subscription" as const,
  },
  "6-months": {
    name: "Wyckoff Pro - 6 Months",
    description: "Access to Wyckoff Structure + VSA Tom Williams for 6 months (Save 18%)",
    priceId: process.env.STRIPE_PRICE_6_MONTHS,
    unitAmount: 39000, // $390 total ($65/month x 6)
    interval: "month" as const,
    intervalCount: 6,
    mode: "subscription" as const,
  },
  "12-months": {
    name: "Wyckoff Pro - 12 Months",
    description: "Access to Wyckoff Structure + VSA Tom Williams for 12 months (Save 38%)",
    priceId: process.env.STRIPE_PRICE_12_MONTHS,
    unitAmount: 58800, // $588 total ($49/month x 12)
    interval: "year" as const,
    intervalCount: 1,
    mode: "subscription" as const,
  },
  "lifetime": {
    name: "Wyckoff Pro - Lifetime",
    description: "Lifetime access to Wyckoff Structure + VSA Tom Williams",
    priceId: process.env.STRIPE_PRICE_LIFETIME,
    unitAmount: 99700, // $997 one-time
    interval: null,
    intervalCount: null,
    mode: "payment" as const,
  },
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 400 }
      );
    }

    // Get plan from request body or URL params
    const url = new URL(req.url);
    const planIdFromQuery = url.searchParams.get("planId");
    const body = await req.json().catch(() => ({}));
    const planId = body.planId || planIdFromQuery || "6-months";
    const wantsTrial = body.trial !== false; // Default to true for subscriptions

    const plan = PLANS[planId as keyof typeof PLANS];
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customerId: string;

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: email,
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        metadata: {
          clerkUserId: userId,
        },
      });
      customerId = customer.id;
    }

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (plan.priceId) {
      lineItems.push({
        price: plan.priceId,
        quantity: 1,
      });
    } else {
      if (plan.mode === "subscription" && plan.interval) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: plan.unitAmount,
            recurring: {
              interval: plan.interval,
              interval_count: plan.intervalCount || 1,
            },
          },
          quantity: 1,
        });
      } else {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: plan.unitAmount,
          },
          quantity: 1,
        });
      }
    }

    // Create Stripe Checkout Session for embedded checkout
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      ui_mode: "embedded",
      mode: plan.mode,
      payment_method_types: ["card"],
      line_items: lineItems,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      allow_promotion_codes: true,
      metadata: {
        clerkUserId: userId,
        planId: planId,
      },
    };

    if (plan.mode === "subscription") {
      sessionParams.subscription_data = {
        metadata: {
          clerkUserId: userId,
          planId: planId,
        },
        // Add 7-day free trial for subscriptions
        ...(wantsTrial && { trial_period_days: 7 }),
      };
    } else {
      sessionParams.payment_intent_data = {
        metadata: {
          clerkUserId: userId,
          planId: planId,
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
