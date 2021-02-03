process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const linkedAccountTest = require('./linked_account.test');
const paymentMethodTest = require('./payment_method.test');
const directDebitPaymentTest = require('./direct_debit_payment.test');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

describe('Direct Debit Service', function() {
  linkedAccountTest(x);
  paymentMethodTest(x);
  directDebitPaymentTest(x);
});
