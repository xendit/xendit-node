import { XenditOptions } from '../xendit_opts';

export = class Transaction {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Transaction;
  getTransaction(data: { id: string }): Promise<object>;
  listTransactions(data: {
    types?: Array<string>;
    statuses?: Array<string>;
    channelCategories?: Array<string>;
    referenceId?: string;
    productId?: string;
    accountIdentifier?: string;
    currency?: string;
    amount?: number;
    limit?: number;
    afterId?: string;
    beforeId?: string;
    createdDateFrom?: Date;
    createdDateTo?: Date;
    updatedDateFrom?: Date;
    updatedDateTo?: Date;
  }): Promise<object>;
};
