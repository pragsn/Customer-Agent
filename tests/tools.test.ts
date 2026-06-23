import { describe, expect, it } from "vitest";
import {
  calculateDaysSinceDelivery,
  extractOrderId,
  extractReason,
  findCustomer,
  findOrder,
  isAllowedReason,
  isRefundableCategory,
  isValidOrderStatus,
  isWithinRefundWindow
} from "@/lib/tools";

describe("Refund tools", () => {
  it("finds an existing order", () => {
    const order = findOrder("ORD-1001");
    expect(order?.orderId).toBe("ORD-1001");
  });

  it("returns undefined for invalid order", () => {
    const order = findOrder("ORD-9999");
    expect(order).toBeUndefined();
  });

  it("finds an existing customer", () => {
    const customer = findCustomer("C001");
    expect(customer?.name).toBe("Asha Verma");
  });

  it("extracts order ID from customer message", () => {
    expect(extractOrderId("I want refund for ord-1001")).toBe("ORD-1001");
  });

  it("extracts damaged refund reason", () => {
    expect(extractReason("The product is damaged")).toBe("damaged");
  });

  it("allows valid refund reasons", () => {
    expect(isAllowedReason("damaged")).toBe(true);
  });

  it("rejects invalid refund reasons", () => {
    expect(isAllowedReason("changed my mind")).toBe(false);
  });

  it("rejects non-refundable categories", () => {
    expect(isRefundableCategory("Digital Product")).toBe(false);
  });

  it("allows refundable categories", () => {
    expect(isRefundableCategory("Electronics")).toBe(true);
  });

  it("rejects shipped order status", () => {
    expect(isValidOrderStatus("shipped")).toBe(false);
  });

  it("calculates days since delivery", () => {
    expect(calculateDaysSinceDelivery("2026-06-17")).toBe(6);
  });

  it("passes refund window validation", () => {
    expect(isWithinRefundWindow("2026-06-17")).toBe(true);
  });

  it("fails refund window validation", () => {
    expect(isWithinRefundWindow("2026-05-22")).toBe(false);
  });
});