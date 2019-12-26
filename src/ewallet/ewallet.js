const ovo = require('./ovo');
const dana = require('./dana');

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

EWallet.prototype.createOVOPayment = ovo.createPayment;
EWallet.prototype.getOVOPaymentStatusByExtID = ovo.getByExtID;
EWallet.prototype.createDanaPayment = dana.createPayment;
EWallet.prototype.getDanaPaymentStatusByExtID = dana.getByExtID;

module.exports = EWallet;
