const OVO = require('./ovo');
const dana = require('./dana');
const linkaja = require('./linkaja');

const EWALLET_PATH = '/ewallets';

function EWallet(options) {
  let aggOpts = options;
  if (EWallet._injectedOpts && Object.keys(EWallet._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, EWallet._injectedOpts);
  }

  this.opts = aggOpts;
  this.opts.API_ENDPOINT = this.opts.xenditURL + EWALLET_PATH;

  let ovo = OVO._constructorWithInjectedXenditOpts(this.opts);

  this.ovo = new ovo({});
}

EWallet._injectedOpts = {};
EWallet._constructorWithInjectedXenditOpts = function(options) {
  EWallet._injectedOpts = options;
  return EWallet;
};

EWallet.prototype.createDanaPayment = dana.createPayment;
EWallet.prototype.getDanaPaymentStatusByExtID = dana.getByExtID;
EWallet.prototype.createLinkAjaPayment = linkaja.createPayment;

module.exports = EWallet;
