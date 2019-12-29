import { EWalletOptions } from './ewallet_opts';

interface PaymentItem {
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
    items: PaymentItem[];
    callbackURL: string;
    redirectURL: string;  
  }): Promise<object>;
};
