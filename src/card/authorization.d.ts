export function createAuthorization(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  descriptor?: string;
}): Promise<object>;

export function reverseAuthorization(data: {
  chargeID: string;
  externalID: string;
}): Promise<object>;
