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
        ewallet_type: TestConstants.OVO_EWALLET_TYPE,
      })
      .reply(200, TestConstants.VALID_CREATE_OVO_RESPONSE);
    nock(x.opts.xenditURL)
      .get(
        `/ewallets/external_id=${TestConstants.EXT_ID}&ewallet_type=${TestConstants.OVO_EWALLET_TYPE}`,
      )
      .reply(200, TestConstants.VALID_GET_OVO_PAYMENT_STATUS);
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
    it('should report missing required fields', done => {
      expect(ewallet.createOVOPayment({}))
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

  describe('getOVOPaymentStatusByExtID', () => {
    it('should get OVO Payment Status', done => {
      expect(
        ewallet.getOVOPaymentStatusByExtID({
          externalID: TestConstants.EXT_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_GET_OVO_PAYMENT_STATUS)
        .then(() => done())
        .catch(e => done(e));
    });
    it('should report missing required fields', done => {
      expect(ewallet.getOVOPaymentStatusByExtID({}))
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
