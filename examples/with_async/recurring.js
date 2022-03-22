/* eslint-disable no-console */
const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

/**
 * Before running this example consider the following
 * 1. make sure to use a valid exampleCustomerId and examplePaymentMethodId
 * 2. After plan has been deactivated - it's scheduled cycles become cancelled
 *    which makes impossible to be edit or cancel them
 */
const exampleBusinessId = '6066ebf68204c740b61aa3c1';
const exampleReferenceId = 'cf53cdbb-f92d-4220-835d-b907915d9551';
const exampleCustomerId = 'ba0e4584-4fc4-4cb2-a835-6191500540ef';
const examplePaymentMethodId = 'pm-fb182048-7448-4ffe-877a-a29efa3d7195';
const scheduledTimestamp = new Date(Date.now() + 3600 * 1000).toISOString();

let scheduleId;
let planId;

async function runSchedules() {
  const createdSchedule = await r.createSchedule({
    referenceId: exampleReferenceId,
    businessId: exampleBusinessId,
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
    businessId: exampleBusinessId,
  });

  console.log('recurring schedule:', schedule);

  const editedSchedule = await r.editSchedule({
    id: schedule.id,
    businessId: exampleBusinessId,
    interval: 'MONTH',
    intervalCount: 1,
  });

  console.log('edited recurring schedule:', editedSchedule);
}

async function runPlans() {
  const createdPlan = await r.createPlan({
    businessId: exampleBusinessId,
    referenceId: exampleReferenceId,
    customerId: exampleCustomerId,
    recurringAction: 'PAYMENT',
    currency: 'IDR',
    amount: 1000,
    paymentMethods: [
      {
        paymentMethodId: examplePaymentMethodId,
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

  console.log('created recurring plan:', createdPlan);

  const plan = await r.getPlan({
    id: createdPlan.id,
    businessId: exampleBusinessId,
  });

  console.log('recurring plan:', plan);

  const editedPlan = await r.editPlan({
    id: plan.id,
    businessId: exampleBusinessId,
    amount: 1000,
  });

  console.log('edited recurring plan:', editedPlan);

  /** This is commented out to allow cycle "edit" and "cancel" actions */
  // const deactivatedPlan = await r.deactivatePlan({
  //   id: plan.id,
  //   businessId: exampleBusinessId,
  // });

  // console.log('deactivated recurring plan:', deactivatedPlan);
}

async function runCycles() {
  const response = await r.getAllCycles({
    planId: planId,
    businessId: exampleBusinessId,
    limit: 2,
  });

  console.log('recurring cycles:', response.data);
  console.log('has more recurring cycles:', response.has_more);

  const cycle = await r.getCycle({
    id: response.data[0].id,
    planId: planId,
    businessId: exampleBusinessId,
  });

  console.log('recurring cycle:', cycle);

  const editedCycle = await r.editCycle({
    id: cycle.id,
    planId: planId,
    businessId: exampleBusinessId,
    amount: 1000,
    currency: 'IDR',
    scheduledTimestamp: scheduledTimestamp,
  });

  console.log('edited recurring cycle:', editedCycle);

  const canceledCycle = await r.cancelCycle({
    id: cycle.id,
    planId: cycle.plan_id,
    businessId: exampleBusinessId,
  });

  console.log('canceled recurring cycle:', canceledCycle);
}

(async function() {
  try {
    await runSchedules();
    await runPlans();
    await runCycles();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
