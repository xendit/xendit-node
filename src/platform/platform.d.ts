import { XenditOptions } from '../xendit_opts';

enum AccountTypes {
  Owned = 'OWNED',
  Managed = 'MANAGED',
}

export = class Platform {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Platform;
  static AccountType: {
    Owned: string;
    Managed: string;
  };
  createAccount(data: {
    accountEmail: string;
    type: AccountTypes;
    businessProfile?: {
      businessName: string;
    };
  }): Promise<object>;
  setCallbackURL(data: {
    type: string;
    url: string;
    forUserID?: string;
  }): Promise<object>;
  createTransfer(data: {
    reference: string;
    amount: number;
    sourceUserID: string;
    destinationUserID: string;
  }): Promise<object>;
  createFeeRule(data: {
    name: string;
    description?: string;
    routes: Array<{
      unit: string;
      amount: number;
      currency: string;
    }>;
  }): Promise<object>;
};
