import { XenditOptions } from '../xendit_opts';

export = class RetailOutlet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof RetailOutlet;
  createFixedPaymentCode(data: {
    externalID: string;
    retailOutletName: string;
    name: string;
    expectedAmt: number;
    paymentCode?: string;
    expirationDate?: Date;
    isSingleUse?: boolean;
  }): Promise<object>;
  updateFixedPaymentCode(data: {
    id: string;
    name?: string;
    expectedAmt?: number;
    expirationDate?: Date;
  }): Promise<object>;
  getFixedPaymentCode(data: { id: string }): Promise<object>;
};
