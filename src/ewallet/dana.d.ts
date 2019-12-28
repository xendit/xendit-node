export function createPayment(data: {
  externalID: string;
  amount: number;
  expirationDate: string;
  callbackURL: string;
  redirectURL: string;  
}): Promise<object>;

export function getByExtID(data: { externalID: string }): Promise<object>;
  