export function createCharge(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  capture?: boolean;
  descriptor?: string;
  currency?: string;
  mid_label?: string;
  billing_details?: object;
  promotion?: object;
  installment?: object;
}): Promise<object>;

export function captureCharge(data: {
  chargeID: string;
  amount: number;
}): Promise<object>;

export function getCharge(data: { chargeID: string }): Promise<object>;
