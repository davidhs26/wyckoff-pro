import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const fromEmail = process.env.FROM_EMAIL || "Wyckoff Pro <onboarding@resend.dev>";

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: fromEmail,
        to,
        subject,
        html,
      });
      console.log(`📧 Email enviado a ${to}: ${subject}`);
    } else {
      console.log(`📧 [MOCK] Email a ${to}: ${subject}`);
    }
  } catch (error) {
    console.error(`Error enviando email a ${to}:`, error);
  }
}

async function getCustomerEmail(customerId: string): Promise<string> {
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return "deleted@customer.com";
  return (customer as Stripe.Customer).email || "unknown@email.com";
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      // Handle one-time payments (Lifetime plan)
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Only process one-time payments (not subscriptions)
        if (session.mode === "payment") {
          const customerEmail = session.customer_email || 
            (session.customer ? await getCustomerEmail(session.customer as string) : "unknown@email.com");
          const planId = session.metadata?.planId || "lifetime";
          
          console.log(`✅ Pago único completado: ${session.id} - ${customerEmail} - Plan: ${planId}`);
          
          // Notify admin about lifetime purchase
          await sendEmail({
            to: adminEmail,
            subject: "🎉 New Lifetime Purchase - Wyckoff Pro",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2962FF;">New Lifetime Purchase!</h2>
                <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Customer:</strong> ${customerEmail}</p>
                  <p><strong>Plan:</strong> ${planId}</p>
                  <p><strong>Amount:</strong> $${((session.amount_total || 0) / 100).toFixed(2)}</p>
                </div>
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                  <strong>⚠️ Action Required:</strong> Add PERMANENT access to the indicator on TradingView for this user.
                </div>
              </div>
            `,
          });
          
          // Welcome email to customer
          await sendEmail({
            to: customerEmail,
            subject: "🚀 Welcome to Wyckoff Pro Lifetime!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2962FF;">Congratulations! 🎉</h2>
                <p>You have acquired <strong>lifetime access</strong> to Wyckoff Pro.</p>
                <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">What your Lifetime access includes:</h3>
                  <ul>
                    <li>✓ Wyckoff Structure Indicator</li>
                    <li>✓ VSA Tom Williams Indicator</li>
                    <li>✓ All future updates</li>
                    <li>✓ Priority support</li>
                    <li>✓ No additional payments, ever</li>
                  </ul>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <h3 style="margin-top: 0;">Next steps:</h3>
                  <ol>
                    <li>Go to your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Dashboard</a></li>
                    <li>Configure your TradingView username</li>
                    <li>We will grant you access to the indicator within a few hours</li>
                  </ol>
                </div>
                <p style="margin-top: 20px;">If you have questions, reply to this email.</p>
              </div>
            `,
          });
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerEmail = await getCustomerEmail(subscription.customer as string);
        
        console.log(`✅ Nueva suscripción: ${subscription.id} - ${customerEmail}`);
        
        // Notify admin
        await sendEmail({
          to: adminEmail,
          subject: "🎉 New Subscription - Wyckoff Pro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2962FF;">New Subscription!</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Customer:</strong> ${customerEmail}</p>
                <p><strong>Status:</strong> ${subscription.status}</p>
                <p><strong>Start:</strong> ${new Date(subscription.current_period_start * 1000).toLocaleDateString("en-US")}</p>
                <p><strong>Next billing:</strong> ${new Date(subscription.current_period_end * 1000).toLocaleDateString("en-US")}</p>
              </div>
              <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                <strong>⚠️ Action Required:</strong> Add access to the indicator on TradingView for this user.
              </div>
            </div>
          `,
        });
        
        // Welcome email to customer
        await sendEmail({
          to: customerEmail,
          subject: "🚀 Welcome to Wyckoff Pro!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2962FF;">Your subscription is active! 🎉</h2>
              <p>You now have full access to the Wyckoff Pro indicator.</p>
              <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Next steps:</h3>
                <ol>
                  <li>Go to your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Dashboard</a></li>
                  <li>Configure your TradingView username</li>
                  <li>We will grant you access to the indicator within a few hours</li>
                </ol>
              </div>
              <p>If you have questions, reply to this email.</p>
            </div>
          `,
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerEmail = await getCustomerEmail(subscription.customer as string);
        
        console.log(`📝 Suscripción actualizada: ${subscription.id} - ${subscription.status}`);
        
        // Check if cancellation is pending
        if (subscription.cancel_at_period_end) {
          const endDate = new Date(subscription.current_period_end * 1000);
          
          await sendEmail({
            to: adminEmail,
            subject: "⚠️ Subscription Pending Cancellation - Wyckoff Pro",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #f44336;">Scheduled Cancellation</h2>
                <div style="background: #ffebee; padding: 20px; border-radius: 8px;">
                  <p><strong>Customer:</strong> ${customerEmail}</p>
                  <p><strong>Cancels on:</strong> ${endDate.toLocaleDateString("en-US")}</p>
                </div>
                <p>Access will be automatically disabled after this date.</p>
              </div>
            `,
          });
          
          await sendEmail({
            to: customerEmail,
            subject: "😢 Your subscription will be cancelled - Wyckoff Pro",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>We're sorry to see you go</h2>
                <p>Your subscription will be cancelled on <strong>${endDate.toLocaleDateString("en-US")}</strong>.</p>
                <p>Until then, you will continue to have full access to the indicator.</p>
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p>Changed your mind? You can reactivate your subscription from your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Dashboard</a>.</p>
                </div>
              </div>
            `,
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerEmail = await getCustomerEmail(subscription.customer as string);
        
        console.log(`❌ Suscripción cancelada: ${subscription.id} - ${customerEmail}`);
        
        // CRITICAL: Notify admin to revoke access
        await sendEmail({
          to: adminEmail,
          subject: "🔴 ACTION REQUIRED: Disable Access - Wyckoff Pro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f44336;">⚠️ Subscription Cancelled</h2>
              <div style="background: #ffebee; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Customer:</strong> ${customerEmail}</p>
                <p><strong>Subscription ID:</strong> ${subscription.id}</p>
              </div>
              <div style="background: #f44336; color: white; padding: 20px; border-radius: 8px;">
                <h3 style="margin-top: 0;">🚨 Action Required:</h3>
                <ol>
                  <li>Go to TradingView</li>
                  <li>Remove script access for: <strong>${customerEmail}</strong></li>
                  <li>Confirm removal</li>
                </ol>
              </div>
            </div>
          `,
        });
        
        await sendEmail({
          to: customerEmail,
          subject: "Your access to Wyckoff Pro has ended",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Thank you for being part of Wyckoff Pro</h2>
              <p>Your subscription has ended and indicator access has been disabled.</p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p>If you wish to return, we'll be here. You can reactivate your subscription at any time.</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/#pricing" style="display: inline-block; background: #2962FF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 10px;">View Plans</a>
              </div>
            </div>
          `,
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = await getCustomerEmail(invoice.customer as string);
        
        console.log(`💳 Pago fallido: ${invoice.id} - ${customerEmail}`);
        
        await sendEmail({
          to: adminEmail,
          subject: "💳 Payment Failed - Wyckoff Pro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f44336;">Payment Failed</h2>
              <div style="background: #ffebee; padding: 20px; border-radius: 8px;">
                <p><strong>Customer:</strong> ${customerEmail}</p>
                <p><strong>Amount:</strong> $${((invoice.amount_due || 0) / 100).toFixed(2)}</p>
                <p><strong>Attempts:</strong> ${invoice.attempt_count}</p>
              </div>
            </div>
          `,
        });
        
        await sendEmail({
          to: customerEmail,
          subject: "⚠️ Issue with your payment - Wyckoff Pro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f44336;">We couldn't process your payment</h2>
              <p>There was a problem charging your Wyckoff Pro subscription.</p>
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p>Please update your payment method to maintain access to the indicator.</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" style="display: inline-block; background: #2962FF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 10px;">Update payment method</a>
              </div>
            </div>
          `,
        });
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Only notify for renewals, not first payment
        if (invoice.billing_reason === "subscription_cycle") {
          const customerEmail = await getCustomerEmail(invoice.customer as string);
          
          console.log(`✅ Renovación exitosa: ${invoice.id}`);
          
          await sendEmail({
            to: adminEmail,
            subject: "💰 Successful Renewal - Wyckoff Pro",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4caf50;">Successful Renewal</h2>
                <div style="background: #e8f5e9; padding: 20px; border-radius: 8px;">
                  <p><strong>Customer:</strong> ${customerEmail}</p>
                  <p><strong>Amount:</strong> $${((invoice.amount_paid || 0) / 100).toFixed(2)}</p>
                </div>
              </div>
            `,
          });
          
          await sendEmail({
            to: customerEmail,
            subject: "✅ Successful renewal - Wyckoff Pro",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4caf50;">Your subscription has been renewed ✓</h2>
                <p>Payment of <strong>$${((invoice.amount_paid || 0) / 100).toFixed(2)}</strong> processed successfully.</p>
                <p>Thank you for trusting Wyckoff Pro!</p>
              </div>
            `,
          });
        }
        break;
      }

      case "invoice.upcoming": {
        // Email 3 días antes del vencimiento (Stripe envía esto automáticamente)
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = await getCustomerEmail(invoice.customer as string);
        const dueDate = invoice.due_date ? new Date(invoice.due_date * 1000) : new Date();
        
        console.log(`⏰ Próximo cobro: ${invoice.id} - ${customerEmail}`);
        
        await sendEmail({
          to: customerEmail,
          subject: "📅 Your renewal is coming up - Wyckoff Pro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Your subscription will renew soon</h2>
              <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p>We will charge you <strong>$${((invoice.amount_due || 0) / 100).toFixed(2)}</strong> on <strong>${dueDate.toLocaleDateString("en-US")}</strong>.</p>
              </div>
              <p>If you need to update your payment method or cancel, you can do so from your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Dashboard</a>.</p>
            </div>
          `,
        });
        break;
      }

      case "customer.subscription.trial_will_end": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerEmail = await getCustomerEmail(subscription.customer as string);
        const trialEnd = new Date((subscription.trial_end || 0) * 1000);
        
        console.log(`⏰ Trial terminando: ${subscription.id} - ${trialEnd.toLocaleDateString()}`);
        
        await sendEmail({
          to: customerEmail,
          subject: "⏰ Your free trial ends soon - Wyckoff Pro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Your trial period ends on ${trialEnd.toLocaleDateString("en-US")}</h2>
              <p>Make sure you have a valid payment method to continue using Wyckoff Pro.</p>
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" style="display: inline-block; background: #2962FF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Verify payment method</a>
              </div>
            </div>
          `,
        });
        
        await sendEmail({
          to: adminEmail,
          subject: "⏰ Trial ending - Wyckoff Pro",
          html: `
            <p><strong>Customer:</strong> ${customerEmail}</p>
            <p><strong>Ends:</strong> ${trialEnd.toLocaleDateString("en-US")}</p>
          `,
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
