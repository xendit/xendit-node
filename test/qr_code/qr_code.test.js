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

const { QrCode } = x;
let qrcode = new QrCode({});
beforeEach(function() {
  qrcode = new QrCode({});
});
before(function() {
  nock(qrcode.API_ENDPOINT)
    .post('/', {
      external_id: TestConstants.EXT_ID,
      amount: TestConstants.AMOUNT,
      callback_url: TestConstants.CALLBACK_URL,
      type: TestConstants.TYPE,
    })
    .reply(200, TestConstants.VALID_CREATE_CODE_RESPONSE);
  nock(qrcode.API_ENDPOINT)
    .get(`/${TestConstants.EXT_ID}`)
    .reply(200, TestConstants.VALID_CREATE_CODE_RESPONSE);
  nock(qrcode.API_ENDPOINT)
    .get(`/${TestConstants.EXT_ID}/payments`)
    .reply(200, TestConstants.VALID_PAYMENT_ARRAY);
  nock(qrcode.API_ENDPOINT)
    .post(`/${TestConstants.EXT_ID}/payments/simulate`)
    .reply(200, TestConstants.VALID_PAYMENT);
});

describe('QrCode Service', function() {
  describe('creatCode', () => {
    it('should create a QR code', done => {
      expect(
        qrcode.createCode({
          externalID: TestConstants.EXT_ID,
          type: TestConstants.TYPE,
          callbackURL: TestConstants.CALLBACK_URL,
          amount: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_CODE_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(qrcode.createCode({}))
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

  describe('getCode', () => {
    it('should get a QR code', done => {
      expect(qrcode.getCode({ externalID: TestConstants.EXT_ID }))
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_CODE_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(qrcode.getCode({}))
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

  describe('getPayments', () => {
    it('should get an array of payments', done => {
      expect(qrcode.getPayments({ externalID: TestConstants.EXT_ID }))
        .to.eventually.deep.equal(TestConstants.VALID_PAYMENT_ARRAY)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(qrcode.getPayments({}))
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

  describe('simulate', () => {
    it('should simulate a payment', done => {
      expect(qrcode.simulate({ externalID: TestConstants.EXT_ID }))
        .to.eventually.deep.equal(TestConstants.VALID_PAYMENT)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(qrcode.simulate({}))
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
});
