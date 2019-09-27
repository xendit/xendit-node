const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Card } = x;
  let card;
  beforeEach(function() {
    card = new Card({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post('/credit_card_charges', {
        token_id: TestConstants.VALID_CHARGE_ID,
        external_id: TestConstants.EXT_ID,
        amount: TestConstants.AMOUNT,
        capture: true,
      })
      .reply(200, TestConstants.VALID_CRE_CHARGE_RESPONSE);
  });

  describe('createCharge', () => {
    it('should create and capture charge', done => {
      expect(
        card.createCharge({
          tokenID: TestConstants.VALID_CHARGE_ID,
          externalID: TestConstants.EXT_ID,
          amount: TestConstants.AMOUNT,
          capture: true,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CRE_CHARGE_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(card.createCharge({}))
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
