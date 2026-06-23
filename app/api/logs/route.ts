import { NextRequest, NextResponse } from "next/server";
import { getAgentLogs } from "@/lib/logger";
import { clearLogs, deleteLogById } from "@/store/logStore";

export async function GET() {
  return NextResponse.json({
    logs: getAgentLogs(),
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const deleted = deleteLogById(id);

    return NextResponse.json({
      message: deleted ? "Log deleted successfully." : "Log not found.",
    });
  }

  clearLogs();

  return NextResponse.json({
    message: "All logs cleared successfully.",
  });
}