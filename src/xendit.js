const { CardService } = require('./card');
const { VAService } = require('./va');
const { DisbursementService } = require('./disbursement');
const { InvoiceService } = require('./invoice');
const { EWalletService } = require('./ewallet');
const Errors = require('./errors');

function Xendit(options) {
  let {
    publicKey, // customer's public API key
    secretKey, // customer's secret API key
    xenditURL, // should there be a need to override API base URL
  } = options;

  // default values of opts
  xenditURL = xenditURL || 'https://api.xendit.co';

  this.opts = { publicKey, secretKey, xenditURL };
  this.Card = CardService._constructorWithInjectedXenditOpts(this.opts);
  this.VirtualAcc = VAService._constructorWithInjectedXenditOpts(this.opts);
  this.Disbursement = DisbursementService._constructorWithInjectedXenditOpts(
    this.opts,
  );
  this.Invoice = InvoiceService._constructorWithInjectedXenditOpts(this.opts);
  this.EWallet = EWalletService._constructorWithInjectedXenditOpts(thi.opts);
}

Xendit.Errors = Errors;

module.exports = Xendit;
