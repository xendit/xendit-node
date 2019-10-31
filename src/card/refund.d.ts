export function createRefund(data: {
  chargeID: string;
  amount: number;
  externalID: string;
  xIdempotencyKey?: string;
}): Promise<object>;
