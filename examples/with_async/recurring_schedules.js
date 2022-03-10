const x = require('../xendit');

const Recurring = x.Recurring;
const r = new Recurring({});

const exampledBusinessId = '6066ebf68204c740b61aa3c1';
const exampledReferenceId = 'b288cb04-9214-48a0-b679-5214670e7197';

(async function() {
  try {
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

    // eslint-disable-next-line no-console
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
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
