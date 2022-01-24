process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const chargeTest = require('./charge.test');
const authorizationTest = require('./authorization.test');
const refundTest = require('./refund.test');
const promotionTest = require('./promotion.test');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

describe('Card Service', function() {
  chargeTest(x);
  authorizationTest(x);
  refundTest(x);
  promotionTest(x);
});
