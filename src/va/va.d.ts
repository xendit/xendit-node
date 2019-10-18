import { getVABanks } from './bank';

export = class VirtualAcc {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof VirtualAcc;
  getVABanks = getVABanks;
};
