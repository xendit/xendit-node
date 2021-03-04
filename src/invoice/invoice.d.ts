import { XenditOptions } from '../xendit_opts';

export = class Invoice {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Invoice;
  createInvoice(data: {
    externalID: string;
    payerEmail: string;
    description: string;
    amount: number;
    shouldSendEmail?: boolean;
    callbackVirtualAccountID?: string;
    invoiceDuration?: number;
    successRedirectURL?: string;
    failureRedirectURL?: string;
    paymentMethods?: string[];
    currency?: string;
    midLabel?: string;
    forUserID?: string;
  }): Promise<object>;
  getInvoice(data: { invoiceID: string; forUserID?: string }): Promise<object>;
  expireInvoice(data: {
    invoiceID: string;
    forUserID?: string;
  }): Promise<object>;
  getAllInvoices(data?: {
    statuses?: string[];
    limit?: number;
    createdAfter?: Date;
    createdBefore?: Date;
    paidAfter?: Date;
    paidBefore?: Date;
    expiredAfter?: Date;
    expiredBefore?: Date;
    lastInvoiceID?: string;
    clientTypes?: string[];
    paymentChannels?: string[];
    onDemandLink?: string;
    recurringPaymentID?: string;
    forUserID?: string;
  }): Promise<object>;
};
