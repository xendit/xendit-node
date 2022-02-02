import { XenditOptions } from '../xendit_opts';

// enum transactionTypes {
//   disbursement = 'DISBURSEMENT',
//   batchDisbursement = 'BATCH_DISBURSEMENT',
//   payment = 'PAYMENT',
//   remittance = 'REMITTANCE',
//   remittancePayout = 'REMITTANCE_PAYOUT',
//   transfer = 'TRANSFER',
//   platformFee = 'PLATFORM_FEE',
//   refund = 'REFUND',
//   other = 'OTHER',
// }

// enum statusTypes {
//   pending = 'PENDING',
//   success = 'SUCCESS',
//   failed = 'FAILED',
//   voided = 'VOIDED',
//   reversed = 'REVERSED',
// }

// enum channelTypes {
//   bank = 'BANK',
//   cash = 'CASH',
//   cards = 'CARDS',
//   cardlessCredit = 'CARDLESS_CREDIT',
//   directDebit = 'DIRECT_DEBIT',
//   eWallet = 'EWALLET',
//   payLater = 'PAYLATER',
//   qrCode = 'QR_CODE',
//   retailOutlet = 'RETAIL_OUTLET',
//   virtualAccount = 'VIRTUAL_ACCOUNT',
// }

// enum currencyTypes {
//   IDR = 'IDR',
//   PHP = 'PHP',
//   USD = 'USD',
//   SGD = 'SGD',
//   MYR = 'MYR',
// }

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
