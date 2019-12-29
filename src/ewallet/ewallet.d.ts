import { XenditOptions } from '../xendit_opts';

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
  createPayment(data: {
    externalID: string;
    amount: number;
    phone?: string;
    expirationDate?: string;
    callbackURL?: string;
    redirectURL?: string;
    items?: PaymentItem[];
    ewalletType: string;
  }): Promise<object>;
  getPayment(data: {
    externalID: string;
    ewalletType: string;
  }): Promise<object>;
};
