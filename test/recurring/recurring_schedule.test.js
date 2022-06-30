const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Recurring } = x;
  let recurring = new Recurring({});

  beforeEach(() => {
    recurring = new Recurring({});
  });

  before(() => {
    nock(recurring.API_ENDPOINT_SCHEDULES)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .post('/', {
        reference_id: TestConstants.REF_ID,
        interval: TestConstants.INTERVAL,
        interval_count: TestConstants.INTERVAL_COUNT,
        total_recurrence: TestConstants.INTERVAL_COUNT + 2,
        anchor_date: TestConstants.ANCHOR_DATE,
        retry_interval: TestConstants.INTERVAL,
        retry_interval_count: TestConstants.INTERVAL_COUNT,
        total_retry: TestConstants.INTERVAL_COUNT,
        failed_attempt_notifications: [TestConstants.INTERVAL_COUNT],
      })
      .reply(201, TestConstants.SCHEDULE_DETAILS);

    nock(recurring.API_ENDPOINT_SCHEDULES)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .get(`/${TestConstants.SCHEDULE_ID}`)
      .reply(200, TestConstants.SCHEDULE_DETAILS);

    nock(recurring.API_ENDPOINT_SCHEDULES)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .matchHeader(
        'update-scheduled-cycle',
        TestConstants.UPDATE_SCHEDULED_CYCLE,
      )
      .patch(`/${TestConstants.SCHEDULE_ID}`, {
        interval: TestConstants.INTERVAL,
        interval_count: TestConstants.INTERVAL_COUNT + 1,
      })
      .reply(200, TestConstants.UPDATED_SCHEDULE_DETAILS);
  });

  describe('createSchedule', () => {
    it('should create a recurring schedule', done => {
      expect(
        recurring.createSchedule({
          referenceId: TestConstants.REF_ID,
          interval: TestConstants.INTERVAL,
          businessId: TestConstants.BUSINESS_ID,
          intervalCount: TestConstants.INTERVAL_COUNT,
          totalRecurrence: TestConstants.INTERVAL_COUNT + 2,
          anchorDate: TestConstants.ANCHOR_DATE,
          retryInterval: TestConstants.INTERVAL,
          retryIntervalCount: TestConstants.INTERVAL_COUNT,
          totalRetry: TestConstants.INTERVAL_COUNT,
          failedAttemptNotifications: [TestConstants.INTERVAL_COUNT],
        }),
      )
        .to.eventually.deep.equal(TestConstants.SCHEDULE_DETAILS)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(recurring.createSchedule({}))
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

  describe('getSchedule', () => {
    it('should be able to retrieve schedule details', done => {
      expect(
        recurring.getSchedule({
          id: TestConstants.SCHEDULE_ID,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.SCHEDULE_DETAILS)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(recurring.getSchedule({}))
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

  describe('editSchedule', () => {
    it('should be able to update schedule details', done => {
      expect(
        recurring.editSchedule({
          id: TestConstants.SCHEDULE_ID,
          businessId: TestConstants.BUSINESS_ID,
          interval: TestConstants.INTERVAL,
          intervalCount: TestConstants.INTERVAL_COUNT + 1,
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_SCHEDULE_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(recurring.editSchedule({}))
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
