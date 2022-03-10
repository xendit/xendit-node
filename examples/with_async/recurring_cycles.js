const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

const exampledBusinessId = '6066ebf68204c740b61aa3c1';
const exampledPlanId = 'repl_1422128c-3767-4c00-aefa-a3b2c9cc49d8';

(async function() {
  try {
    const response = await r.getAllCycles({
      planId: exampledPlanId,
      businessId: exampledBusinessId,
      limit: 2,
    });

    // eslint-disable-next-line no-console
    console.log('recurring cycles:', response.data);
    // eslint-disable-next-line no-console
    console.log('has more recurring cycles:', response.has_more);

    const cycle = await r.getCycle({
      id: response.data[0].id,
      planId: exampledPlanId,
      businessId: exampledBusinessId,
    });

    // eslint-disable-next-line no-console
    console.log('recurring cycle:', cycle);

    const editedCycle = await r.editCycle({
      id: cycle.id,
      planId: cycle.plan_id,
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
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
