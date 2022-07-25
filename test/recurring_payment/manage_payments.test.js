const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { RecurringPayment } = x;
  let rp = new RecurringPayment({});
  beforeEach(function() {
    rp = new RecurringPayment({});
  });
  before(function() {
    nock(rp.API_ENDPOINT)
      .post('/', {
        external_id: TestConstants.EXT_ID,
        payer_email: TestConstants.PAYER_EMAIL,
        description: TestConstants.DESCRIPTION,
        amount: TestConstants.AMOUNT,
        interval: TestConstants.INTERVAL,
        interval_count: TestConstants.INTERVAL_COUNT,
        start_date: TestConstants.START_DATE,
        customer: TestConstants.CUSTOMER,
      })
      .reply(201, TestConstants.PAYMENT_DETAILS);
    nock(rp.API_ENDPOINT)
      .get(`/${TestConstants.PAYMENT_ID}`)
      .reply(200, TestConstants.PAYMENT_DETAILS);
    nock(rp.API_ENDPOINT)
      .patch(`/${TestConstants.PAYMENT_ID}`, {
        amount: TestConstants.UPDATED_AMOUNT,
      })
      .reply(200, TestConstants.UPDATED_PAYMENT_DETAILS);
  });

  describe('createPayment', () => {
    it('should create a recurring payment', done => {
      expect(
        rp.createPayment({
          externalID: TestConstants.EXT_ID,
          payerEmail: TestConstants.PAYER_EMAIL,
          description: TestConstants.DESCRIPTION,
          amount: TestConstants.AMOUNT,
          interval: RecurringPayment.Interval.Month,
          intervalCount: TestConstants.INTERVAL_COUNT,
          startDate: new Date(TestConstants.PAYMENT_DETAILS.start_date),
          customer: TestConstants.CUSTOMER,
        }),
      )
        .to.eventually.deep.equal(TestConstants.PAYMENT_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.createPayment({}))
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

  describe('getPayment', () => {
    it('should be able to retrieve payment details', done => {
      expect(rp.getPayment({ id: TestConstants.PAYMENT_ID }))
        .to.eventually.deep.equal(TestConstants.PAYMENT_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.getPayment({}))
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

  describe('editPayment', () => {
    it('should be able to update payment details', done => {
      expect(
        rp.editPayment({
          id: TestConstants.PAYMENT_ID,
          amount: TestConstants.UPDATED_AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_PAYMENT_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.editPayment({}))
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
