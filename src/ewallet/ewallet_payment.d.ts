enum CreateSupportWalletTypes {
  OVO = 'OVO',
  Dana = 'DANA',
  Linkaja = 'LINKAJA',
}

enum GetSupportWalletTypes {
  OVO = 'OVO',
  Dana = 'DANA',
}

interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function createPayment(data: {
  externalID: string;
  amount: number;
  phone?: string;
  expirationDate?: Date;
  callbackURL?: string;
  redirectURL?: string;
  items?: PaymentItem[];
  ewalletType: CreateSupportWalletTypes;
  xApiVersion?: string;
}): Promise<object>;

export function getPayment(data: {
  externalID: string;
  ewalletType: GetSupportWalletTypes;
}): Promise<object>;
