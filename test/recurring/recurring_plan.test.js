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
      .post('/', {
        reference_id: TestConstants.REF_ID,
        customer_id: TestConstants.CUSTOMER_ID,
        recurring_action: Recurring.recurringAction.payment,
        currency: TestConstants.CURRENCY,
        amount: TestConstants.AMOUNT,
        payment_methods: [
          { payment_method_id: TestConstants.PAYMENT_METHOD_ID, rank: 1 },
        ],
        schedule_id: 'sch-123',
        immediate_action_type: Recurring.immediateActionType.fullAmount,
        notification_config: {
          recurring_created: [Recurring.notificationChannel.email],
          recurring_succeeded: [Recurring.notificationChannel.sms],
          recurring_failed: [Recurring.notificationChannel.whatsapp],
          locale: Recurring.locale.en,
        },
        failed_cycle_action: Recurring.failedCycleAction.resume,
        metadata: { foo: 'bar' },
        description: 'baz',
      })
      .reply(201, TestConstants.PLAN_DETAILS);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .post('/', {
        reference_id: TestConstants.REF_ID,
        customer_id: TestConstants.CUSTOMER_ID,
        recurring_action: Recurring.recurringAction.payment,
        currency: TestConstants.CURRENCY,
        amount: TestConstants.AMOUNT,
        payment_methods: [
          { payment_method_id: TestConstants.PAYMENT_METHOD_ID, rank: 1 },
        ],
        schedule: {
          reference_id: `schedule-${TestConstants.REF_ID}`,
          interval: TestConstants.INTERVAL,
          interval_count: TestConstants.INTERVAL_COUNT,
        },
      })
      .reply(201, TestConstants.PLAN_DETAILS);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .get(`/${TestConstants.PLAN_ID}`)
      .reply(200, TestConstants.PLAN_DETAILS);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .matchHeader(
        'update-scheduled-cycle',
        TestConstants.UPDATE_SCHEDULED_CYCLE,
      )
      .patch(`/${TestConstants.PLAN_ID}`, {
        amount: TestConstants.UPDATED_AMOUNT,
      })
      .reply(200, TestConstants.UPDATED_PLAN_DETAILS);
    nock(rp.API_ENDPOINT_PLANS)
      .matchHeader('business-id', TestConstants.BUSINESS_ID)
      .post(`/${TestConstants.PLAN_ID}/deactivate`)
      .reply(200, TestConstants.PLAN_DETAILS);
  });

  describe('createPlan', () => {
    it('should create a recurring plan with schedule_id', done => {
      expect(
        rp.createPlan({
          referenceId: TestConstants.REF_ID,
          businessId: TestConstants.BUSINESS_ID,
          customerId: TestConstants.CUSTOMER_ID,
          recurringAction: Recurring.recurringAction.payment,
          currency: TestConstants.CURRENCY,
          amount: TestConstants.AMOUNT,
          paymentMethods: [
            { paymentMethodId: TestConstants.PAYMENT_METHOD_ID, rank: 1 },
          ],
          scheduleId: 'sch-123',
          immediateActionType: Recurring.immediateActionType.fullAmount,
          notificationConfig: {
            recurringCreated: [Recurring.notificationChannel.email],
            recurringSucceeded: [Recurring.notificationChannel.sms],
            recurringFailed: [Recurring.notificationChannel.whatsapp],
            locale: Recurring.locale.en,
          },
          failedCycleAction: Recurring.failedCycleAction.resume,
          metadata: { foo: 'bar' },
          description: 'baz',
        }),
      )
        .to.eventually.deep.equal(TestConstants.PLAN_DETAILS)
        .and.notify(done);
    });
    it('should create a recurring plan with schedule', done => {
      expect(
        rp.createPlan({
          referenceId: TestConstants.REF_ID,
          businessId: TestConstants.BUSINESS_ID,
          customerId: TestConstants.CUSTOMER_ID,
          recurringAction: Recurring.recurringAction.payment,
          currency: TestConstants.CURRENCY,
          amount: TestConstants.AMOUNT,
          paymentMethods: [
            { paymentMethodId: TestConstants.PAYMENT_METHOD_ID, rank: 1 },
          ],
          schedule: {
            referenceId: `schedule-${TestConstants.REF_ID}`,
            businessId: TestConstants.BUSINESS_ID,
            interval: TestConstants.INTERVAL,
            intervalCount: TestConstants.INTERVAL_COUNT,
          },
        }),
      )
        .to.eventually.deep.equal(TestConstants.PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.createPlan({}))
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

  describe('getPlan', () => {
    it('should be able to retrieve plan details', done => {
      expect(
        rp.getPlan({
          id: TestConstants.PLAN_ID,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.getPlan({ id: TestConstants.PLAN_ID }))
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

  describe('deactivatePlan', () => {
    it('should be able to deactivate plan', done => {
      expect(
        rp.deactivatePlan({
          id: TestConstants.PLAN_ID,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.deactivatePlan({ id: TestConstants.PLAN_ID }))
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

  describe('editPlan', () => {
    it('should be able to update plan details', done => {
      expect(
        rp.editPlan({
          id: TestConstants.PLAN_ID,
          amount: TestConstants.UPDATED_AMOUNT,
          businessId: TestConstants.BUSINESS_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.editPlan({ id: TestConstants.PLAN_ID }))
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
