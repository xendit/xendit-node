enum Currency {
  IDR = 'IDR',
  PHP = 'PHP',
}

enum ChannelCode {
  ID_OVO = 'ID_OVO',
  ID_DANA = 'ID_DANA',
  ID_LINKAJA = 'ID_LINKAJA',
  ID_SHOPEEPAY = 'ID_SHOPEEPAY',
  PH_PAYMAYA = 'PH_PAYMAYA',
}

interface ChannelProps {
  mobileNumber?: string;
  successRedirectURL?: string;
  failureRedirectURL?: string;
  cancelRedirectURL?: string;
  redeemPoints?: string;
}

interface Basket {
  referenceID: string;
  name: string;
  category: string;
  currency: string;
  price: number;
  quantity: number;
  type: string;
  url?: string;
  description?: string;
  subCategory?: string;
  metadata?: object;
}

export function createEWalletCharge(data: {
  referenceID: string;
  currency: Currency;
  amount: number;
  checkoutMethod: string;
  channelCode?: ChannelCode;
  channelProperties?: ChannelProps;
  paymentMethodId?: string;
  customerID?: string;
  basket?: Basket[];
  metadata?: object;
  forUserID?: string;
  withFeeRule?: string;
}): Promise<object>;

export function getEWalletChargeStatus(data: {
  chargeID: string;
  forUserID?: string;
}): Promise<object>;

export function voidEWalletCharge(data: {
  chargeID: string;
  forUserID?: string;
}): Promise<object>;
