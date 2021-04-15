interface Basket {
  referenceID: string;
  name: string;
  market: string;
  type: string;
  description?: string;
  category?: string;
  subCategory?: string;
  price?: string;
  url?: string;
  metadata?: object;
  quantity?: number;
}

export function createDirectDebitPayment(data: {
  idempotencyKey: string;
  referenceID: string;
  paymentMethodID: string;
  currency: string;
  amount: number;
  callbackURL: string;
  enableOTP?: boolean;
  description?: string;
  basket?: Basket[];
  metadata?: object;
}): Promise<object>;

export function validateOTPforPayment(data: {
  directDebitID: string;
  otpCode: string;
}): Promise<object>;

export function getDirectDebitPaymentStatusByID(data: {
  directDebitID: string;
}): Promise<object>;

export function getDirectDebitPaymentStatusByReferenceID(data: {
  referenceID: string;
}): Promise<object>;
