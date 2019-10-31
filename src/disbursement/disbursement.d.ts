import { XenditOptions } from '../xendit_opts';
import { getBanks } from './bank';
import { create, createBatch, getByID, getByExtID } from './disburse';

export = class Disbursement {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Disbursement;
  getBanks = getBanks;
  create = create;
  createBatch = createBatch;
  getByID = getByID;
  getByExtID = getByExtID;
};
