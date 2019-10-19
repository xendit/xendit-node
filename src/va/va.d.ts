import { getVABanks } from './bank';
import { createFixedVA, getFixedVA, updateFixedVA } from './account';

export = class VirtualAcc {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof VirtualAcc;
  getVABanks = getVABanks;
  createFixedVA = createFixedVA;
  getFixedVA = getFixedVA;
  updateFixedVA = updateFixedVA;
};
