const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { EWallet } = x;

  let ew;

  beforeEach(function() {
    ew = new EWallet({});
  });

  before(function() {
    nock(x.opts.xenditURL)
      .post('/linked_account_tokens/auth', {
        customer_id: TestConstants.CUSTOMER_ID,
        channel_code: 'PH_GRABPAY',
        properties: {
          success_redirect_url: TestConstants.SUCCESS_REDIRECT_URL,
          failure_redirect_url: TestConstants.FAILURE_REDIRECT_URL,
          callback_url: TestConstants.CALLBACK_URL,
        },
      })
      .reply(200, TestConstants.VALID_INITIALIZE_TOKENIZATION_RESPONSE);
    nock(x.opts.xenditURL)
      .delete(`/linked_account_tokens/${TestConstants.LINKED_ACCOUNT_TOKEN_ID}`)
      .reply(200, TestConstants.VALID_UNLINK_TOKENIZATION_RESPONSE);
  });

  describe('initializeTokenization', () => {
    it('should initialize the tokenization flow', done => {
      expect(
        ew.initializeTokenization({
          customerID: TestConstants.CUSTOMER_ID,
          channelCode: 'PH_GRABPAY',
          properties: {
            successRedirectURL: TestConstants.SUCCESS_REDIRECT_URL,
            failureRedirectURL: TestConstants.FAILURE_REDIRECT_URL,
            callbackURL: TestConstants.CALLBACK_URL,
          },
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_INITIALIZE_TOKENIZATION_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(ew.initializeTokenization({}))
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

  describe('unlinkTokenization', () => {
    it('should unlink the token', done => {
      expect(
        ew.unlinkTokenization({
          linkedAccTokenID: TestConstants.LINKED_ACCOUNT_TOKEN_ID,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_UNLINK_TOKENIZATION_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(ew.unlinkTokenization({}))
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
