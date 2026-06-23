export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: "standard" | "premium" | "vip";
}

export interface Order {
  orderId: string;
  customerId: string;
  productName: string;
  category: string;
  price: number;
  purchaseDate: string;
  deliveryDate: string;
  status: "delivered" | "shipped" | "cancelled";
  condition: "new" | "opened" | "used" | "damaged";
}

export interface RefundPolicy {
  refundWindowDays: number;
  allowedReasons: string[];
  nonRefundableCategories: string[];
  deniedStatuses: string[];
}

export interface RefundDecision {
  approved: boolean;
  decision: "APPROVED" | "DENIED";
  orderId: string;
  customerName?: string;
  reason: string;
  message: string;
  logs: string[];
}

export interface AgentLog {
  id: string;
  timestamp: string;
  orderId: string;
  customerName: string;
  reason: string;
  decision: "APPROVED" | "DENIED";
  logs: string[];
}