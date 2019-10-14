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
      .post(
        `/credit_card_tokens/${TestConstants.VALID_TOKEN_ID}/authentications`,
        {
          amount: TestConstants.AMOUNT,
        },
      )
      .reply(200, { id: TestConstants.VALID_AUTH_ID });
  });

  describe('createAuthentication', () => {
    it('should create auth', done => {
      expect(
        card.createAuthentication({
          tokenID: TestConstants.VALID_TOKEN_ID,
          amount: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal({ id: TestConstants.VALID_AUTH_ID })
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(card.createAuthentication({}))
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
