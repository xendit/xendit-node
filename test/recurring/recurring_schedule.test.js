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
    nock(recurring.API_RECURRING)
      .post(
        '/schedules',
        JSON.stringify({
          reference_id: TestConstants.REF_ID,
          interval: TestConstants.INTERVAL,
          interval_count: TestConstants.INTERVAL_COUNT,
          total_recurrence: TestConstants.INTERVAL_COUNT + 2,
          anchor_date: TestConstants.ANCHOR_DATE,
          retry_interval: TestConstants.INTERVAL,
          retry_interval_count: TestConstants.INTERVAL_COUNT,
          total_retry: TestConstants.INTERVAL_COUNT,
          failed_attempt_notifications: [TestConstants.INTERVAL_COUNT],
        }),
      )
      .reply(201, TestConstants.SCHEDULE_DETAILS);

    nock(recurring.API_RECURRING)
      .get(`/schedules/${TestConstants.SCHEDULE_ID}`)
      .reply(200, TestConstants.SCHEDULE_DETAILS);

    nock(recurring.API_RECURRING)
      .patch(`/schedules/${TestConstants.SCHEDULE_ID}`, {
        interval: TestConstants.INTERVAL,
        interval_count: TestConstants.INTERVAL_COUNT,
      })
      .reply(200, TestConstants.UPDATED_SCHEDULE_DETAILS);
  });

  describe('createSchedule', () => {
    it('should create a recurring schedule', done => {
      expect(
        recurring.createSchedule({
          reference_id: TestConstants.REF_ID,
          interval: TestConstants.INTERVAL,
          business_id: TestConstants.BUSINESS_ID,
          interval_count: TestConstants.INTERVAL_COUNT,
          total_recurrence: TestConstants.INTERVAL_COUNT + 2,
          anchor_date: TestConstants.ANCHOR_DATE,
          retry_interval: TestConstants.INTERVAL,
          retry_interval_count: TestConstants.INTERVAL_COUNT,
          total_retry: TestConstants.INTERVAL_COUNT,
          failed_attempt_notifications: [TestConstants.INTERVAL_COUNT],
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
          business_id: TestConstants.BUSINESS_ID,
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

  describe('updateSchedule', () => {
    it('should be able to update schedule details', done => {
      expect(
        recurring.updateSchedule({
          id: TestConstants.SCHEDULE_ID,
          business_id: TestConstants.BUSINESS_ID,
          interval: TestConstants.INTERVAL,
          interval_count: TestConstants.INTERVAL_COUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_SCHEDULE_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(recurring.updateSchedule({}))
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
