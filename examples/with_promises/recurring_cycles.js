const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

const exampledBusinessId = '6066ebf68204c740b61aa3c1';
const exampledPlanId = 'repl_1422128c-3767-4c00-aefa-a3b2c9cc49d8';

r.getAllCycles({
  planId: exampledPlanId,
  businessId: exampledBusinessId,
  limit: 2,
})
  .then(response => {
    // eslint-disable-next-line no-console
    console.log('recurring cycles:', response.data);
    // eslint-disable-next-line no-console
    console.log('has more recurring cycles:', response.has_more);

    return response;
  })
  .then(response =>
    r.getCycle({
      id: response.data[0].id,
      planId: exampledPlanId,
      businessId: exampledBusinessId,
    }),
  )
  .then(cycle => {
    // eslint-disable-next-line no-console
    console.log('recurring cycle:', cycle);

    return cycle;
  })
  .then(cycle =>
    r.editCycle({
      id: cycle.id,
      planId: cycle.plan_id,
      businessId: exampledBusinessId,
      amount: 1000,
    }),
  )
  .then(editedCycle => {
    // eslint-disable-next-line no-console
    console.log('edited recurring cycle:', editedCycle);

    return editedCycle;
  })
  .then(editedCycle =>
    r.cancelCycle({
      id: editedCycle.id,
      planId: editedCycle.plan_id,
      businessId: exampledBusinessId,
    }),
  )
  .then(canceledCycle => {
    // eslint-disable-next-line no-console
    console.log('canceled recurring cycle:', canceledCycle);
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
