const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const Xendit = require('../../src/xendit');

const x = new Xendit({
  publicKey: 'fake_public_key',
  secretKey: 'fake_secret_key',
});

chai.use(chaiAsProm);

const { Balance } = x;
let b = new Balance({});
beforeEach(function() {
  b = new Balance({});
});
before(function() {
  nock(x.opts.xenditURL)
    .get('/balance?account_type=HOLDING')
    .reply(200, TestConstants.BALANCE_RESPONSE);
});

describe('Balance Service', function() {
  describe('getBalance', () => {
    it("should get user's balance", done => {
      expect(b.getBalance({ accountType: Balance.AccountType.Holding }))
        .to.eventually.deep.equal(TestConstants.BALANCE_RESPONSE)
        .and.notify(done);
    });
  });
});
