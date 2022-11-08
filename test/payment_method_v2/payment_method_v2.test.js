const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');
const Xendit = require('../../src/xendit');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

chai.use(chaiAsProm);

const { PaymentMethodV2 } = x;
let p = new PaymentMethodV2({});
beforeEach(function() {
  p = new PaymentMethodV2({});
});
before(function() {
  nock(x.opts.xenditURL)
    .post('/v2/payment_methods', {
      type: 'QR_CODE',
      reusability: 'ONE_TIME_USE',
      qr_code: {
        channel_code: 'QRIS',
        amount: 10000,
      },
    })
    .reply(201, TestConstants.CREATE_PAYMENT_RESPONSE)
    .get('/v2/payment_methods')
    .reply(200, TestConstants.LIST_PAYMENT_METHOD_RESPONSE)
    .post('/v2/payment_methods/pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a/auth')
    .reply(200, TestConstants.PAYMENT_METHOD_AUTH_SUCCESS_RESPONSE)
    .get('/v2/payment_methods/pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a')
    .reply(200, TestConstants.GET_PAYMENT_METHOD_LIST_BY_ID_SUCCESS_RESPONSE)
    .patch('/v2/payment_methods/pm-4c85fd2c-29da-4bc4-b642-064a42727d89')
    .reply(200, TestConstants.UPDATE_PAYMENT_METHOD_SUCCESS_RESPONSE)
    .post('/v2/payment_methods/pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a/expire')
    .reply(200, TestConstants.EXPIRE_PAYMENT_METHOD_SUCCESS_RESPONSE)
    .get(
      '/v2/payment_methods/qrpy_0de1622b-677c-48c5-ac8c-ea1b9636c48f/payments',
    )
    .reply(
      200,
      TestConstants.LIST_PAYMENTS_BY_PAYMENT_METHOD_ID_SUCCESS_RESPONSE,
    );
});

describe('Payment Method V2 Service', () => {
  describe('create payments', () => {
    it('should get a response of payment created', done => {
      expect(
        p.createPaymentMethodV2({
          type: 'QR_CODE',
          reusability: 'ONE_TIME_USE',
          qr_code: {
            channel_code: 'QRIS',
            amount: 10000,
          },
        }),
      )
        .to.eventually.deep.equal(TestConstants.CREATE_PAYMENT_RESPONSE)
        .and.notify(done);
    });
    it('should reject with missing field', done => {
      expect(
        p.createPaymentMethodV2({
          reusability: 'ONE_TIME_USE',
          qr_code: {
            channel_code: 'QRIS',
            amount: 10000,
          },
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.CREATE_PAYMENT_MISSING_TYPE_RESPONSE,
        )
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
  describe('list payments', () => {
    it('should get a list of payment created', done => {
      expect(p.listPaymentMethodV2({}))
        .to.eventually.deep.equal(TestConstants.LIST_PAYMENT_METHOD_RESPONSE)
        .and.notify(done);
    });
  });
  describe('auth payments', () => {
    it('should get a success response of payment authorized', done => {
      expect(
        p.authorizePaymentMethodV2({
          auth_code: '12345',
          id: 'pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a',
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.PAYMENT_METHOD_AUTH_SUCCESS_RESPONSE,
        )
        .and.notify(done);
    });
  });
  describe('get payment method by id', () => {
    it('should get a response of payment method by id', done => {
      expect(
        p.getPaymentMethodByIdV2({
          id: 'pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a',
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.PAYMENT_METHOD_AUTH_SUCCESS_RESPONSE,
        )
        .and.notify(done);
    });
  });
  describe('update payment method', () => {
    it('should get a response of updated payment method by id', done => {
      expect(
        p.updatePaymentMethodV2({
          id: 'pm-4c85fd2c-29da-4bc4-b642-064a42727d89',
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.UPDATE_PAYMENT_METHOD_SUCCESS_RESPONSE,
        )
        .and.notify(done);
    });
  });
  describe('expire payment method', () => {
    it('should get a response of expired payment method by id', done => {
      expect(
        p.expirePaymentMethodV2({
          id: 'pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a',
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.EXPIRE_PAYMENT_METHOD_SUCCESS_RESPONSE,
        )
        .and.notify(done);
    });
  });
  describe('list payments by payment method', () => {
    it('should get a list of payments by payment method', done => {
      expect(
        p.listPaymentsByPaymentMethodIdV2({
          id: 'qrpy_0de1622b-677c-48c5-ac8c-ea1b9636c48f',
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.UPDATE_PAYMENT_METHOD_SUCCESS_RESPONSE,
        )
        .and.notify(done);
    });
  });
});
