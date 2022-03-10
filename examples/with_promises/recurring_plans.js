const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

const exampledBusinessId = '6066ebf68204c740b61aa3c1';
const exampledReferenceId = 'b288cb04-9214-48a0-b679-5214670e7197';
const exampledCustomerId = '25d0af86-a376-46d8-94b3-f0b0e919a1d0';
const exampledPaymentMethodId = 'pm-60d5e209-4e2a-42da-bae1-aa7d499d61ae';
const exampledScheduleId = 'resc_6a16636c-43d6-4749-8d61-16203b68a16f';

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
  scheduleId: exampledScheduleId,
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
    // eslint-disable-next-line no-console
    console.log('created recurring plan:', createdPlan);

    return createdPlan;
  })
  .then(createdPlan =>
    r.getPlan({
      id: createdPlan.id,
      businessId: exampledBusinessId,
    }),
  )
  .then(plan => {
    // eslint-disable-next-line no-console
    console.log('recurring plan:', plan);

    return plan;
  })
  .then(plan =>
    r.editPlan({
      id: plan.id,
      businessId: exampledBusinessId,
      amount: 1000,
    }),
  )
  .then(editedPlan => {
    // eslint-disable-next-line no-console
    console.log('edited recurring plan:', editedPlan);

    return editedPlan;
  })
  .then(editedPlan =>
    r.deactivatePlan({
      id: editedPlan.id,
      businessId: editedPlan.business_id,
    }),
  )
  .then(deactivatedPlan => {
    // eslint-disable-next-line no-console
    console.log('deactivated recurring plan:', deactivatedPlan);
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
