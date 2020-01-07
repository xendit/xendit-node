process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const bankTest = require('./bank.test');
const disburseTest = require('./disburse.test');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

describe('Disbursement Service', function() {
  bankTest(x);
  disburseTest(x);
});
