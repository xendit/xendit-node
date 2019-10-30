process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const bankTest = require('./bank.test');

const x = new Xendit({
  publicKey: 'fake_public_key',
  secretKey: 'fake_secret_key',
});

describe('Disbursement Service', function() {
  bankTest(x);
});
