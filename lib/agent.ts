import { saveAgentLog } from "@/lib/logger";
import { RefundDecision } from "@/lib/types";
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

export async function runRefundAgent(message: string): Promise<RefundDecision> {
  const logs: string[] = [];

  logs.push("Agent received customer refund request.");

  const orderId = extractOrderId(message);
  const reason = extractReason(message);

  if (!orderId) {
    logs.push("No valid order ID found in the customer message.");

    return {
      approved: false,
      decision: "DENIED",
      orderId: "UNKNOWN",
      reason,
      message:
        "I could not find a valid order ID. Please provide an order ID like ORD-1001.",
      logs
    };
  }

  logs.push(`Extracted order ID: ${orderId}`);
  logs.push(`Extracted refund reason: ${reason}`);

  const order = findOrder(orderId);

  if (!order) {
    logs.push("Order lookup failed. No matching order was found.");

    saveAgentLog({
      orderId,
      customerName: "Unknown",
      reason,
      decision: "DENIED",
      logs
    });

    return {
      approved: false,
      decision: "DENIED",
      orderId,
      reason,
      message: `I could not find order ${orderId}. Please check the order ID and try again.`,
      logs
    };
  }

  logs.push("Order found in mock CRM database.");

  const customer = findCustomer(order.customerId);

  if (!customer) {
    logs.push("Customer lookup failed for the matched order.");

    saveAgentLog({
      orderId,
      customerName: "Unknown",
      reason,
      decision: "DENIED",
      logs
    });

    return {
      approved: false,
      decision: "DENIED",
      orderId,
      reason,
      message:
        "I found the order, but could not verify the customer profile. Refund denied for safety.",
      logs
    };
  }

  logs.push(`Customer verified: ${customer.name}.`);
  logs.push(`Product category checked: ${order.category}.`);

  if (!isRefundableCategory(order.category)) {
    logs.push(`Policy violation: ${order.category} is non-refundable.`);

    saveAgentLog({
      orderId,
      customerName: customer.name,
      reason,
      decision: "DENIED",
      logs
    });

    return {
      approved: false,
      decision: "DENIED",
      orderId,
      customerName: customer.name,
      reason,
      message: `Sorry ${customer.name}, this refund is denied because ${order.category} items are non-refundable according to our refund policy.`,
      logs
    };
  }

  logs.push(`Order status checked: ${order.status}.`);

  if (!isValidOrderStatus(order.status)) {
    logs.push(
      `Policy violation: Order status '${order.status}' is not eligible for refund.`
    );

    saveAgentLog({
      orderId,
      customerName: customer.name,
      reason,
      decision: "DENIED",
      logs
    });

    return {
      approved: false,
      decision: "DENIED",
      orderId,
      customerName: customer.name,
      reason,
      message: `Sorry ${customer.name}, this refund is denied because the order status is ${order.status}.`,
      logs
    };
  }

  const daysSinceDelivery = calculateDaysSinceDelivery(order.deliveryDate);

  logs.push(`Days since delivery calculated: ${daysSinceDelivery} day(s).`);

  if (!isWithinRefundWindow(order.deliveryDate)) {
    logs.push(
      "Policy violation: Refund request is outside the 14-day refund window."
    );

    saveAgentLog({
      orderId,
      customerName: customer.name,
      reason,
      decision: "DENIED",
      logs
    });

    return {
      approved: false,
      decision: "DENIED",
      orderId,
      customerName: customer.name,
      reason,
      message: `Sorry ${customer.name}, this refund is denied because the order was delivered ${daysSinceDelivery} days ago, which is outside our 14-day refund window.`,
      logs
    };
  }

  logs.push("Refund window validation passed.");

  if (!isAllowedReason(reason)) {
    logs.push("Policy violation: Refund reason is not allowed by the policy.");

    saveAgentLog({
      orderId,
      customerName: customer.name,
      reason,
      decision: "DENIED",
      logs
    });

    return {
      approved: false,
      decision: "DENIED",
      orderId,
      customerName: customer.name,
      reason,
      message: `Sorry ${customer.name}, this refund is denied because "${reason}" is not an eligible refund reason under our policy.`,
      logs
    };
  }

  logs.push("Refund reason validation passed.");
  logs.push("All policy checks passed. Refund approved.");

  saveAgentLog({
    orderId,
    customerName: customer.name,
    reason,
    decision: "APPROVED",
    logs
  });

  return {
    approved: true,
    decision: "APPROVED",
    orderId,
    customerName: customer.name,
    reason,
    message: `Your refund is approved, ${customer.name}. The order ${orderId} is within the refund window and the reason "${reason}" matches our refund policy.`,
    logs
  };
}