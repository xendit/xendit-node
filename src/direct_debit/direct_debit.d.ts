import {
  initializeTokenization,
  validateOTPforLinkedAccount,
  retrieveAccountsByTokenID,
} from './linked_account';
import {
  createPaymentMethod,
  getPaymentMethodsByCustomerID,
} from './payment_method';
import {
  createDirectDebitPayment,
  validateOTPforPayment,
  getDirectDebitPaymentStatusByID,
  getDirectDebitPaymentStatusByReferenceID,
} from './direct_debit_payment';

import { XenditOptions } from '../xendit_opts';

export = class DirectDebit {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof DirectDebit;
  initializeTokenization = initializeTokenization;
  validateOTPforLinkedAccount = validateOTPforLinkedAccount;
  retrieveAccountsByTokenID = retrieveAccountsByTokenID;
  createPaymentMethod = createPaymentMethod;
  getPaymentMethodsByCustomerID = getPaymentMethodsByCustomerID;
  createDirectDebitPayment = createDirectDebitPayment;
  validateOTPforPayment = validateOTPforPayment;
  getDirectDebitPaymentStatusByID = getDirectDebitPaymentStatusByID;
  // eslint-disable-next-line max-len
  getDirectDebitPaymentStatusByReferenceID = getDirectDebitPaymentStatusByReferenceID;
};
