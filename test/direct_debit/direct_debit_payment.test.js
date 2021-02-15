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
    nock(x.opts.xenditURL, {
      reqheaders: {
        'Idempotency-key': TestConstants.IDEMPOTENCY_KEY,
      },
    })
      .post(`/direct_debits`, {
        reference_id: TestConstants.REFERENCE_ID,
        payment_method_id: TestConstants.PAYMENT_METHOD_ID,
        currency: TestConstants.CURRENCY,
        amount: TestConstants.AMOUNT,
        callback_url: TestConstants.PAYMENT_CALLBACK_URL,
        enable_otp: true,
        basket: [
          {
            reference_id: 'product-ref-id-ex-1',
            name: 'product 1',
            market: TestConstants.COUNTRY_CODE,
            type: TestConstants.PRODUCT_TYPE,
          },
          {
            reference_id: 'product-ref-id-ex-2',
            name: 'product 2',
            market: TestConstants.COUNTRY_CODE,
            type: TestConstants.PRODUCT_TYPE,
          },
        ],
      })
      .reply(200, TestConstants.VALID_CREATE_DIRECT_DEBIT_PAYMENT_RESPONSE);
    nock(x.opts.xenditURL)
      .post(
        `/direct_debits/${TestConstants.DIRECT_DEBIT_PAYMENT_ID}/validate_otp/`,
        {
          otp_code: TestConstants.DIRECT_DEBIT_PAYMENT_OTP_CODE,
        },
      )
      .reply(200, TestConstants.VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE);
    nock(x.opts.xenditURL)
      .get(`/direct_debits/${TestConstants.DIRECT_DEBIT_PAYMENT_ID}`)
      .reply(200, TestConstants.VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE);
    nock(x.opts.xenditURL)
      .get(`/direct_debits?reference_id=${TestConstants.REFERENCE_ID}`)
      .reply(200, TestConstants.VALID_DIRECT_DEBIT_PAYMENT_ARRAY);
  });

  describe('createDirectDebitPayment', () => {
    it('should create direct debit payment', done => {
      expect(
        dd.createDirectDebitPayment({
          idempotencyKey: TestConstants.IDEMPOTENCY_KEY,
          referenceID: TestConstants.REFERENCE_ID,
          paymentMethodID: TestConstants.PAYMENT_METHOD_ID,
          currency: TestConstants.CURRENCY,
          amount: TestConstants.AMOUNT,
          callbackURL: TestConstants.PAYMENT_CALLBACK_URL,
          enableOTP: true,
          basket: [
            {
              referenceID: 'product-ref-id-ex-1',
              name: 'product 1',
              market: TestConstants.COUNTRY_CODE,
              type: TestConstants.PRODUCT_TYPE,
            },
            {
              referenceID: 'product-ref-id-ex-2',
              name: 'product 2',
              market: TestConstants.COUNTRY_CODE,
              type: TestConstants.PRODUCT_TYPE,
            },
          ],
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_CREATE_DIRECT_DEBIT_PAYMENT_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.createDirectDebitPayment({}))
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

  describe('validateOTPforPayment', () => {
    it('should validate direct debit payment using otp', done => {
      expect(
        dd.validateOTPforPayment({
          directDebitID: TestConstants.DIRECT_DEBIT_PAYMENT_ID,
          otpCode: TestConstants.DIRECT_DEBIT_PAYMENT_OTP_CODE,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.validateOTPforPayment({}))
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

  describe('getDirectDebitPaymentStatusByID', () => {
    it('should retrieve direct debit payment status by ID', done => {
      expect(
        dd.getDirectDebitPaymentStatusByID({
          directDebitID: TestConstants.DIRECT_DEBIT_PAYMENT_ID,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.getDirectDebitPaymentStatusByID({}))
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

  describe('getDirectDebitPaymentStatusByReferenceID', () => {
    it('should retrieve direct debit payment status by reference ID', done => {
      expect(
        dd.getDirectDebitPaymentStatusByReferenceID({
          referenceID: TestConstants.REFERENCE_ID,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_DIRECT_DEBIT_PAYMENT_ARRAY,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(dd.getDirectDebitPaymentStatusByReferenceID({}))
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
