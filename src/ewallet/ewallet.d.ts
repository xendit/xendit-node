import { XenditOptions } from '../xendit_opts';
import {
  createEWalletCharge,
  getEWalletChargeStatus,
  voidEWalletCharge,
} from './ewallet_charge';
import { createPayment, getPayment } from './ewallet_payment';
import { initializeTokenization, unlinkTokenization } from './linked_account';
import {
  createPaymentMethod,
  getPaymentMethodsByCustomerID,
} from require('./payment_method');

export = class EWallet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof EWallet;
  static Type: {
    OVO: string;
    Dana: string;
    LinkAja: string;
  };
  createPayment = createPayment;
  getPayment = getPayment;
  createEWalletCharge = createEWalletCharge;
  getEWalletChargeStatus = getEWalletChargeStatus;
  voidEWalletCharge = voidEWalletCharge;
  initializeTokenization = initializeTokenization;
  unlinkTokenization = unlinkTokenization;
  createPaymentMethod = createPaymentMethod;
  getPaymentMethodsByCustomerID = getPaymentMethodsByCustomerID;
};
