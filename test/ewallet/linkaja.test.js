const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { EWallet } = x;
  let ewallet;
  beforeEach(function() {
    ewallet = new EWallet({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post('/ewallets', {
        external_id: TestConstants.EXT_ID,
        phone: TestConstants.PHONE,
        amount: TestConstants.AMOUNT,
        items: TestConstants.ITEMS,
        callback_url: TestConstants.CALLBACK_URL,
        redirect_url: TestConstants.REDIRECT_URL,
        ewallet_type: TestConstants.LINKAJA_EWALLET_TYPE,
      })
      .reply(200, TestConstants.VALID_CREATE_LINKAJA_RESPONSE);
  });

  describe('createPayment', () => {
    it('should create an linkAja Payment', done => {
      expect(
        ewallet.linkaja.createPayment({
          externalID: TestConstants.EXT_ID,
          phone: TestConstants.PHONE,
          amount: TestConstants.AMOUNT,
          items: TestConstants.ITEMS,
          callbackURL: TestConstants.CALLBACK_URL,
          redirectURL: TestConstants.REDIRECT_URL,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_LINKAJA_RESPONSE)
        .then(() => done())
        .catch(e => done(e));
    });
    it('should report missing required fields', done => {
      expect(ewallet.linkaja.createPayment({}))
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });
};
