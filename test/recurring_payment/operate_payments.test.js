const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { RecurringPayment } = x;
  let rp = new RecurringPayment({});
  beforeEach(function() {
    rp = new RecurringPayment({});
  });
  before(function() {
    nock(rp.API_ENDPOINT)
      .post(`/${TestConstants.PAYMENT_ID}/stop!`)
      .reply(200, TestConstants.PAYMENT_DETAILS)
      .post(`/${TestConstants.PAYMENT_ID}/pause!`)
      .reply(200, TestConstants.PAYMENT_DETAILS)
      .post(`/${TestConstants.PAYMENT_ID}/resume!`)
      .reply(200, TestConstants.PAYMENT_DETAILS);
  });

  describe('stopPayment', () => {
    it('should stop a recurring payment', done => {
      expect(rp.stopPayment({ id: TestConstants.PAYMENT_ID }))
        .to.eventually.deep.equal(TestConstants.PAYMENT_DETAILS)
        .and.notify(done);
    });
  });
  describe('pausePayment', () => {
    it('should pause a recurring payment', done => {
      expect(rp.pausePayment({ id: TestConstants.PAYMENT_ID }))
        .to.eventually.deep.equal(TestConstants.PAYMENT_DETAILS)
        .and.notify(done);
    });
  });
  describe('resumePayment', () => {
    it('should resume a recurring payment', done => {
      expect(rp.resumePayment({ id: TestConstants.PAYMENT_ID }))
        .to.eventually.deep.equal(TestConstants.PAYMENT_DETAILS)
        .and.notify(done);
    });
  });
};
