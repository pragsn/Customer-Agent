import { describe, expect, it } from "vitest";
import { runRefundAgent } from "@/lib/agent";

describe("Refund agent", () => {
  it("approves a valid refund request", async () => {
    const result = await runRefundAgent(
      "I received a damaged product for ORD-1001"
    );

    expect(result.decision).toBe("APPROVED");
    expect(result.approved).toBe(true);
    expect(result.logs.length).toBeGreaterThan(0);
  });

  it("denies refund when order is outside refund window", async () => {
    const result = await runRefundAgent(
      "I received a damaged product for ORD-1007"
    );

    expect(result.decision).toBe("DENIED");
    expect(result.approved).toBe(false);
    expect(result.message).toContain("outside our 14-day refund window");
  });

  it("denies refund for digital product", async () => {
    const result = await runRefundAgent(
      "I want a refund for digital product ORD-1009"
    );

    expect(result.decision).toBe("DENIED");
    expect(result.approved).toBe(false);
    expect(result.message).toContain("non-refundable");
  });

  it("denies refund for invalid order ID", async () => {
    const result = await runRefundAgent(
      "I received a damaged product for ORD-9999"
    );

    expect(result.decision).toBe("DENIED");
    expect(result.approved).toBe(false);
    expect(result.message).toContain("could not find order");
  });

  it("denies refund for invalid reason", async () => {
    const result = await runRefundAgent(
      "I changed my mind and want a refund for ORD-1001"
    );

    expect(result.decision).toBe("DENIED");
    expect(result.approved).toBe(false);
    expect(result.message).toContain("not an eligible refund reason");
  });
});