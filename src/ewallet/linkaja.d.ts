import { EWalletOptions } from './ewallet_opts';

interface paymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


export = class LinkAja {
  constructor({});
  static _constructorWithInjectedEWalletOpts: (
    opts: EWalletOptions,
  ) => typeof LinkAja;
  createPayment(data: {
    externalID: string;
    phone: string;
    amount: number;
    items: paymentItem[];
    callbackURL: string;
    redirectURL: string;  
  }): Promise<object>;
};
