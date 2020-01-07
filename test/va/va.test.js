process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const bankTest = require('./bank.test');
const accountTest = require('./account.test');
const paymentTest = require('./payment.test');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

describe('VA Service', function() {
  bankTest(x);
  accountTest(x);
  paymentTest(x);
});
