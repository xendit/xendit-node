import { getVABanks } from './bank';
import { createFixedVA, getFixedVA, updateFixedVA } from './account';
import { getVAPayment } from './payment';
import { XenditOptions } from '../xendit_opts';

export = class VirtualAcc {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof VirtualAcc;
  getVABanks = getVABanks;
  createFixedVA = createFixedVA;
  getFixedVA = getFixedVA;
  updateFixedVA = updateFixedVA;
  getVAPayment = getVAPayment;
};
