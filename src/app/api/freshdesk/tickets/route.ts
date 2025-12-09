import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const FRESHDESK_DOMAIN = "globaldigitalventures.freshdesk.com";
const FRESHDESK_API_KEY = process.env.FRESHDESK_API_KEY || "DIiwrQG7u7S-Vakw3K1K";

export async function GET() {
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

    const userEmail = user.emailAddresses[0]?.emailAddress;

    // Get tickets for this user from Freshdesk
    const response = await fetch(
      `https://${FRESHDESK_DOMAIN}/api/v2/tickets?email=${encodeURIComponent(userEmail)}&include=requester`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${FRESHDESK_API_KEY}:X`).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      // If no tickets found or other error, return empty array
      if (response.status === 404) {
        return NextResponse.json({ tickets: [] });
      }
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Failed to fetch tickets", details: errorData },
        { status: response.status }
      );
    }

    const tickets = await response.json();

    // Map tickets to a cleaner format
    const formattedTickets = tickets.map((ticket: {
      id: number;
      subject: string;
      description_text: string;
      status: number;
      priority: number;
      type: string;
      created_at: string;
      updated_at: string;
    }) => ({
      id: ticket.id,
      subject: ticket.subject,
      description: ticket.description_text,
      status: getStatusLabel(ticket.status),
      statusCode: ticket.status,
      priority: getPriorityLabel(ticket.priority),
      priorityCode: ticket.priority,
      type: ticket.type,
      createdAt: ticket.created_at,
      updatedAt: ticket.updated_at,
    }));

    return NextResponse.json({ tickets: formattedTickets });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getStatusLabel(status: number): string {
  const statuses: Record<number, string> = {
    2: "Open",
    3: "Pending",
    4: "Resolved",
    5: "Closed",
  };
  return statuses[status] || "Unknown";
}

function getPriorityLabel(priority: number): string {
  const priorities: Record<number, string> = {
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };
  return priorities[priority] || "Unknown";
}

