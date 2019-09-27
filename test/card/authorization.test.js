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
      .post('/credit_card_charges', {
        token_id: TestConstants.VALID_TOKEN_ID,
        external_id: TestConstants.EXT_ID,
        amount: TestConstants.AMOUNT,
        capture: false,
      })
      .reply(200, TestConstants.VALID_CRE_AUTH_RESPONSE);
    nock(x.opts.xenditURL)
      .post(
        `/credit_card_charges/${TestConstants.VALID_CHARGE_ID}/auth_reversal`,
        {
          external_id: TestConstants.EXT_ID,
        },
      )
      .reply(200, { external_id: TestConstants.EXT_ID });
  });

  describe('createAuthorization', () => {
    it('should create authorization', done => {
      expect(
        card.createAuthorization({
          tokenID: TestConstants.VALID_TOKEN_ID,
          externalID: TestConstants.EXT_ID,
          amount: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CRE_AUTH_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(card.createAuthorization({}))
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

  describe('reverseAuthorization', () => {
    it('should reverse authorization', done => {
      expect(
        card.reverseAuthorization({
          chargeID: TestConstants.VALID_CHARGE_ID,
          externalID: TestConstants.EXT_ID,
        }),
      )
        .to.eventually.deep.equal({ external_id: TestConstants.EXT_ID })
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(card.reverseAuthorization({}))
        .to.be.rejected.then(e =>
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
