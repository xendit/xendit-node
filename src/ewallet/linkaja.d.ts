interface paymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function createPayment(data: {
  externalID: string;
  phone: string;
  amount: number;
  items: paymentItem[];
  callbackURL: string;
  redirectURL: string;  
}): Promise<object>;
    