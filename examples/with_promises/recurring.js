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

function runSchedules() {
  return r
    .createSchedule({
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
    })
    .then(createdSchedule => {
      scheduleId = createdSchedule.id;
      console.log('created recurring schedule:', createdSchedule);
      return createdSchedule;
    })
    .then(createdSchedule => {
      return r.getSchedule({
        id: createdSchedule.id,
        businessId: exampleBusinessId,
      });
    })
    .then(schedule => {
      console.log('recurring schedule:', schedule);
      return schedule;
    })
    .then(schedule => {
      return r.editSchedule({
        id: schedule.id,
        businessId: exampleBusinessId,
        interval: 'MONTH',
        intervalCount: 1,
      });
    })
    .then(editedSchedule => {
      console.log('edited recurring schedule:', editedSchedule);
    });
}

function runPlans() {
  return r
    .createPlan({
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
    })
    .then(createdPlan => {
      planId = createdPlan.id;
      console.log('created recurring plan:', createdPlan);
      return createdPlan;
    })
    .then(createdPlan => {
      return r.getPlan({
        id: createdPlan.id,
        businessId: exampleBusinessId,
      });
    })
    .then(plan => {
      console.log('recurring plan:', plan);
      return plan;
    })
    .then(plan => {
      return r.editPlan({
        id: plan.id,
        businessId: exampleBusinessId,
        amount: 1000,
      });
    })
    .then(editedPlan => {
      console.log('edited recurring plan:', editedPlan);
      return editedPlan;
    });
  /** This is commented out to allow cycle "edit" and "cancel" actions */
  // .then(plan => {
  //   return r.deactivatePlan({
  //     id: plan.id,
  //     businessId: exampleBusinessId,
  //   });
  // })
  // .then(deactivatedPlan => {
  //   console.log('deactivated recurring plan:', deactivatedPlan);
  // })
}

function runCycles() {
  return r
    .getAllCycles({
      planId: planId,
      businessId: exampleBusinessId,
      limit: 2,
    })
    .then(response => {
      console.log('recurring cycles:', response.data);
      console.log('has more recurring cycles:', response.has_more);
      return response;
    })
    .then(response => {
      return r.getCycle({
        id: response.data[0].id,
        planId: planId,
        businessId: exampleBusinessId,
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
        businessId: exampleBusinessId,
        amount: 1000,
        currency: 'IDR',
        scheduledTimestamp: scheduledTimestamp,
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
        businessId: exampleBusinessId,
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
      console.error(e);
      process.exit(1);
    });
})();
