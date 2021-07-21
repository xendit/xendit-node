export function createCharge(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  capture?: boolean;
  descriptor?: string;
  currency?: string;
  midLabel?: string;
  billingDetails?: object;
  promotion?: object;
  installment?: object;
  forUserID?: string;
}): Promise<object>;

export function captureCharge(data: {
  chargeID: string;
  amount: number;
  forUserID?: string;
}): Promise<object>;

export function getCharge(data: {
  chargeID: string;
  forUserID?: string;
}): Promise<object>;
