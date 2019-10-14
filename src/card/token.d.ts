export function createToken(data: {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cardCVN: string;
  isSingleUse: boolean;
  amount?: number;
  shouldAuthenticate?: boolean;
}): Promise<object>;
