import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const FRESHDESK_DOMAIN = "globaldigitalventures.freshdesk.com";
const FRESHDESK_API_KEY = process.env.FRESHDESK_API_KEY || "DIiwrQG7u7S-Vakw3K1K";

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

    const { subject, description, priority, type } = await request.json();

    if (!subject || !description) {
      return NextResponse.json(
        { error: "Subject and description are required" },
        { status: 400 }
      );
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    const userName = user.firstName 
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : userEmail;

    // Create ticket in Freshdesk
    const ticketData = {
      subject,
      description,
      email: userEmail,
      name: userName,
      priority: priority || 1, // 1=Low, 2=Medium, 3=High, 4=Urgent
      status: 2, // 2=Open
      type: type || "Question",
      source: 2, // 2=Portal
      custom_fields: {
        cf_clerk_user_id: userId,
        cf_tradingview_username: user.unsafeMetadata?.tradingViewUsername || "",
      },
      tags: ["wyckoff-pro", "dashboard"],
    };

    const response = await fetch(
      `https://${FRESHDESK_DOMAIN}/api/v2/tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${FRESHDESK_API_KEY}:X`).toString("base64")}`,
        },
        body: JSON.stringify(ticketData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Failed to create ticket", details: errorData },
        { status: response.status }
      );
    }

    const ticket = await response.json();

    return NextResponse.json({
      success: true,
      ticketId: ticket.id,
      message: "Ticket created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

