import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "davidhsutton@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { tradingViewUsername } = await request.json();

    if (!tradingViewUsername) {
      return NextResponse.json(
        { error: "TradingView username is required" },
        { status: 400 }
      );
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    const userName = user.firstName 
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : userEmail;

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "Wyckoff Pro <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `🎯 New TradingView Username: ${tradingViewUsername}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2962FF; margin-bottom: 20px;">New TradingView Username Submitted</h2>
            
            <div style="background: #f8f9fd; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>User:</strong> ${userName}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${userEmail}</p>
              <p style="margin: 0 0 10px 0;"><strong>Clerk ID:</strong> ${userId}</p>
              <p style="margin: 0; font-size: 18px;"><strong>TradingView Username:</strong> <span style="color: #2962FF; font-weight: bold;">${tradingViewUsername}</span></p>
            </div>
            
            <p style="color: #5d6069; font-size: 14px;">
              Grant access to the indicator for this user on TradingView:
              <a href="https://www.tradingview.com/u/${tradingViewUsername}/" style="color: #2962FF;">
                tradingview.com/u/${tradingViewUsername}
              </a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e3eb; margin: 20px 0;">
            <p style="color: #787b86; font-size: 12px;">This notification was sent from Wyckoff Pro Dashboard.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Admin notified successfully",
    });
  } catch (error) {
    console.error("Error notifying admin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

