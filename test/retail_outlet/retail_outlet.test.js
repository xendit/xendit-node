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

const { RetailOutlet } = x;
let ro = new RetailOutlet({});
beforeEach(function() {
  ro = new RetailOutlet({});
});
before(function() {
  nock(ro.API_ENDPOINT)
    .post('/', {
      external_id: TestConstants.EXT_ID,
      retail_outlet_name: TestConstants.ALFMART_RETAIL_OUTLET_NAME,
      name: TestConstants.NAME,
      expected_amount: TestConstants.AMOUNT,
    })
    .reply(200, TestConstants.FIXED_PAYMENT_CODE_DETAILS)
    .get(`/${TestConstants.FIXED_PAYMENT_CODE_ID}`)
    .reply(200, TestConstants.FIXED_PAYMENT_CODE_DETAILS)
    .get(`/${TestConstants.FIXED_PAYMENT_CODE_ID}/payments`)
    .reply(200, TestConstants.PAYMENTS_BY_FIXED_PAYMENT_CODE_ID)
    .patch(`/${TestConstants.FIXED_PAYMENT_CODE_ID}`, {
      expected_amount: TestConstants.UPDATED_AMOUNT,
    })
    .reply(200, TestConstants.UPDATED_FIXED_PAYMENT_CODE_DETAILS);
});

describe('Retaiil Outlet Service', () => {
  describe('createFixedPaymentCode', () => {
    it('should create a fixed payment code', done => {
      expect(
        ro.createFixedPaymentCode({
          externalID: TestConstants.EXT_ID,
          retailOutletName: TestConstants.ALFMART_RETAIL_OUTLET_NAME,
          name: TestConstants.NAME,
          expectedAmt: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.FIXED_PAYMENT_CODE_DETAILS)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(ro.createFixedPaymentCode({}))
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

  describe('getFixedPaymentCode', () => {
    it('should retrieve fixed payment code details', done => {
      expect(
        ro.getFixedPaymentCode({ id: TestConstants.FIXED_PAYMENT_CODE_ID }),
      )
        .to.eventually.deep.equal(TestConstants.FIXED_PAYMENT_CODE_DETAILS)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(ro.getFixedPaymentCode({}))
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

  describe('getPaymentsByFixedPaymentCodeId', () => {
    it('should retrieve payments by fixed payment code id', done => {
      expect(
        ro.getPaymentsByFixedPaymentCodeId({
          id: TestConstants.FIXED_PAYMENT_CODE_ID,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.PAYMENTS_BY_FIXED_PAYMENT_CODE_ID,
        )
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(ro.getPaymentsByFixedPaymentCodeId({}))
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

  describe('updateFixedPaymentCode', () => {
    it('should update a fixed payment code', done => {
      expect(
        ro.updateFixedPaymentCode({
          id: TestConstants.FIXED_PAYMENT_CODE_ID,
          expectedAmt: TestConstants.UPDATED_AMOUNT,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.UPDATED_FIXED_PAYMENT_CODE_DETAILS,
        )
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(ro.updateFixedPaymentCode({}))
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
});
