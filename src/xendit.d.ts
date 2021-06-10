import Errors from './errors';
import { CardService } from './card';
import { VAService } from './va';
import { DisbursementService } from './disbursement';
import { InvoiceService } from './invoice';
import { PayoutService } from './payout';
import { RecurringPayment } from './recurring';
import { XenditOptions } from './xendit_opts';
import { EWalletService } from './ewallet';
import { BalanceServices } from './balance';
import { RetailOutletService } from './retail_outlet';
import { QrCode } from './qr_code';
import { PlatformService } from './platform';
import { CustomerService } from './customer';
import { DirectDebitService } from './direct_debit';

declare class Xendit {
  constructor(opts: XenditOptions);
  static Errors: typeof Errors;
  Card: typeof CardService;
  VirtualAcc: typeof VAService;
  Disbursement: typeof DisbursementService;
  Invoice: typeof InvoiceService;
  Payout: typeof PayoutService;
  RecurringPayment: typeof RecurringPayment;
  EWallet: typeof EWalletService;
  Balance: typeof BalanceServices;
  RetailOutlet: typeof RetailOutletService;
  QrCode: typeof QrCode;
  Platform: typeof PlatformService;
  Customer: typeof CustomerService;
  DirectDebit: typeof DirectDebitService;
}
export = Xendit;
