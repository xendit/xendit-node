import Errors from './errors';
import CardService from './card/card';
import VAService from './va/va';
import DisbursementService from './disbursement/disbursement';
import InvoiceService from './invoice/invoice';
import PayoutService from './payout/payout';
import RecurringPayment from './recurring/recurring';
import { XenditOptions } from './xendit_opts';
import EWalletService from './ewallet/ewallet';
import BalanceServices from './balance/balance';
import RetailOutletService from './retail_outlet/retail_outlet';
import QrCode from './qr_code/qr_code';
import PlatformService from './platform/platform';
import CustomerService from './customer/customer';
import DirectDebitService from './direct_debit/direct_debit';

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
