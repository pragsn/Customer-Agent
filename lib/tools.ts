import { customers } from "@/data/customers";
import { orders } from "@/data/orders";
import { refundPolicy } from "@/data/refundPolicy";
import { Customer, Order } from "@/lib/types";

export function findOrder(orderId: string): Order | undefined {
  return orders.find(
    (order) => order.orderId.toLowerCase() === orderId.toLowerCase()
  );
}

export function findCustomer(customerId: string): Customer | undefined {
  return customers.find((customer) => customer.id === customerId);
}

export function isRefundableCategory(category: string): boolean {
  return !refundPolicy.nonRefundableCategories.includes(category);
}

export function isAllowedReason(reason: string): boolean {
  const normalizedReason = reason.toLowerCase();

  return refundPolicy.allowedReasons.some((allowedReason) =>
    normalizedReason.includes(allowedReason)
  );
}

export function isValidOrderStatus(status: string): boolean {
  return !refundPolicy.deniedStatuses.includes(status);
}

export function calculateDaysSinceDelivery(deliveryDate: string): number {
  const today = new Date("2026-06-23");
  const delivered = new Date(deliveryDate);

  const differenceInMilliseconds = today.getTime() - delivered.getTime();

  return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

export function isWithinRefundWindow(deliveryDate: string): boolean {
  return calculateDaysSinceDelivery(deliveryDate) <= refundPolicy.refundWindowDays;
}

export function extractOrderId(message: string): string | null {
  const upperMessage = message.toUpperCase();

  const fullOrderMatch = upperMessage.match(/ORD-\d{4}/);

  if (fullOrderMatch) {
    return fullOrderMatch[0];
  }

  const numberOnlyMatch = upperMessage.match(/\b\d{4}\b/);

  if (numberOnlyMatch) {
    return `ORD-${numberOnlyMatch[0]}`;
  }

  return null;
}

export function extractReason(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("damaged")) return "damaged";
  if (lowerMessage.includes("defective")) return "defective";
  if (lowerMessage.includes("wrong item")) return "wrong item";
  if (lowerMessage.includes("missing parts")) return "missing parts";
  if (lowerMessage.includes("not as described")) return "not as described";
  if (lowerMessage.includes("changed my mind")) return "changed my mind";

  return "not specified";
}