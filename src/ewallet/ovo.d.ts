export function createPayment(data: {
  externalID: string;
  amount: number;
  phone: string;
}): Promise<object>;

export function getByExtID(data: { externalID: string }): Promise<object>;
