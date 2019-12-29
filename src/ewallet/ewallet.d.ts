import ovo  from './ovo';
import dana from './dana';
import linkaja from './linkaja';
import { XenditOptions } from '../xendit_opts';

export = class EWallet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof EWallet;
  createPayment(data: {
    externalID: string;
    amount: number;
    phone: string;
    ewalletType: string;
  }): Promise<object>;
  getPayment(data: {
    externalID: string;
    ewalletType: string;
  }): Promise<object>;
};
