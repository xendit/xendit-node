export function createPromotion(data: {
  referenceId: string;
  description: string;
  promoCode?: string;
  binList?: string[];
  channelCode?: string;
  discountPercent?: number;
  discountAmount?: number;
  currency: string;
  startTime: Date;
  endTime: Date;
  minOriginalAmount?: number;
  maxDiscountAmount?: number;
}): Promise<object>;
