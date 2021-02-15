enum PaymentMethodType {
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
}

interface PaymentMethodProperties {
  id: string;
}

export function createPaymentMethod(data: {
  customerID: string;
  type: PaymentMethodType;
  properties: PaymentMethodProperties;
  metadata?: object;
}): Promise<object>;

export function getPaymentMethodsByCustomerID(data: {
  customerID: string;
}): Promise<object>;
