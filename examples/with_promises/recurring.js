/* eslint-disable no-console */
const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

const exampledBusinessId = '6066ebf68204c740b61aa3c1';

let scheduleId;
let planId;

function runSchedules() {
  r.createSchedule({
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
  })
    .then(createdSchedule => {
      scheduleId = createdSchedule.id;
      console.log('created recurring schedule:', createdSchedule);
      return createdSchedule;
    })
    .then(createdSchedule => {
      return r.getSchedule({
        id: createdSchedule.id,
        businessId: exampledBusinessId,
      });
    })
    .then(schedule => {
      console.log('recurring schedule:', schedule);
      return schedule;
    })
    .then(schedule => {
      return r.editSchedule({
        id: schedule.id,
        businessId: exampledBusinessId,
        interval: 'MONTH',
      });
    })
    .then(editedSchedule => {
      console.log('edited recurring schedule:', editedSchedule);
    });
}

function runPlans() {
  r.createPlan({
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
  })
    .then(createdPlan => {
      planId = createdPlan.id;
      console.log('created recurring plan:', createdPlan);
      return createdPlan;
    })
    .then(createdPlan => {
      return r.getPlan({
        id: createdPlan.id,
        businessId: exampledBusinessId,
      });
    })
    .then(plan => {
      console.log('recurring plan:', plan);
      return plan;
    })
    .then(plan => {
      return r.editPlan({
        id: plan.id,
        businessId: exampledBusinessId,
        amount: 1000,
      });
    })
    .then(editedPlan => {
      console.log('edited recurring plan:', editedPlan);
      return editedPlan;
    })
    .then(plan => {
      return r.deactivatePlan({
        id: plan.id,
        businessId: plan.business_id,
      });
    })
    .then(deactivatedPlan => {
      console.log('deactivated recurring plan:', deactivatedPlan);
    });
}

function runCycles() {
  r.getAllCycles({
    planId: planId,
    businessId: exampledBusinessId,
    limit: 2,
  })
    .then(() => {
      console.log('recurring cycles:', response.data);
      console.log('has more recurring cycles:', response.has_more);
    })
    .then(() => {
      return r.getCycle({
        id: response.data[0].id,
        planId: planId,
        businessId: exampledBusinessId,
      });
    })
    .then(cycle => {
      console.log('recurring cycle:', cycle);
      return cycle;
    })
    .then(cycle => {
      return r.editCycle({
        id: cycle.id,
        planId: planId,
        businessId: exampledBusinessId,
        amount: 1000,
      });
    })
    .then(editedCycle => {
      console.log('edited recurring cycle:', editedCycle);
      return editedCycle;
    })
    .then(editedCycle => {
      return r.cancelCycle({
        id: editedCycle.id,
        planId: planId,
        businessId: exampledBusinessId,
      });
    })
    .then(canceledCycle => {
      console.log('canceled recurring cycle:', canceledCycle);
    });
}

(function() {
  runSchedules()
    .then(() => runPlans())
    .then(() => runCycles())
    .catch(e => {
      console.error(e); // eslint-disable-line no-console
      process.exit(1);
    });
})();
