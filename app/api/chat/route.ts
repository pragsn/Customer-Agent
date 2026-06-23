import { NextRequest, NextResponse } from "next/server";
import { runRefundAgent } from "@/lib/agent";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const result = await runRefundAgent(message);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong while processing the refund request." },
      { status: 500 }
    );
  }
}