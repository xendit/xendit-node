import { XenditOptions } from '../xendit_opts';

export = class Payout {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Payout;
  createPayout(data: {
    externalID: string;
    amount: string;
    email: string;
  }): Promise<object>;
  getPayout(data: { id: string }): Promise<object>;
  voidPayout(data: { id: string }): Promise<object>;
};
