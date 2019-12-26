const ovo = require('./ovo');

const EWALLET_PATH = 'ewallets';

function EWallet(options) {
  let aggOpts = options;
  if (EWallet._injectedOpts && Object.keys(EWallet._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, EWallet._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + EWALLET_PATH;
}

EWallet._injectedOpts = {};
EWallet._constructorWithInjectedXenditOpts = function(options) {
  EWallet._injectedOpts = options;
  return EWallet;
};

Disbursement.prototype.createOVOPayment = ovo.createPayment;
Disbursement.prototype.getOVOPaymentStatusByExtID = ovo.getByExtID;

module.exports = EWallet;
