export function createPayment(data: {
  externalID: string;
  amount: number;
  phone: string;
}): Promise<object>;

export function getPaymentStatusByExtID(data: { externalID: string }): Promise<object>;
