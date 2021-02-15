const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { DirectDebit } = x;
  let dd;
  beforeEach(function() {
    dd = new DirectDebit({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post(`/linked_account_tokens/auth`, {
        customer_id: TestConstants.CUSTOMER_ID,
        channel_code: TestConstants.CHANNEL_CODE,
        properties: {
          account_mobile_number: TestConstants.ACCOUNT_MOBILE_NUMBER,
          card_last_four: TestConstants.CARD_LAST_FOUR,
          card_expiry: TestConstants.CARD_EXPIRY,
          account_email: TestConstants.ACCOUNT_EMAIL,
        },
      })
      .reply(200, TestConstants.VALID_INITIALIZE_TOKENIZATION_RESPONSE);
    nock(x.opts.xenditURL)
      .post(`/linked_account_tokens/${TestConstants.TOKEN_ID}/validate_otp`, {
        otp_code: TestConstants.LINKED_ACCOUNT_OTP_CODE,
      })
      .reply(200, TestConstants.VALID_VALIDATED_ACCOUNT_RESPONSE);
    nock(x.opts.xenditURL)
      .get(`/linked_account_tokens/${TestConstants.TOKEN_ID}/accounts`)
      .reply(200, TestConstants.VALID_ACCOUNT_ARRAY);
  });

  describe('initializeTokenization', () => {
    it('should initialize tokenization', done => {
      expect(
        dd.initializeTokenization({
          customerID: TestConstants.CUSTOMER_ID,
          channelCode: TestConstants.CHANNEL_CODE,
          properties: {
            accountMobileNumber: TestConstants.ACCOUNT_MOBILE_NUMBER,
            cardLastFour: TestConstants.CARD_LAST_FOUR,
            cardExpiry: TestConstants.CARD_EXPIRY,
            accountEmail: TestConstants.ACCOUNT_EMAIL,
          },
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_INITIALIZE_TOKENIZATION_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.initializeTokenization({}))
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

  describe('validateOTPforLinkedAccount', () => {
    it('should validate account using otp', done => {
      expect(
        dd.validateOTPforLinkedAccount({
          tokenID: TestConstants.TOKEN_ID,
          otpCode: TestConstants.LINKED_ACCOUNT_OTP_CODE,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_VALIDATED_ACCOUNT_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.validateOTPforLinkedAccount({}))
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

  describe('retrieveAccountsByTokenID', () => {
    it('should retrieve accounts by token ID', done => {
      expect(
        dd.retrieveAccountsByTokenID({
          tokenID: TestConstants.TOKEN_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_ACCOUNT_ARRAY)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.retrieveAccountsByTokenID({}))
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
