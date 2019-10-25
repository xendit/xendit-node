process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const tokenTest = require('./token.test');
const chargeTest = require('./charge.test');
const authenticationTest = require('./authentication.test');
const authorizationTest = require('./authorization.test');
const refundTest = require('./refund.test');

const x = new Xendit({
  publicKey: 'fake_public_key',
  secretKey: 'fake_secret_key',
});

describe('Card Service', function() {
  tokenTest(x);
  chargeTest(x);
  authenticationTest(x);
  authorizationTest(x);
  refundTest(x);
});
