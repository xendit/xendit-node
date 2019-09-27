const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Card } = x;
  beforeEach(function() {
    card = new Card({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post(`/credit_card_charges/${TestConstants.VALID_CHARGE_ID}/refunds`, {
        amount: TestConstants.AMOUNT,
        external_id: TestConstants.EXT_ID,
      })
      .reply(200, TestConstants.VALID_REFUND_RESPONSE);
  });

  describe('createRefund', () => {
    it('should create refund', done => {
      expect(
        card.createRefund({
          chargeID: TestConstants.VALID_CHARGE_ID,
          amount: TestConstants.AMOUNT,
          externalID: TestConstants.EXT_ID,
        }),
      )
        .to.eventually.be.deep.equal(TestConstants.VALID_REFUND_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(card.createRefund({}))
        .to.eventually.be.rejected.then(e =>
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
