const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');
const Xendit = require('../../src/xendit');
const {
  CREATE_PAYMENT_REQUEST_SUCCESS_RESPONSE,
  CREATE_PAYMENT_REQUEST_MISSING_AMOUNT_RESPONSE,
  CONFIRM_PAYMENT_REQUEST_SUCCESS_RESPONSE,
  RESEND_PAYMENT_REQUEST_SUCCESS_RESPONSE,
  GET_PAYMENT_REQUEST_BY_ID_SUCCESS_RESPONSE,
  LIST_PAYMENT_REQUEST_SUCCESS_RESPONSE,
} = require('./constants');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

chai.use(chaiAsProm);

const { PaymentRequest } = x;
let pr = new PaymentRequest({});
before(function() {
  nock(x.opts.xenditURL)
    .post('/payment_requests', {
      currency: 'IDR',
      amount: 100000,
      payment_method: {
        id: 'pm-6d1c8be4-f4d9-421c-9f0b-dh4rm4',
        type: 'EWALLET',
        reusability: 'ONE_TIME_USE',
        status: 'ACTIVE',
        ewallet: {
          channel_code: 'SHOPEEPAY',
          channel_properties: {
            success_return_url: 'https://your-redirect-website.com/success',
          },
        },
      },
    })
    .reply(201, CREATE_PAYMENT_REQUEST_SUCCESS_RESPONSE)
    .post('/payment_requests/pr-6e9778ea-7d62-40fe-8b25-a4d740754c5f/auth')
    .reply(200, CONFIRM_PAYMENT_REQUEST_SUCCESS_RESPONSE)
    .post(
      '/payment_requests/pr-6e9778ea-7d62-40fe-8b25-a4d740754c5f/auth/resend',
    )
    .reply(200, RESEND_PAYMENT_REQUEST_SUCCESS_RESPONSE)
    .get('/payment_requests/pr-6e9778ea-7d62-40fe-8b25-a4d740754c5f')
    .reply(200, GET_PAYMENT_REQUEST_BY_ID_SUCCESS_RESPONSE)
    .get('/payment_requests?type=DIRECT_DEBIT&status=SUCCESS')
    .reply(200, LIST_PAYMENT_REQUEST_SUCCESS_RESPONSE);
});

describe('Payment Request Service', () => {
  describe('create payments request', () => {
    it('should get a response of payment request created', done => {
      expect(
        pr.createPaymentRequest({
          currency: 'IDR',
          amount: 100000,
          payment_method: {
            id: 'pm-6d1c8be4-f4d9-421c-9f0b-dh4rm4',
            type: 'EWALLET',
            reusability: 'ONE_TIME_USE',
            status: 'ACTIVE',
            ewallet: {
              channel_code: 'SHOPEEPAY',
              channel_properties: {
                success_return_url: 'https://your-redirect-website.com/success',
              },
            },
          },
        }),
      )
        .to.eventually.deep.equal(CREATE_PAYMENT_REQUEST_SUCCESS_RESPONSE)
        .and.notify(done);
    });
    it('should reject with missing field', done => {
      expect(
        pr.createPaymentRequest({
          currency: 'IDR',
          payment_method: {
            id: 'pm-6d1c8be4-f4d9-421c-9f0b-dh4rm4',
            type: 'EWALLET',
            reusability: 'ONE_TIME_USE',
            status: 'ACTIVE',
            ewallet: {
              channel_code: 'SHOPEEPAY',
              channel_properties: {
                success_return_url: 'https://your-redirect-website.com/success',
              },
            },
          },
        }),
      )
        .to.eventually.deep.equal(
          CREATE_PAYMENT_REQUEST_MISSING_AMOUNT_RESPONSE,
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
  describe('confirm payments request', () => {
    it('should get a response of payment request confirmed', done => {
      expect(
        pr.confirmPaymentRequest({
          id: 'pr-6e9778ea-7d62-40fe-8b25-a4d740754c5f',
          auth_code: '1234',
        }),
      )
        .to.eventually.deep.equal(CONFIRM_PAYMENT_REQUEST_SUCCESS_RESPONSE)
        .and.notify(done);
    });
  });
  describe('resend payments request', () => {
    it('should get a response of payment request confirmed', done => {
      expect(
        pr.resendPaymentRequest({
          id: 'pr-6e9778ea-7d62-40fe-8b25-a4d740754c5f',
        }),
      )
        .to.eventually.deep.equal(RESEND_PAYMENT_REQUEST_SUCCESS_RESPONSE)
        .and.notify(done);
    });
  });
  describe('get payments request by id', () => {
    it('should get a response of payment request by id', done => {
      expect(
        pr.getPaymentRequestById({
          id: 'pr-6e9778ea-7d62-40fe-8b25-a4d740754c5f',
        }),
      )
        .to.eventually.deep.equal(GET_PAYMENT_REQUEST_BY_ID_SUCCESS_RESPONSE)
        .and.notify(done);
    });
  });
  describe('list payments request by id', () => {
    it('should get a list of payment request', done => {
      expect(
        pr.listPaymentRequest({
          type: 'DIRECT_DEBIT',
          status: 'SUCCESS',
        }),
      )
        .to.eventually.deep.equal(LIST_PAYMENT_REQUEST_SUCCESS_RESPONSE)
        .and.notify(done);
    });
  });
});
