import { XenditOptions } from '../xendit_opts';
import { getBanks } from './bank';

export = class Disbursement {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Disbursement;
  getBanks = getBanks;
};
