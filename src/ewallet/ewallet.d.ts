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
};
