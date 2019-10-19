const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { VirtualAcc } = x;
  let va;
  beforeEach(function() {
    va = new VirtualAcc({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .get(
        `/callback_virtual_account_payments/payment_id=${TestConstants.PAYMENT_ID}`,
      )
      .reply(200, TestConstants.PAYMENT_DETAILS);
  });

  describe('getVAPayment', () => {
    it('should be able to get payment', done => {
      expect(va.getVAPayment({ paymentID: TestConstants.PAYMENT_ID }))
        .to.eventually.deep.equal(TestConstants.PAYMENT_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(va.getVAPayment({}))
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
