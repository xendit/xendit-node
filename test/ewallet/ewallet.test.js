process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const eWalletPaymentTest = require('./ewallet_payment.test');
const eWalletChargeTest = require('./ewallet_charge.test');
const paymentMethodTest = require('./payment_method.test');
const linkedAccountTest = require('./linked_account.test');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

describe('EWallet Service Test', function() {
  eWalletPaymentTest(x);
  eWalletChargeTest(x);
  paymentMethodTest(x);
  linkedAccountTest(x);
});
