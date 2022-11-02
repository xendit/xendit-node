const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');
const Xendit = require('../../src/xendit');
const { QUERY_STRING } = require('./constants');

const x = new Xendit({
  secretKey: 'xnd_production_ypr0UI6148UVBDHMJsHCUgF0Yff4XEjRSAzBvM626qPzHEBo45IRCBdqEHmmql',
});

chai.use(chaiAsProm);

const { PaymentMethodV2 } = x;
let p = new PaymentMethodV2({});
beforeEach(function () {
  p = new PaymentMethodV2({});
});
before(function () {
  nock(x.opts.xenditURL)
    .post('/v2/payment_method', {
      type: "QR_CODE",
      reusability: "ONE_TIME_USE",
      qr_code: {
        channel_code: "QRIS",
        amount: 10000
      }
    })
});

describe('Payment Method V2 Service', () => {
  describe('list payments', () => {
    it('should get a list of payments', done => {
      expect(
        p.createPaymentMethodV2({
          type: "QR_CODE",
          reusability: "ONE_TIME_USE",
          qr_code: {
            channel_code: "QRIS",
            amount: 10000
          }
        }),
      )
        .and.notify(done);
    });
  });
});
