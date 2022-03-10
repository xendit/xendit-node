/* eslint-disable no-console */
const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

const exampledBusinessId = '6066ebf68204c740b61aa3c1';

let scheduleId;
let planId;

async function runSchedules() {
  const createdSchedule = await r.createSchedule({
    referenceId: exampledReferenceId,
    businessId: exampledBusinessId,
    interval: 'DAY',
    intervalCount: 1,
    totalRecurrence: 3,
    anchorDate: '2022-01-01T00:00:00.001Z',
    retryInterval: 'DAY',
    retryIntervalCount: 1,
    totalRetry: 1,
    failedAttemptNotifications: [1],
  });
  scheduleId = createdSchedule.id;

  console.log('created recurring schedule:', createdSchedule);

  const schedule = await r.getSchedule({
    id: createdSchedule.id,
    businessId: exampledBusinessId,
  });

  // eslint-disable-next-line no-console
  console.log('recurring schedule:', schedule);

  const editedSchedule = await r.editSchedule({
    id: schedule.id,
    businessId: exampledBusinessId,
    interval: 'MONTH',
  });

  // eslint-disable-next-line no-console
  console.log('edited recurring schedule:', editedSchedule);
}

async function runPlans() {
  const createdPlan = await r.createPlan({
    businessId: exampledBusinessId,
    referenceId: exampledReferenceId,
    customerId: exampledCustomerId,
    recurringAction: 'PAYMENT',
    currency: 'IDR',
    amount: 1000,
    paymentMethods: [
      {
        payment_method_id: exampledPaymentMethodId,
        rank: 1,
      },
    ],
    scheduleId: scheduleId,
    immediateActionType: null,
    notification_config: {
      recurring_created: ['SMS'],
      recurring_succeeded: ['SMS'],
      recurring_failed: ['SMS'],
    },
    failedCycleAction: 'STOP',
    metadata: null,
  });
  planId = createdPlan.id;

  // eslint-disable-next-line no-console
  console.log('created recurring plan:', createdPlan);

  const plan = await r.getPlan({
    id: createdPlan.id,
    businessId: exampledBusinessId,
  });

  // eslint-disable-next-line no-console
  console.log('recurring plan:', plan);

  const editedPlan = await r.editPlan({
    id: plan.id,
    businessId: exampledBusinessId,
    amount: 1000,
  });

  // eslint-disable-next-line no-console
  console.log('edited recurring plan:', editedPlan);

  const deactivatedPlan = await r.deactivatePlan({
    id: plan.id,
    businessId: plan.business_id,
  });

  // eslint-disable-next-line no-console
  console.log('deactivated recurring plan:', deactivatedPlan);
}

async function runCycles() {
  const response = await r.getAllCycles({
    planId: planId,
    businessId: exampledBusinessId,
    limit: 2,
  });

  // eslint-disable-next-line no-console
  console.log('recurring cycles:', response.data);
  // eslint-disable-next-line no-console
  console.log('has more recurring cycles:', response.has_more);

  const cycle = await r.getCycle({
    id: response.data[0].id,
    planId: planId,
    businessId: exampledBusinessId,
  });

  // eslint-disable-next-line no-console
  console.log('recurring cycle:', cycle);

  const editedCycle = await r.editCycle({
    id: cycle.id,
    planId: planId,
    businessId: exampledBusinessId,
    amount: 1000,
  });

  // eslint-disable-next-line no-console
  console.log('edited recurring cycle:', editedCycle);

  const canceledCycle = await r.cancelCycle({
    id: cycle.id,
    planId: cycle.plan_id,
    businessId: exampledBusinessId,
  });

  // eslint-disable-next-line no-console
  console.log('canceled recurring cycle:', canceledCycle);
}

(async function() {
  try {
    await runSchedules();
    await runPlans();
    await runCycles();
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
