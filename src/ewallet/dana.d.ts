import { EWalletOptions } from './ewallet_opts';

export = class OVO {
  constructor({});
  static _constructorWithInjectedEWalletOpts: (
    opts: EWalletOptions,
  ) => typeof OVO;
  createPayment(data: {
    externalID: string;
    amount: number;
    expirationDate: string;
    callbackURL: string;
    redirectURL: string;  
  }): Promise<object>;
  getPaymentStatusByExtID(data: { externalID: string }): Promise<object>;
};
  