const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { RecurringPlan } = x;
  let rp = new RecurringPlan({});
  beforeEach(function() {
    rp = new RecurringPlan({});
  });
  before(function() {
    nock(rp.API_ENDPOINT)
      .post('/', {
        reference_id: TestConstants.REF_ID,
        customer_id: TestConstants.CUSTOMER_ID,
        recurring_action: RecurringPlan.recurringAction.payment,
        currency: TestConstants.CURRENCY,
        amount: TestConstants.AMOUNT,
        payment_methods: [
          { payment_method_id: TestConstants.PAYMENT_METHOD_ID, rank: 1 },
        ],
        schedule_id: 'sch-123',
        immediate_action_type: RecurringPlan.immediateActionType.fullAmount,
        notification_config: {
          recurring_created: [RecurringPlan.notificationChannel.email],
          recurring_succeeded: [RecurringPlan.notificationChannel.sms],
          recurring_failed: [RecurringPlan.notificationChannel.whatsapp],
          locale: RecurringPlan.locale.en,
        },
        failed_cycle_action: RecurringPlan.failedCycleAction.resume,
        metadata: { foo: 'bar' },
        description: 'baz',
      })
      .reply(201, TestConstants.PLAN_DETAILS);
    nock(rp.API_ENDPOINT)
      .get(`/${TestConstants.PLAN_ID}`)
      .reply(200, TestConstants.PLAN_DETAILS);
    nock(rp.API_ENDPOINT)
      .patch(`/${TestConstants.PLAN_ID}`, {
        amount: TestConstants.UPDATED_AMOUNT,
      })
      .reply(200, TestConstants.UPDATED_PLAN_DETAILS);
    nock(rp.API_ENDPOINT)
      .post(`/${TestConstants.PLAN_ID}/deactivate`)
      .reply(200, TestConstants.PLAN_DETAILS);
  });

  describe('createPlan', () => {
    it('should create a recurring plan', done => {
      expect(
        rp.createPlan({
          referenceId: TestConstants.REF_ID,
          customerId: TestConstants.CUSTOMER_ID,
          recurringAction: RecurringPlan.recurringAction.payment,
          currency: TestConstants.CURRENCY,
          amount: TestConstants.AMOUNT,
          paymentMethods: [
            { paymentMethodId: TestConstants.PAYMENT_METHOD_ID, rank: 1 },
          ],
          scheduleId: 'sch-123',
          immediateActionType: RecurringPlan.immediateActionType.fullAmount,
          notificationConfig: {
            recurringCreated: [RecurringPlan.notificationChannel.email],
            recurringSucceeded: [RecurringPlan.notificationChannel.sms],
            recurringFailed: [RecurringPlan.notificationChannel.whatsapp],
            locale: RecurringPlan.locale.en,
          },
          failedCycleAction: RecurringPlan.failedCycleAction.resume,
          metadata: { foo: 'bar' },
          description: 'baz',
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
      expect(rp.getPlan({ id: TestConstants.PLAN_ID }))
        .to.eventually.deep.equal(TestConstants.PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.getPlan({}))
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
      expect(rp.deactivatePlan({ id: TestConstants.PLAN_ID }))
        .to.eventually.deep.equal(TestConstants.PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.deactivatePlan({}))
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
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_PLAN_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(rp.editPlan({}))
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
