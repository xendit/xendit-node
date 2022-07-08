enum PaymentMethodType {
  EWALLET = 'EWALLET',
}

interface PaymentMethodProperties {
  id?: string;
  channelCode?: string;
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
