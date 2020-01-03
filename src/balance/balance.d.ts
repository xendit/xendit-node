import { XenditOptions } from '../xendit_opts';

enum AccountType {
  Cash = 'CASH',
  Holding = 'HOLDING',
  Tax = 'TAX',
}

export = class Balance {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Balance;
  static AccountType: {
    Cash: AccountType;
    Holding: AccountType;
    Tax: AccountType;
  };
  getBalance(data: { accountType: AccountType }): Promise<object>;
};
