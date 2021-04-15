export function createAuthorization(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  descriptor?: string;
  currency?: string;
  midLabel?: string;
  billingDetails?: object;
  promotion?: object;
  installment?: object;
  forUserID?: string;
}): Promise<object>;

export function reverseAuthorization(data: {
  chargeID: string;
  externalID: string;
  forUserID?: string;
}): Promise<object>;
