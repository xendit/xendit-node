const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');

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
        ewallet_type: TestConstants.OVO_EWALLET_TYPE,
      })
      .reply(200, TestConstants.VALID_CREATE_OVO_RESPONSE);
  });

  describe('createOVOPayment', () => {
    it('should create an OVO Payment', done => {
      expect(
        ewallet.createOVOPayment({
          externalID: TestConstants.EXT_ID,
          phone: TestConstants.PHONE,
          amount: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_OVO_RESPONSE)
        .then(() => done())
        .catch(e => done(e));
    });
  });
};
