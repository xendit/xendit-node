export function createFixedVA(data: {
  externalID: string;
  bankCode: string;
  name: string;
  virtualAccNumber?: string;
  suggestedAmt?: number;
  isClosed?: boolean;
  expectedAmt?: number;
  expirationDate?: Date;
  isSingleUse?: boolean;
  description?: string;
  forUserID?: string;
}): Promise<object>;

export function getFixedVA(data: {
  id: string;
  forUserID?: string;
}): Promise<object>;

export function updateFixedVA(data: {
  id: string;
  suggestedAmt?: number;
  expectedAmt?: number;
  expirationDate?: Date;
  isSingleUse?: boolean;
  description?: string;
  forUserID?: string;
}): Promise<object>;
