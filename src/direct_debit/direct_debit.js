const {
  initializeTokenization,
  validateOTPforLinkedAccount,
  retrieveAccountsByTokenID,
} = require('./linked_account');
const {
  createPaymentMethod,
  getPaymentMethodsByCustomerID,
} = require('./payment_method');
const {
  createDirectDebitPayment,
  validateOTPforPayment,
  getDirectDebitPaymentStatusByID,
  getDirectDebitPaymentStatusByReferenceID,
} = require('./direct_debit_payment');

const DIRECT_DEBIT_PATH = '';

function DirectDebit(options) {
  let aggOpts = options;
  if (
    DirectDebit._injectedOpts &&
    Object.keys(DirectDebit._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, DirectDebit._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + DIRECT_DEBIT_PATH;
}

DirectDebit._injectedOpts = {};
DirectDebit._constructorWithInjectedXenditOpts = function(options) {
  DirectDebit._injectedOpts = options;
  return DirectDebit;
};

DirectDebit.prototype.initializeTokenization = initializeTokenization;
DirectDebit.prototype.validateOTPforLinkedAccount = validateOTPforLinkedAccount;
DirectDebit.prototype.retrieveAccountsByTokenID = retrieveAccountsByTokenID;
DirectDebit.prototype.createPaymentMethod = createPaymentMethod;
// eslint-disable-next-line max-len
DirectDebit.prototype.getPaymentMethodsByCustomerID = getPaymentMethodsByCustomerID;
DirectDebit.prototype.createDirectDebitPayment = createDirectDebitPayment;
DirectDebit.prototype.validateOTPforPayment = validateOTPforPayment;
// eslint-disable-next-line max-len
DirectDebit.prototype.getDirectDebitPaymentStatusByID = getDirectDebitPaymentStatusByID;
// eslint-disable-next-line max-len
DirectDebit.prototype.getDirectDebitPaymentStatusByReferenceID = getDirectDebitPaymentStatusByReferenceID;

module.exports = DirectDebit;
