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

enum CreateSupportChargesTypes {
  IdShopeePay = 'ID_SHOPEEPAY',
}

interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ChannelProperties {
  success_redirect_url: string;
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
    ShopeePay: string;
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
  createCharges(data: {
    referenceID: string;
    currency: string;
    amount: number;
    checkoutMethod: string;
    channelCode: CreateSupportChargesTypes;
    channelProperties?: ChannelProperties;
    customerID?: string;
    basket?: object[];
    metadata?: object[];
    callbackURL?: string;
  }): Promise<object>;
  getCharges(data: { chargeID: string }): Promise<object>;
};
