import { RefundPolicy } from "@/lib/types";

export const refundPolicy: RefundPolicy = {
  refundWindowDays: 14,

  allowedReasons: [
    "damaged",
    "defective",
    "wrong item",
    "missing parts",
    "not as described"
  ],

  nonRefundableCategories: [
    "Gift Card",
    "Digital Product",
    "Personal Care"
  ],

  deniedStatuses: [
    "shipped",
    "cancelled"
  ]
};