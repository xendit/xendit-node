import { XenditOptions } from '../xendit_opts';

enum reportTypes {
  balanceHistory = 'BALANCE_HISTORY',
  transactions = 'TRANSACTIONS',
  upcomingTransactions = 'UPCOMING_TRANSACTIONS',
}

enum currencyTypes {
  IDR = 'IDR',
  PHP = 'PHP',
  VND = 'VND',
  JPY = 'JPY',
  USD = 'USD',
  SGD = 'SGD',
}

enum formatTypes {
  csv = 'CSV',
}

export = class Report {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Report;
  generateReport(data: {
    type: reportTypes;
    filterDateFrom?: Date;
    filterDateTo?: Date;
    format?: formatTypes;
    currency?: currencyTypes;
  }): Promise<object>;
  getReport(data: { id: string }): Promise<object>;
};
