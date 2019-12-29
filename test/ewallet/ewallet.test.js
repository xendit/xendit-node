process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const ovo = require('./ovo.test');
const dana = require('./dana.test');
const linkaja = require('./linkaja.test');

const x = new Xendit({
  publicKey: 'fake_public_key',
  secretKey: 'fake_secret_key',
});

describe('EWallet Service', function() {
  ovo(x);
  dana(x);
  linkaja(x);
});
