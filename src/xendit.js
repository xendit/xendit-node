const { CardService } = require('./card');
const { VAService } = require('./va');
const { DisbursementService } = require('./disbursement');
const { InvoiceService } = require('./invoice');
const { PayoutService } = require('./payout');
const { RecurringPayment } = require('./recurring');
const { EWalletService } = require('./ewallet');
const { BalanceServices } = require('./balance');
const { RetailOutletService } = require('./retail_outlet');
const { QrCode } = require('./qr_code');
const { PlatformService } = require('./platform');
const { CustomerService } = require('./customer');
const { DirectDebitService } = require('./direct_debit');
const Errors = require('./errors');

function Xendit(options) {
  let {
    secretKey, // customer's secret API key
    xenditURL, // should there be a need to override API base URL
  } = options;

  // default values of opts
  xenditURL = xenditURL || 'https://api.xendit.co';

  this.opts = { secretKey, xenditURL };
  this.Card = CardService._constructorWithInjectedXenditOpts(this.opts);
  this.VirtualAcc = VAService._constructorWithInjectedXenditOpts(this.opts);
  this.Disbursement = DisbursementService._constructorWithInjectedXenditOpts(
    this.opts,
  );
  this.Invoice = InvoiceService._constructorWithInjectedXenditOpts(this.opts);
  this.Payout = PayoutService._constructorWithInjectedXenditOpts(this.opts);
  this.RecurringPayment = RecurringPayment._constructorWithInjectedXenditOpts(
    this.opts,
  );
  this.EWallet = EWalletService._constructorWithInjectedXenditOpts(this.opts);
  this.Balance = BalanceServices._constructorWithInjectedXenditOpts(this.opts);
  this.RetailOutlet = RetailOutletService._constructorWithInjectedXenditOpts(
    this.opts,
  );
  this.QrCode = QrCode._constructorWithInjectedXenditOpts(this.opts);
  this.Platform = PlatformService._constructorWithInjectedXenditOpts(this.opts);
  this.Customer = CustomerService._constructorWithInjectedXenditOpts(this.opts);
  this.DirectDebit = DirectDebitService._constructorWithInjectedXenditOpts(
    this.opts,
  );
}

Xendit.Errors = Errors;

module.exports = Xendit;
