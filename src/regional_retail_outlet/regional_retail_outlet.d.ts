import { XenditOptions } from '../xendit_opts';

export = class RegionalRetailOutlet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof RetailOutlet;
  createPaymentCode(data: {
    reference_id: string;
    channel_code: string;
    amount: number;
    currency: number;
    customer_name: string;
    market: string;
    payment_code?: string;
    expires_at?: Date;
    is_single_use?: boolean;
    desciption?: string;
    metadata?: object[];
  }): Promise<object>;
  updateFixedPaymentCode(data: {
    id: string;
    name?: string;
    expectedAmt?: number;
    expirationDate?: Date;
  }): Promise<object>;
  getFixedPaymentCode(data: { id: string }): Promise<object>;
};
