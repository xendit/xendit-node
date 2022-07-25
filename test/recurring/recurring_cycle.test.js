const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Recurring } = x;
  let rp = new Recurring({});
  beforeEach(function() {
    rp = new Recurring({});
  });
  before(function() {
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .get(`/${TestConstants.PLAN_ID}/cycles/${TestConstants.CYCLE_ID}`)
      .reply(200, TestConstants.CYCLE_DETAILS);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .get(
        // eslint-disable-next-line max-len
        `/${TestConstants.PLAN_ID}/cycles?limit=${TestConstants.CYCLES_FILTER.limit}&before_id=${TestConstants.CYCLES_FILTER.beforeId}&after_id=${TestConstants.CYCLES_FILTER.afterId}`,
      )
      .reply(200, [TestConstants.CYCLE_DETAILS]);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .get(
        // eslint-disable-next-line max-len
        `/${TestConstants.PLAN_ID}/cycles?search_type=${TestConstants.CYCLES_FILTER.search_type_id}&search_value=${TestConstants.CYCLES_FILTER.search_value_id}`,
      )
      .reply(200, [TestConstants.CYCLE_DETAILS]);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .get(
        // eslint-disable-next-line max-len
        `/${TestConstants.PLAN_ID}/cycles?search_type=${TestConstants.CYCLES_FILTER.search_type_reference_id}&search_value=${TestConstants.CYCLES_FILTER.search_value_reference_id}`,
      )
      .reply(200, [TestConstants.CYCLE_DETAILS]);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .patch(`/${TestConstants.PLAN_ID}/cycles/${TestConstants.CYCLE_ID}`, {
        scheduled_timestamp: TestConstants.SCHEDULED_TIMESTAMP,
        currency: TestConstants.CURRENCY,
        amount: TestConstants.UPDATED_AMOUNT,
        metadata: { foo: 'bar' },
      })
      .reply(200, TestConstants.UPDATED_CYCLE_DETAILS);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .post(`/${TestConstants.PLAN_ID}/cycles/${TestConstants.CYCLE_ID}/cancel`)
      .reply(200, TestConstants.CYCLE_DETAILS);
  });

  describe('getCycle', () => {
    it('should be able to retrieve cycle details', done => {
      expect(
        rp.getCycle({
          id: TestConstants.CYCLE_ID,
          planId: TestConstants.PLAN_ID,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.CYCLE_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.getCycle({ id: TestConstants.CYCLE_ID }))
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e.status).to.eq(400),
            expect(e.code).to.eq(Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });

  describe('getAllCycles', () => {
    it('should be able to retrieve cycles list', done => {
      expect(
        rp.getAllCycles({
          id: TestConstants.CYCLE_ID,
          businessId: TestConstants.BUSINESS_ID,
          planId: TestConstants.PLAN_ID,
          limit: TestConstants.CYCLES_FILTER.limit,
          beforeId: TestConstants.CYCLES_FILTER.beforeId,
          afterId: TestConstants.CYCLES_FILTER.afterId,
        }),
      )
        .to.eventually.deep.equal([TestConstants.CYCLE_DETAILS])
        .and.notify(done);
    });
    it('should be able to search cycles by id', done => {
      expect(
        rp.getAllCycles({
          id: TestConstants.CYCLE_ID,
          businessId: TestConstants.BUSINESS_ID,
          planId: TestConstants.PLAN_ID,
          searchType: TestConstants.CYCLES_FILTER.search_type_id,
          searchValue: TestConstants.CYCLES_FILTER.search_value_id,
        }),
      )
        .to.eventually.deep.equal([TestConstants.CYCLE_DETAILS])
        .and.notify(done);
    });
    it('should be able to search cycles by reference_id', done => {
      expect(
        rp.getAllCycles({
          id: TestConstants.CYCLE_ID,
          businessId: TestConstants.BUSINESS_ID,
          planId: TestConstants.PLAN_ID,
          searchType: TestConstants.CYCLES_FILTER.search_type_reference_id,
          searchValue: TestConstants.CYCLES_FILTER.search_value_reference_id,
        }),
      )
        .to.eventually.deep.equal([TestConstants.CYCLE_DETAILS])
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.getPlan({ id: TestConstants.CYCLE_ID }))
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e.status).to.eq(400),
            expect(e.code).to.eq(Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });

  describe('cancelCycle', () => {
    it('should be able to cancel cycle', done => {
      expect(
        rp.cancelCycle({
          id: TestConstants.CYCLE_ID,
          planId: TestConstants.PLAN_ID,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.CYCLE_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(
        rp.cancelCycle({
          id: TestConstants.CYCLE_ID,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e.status).to.eq(400),
            expect(e.code).to.eq(Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });

  describe('editCycle', () => {
    it('should be able to update cycle details', done => {
      expect(
        rp.editCycle({
          id: TestConstants.CYCLE_ID,
          planId: TestConstants.PLAN_ID,
          businessId: TestConstants.BUSINESS_ID,
          scheduledTimestamp: TestConstants.SCHEDULED_TIMESTAMP,
          currency: TestConstants.CURRENCY,
          amount: TestConstants.UPDATED_AMOUNT,
          metadata: { foo: 'bar' },
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_CYCLE_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.editCycle({ id: TestConstants.CYCLE_ID }))
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e.status).to.eq(400),
            expect(e.code).to.eq(Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });
};
