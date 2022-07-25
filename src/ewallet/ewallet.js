const {
  createEWalletCharge,
  getEWalletChargeStatus,
  voidEWalletCharge,
} = require('./ewallet_charge');
const { createPayment, getPayment } = require('./ewallet_payment');
const {
  initializeTokenization,
  unlinkTokenization,
} = require('./linked_account');
const {
  createPaymentMethod,
  getPaymentMethodsByCustomerID,
} = require('./payment_method');

const EWALLET_PATH = '';

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
EWallet.Type = {
  OVO: 'OVO',
  Dana: 'DANA',
  LinkAja: 'LINKAJA',
};

EWallet.prototype.createPayment = createPayment;
EWallet.prototype.getPayment = getPayment;
EWallet.prototype.createEWalletCharge = createEWalletCharge;
EWallet.prototype.getEWalletChargeStatus = getEWalletChargeStatus;
EWallet.prototype.voidEWalletCharge = voidEWalletCharge;
EWallet.prototype.initializeTokenization = initializeTokenization;
EWallet.prototype.unlinkTokenization = unlinkTokenization;
EWallet.prototype.createPaymentMethod = createPaymentMethod;
EWallet.prototype.getPaymentMethodsByCustomerID = getPaymentMethodsByCustomerID;

module.exports = EWallet;
