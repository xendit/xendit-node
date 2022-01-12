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
      .post('/ewallets/charges', {
        reference_id: TestConstants.REFERENCE_ID,
        currency: TestConstants.CURRENCY,
        amount: TestConstants.AMOUNT,
        checkout_method: TestConstants.CHECKOUT_METHOD,
        channel_code: TestConstants.CHANNEL_CODE,
        channel_properties: {
          mobile_number: TestConstants.PHONE,
        },
        basket: null,
      })
      .reply(200, TestConstants.VALID_EWALLET_PAYMENT_CHARGE);
    nock(x.opts.xenditURL)
      .get(`/ewallets/charges/${TestConstants.CHARGE_ID}`)
      .reply(200, TestConstants.VALID_EWALLET_PAYMENT_CHARGE);
    nock(x.opts.xenditURL)
      .post(`/ewallets/charges/${TestConstants.CHARGE_ID}/void`)
      .reply(200, TestConstants.VALID_EWALLET_PAYMENT_CHARGE);
  });

  describe('createEWalletCharge', () => {
    it('should create a ewallet payment charge', done => {
      expect(
        ew.createEWalletCharge({
          referenceID: TestConstants.REFERENCE_ID,
          currency: TestConstants.CURRENCY,
          amount: TestConstants.AMOUNT,
          checkoutMethod: TestConstants.CHECKOUT_METHOD,
          channelCode: TestConstants.CHANNEL_CODE,
          channelProperties: {
            mobileNumber: TestConstants.PHONE,
          },
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_EWALLET_PAYMENT_CHARGE)
        .then(() => done())
        .catch(e => done(e));
    });

    it('should report missing required fields', done => {
      expect(ew.createEWalletCharge({}))
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

  describe('getEWalletChargeStatus', () => {
    it('should get ewallet payment charge', done => {
      expect(
        ew.getEWalletChargeStatus({
          chargeID: TestConstants.CHARGE_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_EWALLET_PAYMENT_CHARGE)
        .then(() => done())
        .catch(e => done(e));
    });
    it('should report missing required fields', done => {
      expect(ew.getEWalletChargeStatus({}))
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

  describe('voidEWalletCharge', () => {
    it('should void an ewallet payment charge', done => {
      expect(
        ew.voidEWalletCharge({
          chargeID: TestConstants.CHARGE_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_EWALLET_PAYMENT_CHARGE)
        .then(() => done())
        .catch(e => done(e));
    });

    it('should report missing required fields', done => {
      expect(ew.voidEWalletCharge({}))
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
