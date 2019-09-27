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
      .post('/v2/credit_card_tokens', {
        card_data: {
          account_number: TestConstants.VALID_CARD_NUM,
          exp_month: TestConstants.VALID_EXP_MNTH,
          exp_year: TestConstants.VALID_EXP_YR,
          cvn: TestConstants.VALID_CVN,
        },
        is_single_use: false,
        should_authenticate: true,
      })
      .reply(200, TestConstants.VALID_TOKEN_RESPONSE);
  });

  describe('createToken', () => {
    it('should generate token', done => {
      expect(
        card.createToken({
          cardNumber: TestConstants.VALID_CARD_NUM,
          expMonth: TestConstants.VALID_EXP_MNTH,
          expYear: TestConstants.VALID_EXP_YR,
          cardCVN: TestConstants.VALID_CVN,
          isSingleUse: false,
          shouldAuthenticate: true,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_TOKEN_RESPONSE)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(card.createToken({}))
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
