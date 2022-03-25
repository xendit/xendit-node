const x = require('../xendit');

const RecurringPayment = x.RecurringPayment;
const rp = new RecurringPayment({});

(async function() {
  try {
    const payment = await rp.createPayment({
      externalID: '123',
      payerEmail: 'stanley@xendit.co',
      description: 'Payment for something',
      amount: 10000,
      interval: RecurringPayment.Interval.Month,
      intervalCount: 1,
    });
    // eslint-disable-next-line no-console
    console.log('recurring payment created:', payment);

    const { id } = payment;
    const retrievedPayment = await rp.getPayment({ id });
    // eslint-disable-next-line no-console
    console.log('recurring payment details:', retrievedPayment);

    const editedPayment = await rp.editPayment({ id, amount: 20000 });
    // eslint-disable-next-line no-console
    console.log('recurring payment updated:', editedPayment.id);

    const pausedPayment = await rp.pausePayment({ id });
    // eslint-disable-next-line no-console
    console.log('recurring payment paused:', pausedPayment.id);

    const resumedPayment = await rp.resumePayment({ id });
    // eslint-disable-next-line no-console
    console.log('recurring payment resumed:', resumedPayment.id);

    const stoppedPayment = await rp.stopPayment({ id });
    // eslint-disable-next-line no-console
    console.log('recurring payment stopped:', stoppedPayment.id);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
