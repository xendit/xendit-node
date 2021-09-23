import { XenditOptions } from '../xendit_opts';

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

export = class EWallet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof EWallet;
  static Type: {
    OVO: string;
    Dana: string;
    LinkAja: string;
  };
  createPayment(data: {
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
  getPayment(data: {
    externalID: string;
    ewalletType: GetSupportWalletTypes;
  }): Promise<object>;
  createEWalletCharge(data: {
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
  getEWalletChargeStatus(data: {
    chargeID: string;
    forUserID?: string;
  }): Promise<object>;
  voidEWalletCharge(data: {
    chargeID: string;
    forUserID?: string;
  }): Promise<object>;
};
